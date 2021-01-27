import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interface/usuario';
import { tap, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'https://asknow-dfc50-default-rtdb.europe-west1.firebasedatabase.app/';

  private itemsCollection:AngularFirestoreCollection<User>;
  public users:User[] = [];
  public user:User = {};
  public usuario:User = {};
  id:string;

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth, private route: Router, private http:HttpClient ) {
    
  }

  getUsuarioById(id:string){

    return this.http.get(this.url + 'users/'+id+'.json');

    
  }

  // cargarUsuarios(){
  //   this.itemsCollection = this.afs.collection<User>('users');
  //   return this.itemsCollection.valueChanges().pipe(
  //     map((users:User[])=>{

  //       for (let user of users){
  //         this.users.push(user);
  //       }

  //       return this.users;
  //     })
  //   )
  // }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    
    this.auth.authState.subscribe(user => {
      console.log('Estado del usuario: ', user);
      if(!user){
        return;
      }

      this.usuario.displayName = user.displayName;
      this.usuario.uid = user.uid;
      this.id = user.uid;
      localStorage.setItem('sessionId',this.id);

      this.crearUsuario(this.usuario);

      this.route.navigate(['home']);
      location.reload();
    })

    
    
    
  }

  crearUsuario(user:User){

    this.http.post(this.url+'/users.json',user).pipe(
      map((resp:any)=>{
        user.uid = resp.name;
        return user;
      })
    );
  }
  logout() {
    this.usuario = {}
    this.auth.signOut();
    localStorage.removeItem('sessionId');
    this.route.navigate(['']);
    setTimeout( () =>{

      location.reload();
    },20)
    
  }
}
