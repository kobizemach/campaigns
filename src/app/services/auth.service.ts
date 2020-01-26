import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  constructor(
    private afAuth:AngularFireAuth, 
    private router: Router) { }


  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):Promise<boolean>{
    return new Promise( (resolve,reject) => {
      this.afAuth.auth.onAuthStateChanged(function(user) {
        if (user) {
          resolve( true )
        } else {
          resolve(false)
        }
        
      });
   })
  }

  login( email:string , password:string ){
    this.afAuth.auth.signInWithEmailAndPassword( email, password )
    .catch(error =>{
      this.eventAuthError.next(error);
    })
    .then(userCredential => {
      if(userCredential){
        this.router.navigate(['main']);
      }
    });
  }

  logout(){
    return this.afAuth.auth.signOut();
  }

  checkIfConnected():Promise<boolean>{
  return new Promise( (resolve,reject) => {
    this.afAuth.auth.onAuthStateChanged(function(user) {
      if (user) {
        resolve( true )
      } else {
        resolve( false )
      }
    });
  })
   
  }

  getUserState(){
    return this.afAuth.authState;
  }
}
