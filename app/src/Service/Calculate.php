<?php

namespace App\Service;


use Symfony\Component\HttpFoundation\Response;

class Calculate
{
    public function getResult($calcul): Response
    {
        $calculWithParenthesis = $this->addParenthesis($calcul);
        $calculWithinParenthesis = $this->calculWithinParenthesis($calculWithParenthesis);
        $array = $this->splitToArray($calculWithinParenthesis);
        return new Response($this->calculate($array));
    }

    private function addParenthesis($calcul): string
    {
        $transform = "";
        $number = null;
        $nbParenthesisOpen = 0;

        for ($i = 0; $i < strlen($calcul); $i++) {
            $character = $calcul[$i];

            if ($i === strlen($calcul) - 1) {
                $transform = "$transform$number$character";
                $transform .= str_repeat(")", $nbParenthesisOpen);
            } elseif ($character === "-" && $calcul[0] === "-") {
                $number = $character;
            } elseif ($character === "+" || $character === "-") {
                if ($nbParenthesisOpen > 0) {
                    $transform = "$transform$number)$character";
                    $nbParenthesisOpen--;
                } else {
                    $transform = "$transform$number$character";
                }

                $number = null;
            } elseif ($character === "*" || $character === "/") {
                $transform = "$transform($number$character";
                $number = null;
                $nbParenthesisOpen++;
            } else {
                $number = "$number$character";
            }
        }

        return $transform;
    }

    private function calculWithinParenthesis($calcul): string
    {
        $posFirstCloseParenthesis = strpos($calcul, ")"); // Find first ")"

        if ($posFirstCloseParenthesis) {
            $firstStrip = substr($calcul, 0, $posFirstCloseParenthesis);
            $posLastOpenParenthesis = strrpos($firstStrip, "("); // Find last "("
            $finalStrip = substr($firstStrip, $posLastOpenParenthesis + 1, strlen($firstStrip));
            $calcul = str_replace("($finalStrip)", $this->calculate($this->splitToArray($finalStrip)), $calcul);
            return $this->calculWithinParenthesis($calcul);
        }

        return $calcul;
    }

    private function splitToArray($calcul): array
    {
        $test = [];
        $index = 0;

        for ($i = 0; $i < strlen($calcul); $i++) {
            $character = $calcul[$i];

            if ($character === "-" && $calcul[0] === "-") {
                $test[0] = $character;
            } elseif ($character === "+" || $character === "-" || $character === "/" || $character === "*") {
                $test[] = $character;
                $index += 2;
            } else {
                if (sizeof($test) > $index) {
                    $test[$index] = "$test[$index]$character";
                } else {
                    $test[$index] = $character;
                }
            }
        }

        return $test;
    }

    private function calculate($calcul): int|float
    {
        if (sizeof($calcul) > 1) {
            $operator = $calcul[1];

            $result = match ($operator) {
                '+' => $calcul[0] + $calcul[2],
                '-' => $calcul[0] - $calcul[2],
                '*' => $calcul[0] * $calcul[2],
                '/' => $calcul[0] / $calcul[2]
            };

            array_shift($calcul);
            array_shift($calcul);
            array_shift($calcul);
            array_unshift($calcul, $result);

            return $this->calculate($calcul);
        }

        return $calcul[0];
    }
}
