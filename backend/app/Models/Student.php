<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $table = 'tbl_students';
    protected $primaryKey = 'student_id';
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name'
    ];
}
