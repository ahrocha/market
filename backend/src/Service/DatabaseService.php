<?php

namespace App\Service;

use App\Model\BaseModel;

class DatabaseService
{
    protected $db = null;

    public function __construct()
    {
        # create DB connection using pdo postgresql
        $db = new \PDO(
            'pgsql:host='.getenv('POSTGRES_HOST').';dbname='.getenv('POSTGRES_DB'),
            getenv('POSTGRES_USER'),
            getenv('POSTGRES_PASSWORD'));
        $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
        # connect DB
        $this->db = $db;
    }

    public function __destruct()
    {
        $this->db = null;
    }

    public function list($tableName)
    {
        $sql = 'SELECT * FROM '.$tableName;
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function get(BaseModel $data)
    {
        $sql = 'SELECT * FROM '.$data->getTableName().' WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $data->id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function insert(BaseModel $data)
    {
        $sql = 'INSERT INTO '.$data->getTableName().'
            ('.implode(',', $data->fields).')
            VALUES
            (:'.implode(',:', $data->fields).')';
        $stmt = $this->db->prepare($sql);
        $stmt->execute($data->getValues());
        return $this->db->lastInsertId();
    }

    public function delete(BaseModel $data)
    {
        $sql = 'DELETE FROM '.$data->getTableName().' WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $data->id]);
        return $stmt->rowCount();
    }

    public function getByField(BaseModel $data, $field, $value)
    {
        $sql = 'SELECT * FROM '.$data->getTableName().' WHERE '.$field.' = :'.$field;
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$field => $value]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}
