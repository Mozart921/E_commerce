Divisions et Conteneurs
<div class="espace2"></div> : Cette division ajoute un espace vide en haut de la page pour ajuster le positionnement du contenu.
<div class="list-container"> : Conteneur principal pour la liste des commandes.
  
Boucle sur les Commandes
<div *ngFor="let commande of commandes"> : Utilise la directive ngFor d'Angular pour itérer sur la liste des commandes et générer un bloc de contenu pour chaque commande.
  
Carte de Commande
<ion-card> : Composant de carte d'Ionic utilisé pour afficher chaque commande.
<ion-card-header> : En-tête de la carte.
<ion-card-title> : Titre de la carte affichant la date de la commande formatée.
<ion-card-content> : Contenu de la carte avec les détails de la commande.

Affiche les informations de la commande telles que le nom, prénom, adresse, ville, région, code postal, pays, total et total HT.
<p>Statut: {{ commande.recu }}</p> : Affiche le statut de la commande.

Bouton de Suppression
<ion-button *ngIf="commande.recu === 'en cours'" color="danger" (click)="deleteCommande(commande.id)">Supprimer</ion-button> :
Utilise ngIf pour afficher le bouton uniquement si le statut de la commande est "en cours".
color="danger" : Définit la couleur du bouton en rouge pour indiquer une action de suppression.
(click)="deleteCommande(commande.id)" : Associe l'événement de clic à la méthode deleteCommande, en passant l'ID de la commande.

Ce code affiche une liste de commandes sous forme de cartes. Chaque carte montre les détails de la commande et, si la commande est en cours, affiche un bouton permettant de la supprimer. L'utilisation des composants Ionic pour les cartes et les boutons, combinée aux directives Angular, permet de créer une interface utilisateur interactive et dynamique.
