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

    public function testCantCreateWithInvalidCredentials()
    {
        $this->expectException(Exception::class);
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/login';
        $_POST["email"] = 'admin@admin.com';
        $_POST["password"] = '12345';

        $loginServiceMock = $this->getMockBuilder(LoginService::class)
            ->onlyMethods(['login'])
            ->getMock();
        $loginServiceMock->method('login')
            ->willReturn(false);
    
        try {
            $loginController = new LoginController($loginServiceMock);
            $loginController->create();
        } catch (Exception $e) {
            $this->assertEquals('Invalid credentials', $e->getMessage());
            $this->assertEquals(401, $e->getCode());
            throw $e;
        }
    }

    public function testCantCreateWithInvalidEmail()
    {
        $this->expectException(Exception::class);
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/login';
        $_POST["email"] = 'invalid-email';
        $_POST["password"] = '12345';

        $loginServiceMock = $this->getMockBuilder(LoginService::class)
            ->onlyMethods(['login'])
            ->getMock();
        $loginServiceMock->method('login')
            ->willReturn(false);
    
        try {
            $loginController = new LoginController($loginServiceMock);
            $loginController->create();
        } catch (Exception $e) {
            $this->assertEquals('Invalid email', $e->getMessage());
            $this->assertEquals(400, $e->getCode());
            throw $e;
        }
    }
}
