<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageUploadRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage as FacadesStorage;
use Illuminate\Support\Str;
use Storage;

class ImageController extends Controller
{
    function upload(ImageUploadRequest $request)
    {

        $file = $request->file('image');
        $name = Str::random(10);
        $url = Storage::putFileAs('images', $file, $name . '.' . $file->extension());

        return [
            'url' => env('APP_URL') . '/' . $url,
        ];
    }
}
