<?php

namespace App\Service;

use App\Model\SessionsModel;
use App\Model\UsersModel;

class LoginService
{
    public function login($email, $password)
    {
        $loginModel = new SessionsModel();
        $usersModel = new UsersModel();

        $user = $usersModel->getByEmail($email);

        if ($user && password_verify($password, $user["password"])) {
            $loginModel->user = $user;
            $loginModel->userId = $user["id"];
            $loginModel->token = bin2hex(random_bytes(16));
            $loginModel->validity = date('Y-m-d H:i:s', time() + 3600);
            $loginModel->create();
            return $loginModel;
        }
        return false;
    }

    public function validateToken()
    {
        if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
            return false;
        }
        $authorization = explode(' ', $_SERVER['HTTP_AUTHORIZATION']);
        $token = $authorization[1];
        $loginModel = new SessionsModel();
        $loginModel->token = $token;
        $login = $loginModel->getByToken($token);
        if ($login && $login["validity"] > date('Y-m-d H:i:s')) {
            return $login;
        }
        return false;
    }
}
