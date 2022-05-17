<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220517124311 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sound DROP FOREIGN KEY FK_F88EC38491963787');
        $this->addSql('ALTER TABLE sound ADD CONSTRAINT FK_F88EC38491963787 FOREIGN KEY (soundboard_id) REFERENCES soundboard (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sound DROP FOREIGN KEY FK_F88EC38491963787');
        $this->addSql('ALTER TABLE sound ADD CONSTRAINT FK_F88EC38491963787 FOREIGN KEY (soundboard_id) REFERENCES soundboard (id) ON DELETE CASCADE');
    }
}
