<?php

namespace App\Http\Controllers;

use App\Enum\ReimbursementStatusEnum;
use App\Enum\RoleEnum;
use App\Models\Reimbursement;
use App\Models\ReimbursementFile;
use App\Models\ReimbursementLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ReimbursementController extends Controller
{
    public function index(Request $request)
    {
        $query = Reimbursement::orderBy('updated_at', 'desc')->with('createdBy');
        $user = $request->user();
        if ($user->role === RoleEnum::STAFF) {
            $query->where('created_by', $user->id);
        }
        if ($type = $request->query('type')) {
            $query->where('status', $type);
        }
        $result = $query->paginate(10);

        $data = collect($result->items())->map(function ($value) {
            $v = ['user_name' => $value->createdBy?->name];
            $v = [...$v, ...$value->makeHidden('createdBy')->toArray()];
            return $v;
        });

        return Inertia::render('Reimbursement/Index', [
            'data' => $data,
            'meta' => [
                'currentPage' => $result->currentPage(),
                'lastPage' => $result->lastPage(),
                'total' => $result->total(),
                'type' => $type
            ]
        ]);
    }

    public function show($id)
    {
        $reimbursement = Reimbursement::with(['reimbursementLogs', 'reimbursementFile'])->findOrFail($id);
        return Inertia::render('Reimbursement/Show', ["reimbursement" => $reimbursement->toArray()]);
    }
    public function getFile($id)
    {
        $r_file = ReimbursementFile::where('reimbursement_id', $id)->first();

        if (!Storage::disk('local')->exists($r_file->path)) {
            abort(404);
        }
        return Storage::download($r_file->path);
    }

    public function create(Request $request)
    {
        if ($request->user()->role !== RoleEnum::STAFF) {
            return redirect('/');
        }
        return Inertia::render("Reimbursement/Create");
    }

    public function store(Request $request)
    {
        if ($request->user()->role !== RoleEnum::STAFF) {
            return redirect('/');
        }
        // dd($request->file('document'), $request->input());
        $input = $request->validate([
            'name'          => 'required|string|max:250',
            'description'   => 'required|string|max:500',
            'document.*'    => 'required|file|max:4096|mimes:png,jpg,jpeg,pdf'
        ]);

        DB::beginTransaction();
        $reimbursement              = new Reimbursement;
        $reimbursement->name        = $input['name'];
        $reimbursement->description = $input['description'];
        $reimbursement->save();

        $file = $request->file('document');
        if (is_array($file)) {
            $file = $file[0];
        }
        $path = $file->store(
            'documents/' . $reimbursement->id,
            'local'
        );
        $filename = File::name($path);
        $extension = $file->extension();
        $size = $file->getSize();

        $reimbursement_file                     = new ReimbursementFile;
        $reimbursement_file->name               = $filename;
        $reimbursement_file->extension          = $extension;
        $reimbursement_file->size               = $size;
        $reimbursement_file->reimbursement_id   = $reimbursement->id;
        $reimbursement_file->save();

        DB::commit();

        return redirect(route('reimbursement.show', ['id' => $reimbursement->id]));
    }

    public function updateStatus(Request $request, $id, $status)
    {
        if (!in_array($status, ['approved', 'declined'])) {
            abort(404);
        }
        $reimbursement = Reimbursement::findOrFail($id);
        if ($status === 'declined') {
            $this->updateStatusDeclined($request, $reimbursement);
        } else {
            $this->updateStatusApproved($request, $reimbursement);
        }

        return redirect(route('reimbursement.show', ['id' => $id]));
    }

    private function updateStatusDeclined(Request $request, $reimbursement)
    {
        $user = $request->user();
        if (($reimbursement->status === ReimbursementStatusEnum::PENDING && $user->role === RoleEnum::DIREKTUR) || $reimbursement->status === ReimbursementStatusEnum::DIRECTOR_APPROVED && $user->role === RoleEnum::FINANCE) {
            $validated = $request->validate(['reason' => ['required', 'string', 'max:500']]);

            DB::beginTransaction();
            $reimbursement->status = ReimbursementStatusEnum::DECLINED;
            $reimbursement->save();

            $log = new ReimbursementLog;
            $log->reimbursement_id = $reimbursement->id;
            $log->description = "(::DCLD::) {$validated['reason']}";
            $log->created_by = $user->id;
            $log->save();
            DB::commit();

            return;
        }

        abort(404);
    }

    private function updateStatusApproved(Request $request, $reimbursement)
    {
        $user = $request->user();

        if ($reimbursement->status === ReimbursementStatusEnum::PENDING && $user->role === RoleEnum::DIREKTUR) {
            DB::beginTransaction();
            $reimbursement->status = ReimbursementStatusEnum::DIRECTOR_APPROVED;
            $reimbursement->save();

            $log = new ReimbursementLog;
            $log->reimbursement_id = $reimbursement->id;
            $log->description = "(::DRCT_APPR::)";
            $log->created_by = $user->id;
            $log->save();
            DB::commit();
            return;
        }
        if ($reimbursement->status === ReimbursementStatusEnum::DIRECTOR_APPROVED && $user->role === RoleEnum::FINANCE) {
            DB::beginTransaction();
            $reimbursement->status = ReimbursementStatusEnum::FINANCE_APPROVED;
            $reimbursement->save();

            $log = new ReimbursementLog;
            $log->reimbursement_id = $reimbursement->id;
            $log->description = "(::FNC_APPR::)";
            $log->created_by = $user->id;
            $log->save();
            DB::commit();
            return;
        }

        abort(404);
    }
}
