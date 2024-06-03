import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
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

  constructor(
    public afAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
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
      
    });
    

    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    this.currentDate = date.toLocaleDateString('fr-FR');
    
  }

  

  


  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }

  login() {
    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
    this.dataUser = {
      email: '',
      password: ''
   };
  }

  logout() {
    this.afAuth.signOut();
  }

  signup() {
    this.afAuth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
    this.dataUser = {
      email: '',
      password: ''
   };
  }

  

}
