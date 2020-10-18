import { Component } from '@angular/core';
import { Router, NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private router: Router) {}

  templateCode = ['int test = 1;', 'string test = "lol";', 'for (int i = 0; i < 10; i++){};'];

  cardClick(pos){
    let navigationExtras: NavigationExtras = {
      state: {
        template: this.templateCode[pos],
      }
    };
    this.router.navigate(['/tabs/tab1'], navigationExtras);
  }

}
