# Dictionnaire de données

## Soundboard

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de la soundboard|
|titre|VARCHAR(128)|NOT NULL|Le titre de la soundboard|
|description|TINYTEXT|NOT NULL|La description de la soundboard|
|created_at|TINYTEXT|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création de la soundboard|
|updated_at|TINYTEXT|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de dernière modification de la soundboard|

## Son

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant du son|
|titre|VARCHAR(128)|NOT NULL|Le titre du son|
|description|TINYTEXT|DEFAULT NULL|La description du son|
|soundboard_id|INT|PRIMARY KEY, NOT NULL|L'identifiant de la soundboard|
|created_at|TINYTEXT|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création du son|
|updated_at|TINYTEXT|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de dernière modification du son|

## Tag

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant du tag|
|titre|VARCHAR(64)|NOT NULL|Le titre du tag|
|created_at|TINYTEXT|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création du tag|
|updated_at|TINYTEXT|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de dernière modification du tag|

## User

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de l'utilisateur|
|username|VARCHAR(64)|NOT NULL|Le pseudo de l'utilisateur|
|email|VARCHAR(128)|NOT NULL|L'email de l'utilisateur|
|password|VARCHAR(60)|NOT NULL|Le mot de passe de l'utilisateur|
|created_at|TINYTEXT|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création du son|
|updated_at|TINYTEXT|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de dernière modification du son|

## Like - Association entre user et soundboard (optionnel)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id_user|ENTITY|PRIMARY KEY, NOT NULL|L'identifiant de l'utilisateur|
|id_soundboard|ENTITY|PRIMARY KEY, NOT NULL|L'identifiant de la soundboard|

## Association entre tag et soundboard (optionnel)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id_tag|ENTITY|PRIMARY KEY, NOT NULL|L'identifiant du tag|
|id_soundboard|ENTITY|PRIMARY KEY, NOT NULL|L'identifiant de la soundboard|