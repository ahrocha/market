<?php

namespace App\Controller;

use App\Service\LoginService;

class LoginController extends BaseController
{
    public function create()
    {
        $data = $this->getInput();
        $email = $data['email'];
        $password = $data['password'];

        if ($login = $this->loginService->login($email, $password)) {
            header('Content-Type: application/json');
            echo json_encode(["token" => $login->token]);
            return;
        }
        echo json_encode(['error' => 'invalid credentials']);
    }
}
