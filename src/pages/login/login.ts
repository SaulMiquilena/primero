import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { InicioPage } from '../inicio/inicio';
import { RestfulServiceProvider } from '../../providers/restful-service/restful-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [RestfulServiceProvider]
})
export class LoginPage {
	usuario:any;
	contrasenna:any;
	restful: any;
	loader:any;

  constructor(
	  	public navCtrl: NavController, 
	  	public loadingCtrl: LoadingController, 
	  	public alertCtrl: AlertController,
	  	public viewCtrl: ViewController,
	  	public restfulService: RestfulServiceProvider
  	) { }

  ionViewWillEnter() {
  	this.usuario = "";
  	this.contrasenna = "";
  	this.restful = "";
  }

	presentLoading() {
	  this.loader = this.loadingCtrl.create({
	    content: "Por favor espere...",
	    duration: 10000
	  });
	  this.loader.present();	  
	  this.consultaUsuario();   
	}

	consultaUsuario() {
		let vUsuario = this.usuario;
		let vContrasenna = this.contrasenna;
		
		if(vUsuario != "" && vContrasenna != ""){
			this.restfulService.load(vUsuario,vContrasenna)
		  .then(data => {
		    this.restful = data;

		    if(this.restful == "error"){
		  		this.usuario = "";
		  		this.contrasenna = "";
  				this.restful = "";
		  		this.loader.dismiss();
					this.conexAlert();  	
		    } else if(this.restful == "No existe el usuario"){
		  		this.usuario = "";
		  		this.contrasenna = "";
  				this.restful = "";
		  		this.loader.dismiss();
					this.showAlert();  	
		    } else {
		    	if(this.restful != null){
			    	this.loader.dismiss();
			    	this.irInicio(this.restful);
			    } else {
			    	this.loader.dismiss();
			    	this.showAlert();
			    }
		    }

		  });	
		} else {
			this.loader.dismiss();
			this.showAlert();
		}		
	}

	showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error al Iniciar Sesión!',
      buttons: ['OK']
    });
    alert.present();
    this.refreshPage();
  }

  conexAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error Conexión!',
      buttons: ['OK']
    });
    alert.present();
    this.refreshPage();
  }

	goBack() {
     this.navCtrl.push(HomePage)
     .then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
     });
  }

  refreshPage() {
    this.navCtrl.push(HomePage);
  }

  limpiar() {
  	this.usuario = "";
  	this.contrasenna = "";
  	this.restful = "";
  }

	irInicio(resultado) {
		let datos = {
			valor: resultado
		}
		this.navCtrl.push(InicioPage, datos);
	}

};//LoginPage