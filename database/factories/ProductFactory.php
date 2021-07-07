<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->name;
        $slug = Str::slug($title);
        return [
            'title' => $title,
            'slug' => $slug,
            'price' => rand(100,300),
            'image' => 'https://placekitten.com/640/360',
            'description' => $this->faker->text
        ];
    }
}
