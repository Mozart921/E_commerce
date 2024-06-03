import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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
    this.getTasks()
  }

  addTaskToFirebase() {
    const user = firebase.auth().currentUser;
    console.log('myTask : ' + this.myTask)
    this.afDB.list('TDL/').push({
      text: this.myTask,
      date: this.today,
      checked: false,
      userId: this.userID,
      Email: this.email
    });
    this.showForm();
    this.projet++;
  }

  getTasks() {
    this.afDB.list('TDL/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      actions.forEach(action => {
        this.tasks.push({
          key: action.key,
          text: action.payload.exportVal().text,
          hour: action.payload.exportVal().date.substring(11, 16),
          checked: action.payload.exportVal().checked,
          userId: action.payload.exportVal().userId
        });
      });
      console.log(this.tasks)
    });
  }

  changeCheckState(ev: any) {
    console.log('coché: ' + ev.checked);
    this.afDB.object('TDL/' + ev.key + '/checked/').set(ev.checked);
  }

  deleteTask(task: any) {
    this.afDB.list('TDL/').remove(task.key);
    this.projet--;
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
