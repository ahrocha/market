<?php

namespace App\Model;

class TypesModel extends BaseModel
{
    public $name = '';
    public $tax = 0;
    public $tableName = 'types';

    public $fields = ['name', 'tax'];

}
