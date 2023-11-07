<?php
/**
 * @TODO
 * 
 * 
 */
require_once dirname(__DIR__).'/vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Expose-Headers: Authorization');
    header('Access-Control-Max-Age: 86400');
    echo '';
    exit();
}

$path = $_SERVER['REQUEST_URI'];

$controllerName = explode('/', $path)[1];
$controllerNamespace = 'App\Controller\\';
$controllerName = ucfirst($controllerName);
$controllerClassName = $controllerNamespace . $controllerName . 'Controller';

if (class_exists($controllerClassName)) {
    $controllerInstance = new $controllerClassName();
    $controllerInstance->dispatch();
} else {
    echo $controllerClassName;
    echo 404;
}
