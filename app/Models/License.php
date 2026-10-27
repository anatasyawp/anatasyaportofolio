<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class License extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'skills' => 'array',
        'order' => 'integer',
    ];
}
