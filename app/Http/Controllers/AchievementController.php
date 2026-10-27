<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use Illuminate\Http\Request;

class AchievementController extends Controller
{
    /**
     * Display a listing of achievements (JSON / API)
     */
    public function index(Request $request)
    {
        $achievements = Achievement::orderBy('order', 'asc')->orderBy('id', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $achievements
        ]);
    }

    /**
     * Store a newly created achievement in storage
     */
    public function store(Request $request)
    {
        $this->normalizeEmptyUrls($request);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'event' => 'required|string|max:255',
            'year' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'badge' => 'nullable|string|max:100',
            'association' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'credentialUrl' => 'nullable|url|max:255',
            'skills' => 'nullable|array',
            'image' => 'nullable|string|max:2048',
            'order' => 'nullable|integer',
        ]);

        $achievement = Achievement::create($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Achievement created successfully',
                'data' => $achievement
            ], 201);
        }

        return redirect()->back()->with('success', 'Achievement created successfully');
    }

    /**
     * Display the specified achievement
     */
    public function show(Achievement $achievement)
    {
        return response()->json([
            'success' => true,
            'data' => $achievement
        ]);
    }

    /**
     * Update the specified achievement in storage
     */
    public function update(Request $request, Achievement $achievement)
    {
        $this->normalizeEmptyUrls($request);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'event' => 'sometimes|required|string|max:255',
            'year' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'badge' => 'nullable|string|max:100',
            'association' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'credentialUrl' => 'nullable|url|max:255',
            'skills' => 'nullable|array',
            'image' => 'nullable|string|max:2048',
            'order' => 'nullable|integer',
        ]);

        $achievement->update($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Achievement updated successfully',
                'data' => $achievement
            ]);
        }

        return redirect()->back()->with('success', 'Achievement updated successfully');
    }

    /**
     * Remove the specified achievement from storage
     */
    public function destroy(Request $request, Achievement $achievement)
    {
        $achievement->delete();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Achievement deleted successfully'
            ]);
        }

        return redirect()->back()->with('success', 'Achievement deleted successfully');
    }

    private function normalizeEmptyUrls(Request $request): void
    {
        if ($request->input('credentialUrl') === '') {
            $request->merge(['credentialUrl' => null]);
        }
    }
}
