<?php

namespace App\Model;

use App\Service\DatabaseService;
use App\Util\StringUtils;

class BaseModel
{
    protected $tableName = '';
    public $id = null;
    public $fields = [];
    public $values = [];

    public function getTableName()
    {
        return $this->tableName;
    }

    public function getValues()
    {
        $values = [];
        foreach ($this->fields as $field) {
            $codeField = StringUtils::snakeCaseToCamelCase($field);
            $values[$field] = $this->$codeField;
        }
        return $values;
    }

    public function create()
    {
        $db = new DatabaseService();
        return $db->insert($this);
    }

    public function update()
    {
        print_r($this);
    }

    public function delete()
    {
        $db = new DatabaseService();
        return $db->delete($this);
    }
}
