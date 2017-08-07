import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { ViewController, PopoverController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
  constructor(
  	public navCtrl: NavController, 
  	public popoverCtrl: PopoverController
  ) { }

	irLogin() {
		this.navCtrl.push(LoginPage);
	}

	presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

};//HomePage

@Component({
  template: `
  	<ion-list>
      <ion-list-header>Opciones</ion-list-header>
      <button ion-item (click)="irLogin()">Ir a Login</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController, public navCtrl: NavController,) {}

  irLogin() {
  	this.close();
		this.navCtrl.push(LoginPage);
	}

  close() {
    this.viewCtrl.dismiss();
  }
};//PopoverPage