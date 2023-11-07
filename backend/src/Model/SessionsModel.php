<?php

namespace App\Model;

use App\Service\DatabaseService;

class SessionsModel extends BaseModel
{
    public $tableName = 'sessions';
    public $fields = ['user_id', 'token', 'validity'];

    public $userId = null;
    public $token = null;
    public $user;
    public $validity = null;

    public function getByToken($token)
    {
        $db = new DatabaseService();
        return $db->getByField($this, 'token', $token);
    }
}
