<?php

namespace App\Controller\BackOffice;

use App\Entity\Like;
use App\Form\LikeType;
use App\Repository\LikeRepository;
use App\Repository\SoundboardRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/backoffice/like", name="backoffice_like_")
 * @IsGranted("ROLE_ADMIN")
 */
class LikeController extends AbstractController
{
    /**
     * @Route("/", name="browse", methods={"GET"})
     */
    public function browse(LikeRepository $likeRepository): Response
    {
        return $this->render('backoffice/like/browse.html.twig', [
            'like_list' => $likeRepository->findAll()
        ]);
    }

    /**
     * @Route("/read/{user_id}/{soundboard_id}", name="read", methods={"GET"}, requirements={"user_id"="\d+", "soundboard_id"="\d+"})
     */
    public function read(Request $request, int $user_id, int $soundboard_id, LikeRepository $likeRepository): Response
    {
        $like = $likeRepository->find([
            'user' => $user_id,
            'soundboard' => $soundboard_id
        ]);

        // on créé un formulaire avec l'objet récupéré
        $likeForm = $this->createForm(LikeType::class, $like, [
            'disabled' => 'disabled'
        ]);

        // on modifie dynamiquement (dans le controleur) les options du formulaire
        // pour désactiver tous les champs
        $likeForm
            ->add('createdAt', null, [
            'widget' => 'single_text',
        ])
            ->add('updatedAt', null, [
            'widget' => 'single_text',
        ]);

        // on fournit ce formulaire à notre vue
        return $this->render('backoffice/like/read.html.twig', [
            'like_form' => $likeForm->createView(),
            'like' => $like,
        ]);
    }

     /**
     * @Route("/edit/{user_id}/{soundboard_id}", name="edit", methods={"GET", "POST"}, requirements={"user_id"="\d+", "soundboard_id"="\d+"})
     */
    public function edit(Request $request, int $user_id, int $soundboard_id, LikeRepository $likeRepository, EntityManagerInterface $entityManager): Response
    {
        $like = $likeRepository->find([
            'user' => $user_id,
            'soundboard' => $soundboard_id
        ]);
        $likeForm = $this->createForm(LikeType::class, $like);

        $likeForm->handleRequest($request);

        if ($likeForm->isSubmitted() && $likeForm->isValid()) {
            $entityManager->flush();

            $this->addFlash('success', "Like mis à jour");

            return $this->redirectToRoute('backoffice_like_browse');
        }

        return $this->render('backoffice/like/update.html.twig', [
            'like_form' => $likeForm->createView(),
            'like' => $like,
            'page' => 'edit',
        ]);
    }

     /**
     * @Route("/add", name="add", methods={"GET", "POST"})
     */
    public function add(Request $request, UserRepository $userRepository, SoundboardRepository $soundboardRepository, EntityManagerInterface $entityManager): Response
    {
        // Dummy data
        $user = $userRepository->findOneBy([]);
        $soundboard = $soundboardRepository->findOneBy([]);
        $like = new Like($user, $soundboard);

        // on créé un formulaire vierge (sans données initiales car l'objet fournit est vide)
        $likeForm = $this->createForm(LikeType::class, $like);

        // Après avoir été affiché le handleRequest nous permettra
        // de faire la différence entre un affichage de formulaire (en GET) 
        // et une soumission de formulaire (en POST)
        // Si un formulaire a été soumis, il rempli l'objet fournit lors de la création
        $likeForm->handleRequest($request);

        // l'objet de formulaire a vérifié si le formulaire a été soumis grace au HandleRequest
        // l'objet de formulaire vérifie si le formulaire est valide (token csrf mais pas que)
        if ($likeForm->isSubmitted() && $likeForm->isValid()) {
            $user = $userRepository->find($request->request->get('like')['user']);
            $soundboard = $soundboardRepository->find($request->request->get('like')['soundboard']);
            $entityManager->persist($like);
            $entityManager->flush();

            $this->addFlash('success', "Like ajouté");

            return $this->redirectToRoute('backoffice_like_browse');
        }

        return $this->render('backoffice/like/update.html.twig', [
            'like_form' => $likeForm->createView(),
            'page' => 'create',
        ]);
    }

    /**
     * @Route("/delete/{user_id}/{soundboard_id}", name="delete", methods={"GET"}, requirements={"user_id"="\d+", "soundboard_id"="\d+"})
     */
    public function delete(int $user_id, int $soundboard_id, LikeRepository $likeRepository, EntityManagerInterface $entityManager): Response
    {
        $like = $likeRepository->find([
            'user' => $user_id,
            'soundboard' => $soundboard_id
        ]);

        $this->addFlash('success', "Like supprimé");

        $entityManager->remove($like);
        $entityManager->flush();

        return $this->redirectToRoute('backoffice_like_browse');
    }
}