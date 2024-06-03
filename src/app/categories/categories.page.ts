import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categorie: any;
  products: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.categorie = navigation.extras.state['categorie'];
      this.products = navigation.extras.state['produits'];
    }
  }

  goToProduitDetail(product: any) {
    this.router.navigate(['/produit'], {
      state: {
        product: product
      }
    });
  }
}
