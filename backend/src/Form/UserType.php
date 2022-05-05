<?php

namespace App\Form;

use App\Config\RolesConfig;
use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $roles = [
            'Utilisateur' => RolesConfig::USER,
            'Admin' => RolesConfig::ADMIN,
            'Super admin' => RolesConfig::SUPER_ADMIN
        ];

        $builder
            ->add('username', TextType::class, [
                'label' => 'Pseudo',
                'empty_data' => '',
                'constraints' => new NotBlank()
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email',
                'constraints' => [
                    new NotBlank(),
                    new Email()
                ]
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class, 
                // comme on veut appliquer des règles de gestion non standard
                // on précise à symfony que cette valeur ne correspond à aucun 
                // champ de notre objet
                //!\ il faudra gérer la valeur saisie dans le controleur
                'mapped' => false,
                'first_options'  => ['label' => 'Mot de passe'],
                'second_options' => ['label' => 'Répéter le mot de passe'],
                'constraints' => new NotBlank()
            ])
            ->add('roles', ChoiceType::class, [
                'label' => 'Roles',
                'choices' => $roles,
                'multiple' => true
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}