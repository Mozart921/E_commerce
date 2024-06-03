<ion-header> : Composant Ionic pour l'en-tête de la page.
<ion-toolbar> : Barre d'outils contenant le titre de l'en-tête.
<ion-title>Recherche</ion-title> : Titre de la page affichant "Recherche".

Contenu principal

<ion-item> : Conteneur pour un élément de formulaire.
<ion-label position="floating">Recherche</ion-label> : Étiquette flottante pour le champ de recherche.
<ion-input [(ngModel)]="searchTerm" (ionInput)="onSearchTermChange()"></ion-input> : Champ de saisie pour le terme de recherche. La propriété searchTerm est liée à ce champ, et la méthode onSearchTermChange est appelée à chaque saisie.

Plage de prix

Deux champs de saisie pour définir la plage de prix :
<ion-input type="number" [(ngModel)]="minPrice" (ionChange)="onMinPriceChange()"></ion-input> : Champ de saisie pour le prix minimum.
<ion-input type="number" [(ngModel)]="maxPrice" (ionChange)="onMaxPriceChange()"></ion-input> : Champ de saisie pour le prix maximum.
La propriété minPrice et maxPrice sont liées à ces champs, et les méthodes onMinPriceChange et onMaxPriceChange sont appelées lorsque les valeurs changent.

Catégories

<ion-item> : Conteneur pour un élément de formulaire.
<ion-label>Catégorie</ion-label> : Étiquette pour le sélecteur de catégories.
<ion-select [(ngModel)]="categories" multiple="true" (ionChange)="onCategoryChange()"> : Sélecteur de catégories permettant une sélection multiple.
<ion-select-option *ngFor="let category of categoriesList" [value]="category">{{category}}</ion-select-option> : Options du sélecteur, générées dynamiquement à partir de la liste categoriesList.
La propriété categories est liée au sélecteur, et la méthode onCategoryChange est appelée lorsque la sélection change.

Disponibilité en stock

<ion-item> : Conteneur pour un élément de formulaire.
<ion-label>En Stock Seulement</ion-label> : Étiquette pour le basculeur de disponibilité.
<ion-toggle [(ngModel)]="inStockOnly" (ionChange)="onInStockOnlyChange()"></ion-toggle> : Basculeur pour filtrer les produits en stock uniquement.
La propriété inStockOnly est liée au basculeur, et la méthode onInStockOnlyChange est appelée lorsque la valeur change.

Tri

<ion-item> : Conteneur pour un élément de formulaire.
<ion-label>Trier par</ion-label> : Étiquette pour le sélecteur de tri.
<ion-select [(ngModel)]="sortField" (ionChange)="onSortFieldChange()"> : Sélecteur pour choisir le champ de tri.
Options de tri disponibles : Prix, Nouveauté, et En Stock.
<ion-segment [(ngModel)]="sortOrder" (ionChange)="onSortOrderChange()"> : Segmenteur pour choisir l'ordre de tri (ascendant ou descendant).
Deux boutons de segment : Ascendant et Descendant.
Les propriétés sortField et sortOrder sont liées aux sélecteurs correspondants, et les méthodes onSortFieldChange et onSortOrderChange sont appelées lorsque les valeurs changent.

Résultats de la recherche

<ion-list> : Conteneur pour la liste des résultats de recherche.
<ion-item *ngFor="let produit of filteredProduits" (click)="goToProduitDetail(produit)"> : Pour chaque produit filtré dans filteredProduits, un élément de liste est créé. Lorsqu'un produit est cliqué, la méthode goToProduitDetail est appelée.
<ion-thumbnail slot="start"> : Miniature de l'image du produit.
<img [src]="produit.imageUrl" [alt]="produit.name"> : Image du produit.
<ion-label> : Conteneur pour les informations sur le produit.
<h2>{{ produit.name }}</h2> : Nom du produit.
<p>{{ produit.description }}</p> : Description du produit.
<p>{{ produit.prix | currency:'EUR':'symbol' }}</p> : Prix du produit en euros.

Cette page de recherche permet aux utilisateurs de filtrer et de trier les produits selon différents critères tels que le terme de recherche, la plage de prix, la catégorie, la disponibilité en stock et l'ordre de tri. Les produits correspondant aux critères de recherche sont affichés avec leur image, nom, description et prix. Les utilisateurs peuvent cliquer sur un produit pour voir plus de détails. Les changements dans les filtres et les critères de tri sont gérés par des méthodes spécifiques qui mettent à jour la liste des produits filtrés.
