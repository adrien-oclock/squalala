<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220502115529 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE soundboard ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE soundboard ADD CONSTRAINT FK_4F0621C2A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_4F0621C2A76ED395 ON soundboard (user_id)');
        $this->addSql('ALTER TABLE user ADD email VARCHAR(255) NOT NULL, CHANGE roles roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE soundboard DROP FOREIGN KEY FK_4F0621C2A76ED395');
        $this->addSql('DROP INDEX IDX_4F0621C2A76ED395 ON soundboard');
        $this->addSql('ALTER TABLE soundboard DROP user_id');
        $this->addSql('ALTER TABLE user DROP email, CHANGE roles roles LONGTEXT NOT NULL COLLATE `utf8mb4_bin`');
    }
}
