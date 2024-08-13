import { Component, Inject, Input } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Spinkit } from './spinkits';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
 // public props
 isSpinnerVisible = true;
 Spinkit = Spinkit;
 @Input() backgroundColor = '#1890ff';
 @Input() spinner = Spinkit.skLine;

 // Constructor
 constructor(
   private router: Router,
   @Inject(DOCUMENT) private document: Document
 ) {
   this.router.events.subscribe(
     (event) => {
       if (event instanceof NavigationStart) {
         this.isSpinnerVisible = true;
       } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
         this.isSpinnerVisible = false;
       }
     },
     () => {
       this.isSpinnerVisible = false;
     }
   );
 }

 // life cycle event
 ngOnDestroy(): void {
   this.isSpinnerVisible = false;
 }
}
