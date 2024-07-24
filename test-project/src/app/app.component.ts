import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from '../model/user';
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserProfileComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-project';
  users = [
    {
      name:"ramesh",salary:10000
    }, {
      name:"ramesh33",salary:109000
    }, {
      name:"ramesh3322",salary:1090900
    },
  
  ]
  receiveData(e:User){
    console.log(e)
  }
}
