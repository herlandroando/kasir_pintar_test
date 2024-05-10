<?php

namespace App\Http\Controllers;

use App\Enum\ReimbursementStatusEnum;
use App\Enum\RoleEnum;
use App\Models\Reimbursement;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $user                               = $request->user();
        $statistic                          = [];
        $end_week                           = now()->endOfDay();
        $start_week                         = Carbon::parse($end_week)->subWeek();
        $query_reimbursement_active         = Reimbursement::whereNotIn(
            'status',
            [ReimbursementStatusEnum::FINANCE_APPROVED, ReimbursementStatusEnum::DECLINED],
        );
        $query_reimbursement_declined_week  = Reimbursement::where(
            'status',
            ReimbursementStatusEnum::DECLINED,
        )->whereBetween('updated_at', [$start_week, $end_week]);

        if ($user->role === RoleEnum::DIREKTUR) {
            $statistic['user_finance_total']            = User::where('role', RoleEnum::FINANCE)->count();
            $statistic['user_staff_total']              = User::where('role', RoleEnum::STAFF)->count();
            $statistic['user_total']                    = $statistic['user_finance_total'] + $statistic['user_staff_total'] + 1;
        }
        if (in_array($user->role, [RoleEnum::DIREKTUR, RoleEnum::FINANCE])) {
            $statistic['reimbursement_active_list']     = $query_reimbursement_active->get();
            $statistic['reimbursement_active']          = $statistic['reimbursement_active_list']->count();
            $statistic['reimbursement_need_approve']    = Reimbursement::where(
                'status',
                RoleEnum::DIREKTUR ? ReimbursementStatusEnum::PENDING : ReimbursementStatusEnum::DIRECTOR_APPROVED
            )->count();
            $statistic['reimbursement_declined_list']   = $query_reimbursement_declined_week->get()->toArray();
            $statistic['reimbursement_declined_week']   = count($statistic['reimbursement_declined_list']);
        }
        if ($user->role === RoleEnum::STAFF) {
            $statistic['reimbursement_active']          = Reimbursement::whereNotIn(
                'status',
                [ReimbursementStatusEnum::FINANCE_APPROVED, ReimbursementStatusEnum::DECLINED]
            )->count();
            $statistic['reimbursement_declined_list']   = $query_reimbursement_declined_week
                ->where('created_by', $user->id)->get()->toArray();
            $statistic['reimbursement_declined_week']   = count($statistic['reimbursement_declined_list']);
        }

        return Inertia::render('Home/Index', ['statistic' => $statistic]);
    }
}
