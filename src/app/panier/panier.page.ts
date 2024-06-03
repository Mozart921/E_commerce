import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
  panier: any[] = [];
  connected: boolean = false;
  userID: string = '';
  total: number;
  totalHT: number;
  email: string | null;
  commande: any[] = [];
  envoi: boolean = false;
  commandeInfo: any = {
    prenom: '',
    nom: '',
    adresse1: '',
    adresse2: '',
    ville: '',
    region: '',
    codePostal: '',
    pays: '',
    telMobile: '',
    nomCarte: '',
    numCarte: '',
    dateExp: '',
    cvv: ''
  };

  constructor(
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        this.connected = false;
      } else {
        console.log('connecté: ' + auth.uid);
        this.email = auth.email;
        this.userID = auth.uid;
        this.connected = true;
      }
      
    })
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.connected = true;
        this.userID = user.uid;
        this.getPanier();
      } else {
        this.connected = false;
        this.userID = '';
      }
    });
  }

  confirmCommande() {
    this.envoi = !this.envoi;
  }

  getPanier() {
    if (!this.connected) {
      console.log('Veuillez vous connecter pour voir votre panier.');
      return;
    }

    this.afDB.list('panier/', ref => ref.orderByChild('userId').equalTo(this.userID)).snapshotChanges().subscribe(actions => {
      this.panier = [];
      actions.forEach(action => {
        const data = action.payload.val();
        this.panier.push({
          id: action.key,
          name: action.payload.exportVal().produitName,
          categorie: action.payload.exportVal().produitCategorie,
          produitId: action.payload.exportVal().produitId,
          prix: action.payload.exportVal().productPrix,
          choixDate: action.payload.exportVal().choixDate,
          imageUrl: action.payload.exportVal().imageUrl,
          quantity: action.payload.exportVal().quantité
        });
      });
      this.updateTotal();
    });
  }

  updateTotal() {
    this.total = this.panier.reduce((acc, product) => acc + (product.prix * product.quantity), 0);
    this.totalHT = this.panier.reduce((acc, product) => acc + ((product.prix * product.quantity) * 0.7), 0)
  }

  deleteProductFromPanier(productId: string) {
    this.afDB.list('panier/').remove(productId).then(() => {
      this.panier = this.panier.filter(product => product.id !== productId);
      this.updateTotal();
      console.log('Produit supprimé avec succès!');
    }).catch(error => {
      console.error('Erreur lors de la suppression du produit:', error);
    });
  }

  passerCommande() {
    if (!this.userID) {
      console.log('Veuillez vous connecter pour passer une commande.');
      return;
    }
  
    this.afDB.list('panier/', ref => ref.orderByChild('userId').equalTo(this.userID)).snapshotChanges().pipe(take(1)).subscribe(actions => {
      this.commande = []; 
      actions.forEach(action => {
        const data = action.payload.val();
        this.commande.push({
          id: action.key,
          name: action.payload.exportVal().produitName,
          categorie: action.payload.exportVal().produitCategorie,
          produitId: action.payload.exportVal().produitId,
          prix: action.payload.exportVal().productPrix,
          choixDate: action.payload.exportVal().choixDate,
          imageUrl: action.payload.exportVal().imageProduit,
          quantity: action.payload.exportVal().quantité
        });
      });
  
      const commande = {
        userId: this.userID,
        email: this.email,
        produits: this.commande, 
        total: this.total, 
        totalHT: this.totalHT, 
        dateCommande: new Date().toISOString(),
        nom: this.commandeInfo.nom,
        prenom: this.commandeInfo.prenom,
        adresse1: this.commandeInfo.adresse1,
        adresse2: this.commandeInfo.adresse2,
        ville: this.commandeInfo.ville,
        region: this.commandeInfo.region,
        CP: this.commandeInfo.codePostal,
        pays: this.commandeInfo.pays,
        telMobile: this.commandeInfo.telMobile,
        nomCarte: this.commandeInfo.nomCarte,
        numCarte: this.commandeInfo.numCarte,
        dateExp: this.commandeInfo.dateExp,
        CVV: this.commandeInfo.cvv,
        recu: 'en cours'
      };
  
      this.afDB.list('commandes/').push(commande).then(() => {
        console.log('Commande passée avec succès!');
        actions.forEach(action => {
          const key = action.key;
          if (key) {
            this.afDB.list('panier/').remove(key).then(() => {
              console.log('Produit supprimé du panier avec succès!');
            }).catch(error => {
              console.error('Erreur lors de la suppression du produit du panier:', error);
            });
          }
        });
  
        this.panier = [];
        this.updateTotal();
      }).catch(error => {
        console.error('Erreur lors du passage de la commande:', error);
      });
    });
  }
  
  
}
