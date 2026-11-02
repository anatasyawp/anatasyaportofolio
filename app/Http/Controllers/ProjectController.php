<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects (JSON / API or Inertia view)
     */
    public function index(Request $request)
    {
        $projects = Project::orderBy('order', 'asc')->orderBy('id', 'asc')->get();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $projects
            ]);
        }

        $licenses = \App\Models\License::orderBy('order', 'asc')->orderBy('id', 'asc')->get();
        $achievements = \App\Models\Achievement::orderBy('order', 'asc')->orderBy('id', 'asc')->get();

        return Inertia::render('Home', [
            'dbProjects' => $projects,
            'dbLicenses' => $licenses,
            'dbAchievements' => $achievements,
        ]);
    }

    /**
     * Store a newly created project in storage (POST /api/projects or /projects)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:projects,slug',
            'number' => 'nullable|string|max:10',
            'category' => 'nullable|string|max:100',
            'badge' => 'nullable|string|max:100',
            'period' => 'nullable|string|max:100',
            'client' => 'nullable|string|max:255',
            'summary' => 'nullable|string',
            'role' => 'nullable|string|max:255',
            'contributions' => 'nullable|array',
            'metrics' => 'nullable|array',
            'technologies' => 'nullable|array',
            'features' => 'nullable|array',
            'testingMethodology' => 'nullable|string',
            'testingResults' => 'nullable|array',
            'starMethod' => 'nullable|array',
            'layerImages' => 'nullable|array',
            'githubUrl' => 'nullable|url|max:255',
            'liveUrl' => 'nullable|url|max:255',
            'figmaUrl' => 'nullable|url|max:255',
            'docUrl' => 'nullable|url|max:255',
            'featured' => 'nullable|boolean',
            'order' => 'nullable|integer',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(4);
        }

        $project = Project::create($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Project created successfully',
                'data' => $project
            ], 201);
        }

        return redirect()->back()->with('success', 'Project created successfully');
    }

    /**
     * Display the specified project (GET /api/projects/{id or slug})
     */
    public function show(string $idOrSlug)
    {
        $project = is_numeric($idOrSlug)
            ? Project::find($idOrSlug)
            : Project::where('slug', $idOrSlug)->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $project
        ]);
    }

    /**
     * Update the specified project in storage (PUT/PATCH /api/projects/{id})
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|nullable|string|max:255|unique:projects,slug,' . $project->id,
            'number' => 'nullable|string|max:10',
            'category' => 'nullable|string|max:100',
            'badge' => 'nullable|string|max:100',
            'period' => 'nullable|string|max:100',
            'client' => 'nullable|string|max:255',
            'summary' => 'nullable|string',
            'role' => 'nullable|string|max:255',
            'contributions' => 'nullable|array',
            'metrics' => 'nullable|array',
            'technologies' => 'nullable|array',
            'features' => 'nullable|array',
            'testingMethodology' => 'nullable|string',
            'testingResults' => 'nullable|array',
            'starMethod' => 'nullable|array',
            'layerImages' => 'nullable|array',
            'githubUrl' => 'nullable|url|max:255',
            'liveUrl' => 'nullable|url|max:255',
            'figmaUrl' => 'nullable|url|max:255',
            'docUrl' => 'nullable|url|max:255',
            'featured' => 'nullable|boolean',
            'order' => 'nullable|integer',
        ]);

        $project->update($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Project updated successfully',
                'data' => $project
            ]);
        }

        return redirect()->back()->with('success', 'Project updated successfully');
    }

    /**
     * Remove the specified project from storage (DELETE /api/projects/{id})
     */
    public function destroy(Request $request, Project $project)
    {
        $project->delete();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Project deleted successfully'
            ]);
        }

        return redirect()->back()->with('success', 'Project deleted successfully');
    }

    /**
     * Upload one or multiple images for projects (POST /api/upload)
     * Validates format (jpg, jpeg, png, webp) and limits size to max 2MB (2048 KB) per image
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'images' => 'nullable|array|max:20',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $uploadDir = public_path('uploads/projects');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $uploaded = [];
        $files = [];

        if ($request->hasFile('images')) {
            $files = $request->file('images');
        } elseif ($request->hasFile('image')) {
            $files = [$request->file('image')];
        }

        if (empty($files)) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada file gambar yang diunggah.'
            ], 422);
        }

        foreach ($files as $file) {
            $filename = time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $file->move($uploadDir, $filename);
            $uploaded[] = [
                'url' => '/uploads/projects/' . $filename,
                'alt' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                'depth' => 1,
            ];
        }

        return response()->json([
            'success' => true,
            'message' => count($uploaded) . ' gambar berhasil diunggah.',
            'images' => $uploaded,
            'url' => $uploaded[0]['url'] ?? null,
        ]);
    }
}

