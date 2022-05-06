<?php

namespace App\Serializer;

use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectRepository;
use InvalidArgumentException;
use Symfony\Component\Serializer\Exception\BadMethodCallException;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ContextAwareDenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class DoctrineEntityDenormalizer implements ContextAwareDenormalizerInterface
{
    use DenormalizerAwareTrait;

    protected $doctrine;

    public function __construct(ObjectNormalizer $denormalizer, ManagerRegistry $doctrine)
    {
        $this->setDenormalizer($denormalizer);
        $this->setDoctrine($doctrine);
    }

    public function denormalize($data, string $type, string $format = null, array $context = [])
    {
        if (null === $this->denormalizer) {
            throw new BadMethodCallException('Please set a denormalizer before calling denormalize()!');
        }
        $repository = $this->getRepository($type);
        if (!$repository instanceof ObjectRepository) {
            throw new InvalidArgumentException('No repository found for given type, '.$type.'.');
        }
        $entity = null;
        if (is_numeric($data) || is_string($data)) {
            $entity = $repository->find($data);
        } elseif (is_array($data) && isset($data['id'])) {
            $entity = $repository->find($data['id']);
        }
        if (is_null($entity)) {
            throw new InvalidArgumentException('No Entity found for given id of type, '.$type.'.');
        }
        // Denormalize into the found entity with given data by using the default ObjectNormalizer
        $tmpContext = array_merge($context, [
            AbstractNormalizer::OBJECT_TO_POPULATE => $entity,
        ]);
        $entity = $this->denormalizer->denormalize($data, $type, $format, $tmpContext);

        return $entity;
    }

    public function supportsDenormalization($data, string $type, string $format = null, array $context = []): bool
    {
        if (null === $this->denormalizer) {
            throw new BadMethodCallException(sprintf('The nested denormalizer needs to be set to allow "%s()" '
                    . 'to be used.', __METHOD__));
        }

        $repository = $this->getRepository($type);
        // Check that it s an Entity of our App and a Repository exist for it
        // Also only use the denormalizer if an ID is set to load from the Repository.
        return strpos($type, 'App\\Entity\\') === 0 && !is_null($repository) && (is_numeric($data) || is_string($data)
                || (is_array($data) && isset($data['id'])));
    }

    protected function getDoctrine(): ManagerRegistry
    {
        return $this->doctrine;
    }

    protected function setDoctrine(ManagerRegistry $doctrine): void
    {
        $this->doctrine = $doctrine;
    }

    protected function getRepository(string $class): ?ObjectRepository
    {
        $result = null;
        try {
            $entityManager = $this->getDoctrine()->getManagerForClass($class);
            if (!is_null($entityManager)) {
                $result = $entityManager->getRepository($class);
            }
        } catch (\Exception $ex) {
            // Manager could not be resolved
        }
        return $result;
    }
}