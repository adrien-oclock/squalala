<?php

namespace App\Controller\BackOffice;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
// Convert route id to Entity
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/backoffice", name="backoffice_")
 * @IsGranted("ROLE_ADMIN")
 */
class MainController extends AbstractController
{
    /**
     * @Route("/", name="home", methods={"GET"})
     */
    public function browse(): Response
    {
        return $this->redirectToRoute('backoffice_soundboard_browse');
    }
}