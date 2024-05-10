<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enum\ReimbursementStatusEnum;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Reimbursement extends Model
{
    use HasFactory;

    protected $casts = [
        'status' => ReimbursementStatusEnum::class,
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function reimbursementLogs(): HasMany
    {
        return $this->hasMany(ReimbursementLog::class);
    }

    public function reimbursementFile(): HasOne
    {
        return $this->hasOne(ReimbursementFile::class);
    }

    protected static function booted(): void
    {
        static::creating(function (Reimbursement $reimbursement) {
            $reimbursement->created_by  = request()->user()?->id ?? null;
            $reimbursement->status      = ReimbursementStatusEnum::PENDING;
        });
    }
}
