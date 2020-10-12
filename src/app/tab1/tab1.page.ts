import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  theme = 'vs-dark';

  model = {
    language: 'typescript',
    uri: 'main.ts',
    value: '{}',
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

  codeTextArea: any;

  constructor() {}

  run(){
    console.log("compile code");
  }

}