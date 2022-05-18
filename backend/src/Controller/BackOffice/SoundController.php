<?php

namespace App\Controller\BackOffice;

use App\Entity\Sound;
use App\Form\SoundType;
use App\Repository\SoundRepository;
use App\Service\File;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
// Convert route id to Entity
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\UrlHelper;

/**
 * @Route("/backoffice/sound", name="backoffice_sound_")
 * @IsGranted("ROLE_ADMIN")
 */
class SoundController extends AbstractController
{
    /**
     * @Route("/", name="browse", methods={"GET"})
     */
    public function browse(SoundRepository $soundRepository, Request $request, PaginatorInterface $paginator): Response
    {
        $soundsQuery = $soundRepository->findAllQuery();
        $sounds = $paginator->paginate(
            $soundsQuery,
            $request->query->getInt('page', 1),
            10,
        );

        return $this->render('backoffice/sound/browse.html.twig', [
            'sound_list' => $sounds
        ]);
    }

    /**
     * @Route("/read/{id}", name="read", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function read(Request $request, Sound $sound): Response
    {
        // on créé un formulaire avec l'objet récupéré
        $soundForm = $this->createForm(SoundType::class, $sound, [
            'disabled' => 'disabled'
        ]);

        // on modifie dynamiquement (dans le controleur) les options du formulaire
        // pour désactiver tous les champs
        $soundForm
            ->add('createdAt', null, [
            'widget' => 'single_text',
        ])
            ->add('updatedAt', null, [
            'widget' => 'single_text',
        ]);

        // on fournit ce formulaire à notre vue
        return $this->render('backoffice/sound/read.html.twig', [
            'sound_form' => $soundForm->createView(),
            'sound' => $sound,
        ]);
    }

     /**
     * @Route("/edit/{id}", name="edit", methods={"GET", "POST"}, requirements={"id"="\d+"})
     */
    public function edit(Request $request, Sound $sound, EntityManagerInterface $entityManager, File $fileManager, UrlHelper $urlHelper): Response
    {
        $soundForm = $this->createForm(SoundType::class, $sound);

        $soundForm->handleRequest($request);

        if ($soundForm->isSubmitted() && $soundForm->isValid()) {
            $soundFile = $soundForm->get('file')->getData();
            if ($soundFile) {
                $soundFilename = $fileManager->upload($soundFile, $sound->getId());
                $sound->setFilename($soundFilename);
            }
            $entityManager->flush();

            $this->addFlash('success', "Sound `{$sound->getTitle()}` mis à jour");

            return $this->redirectToRoute('backoffice_sound_browse');
        }

        return $this->render('backoffice/sound/update.html.twig', [
            'sound_form' => $soundForm->createView(),
            'sound' => $sound,
            'page' => 'edit',
        ]);
    }

     /**
     * @Route("/add", name="add", methods={"GET", "POST"})
     */
    public function add(Request $request, EntityManagerInterface $entityManager, File $fileManager): Response
    {
        $sound = new Sound();

        // on créé un formulaire vierge (sans données initiales car l'objet fournit est vide)
        $soundForm = $this->createForm(SoundType::class, $sound);

        // Après avoir été affiché le handleRequest nous permettra
        // de faire la différence entre un affichage de formulaire (en GET) 
        // et une soumission de formulaire (en POST)
        // Si un formulaire a été soumis, il rempli l'objet fournit lors de la création
        $soundForm->handleRequest($request);

        // l'objet de formulaire a vérifié si le formulaire a été soumis grace au HandleRequest
        // l'objet de formulaire vérifie si le formulaire est valide (token csrf mais pas que)
        if ($soundForm->isSubmitted() && $soundForm->isValid()) {
            $entityManager->persist($sound);
            $soundFile = $soundForm->get('file')->getData();
            if ($soundFile) {
                $fileManager->upload($soundFile, $sound->getId());
            }
            $entityManager->flush();

            $this->addFlash('success', "Sound `{$sound->getTitle()}` ajouté");

            return $this->redirectToRoute('backoffice_sound_browse');
        }

        return $this->render('backoffice/sound/update.html.twig', [
            'sound_form' => $soundForm->createView(),
            'page' => 'create',
        ]);
    }

    /**
     * @Route("/delete/{id}", name="delete", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function delete(Sound $sound, EntityManagerInterface $entityManager): Response
    {
        $this->addFlash('success', "Sound {$sound->getTitle()} supprimé");

        $entityManager->remove($sound);
        $entityManager->flush();

        return $this->redirectToRoute('backoffice_sound_browse');
    }
}