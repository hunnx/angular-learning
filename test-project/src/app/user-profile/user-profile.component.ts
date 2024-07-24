import { Component, EventEmitter,Output,Input } from '@angular/core';
import { User } from '../../model/user';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  @Input() name = "Hassan"
  @Input() salary = 25000;

  @Output() myEvent = new EventEmitter<User>()
  sendData(){
    this.myEvent.emit({name:this.name,newSalary:25000})
  }
}
