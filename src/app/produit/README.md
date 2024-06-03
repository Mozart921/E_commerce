<ion-header> : Composant Ionic pour l'en-tête de la page.
<ion-toolbar> : Barre d'outils contenant le titre de l'en-tête.
<ion-title>{{ product.name }}</ion-title> : Titre de la page affichant le nom du produit.

Composant Ionic utilisé pour le contenu principal de la page.
Carte du produit
<ion-card> : Conteneur de la carte du produit.
<img [src]="product.imageUrl" [alt]="product.name"> : Image du produit.
<ion-card-header> : En-tête de la carte contenant le titre du produit.
<ion-card-title>{{ product.name }}</ion-card-title> : Titre de la carte affichant le nom du produit.
<ion-card-content> : Contenu de la carte affichant la description et le prix du produit.
<p>{{ product.description }}</p> : Description du produit.
<p>{{ product.prix | currency:'EUR' }}</p> : Prix du produit en euros.

Disponibilité du produit et bouton d'ajout au panier

<ion-item *ngIf="product.enStock"> : Affiche un bouton d'ajout au panier si le produit est en stock.
<ion-button expand="block" (click)="buyProduct()">AJOUTER AU PANIER</ion-button> : Bouton pour ajouter le produit au panier, qui appelle la méthode buyProduct lors du clic.
<ion-label>En stock</ion-label> : Indique que le produit est en stock.
<ion-item *ngIf="!product.enStock"> : Affiche un bouton désactivé et une étiquette si le produit est épuisé.
<ion-button expand="block" disabled>ÉPUISÉ</ion-button> : Bouton désactivé indiquant que le produit est épuisé.
<ion-label>Stock épuisé</ion-label> : Indique que le produit est épuisé.

Section des produits similaires

<ion-title>PRODUITS SIMILAIRES</ion-title> : Titre de la section des produits similaires.
<ion-row> : Conteneur pour une ligne de produits similaires.
<ion-col size="4" *ngFor="let relatedProduct of relatedProducts"> : Colonne de 4 unités de largeur pour chaque produit similaire dans la liste relatedProducts.
<ion-card class="ion-activatable" (click)="goToProduitDetail(relatedProduct)"> : Carte du produit similaire, cliquable pour accéder aux détails du produit.
<img [src]="relatedProduct.imageUrl" [alt]="relatedProduct.name"> : Image du produit similaire.
<ion-card-header> : En-tête de la carte contenant le titre et le sous-titre.
<ion-card-title>{{ relatedProduct.name }}</ion-card-title> : Titre de la carte affichant le nom du produit similaire.
<ion-card-subtitle>{{ relatedProduct.prix | currency:'EUR':'symbol' }}</ion-card-subtitle> : Sous-titre affichant le prix du produit similaire.
<ion-card-content>{{ relatedProduct.description }}</ion-card-content> : Contenu de la carte affichant la description du produit similaire.

Cette page affiche les détails d'un produit, y compris son image, son nom, sa description, et son prix. Si le produit est en stock, un bouton permet de l'ajouter au panier. Si le produit est épuisé, un bouton désactivé et une étiquette indiquent cette information. La page inclut également une section pour afficher des produits similaires, chaque produit étant cliquable pour voir ses détails. Les données du produit et des produits similaires sont liées aux propriétés du composant Angular via des liaisons de données ([src], {{ }}) et des directives structurelles (*ngFor, *ngIf).
