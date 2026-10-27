<?php

namespace App\Http\Controllers;

use App\Models\License;
use Illuminate\Http\Request;

class LicenseController extends Controller
{
    /**
     * Display a listing of licenses (JSON / API)
     */
    public function index(Request $request)
    {
        $licenses = License::orderBy('order', 'asc')->orderBy('id', 'asc')->get();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $licenses
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $licenses
        ]);
    }

    /**
     * Store a newly created license in storage
     */
    public function store(Request $request)
    {
        $this->normalizeEmptyUrls($request);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issueDate' => 'nullable|string|max:100',
            'credentialId' => 'nullable|string|max:255',
            'credentialUrl' => 'nullable|url|max:255',
            'association' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'skills' => 'nullable|array',
            'badge' => 'nullable|string|max:100',
            'image' => 'nullable|string|max:2048',
            'order' => 'nullable|integer',
        ]);

        $license = License::create($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'License created successfully',
                'data' => $license
            ], 201);
        }

        return redirect()->back()->with('success', 'License created successfully');
    }

    /**
     * Display the specified license
     */
    public function show(License $license)
    {
        return response()->json([
            'success' => true,
            'data' => $license
        ]);
    }

    /**
     * Update the specified license in storage
     */
    public function update(Request $request, License $license)
    {
        $this->normalizeEmptyUrls($request);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'issuer' => 'sometimes|required|string|max:255',
            'issueDate' => 'nullable|string|max:100',
            'credentialId' => 'nullable|string|max:255',
            'credentialUrl' => 'nullable|url|max:255',
            'association' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'skills' => 'nullable|array',
            'badge' => 'nullable|string|max:100',
            'image' => 'nullable|string|max:2048',
            'order' => 'nullable|integer',
        ]);

        $license->update($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'License updated successfully',
                'data' => $license
            ]);
        }

        return redirect()->back()->with('success', 'License updated successfully');
    }

    /**
     * Remove the specified license from storage
     */
    public function destroy(Request $request, License $license)
    {
        $license->delete();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'License deleted successfully'
            ]);
        }

        return redirect()->back()->with('success', 'License deleted successfully');
    }

    private function normalizeEmptyUrls(Request $request): void
    {
        if ($request->input('credentialUrl') === '') {
            $request->merge(['credentialUrl' => null]);
        }
    }
}
