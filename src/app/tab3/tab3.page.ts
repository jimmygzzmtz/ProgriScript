import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private storage: Storage, public alertController: AlertController) {}

  share(){
    let newNavigator: any;
      newNavigator = window.navigator;

      if (newNavigator && newNavigator.share) {
        newNavigator.share({
          title: "ProgriScript",
          text: "https://jimmygzzmtz.github.io/ProgriScript/",
        })
      } else {
        let listener = (e: ClipboardEvent) => {
          e.clipboardData.setData('text/plain', "https://jimmygzzmtz.github.io/ProgriScript/");
          e.preventDefault();
        };
    }
  }

  async clearStorage() {
    const alert = await this.alertController.create({
      header: "Clear Storage",
      message: "This will delete all the saved code",
      buttons: [
        {
            text: 'Cancel'
        },
        {
            text: 'OK',
            handler: async data => {
              await this.storage.clear()
              location.reload()
            }
        }
    ]
    });

    await alert.present();
  }

  async installPrompt(){
    const alert = await this.alertController.create({
      header: "How to Install",
      message: "<ion-icon name='logo-apple'></ion-icon> Tap on <ion-icon name='share'></ion-icon>, then 'Add to Homescreen'.<br><br>\
      <ion-icon name='logo-android'></ion-icon> Tap on <ion-icon name='menu'></ion-icon>, then 'Add to Homescreen'.<br><br>\
      <ion-icon name='logo-chrome'></ion-icon><ion-icon name='logo-edge'></ion-icon> Click on <ion-icon name='add'></ion-icon> on the address bar.",
      buttons: [
        {
            text: 'OK'
        }
    ]
    });

    await alert.present();
  }

}
