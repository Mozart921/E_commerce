import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {
  product: any;
  produits: any[] = [];
  relatedProducts: any[] = [];
  dataUser = {
    email: '',
    password: ''
  };
  connected: boolean;
  email: string | null;
  userID = '';
  currentDate: string;
  myTask: string;
  today = new Date().toLocaleDateString();
  checked: boolean;
  addTask: boolean;
  tasks: any[] = [];
  firebase = firebase;
  projet: number = 5;
  panier: any[] = [];

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth
    ) { }

  ngOnInit() {
    this.getProduits();
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.product = navigation.extras.state['product'];
      this.produits = navigation.extras.state['produits'];
      this.relatedProducts = this.getRelatedProducts();
    }

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userID = user.uid;
        this.email = user.email;
        this.connected = true;
      } else {
        this.connected = false;
      }
    });
  }

  buyProduct() {
    if (!this.connected) {
      console.log('Veuillez vous connecter pour acheter un produit.');
      return;
    }
  
    console.log("Achat du produit :", this.product);
    this.afDB.list('panier/').push({
      userId: this.userID,
      produitId: this.product.id,
      produitName: this.product.name,
      produitCategorie: this.product.categorie,
      productPrix: this.product.prix,
      productPrixHT: this.product.prix * 0.7, // Calcul du prix HT
      choixDate: new Date().toISOString(),
      quantité: 1,
      imageProduit: this.product.imageUrl,
      email: this.email
    }).then(() => {
      console.log('Produit acheté avec succès!');
    }).catch(error => {
      console.error('Erreur lors de l\'achat du produit:', error);
    });
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
          quantité: action.payload.exportVal().quantité
        });
      });
      console.log('Panier:', this.panier);
    });
  }


  getProduits() {
    this.afDB.list('produits/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.produits = [];
      actions.forEach(action => {
        this.produits.push({
          id: action.key,
          name: action.payload.exportVal().name,
          categorie: action.payload.exportVal().categorie,
          description: action.payload.exportVal().description,
          enStock: action.payload.exportVal().enStock,
          imageUrl: action.payload.exportVal().imageUrl,
          prix: action.payload.exportVal().prix
        });
      });
      console.log(this.produits);
      this.relatedProducts = this.getRelatedProducts(); // Obtenir les produits similaires après avoir récupéré tous les produits
    });
  }

  getRelatedProducts() {
    if (!this.product || !this.produits || this.produits.length === 0) {
      return [];
    }
    // Récupérer la catégorie du produit actuel
    const productCategory = this.product.categorie;
    // Filtrer les produits par catégorie, exclure le produit actuel et limiter à 3 produits
    const relatedProducts = this.produits.filter(product => product.categorie === productCategory && product.id !== this.product.id).slice(0, 3);
    console.log("Produits similaires :", relatedProducts);
    return relatedProducts;
  }

  goToProduitDetail(product: any) {
    this.router.navigate(['/produit'], {
      state: {
        product: product
      }
    });
  }
}
