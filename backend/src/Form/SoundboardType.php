<?php

namespace App\Form;

use App\Entity\Soundboard;
use App\Entity\Tag;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class SoundboardType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'label' => 'Titre',
                'constraints' => new NotBlank()
            ])
            ->add('description', TextareaType::class, [
                'label' => 'Description',
                'constraints' => new NotBlank()
            ])
            ->add('tags', EntityType::class, [
                'label' => 'Tags',
                'class' => Tag::class,
                'choice_label' => 'title',
                'multiple' => true,
                'expanded' => true
            ])
            ->add('user', EntityType::class, [
                'label' => 'Utilisateur',
                'class' => User::class,
                'choice_label' => 'username',
                'constraints' => new NotBlank()
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Soundboard::class,
        ]);
    }
}