<?php

namespace App\Controller;

use App\Service\LoginService;

class BaseController
{
    private $path = '';
    private $requestUri = '';
    private $id = null;
    private $serviceName = '';
    private $serviceClassName = '';
    protected $serviceInstance = null;
    protected $loginService = null;

    public function __construct(LoginService $loginService = null)
    {
        if ($loginService) {
            $this->loginService = $loginService;
        } else {
            $this->loginService = new LoginService();
        }
        $this->requestUri = $_SERVER['REQUEST_URI'];
        $this->path = $_SERVER['REQUEST_URI'];
        $serviceName = explode('/', $this->requestUri)[1];
        $serviceNamespace = 'App\Service\\';
        $this->serviceName = $serviceName;
        $this->serviceClassName = $serviceNamespace . ucfirst($this->serviceName) . 'Service';
        $this->serviceInstance = new $this->serviceClassName();
    }

    public function dispatch()
    {

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
            header('Access-Control-Expose-Headers: Authorization');
            header('Access-Control-Max-Age: 86400');
            echo '';
        } elseif (($this->requestUri === '/'.$this->serviceName || $this->requestUri === '/'.$this->serviceName.'/') && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $this->list();
        } elseif ($this->requestUri === $this->path && $_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->create();
        } elseif (preg_match('/\/'.$this->serviceName.'\/(\d+)/', $this->requestUri, $matches)) {
            $this->id = $matches[1];
            switch ($_SERVER['REQUEST_METHOD']) {
                case 'GET':
                    $this->read($this->id);
                    break;
                case 'PUT':
                    $this->update($this->id);
                    break;
                case 'DELETE':
                    $this->delete($this->id);
                    break;
                default:
                    echo 'Not allowed: ' . $_SERVER['REQUEST_METHOD'];
            }
        } else {
            $this->notFound();
        }
    }

    protected function list()
    {
        print_r($this->serviceInstance->list());
    }

    protected function create()
    {
        echo 'Not implemented: ' . __CLASS__ . '::' . __FUNCTION__ . '()';
    }

    private function read()
    {
        echo $this->serviceInstance->read($this->id);
    }

    private function update()
    {
        $this->checkToken();
        $this->notImplemented();
    }

    private function delete()
    {
        $this->checkToken();
        return $this->serviceInstance->delete($this->id);
    }

    private function notFound()
    {
        echo 'Not found: ' . $this->requestUri;
    }

    private function notImplemented()
    {
        echo 'Not implemented: ' . $this->requestUri;
    }

    protected function checkToken()
    {
        $login = $this->loginService->validateToken();
        if (!$login) {
            http_response_code(401);
            echo 'Unauthorized';
            return false;
        }
        return $login;
    }

    public function getInput()
    {
        $json = file_get_contents('php://input');
        if (!$json) {
            $postData = [];
            foreach ($_POST as $key => $value) {
                $postData[$key] = htmlspecialchars($value);
            }
            return $postData;
        }
        return json_decode($json, true);
    }
}
