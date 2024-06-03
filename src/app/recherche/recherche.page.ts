import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.page.html',
  styleUrls: ['./recherche.page.scss'],
})
export class RecherchePage implements OnInit {
  produits: any[] = [];
  filteredProduits: any[] = [];
  searchTerm: string = '';
  material: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;
  categories: string[] = [];
  categoriesList: string[] = [];
  inStockOnly: boolean = false;
  sortField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(public afDB: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.getProduits();
    this.getCategories();
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
          prix: action.payload.exportVal().prix,
          material: action.payload.exportVal().material,
          dateAdded: action.payload.exportVal().dateAdded
        });
      });
      this.filterProduits();
    });
  }

  getCategories() {
    this.afDB.list('categories/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.categoriesList = [];
      actions.forEach(action => {
        this.categoriesList.push(action.payload.exportVal().name);
      });
    });
  }

  filterProduits() {
    this.filteredProduits = this.produits.filter(produit => {
      return (!this.searchTerm || this.matchesSearchTerm(produit)) &&
             (!this.material || produit.material.includes(this.material)) &&
             (this.minPrice === null || produit.prix >= this.minPrice) &&
             (this.maxPrice === null || produit.prix <= this.maxPrice) &&
             (!this.categories.length || this.categories.includes(produit.categorie)) &&
             (!this.inStockOnly || produit.enStock);
    });

    if (this.sortField) {
      this.filteredProduits.sort((a, b) => {
        let comparison = 0;
        if (a[this.sortField] > b[this.sortField]) {
          comparison = 1;
        } else if (a[this.sortField] < b[this.sortField]) {
          comparison = -1;
        }
        return this.sortOrder === 'asc' ? comparison : -comparison;
      });
    }
  }

  matchesSearchTerm(produit: any) {
    const searchTerm = this.searchTerm.toLowerCase();
    const name = produit.name.toLowerCase();
    const description = produit.description.toLowerCase();

    return name === searchTerm || 
           description === searchTerm ||
           name.startsWith(searchTerm) ||
           description.startsWith(searchTerm) ||
           name.includes(searchTerm) ||
           description.includes(searchTerm) ||
           this.oneCharacterDifference(name, searchTerm) ||
           this.oneCharacterDifference(description, searchTerm);
  }

  oneCharacterDifference(str1: any, str2: any) {
    if (Math.abs(str1.length - str2.length) > 1) return false;
    let differences = 0;
    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (str1[i] !== str2[i]) {
        differences++;
        if (differences > 1) return false;
      }
    }
    return true;
  }

  onSearchTermChange() {
    this.filterProduits();
  }

  onMaterialChange() {
    this.filterProduits();
  }

  onMinPriceChange() {
    this.filterProduits();
  }

  onMaxPriceChange() {
    this.filterProduits();
  }

  onCategoryChange() {
    this.filterProduits();
  }

  onInStockOnlyChange() {
    this.filterProduits();
  }

  onSortFieldChange() {
    this.filterProduits();
  }

  onSortOrderChange() {
    this.filterProduits();
  }

  goToProduitDetail(product: any) {
    this.router.navigate(['/produit'], {
      state: {
        product: product
      }
    });
  }
}
