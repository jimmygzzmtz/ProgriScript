import { Component } from '@angular/core';
import { Router, NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  codeSnippets = [];

  constructor(private router: Router) {
    this.fillSnippets();
  }

  templateCode = ['int test = 1;', 'string test = "lol";', 'for (int i = 0; i < 10; i++){};'];
  

  cardClick(snippet){
    let navigationExtras: NavigationExtras = {
      state: {
        template: snippet.code,
      }
    };
    this.router.navigate(['/tabs/tab1'], navigationExtras);
  }

  fillSnippets(){
    this.codeSnippets = [
      {name: "Date Types", description: "Use different data types depending on the type of the value.", code: "program snippet;\n\
      var int a;\n\
      float b;\n\
      char c;\n\
      \n\
      main ( ){\n\
        a = 1;\n\
        b = 2.5;\n\
        c = 'c';\n\
      }"},
      {name: "Read/Write", description: "Read and Write values to communicate with the user.", code: "program snippet;\n\
      var int a, b;\n\
      main ( ){\n\
        read(a);\n\
        read(b);\n\
        \n\
        write(a+b);\n\
      }"},
      {name: "If/Else", description: "Use If and Else decisions to control which code executes.", code: 'program snippet;\n\
      var int a;\n\
      \n\
      main ( ){\n\
        a = 1;\n\
        \n\
        if(a >= 0){\n\
          write("positive!");\n\
        }\n\
        else{\n\
          write("negative!");\n\
        }\n\
        \n\
      }'},
      {name: "For/While Loops", description: "Use For or While loops to execute code until a condition is met.", code: "program snippet;\n\
      var int a, b;\n\
      \n\
      main ( ){\n\
        for a = 0 to 5{\n\
          write(a);\n\
        }\n\
        \n\
        b = 5;\n\
      \n\
        while(b <= 10){\n\
          write(b);\n\
          b = b + 1;\n\
        }\n\
        \n\
      }"},
      {name: "Functions", description: "Use functions to avoid repeating code.", code: "program snippet;\n\
      var int a, b;\n\
      \n\
      function int sum(int c, int d)\n\
      {\n\
        return (c + d);\n\
      }\n\
      \n\
      main ( ){\n\
        read(a);\n\
        read(b);\n\
        write(sum(a, b));\n\
      }"},
      {name: "Fibonacci Series", description: "A more complex example using recursive functions.", code: 'program snippet;\n\
      var int a, i;\n\
      \n\
      function int fibonacci(int a)\n\
      {\n\
        if( (a == 0) || (a == 1) ) {\n\
            return(a);\n\
        }\n\
        else {\n\
            return (fibonacci(a - 1) + fibonacci(a - 2));\n\
        }\n\
      }\n\
      \n\
      main ( ){\n\
        i = 0;\n\
        write("Number of series : ");\n\
        read(a);\n\
        write("Fibonnaci Series : ");\n\
        while(i < a) {\n\
            write (fibonacci(i));\n\
            i = i + 1;\n\
        }\n\
      }'},
      
    ]
  }

}
