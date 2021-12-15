import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthService {
  public currentUser!: firebase.User | null;

  constructor(private _fireAuth: AngularFireAuth) {}

  public isUserLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      return this._fireAuth.onAuthStateChanged((user) => {
        resolve(!!user);
      });
    });
  }

  public login(email: string, password: string): Promise<UserCredential> {
    return this._fireAuth.signInWithEmailAndPassword(email, password);
  }

  public signOut(): Promise<void> {
    return this._fireAuth.signOut();
  }

  public register(email: string, password: string): Promise<UserCredential> {
    return this._fireAuth.createUserWithEmailAndPassword(email, password);
  }
}
