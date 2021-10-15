<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Service\Calculate;

class CalculatorTest extends WebTestCase
{
    public function testSimpleAddition(): void
    {
        $calculate = static::getContainer()->get(Calculate::class);
        $result = $calculate->getResult("2+2");
        $this->assertEquals("4", $result->getContent());
    }

    public function testSimpleSubstraction(): void
    {
        $calculate = static::getContainer()->get(Calculate::class);
        $result = $calculate->getResult("2-2");
        $this->assertEquals("0", $result->getContent());
    }

    public function testSimpleMultiplication(): void
    {
        $calculate = static::getContainer()->get(Calculate::class);
        $result = $calculate->getResult("2*2");
        $this->assertEquals("4", $result->getContent());
    }

    public function testSimpleDivision(): void
    {
        $calculate = static::getContainer()->get(Calculate::class);
        $result = $calculate->getResult("2/2");
        $this->assertEquals("1", $result->getContent());
    }

    public function testAdditionAndSubstraction(): void
    {
        $calculate = static::getContainer()->get(Calculate::class);
        $result = $calculate->getResult("2+5-3");
        $this->assertEquals("4", $result->getContent());
    }

    public function testAdditionAndDivision(): void
    {
        $calculate = static::getContainer()->get(Calculate::class);
        $result = $calculate->getResult("2+6/2");
        $this->assertEquals("5", $result->getContent());
    }

    public function testAdditionAndMultiplication(): void
    {
        $calculate = static::getContainer()->get(Calculate::class);
        $result = $calculate->getResult("2+6*2");
        $this->assertEquals("14", $result->getContent());
    }

    public function testCalculWithFloat(): void
    {
        $calculate = static::getContainer()->get(Calculate::class);
        $result = $calculate->getResult("2.5*2-0.5");
        $this->assertEquals("4.5", $result->getContent());
    }

    public function testResultFloat(): void
    {
        $calculate = static::getContainer()->get(Calculate::class);
        $result = $calculate->getResult("5/2");
        $this->assertEquals("2.5", $result->getContent());
    }

    public function testWithMultipleMultiplication(): void
    {
        $calculate = static::getContainer()->get(Calculate::class);
        $result = $calculate->getResult("2*2*4*6");
        $this->assertEquals("96", $result->getContent());
    }

    public function testNegativeNumberAddition(): void
    {
        $calculate = static::getContainer()->get(Calculate::class);
        $result = $calculate->getResult("-5+6");
        $this->assertEquals("1", $result->getContent());
    }

    public function testMultipleNegativeNumber(): void
    {
        $calculate = static::getContainer()->get(Calculate::class);
        $result = $calculate->getResult("-5*3");
        $this->assertEquals("-15", $result->getContent());
    }
}
