<?php

namespace App\Model;

use App\Service\DatabaseService;

class UsersModel extends BaseModel
{
    public $tableName = 'users';

    public function getByEmail($email)
    {
        $db = new DatabaseService();
        return $db->getByField($this, 'email', $email);
    }
}
