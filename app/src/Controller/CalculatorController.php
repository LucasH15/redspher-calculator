<?php

namespace App\Controller;

use App\Service\Calculate;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CalculatorController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(): Response
    {
        return $this->render('index.html.twig');
    }

    #[Route('/api/calcul', methods: "POST")]
    public function calcul(Request $request, Calculate $calculate): Response
    {
        $data = $request->getContent();
        $data = json_decode($data, true);
        $calcul = $data['calcul'];

        return $calculate->getResult($calcul);
    }
}
