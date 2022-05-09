<?php

namespace App\Form;

use App\Entity\Sound;
use App\Entity\Soundboard;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\NotBlank;

class SoundType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $allowedFileTypes = array(
            'audio/mpeg', 'audio/x-mpeg', 'audio/mpeg3', 'audio/x-mpeg-3', 'audio/aiff', 
            'audio/mid', 'audio/x-aiff', 'audio/x-mpequrl','audio/midi', 'audio/x-mid', 
            'audio/x-midi','audio/wav','audio/x-wav','audio/xm','audio/x-aac','audio/basic',
            'audio/flac','audio/mp4','audio/x-matroska','audio/ogg','audio/s3m','audio/x-ms-wax',
            'audio/xm'
        );

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
            ->add('file', FileType::class, [
                'label' => 'Fichier',
                // unmapped means that this field is not associated to any entity property
                'mapped' => false,
                // make it optional so you don't have to re-upload the PDF file
                // every time you edit the Product details
                'required' => false,
                // unmapped fields can't define their validation using annotations
                // in the associated entity, so you can use the PHP constraint classes
                'constraints' => [
                    new File([
                        'mimeTypes' => $allowedFileTypes,
                        'mimeTypesMessage' => 'Merci de mettre en place un fichier audio',
                    ])
                ],
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