<?php
use PHPUnit\Framework\TestCase;
use App\Controller\CheckoutsController;
use App\Controller\LoginController;
use App\Service\LoginService;
use App\Model\SessionsModel;

class LoginServiceTest extends TestCase
{
    public function testLoginWithValidCredentials()
    {
        $email = 'admin@admin.com';
        $password = '12345';
        $loginService = new LoginService();
        $login = $loginService->login($email, $password);
        $this->assertIsObject($login);
    }

    public function testLoginWithInvalidCredentials()
    {
        $email = 'admin@admin.com';
        $password = '54321';
        $loginService = new LoginService();
        $login = $loginService->login($email, $password);
        $this->assertFalse($login);
    }
}
