<?php 

namespace App\DataFixtures\Provider;

class SqualalaProvider extends \Faker\Provider\Base {

    /**
     * returns a random soundboard title
     *
     * @return string
     */
    public function soundboardTitle() :string {
        $sounboards = [
            'Cockpit',
            'Apothéose',
            'Gaming',
            'Films français',
            'Animaux',
            'Boite à Lambert',
            'Présidents',
            'Anime',
            'Astérix & Obélix',
            'Entretien',
            'Sport',
            'Catch attack',
            'Memes',
            'Cow bells',
            'Bob Lennon',
            'MisterMV',
            'Bigard',
            'Radio',
            'Cinéma',
            'Les tontons flingueurs',
            'Torink',
            'Twitch',
            'Youtube',
            'Breton',
            'Publicité',
            'Les inconnus',
            'Les nuls',
            'Kad & O',
            'Schwarzeneger',
            'JCVD',
            'Bob l\'éponge',
            'Les Simpsons',
            'South Park',
        ];

        // renvoie un nom de soundboard au hasard dans le tableau ci dessus grace à mt_rand()
        return $sounboards[mt_rand(0, count($sounboards) - 1)];
    }
}