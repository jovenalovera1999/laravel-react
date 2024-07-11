<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::orderBy('first_name', 'asc')
            ->paginate(25);

        return response()->json([
            'status' => 200,
            'students' => $students
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $students = Student::where('first_name', 'like', "%{$query}%")
            ->orWhere('middle_name', 'like', "%{$query}%")
            ->orWhere('last_name', 'like', "%{$query}%")
            ->orderBy('first_name', 'asc')
            ->paginate(25);

        return response()->json([
            'status' => 200,
            'students' => $students
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required'],
            'middle_name' => ['nullable'],
            'last_name' => ['required']
        ]);

        Student::create([
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'],
            'last_name' => $validated['last_name']
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Student successfully created.'
        ]);
    }

    public function edit($student_id)
    {
        $student = Student::find($student_id);
        return response()->json([
            'status' => 200,
            'student' => $student
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'first_name' => ['required'],
            'middle_name' => ['nullable'],
            'last_name' => ['required']
        ]);

        $student->update([
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'],
            'last_name' => $validated['last_name']
        ]);

        return response()->json([
            'status' => 200
        ]);
    }

    public function delete($student_id)
    {
        $student = Student::find($student_id);
        return response()->json([
            'status' => 200,
            'student' => $student
        ]);
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return response()->json([
            'status' => 200
        ]);
    }
}
