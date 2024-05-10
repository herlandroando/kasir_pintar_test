<?php

namespace App\Enum;

enum ReimbursementStatusEnum: string
{
    case PENDING            = 'PENDING';
    case DIRECTOR_APPROVED  = 'DIRECTOR_APPROVED';
    case FINANCE_APPROVED   = 'FINANCE_APPROVED';
    case DECLINED           = 'DECLINED';

    // public function description(){
    //     return match ($this) {
    //         self::DIRECTOR_APPROVED => 'Your reimbursement has been approved by director. Waiting to be received by the finance department.',
    //         self::FINANCE_APPROVED => 'The expense reimbursement request has been received by the finance department.',
    //The request for reimbursement has been denied. Reason:
    //     }
    // }
}
