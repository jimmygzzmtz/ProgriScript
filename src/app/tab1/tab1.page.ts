import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  codeOutput = "Code Output Will Go Here";

  monacoEditor = false;
  standardEditor = false;

  userAgentString = navigator.userAgent;

  theme = 'vs-dark';

  codeTextArea: any = 'write "Hello World!"';

  model = {
    language: 'typescript',
    uri: 'main.ts',
    value: 'write "Hello World!"',
  };

  options = {
    lineNumbers: true,
    minimap: {
      enabled: false,
    },
    automaticLayout: true,
  };

  onCodeChanged(value) {
    
  }

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        if(this.monacoEditor == false){
          this.model = {
            language: 'typescript',
            uri: 'main.ts',
            value: this.router.getCurrentNavigation().extras.state.template,
          }
        }
        else{
            this.codeTextArea = this.router.getCurrentNavigation().extras.state.template;
        }
      }
    });
  }

  run(){
    //console.log(this.model.value);
    this.codeOutput = "Code Output";
  }

  share(){
    var codeValShare = "";
    if(this.monacoEditor == false){
      codeValShare = this.model.value;
    }
    else{
      codeValShare = this.codeTextArea;
    }

    let newNavigator: any;
      newNavigator = window.navigator;

      if (newNavigator && newNavigator.share) {
        newNavigator.share({
          title: "ProgriScript Code",
          text: codeValShare,
        })
      } else {
        let listener = (e: ClipboardEvent) => {
          e.clipboardData.setData('text/plain', codeValShare);
          e.preventDefault();
        };
    }
  }

  ionViewWillEnter(){
    if(this.userAgentString.includes("Android")){
      this.monacoEditor = true;
    }
    else{
      this.standardEditor = true;
    }
    
  }

}
