<?php

namespace App\Controller;

use App\Util\ValidationUtils;

use App\Service\LoginService;

class LoginController extends BaseController
{
    public function create()
    {
        $data = $this->getInput();
        $email = $data['email'];
        $password = $data['password'];
        $this->validate();
        if ($login = $this->loginService->login($email, $password)) {
            header('Content-Type: application/json');
            echo json_encode(["token" => $login->token]);
            return;
        }
        throw new \Exception('Invalid credentials', 401);
    }

    public function validate()
    {
        $data = $this->getInput();
        $email = $data['email'];
        $password = $data['password'];

        ValidationUtils::validateEmail($email);
        ValidationUtils::validatePassword($password);
    }
}
