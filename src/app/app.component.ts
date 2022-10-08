import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularfirebase';
    courses: Observable<any[]>;
  listcourses: any[]=[];
  constructor(private db: AngularFireDatabase){
   this.courses= db.list('voiture').snapshotChanges().pipe( map(actions => {
     return actions.map(a => {
  
      const key = a.payload.key;
      const data = a.payload.val();
      return ({key:key,data:data});
    })
  }
    ))
 
    };
    add(voiture: any){
     this.db.list('voiture').push(voiture.value);
     voiture.value="";
    }
    modif(key: any,value: any){
      this.db.list('voiture').update(key,{
        balance: value});
    }
    delete(key: any){
      this.db.list('voiture').remove(key);
    }
  }

