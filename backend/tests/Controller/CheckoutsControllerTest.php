<?php
use PHPUnit\Framework\TestCase;
use App\Controller\CheckoutsController;
use App\Controller\LoginController;
use App\Service\LoginService;
use App\Model\SessionsModel;

class CheckoutsControllerTest extends TestCase
{
    public function testCreateWithValidCredentials()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/checkouts';
        $_POST["email"] = 'admin@admin.com';
        $_POST["password"] = '12345';

        $loginModel = new SessionsModel();
        $loginModel->token = 'valid_token';
        $loginServiceMock = $this->getMockBuilder(LoginService::class)
            ->onlyMethods(['validateToken'])
            ->getMock();
        $loginServiceMock->method('validateToken')
            ->willReturn($loginModel);
    
        ob_start();
        $checkoutController = new CheckoutsController($loginServiceMock);
        $checkoutController->list();
        $output = ob_get_clean();
    
        $this->assertIsArray(json_decode($output, true));
    }

    public function testCreateWithInvalidCredentials()
    {
        $this->expectException(Exception::class);
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/checkouts';
        $_POST["email"] = 'admin@admin.com';
        $_POST["password"] = '54321';
    
        try {
            $loginController = new LoginController();
            $loginController->create();
        } catch (Exception $e) {
            $this->assertEquals('Invalid credentials', $e->getMessage());
            $this->assertEquals(401, $e->getCode());
            throw $e;
        }
    }
}
