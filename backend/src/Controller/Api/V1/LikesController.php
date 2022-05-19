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

        $displayGroups = ['api_like_browse', 'api_soundboard_browse', 'api_user_like_browse', 'api_soundboard_like_browse', 'api_user_detail_browse'];
        return $this->json($allLikes, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/{id_user}/{id_soundboard}", name="read", methods={"GET"}, requirements={"id_user"="\d+", "id_soundboard"="\d+"})
     */
    public function read(int $id_user, int $id_soundboard, LikeRepository $likeRepository): Response
    {
        $like = $likeRepository->find([
            'user'          => $id_user,
            'soundboard'    => $id_soundboard
        ]);

        if (is_null($like)) {
            return $this->getNotFoundResponse();
        }

        $displayGroups = ['api_like_browse', 'api_like_detail_browse', 'api_soundboard_browse', 'api_user_like_browse', 'api_soundboard_like_browse', 'api_user_detail_browse'];
        return $this->json($like, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/{id_user}/{id_soundboard}", name="update", methods={"PATCH"}, requirements={"id_user"="\d+", "id_soundboard"="\d+"})
     */
    public function update(ValidatorInterface $validator, int $id_user, int $id_soundboard, LikeRepository $likeRepository, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
        $like = $likeRepository->find([
            'user'          => $id_user,
            'soundboard'    => $id_soundboard
        ]);

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
            'score' => $like->getScore(),
        ];

        return $this->json($reponseAsArray, Response::HTTP_ACCEPTED);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(ValidatorInterface $validator, LikeRepository $likeRepository, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
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

        // Vérification de l'existence de ce like
        $existingLike = $likeRepository->find([
            'user'          => $like->getUser()->getId(),
            'soundboard'    => $like->getSoundboard()->getId()
        ]);
        // Le like existe déjà, on le met à jour
        if (!is_null($existingLike)) {
            return $this->update($validator, $like->getUser()->getId(), $like->getSoundboard()->getId(), $likeRepository, $request, $serializer, $entityManager);
        }

        $entityManager->persist($like);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Like créé',
            'score' => $like->getScore()
        ];

        return $this->json($reponseAsArray, Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id_user}/{id_soundboard}", name="delete", methods={"DELETE"}, requirements={"id_user"="\d+", "id_soundboard"="\d+"})
     */
    public function delete(int $id_user, int $id_soundboard, LikeRepository $likeRepository, EntityManagerInterface $entityManager): Response
    {
        $like = $likeRepository->find([
            'user'          => $id_user,
            'soundboard'    => $id_soundboard
        ]);

        if (is_null($like)) {
            return $this->getNotFoundResponse();
        }
        
        // lancer le flush
        $entityManager->remove($like);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Like supprimé',
            'user' => $id_user,
            'soundboard' => $id_soundboard
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