---
title: "[]{#Slide_1 .anchor}Génie Logiciel et Conduite de Projet"
---

# Plan du cours {#plan-du-cours .unnumbered}

> ***Chapitre 1 :*** Rappels
>
> ***Chapitre 2 :*** Génie Logiciel : Généralités
>
> ***Chapitre 3 :*** Représentations du cycle de vie du logiciel
>
> ***Chapitre4:***LaDémarche ***Chapitre 5 :*** La Normalisation
> ***Chapitre 6 :*** Les Tests
>
> ***Chapitre 7 :*** La gestion des projets logiciels
>
> ***Chapitre 8 :*** L\'analyse des risques
>
> ***Chapitre 9 :*** Conduite de changements
>
> **Chapitre 1 : Rappels**
>
> ***Logiciel :*** C\'est un ensemble de programmes, procédés, règles et
> documentations relatifs au fonctionnement de l\'ensemble de
> traitements d\'informations.
>
> ***Application :*** C\'est un logiciel qui sert à implanter un système
> d\'informations.
>
> On peut avoir 32 types d\'applications :

-   Applications de gestion : peu de traitement et top de donnée

-   Applications scientifiques : trop de traitement et peu de donnée

-   Applications industrielles : peu de traitement et peu de donnée

> ***Système d\'informations (SI):*** Toute organisation peut être
> organisée comme un système traitant des flux physiques et des flux
> d\'information.
>
> L\'entreprise est un système ouvert sur son environnement avec lequel
> il échange traitant de produits, de personnel et d\'argents impliquant
> tous les flux d\'information.
>
> A travers de la nature des flux au sein d\'une entreprise, on
> distingue des sous-systèmes assurant des fonctionnements bien
> spécifiques.

-   Les systèmes logistiques et de production.

-   Les systèmes de marketing.

-   Les systèmes financier et comptable.

-   Les systèmes de contrôle et de planification stratégique.

> Un système d\'information, est l\'ensemble de flux d\'opérations
> qu\'il subisse, d\'informations et de moyens mise en œuvre par se
> faire quel que soit la nature de ces moyens.
>
> Le rôle d\'un SI est capital par organisation d\'un point de vue
> stratégique et opérationnel.
>
> Un SI est le véhicule de communication d\'une organisation dont il
> assume la formation interne et externe. Le langage de cette
> information est les données.
>
> Un SI peut être constitué pour des procédures manuelles ou
> automatisés.
>
> ***Système :*** c\'est un ensemble d\'éléments dotés d\'une structure
> en interaction entre eux et avec leur environnement qui réalise des
> fonctions qui transforme la matière, l\'énergie ou l\'information et
> qui évolue dans le temps selon un objectif.
>
> ***Système d\'Informations Automatisé (SIA):*** c\'est un système
> physique reposant sur la technologie informatique.
>
> C\'est un ensemble de logiciels élaborés à des dates différents dans
> des environnements informatiques qui peuvent être différents
> partageant certaines ressources (BD, matériel, etc..).
>
> ***Méthode :*** \"C\'est un processus discipliné qui génère un
> ensemble de modèles décrivant les différents aspects d\'un système
> logiciel en utilisant une certaine notation bien définie\". *Grady
> Booch, 94* Une méthode a pour objet de décrire l\'ensemble des tâches
> à accomplir, l\'ordonnancement des tâches, les documents et les
> standards qui leur sont associés à fin de prendre en charge des
> aspects spécifiques ou une partie du processus de développement .
>
> Une méthode possède 4 composantes :

-   Démarche

-   Outil

-   Model

-   Langage

> Un modèle est une réponse aux questions : que faire ? quand ? où ?
> avec qui ? et comment ?
>
> ***Outil :*** désigne un programme ou un ensemble de programmes aidant
> à la mise en œuvre des techniques et donc à l'accomplissement d\'une
> tâche. Des outils peuvent être utilisés seuls ou intégrés dans un
> environnement de génie logiciel.
>
> AGL : Atelier de Génie Logiciel  CASE : Computer Aided Software
> Engineering
>
> (dans CASE tout est automatisé)
>
> ***Méthodologie :*** c'est un ensemble de méthodes et de techniques
> d'un domaine particulier. C'est un ensemble structuré et cohérent de
> méthodes, de guides et d'outils permettant de déduire la manière de
> résoudre un problème.
>
> Une méthodologie désigne donc la boite à outils du développeur
> intégrant les modèles de description et d'organisation, les méthodes
> et une organisation du projet c'est-à-dire répartition des tâches
> procédures de planification, estimation et conduite de projet.
>
> ***Modèle :*** Un ensemble de concepts permettant de construire une
> présentation de l'entreprise.
>
> **Chapitre 2 : Géni Logiciel - Généralités**

### I - Définitions : {#i---définitions .unnumbered}

-   C\'est la science de l\'ingénierie des logiciels. C'est la branche
    de l\'informatique qui s\'intéresse plus particulièrement à la
    manière dont le code source d\'un logiciel est spécifié puis
    produit. Le complément du génie logiciel est la gestion des projets.

-   « Le génie logiciel est l'application pratique de la connaissance
    scientifique dans la conception et l'élaboration des programmes
    informatiques et de la documentation associée nécessaire pour les
    développer, les mettre en œuvre et les maintenir » Barry Boehm, 1977

-   Le génie logiciel est le domaine des sciences de l'ingénieur dont la
    fonctionnalité est la conception, la fabrication et la maintenance
    des systèmes logiciels complexes, sûres et de qualité. Ces systèmes
    sont caractérisés par un ensemble de documents de conception de
    programmes et de jeux de test avec souvent de multiples versions.

> ***Remarque :*** Le génie logiciel touche du cycle de vie du logiciel
> donc concerne toute les phases de la création d'un logiciel
> informatique

1.  Etude et analyse du besoin

2.  Elaboration des spécifications

3.  Conceptualisation du mécanisme interne au logiciel

4.  Conceptualisation de techniques de programmation

5.  développement (programmation)

6.  test

7.  mise en œuvre et maintenance

### II - Objectifs du GL : {#ii---objectifs-du-gl .unnumbered}

> Le GL vise à utiliser l'informatique dans les entreprises comme outils
> de tous les jours, il vise à utiliser le développement et la
> maintenance c'est-à-dire réduire les coûts et assurer la qualité grâce
> à l'utilisation des méthodes, d'outils et de méthodologies. Ces
> objectifs peuvent être atteints que si certains principes sont
> respectés.

### III - Principes du GL : {#iii---principes-du-gl .unnumbered}

-   **Rigueur :** Grande exactitude dans l'application des règles.

-   **Séparation des problèmes :** Il s'agit d'une séparation dans le
    temps, d'une séparation de vues\* dans le système et d'une
    séparation en sous-systèmes.

> \*Exemple *Orienté Objet :* Dynamique/statique, *Merise :*
> Données/traitements

-   **Modularité :** L'évolution des langages de programmation, en
    particulier les langages OO, visent à rendre plus facile une
    programmation modulaire appelée programmation par composants.

-   **Abstraction :** on nous considère à un moment donné que les objets
    jugés importants du système. Une même réalité peut être décrite à
    différents niveaux d'abstraction.

-   **Généricité :** c'est le fait pour un objet de pouvoir être utilisé
    tel qu'il est, dans différents contextes ou même indépendamment du
    contexte.

> Exemple on peut citer le comportement d'une pile sans savoir le type
> de données contenues.

-   **Construction Incrémentale :** c'est le fait de réaliser
    .l'objectif par des étapes successives. Exemple Réalisation d'un
    noyau de fonctions essentielles, puis ajout des fonctions
    secondaires.

-   **Anticipation du changement :** Prévoir et faciliter les
    changements en favorisant la construction modulaire et en gérant les
    configurations (traces de ce qu'on a modifié) des modèles.

> ***Remarque :*** Chaque méthodologie privilégie certains principes et
> le choix d'une méthodologie pour un projet va dépendre des objectifs
> visés. Aucune méthodologie ne va couvrir tous les principes qui
> doivent être suivis.

### IV - Les attributs du logiciel : {#iv---les-attributs-du-logiciel .unnumbered}

-   **Le couplage :** Mesure des indépendances entre modules : plus que
    le couplage est fort, plus que les modules sont dépendants.
    (Couplage fort  contre la modularité)

-   **La complexité :** le degré de complexité d'un système. Plus qu'on
    a des interconnections entre modèles (degré d'intégrité élevé), plus
    que le programme est complexe.

-   **L'extensibilité :** le degré d'accommodation aux changements
    produits par une nouvelle exigence à réaliser.

-   **La lisibilité :** Mesure l difficulté de comprendre un composant
    logiciel. Celle lisibilité est liée à la complexité et à la
    documentation.

-   **Bonne définition des interfaces :** Mesure le degré de dépendance
    fonctionnel entre les tâches réalisées par un module (Interface
    Utilisateur, Interface Inter Logiciels, Interface Inter Modules u
    sein d'un même logiciel).

-   **Degré d'abstraction des classes :** Une classe est caractérisée
    par les opérations qu'elle permet d'effectuer.

-   **Visibilité du comportement :** C'est la compréhension des
    composants du logiciel. C'est une mesure qui représente la
    possibilité de se rendre compte de façon aisée de ce font les
    différentes fonctionnalités d'un programme.

> **Chapitre 3 : Les Représentations du cycle de vie du logiciel**
>
> Le développement d'un logiciel n'est pas simplement l'écriture d'un
> programme sur une durée variant de heures à quelques jours, c'est un
> processus beaucoup plus complexe auquel on applique la règle de DECART
> : « Diviser pour régner ».
>
> Le cycle de vie d'un logiciel débute par l'analyse du problème,
> comprend le processus complet de développement (création), et le
> processus complet de maintenance. Un cycle de vie se décompose en deux
> sous cycles : le cycle de développement et le cycle de maintenance.

### - Le modèle en cascade (en chute d'eau) :

> *Validation*
>
> *Validation*
>
> *Vérifcation*
>
> *Vérifcation*
>
> *Tests Unitaires*

*Tests Produit*

*Tests Système*

> 8 phases + Phase out+ Activités
>
> Phase de sortie
>
> Phase de mise hors exploitation du logiciel
>
> Validation Vérification, Tests

-   **Validation :** C'est le fait d'établir l'utilité, c'est la réponse
    à la question : construisons nous le produit qu'il faut ?

-   **Vérification :** C'est le fait d'établir la cohérence, c'est la
    réponse à la question : construisons nous le produit comme il faut ?

> ***Remarque :*** Ce modèle suppose que le cahier des charges ne peut
> plus être modifié d'une façon substantielle après sa validation.
>
> ***Remarque 2:*** Dans certains projets on ne peut pas spécifier les
> besoins dès le départ.

## Etude de faisabilité

> **Objectifs :** - Comprendre le problème

-   Etudier la faisabilité technique et économique

-   Analyser les besoins

> **Résultats :** - Décision sur la faisabilité

-   Estimation partielle des coûts et des délais

-   Plan global u projet

-   Cahier des charges préélémentaire

## Cahier des charges

> Cette phase débouche sur un cahier des charges. Le cahier des charges
> en plus de son rôle comme un descripteur des besoins du client, sert
> de documents contractuels et juridiques entre le client et
> développeur.
>
> **Le prototype :** c'est la solution idéale pour un cahier des charges
> précis et le moins incomplet possible, c'est le développement d'u sous
> problème complémentaire au problème global à traiter et à examiner
> l'appréciation du client vis-à-vis au prototype afin de préciser au
> mieux ses besoins sans omission et sans obligation. Le prototype
> réalise partiellement des fonctions sont totalement l'interface
> utilisateur.

## Conception Globale

> **Objectifs :** - Décrire l'architecture du logiciel

-   Obtenir une description du système comme un ensemble de modules et
    de structures de données.

-   Rôle de chaque module et interface modulaire

> **Résultats :** - Structure modulaire du système

-   Structure de données

## Conception Détaillée

> Algorithme + Pseudo Code
>
> **Objectif :** - Obtenir une description détaillée des traitements et
> des structures de données par des expressions traduisibles directement
> dans un langage de programmation choisi.
>
> **Résultats :** - Structure modulaire détaillée

-   Interface précise bien explicitée

-   Algorithme de chaque module avec structure de donnée utilisée

## Codage

> **Objectif :** - Obtenir le programme et faire les tests unitaires.
>
> **Moyen :** - Langage de programmation.
>
> **Résultats :** - Programme

-   Documents techniques

-   Résultat des tests unitaires

## Intégration et Test

> Cette phase consiste à faire coopérer et à assembler les composants
> modulaires testés individuellement.
>
> L'intégration se fait graduellement, il s'agit d'une intégration
> incrémentale. La difficulté est proportionnelle au nombre de modules.
>
> **Résultats :** - Programme

-   Documents techniques

-   Résultat des tests unitaires

## Implémentation ou installation ou implantation

> **Objectif :** - Mise en exploitation et l'utilisation du logiciel
> dans l'environnement réel
>
> **Résultats :** - Logiciel installé, testé et accepté par le client

-   Manuel d'utilisation fourni

-   Formation aux utilisateurs planifiés

## Maintenance

> On peut classer la maintenance en 5 catégories :

-   **La maintenance corrective :** Qui traite les erreurs et les
    défaillances du programme.

-   **La maintenance adaptative :** Qui traite les adaptations suite aux
    changements dans l'environnement.

-   **La maintenance perfective :** Qui traite les améliorations de
    performance.

-   **La maintenance évolutive :** Qui consiste à modifier les missions
    spécifiées du logiciel.

-   **La maintenance préventive :** Qui consiste à enrichir le code avec
    des mécanismes de traitement d'exceptions.

### - Le modèle en V :

> *Validation*

### - Le modèle de la transformation formelle :

(1) ![](./image1.png){width="9.00142169728784e-2in"
    height="0.2497364391951006in"}Spécifier formellement les besoins

(2) Exécuter les SF en utilisant

> ![](./image2.png){width="9.00142169728784e-2in"
> height="0.2497364391951006in"}les outils

(3) Validation

> ![](./image3.png){width="9.00142169728784e-2in"
> height="0.2872364391951006in"}Nécessité d'outils formels

### - Le modèle incrémental :

> Consiste à développer les futurs logiciels par lot et établir un
> planning de réalisation de ces lots avant le démarrage du parcours de
> construction.
>
> Chaque lot doit fournir un produit qui sera immédiatement mis en
> exploitation dans un environnement opérationnel.
>
> L'ensemble des produits en exploitation à une période donnée constitue
> une version provisoire du logiciel dont la durée de vie s'étend
> jusqu'à la livraison du prochain lot.
>
> *Pour chaque lot i*

I.  ***- Le modèle de prototypage :***

## Définition : prototype {#définition-prototype .unnumbered}

> *LIVRAISON de*
>
> *la version i*

-   *Le robert :* c'est un type, un modèle premier (original ou
    principal). Un premier exemplaire d'un modèle construit avant la
    fabrication en série

-   C'est un modèle réduit, un artéfact du logiciel de faible coût,
    développé pour évaluer certains aspects d'un système informatique,
    c'est modèle de système à réaliser où l'on sacrifie à la précision
    afin de permettre une vérification rapide du comportement de ce
    logiciel.

-   Un prototype est un modèle exécutable de tout ou d'une partie d'un
    logiciel facile à mettre en œuvre et à modifier qui va permettre de
    vérifier rapidement certaines fonctionnalités de ce logiciel en
    sacrifiant la précision des autres. Il pourra ne pas être construit
    avec les mêmes contraintes de robustesse que le système final.

> Un prototypage est une approche de développement du logiciel
> privilégiant la préparation de version de travail utilisée comme base
> d'évaluation d'idées, de décisions en vue de préparer la version
> complète livrable au client.
>
> Le prototypa c'est :

-   L'élaboration de versions opérationnelles du futur logiciel dès le
    début du cycle de vie

-   La mise en évidence et la clarification par expérimentation des
    problèmes les plus significatifs

-   L'élaboration de prototype qui constitue une base de discussion et
    de communication entre les utilisateurs, les informaticiens et les
    autres acteurs de l'organisation.

> Un prototypage est une approche de développement qui peut être
> associée avec d'autres modèles de développement et qui permet de
> valider les besoins d'utilisateurs, les choix techniques, l'ergonomie
> de l'interface utilisateur, la faisabilité ou le comportement du futur
> logiciel à partit de petites applications signifiantes (prototype).
>
> Les phases du cycle de vie d'un prototype sont les suivantes :

-   Analyse et spécification des besoins.

-   Conception (pas robuste) et réalisation

-   Evaluation du prototype

-   Révision et modification du prototype

-   Compléter les définitions des besoins

> **Avantages**

-   Permet de se concentrer sur les points critiques et les zones
    d'incertitude très tôt dans le développement.

-   Simplifie l'élaboration des spécifications et de l'interface
    Homme/Machine

-   Evolutif et incrémental

-   Il peut être utilisé avec d'autres modèles et à toutes les phases,
    selon la phase, les objectifs du prototype peuvent être différents

> **Inconvénients**
>
> Beaucoup de problèmes liés à la gestion de projet (coût, temps,
> suivie, contrôle, planification ...)

### - Le modèle en spiral:

> Ce modèle a été introduit en 1980, il est non linéaire et
> anti-risques. Il se déroule selon une suite de développement de 4
> phases dont le nombre n'est pas déterminé à l'avance et dépends de
> l'approche de développement choisie. Le choix de l'approche de
> développement, des méthodes et des techniques mis en œuvre est
> déterminé en fonction des risques analysés et identifiés au début de
> chaque cycle du spiral.

-   Au cours de la phase de l'analyse, les alternatives et les
    contraintes.

-   Au niveau de la conception, on analyse les risques et on évalue les
    alternatives.

-   Au niveau de la réalisation, on prépare un prototype

-   Au niveau des tests et des évaluations, on valide ce qui était
    réalisé au cours du cycle de spiral et on planifie le prochain
    cycle.

> Le modèle de la spirale est un modèle mixte ou méta modèle, il permet
> de mettre en œuvre des approches, des méthodes et des techniques
> variées (prototypage, développement linéaire ...) au cours des
> différentes phases d'un cycle de la spirale.
>
> ***Remarque :*** Le modèle en spiral n'est pas fondamentalement
> différent du modèle évolutif.

### - Le modèle de la fontaine :

> Ce modèle est orienté objet, il est incrémental et itératif.

+--------------------------------+-------------------------------------+
| > ***Phases Analytiques***     | > ***Phases Synthétiques***         |
+================================+=====================================+
| > 1- Spécification des         | > 4- Conception Architecturale      |
| > exigences du système         |                                     |
+--------------------------------+-------------------------------------+
| > 2- L'indentification des     | > 5- Conception des classes         |
| > objets                       |                                     |
+--------------------------------+-------------------------------------+
| > 3- Identification des        | > 6- Identification des             |
| > interactions entre objets    | > généralisations / Spécifications  |
+--------------------------------+-------------------------------------+
|                                | > 7- Codage                         |
+--------------------------------+-------------------------------------+
|                                | > 8- Test du logiciel               |
+--------------------------------+-------------------------------------+
|                                | > 9- Utilisation                    |
+--------------------------------+-------------------------------------+
|                                | > 10- Maintenance / Développements  |
|                                | > ultérieurs                        |
+--------------------------------+-------------------------------------+

> ***Remarque :*** Chaque étape peut fournir des résultats modifiant les
> résultats suivants.

### ![](./image5.png){width="0.10744094488188977in" height="0.16021872265966755in"}![](./image6.png){width="0.10744094488188977in" height="0.16021872265966755in"}- Le modèle de Balzer :

> 4 : Modification
>
> 1: Analyse
>
> 3 : Mise au point

Sortie

> Prototype
>
> 2 : Prototypage
>
> Entrée
>
> Avec les méthodes formelles, les cycles de vie classiques ne marchent
> plus, il faut les adapter. Le cycle de vie de Balzer représente la
> nouvelle famille de cycles de vie adoptés au développement formel.
>
> **Chapitre 4 : La Démarche**

### - Présentation d'une démarche classique :

I.  ***- Rappels : Les méthodes de développement semi formelles***

    -   **SADT (Structure Analysis and Design Technique) :** C'est une
        méthode d'origines américaine utilisée à grande échelle vers la
        fin des années 80 et considérée comme standard de description
        graphique d'un système complexe par analyse fonctionnelle
        descendante.

    -   **MERISE :** c'est une méthode d'origine française apparue au
        années 70, c'est une approche systémique avec séparation entre
        données et traitements et elle représente 4 niveaux
        d'abstraction.

    -   **Processus Unifié et UML :** c'est une méthode « Itérative et
        Incrémentale », Orientée Objet. Cette méthode a deux approches
        (Ascendante et Descendante) et intègre 4 phases et des activités
        dans chaque phase.

    -   **OMT (Object Modelling Technique) :** Ces techniques sont
        l'œuvre de James Rumbaugh qui est l'un des pères d'UML. Les
        concepts de base de ces techniques sont : les classes, les
        instances, les attributs et les méthodes...

    -   **OOSE :** c'est l'œuvre de Ivar Jacobson, elle est basée sur 5
        modèles :

        -   Le modèle des besoins

        -   Le modèle d'analyse

        -   Le modèle de conception

        -   Le modèle d'implémentation

        -   Le modèle de Test

> ***Remarque*** : OMT et OOSE étaient à l'origine d'UML.

-   **JSD (Jackson Software Development)** c'est une technique de
    développement basée sur une spécification fonctionnelle et sur
    l'implémentation finale

-   **OOA (Oriented Object Analysis) :** c'est une méthode d'analyse
    Orientée Objet utilisée surtout dans l'industrie et la gestion.

-   **HOOD :** c'est une méthode de conception orientée objet qui met
    l'accent sur les points de vue statique et dynamique.

### - Les méthodes de développement formelles

> On a besoin des méthodes les plus rigoureuses pour certains domaines :

-   Sécurité et certification

-   Systèmes embarqués (voitures, véhicules...)

-   Automates (domaine médical)

> Les méthodes formelles garantissent la correction du logiciel, élimine
> les erreurs et les disfonctionnements et facilitent la maintenance.
> Dans les méthodes formelles on trouve la logique, l'algèbre, la
> mathématique discrète, la théorie des ensembles, la théorie des
> automates...
>
> Exemple d'application industrielle de la méthode B

-   Système de contrôle de vitesse du train de SNCF

-   Métro de Monreale et de Marseille

-   Métro sans conducteur

> \- ...
>
> Une méthode formelle intègre un langage formel et un système de preuve
> ou de raisonnement formel.

### - Le langage Z de spécification formelle

###### Définition

> De point de vue sémantique, le langage Z est une subdivisé en 3
> parties :

1.  Un langage mathématique utilisant les propositions la logique des
    prédicats, les ensembles et les relations...

2.  Un langage schématique représentant les manipulations algorithmiques
    des données ou des objets.

3.  Une théorie de raffinement entre les types abstraits de données.

> Z a été développé à l'université d'Oxford à la suite des travaux de
> Jean Rene Abrial.
>
> On parle souvent de Z comme un langage de description d'état en
> utilisant un dialecte mathématique particulier dans une notation
> schématique, il décrit les différents états de données par lequel peut
> passer un produit logiciel et sous quelles conditions.

###### Rappels

> *Proposition :* c'est une expression qui est vraie ou fausse.
>
> Les *connecteurs* par ordre de priorité sont : Non, ET, OU, Implique
> et équivalent
>
> *Prédicat :* expression contenant des inconnues qui se transforme en
> propositions quand celles-ci sont identifiés.

####### Déclaration {#déclaration .unnumbered}

> **x : a**  on déclare que la variable **x** appartient à l'ensemble
> **a**

####### Qualification {#qualification .unnumbered}

> **Q x : a**  **p**  soit **p** un prédicat impliquant la variable
> **x** élément de **a** à travers cette écriture, on retransforme le
> prédicat en proposition e appliquant le quantificateur **Q** à **x.**
>
> ∀ **x : a**  **p p** est une proposition vraie pour tous les éléments
> de **a**
>
> ∃ **x : a**  **p p** est une proposition vraie pour certains éléments
> de **a**
>
> ∃ **x : a**  **p p** est une proposition vraie pour un seul éléments
> de **a**

####### Contraintes {#contraintes .unnumbered}

> Il est possible d'ajouter un prédicat **δ** à la déclara d'une
> proposition quantifiée pour restreindre le domaine d'une variable.
>
> **Q x : a \| r**  **p** **p** une proposition vraie si **x : a**
> vérifie la contrainte **r**.

####### Notation mu µ {#notation-mu-µ .unnumbered}

> Soit une déclaration D, et un prédicat P exprimant une contrainte sur
> les variables déclarés en D et E une expression donnant
> facultativement la valeur qui on désire obtenir.
>
> On écrira la description définie **µ D \| P**  **E** .
>
> [Exemple :]{.underline} le cube de l'entier \> 0 dont le carré = 25
> s'écrit de cette manière µ x = 2 \| x \> 0 \^ x² = 25  x^3^

####### Ensemble en Z {#ensemble-en-z .unnumbered}

> On peut bâtir les ensembles de plusieurs manières :

-    Par extension : on se contente de faire la liste des éléments.
    *Exemple* {0, 1, 4, 9, 16}

-   Par compréhension : on pourra définir un ensemble sous forme
    {D\|PE}. *Exemple* {x:IN \| x≤4x²}

####### Opération {#opération .unnumbered}

> Les opérations sur les ensembles en **Z** sont :
>
> \# : cardinal exemple : \# {1,2,3,4} = 4
>
> U **:** union
>
> ∩ : intersection
>
> \\ : différence exemple : {1,3,6}\\{2,4,6} = {1,3}

####### Abréviation {#abréviation .unnumbered}

> Un objet **e** déjà défini dans une spécification formelle peut se
> voir attribuer le nom **x** par abréviation.

## x == e {#x-e .unnumbered}

> exemple : {x:IN \| x≤5x²} **a** sera donc l'ensemble {1,2,4,9,16}

####### Autres notations particulières liées à IN et Z {#autres-notations-particulières-liées-à-in-et-z .unnumbered}

> **succ x :** donne le successeur de x
>
> **a..b :** l'ensemble de tous les valeurs comprises entre **a** et
> **b** au sens large. exemple : 3..5= {3,4,5}
>
> **max** et **min :** donnent respectivement la plus grande valeur et
> la plus petite valeur d'un ensemble. exemple : max {x:IN \| x\<5x²} =
> 16

###### Les relations

> X, Y, R
>
> ℜ : *IP*(*X*) × *Y*
>
> *X* ↔ *Y* == *IP*(*X*) × *Y*
>
> ℜ : *X* ↔ *Y*

-   **dom :** définit le domaine d'une relation

> ℜ : *X* ↔ *Y*
>
> *x*  *y*
>
> exemple : dom ℜ = = { x :X,y :Y\| *x*  *y*  x}

-   **ran :** définit l'image d'une relation

> exemple : ran ℜ = = { x :X,y :Y\| *x*  *y*  y}

-   ℜ **\~ :** définit le domaine d'une relation

> exemple : ℜ **\~**= = { x :X,y :Y\| *x*  *y*  *y*  *x* }

-   Restrictions de domaine et d'images

> ℜ : *X* ↔ *Y*
>
> A,B
>
> A◁ℜ = = { x :X,y :Y\| *x*  *y* ∈ℜ ∧ *x* ∈ *A*  *x*  *y* } B▷ℜ = = {
> x :X,y :Y\| *x*  *y* ∈ℜ ∧ *y* ∈ *B*  *x*  *y* }

-   soustraction de domaine et d'images

> ℜ : *X* ↔ *Y*
>
> A,B
>
> A~~◁~~ℜ = = { x :X,y :Y\| *x*  *y* ∈ℜ ∧ *x* ∉ *A*  *x*  *y* }
> B~~▷~~ℜ = = { x :X,y :Y\| *x*  *y* ∈ℜ ∧ *y* ∉ *B*  *x*  *y* }

-   image relationnelle

> ℜ (\|A\|) = = ran(A◁ ℜ )
>
> ℜ : *X* ↔ *Y*
>
> **Exemple :**
>
> ℜ : *X* ↔ *Y*
>
> ℜ = = {x :X, y :Y\| *x* \< 6 ∧ *y* = *x* ^3^  *x*  *y* }
>
> = {x : ℵ \| *x* \< 6  *x*  *x*^3^ }
>
> = { 0  0 ,1  1 , 2  8 , 3  27 , 4  64 , 5  125 }
>
> dom ℜ = {x : ℵ\| *x* \< 6  *x* } = {0,1,2,3,4,5}
>
> ran ℜ = {x : ℵ\| *x* \< 6  *x*^3^ } = {0,1,8,27,64,125}
>
> ℜ **\~**= {x : ℵ \| *x* \< 6  *x*^3^  *x* } = { 0  0 ,1  1 , 8  2
> , 27  3 , 64  4 ,125  5 }
>
> A = = {x : ℵ\| *x* \< 4  *x* } = {0,1,2,3}
>
> B = = {x : ℵ \| *x*^3^ \< 25  *x* } = {0,1,8}
>
> A◁ℜ = = { x : ℵ\| *x* \< 4 ∧ *x*  *x*^3^ ∈ *R*  *x*  *x*^3^ } = { 0
>  0 ,1  1 , 2  8 , 3  27 }
>
> B▷ℜ = = { x : ℵ \|2*x*5*R*^3^ \< ∧ *x*  *x*^3^ ∈  *x*  *x*^3^ } = {
> 0  0 ,1  1 , 2  8 }
>
> A~~◁~~ℜ = = { x : ℵ\| *x*  *x*^3^ ∈ℜ ∧ *x*  4  *x*  *x*^3^ } = { 4
>  64 , 5  125 }
>
> B~~▷~~ℜ = = { x : ℵ \| *x*  *x*^3^ ∈ ℜ ∧ *x*^3^  25  *x*  *x*^3^ }
> = { 3  27 , 4  64 , 5  125 }
>
> ℜ (\|A\|) = = { x : ℵ\| *x*  *x*^3^ ∈ ℜ ∧ *x* ≤ 4  *x*^3^ } = {0, 1,
> 8, 27}

-   Composition

> *X* ←*R* →*Y* ←*S* →*Z*
>
> R ; S = = {x :X, z :Z\| (∃)*y* : *Y* • (*x*)  *y* ∈ *S* ∧ *y*  *z* ∈
> *S*  *x*  *z* }

###### Les fonctions

-   une fonction est une relation tel que tous les éléments de
    l'ensemble de départ sont appliqués

> dans au plus un couple ordonné de celle-ci.

-   Une fonction totale est une fonction pour lequel, le domaine
    correspond à l'ensemble de départ

-   Une fonction partielle est une fonction par laquelle, le domaine est
    explicitement inclus dans l'ensemble de départ.

-   Une fonction injective est une fonction par laquelle à chaque
    élément du domaine correspond un élément différent de l'image.

-   Une fonction subjective est une fonction par laquelle l'image
    correspond exactement à l'ensemble d'arrivée.

-   Une fonction bijective si elle est à la fois injective et
    subjective.

-   Une fonction finie est une fonction dont le cardinal existe.

> *Notations :*
>
> ![](./image9.png){width="0.16097878390201226in"
> height="0.1679232283464567in"}![](./image10.png){width="0.16097878390201226in"
> height="0.1693121172353456in"}![](./image11.png){width="0.16097878390201226in"
> height="0.1679232283464567in"}![](./image15.png){width="0.4359787839020122in"
> height="0.1693121172353456in"} : Fonction totale
>
> : Fonction partielle
>
> : Fonction totale injective
>
> ![](./image16.png){width="0.16097878390201226in"
> height="0.1693121172353456in"}: Fonction partielle injective
>
> ![](./image10.png){width="0.16097878390201226in"
> height="0.1693121172353456in"}![](./image9.png){width="0.16097878390201226in"
> height="0.1679232283464567in"}: Fonction totale subjective
>
> : Fonction partielle subjective
>
> : Fonction bijective
> ![](./image18.png){width="0.4359787839020122in"
> height="0.17625656167979004in"} : Fonction finie
>
> ![](./image19.png){width="0.5748676727909011in"
> height="0.17486767279090112in"} : Fonction finie injective On peut
> déclarer les fonctions par :
>
> \- extension { 0  0 ,1  1 , 2  8 , 3  27 }

-   compréhension{ x : ℵ\| *x* \< 4 ∧ *x*  *x*^3^ ∈ *F*  *x*  *x*^3^
    }

-   abstraction Lambda λ x : ℵ \| *x* \< 4 ∧ *x*  *x*^3^ ∈ *F*  *x*^3^

> *Exemple :*
>
> {x : ℵ \| *x* \< 4  *x*^3^  *x* }(27) = 3
>
> λ x : ℵ\| *x* \< 4 ∧ *x*^3^  *x* • *x* (27) = 3

### - Le langage schématique de Z

> C'est un langage qui est utilisé pour composer et structurer une série
> de descriptions mathématiques, il permet de grouper l'ensemble des
> informations, les encapsuler et de les nommer pour réemploie, en
> effet, ce langage va nous permettre de présenter des schémas manipulés
> pour spécifier fortement un logiciel.
>
> Une spécification formelle est composée de deux parties :

-   des déclarations globales

-   un ou plusieurs schémas Un schéma se déclare en 3 parties :

-   un nom qui identifie le schéma.

-   Une partie déclarative qui est peut être vide, qui défini les
    > différentes données membres du schéma.

-   Une partie prédictive qui peut être vide, qui énumère les
    contraintes et les affectations.

> *Notation :*
>
> *Liaison :*
>
> Une liaison est une association entre des noms et des valeurs. Les
> noms sont des identifications des membres de la partie déclarative
> d'un schéma tandis que les valeurs sont les expressions associées qui
> respectent les contraintes d'un schéma.
>
> En Z, on pourra avoir accès à chacun des membres des liaisons à
> travers un opérateur de sélection. *Exemple* ℓ  x ≠ 5 (x ne possède
> autre valeur que 5)
>
> *Déclaration schématique:*
>
> **n :** la variable dans son état initial
>
> **n' :** la variable dans son état final
>
> **n? :** variable paramètre d'entrée du schéma dans son état initial
>
> **n! :** variable paramètre de sortie dans son état final
>
> **∆n :** il s'agit d'un raccourci pour déclarer n et n'
>
> **Ξ :** (Xi) le membre ou schéma qui inclut n ne sera pas modifié

###### Etude de cas : {#etude-de-cas .unnumbered}

> Rédaction d'un document de spécification formelle. Le document de
> spécification formelle contient tout d'abord une introduction formelle
> au problème à traiter.

####### → Introduction : {#introduction .unnumbered}

> Cette spécification concerne l'enregistrement des passagers à bord
> d'un avion. Les places ne seront numérotées. Les passagers sont
> autorisés à embarquer selon la règle du premier arrivé premier servi.

####### → Déclaration de types et de variables : {#déclaration-de-types-et-de-variables .unnumbered}

> Types \[PERSONNE\]
>
> Capacité : N ouiounon ::= oui \| non
>
> REPONSE ::= déjàABord \| plein

####### → Description de l'état du système : {#description-de-létat-du-système .unnumbered}

> ![](./image20.png){width="0.16160761154855643in"
> height="0.12271872265966755in"}(IP x : sous ensemble de x)
>
> ![](./image22.png){width="0.16160761154855643in"
> height="0.12271872265966755in"}![](./image23.png){width="0.16160761154855643in"
> height="0.12271872265966755in"}![](./image24.png){width="0.16160761154855643in"
> height="0.12271872265966755in"}![](./image25.png){width="0.16160761154855643in"
> height="0.12410761154855643in"}
>
> ![](./image30.png){width="0.16160761154855643in"
> height="0.12271872265966755in"}*Spécifcation en Z des fonctions*

1.  \- f' = f U{ *x*  *y* } **:** ajout d'un couple de valeurs à f.

2.  \- f' = f ➀ { *x*  *y*\'} **:** modification de *x*  *y* par *x* 
    *y*\' .

3.  \- f' ={x}~~◁~~ f **:** soustraction au domaine *(si on veut
    supprimer le couple (x,y), il sufft de supprimer x du domaine)*

###### Etude de cas N°2: {#etude-de-cas-n2 .unnumbered}

> Il s'agit d'un exemple simplifié d'une gestion du stock, le niveau de
> stock est défini pour les produits stockés, il peut exister des
> articles non stockés.
>
> \[ARTICLE\] : ensemble des articles stockés ou non.
>
> ![](./image32.png){width="0.17208989501312336in"
> height="9.986767279090114e-2in"}
>
> **Chapitre 5 : La gestion des projets logiciels**

### - Introduction

###### Objectifs

> Les objectifs de ce chapitre sont :

-   Rendre un étudiant capable de réaliser des activités de gestion de
    projets logiciels : organisation, estimation du coût, planification,
    rédaction des documents, gestion de configuration, ... etc.

-   S'initier au métier d'informaticien de gestion (gestion de projet,
    chef de projet)

> Un projet se distingue par un besoin unique, non répétitif, à une
> durée déterminée, une activité créatrice, une complexité et une
> variété d'intervenants qu'il faut coordonner.

###### Définition

> Un projet se définit comme une démarche spécifique qui permet de
> structurer méthodiquement et progressivement une réalité à venir. Un
> projet est défini et mis en œuvre pour élaborer la réponse aux besoins
> d'un utilisateur direct ou d'une clientèle et il applique un objectif
> et des actions à entreprendre avec des ressources données.
>
> Le rôle du chef de projet est de répondre au cahier des charges à la
> bonne date au coût prévu ou inférieur. Il essaye de trouver le
> meilleur compromis entre délai et coût.

# Cycle d'un projet {#cycle-dun-projet .unnumbered}

![](./image34.png){width="0.16097878390201226in"
height="0.1554232283464567in"}![](./image35.png){width="0.16236767279090114in"
height="0.1554232283464567in"}

> *Moyens (Techniques)*
>
> *Qualité*

###### Projet {#projet .unnumbered}

*Coût Délais*

### - Cahier des charges

###### Généralités

> Le cahier des charges est la responsabilité du client (maître
> d'ouvrage) ; il doit garantir que son expression traduit bien les
> besoins initiaux et qu'il soit compréhensible par les tiers.
>
> Le cahier des charges construit une demande de réponses, cette
> opération se nomme « ***appel d'offre*** ».

1.  **Structure d'un cahier des charges**

## CAHIER DES CHARGES : \# nom du projet \# {#cahier-des-charges-nom-du-projet .unnumbered}

> Référence : \# nom de l'entreprise, nom du projet, le nom du document
> de cahier des charges \... Date : \--/\--/\-\-\--
>
> Version : 1.0 Auteurs :

#### Table des Mise à jour du doucement {#table-des-mise-à-jour-du-doucement .unnumbered}

> **Parties Pages**

####  Sommaire {#sommaire .unnumbered}

####  {#section .unnumbered}

> I xx
>
> II xx
>
> III xx
>
> ... xx
>
> IX xx

###### Objectif de la consultation

> \# Préciser l'objet du cahier des charges \# Préciser le type du
> marché ou contrat \# Enumérer les prestations confiés
>
> \# Préciser l'interlocuteur de la direction informatique, son adresse,
> son téléphone, son mail, ...

###### Présentation de l'entreprise

> \# Présenter l'organisation de l'entreprise

###### Présentation de la direction informatique

I.  **Présentation générale de l'application**

    1.  ***- Description de l'application***

    2.  ***- Les acteurs et leurs rôles***

    3.  ***- Limites de l'application***

> \# Domaines non couverts
>
> \# Exigence non demandée en terme de fonctionnalité, format, contrôle,
> etc. ...

####### - Extension potentielle au long terme

> \# Autres fonctionnalités à ajouter \# Autres domaines d'application
> \# Autres utilisateurs futures

####### - Organisation du projet

> \# Préciser les structures et les responsabilités : maître d'ouvrage,
> structure de décision, structure représentative des utilisateurs,
> équipe du projet

###### Exigences Fonctionnelles et d'Ergonomie/Graphisme

> Pour décrire les fonctions à élaborer, on doit faire une description
> textuelle très détaillée pour les utilisateurs novices et on peut
> joindre le diagramme de cas d'utilisation ramifié en annexes pour les
> utilisateurs expérimentés.
>
> Dans cette partie, l'entreprise doit aussi concevoir l'interface
> utilisateur et pourra offrir une adresse URL comportant la maquette ou
> le prototype ; aussi l'entreprise doit fixer les règles d'ergonomie et
> la charte graphique spécifique à l'application
>
> Aussi dans cette partie, on représente les contrats rattachés à
> l'aspect graphique, on pourra spécifier les formats des images fournis
> en prestataires et la résolution des images fournis par les
> prestataires.

###### Exigences techniques

> *Exemple :* Temps de réponse, Utilisation de la mémoire, maintenance
> ...

###### Modalité d'interventions sollicitées

####### - Contexte d'intervention du candidat retenu

> Domaine de demande de service du prestataire (l'accès à lui fournir
> dans l'entreprise)

####### - La démarche de développement

> On peut imposer au prestataire d'utiliser une méthode (cycle de vie)
> ou des outils bien déterminés pour faciliter la maintenance ou
> conserver la compatibilité dans le système par exemple.

####### - Echéancier

> L'entreprise pourra aussi préciser les contraintes de l'échéancier du
> projet, elle pourra par exemple imposer une date de début du projet,
> une date limite de fin du projet et les principaux jalons (un jalon
> est une tâche de durée nulle qui marque le début ou la fin d'une autre
> tâche). Exemples de jalon : - réunion avec la maîtrise d'ouvrage

-   mise en production sur site pilote

-   mise en production sur site général

###### Description des prestations attendues

> Décrire les prestations attendues de notre candidat final retenu
> Prestation : - les résultats de la conception

-   Architecture du système sous forme de composants

-   Les algorithmes sous forme de pseudo code

-   Les structures de données utilisées

> Dans cette partie, on décrit ce qui est demandé au candidat retenu de
> réaliser tout au long du projet, on pourra par exemple, préciser ces
> prestations par phase du cycle de vie en terme de documents et de
> livrables. Aussi dans cette partie, on doit préciser des contraintes
> reliées à la garantie de conformité du logiciel, aux spécifications
> annoncées.
>
> *Exemple :* suivie des incidents, assurer la correction des logiciels
> à la suite des anomalies identifiés, ...

###### Modalités de la consultation

> Définir les règles pour répondre à l'autre. Dans cette partie on
> explicite les modalités à respecter par le prestataire, on doit
> préciser le cadre de réponse. Aussi, on demande au prestataire de
> respecter une certaine organisation de leur effort. Un calendrier à
> respecter qui fixe la durée de l'offre (délai de validité de l'offre).

### - Organisation d'un projet

> 3 outils à utiliser :

1.  **WBS : W**ork **B**reakdown **S**tructure (arbre des tâches)

2.  **PBS : P**roduct **B**reakdown **S**tructure (arbre des résultats)

3.  **OBS : O**rganisation **B**reakdown **S**tructure (Tableau
    d'affectation des ressources)

> ***PROJET*** : Réaliser un voyage T1 - choisir destination
>
> T1.1 + contacter agences de voyages
>
> T1.2 + Consulter les sites web des agences de voyages T1.3 + Lire les
> annonces des offres de voyages
>
> T1.4 + Demander l'avis de l'entourage T2 - Fixer le budget
>
> T2.1 + Trouver les ressources T3 - Fixer la destination
>
> T4 - Préparer le voyage T4.1 + Demande VISA
>
> T4.2 + Souscrire une assurance voyage T4.3 + Préparer passeport
>
> T4.4 + Effectuer réservations
>
> T4.4.1 \* Effectuer réservation Agence de voyage T4.4.2 \* Effectuer
> réservation Billet d'Avion
>
> T5 - Acheter billet T6 - Voyager

##### WBS {#wbs .unnumbered}

> *Mohamed*
>
> *Mohamed*
>
> *Mohamed*
>
> *+ Meriem*
>
> *Mohamed*
>
> T4.1
>
> *Mohamed*
>
> *Meriem Mohamed*
>
> *Mohamed*

*Mahmoud*

*Mahmoud*

> **PBS**
>
> **OBS**

+----------------------+-------------+-----------+------+------------+
| > ***Ressources***   | > Mohamed M | > eriem   | M    | > d        |
| >                    |             | > Ali     | amou |            |
| > ***Tâches***       |             |           |      |            |
+======================+=============+===========+======+============+
| > T1.1 X             |             |           |      |            |
+----------------------+-------------+-----------+------+------------+
| > T1.2               |             |           | > X  |            |
+----------------------+-------------+-----------+------+------------+
| > T1.3               |             | > X       |      |            |
+----------------------+-------------+-----------+------+------------+
| > T1.4 X             |             |           |      |            |
+----------------------+-------------+-----------+------+------------+
| > T2.1 X             |             | > X       |      |            |
+----------------------+-------------+-----------+------+------------+
| > T3 X               |             |           |      |            |
+----------------------+-------------+-----------+------+------------+
| > T4.1 X             |             |           |      |            |
+----------------------+-------------+-----------+------+------------+
| > T4.2               |             | > X       |      |            |
+----------------------+-------------+-----------+------+------------+
| > T4.3 X             |             |           |      |            |
+----------------------+-------------+-----------+------+------------+
| > T4.4.1             |             |           |      | X          |
+----------------------+-------------+-----------+------+------------+
| > T4.4.2             |             |           |      | X          |
+----------------------+-------------+-----------+------+------------+
| > T5 X               |             |           |      |            |
+----------------------+-------------+-----------+------+------------+

### - La planification des projets

###### Principes de la planification

-   Ordonnancer

-   Prévoir

-   Adapter

-   Contrôler

-   Décider

###### Techniques de la planification

####### PERT

> C'est une présentation des tâches et des liaisons. Les différents
> types de liaison entre tâches sont :

-   Fin à début : B ne peut débuter que si A soit terminé.

-   Début à début : B ne peut débuter avant que A soit commencé.

-   Fin à fin : B ne peut être achevé avant que A soit terminé.

-   Début à fin : B ne peut pas se terminer avant que A soit débuté.

    -   *Date au plus tôt :* c'est la date à laquelle une tâche peut
        commencer en fonction de dépendances aux autres tâches

    -   *Date au plus tard:* c'est la date à laquelle une tâche peut
        commencer au plus tard sans mettre en cause la date fin du
        projet.

    -   *Marge totale :* c'est l'intervalle de temps pendant lequel une
        tâche peut être retardée sans affecter la date de fin du projet
        ***= date début au plus tard - date début au plus tôt***

    -   *Marge libre* c'est l'intervalle de temps pendant lequel une
        tâche peut être retardée sans affecter d'autres tâches ***= date
        début au plus tôt du successeur le plus immédiat - date fin au
        plus tôt***

    -   *Chemin critique:* c'est la suite des tâches ayant une marge
        totale =0. Tout retard sur une tâche du chemin critique affecte
        la date fin du projet.

####### GANTT

> C'est un graphe qui représente des tâches en fonction des durées
>
> ![](./image38.png){width="6.944444444444444e-3in"
> height="0.208332239720035in"}![](./image38.png){width="6.944444444444444e-3in"
> height="0.208332239720035in"}![](./image39.png){width="6.944444444444444e-3in"
> height="0.24305555555555555in"}![](./image40.png){width="6.944444444444444e-3in"
> height="0.24305555555555555in"}![](./image41.png){width="6.944444444444444e-3in"
> height="0.23472112860892388in"}![](./image41.png){width="6.944444444444444e-3in"
> height="0.23472112860892388in"}![](./image42.png){width="6.944444444444444e-3in"
> height="0.2152777777777778in"}![](./image43.png){width="2.070100612423447e-2in"
> height="0.2221555118110236in"}![](./image44.png){width="2.640277777777778in"
> height="0.24444444444444444in"}![](./image45.png){width="3.584722222222222in"
> height="0.24444444444444444in"}Exemple
>
> *t0 t1 t2 t3 t4 t5 t6 t7 t8 t9 t10 t11*

### - L'estimation du coût d'un logiciel

> Parmi les problèmes qui faussent l'estimation du coût, on trouve, Les
> raisons de sous-traitance :

-   l'optimisme

-   la négligence des problèmes techniques

-   le manque d'expérience

-   oublie de la documentation

-   sous estimation des tâches annexes

> \- ...
>
> Le dépassement des délais budgets est une chronique des services
> informatique, d'où la nécessité des méthodes d'estimation des coûts
> est apparue.
>
> Coût
>
> Temps en délais Nombre de personnes Budget
>
> Productivité
>
> Effort (en personne-mois)
>
> Au sein de 100 personnes-mois, les personnes et les mois ne sont pas
> interchangeables car on peut pas spécifier tous les caractéristiques
> des 100 personnes

###### La méthode par expertise

> Il s'agit de faire plusieurs estimations par des experts qui ne se
> connaissent pas, si les résultats sont concordants ils peuvent être
> utilisés sinon il est nécessaire d'examiner avec chaque expert les
> causes des divergences et éventuellement rectifier les estimations en
> fonction de ces causes.
>
> Généralement un expert doit fournir 3 estimations : une optimiste, une
> pessimiste et une probable ; on utilise ensuite la méthode des 3
> valeurs pour calculer les estimations
>
> = *E*.*optimiste* + 4 \* *E*. *probable* + *E*. *pessimiste*
>
> 6

###### La méthode par analogie

> C'est une méthode qui se base sur des analogies faites au sein de
> l'entreprise ou en dehors de l'entreprise, l'analogie peut être même
> avec des composants. On majore eu on réduit les coûts des projets
> analogues suivant les spécificités des projets pour trouver une
> estimation adéquate.

###### La méthode par fonction

> Cette méthode est basée sur les principes suivants

-   estimer le nombre de fonctions par type

-   estimer le nombre de lignes de code (LOC *Lignes Of Code*) pour
    chaque fonction

-   utiliser la table de productivité

-   faire la somme

+-----------------------------------------+----------------------------+
| > ***Type fonction***                   | > ***Productivité en       |
|                                         | > PM/K-LOC***              |
+=========================================+============================+
| > Mathématiques 6                       | > PM/K-LOC PM/K-LOC        |
| >                                       | >                          |
| > Edition 8                             | > PM/K-LOC                 |
| >                                       |                            |
| > Logique 12                            |                            |
+-----------------------------------------+----------------------------+

> Exemple :
>
> Si on suppose que le nombre de lignes de codes d'une fonction
> mathématique 2 KLOC, pour une fonction d'édition 2 KLOC, pour une
> fonction logique 2 KLOC, 20 KLOC pour une fonction de contrôle de
> processus
>
> Effort = (6\*2)+(8\*2)+(12\*5)+(20\*20) = 488 PM

###### La méthode de répartition proportionnelle

> Elle est adaptée aux projets décomposés en étapes et surtout pour les
> phases et les tâches classiques : étude préalable, étude détaillée,
> étude technique, réalisation et mise en œuvre.
>
> Seule l'étude préalable fait l'objet d'une quantification analytique
> claire. Elle est divisée en 3 phases : observation, conception et
> appréciation ; cette méthode tient compte aussi des charges
> complémentaires annexes correspondant à une tâche suivante
> (Encadrement du projet, Recette, Documentation utilisateur). Les
> tableaux suivants indiquent des ratios à ajuster selon l'expertise du
> chef du projet.

+----------------------------------------+-----------------------------+
| > **Etude préalable**                  | > **Ratios**                |
+========================================+=============================+
| > Observation                          | > 30% - 40%                 |
+----------------------------------------+-----------------------------+
| > Conception                           | > 50% - 60%                 |
+----------------------------------------+-----------------------------+
| > Appréciation 10%                     |                             |
+----------------------------------------+-----------------------------+

> Charges complémentaires :

1.  **Modèle COCOMO: COnstractive COst MOdel** *(Barry Boehm - Software
    Engineering Economies)*

> 3 modes de développement :

-   *Mode organique :* qui couvre les projets faciles qu'on a l'habitude
    de réaliser.

-   *Mode semi détaché :* qui couvre les projets moyennement complexes.

-   *Mode contraint (imbriqué):* qui couvre les projets complexes.

> Pour chaque mode, COCOMO propose 2 équations : une pour calculer
> l'effort de développement et une pour calculer le temps de
> développement.

####### COCOMO de base

+-----------------------+-----------------------+-----------------------+
| > **Mode organique**  | > **Mode semi         | > **Mode contraint**  |
|                       | > détaché**           |                       |
+=======================+=======================+=======================+
| > Effort~DEV~ =2.4    | > t ~DEV~ = 3         | > ~DEV~ = 3.6         |
| > (KLOC)^1.05^ Effor  | > (KLOC)^1.12^ Effort | > (KLOC)^1.20^        |
| >                     |                       | >                     |
| > Temps~DEV~ = 2.5    | Temps ~DEV~ = 2.5     | > Temps~DEV~ = 2.5    |
| > (Effort~DEV~)^0.38^ | (Effort~DEV~)^0.35^   | > (Effort~DEV~)^0.32^ |
+-----------------------+-----------------------+-----------------------+

> Productivité =
>
> Effort
>
> KLOC
>
> FSP ( Full Software Person = Nombre de personnel Moyen) =
>
> Effort DEV
>
> Temps DEV
>
> ACT (Annual Change Trafic = Taux des Instructions Modifiés) =
>
> Effort~AM~ = ACT \* Effort ~DEV~
>
> FSP~AM~ = Effort~AM~ /12
>
> nombre des instructions modifiées nombre total des instructions
>
> *Rémarque :*
>
> 3 facteurs seulement ont été considérés par COCOMO de base

-   la taille du projet

-   le mode de développement

-   ACT

####### COCOMO intermédiaire

> COCOMO intermédiaire est plus détaillée que COCOMO de base, en fait il
> a introduit 15 autres facteurs multiplicatifs du coût regroupés dans 4
> catégories

i.  *catégorie du produit*

> RELY : un facteur lié à la fiabilité du produit CPLX : un facteur lié
> à la complexité du produit DATA : un facteur lié à la taille de la BD
> du produit

ii. *catégorie du matériel*

> TIME : un facteur qui exprime la contrainte temps d'exécution STOR :
> un facteur qui exprime la contrainte mémoire
>
> VIRT : un facteur qui exprime la volatilité de la machine virtuelle
> TURN : un facteur qui exprime le temps de finition d'un processus

iii. *catégorie du personnel*

> ACAP : un facteur qui exprime la capacité des analystes PCAP : un
> facteur qui exprime la capacité des programmeurs AEXP : un facteur qui
> exprime l'expérience des analystes LEXP : un facteur qui exprime
> l'expérience sur les langages
>
> VEXP : un facteur qui exprime l'expérience sur les machines virtuelles

iv. *catégorie du projet*

> MODP : un facteur qui exprime l'utilisation des techniques de
> programmation moderne TOOL : un facteur qui exprime l'utilisation des
> outils
>
> SCED : un facteur qui exprime la contrainte temps de développement

15

> EAF ( Effort Adjustment Factor) = *fi*

*i*=1

+-----------------------+----------------------+-----------------------+
| > **Mode organique**  | > **Mode semi        | > **Mode contraint**  |
|                       | > détaché**          |                       |
+=======================+======================+=======================+
| > Effort~DEV~ = EAF   | Effort ~DEV~ = EAF   | > Effort~DEV~ = EAF   |
| > \* 3.2 (KLOC)^1.05^ | \* 3 (KLOC)^1.12^    | > \* 2.8 (KLOC)^1.20^ |
| >                     |                      | >                     |
| > Temps~DEV~ = 2.5    | > ps ~DEV~ = 2.5     | > mps ~DEV~ = 2.5     |
| > (Effort~DEV~)^0.38^ | >                    | > (Effort~DEV~)^0.32^ |
| > Tem                 |  (Effort~DEV~)^0.35^ |                       |
|                       | > Te                 |                       |
+-----------------------+----------------------+-----------------------+

> Vers la fin des années 90, un nouveau model avait son apparition
> COCOMO2 , il propose 3 modèles d'estimation du coût :

-   le modèle d'application composition : qui est utilisé
    essentiellement pour le prototype

-   le modèle early design (conception préliminaire)

-   le modèle cost-architecture

### I - Définitions {#i---définitions-1 .unnumbered}

> **Chapitre 6 : La Normalisation**
>
> Les normes sont des apports documentés contenant des spécifications
> techniques ou autres critères précis destinés à être utilisés
> systématiquement en tant que règle ligne directrice ou définition des
> caractéristiques pour assurer que des matériaux, produits, processus
> et services sont aptes à leurs envoies.
>
> Les normes internationales attribuent ainsi à nous simplifier la vie
> et à accroitre la fiabilité et l'efficacité des biens et des services
> que nous utilisions.
>
> *Exemple* : carte de crédit : le format de ces cartes est dérivé de la
> norme ISO qui a défini des caractéristiques tel que l'épaisseur
> optimale (0,76 millimètres) cela signifie que les cartes pourront être
> utilisés dans le monde entier.

### II - La norme ISO {#ii---la-norme-iso .unnumbered}

> C'est une organisation internationale de normalisation crée en 1947.
> C'est une fédération mondiale d'organismes nationaux de normalisation.
> Un organisme pour pays (INORPI, en Tunisie). Elle a comme mission de
> favoriser le développement de la normalisation et des activités
> connexes dans le monde e vue de faciliter, entre les nations, les
> échanges des biens et des services et de développer la coopération
> dans les domaines intellectuels, scientifiques, techniques et
> économiques. Les travaux d'ISO aboutissent à des accords
> internationaux qui sont publiés sous forme de normes internationaux.
> On a plus que 12000 normes publiées depuis 1947.
>
> Une norme ISO est représentée par un document normatif est élaboré
> selon des procédures approuvés par les membres d'ISO.

### III - Etapes pour la certification ISO 9000 {#iii---etapes-pour-la-certification-iso-9000 .unnumbered}

> ISO 9000 traduit la démarche qualité au niveau de l'entreprise, elle
> apporte :

-   en interne (à l'échelle nationale) : l'amélioration de la
    compétitivité et la diminution des coûts.

-   à l'extérieur (à l'échelle internationale) : la réponse aux
    exigences des donneurs d'ordre qui imposent de plus en plus la
    certification ISO 9000 à leurs fournisseurs.

> L'implication de la normalisation ISO 9000 importe à l'entreprise :

-   une amélioration de sa compétitivité

-   Une réponse aux demandes du marché

-   Une démarché fédératrice pour l'ensemble des domaines

-   Un axe de communication externe

> Pour mettre en œuvre une norme ISO 9000 au sein d'une organisation on
> doit tout d'abord réaliser un diagnostic de l'organisation en auditant
> les fonctions principales de l'organisation, ce diagnostic pourra
> apparaître un certain nombre de non conformités. Le rôle du
> responsable qualité est de prendre en charge ce côté formel ; le
> responsable qualité va veiller à établir un plan de travail
> traditionnellement, les points nécessaires par action sont :

-   La gestion documentaire

-   La revue du contrat (c'est ce qu'on est en mesure de pouvoir
    répondre à une demande du client à juste prix ?)

-   La gestion des produits non-conformes

-   La traçabilité

> Parallèlement, il faut s'intéresser pour tous les processus de
> l'entreprise de la prise de commandes jusqu'à la livraison des
> produits et du SAV
>
> Les intérêts recherchés sont :

-   Les fonctions du personnel sont bien définies (qui fait quoi ?)

-   Le processus est établi de la commande jusqu'à la livraison

-   Les procédures sont établis, il ne reste qu'à les formaliser (quoi
    faire ? pourquoi ?)

-   La circulation des documents précisés

-   Les points critiques apparaissent

### IV - Normes IEEE {#iv---normes-ieee .unnumbered}

> Le terme « norme » désigne un ensemble de règles à suivre dans la
> réalisation d'un produit. Les normes IEEE dans la génie-logiciel
> couvre un ensemble de 37 normes s'intéressant aux processus, produits
> et aux techniques de base de génie-logiciel, cet ensemble a comme
> caractéristiques d'être ouvert à normes internationales ISO.
>
> **IEEE std 12207.0** : qui s'intéresse au processus du cycle de vie
> d'un logiciel. Cette norme s'est intéressé à fixer la signification de
> certains termes et choisir les processus prioritaires. Elle peut être
> considérée comme un dictionnaire et une liste de vérification pour la
> gestion des projets.
>
> **IEEE std 1362** : guide pour la rédaction du document principe
> d'opération, pour faciliter l'écriture et l'étude des opportunités
>
> **IEEE std 830** : recommandée pour les spécifications des exigences
> du logiciel, cette norme pourrait être intégrée avec les approches de
> validation avec prototype.
>
> **IEEE std 1028** : pour appliquer la validation et la vérification.
> C'est une norme très facile à adapter à tous les problèmes et qui
> permet en u très peu de temps d'avoir cette norme.
