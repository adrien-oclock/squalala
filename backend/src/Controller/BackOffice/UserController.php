<?php

namespace App\Controller\BackOffice;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
// Convert route id to Entity
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/backoffice/user", name="backoffice_user_")
 * @IsGranted("ROLE_ADMIN")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/", name="browse", methods={"GET"})
     */
    public function browse(UserRepository $userRepository): Response
    {
        return $this->render('backoffice/user/browse.html.twig', [
            'user_list' => $userRepository->findAll()
        ]);
    }

    /**
     * @Route("/read/{id}", name="read", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function read(Request $request, User $user): Response
    {
        // on créé un formulaire avec l'objet récupéré
        $userForm = $this->createForm(UserType::class, $user, [
            'disabled' => 'disabled'
        ]);

        // on modifie dynamiquement (dans le controleur) les options du formulaire
        // pour désactiver tous les champs
        $userForm
            ->add('createdAt', null, [
            'widget' => 'single_text',
        ])
            ->add('updatedAt', null, [
            'widget' => 'single_text',
        ]);

        // on fournit ce formulaire à notre vue
        return $this->render('backoffice/user/read.html.twig', [
            'user_form' => $userForm->createView(),
            'user' => $user,
        ]);
    }

     /**
     * @Route("/edit/{id}", name="edit", methods={"GET", "POST"}, requirements={"id"="\d+"})
     */
    public function edit(Request $request, User $user, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
    {
        $userForm = $this->createForm(UserType::class, $user);

        $userForm->handleRequest($request);

        if ($userForm->isSubmitted() && $userForm->isValid()) {
            $clearPassword = $request->request->get('user')['password']['first'];
            // si un mot de passe a été saisi
            if (! empty($clearPassword))
            {
                // hashage du mot de passe écrit en clair
                $hashedPassword = $passwordHasher->hashPassword($user, $clearPassword);
                $user->setPassword($hashedPassword);
            }
            $entityManager->flush();

            $this->addFlash('success', "Utilisateur `{$user->getUserIdentifier()}` mis à jour");

            return $this->redirectToRoute('backoffice_user_browse');
        }

        return $this->render('backoffice/user/update.html.twig', [
            'user_form' => $userForm->createView(),
            'user' => $user,
            'page' => 'edit',
        ]);
    }

     /**
     * @Route("/add", name="add", methods={"GET", "POST"})
     */
    public function add(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
    {
        $user = new User();

        // on créé un formulaire vierge (sans données initiales car l'objet fournit est vide)
        $userForm = $this->createForm(UserType::class, $user);

        // Après avoir été affiché le handleRequest nous permettra
        // de faire la différence entre un affichage de formulaire (en GET) 
        // et une soumission de formulaire (en POST)
        // Si un formulaire a été soumis, il rempli l'objet fournit lors de la création
        $userForm->handleRequest($request);

        // l'objet de formulaire a vérifié si le formulaire a été soumis grace au HandleRequest
        // l'objet de formulaire vérifie si le formulaire est valide (token csrf mais pas que)
        if ($userForm->isSubmitted() && $userForm->isValid()) {
            $entityManager->persist($user);
            $clearPassword = $request->request->get('user')['password']['first'];
            // si un mot de passe a été saisi
            if (! empty($clearPassword))
            {
                // hashage du mot de passe écrit en clair
                $hashedPassword = $passwordHasher->hashPassword($user, $clearPassword);
                $user->setPassword($hashedPassword);
            }
            $entityManager->flush();

            $this->addFlash('success', "Utilisateur `{$user->getUserIdentifier()}` ajouté");

            return $this->redirectToRoute('backoffice_user_browse');
        }

        return $this->render('backoffice/user/update.html.twig', [
            'user_form' => $userForm->createView(),
            'page' => 'create',
        ]);
    }

    /**
     * @Route("/delete/{id}", name="delete", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function delete(User $user, EntityManagerInterface $entityManager): Response
    {
        $this->addFlash('success', "Utilisateur {$user->getUserIdentifier()} supprimé");

        $entityManager->remove($user);
        $entityManager->flush();

        return $this->redirectToRoute('backoffice_user_browse');
    }
}