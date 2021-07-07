<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::with('category')->latest()->get();
        return response()->json($products, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
           'title' => 'required|max:255',
           'price' => 'required|integer',
           'image' => 'nullable|max:2048|image',
           'description' => 'required',
           'category_id' => 'required',
        ]);

        $product = Product::create([
           'title' => $request->title,
           'slug' => Str::slug($request->title),
           'price' => $request->price,
           'image' => 'image',
           'description' => $request->description,
           'category_id' => $request->category_id,
        ]);

        if($request->image){
            $imageName = time().'_'. uniqid() .'.'.$request->image->getClientOriginalExtension();
            $request->image->move(public_path('storage/product'), $imageName);
            $product->image = '/storage/product/' . $imageName;
            $product->save();
        }

        return response()->json($product, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $product = Product::with('category')->where('slug',$slug)->first();

        if ($product){
            return response()->json($product,200);
        }else{
            return response()->json('failed',404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit($slug)
    {
        $product = Product::where('slug',$slug)->first();

        if ($product){
            return response()->json($product,200);
        }else{
            return response()->json('failed',404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $slug
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $this->validate($request,[
            'title' => 'required|unique:products,title,'.$product->id,
            'price' => 'required|integer',
            'category_id' => 'required',
//            'image' => 'sometimes|nullable|image|max:2048',
            'description' => 'required',
        ]);

        $product->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'price' => $request->price,
            'description' => $request->description,
            'category_id' => $request->category_id,
        ]);

        return response()->json('Success', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        if ($product){
            $img = $product->image;
            $imgPath = public_path($img);
            if ($img && file_exists($imgPath)){
                unlink($imgPath);
            }
            $product->delete();
        }else{
            return response()->json('Product Not found', 404);
        }
    }
}
