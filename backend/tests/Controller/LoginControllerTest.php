<?php
use PHPUnit\Framework\TestCase;
use App\Controller\LoginController;
use App\Service\LoginService;
use App\Model\SessionsModel;

class LoginControllerTest extends TestCase
{
    public function testCreateWithValidCredentials()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/login';
        $_POST["email"] = 'admin@admin.com';
        $_POST["password"] = '12345';

        $loginModel = new SessionsModel();
        $loginModel->token = 'valid_token';
        $loginServiceMock = $this->getMockBuilder(LoginService::class)
            ->onlyMethods(['login'])
            ->getMock();
        $loginServiceMock->method('login')
            ->willReturn($loginModel);
    
        ob_start();
        $loginController = new LoginController($loginServiceMock);
        $loginController->create();
        $output = ob_get_clean();
    
        $this->assertJsonStringEqualsJsonString('{"token":"valid_token"}', $output);
    }

    public function testCreateWithInvalidCredentials()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/login';
        $_POST["email"] = 'admin@admin.com';
        $_POST["password"] = '12345';

        $loginServiceMock = $this->getMockBuilder(LoginService::class)
            ->onlyMethods(['login'])
            ->getMock();
        $loginServiceMock->method('login')
            ->willReturn(false);
    
        ob_start();
        $loginController = new LoginController($loginServiceMock);
        $loginController->create();
        $output = ob_get_clean();
    
        $this->assertJsonStringEqualsJsonString('{"error": "invalid credentials"}', $output);
    }
}
