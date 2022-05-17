<?php

namespace App\Controller\Api\V1;

use App\Entity\Tag;
use App\Repository\TagRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/v1/tags", name="api_v1_tags_")
 */
class TagsController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(TagRepository $tagRepository): Response
    {
        $allTags = $tagRepository->findAll();

        $displayGroups = ['api_tag_browse'];
        return $this->json($allTags, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/{id}", name="read", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function read(int $id, TagRepository $tagRepository): Response
    {
        $tag = $tagRepository->find($id);

        if (is_null($tag)) {
            return $this->getNotFoundResponse();
        }

        $displayGroups = ['api_tag_browse'];
        return $this->json($tag, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/{id}", name="update", methods={"PATCH"}, requirements={"id"="\d+"})
     */
    public function update(ValidatorInterface $validator, int $id, TagRepository $tagRepository, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
        $tag = $tagRepository->find($id);

        if (is_null($tag)) {
            return $this->getNotFoundResponse();
        }

        $jsonContent = $request->getContent();

        $serializer->deserialize($jsonContent, Tag::class, 'json', [
            AbstractNormalizer::OBJECT_TO_POPULATE => $tag
        ]);

        $errors = $validator->validate($tag);

        if(count($errors) > 0)
        {
            $reponseAsArray = [
                'error' => true,
                'message' => $errors,
            ];

            return $this->json($reponseAsArray, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->persist($tag);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Tag mis à jour',
            'id' => $tag->getId()
        ];

        return $this->json($reponseAsArray, Response::HTTP_ACCEPTED);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(ValidatorInterface $validator, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
        $jsonContent = $request->getContent();
        $tag = $serializer->deserialize($jsonContent, Tag::class, 'json');

        // validation des données
        $errors = $validator->validate($tag);

        // s'il y a eu au moins une erreur
        if(count($errors) > 0)
        {
            $reponseAsArray = [
                'error' => true,
                'message' => $errors,
            ];

            return $this->json($reponseAsArray, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->persist($tag);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Tag créé',
            'id' => $tag->getId()
        ];

        return $this->json($reponseAsArray, Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"}, requirements={"id"="\d+"})
     */
    public function delete(int $id, TagRepository $tagRepository, EntityManagerInterface $entityManager): Response
    {
        $tag = $tagRepository->find($id);
        if (is_null($tag)) {
            return $this->getNotFoundResponse();
        }
        
        // lancer le flush
        $entityManager->remove($tag);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Tag supprimé',
            'id' => $id
        ];

        return $this->json($reponseAsArray);
    }
    
    private function getNotFoundResponse() {

        $responseArray = [
            'error' => true,
            'userMessage' => 'Ressource non trouvée',
            'internalMessage' => 'Ce tag n\'existe pas dans la BDD',
        ];

        return $this->json($responseArray, Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}