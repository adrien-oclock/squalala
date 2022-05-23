# Dictionnaire de données

## Soundboard

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de la soundboard|
|title|VARCHAR(128)|NOT NULL|Le titre de la soundboard|
|description|TINYTEXT|NOT NULL|La description de la soundboard|
|created_at|DATETIME|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création de la soundboard|
|updated_at|DATETIME|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de dernière modification de la soundboard|

## Son

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant du son|
|title|VARCHAR(128)|NOT NULL|Le titre du son|
|description|TINYTEXT|DEFAULT NULL|La description du son|
|order|INT|NOT NULL, UNSIGNED|L'ordre du son dans la soundboard|
|filename|VARCHAR(256)|NOT NULL|Le nom du fichier physique du son|
|soundboard_id|INT|PRIMARY KEY, NOT NULL|L'identifiant de la soundboard|
|created_at|DATETIME|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création du son|
|updated_at|DATETIME|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de dernière modification du son|

## Tag

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant du tag|
|title|VARCHAR(64)|NOT NULL|Le titre du tag|
|created_at|DATETIME|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création du tag|
|updated_at|DATETIME|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de dernière modification du tag|

## User

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de l'utilisateur|
|username|VARCHAR(64)|NOT NULL|Le pseudo de l'utilisateur|
|email|VARCHAR(128)|NOT NULL|L'email de l'utilisateur|
|password|VARCHAR(60)|NOT NULL|Le mot de passe de l'utilisateur|
|created_at|DATETIME|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création de l'utilisateur|
|updated_at|DATETIME|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de dernière modification de l'utilisateur|

## Like - Association entre user et soundboard

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id_user|ENTITY|PRIMARY KEY, NOT NULL|L'identifiant de l'utilisateur|
|id_soundboard|ENTITY|PRIMARY KEY, NOT NULL|L'identifiant de la soundboard|
|note|TINYINT|NOT NULL|La note attribuée à la soundboard|
|created_at|DATETIME|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création du like|
|updated_at|DATETIME|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de dernière modification du like|

## Association entre tag et soundboard (optionnel)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id_tag|ENTITY|PRIMARY KEY, NOT NULL|L'identifiant du tag|
|id_soundboard|ENTITY|PRIMARY KEY, NOT NULL|L'identifiant de la soundboard|