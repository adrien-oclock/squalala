<?php

namespace App\Controller\Api\V1;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/v1/users", name="api_v1_users_")
 */
class UsersController extends AbstractController
{
    /**
     * @Route("/likes/{order}", name="browse_by_likes", methods={"GET"}, defaults={"order"="desc"})
     */
    public function browseByLikes(string $order, UserRepository $userRepository, Request $request, PaginatorInterface $paginator): Response
    {
        $page = $request->query->getInt('page', 1);
        $search = $request->query->get('search');
        $usersQuery = $userRepository->findAllWithLikes($order, 'like', $search);

        $users = $paginator->paginate(
            $usersQuery,
            $page,
            9,
        );

        $data = [
            'list' => $users,
            'pagination' => $users->getPaginationData()
        ];

        $displayGroups = ['api_user_detail_browse', 'api_sound_browse', 'api_tag_browse', 'api_like_browse', 'api_soundboard_browse', 'api_like_user_browse', 'api_soundboard_user_browse'];
        return $this->json($data, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/{id}", name="read", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function read(int $id, UserRepository $userRepository): Response
    {
        $user = $userRepository->findWithLikes($id);

        if (is_null($user) || empty($user)) {
            return $this->getNotFoundResponse();
        }

        $displayGroups = ['api_user_detail_browse', 'api_sound_browse', 'api_tag_browse', 'api_like_browse', 'api_soundboard_browse', 'api_like_user_browse', 'api_soundboard_user_browse'];
        return $this->json($user, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }

    /**
     * @Route("/{order}", name="browse", methods={"GET"}, defaults={"order"="desc"})
     */
    public function browse(string $order, UserRepository $userRepository, Request $request, PaginatorInterface $paginator): Response
    {
        $page = $request->query->getInt('page', 1);
        $search = $request->query->get('search');
        $usersQuery = $userRepository->findAllWithLikes($order, 'date', $search);

        $users = $paginator->paginate(
            $usersQuery,
            $page,
            9,
        );

        $data = [
            'list' => $users,
            'pagination' => $users->getPaginationData()
        ];

        $displayGroups = ['api_user_detail_browse', 'api_sound_browse', 'api_tag_browse', 'api_like_browse', 'api_soundboard_browse', 'api_like_user_browse', 'api_soundboard_user_browse'];
        return $this->json($data, Response::HTTP_OK, [], ['groups' => $displayGroups]);
    }
    
    /**
     * @Route("/{id}", name="update", methods={"PATCH"}, requirements={"id"="\d+"})
     */
    public function update(ValidatorInterface $validator, int $id, UserRepository $userRepository, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
    {
        $user = $userRepository->find($id);

        if (is_null($user)) {
            return $this->getNotFoundResponse();
        }

        $jsonContent = $request->getContent();

        $serializer->deserialize($jsonContent, User::class, 'json', [
            AbstractNormalizer::OBJECT_TO_POPULATE => $user
        ]);

        $errors = $validator->validate($user);

        if(count($errors) > 0)
        {
            $reponseAsArray = [
                'error' => true,
                'message' => $errors,
            ];

            return $this->json($reponseAsArray, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        /* Hash password */
        $plainTextPassword = $user->getPassword();
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plainTextPassword
        );
        $user->setPassword($hashedPassword);

        $entityManager->persist($user);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'User mis à jour',
            'id' => $user->getId()
        ];

        return $this->json($reponseAsArray, Response::HTTP_ACCEPTED);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(ValidatorInterface $validator, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
    {
        $jsonContent = $request->getContent();
        $user = $serializer->deserialize($jsonContent, User::class, 'json');

        // validation des données
        $errors = $validator->validate($user);

        // s'il y a eu au moins une erreur
        if(count($errors) > 0)
        {
            $reponseAsArray = [
                'error' => true,
                'message' => $errors,
            ];

            return $this->json($reponseAsArray, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        /* Hash password */
        $plainTextPassword = $user->getPassword();
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plainTextPassword
        );
        $user->setPassword($hashedPassword);

        $entityManager->persist($user);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'User créé',
            'id' => $user->getId()
        ];

        return $this->json($reponseAsArray, Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"}, requirements={"id"="\d+"})
     */
    public function delete(int $id, UserRepository $userRepository, EntityManagerInterface $entityManager): Response
    {
        $user = $userRepository->find($id);
        if (is_null($user)) {
            return $this->getNotFoundResponse();
        }
        
        // lancer le flush
        $entityManager->remove($user);
        $entityManager->flush();
        
        $reponseAsArray = [
            'message' => 'User supprimé',
            'id' => $id
        ];

        return $this->json($reponseAsArray);
    }
    
    private function getNotFoundResponse() {

        $responseArray = [
            'error' => true,
            'userMessage' => 'Ressource non trouvée',
            'internalMessage' => 'Ce user n\'existe pas dans la BDD',
        ];

        return $this->json($responseArray, Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}