<?php

namespace App\Entity;

use App\Repository\TagRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TagRepository::class)
 */
class Tag extends Core
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $title;

    /**
     * @ORM\ManyToMany(targetEntity=Soundboard::class, inversedBy="tags")
     */
    private $soundboards;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    protected $updatedAt;

    public function __construct()
    {
        $this->soundboards = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return Collection<int, Soundboard>
     */
    public function getSoundboards(): Collection
    {
        return $this->soundboards;
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
}
