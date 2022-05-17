<?php

namespace App\Entity;

use App\Repository\SoundboardRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\PreUpdate;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=SoundboardRepository::class)
 * @ORM\HasLifecycleCallbacks
 */
class Soundboard extends Core
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("api_soundboard_browse")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups("api_soundboard_browse")
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups("api_soundboard_browse")
     */
    private $description;

    /**
     * @ORM\ManyToMany(targetEntity=Tag::class, mappedBy="soundboards", cascade={"persist"})
     * @Groups("api_tag_browse")
     */
    private $tags;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="soundboards", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups("api_user_browse")
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity=Sound::class, mappedBy="soundboard", cascade={"persist", "remove"})
     * @Groups("api_sound_browse")
     */
    private $sounds;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups("api_soundboard_browse")
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    protected $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=Like::class, mappedBy="soundboard", orphanRemoval=true)
     * @Groups("api_like_user_browse")
     */
    private $likes;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->likes = new ArrayCollection();
        $this->sounds = new ArrayCollection();

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
            $tag->addSoundboard($this);
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        if ($this->tags->removeElement($tag)) {
            $tag->removeSoundboard($this);
        }

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

    /**
     * @return Collection<int, Sound>
     */
    public function getSounds(): Collection
    {
        return $this->sounds;
    }

    public function addSound(Sound $sound): self
    {
        if (!$this->sounds->contains($sound)) {
            $this->sounds[] = $sound;
            $sound->setSoundboard($this);
        }

        return $this;
    }

    public function removeSound(Sound $sound): self
    {
        if ($this->sounds->removeElement($sound)) {
            // set the owning side to null (unless already changed)
            if ($sound->getSoundboard() === $this) {
                $sound->setSoundboard(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Like>
     */
    public function getLikes(): Collection
    {
        return $this->likes;
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
