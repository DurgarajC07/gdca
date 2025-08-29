<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MediaController extends Controller
{
    /**
     * Display a listing of media files.
     */
    public function index(Request $request)
    {
        $query = Media::query();

        // Filter by type
        if ($request->filled('type')) {
            switch ($request->type) {
                case 'images':
                    $query->images();
                    break;
                case 'videos':
                    $query->videos();
                    break;
                case 'documents':
                    $query->documents();
                    break;
            }
        }

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('file_name', 'like', '%' . $request->search . '%');
            });
        }

        // Collection filter
        if ($request->filled('collection')) {
            $query->where('collection_name', $request->collection);
        }

        $media = $query->latest()->paginate(24);
        $collections = Media::distinct()->pluck('collection_name')->filter();

        return Inertia::render('Admin/Media/Index', [
            'media' => $media,
            'collections' => $collections,
            'filters' => $request->only(['search', 'type', 'collection']),
        ]);
    }

    /**
     * Store a newly uploaded media file.
     */
    public function store(Request $request)
    {
        $request->validate([
            'files.*' => 'required|file|max:10240', // 10MB max
            'collection' => 'nullable|string|max:255',
        ]);

        $uploadedFiles = [];

        foreach ($request->file('files') as $file) {
            $originalName = $file->getClientOriginalName();
            $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('media', $fileName, 'public');

            $media = Media::create([
                'name' => pathinfo($originalName, PATHINFO_FILENAME),
                'file_name' => $originalName,
                'mime_type' => $file->getMimeType(),
                'path' => $path,
                'size' => $file->getSize(),
                'disk' => 'public',
                'collection_name' => $request->collection,
            ]);

            $uploadedFiles[] = $media;
        }

        return response()->json([
            'message' => count($uploadedFiles) . ' file(s) uploaded successfully.',
            'files' => $uploadedFiles,
        ]);
    }

    /**
     * Display the specified media file.
     */
    public function show(Media $media)
    {
        return Inertia::render('Admin/Media/Show', [
            'media' => $media,
        ]);
    }

    /**
     * Update the specified media file details.
     */
    public function update(Request $request, Media $media)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'alt_text' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'collection_name' => 'nullable|string|max:255',
        ]);

        $media->update($validated);

        return redirect()->back()
            ->with('success', 'Media details updated successfully.');
    }

    /**
     * Remove the specified media file.
     */
    public function destroy(Media $media)
    {
        // Delete the file from storage
        Storage::disk($media->disk)->delete($media->path);

        // Delete the database record
        $media->delete();

        return redirect()->back()
            ->with('success', 'Media file deleted successfully.');
    }

    /**
     * Bulk delete media files.
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:media,id',
        ]);

        $media = Media::whereIn('id', $request->ids)->get();

        foreach ($media as $item) {
            Storage::disk($item->disk)->delete($item->path);
            $item->delete();
        }

        return response()->json([
            'message' => count($media) . ' file(s) deleted successfully.',
        ]);
    }

    /**
     * Get media for selection (used in modals, etc.)
     */
    public function select(Request $request)
    {
        $query = Media::query();

        // Filter by type for media selection
        if ($request->filled('type')) {
            switch ($request->type) {
                case 'image':
                    $query->images();
                    break;
                case 'video':
                    $query->videos();
                    break;
                case 'document':
                    $query->documents();
                    break;
            }
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('file_name', 'like', '%' . $request->search . '%');
            });
        }

        $media = $query->latest()->paginate(12);

        return response()->json($media);
    }
}
