<?php

namespace App\DataFixtures;

use App\Config\RolesConfig;
use App\DataFixtures\Provider\SqualalaProvider;
use App\Entity\Like;
use App\Entity\Sound;
use App\Entity\Soundboard;
use App\Entity\Tag;
use App\Entity\User;
use App\Service\File;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $passwordHasher;
    private $fileManager;

    public function __construct(UserPasswordHasherInterface $passwordHasher, File $fileManager) {
        $this->passwordHasher = $passwordHasher;
        $this->fileManager = $fileManager;
    }

    public function load(ObjectManager $entityManager)
    {
        $faker = Factory::create();
        $faker->addProvider(new SqualalaProvider($faker));

        $userList = [];
        for ($i = 0; $i <= 5; $i++) {
            $basicUser = new User();
            $entityManager->persist($basicUser);
            $basicUser->setRoles([RolesConfig::USER]);
            $basicUser->setUsername($faker->userName());
            $basicUser->setEmail($faker->email());
            // il faut fournir un mot de passe hashé
            // pour cela on a injecté le hasher dans le constructeur
            // et le conteneur de service s'est occupé de l'instancié
            $hashedPassword = $this->passwordHasher->hashPassword($basicUser, 'user');
            $basicUser->setPassword($hashedPassword);

            $userList[] = $basicUser;
        }

        $tagList = [];
        for ($tagNumber = 0; $tagNumber < 10; $tagNumber++) {
            $tag = new Tag();
            $entityManager->persist($tag);
            $tag->setTitle($faker->unique()->word());
            $tagList[] = $tag;
        }

        // créer les sounboards
        foreach ($userList as $currentUser)
        {
            for ($soundboardNumber = 0; $soundboardNumber < 5; $soundboardNumber++)
            {
                $soundboard = new Soundboard();
                $entityManager->persist($soundboard);
                $title = $faker->unique()->soundboardTitle();
                $soundboard->setTitle($title);
                $soundboard->setDescription($faker->sentence(12));

                /* Add tags to soundboard */
                $nbTags = $faker->numberBetween(0, 3);
                $tagsForSoundboard = $faker->randomElements($tagList, $nbTags);
                foreach ($tagsForSoundboard as $currentTag) {
                    $soundboard->addTag($currentTag);
                }

                foreach ($userList as $otherUser) {
                    /* We do not want current user to note its soundboard */
                    if ($currentUser == $otherUser) {
                        continue;
                    }

                    $like = new Like($otherUser, $soundboard);
                    $entityManager->persist($like);
                    $like->setScore($faker->numberBetween(1, 5));
                }
                $soundboard->setUser($currentUser);

                /* Add sounds to soundboard */
                $maxSounds = $faker->numberBetween(5, 15);
                for ($soundNumber = 1; $soundNumber <= $maxSounds; $soundNumber++)
                {
                    $sound = new Sound();
                    $title = $faker->unique()->words(3, true);
                    $entityManager->persist($sound);
                    $sound->setTitle($title);
                    $sound->setDescription($faker->unique()->sentence(12));
                    $sound->setPosition($soundNumber);
                    $sound->setFilename('toto.mp3');
                    $sound->setSoundboard($soundboard);
                }
            }
        }

        // enregistrer le tout en BDD
        $entityManager->flush();
    }
}
