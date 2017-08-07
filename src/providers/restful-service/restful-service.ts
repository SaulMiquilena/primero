import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestfulServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestfulServiceProvider {
	data:any;

  constructor(public http: Http) {

  }

  load(user,pass) {
	  if (this.data) {
	    // already loaded data
	    return Promise.resolve(this.data);
	  }

	  // don't have the data yet
	  return new Promise(resolve => {
	    // We're using Angular HTTP provider to request the data,
	    // then on the response, it'll map the JSON data to a parsed JS object.
	    // Next, we process the data and resolve the promise with the new data.
	    this.http.get('http://localhost:8100/api/buscarusuario.php?usuario='+user+'&clave='+pass+'')
    	.map(res => (
  			res.text()
  		))
			.subscribe(
				data => {
					this.data = data;
					resolve(this.data);
				},
				err => {
					this.data = "error";
					resolve(this.data);
	        console.log("Oops!");
	    	}
			);
		});
	}
}
