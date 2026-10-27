<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'contributions' => 'array',
        'metrics' => 'array',
        'technologies' => 'array',
        'features' => 'array',
        'testingResults' => 'array',
        'starMethod' => 'array',
        'layerImages' => 'array',
        'featured' => 'boolean',
        'order' => 'integer',
    ];
}

