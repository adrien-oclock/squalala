<?php

namespace App\Entity;

use App\Repository\LikeRepository;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\PreUpdate;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=LikeRepository::class)
 * @ORM\Table(name="`like`")
 * @ORM\HasLifecycleCallbacks
 */
class Like extends Core
{
    /**
     * @ORM\Column(type="integer")
     * @Groups("api_like_browse")
     */
    private $score;
    
    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="likes")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("api_user_like_browse")
     */
    private $user;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity=Soundboard::class, inversedBy="likes")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("api_soundboard_like_browse")
     */
    private $soundboard;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups("api_like_browse")
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    protected $updatedAt;

    public function __construct($user, $soundboard)
    {
        $this->user = $user;
        $this->soundboard = $soundboard;
        
        /* Initialize dates */
        $this->setCreatedAt();
        $this->setUpdatedAt();
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function setScore(int $score): self
    {
        if ($score > 5) {
            $score = 5;
        }
        else if ($score < 1) {
            $score = 1;
        }

        $this->score = $score;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getSoundboard(): ?Soundboard
    {
        return $this->soundboard;
    }

    public function setSoundboard(?Soundboard $soundboard): self
    {
        $this->soudnboard = $soundboard;

        return $this;
    }

    /**
     * Ceci est du code à exécuter avant la mise à jour
     * 
     * @ORM\PreUpdate
     *
     * @return void
     */
    public function updateDate() {
        $this->setUpdatedAt();
    }
}
