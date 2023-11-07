<?php

namespace App\Controller;

use App\Model\TypesModel;

class TypesController extends BaseController
{
    public function create()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $type = new TypesModel();
        $type->name = $data['name'];
        $type->tax = $data['tax'];
        $this->serviceInstance->save($type);
    }
}
