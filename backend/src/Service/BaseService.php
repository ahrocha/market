<?php

namespace App\Service;

use App\Model\BaseModel;

class BaseService
{
    private $id = null;
    private $path = '';
    private $modelClassName = '';
    protected $modelInstance = null;

    public function __construct()
    {
        $this->path = $_SERVER['REQUEST_URI']; // PATH_INFO
        $modelName = explode('/', $this->path)[1];
        $modelNamespace = 'App\Model\\';
        $modelName = ucfirst($modelName);
        $this->modelClassName = $modelNamespace . $modelName . 'Model';
        $this->modelInstance = new $this->modelClassName();
    }

    public function save(BaseModel $json)
    {
        if ($json->id) {
            return $json->update();
        }
        return $json->create();
    }

    public function list()
    {
        $db = new DatabaseService();
        return json_encode($db->list($this->modelInstance->getTableName()));
    }

    public function read($id)
    {
        $db = new DatabaseService();
        $data = new $this->modelClassName();
        $data->id = $id;
        return json_encode($db->get($data));
    }

    public function delete($id)
    {
        $db = new DatabaseService();
        $data = new $this->modelClassName();
        $data->id = $id;
        return $db->delete($data);
    }
}
