<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Response;

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

    // export CSV firle
    function export()
    {
        $headers = [
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=orders.csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0",
        ];

        $callback = function () {
            $orders = Order::all();
            $file = fopen("php://output", 'w');

            //header row
            fputcsv($file, ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']);

            //body
            foreach ($orders as $order) {
                fputcsv($file, [$order->id, $order->name, $order->email, '', '', '']);
                foreach ($order->orderItems as $orderItem) {
                    fputcsv($file, ['', '', '', $orderItem->product_title, $orderItem->price, $orderItem->quantity]);
                }
            };

            fclose($file);
        };

        return Response::stream($callback, 200, $headers);
    }
}
