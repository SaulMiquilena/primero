import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ViewController, PopoverController } from 'ionic-angular';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {
	public resultado:any;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  	let res = this.navParams.get("valor");
    let arr = res.split("<br/>");
    let array = [];

    for(let i=0; i<3; i++){
      let v = arr[i].split(":");
      array.push(v[1].trim());
    }

    let y = arr[3].split(":");
    let fin = y[1]+":"+y[2];
    array.push(fin.trim());

    this.resultado = array;
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage2);
    popover.present({
      ev: myEvent
    });
  }

  goBack() {
    this.navCtrl.pop().then(
      () => {
        const startIndex = this.navCtrl.getActive().index;
        this.navCtrl.remove(startIndex);
      });
  }
	
};//InicioPage

@Component({
  template: `
    <ion-list>
      <ion-list-header>Opciones</ion-list-header>
      <button ion-item (click)="goBack()">Cerrar Sesión</button>
    </ion-list>
  `
})
export class PopoverPage2 {
  constructor(public viewCtrl: ViewController, public navCtrl: NavController,) {}

  goBack() {
    this.navCtrl.push(LoginPage)
     .then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
     });
    /*this.navCtrl.pop().then(
      () => {
        const startIndex = this.navCtrl.getActive().index;
        this.navCtrl.remove(startIndex);
      });*/
  }

  close() {
    this.viewCtrl.dismiss();
  }
};//PopoverPage2