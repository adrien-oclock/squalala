<?php

namespace App\Entity;

use DateTimeImmutable;

class Core
{
    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt = null): self
    {
        if (!$createdAt) {
            $createdAt = new DateTimeImmutable();
        }
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt = null): self
    {
        if (!$updatedAt) {
            $updatedAt = new DateTimeImmutable();
        }
        $this->updatedAt = $updatedAt;

        return $this;
    }
}