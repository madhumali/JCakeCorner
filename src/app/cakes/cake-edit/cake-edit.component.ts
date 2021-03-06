import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '../../../../node_modules/@angular/forms';
import { CakeService } from '../cake.service';
import { Cake } from '../cake.model';

@Component({
  selector: 'app-cake-edit',
  templateUrl: './cake-edit.component.html',
  styleUrls: ['./cake-edit.component.css']
})
export class CakeEditComponent implements OnInit {
  id:string;
  editMode=false;
  cakeForm:FormGroup;
  constructor(private route:ActivatedRoute,private cakeService:CakeService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = params['id'];
        this.editMode=params['id']!=null;
        this.initForm();
      }
    );
  }
  onSubmit(){
     const newCake=new Cake(this.id,this.cakeForm.value['name'],this.cakeForm.value['category'],1200,this.cakeForm.value['imagePath'],this.cakeForm.value['description'],this.cakeForm.value['features']);
  // const newCake=new Cake(this.cakeForm.value['name'],this.cakeForm.value['category'],'',this.cakeForm.value['imagePath'],this.cakeForm.value['description'],'');
    if(this.editMode){
      this.cakeService.updateCake(this.id,newCake);
    }else{
      this.cakeService.addCake(newCake);
    }
    this.onCancel();
  }

  onDeleteFeature(index:number){
    (<FormArray>this.cakeForm.get('features')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  private initForm(){
    let cakeName='';
    let cakeImagePath='';
    let cakeDescription='';
    let cakeCategory='';
    let cakePrice;
    let cakeFeatures=new FormArray([]);
    if(this.editMode){
      // const cake=this.cakeService.getCake(this.id);
      // cakeId=cake.id;
      // cakeName=cake.name;
      // cakeImagePath=cake.imagePath;
      // cakeDescription=cake.description;
      // cakeCategory=cake.category;


     // this.cakeService.getCake(this.id)
      //this.cakeService.cakeSelected.subscribe((cakeData:Cake)=>{
        const cake=this.cakeService.getCake(this.id);
        // this.cakeService.cakeSelected.subscribe(cakeData=>{
        //   const cake={id:cakeData._id,name:cakeData.name,category:cakeData.category,price:cakeData.price,imagePath:cakeData.imagePath,description:cakeData.description,features:cakeData.features};
         
          cakeName=cake.name;
          cakeImagePath=cake.imagePath;
          cakeDescription=cake.description;
          cakeCategory=cake.category;
          cakePrice=cake.price;
  
          if(cake['features']){
            for(let feature of cake.features){
              cakeFeatures.push(
                new FormGroup({
                  'feature':new FormControl(feature,Validators.required)
                })
              );
            }
          }
        
     //   });
      
     // }
     
     // );
   
    }
  
    this.cakeForm=new FormGroup({
      'name':new FormControl(cakeName,Validators.required),
      'imagePath':new FormControl(cakeImagePath,Validators.required),
      'description':new FormControl(cakeDescription,Validators.required),
      'category':new FormControl(cakeCategory,Validators.required),
      'price':new FormControl(cakePrice,Validators.required),
      'features':cakeFeatures
    });
    
  }

  onAddFeature(){
    (<FormArray>this.cakeForm.get('features')).push(
      new FormGroup({
        'feature':new FormControl(null,Validators.required)
      })
    );
  }

}
