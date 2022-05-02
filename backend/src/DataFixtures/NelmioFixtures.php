<?php

namespace App\DataFixtures;

use App\DataFixtures\Loader\NelmioCustomLoader;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class NelmioFixtures extends Fixture
{
    public function load(ObjectManager $entityManager)
    {
        // // utilisation d'un loader custom
        // $loader = new NelmioCustomLoader();
        
        // //importe le fichier de fixtures et récupère les entités générés
        // $entities = $loader->loadFile(__DIR__.'/fixtures.yaml')->getObjects();
        
        // //empile la liste d'objet à enregistrer en BDD
        // foreach ($entities as $entity) {
        //     $entityManager->persist($entity);
        // };
        
        // // enregistrer le tout en BDD
        // $entityManager->flush();
    }
}