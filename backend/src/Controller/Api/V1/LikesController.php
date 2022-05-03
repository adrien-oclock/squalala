<?php

namespace App\Controller\Api\V1;

use App\Entity\Like;
use App\Repository\LikeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/v1/likes", name="api_v1_likes_")
 */
class LikesController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(LikeRepository $likeRepository): Response
    {
        $allLikes = $likeRepository->findAll();

        $displayGroups = ['api_like_browse', 'api_like_detail_browse'];
        return $this->json($allLikes, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/{id}", name="read", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function read(int $id, LikeRepository $likeRepository): Response
    {
        $like = $likeRepository->find($id);

        if (is_null($like)) {
            return $this->getNotFoundResponse();
        }

        $displayGroups = ['api_like_browse', 'api_like_browse', 'api_like_browse', 'api_like_browse', 'api_user_browse'];
        return $this->json($like, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/{id}", name="update", methods={"PATCH"}, requirements={"id"="\d+"})
     */
    public function update(ValidatorInterface $validator, int $id, LikeRepository $likeRepository, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
        $like = $likeRepository->find($id);

        if (is_null($like)) {
            return $this->getNotFoundResponse();
        }

        $jsonContent = $request->getContent();

        $serializer->deserialize($jsonContent, Like::class, 'json', [
            AbstractNormalizer::OBJECT_TO_POPULATE => $like
        ]);

        $errors = $validator->validate($like);

        if(count($errors) > 0)
        {
            $reponseAsArray = [
                'error' => true,
                'message' => $errors,
            ];

            return $this->json($reponseAsArray, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->persist($like);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Like mis à jour',
            'id' => $like->getId()
        ];

        return $this->json($reponseAsArray, Response::HTTP_CREATED);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(ValidatorInterface $validator, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
        $jsonContent = $request->getContent();
        $like = $serializer->deserialize($jsonContent, Like::class, 'json');

        // validation des données
        $errors = $validator->validate($like);

        // s'il y a eu au moins une erreur
        if(count($errors) > 0)
        {
            $reponseAsArray = [
                'error' => true,
                'message' => $errors,
            ];

            return $this->json($reponseAsArray, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->persist($like);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Like créé',
            'id' => $like->getId()
        ];

        return $this->json($reponseAsArray, Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"}, requirements={"id"="\d+"})
     */
    public function delete(int $id, LikeRepository $likeRepository, EntityManagerInterface $entityManager): Response
    {
        $like = $likeRepository->find($id);
        if (is_null($like)) {
            return $this->getNotFoundResponse();
        }
        
        // lancer le flush
        $entityManager->remove($like);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Like supprimé',
            'id' => $id
        ];

        return $this->json($reponseAsArray);
    }
    
    private function getNotFoundResponse() {

        $responseArray = [
            'error' => true,
            'userMessage' => 'Ressource non trouvée',
            'internalMessage' => 'Ce like n\'existe pas dans la BDD',
        ];

        return $this->json($responseArray, Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}