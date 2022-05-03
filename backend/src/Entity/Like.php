<?php

namespace App\Entity;

use App\Repository\LikeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\PreUpdate;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=LikeRepository::class)
 * @ORM\Table(name="`like`")
 * @ORM\HasLifecycleCallbacks
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
     * @ORM\ManyToMany(targetEntity=Soundboard::class, inversedBy="likes")
     */
    private $soundboards;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="likes")
     */
    private $users;

    /**
     * @ORM\Column(type="integer")
     * @Groups("api_like_browse")
     */
    private $score;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups("api_like_browse")
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    protected $updatedAt;

    public function __construct()
    {
        $this->soundboards = new ArrayCollection();
        $this->user = new ArrayCollection();

        /* Initialize dates */
        $this->setCreatedAt();
        $this->setUpdatedAt();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Soundboard>
     */
    public function getSoundboard(): Collection
    {
        return $this->soundboard;
    }

    public function addSoundboard(Soundboard $soundboard): self
    {
        if (!$this->soundboards->contains($soundboard)) {
            $this->soundboards[] = $soundboard;
        }

        return $this;
    }

    public function removeSoundboard(Soundboard $soundboard): self
    {
        $this->soundboards->removeElement($soundboard);

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->user;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        $this->users->removeElement($user);

        return $this;
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

    /**
     * Ceci est du code à exécuter avant la mise à jour d'un tvshow
     * 
     * @ORM\PreUpdate
     *
     * @return void
     */
    public function updateDate() {
        $this->setUpdatedAt();
    }
}
