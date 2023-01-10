<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use Illuminate\Http\Request;

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
}