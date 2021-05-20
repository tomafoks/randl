<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @OA\Info(
     *  version="1.0.0",
     *  title="Admin Documentation",
     *  description="Admin OpenApi description",
     *  @OA\Contact(
     *      email="tomafoks@mail.ru"
     *  ),
     * )
     *
     * @OA\Server(
     *  url="http://localhost/api",
     *  description="Admin API Server"
     * )
     */
}
