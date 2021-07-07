<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class PublicApiController extends Controller
{
    public function products(){
        $products = Product::latest()->paginate(15);
        return response()->json($products, 200);
    }
}
