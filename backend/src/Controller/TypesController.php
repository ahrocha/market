<?php

namespace App\Controller;

use App\Model\TypesModel;

class TypesController extends BaseController
{
    public function create()
    {
        echo 'TypesController::create()' . PHP_EOL;
        #retrieves name and tax from JSON payload
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $type = new TypesModel();
        $type->name = $data['name'];
        $type->tax = $data['tax'];
        #saves using TypesService
        // print_r($this->serviceInstance);
        $this->serviceInstance->save($type);
    }
}
