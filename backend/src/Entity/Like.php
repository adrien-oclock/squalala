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
 */
class Like extends Core
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("api_like_browse")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups("api_like_browse")
     */
    private $score;
    
    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="likes")
     * @Groups("api_like_detail_browse")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Soundboard::class, inversedBy="likes")
     * @Groups("api_like_detail_browse")
     */
    private $soundboard;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups("api_like_detail_browse")
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    protected $updatedAt;

    public function __construct()
    {
        /* Initialize dates */
        $this->setCreatedAt();
        $this->setUpdatedAt();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function setScore(int $score): self
    {
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
        $this->soundboard = $soundboard;

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
