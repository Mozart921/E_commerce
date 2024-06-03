Voici ce qui ce passe dans chaque page:

Dans la page d’accueil, on va récupérer tous les produits et toutes les catégories de firebase et les afficher. 
Les produits et catégories ont chacun une collection dans firebase. Chaque produit à un élément “catégorie” parmi ces champs.
Les produits sont récupérés.
En un clic sur la catégorie, cela nous emmène vers la page Categorie.

Dans cette page Categorie, on voit une image de la catégorie, une description, suivi de tous les produits de cette catégorie. En un clic sur un produit, cela nous emmène vers la page produit.

Dans la page Recherche, on peut rechercher des produits en fonction de leur catégorie, matériaux, gamme de prix, s' ils sont en stock ou pas pour le moment.

Sur la page Login, on peut se connecter si on a déjà un compte, ou s’inscrire si on en a pas.

Sur la page Commande, on peut voir toutes les commandes déjà passées, et leur état (en cours, livrées …). On peut aussi supprimer une commande tant qu’elle est toujours “en cours”, et donc pas encore envoyée. Il faut être connecté pour avoir accès à cette page.

La page Produit nous affiche une page d’information sur le produit sélectionné, une image du produit, son nom, sa description, son prix, si il est en stock, et un bouton pour l’ajouter au panier, possible uniquement si on est connecté. Sinon, il affiche un message d’erreur dans la console.

La page Panier nous permet de voir le contenu de notre panier actuel, le prix total de notre panier, l’opportunité de supprimer des produits du panier, ainsi que valider la commande en remplissant le formulaire de paiement contenant des informations de livraison et de paiement.  Il faut être connecté pour avoir accès à cette page.

La page Contact permet à l’utilisateur d’envoyer des messages à la base de données du site, ainsi que la date du dépôt du message et l’adresse email de l’utilisateur. Il n’y a pas besoin d’avoir un compte pour déposer un message.

La page CGU affiche les mentions légales à respecter par l’utilisateur sur ce site.

Depuis le header en haut du site, on peut accéder à la page Accueil en un clic sur “AIRNEIS” en haut à gauche, à la page de recherche grâce à l’icôn d’une loupe, à la page du panier grâce à l’icôn d’un panier, et grâce au menu, on a accès à toutes ces pages, ainsi qu’à la page de login, cgu et de commande.
Haut de page : 
