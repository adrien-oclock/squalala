<?php

namespace App\Controller\Api\V1;

use App\Entity\Soundboard;
use App\Repository\SoundboardRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

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

        $displayGroups = ['api_soundboard_browse', 'api_sound_browse', 'api_tag_browse', 'api_like_browse', 'api_user_browse'];
        return $this->json($allSoundboards, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/{id}", name="read", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function read(int $id, SoundboardRepository $soundboardRepository): Response
    {
        $soundboard = $soundboardRepository->find($id);

        if (is_null($soundboard)) {
            return $this->getNotFoundResponse();
        }

        $displayGroups = ['api_soundboard_browse', 'api_sound_browse', 'api_tag_browse', 'api_like_browse', 'api_user_browse'];
        return $this->json($soundboard, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/{id}", name="update", methods={"PATCH"}, requirements={"id"="\d+"})
     */
    public function update(ValidatorInterface $validator, int $id, SoundboardRepository $soundboardRepository, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
        $soundboard = $soundboardRepository->find($id);

        if (is_null($soundboard)) {
            return $this->getNotFoundResponse();
        }

        $jsonContent = $request->getContent();

        $serializer->deserialize($jsonContent, Soundboard::class, 'json', [
            AbstractNormalizer::OBJECT_TO_POPULATE => $soundboard
        ]);

        $errors = $validator->validate($soundboard);

        if(count($errors) > 0)
        {
            $reponseAsArray = [
                'error' => true,
                'message' => $errors,
            ];

            return $this->json($reponseAsArray, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->persist($soundboard);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Soundboard mis à jour',
            'id' => $soundboard->getId()
        ];

        return $this->json($reponseAsArray, Response::HTTP_CREATED);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(ValidatorInterface $validator, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
        $jsonContent = $request->getContent();
        $soundboard = $serializer->deserialize($jsonContent, Soundboard::class, 'json');

        // validation des données
        $errors = $validator->validate($soundboard);

        // s'il y a eu au moins une erreur
        if(count($errors) > 0)
        {
            $reponseAsArray = [
                'error' => true,
                'message' => $errors,
            ];

            return $this->json($reponseAsArray, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->persist($soundboard);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Soundboard créé',
            'id' => $soundboard->getId()
        ];

        return $this->json($reponseAsArray, Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"}, requirements={"id"="\d+"})
     */
    public function delete(int $id, SoundboardRepository $soundboardRepository, EntityManagerInterface $entityManager): Response
    {
        $soundboard = $soundboardRepository->find($id);
        if (is_null($soundboard)) {
            return $this->getNotFoundResponse();
        }
        
        // lancer le flush
        $entityManager->remove($soundboard);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Soundboard supprimé',
            'id' => $id
        ];

        return $this->json($reponseAsArray);
    }
    
    private function getNotFoundResponse() {

        $responseArray = [
            'error' => true,
            'userMessage' => 'Ressource non trouvée',
            'internalMessage' => 'Ce soundboard n\'existe pas dans la BDD',
        ];

        return $this->json($responseArray, Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}