<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReimbursementFile extends Model
{
    use HasFactory;

    protected $appends = [
        'url'
    ];
    protected $keyType = 'string';
    protected $primaryKey = 'uuid';
    public $incrementing = false;

    public static function booted()
    {
        static::creating(function ($model) {
            $model->uuid = \Illuminate\Support\Str::uuid();
        });
    }

    public function url(): Attribute
    {
        return Attribute::make(function ($value, $attribute) {
            return route('reimbursement.get_file', ['id' => $attribute['reimbursement_id']]);
        });
    }

    public function path(): Attribute
    {
        return Attribute::make(function ($value, $attribute) {
            return 'documents/' . $attribute['reimbursement_id'] . '/' . $attribute['name'] .'.'.  $attribute['extension'];
        });
    }
}
