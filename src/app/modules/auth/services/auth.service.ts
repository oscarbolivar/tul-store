import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  constructor(private _auth: AngularFireAuth) {}

  public login(email: string, password: string): Promise<any> {
    return this._auth.signInWithEmailAndPassword(email, password);
  }
}
