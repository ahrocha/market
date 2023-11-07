<?php

namespace App\Util;

class StringUtils
{
    public static function camelCaseToSnakeCase($input)
    {
        $result = preg_replace('/(?!^)[[:upper:]]/', '_$0', $input);
        return strtolower($result);
    }

    public static function snakeCaseToCamelCase($input)
    {
        $parts = explode('_', $input);
        $camelCaseString = '';

        foreach ($parts as $part) {
            $camelCaseString .= ucfirst($part);
        }

        $camelCaseString = lcfirst($camelCaseString);

        return $camelCaseString;
    }
}
