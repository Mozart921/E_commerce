import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'home',loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {path: '',redirectTo: 'accueil',pathMatch: 'full'},
  {path: 'login',loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  {path: 'calendrier',loadChildren: () => import('./calendrier/calendrier.module').then( m => m.CalendrierPageModule)},
  {
    path: 'accueil',
    loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'produit',
    loadChildren: () => import('./produit/produit.module').then( m => m.ProduitPageModule)
  },
  {
    path: 'panier',
    loadChildren: () => import('./panier/panier.module').then( m => m.PanierPageModule)
  },
  {
    path: 'recherche',
    loadChildren: () => import('./recherche/recherche.module').then( m => m.RecherchePageModule)
  },
  {
    path: 'commandes',
    loadChildren: () => import('./commandes/commandes.module').then( m => m.CommandesPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'cgu',
    loadChildren: () => import('./cgu/cgu.module').then( m => m.CGUPageModule)
  },
  //{path: 'login',component:LoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
