<?php

namespace App\Model;

class CheckoutsModel extends BaseModel
{
    public $tableName = 'checkouts';

    public $fields = ['name', 'email', 'phone', 'city', 'address', 'zip', 'state', 'country', 'created', 'extra_info', 'total_price'];

    public string $name = '';
    public string $email = '';
    public string $phone = '';
    public string $city = '';
    public string $address = '';
    public string $zip = '';
    public string $state = '';
    public string $country = '';
    public string $created = '';
    public string $extraInfo = '';
    public string $totalPrice = '';


}
