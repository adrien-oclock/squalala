<?php

namespace App\Entity;

use App\Repository\SoundRepository;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\PreUpdate;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=SoundRepository::class)
 * @ORM\HasLifecycleCallbacks
 */
class Sound extends Core
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * 
     * @Groups("api_sound_browse")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups("api_sound_browse")
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups("api_sound_browse")
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     * @Groups("api_sound_browse")
     */
    private $position;

    /**
     * @ORM\ManyToOne(targetEntity=Soundboard::class, inversedBy="sound")
     * @ORM\JoinColumn(nullable=false)
     */
    private $soundboard;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups("api_sound_browse")
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    protected $updatedAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("api_sound_browse")
     */
    private $filename;

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

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(int $position): self
    {
        $this->position = $position;

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

    public function getFilename(): ?string
    {
        return $this->filename;
    }

    public function setFilename(string $filename): self
    {
        $this->filename = $filename;

        return $this;
    }

    /**
     * Ceci est du code à exécuter après la suppression
     * 
     * @ORM\PostRemove
     *
     * @return void
     */
    public function deleteFile(LifecycleEventArgs $args) {
        $entity = $args->getObject();
        $filename = $entity->getFilename();
        $filePath = __DIR__ . '/../../public/uploads/sounds/' . $filename;
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }
}
