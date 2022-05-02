<?php

namespace App\Controller\Api\V1;

use App\Repository\SoundboardRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Route("/api/v1/soundboards", name="api_v1_soundboards_")
 */
class SoundboardsController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(SoundboardRepository $soundboardRepository): Response
    {
        $allSoundboards = $soundboardRepository->findAll();

        return $this->json($allSoundboards, Response::HTTP_OK, [], ['groups' => 'api_soundboard_browse']);
    }
}