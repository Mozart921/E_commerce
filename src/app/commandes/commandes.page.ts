import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss'],
})
export class CommandesPage implements OnInit {
  userID: string = '';
  commandes: any[] = [];

  constructor(
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userID = user.uid;
        this.getCommandes();
      }
    });
  }

  
  
  getCommandes() {
    if (!this.userID) {
      console.log('Veuillez vous connecter pour voir vos commandes.');
      return;
    }

    this.afDB.list('commandes/', ref => ref.orderByChild('userId').equalTo(this.userID)).snapshotChanges().subscribe(actions => {
      this.commandes = [];
      actions.forEach(action => {
        const data = action.payload.val();
        //const year = new Date(data.dateCommande).getFullYear();
        
        this.commandes.push({
          id: action.key,
          CP: action.payload.exportVal().CP,
          adresse1: action.payload.exportVal().adresse1,
          adresse2: action.payload.exportVal().adresse2,
          dateCommande: action.payload.exportVal().dateCommande,
          total: action.payload.exportVal().total,
          totalHT: action.payload.exportVal().totalHT,
          //produits: action.payload.exportVal().produits,
          email: action.payload.exportVal().email,
          ville: action.payload.exportVal().ville,
          nom: action.payload.exportVal().nom,
          prenom: action.payload.exportVal().prenom,
          pays: action.payload.exportVal().pays,
          region: action.payload.exportVal().region,
          recu: action.payload.exportVal().recu
        });
      });
    });
  }

  viewCommandeDetails(commandeId: string) {
    this.router.navigate(['/commandes', commandeId]);
  }

  deleteCommande(commandeId: string) {
    const commande = this.commandes.find(cmd => cmd.id === commandeId);
    if (commande && commande.recu === 'en cours') {
      this.afDB.list('commandes/').remove(commandeId).then(() => {
        this.commandes = this.commandes.filter(cmd => cmd.id !== commandeId);
        console.log('Commande supprimée avec succès!');
      }).catch(error => {
        console.error('Erreur lors de la suppression de la commande:', error);
      });
    } else {
      console.log('Vous ne pouvez pas supprimer une commande qui est déjà reçue.');
    }
  }
}