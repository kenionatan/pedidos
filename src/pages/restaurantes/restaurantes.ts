import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Restaurante } from '../../domain/restaurante/restaurante';
import { Http } from '@angular/http';

@Component({
  selector: 'page-restaurantes',
  templateUrl: 'restaurantes.html'
})
export class RestaurantesPage {

  public restaurantes: Restaurante[];
  constructor(public navCtrl: NavController, 
              private _http: Http, 
              private _loadingCtrl: LoadingController,
              private _alertCtrl: AlertController  ) {}

  ngOnInit(){
    let loader = this._loadingCtrl.create({
      content: 'Listando restaurantes, Aguarde...'
    });
    loader.present();
    this
      ._http.get('http://kenio.top/api_restaurantes/restaurante/get_restaurante/')
      .map(res => res.json())
      .toPromise()
      .then(restaurantes => {
        this.restaurantes = restaurantes;
        loader.dismiss();
      })
      .catch(err => {
        console.log(err);
        this._alertCtrl
        .create({
          title: 'Falha na conexão',
          buttons: [{ text: 'Estou Ciente' }],
          subTitle: 'Não foi possível obter a lista de restaurantes. Tente Novamente'
        }).present();
      });
  }
  
  seleciona(restaurante){
    console.log('Entrou na  Action');
  }
  
}
