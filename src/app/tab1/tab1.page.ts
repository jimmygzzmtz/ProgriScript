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

  codeInOut = {input: "", output: [""]};

  theme;

  progriscript_vm;

  initialText = 'program helloWorld;\n\
main ( ){\n\
  write("Hello World!");\n\
}\
';

  codeTextArea: any = this.initialText;

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

  // When the application loads, get the current theme, 
  // and add a listener to change the theme if the OS theme changes
  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addListener((e) => this.changeTheme(e.matches));
    this.changeTheme(prefersDark.matches)
  }

  // If the OS theme changes, change the application theme
  changeTheme(shouldChange) {
    if(shouldChange){
      this.theme = "vs-dark";
    }
    else{
      this.theme = "vs-light";
    }
  }

  // When the application loads for the first time, load the list of saved codes
  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage, public alertController: AlertController) {
    this.codeSelect = "new";
    this.storage.get('codes').then((val) => {
      if (val != "[]"){
       this.codes = JSON.parse(val)
      }
    });


    // If the page is loaded from a snippet, load the snippet code
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

  // When clicking the run button, send the written code to the VM
  run(){
    var code = "";
    if(this.monacoEditor == false){
      code = this.model.value;
    }
    else{
      code = this.codeTextArea;
    }

    try{
      this.progriscript_vm = require("../../assets/scripts/progriscript_vm");
      this.codeInOut.output = [];
      this.progriscript_vm.startVM(code, this.codeInOut);
      if(this.codeInOut.input == "willRead"){
        this.sendRead();
      }
    }
    catch(error){
      this.codeInOut.output = [error.message];
    }
    
  }

  // When clicking the share button, use the WebShareAPI to share the written code
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

  // Save the current code using a user-written name
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

                if(data.name == ""){
                  return false;
                }
  
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

  // Load the selected code to the text area
  loadCode(){
    var CodeValue = "";

    if(this.codeSelect == "new"){
      return;
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

  // Delete the current code
  delete(){
    if(this.codeSelect != "new"){
      if(this.monacoEditor == false){
        this.model = {
          language: 'typescript',
          uri: 'main.ts',
          value: this.initialText,
        };
      }
      else{
        this.codeTextArea = this.initialText;
      }

      this.codes.splice(this.codes.indexOf(this.codeSelect),1)
      this.codeSelect = "new";
      this.storage.set('codes', JSON.stringify(this.codes));
    }
  }

  // If the device is Android-based, use a standard Text Area
  // due to a deleting bug in Monaco Editor
  ionViewWillEnter(){
    if(this.userAgentString.includes("Android")){
      this.monacoEditor = true;
    }
    else{
      this.standardEditor = true;
    }
  }

  // If an input is expected from the vm, 
  // get it from the user and sent it back to the VM
  async sendRead(){
      const alert = await this.alertController.create({
        header: 'Enter Input',
        inputs: [
          {
            name: 'input',
            type: 'text',
            placeholder: "Input"
          }
        ],
        buttons: [
          {
            text: 'Enter',
            handler: data => {
              if(this.codeInOut.input == "willRead"){
                this.codeInOut.input = data.input;
                try{
                  this.progriscript_vm.sendRead(this.codeInOut)
                  if(this.codeInOut.input == "willRead"){
                    this.sendRead();
                  }
                }
                catch(error){
                  this.codeInOut.output = [error.message];
                }
              }
            }
          }
        ],
        backdropDismiss: false
      });


      await alert.present();
    }
}
