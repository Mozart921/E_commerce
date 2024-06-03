import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  cartItemCount = 0;
  searchBarVisible: boolean = false;
  categories: any[] = [];
  produits: any[] = [];

  constructor(private router: Router, public afAuth: AngularFireAuth, public afDB: AngularFireDatabase) { }

  ngOnInit() {
    this.getCategory();
    this.getProduits();
  }

  getCategory() {
    this.afDB.list('categories/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.categories = [];
      actions.forEach(action => {
        this.categories.push({
          id: action.key,
          name: action.payload.exportVal().name,
          description: action.payload.exportVal().description,
          imageUrl: action.payload.exportVal().imageUrl
        });
      });
      console.log(this.categories);
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
    });
  }

  goToCategoryDetail(category: any) {
    const categoryProducts = this.produits.filter(produit => produit.categorie === category.name);
    this.router.navigate(['/categories'], {
      state: {
        categorie: category,
        produits: categoryProducts
      }
    });
  }

  search(event: any) {
    const searchTerm = event.target.value;
    this.router.navigate(['/search-results', searchTerm]);
  }

  toggleSearch() {
    this.searchBarVisible = !this.searchBarVisible;
  }

  goToSearchPage() {
    this.router.navigate(['/recherche']);
  }

  addToCart(product: any) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // User is signed in, add product to cart
        console.log("Produit ajouté au panier :", product);
        // Ajoutez ici la logique pour ajouter le produit au panier
      } else {
        // User is not signed in, redirect to login
        this.router.navigate(['/login'], {
          state: {
            returnUrl: '/accueil',
            product: product
          }
        });
      }
    });
  }
}
