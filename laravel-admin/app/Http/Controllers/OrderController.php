<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    function index()
    {
        $order = Order::paginate();
        return OrderResource::collection($order);
    }

    function show($id)
    {
        return new OrderResource(Order::find($id));
    }
}
