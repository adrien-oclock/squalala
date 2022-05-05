<?php

namespace App\Controller\BackOffice;

use App\Entity\Tag;
use App\Form\TagType;
use App\Repository\TagRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
// Convert route id to Entity
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * @Route("/backoffice/tag", name="backoffice_tag_")
 */
class TagController extends AbstractController
{
    /**
     * @Route("/", name="browse", methods={"GET"})
     */
    public function browse(TagRepository $tagRepository): Response
    {
        return $this->render('backoffice/tag/browse.html.twig', [
            'tag_list' => $tagRepository->findAll()
        ]);
    }

    /**
     * @Route("/read/{id}", name="read", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function read(Request $request, Tag $tag): Response
    {
        // on créé un formulaire avec l'objet récupéré
        $tagForm = $this->createForm(TagType::class, $tag, [
            'disabled' => 'disabled'
        ]);

        // on modifie dynamiquement (dans le controleur) les options du formulaire
        // pour désactiver tous les champs
        $tagForm
            ->add('createdAt', null, [
            'widget' => 'single_text',
        ])
            ->add('updatedAt', null, [
            'widget' => 'single_text',
        ]);

        // on fournit ce formulaire à notre vue
        return $this->render('backoffice/tag/read.html.twig', [
            'tag_form' => $tagForm->createView(),
            'tag' => $tag,
        ]);
    }

     /**
     * @Route("/edit/{id}", name="edit", methods={"GET", "POST"}, requirements={"id"="\d+"})
     */
    public function edit(Request $request, Tag $tag, EntityManagerInterface $entityManager): Response
    {
        $tagForm = $this->createForm(TagType::class, $tag);

        $tagForm->handleRequest($request);

        if ($tagForm->isSubmitted() && $tagForm->isValid()) {
            $entityManager->flush();

            $this->addFlash('success', "Tag `{$tag->getTitle()}` mis à jour");

            return $this->redirectToRoute('backoffice_tag_browse');
        }

        return $this->render('backoffice/tag/update.html.twig', [
            'tag_form' => $tagForm->createView(),
            'tag' => $tag,
            'page' => 'edit',
        ]);
    }

     /**
     * @Route("/add", name="add", methods={"GET", "POST"})
     */
    public function add(Request $request, EntityManagerInterface $entityManager): Response
    {
        $tag = new Tag();

        // on créé un formulaire vierge (sans données initiales car l'objet fournit est vide)
        $tagForm = $this->createForm(TagType::class, $tag);

        // Après avoir été affiché le handleRequest nous permettra
        // de faire la différence entre un affichage de formulaire (en GET) 
        // et une soumission de formulaire (en POST)
        // Si un formulaire a été soumis, il rempli l'objet fournit lors de la création
        $tagForm->handleRequest($request);

        // l'objet de formulaire a vérifié si le formulaire a été soumis grace au HandleRequest
        // l'objet de formulaire vérifie si le formulaire est valide (token csrf mais pas que)
        if ($tagForm->isSubmitted() && $tagForm->isValid()) {
            $entityManager->persist($tag);
            $entityManager->flush();

            $this->addFlash('success', "Tag `{$tag->getTitle()}` ajouté");

            return $this->redirectToRoute('backoffice_tag_browse');
        }

        return $this->render('backoffice/tag/update.html.twig', [
            'tag_form' => $tagForm->createView(),
            'page' => 'create',
        ]);
    }

    /**
     * @Route("/delete/{id}", name="delete", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function delete(Tag $tag, EntityManagerInterface $entityManager): Response
    {
        $this->addFlash('success', "Tag {$tag->getTitle()} supprimé");

        $entityManager->remove($tag);
        $entityManager->flush();

        return $this->redirectToRoute('backoffice_tag_browse');
    }
}