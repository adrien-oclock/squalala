<?php

namespace App\Repository;

use App\Entity\Soundboard;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Soundboard>
 *
 * @method Soundboard|null find($id, $lockMode = null, $lockVersion = null)
 * @method Soundboard|null findOneBy(array $criteria, array $orderBy = null)
 * @method Soundboard[]    findAll()
 * @method Soundboard[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SoundboardRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Soundboard::class);
    }

    public function findAll(string $order = 'DESC')
    {
        return $this->findBy([], [
            'createdAt' => $order
        ]);
    }

    public function findAllWithLikes(string $order = 'DESC', $sortBy = 'date', $search = null, $tags = null)
    {
        // Left join because we want users with no relation to likes
        $qb = $this->createQueryBuilder('s')
        ->select('s, AVG(l.score) AS rating')
        ->leftJoin('s.likes', 'l');

        if ($search) {
            $qb->andWhere('s.title LIKE :search')
            ->orWhere('s.description LIKE :search')
            ->setParameter('search', '%' . $search . '%')
            ;
        }

        if ($tags) {
            $qb->leftJoin('s.tags', 't')
            ->andWhere('t.id IN (:tags)')
            ->setParameter('tags', $tags)
            ;
        }

        if ($sortBy === 'date') {
            $qb->orderBy('s.createdAt', $order);
        }
        else {
            $qb->orderBy('rating', $order);
        }

        return $qb->groupBy('s')
        ->getQuery()
        ->getResult();
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(Soundboard $entity, bool $flush = true): void
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
    public function remove(Soundboard $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return Soundboard[] Returns an array of Soundboard objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Soundboard
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
