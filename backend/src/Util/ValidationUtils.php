<?php

namespace App\Util;

class ValidationUtils
{
    public static function validateEmail($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception('Invalid email', 400);
        }
    }

    public static function validatePassword($password)
    {
        if (strlen($password) < 4) {
            throw new \Exception('Password must be at least 5 characters long', 400);
        }
    }
}