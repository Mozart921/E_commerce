import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  email: string | null = null;
  currentDate: string;
  msg: string = '';
  today = new Date().toLocaleDateString();

  constructor(
    public afAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
  ) {
    const date = new Date();
    this.currentDate = date.toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' });
  }

  ngOnInit() {}

  addMessage() {
    const user = firebase.auth().currentUser;
    console.log('message : ' + this.msg)
    this.afDB.list('Message/').push({
      msg: this.msg,
      date: this.today,
      Email: this.email
    });
    this.vide();
  }
  

  vide() {
    this.email = '';
    this.msg = '';
  }
}
