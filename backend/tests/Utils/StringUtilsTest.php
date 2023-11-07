<?php
use PHPUnit\Framework\TestCase;
use App\Util\StringUtils;

class StringUtilsTest extends TestCase
{
    public function testCamelCaseToSnakeCase() {
        $this->assertEquals('camel_case', StringUtils::camelCaseToSnakeCase('camelCase'));
    }

    public function testSnakeCaseToCamelCase() {
        $this->assertEquals('camelCase', StringUtils::snakeCaseToCamelCase('camel_case'));
    }
}
