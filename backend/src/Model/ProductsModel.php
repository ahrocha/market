<?php

namespace App\Model;

class ProductsModel extends BaseModel
{
    public $tableName = 'products';

    public $fields = ['name', 'type', 'price'];

}
