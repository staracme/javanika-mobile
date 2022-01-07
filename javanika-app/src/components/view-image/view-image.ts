  import { Component } from '@angular/core';

/**
 * Generated class for the ViewImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'view-image',
  templateUrl: 'view-image.html'
})
export class ViewImageComponent {

  text: string;

  constructor() {
    console.log('Hello ViewImageComponent Component');
    this.text = 'Hello World';
  }

}
