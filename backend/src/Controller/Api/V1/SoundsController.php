<?php

namespace App\Controller\Api\V1;

use App\Entity\Sound;
use App\Repository\SoundRepository;
use App\Service\File;
use App\Service\UploadBase64File;
use App\Service\Base64FileExtractor;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/v1/sounds", name="api_v1_sounds_")
 */
class SoundsController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(SoundRepository $soundRepository): Response
    {
        $allSounds = $soundRepository->findAll();

        $displayGroups = ['api_sound_browse'];
        return $this->json($allSounds, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/{id}", name="read", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function read(int $id, SoundRepository $soundRepository): Response
    {
        $sound = $soundRepository->find($id);

        if (is_null($sound)) {
            return $this->getNotFoundResponse();
        }

        $displayGroups = ['api_sound_browse'];
        return $this->json($sound, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/{id}", name="update", methods={"PATCH"}, requirements={"id"="\d+"})
     */
    public function update(ValidatorInterface $validator, int $id, SoundRepository $soundRepository, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
        $sound = $soundRepository->find($id);

        if (is_null($sound)) {
            return $this->getNotFoundResponse();
        }

        $jsonContent = $request->getContent();

        $serializer->deserialize($jsonContent, Sound::class, 'json', [
            AbstractNormalizer::OBJECT_TO_POPULATE => $sound
        ]);

        $errors = $validator->validate($sound);

        if(count($errors) > 0)
        {
            $reponseAsArray = [
                'error' => true,
                'message' => $errors,
            ];

            return $this->json($reponseAsArray, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->persist($sound);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Sound mis ?? jour',
            'id' => $sound->getId()
        ];

        return $this->json($reponseAsArray, Response::HTTP_ACCEPTED);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(ValidatorInterface $validator, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, File $fileManager, Base64FileExtractor $base64FileExtractor): Response
    {
        $jsonContent = $request->getContent();
        $sound = $serializer->deserialize($jsonContent, Sound::class, 'json');

        // validation des donn??es
        $errors = $validator->validate($sound);

        // s'il y a eu au moins une erreur
        if(count($errors) > 0)
        {
            $reponseAsArray = [
                'error' => true,
                'message' => $errors,
            ];

            return $this->json($reponseAsArray, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->persist($sound);
        $entityManager->flush();

        $displayGroups = ['api_sound_browse'];
        return $this->json($sound, Response::HTTP_CREATED, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/upload", name="upload", methods={"POST"})
     */
    public function upload(Request $request, File $fileManager, Base64FileExtractor $base64FileExtractor): Response
    {
        $jsonContent = $request->getContent();
        $data = json_decode($jsonContent);
        $title = $data->filename;
        $base64String = $data->file;
        $base64Image = $base64FileExtractor->extractBase64String($base64String);
        $soundFile = new UploadBase64File($base64Image, $title);
        $filename = $fileManager->upload($soundFile, $title);

        $reponseAsArray = [
            'message' => 'Sound uppload??',
            'title' => $filename
        ];

        return $this->json($reponseAsArray, Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"}, requirements={"id"="\d+"})
     */
    public function delete(int $id, SoundRepository $soundRepository, EntityManagerInterface $entityManager): Response
    {
        $sound = $soundRepository->find($id);
        if (is_null($sound)) {
            return $this->getNotFoundResponse();
        }
        
        // lancer le flush
        $entityManager->remove($sound);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'Sound supprim??',
            'id' => $id
        ];

        return $this->json($reponseAsArray);
    }
    
    private function getNotFoundResponse() {

        $responseArray = [
            'error' => true,
            'userMessage' => 'Ressource non trouv??e',
            'internalMessage' => 'Ce sound n\'existe pas dans la BDD',
        ];

        return $this->json($responseArray, Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}