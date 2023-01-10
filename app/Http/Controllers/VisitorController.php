<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VisitorController extends Controller
{
    public function index()
    {
        return view('dashboard');
    }

    public function store(){
        $atts = request()->except(['readme']);

        Visitor::create($atts);
    }

    public function today()
    {
        $visitors = Visitor::whereDate('created_at', Carbon::today())->get();
        $visitors = $visitors->groupBy(function($visitor){
            return date('H',strtotime($visitor->created_at));
        });
        
        $visitors = $visitors->map(function ($array) {
            return count($array->unique('ip')->all());
        });
        return $visitors->toJson(JSON_PRETTY_PRINT);
    }

    public function city()
    {
        $visitors = DB::table('visitors')
            ->select('city', DB::raw('count(*) as total'))
            ->groupBy('city')
            ->get();
        return $visitors;
    }
}