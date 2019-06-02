import {Component} from '@angular/core';

@Component({
    selector: 'app-admindash',
    templateUrl: './adminDash.component.html',
    styleUrls: ['./adminDash.component.css']
  })
  export class AdminDashComponent {
      loadedAction1='cakes';
      loadedAction2='users';
      onNavigate(action:string){
          if(this.loadedAction1)
            this.loadedAction1=action;
          else
            this.loadedAction2=action;
      }

    
      
   
  }
  