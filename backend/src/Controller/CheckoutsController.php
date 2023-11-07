<?php

namespace App\Controller;

use App\Model\CheckoutsModel as Model;
use App\Service\LoginService as LoginService;

class CheckoutsController extends BaseController
{
    public function __construct(LoginService $serviceInstance = null)
    {
        parent::__construct($serviceInstance);
    }

    public function create()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $checkout = new Model();
        $checkout->id = null;
        $checkout->name = $data['name'];
        $checkout->email = $data['email'];
        $checkout->phone = $data['phone'];
        $checkout->city = $data['city'];
        $checkout->address = $data['address'];
        $checkout->zip = $data['zip'];
        $checkout->state = $data['state'];
        $checkout->country = $data['country'];
        $checkout->totalPrice = $data['totalPrice'];
        $checkout->created = date('Y-m-d H:i:s');
        $checkout->extraInfo = json_encode($data['basketItems']);
        echo $this->serviceInstance->save($checkout);
    }

    public function list()
    {
        if ($this->checkToken()) {
            print_r($this->serviceInstance->list());
        } else {
            echo 'Unauthorized';
        }
    }
}
