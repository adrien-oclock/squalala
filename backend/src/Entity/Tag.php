<?php

namespace App\Entity;

use App\Repository\TagRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\PreUpdate;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TagRepository::class)
 * @ORM\HasLifecycleCallbacks
 */
class Tag extends Core
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("api_tag_browse")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=64)
     * @Groups("api_tag_browse")
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
        
        /* Initialize dates */
        $this->setCreatedAt();
        $this->setUpdatedAt();
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
