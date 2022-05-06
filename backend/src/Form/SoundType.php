<?php

namespace App\Form;

use App\Entity\Sound;
use App\Entity\Soundboard;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class SoundType extends AbstractType
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
            ->add('position', IntegerType::class, [
                'label' => 'Position',
                'constraints' => new NotBlank()
            ])
            ->add('soundboard', EntityType::class, [
                'label' => 'Soundboard',
                'class' => Soundboard::class,
                'choice_label' => 'title',
                'constraints' => new NotBlank()
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Sound::class,
        ]);
    }
}