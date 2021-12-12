import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthService {
  public currentUser!: firebase.User | null;

  constructor(private _fireAuth: AngularFireAuth) {}

  public isUserLoggedIn$(): Observable<firebase.User | null> {
    const status = new BehaviorSubject(this.currentUser);
    this._fireAuth
      .onAuthStateChanged((user) => {
        status.next(!!user ? user : null);
      })
      .then();
    return status.asObservable();
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
