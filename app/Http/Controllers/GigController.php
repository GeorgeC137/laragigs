<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Job;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\GigResource;
use App\Http\Requests\StoreGigRequest;
use App\Http\Requests\UpdateGigRequest;
use Illuminate\Support\Facades\File;

class GigController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return GigResource::collection(Job::where('user_id', $user->id)->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGigRequest $request)
    {
        $validatedData = $request->validated();

        // Check if validatedData has logo
        if(isset($validatedData['logo'])) {

            $relativePath = $this->saveImage($validatedData['logo']);

            $validatedData['logo'] = $relativePath;
        }

        $gig = Job::create($validatedData);

        return new GigResource($gig);
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $gig, Request $request)
    {
        $user = $request->user();

        if ($user->id === $gig->user_id) {
            return new GigResource($gig);
        } else {
            abort(403, 'Unauthorized Action!!!');
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGigRequest $request, Job $gig)
    {
        $validatedData = $request->validated();

        // Check if logo exists then save if it exists
        if(isset($validatedData['logo'])) {
            $relativePath = $this->saveImage($validatedData['logo']);

            $validatedData['logo'] = $relativePath;
        }

        // Delete old logo if it exists
        if ($gig->logo) {
            $absolutePath = public_path($gig->logo);
            File::delete($absolutePath);
        }

        $gig->update($validatedData);

        return new GigResource($gig);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $gig, Request $request)
    {
        $user = $request->user();

        if ($user->id === $gig->user_id) {
            $gig->delete();
            return response()->json([
                'message' => 'Gig deleted successfully'
            ], 200);
        } else {
            abort(403, 'Unauthorized Action!!!');
        }
    }

    private function saveImage($logo)
    {
        // Check if image/logo is a valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $logo, $type)) {
            // Take everything after the comma and save in a logo variable
            $logo = substr($logo, strpos($logo, ',') + 1);

            // Get the file extension
            $type = strtolower($type[1]); // png, gpg, et.c

            // Check if file is an image
            if(!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
                throw new Exception("Please choose a valid image format('jpg', 'png', 'jpeg', 'gif')");
            }

            $logo = str_replace(' ', '+', $logo);
            $logo = base64_decode($logo);

            if ($logo === false) {
                throw new Exception('base64_decode failed');
            }
        } else {
            throw new Exception('Image is not a valid base64 string!!!');
        }

        // Prepare the path for saving the image
        $dir = 'logos/';
        $file = Str::random(). '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }

        file_put_contents($relativePath, $logo);

        return $relativePath;
    }
}
