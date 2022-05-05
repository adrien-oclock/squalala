<?php

namespace App\Controller\BackOffice;

use App\Repository\TagRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/backoffice/tag", name="backoffice_tag_")
 */
class TagController extends AbstractController
{
    /**
     * @Route("/", name="browse", methods={"GET"})
     */
    public function browse(TagRepository $tagRepository): Response
    {
        return $this->render('backoffice/tag/browse.html.twig', [
            'tag_list' => $tagRepository->findAll()
        ]);
    }
}