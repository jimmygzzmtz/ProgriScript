import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

declare var require: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  codeSelect: any;

  codes: any = [];

  monacoEditor = false;
  standardEditor = false;

  userAgentString = navigator.userAgent;

  codeInOut = {input: "", output: ["Code Output Will Go Here"]};

  theme = 'vs-dark';

  initialText = "program test;\n\
var int j, f;\n\
main ( ){\n\
  f = 6;\n\
  j = 5;\n\
  f = f + j - 5 * j;\n\
}\
";

  codeTextArea: any = this.initialText;
  inputTextArea: any;

  model = {
    language: 'typescript',
    uri: 'main.ts',
    value: this.initialText,
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

  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage, public alertController: AlertController) {
    this.codeSelect = "new";
    this.storage.get('codes').then((val) => {
      if (val != "[]"){
       this.codes = JSON.parse(val)
      }
    });


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
    var code = "";
    if(this.monacoEditor == false){
      code = this.model.value;
    }
    else{
      code = this.codeTextArea;
    }

    //console.log(code);
    var result = "";
    try{
      //var progriscript_jison = require("../../assets/scripts/progriscript_jison");
      //var result = JSON.stringify(progriscript_jison.parse(code));
      var progriscript_vm = require("../../assets/scripts/progriscript_vm");
      //var result = JSON.stringify(progriscript_vm.startVM(code, this.codeInOut));
      this.codeInOut.output = [];
      progriscript_vm.startVM(code, this.codeInOut);
    }
    catch(error){
      this.codeInOut.output = [error.message];
    }
    
    //this.codeInOut.output = result;
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

  async save(){
    if(this.codeSelect == "new"){

      const alert = await this.alertController.create({
        header: 'Save Code',
        inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: "Code Name"
          }
        ],
        buttons: [
          {
              text: 'Cancel'
          },
          {
              text: 'Save',
              handler: data => {
  
                var newCode = {};
  
                if (this.codes == null){
                  this.codes = [];
                }
  
                if(this.monacoEditor == false){
                  newCode = {
                    name: data.name,
                    code: this.model.value
                  };
                }
                else{
                  newCode = {
                    name: data.name,
                    code: this.codeTextArea
                  };
                  
                }
                this.codes.push(newCode);
                this.codeSelect = this.codes[this.codes.length - 1];
                this.storage.set('codes', JSON.stringify(this.codes));
              }
          }
      ]
      });
  
      await alert.present();

    }

    else{
      var newCode = {};
      if(this.monacoEditor == false){
        newCode = {
          name: this.codeSelect.name,
          code: this.model.value
        };
      }
      else{
        newCode = {
          name: this.codeSelect.name,
          code: this.codeTextArea
        };  
      }
      this.codes[this.codes.indexOf(this.codeSelect)] = newCode;
      this.codeSelect = newCode;
      this.storage.set('codes', JSON.stringify(this.codes));
    }
  }

  loadCode(){
    var CodeValue = "";

    if(this.codeSelect == "new"){
      //CodeValue = 'write "Hello World!"';
    }
    else{
      CodeValue = this.codeSelect.code;
    }
  
    if(this.monacoEditor == false){
      this.model = {
        language: 'typescript',
        uri: 'main.ts',
        value: CodeValue,
      }
    }
    else{
      this.codeTextArea = CodeValue;
    }
  }

  delete(){
    if(this.codeSelect != "new"){
      if(this.monacoEditor == false){
        this.model = {
          language: 'typescript',
          uri: 'main.ts',
          value: 'write "Hello World!"',
        };
      }
      else{
        this.codeTextArea = 'write "Hello World!"';
      }

      this.codes.splice(this.codes.indexOf(this.codeSelect),1)
      this.codeSelect = "new";
      this.storage.set('codes', JSON.stringify(this.codes));
    }
  }
  
  enterInput(){
    console.log("enter input: " + this.inputTextArea);
    console.log(this.codeInOut.output);
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
