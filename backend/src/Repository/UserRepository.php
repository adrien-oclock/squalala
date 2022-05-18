<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\AbstractQuery;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findAll(string $order = 'DESC')
    {
        return $this->findBy([], [
            'createdAt' => $order
        ]);
    }

    public function findAllQuery(string $order = 'DESC') {
        return $this->createQueryBuilder('u')
        ->addOrderBy('u.createdAt', $order)
        ->addOrderBy('u.username', 'ASC')
        ->getQuery()
        ;
    }

    public function findWithLikes(int $id)
    {
        return $this->createQueryBuilder('u')
        ->select('u, AVG(l.score) as rating')
        ->leftJoin('u.soundboard', 's')
        ->leftJoin('s.likes', 'l')
        ->andWhere('u.id = :id')
        ->setParameter('id', $id)
        ->groupBy('u')
        ->getQuery()
        ->getResult();
    }

    public function findAllWithLikes(string $order = 'DESC', $sortBy = 'date', $search = null)
    {
        // Left join because we want users with no relation to likes
        $qb = $this->createQueryBuilder('u')
        ->select('u, AVG(l.score) as rating')
        ->leftJoin('u.soundboard', 's')
        ->leftJoin('s.likes', 'l');

        if ($search) {
            $qb->andWhere('u.username LIKE :search')
            ->setParameter('search', '%' . $search . '%')
            ;
        }

        if ($sortBy === 'date') {
            $qb->orderBy('u.createdAt', $order);
        }
        else {
            $qb->orderBy('rating', $order);
        }

        return $qb->groupBy('u')
        ->getQuery()
        ->getResult();
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(User $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(User $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newHashedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    // /**
    //  * @return User[] Returns an array of User objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
