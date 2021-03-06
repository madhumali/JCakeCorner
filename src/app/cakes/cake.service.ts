import {Cake} from './cake.model';
import { EventEmitter, Injectable } from '../../../node_modules/@angular/core';
import { Feature } from '../shared/feature.model';
import { Subject } from '../../../node_modules/rxjs';
import {map} from 'rxjs/operators';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({providedIn:'root'})
export class CakeService{
    cakeSelected=new EventEmitter<Cake>();
    cakesChanged=new Subject<Cake[]>();
    private cakes:Cake[]=[];
    private cake:Cake;
    
        //  new Cake('Test Cake','birthday',1200,'https://www.logolynx.com/images/logolynx/82/829ba7822e43ebe89394d1ecbbf152b7.jpeg','This is some test description bjdjbxhbxh ',[new Feature('bhghg'),new Feature('bhhh')]),
        //  new Cake('Test Cake','birthday',1200,'http://www.betterlifeomaha.com/wp-content/uploads/2018/04/wonderful-design-cake-for-birthday-round-chocolate.jpg','This is some test description bjdjbxhbxh ',[new Feature('hghgg')])
      //];

      constructor( private http:HttpClient){}
      getCakes(){
          this.http.get<{message:string,cakes:any}>('http://localhost:3000/api/cakes')
          .pipe(
            map((cakeData)=>{
              return cakeData.cakes.map(cake=>{
                return {
                  id:cake._id,
                  name:cake.name,
                  category:cake.category,
                  price:cake.price,
                  imagePath:cake.imagePath,
                  description:cake.description,
                  features:cake.features
                };
              });
            })
          )
          .subscribe((transformedCakes)=>{
            this.cakes=transformedCakes;
            this.cakesChanged.next([...this.cakes]);
          });
         // return this.cakes.slice();
      }
getCake1(id:string){
  return this.http.get<{_id:string,name:string,category:string,price:number,imagePath:string,description:string,features:Feature[]}>("http://localhost:3000/api/cakes/"+id);
        
  }

  getCake(id:string){
    this.cakesChanged.subscribe((cakes:Cake[])=>{
      this.cakes=cakes;
    });
    return {...this.cakes.find(c=>c.id===id)};
  }
     
      // getCake(id:string){
      //   return {...this.cakes.find(c=>c.id===id)}
      // }

      // addCake(cake:Cake){
      //     this.cakes.push(cake);
      //     this.cakesChanged.next(this.cakes.slice());
      // }
      addCake(cake:Cake){
        this.http.post<{message:string,cakeId:string}>(
          "http://localhost:3000/api/cakes/",cake
        )
        .subscribe(responseData=>{
          const id=responseData.cakeId ;
          cake.id=id;
          this.cakes.push(cake);
          this.cakesChanged.next([...this.cakes]);
        });
      }
      // updateCake(index:number,newCake:Cake){
      //     this.cakes[index]=newCake;
      //     this.cakesChanged.next(this.cakes.slice());
      // }
      updateCake(id:string,newCake:Cake){
        this.http.put("http://localhost:3000/api/cakes/"+id,newCake)
        .subscribe(response=>{
          const updatedCakes=[...this.cakes];
          const oldCakeIndex=updatedCakes.findIndex(c=>c.id===id);
          updatedCakes[oldCakeIndex]=newCake;
          this.cakes=updatedCakes;
          this.cakesChanged.next([...this.cakes]);
        });
      }
      // deleteCake(index:number){
      //   this.cakes.splice(index,1);
      //   this.cakesChanged.next(this.cakes.slice());
      // }

      deleteCake(cakeId:String){
        this.http.delete("http://localhost:3000/api/cakes/"+cakeId)
        .subscribe((response)=>{
          console.log(response);
          const updatedCakes=this.cakes.filter(cake=>cake.id !== cakeId);
          this.cakes=updatedCakes;
          this.cakesChanged.next([...this.cakes]);
          console.log('deleted');
        });
      }
}