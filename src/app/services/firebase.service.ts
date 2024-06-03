import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  getCategories(): Observable<any[]> {
    return this.firestore.collection('categories').valueChanges();
  }

  getProducts(): Observable<any[]> {
    return this.firestore.collection('products').valueChanges();
  }
}
