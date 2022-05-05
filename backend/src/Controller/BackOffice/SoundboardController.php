<?php

namespace App\Controller\BackOffice;

use App\Entity\Soundboard;
use App\Form\SoundboardType;
use App\Repository\SoundboardRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
// Convert route id to Entity
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * @Route("/backoffice/soundboard", name="backoffice_soundboard_")
 */
class SoundboardController extends AbstractController
{
    /**
     * @Route("/", name="browse", methods={"GET"})
     */
    public function browse(SoundboardRepository $soundboardRepository): Response
    {
        return $this->render('backoffice/soundboard/browse.html.twig', [
            'soundboard_list' => $soundboardRepository->findAll()
        ]);
    }

    /**
     * @Route("/read/{id}", name="read", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function read(Request $request, Soundboard $soundboard): Response
    {
        // on créé un formulaire avec l'objet récupéré
        $soundboardForm = $this->createForm(SoundboardType::class, $soundboard, [
            'disabled' => 'disabled'
        ]);

        // on modifie dynamiquement (dans le controleur) les options du formulaire
        // pour désactiver tous les champs
        $soundboardForm
            ->add('createdAt', null, [
            'widget' => 'single_text',
        ])
            ->add('updatedAt', null, [
            'widget' => 'single_text',
        ]);

        // on fournit ce formulaire à notre vue
        return $this->render('backoffice/soundboard/read.html.twig', [
            'soundboard_form' => $soundboardForm->createView(),
            'soundboard' => $soundboard,
        ]);
    }

     /**
     * @Route("/edit/{id}", name="edit", methods={"GET", "POST"}, requirements={"id"="\d+"})
     */
    public function edit(Request $request, Soundboard $soundboard, EntityManagerInterface $entityManager): Response
    {
        $soundboardForm = $this->createForm(SoundboardType::class, $soundboard);

        $soundboardForm->handleRequest($request);

        if ($soundboardForm->isSubmitted() && $soundboardForm->isValid()) {
            $entityManager->flush();

            $this->addFlash('success', "Soundboard `{$soundboard->getTitle()}` mis à jour");

            return $this->redirectToRoute('backoffice_soundboard_browse');
        }

        return $this->render('backoffice/soundboard/update.html.twig', [
            'soundboard_form' => $soundboardForm->createView(),
            'soundboard' => $soundboard,
            'page' => 'edit',
        ]);
    }

     /**
     * @Route("/add", name="add", methods={"GET", "POST"})
     */
    public function add(Request $request, EntityManagerInterface $entityManager): Response
    {
        $soundboard = new Soundboard();

        // on créé un formulaire vierge (sans données initiales car l'objet fournit est vide)
        $soundboardForm = $this->createForm(SoundboardType::class, $soundboard);

        // Après avoir été affiché le handleRequest nous permettra
        // de faire la différence entre un affichage de formulaire (en GET) 
        // et une soumission de formulaire (en POST)
        // Si un formulaire a été soumis, il rempli l'objet fournit lors de la création
        $soundboardForm->handleRequest($request);

        // l'objet de formulaire a vérifié si le formulaire a été soumis grace au HandleRequest
        // l'objet de formulaire vérifie si le formulaire est valide (token csrf mais pas que)
        if ($soundboardForm->isSubmitted() && $soundboardForm->isValid()) {
            $entityManager->persist($soundboard);
            $entityManager->flush();

            $this->addFlash('success', "Soundboard `{$soundboard->getTitle()}` ajouté");

            return $this->redirectToRoute('backoffice_soundboard_browse');
        }

        return $this->render('backoffice/soundboard/update.html.twig', [
            'soundboard_form' => $soundboardForm->createView(),
            'page' => 'create',
        ]);
    }

    /**
     * @Route("/delete/{id}", name="delete", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function delete(Soundboard $soundboard, EntityManagerInterface $entityManager): Response
    {
        $this->addFlash('success', "Soundboard {$soundboard->getTitle()} supprimé");

        $entityManager->remove($soundboard);
        $entityManager->flush();

        return $this->redirectToRoute('backoffice_soundboard_browse');
    }
}