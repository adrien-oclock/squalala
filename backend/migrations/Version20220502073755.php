<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220502073755 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `like` (id INT AUTO_INCREMENT NOT NULL, score INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE like_soundboard (like_id INT NOT NULL, soundboard_id INT NOT NULL, INDEX IDX_EC92813A859BFA32 (like_id), INDEX IDX_EC92813A91963787 (soundboard_id), PRIMARY KEY(like_id, soundboard_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE like_user (like_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_54E60A37859BFA32 (like_id), INDEX IDX_54E60A37A76ED395 (user_id), PRIMARY KEY(like_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sound (id INT AUTO_INCREMENT NOT NULL, soundboard_id INT NOT NULL, title VARCHAR(128) NOT NULL, description LONGTEXT DEFAULT NULL, position INT NOT NULL, UNIQUE INDEX UNIQ_F88EC38491963787 (soundboard_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE soundboard (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(128) NOT NULL, description LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tag (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(64) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tag_soundboard (tag_id INT NOT NULL, soundboard_id INT NOT NULL, INDEX IDX_EA1DA393BAD26311 (tag_id), INDEX IDX_EA1DA39391963787 (soundboard_id), PRIMARY KEY(tag_id, soundboard_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE like_soundboard ADD CONSTRAINT FK_EC92813A859BFA32 FOREIGN KEY (like_id) REFERENCES `like` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE like_soundboard ADD CONSTRAINT FK_EC92813A91963787 FOREIGN KEY (soundboard_id) REFERENCES soundboard (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE like_user ADD CONSTRAINT FK_54E60A37859BFA32 FOREIGN KEY (like_id) REFERENCES `like` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE like_user ADD CONSTRAINT FK_54E60A37A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE sound ADD CONSTRAINT FK_F88EC38491963787 FOREIGN KEY (soundboard_id) REFERENCES soundboard (id)');
        $this->addSql('ALTER TABLE tag_soundboard ADD CONSTRAINT FK_EA1DA393BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE tag_soundboard ADD CONSTRAINT FK_EA1DA39391963787 FOREIGN KEY (soundboard_id) REFERENCES soundboard (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE like_soundboard DROP FOREIGN KEY FK_EC92813A859BFA32');
        $this->addSql('ALTER TABLE like_user DROP FOREIGN KEY FK_54E60A37859BFA32');
        $this->addSql('ALTER TABLE like_soundboard DROP FOREIGN KEY FK_EC92813A91963787');
        $this->addSql('ALTER TABLE sound DROP FOREIGN KEY FK_F88EC38491963787');
        $this->addSql('ALTER TABLE tag_soundboard DROP FOREIGN KEY FK_EA1DA39391963787');
        $this->addSql('ALTER TABLE tag_soundboard DROP FOREIGN KEY FK_EA1DA393BAD26311');
        $this->addSql('ALTER TABLE like_user DROP FOREIGN KEY FK_54E60A37A76ED395');
        $this->addSql('DROP TABLE `like`');
        $this->addSql('DROP TABLE like_soundboard');
        $this->addSql('DROP TABLE like_user');
        $this->addSql('DROP TABLE sound');
        $this->addSql('DROP TABLE soundboard');
        $this->addSql('DROP TABLE tag');
        $this->addSql('DROP TABLE tag_soundboard');
        $this->addSql('DROP TABLE user');
    }
}
