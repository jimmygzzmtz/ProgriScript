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
      {name: "Date Types", description: "Use different data types depending on the type of the value.", code: "program dataTypes;\n\
      var int a;\n\
      float b;\n\
      char c;\n\
      \n\
      main ( ){\n\
        a = 1;\n\
        b = 2.5;\n\
        c = 'c';\n\
      }"},
      {name: "Read/Write", description: "Read and Write values to communicate with the user.", code: "program readWrite;\n\
      var int a, b;\n\
      main ( ){\n\
        read(a);\n\
        read(b);\n\
        \n\
        write(a+b);\n\
      }"},
      {name: "If/Else", description: "Use If and Else decisions to control which code executes.", code: 'program ifElse;\n\
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
      {name: "For/While Loops", description: "Use For or While loops to execute code until a condition is met.", code: "program forWhile;\n\
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
      {name: "Functions", description: "Use functions to avoid repeating code.", code: "program functions;\n\
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
      {name: "1D Arrays", description: "A way to store more than one value in a data type.", code: "program arrays1D;\n\
      var int a[5];\n\
      \n\
      main ( ){\n\
          a[3] = (9/3);\n\
          a[2] = (6*3);\n\
          write(a[3] + a[2]);\n\
      }"},
      {name: "2D Arrays", description: "A way to store more than one value per row in a data type.", code: "program arrays2D;\n\
      var int a[5][5];\n\
      \n\
      main ( ){\n\
          a[3][2] = 1;\n\
          a[2][1] = (6*3);\n\
          write(a[3][2] + a[2][1] + 1);\n\
      }"},
      {name: "Iterative Factorial", description: "An iterative way to obtain the factorial of a number.", code: 'program iterativeFactorial;\n\
      var int n, fact, i;\n\
      \n\
      main ( ){\n\
        write("Enter a positive integer: ");\n\
        read(n);\n\
        fact = 1;\n\
        i = 1;\n\
        for i = 1 to (n+1){\n\
          fact = fact * i;\n\
        }\n\
        write(fact);\n\
      }'},
      {name: "Iterative Fibonacci", description: "An iterative way to obtain the fibonacci series.", code: 'program iterativeFibonacci;\n\
      var int n;\n\
      \n\
      function void fib(int num)\n\
      var int x, y, z, i;\n\
      {\n\
        x = 0;\n\
        y = 1;\n\
        z = 0;\n\
        for i = 0 to num{\n\
            write(x);\n\
            z = x + y;\n\
            x = y;\n\
            y = z;\n\
        }\n\
      }\n\
      \n\
      main ( ){\n\
        write("Enter fibonacci series");\n\
        read(n);\n\
        fib(n);\n\
      }'},
      {name: "Recursive Factorial", description: "A recursive way to obtain the factorial of a number.", code: 'program recursiveFactorial;\n\
      var int n;\n\
      \n\
      function int factorial(int f)\n\
      {\n\
        if(f > 1){\n\
            return (f * factorial(f - 1));\n\
        }\n\
        else{\n\
            return (1);\n\
        }\n\
      }\n\
      \n\
      main ( ){\n\
        write("Enter a positive integer: ");\n\
        read(n);\n\
        write(factorial(n));\n\
      }'},
      {name: "Recursive Fibonacci", description: "A recursive way to obtain the fibonacci series.", code: 'program recursiveFibonacci;\n\
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
        write("Fibonacci Series : ");\n\
        while(i < a) {\n\
            write (fibonacci(i));\n\
            i = i + 1;\n\
        }\n\
      }'},
      {name: "Find", description: "Find and print a number inside an array.", code: 'program findNum;\n\
      var int a[5], z;\n\
      \n\
      function int find(int num)\n\
      var int i;\n\
      {\n\
        for i = 0 to 5{\n\
          if(a[i] == num){\n\
            return (i);\n\
          }\n\
        }\n\
        \n\
        return (-1);\n\
      }\n\
      \n\
      main ( ){\n\
        a[0] = 5;\n\
        a[1] = 15;\n\
        a[2] = 13;\n\
        a[3] = 83;\n\
        a[4] = 73;\n\
        \n\
        write("Which number are you searching for?");\n\
        read(z);\n\
        write("The position of that number is:", find(z));\n\
      }'},
      {name: "Sort", description: "Sort and print an array filled with numbers.", code: 'program sortArr;\n\
      var int a[5], i;\n\
      \n\
      function void sort()\n\
      var int i, j, n, temp;\n\
      {\n\
        n = 5;\n\
        for i = 0 to n - 1{\n\
          for j = 0 to n - i - 1{\n\
            if(a[j] > a[j + 1]){\n\
              temp = a[j];\n\
              a[j] = a[j+1];\n\
              a[j+1] = temp;\n\
            }\n\
          }\n\
        }\n\
      }\n\
      \n\
      main ( ){\n\
        a[0] = 73;\n\
        a[1] = 83;\n\
        a[2] = 13;\n\
        a[3] = 5;\n\
        a[4] = 15;\n\
        \n\
        sort();\n\
        for i = 0 to 5{\n\
          write(a[i]);\n\
        }\n\
      }'},
      {name: "Multiply Matrix", description: "Multiply every element in a matrix by a given integer.", code: 'program multMatrix;\n\
      var int a[2][2], i, j, n, n2, z;\n\
      \n\
      function void mult(int factor)\n\
      var int i, j;\n\
      {\n\
        for i = 0 to n{\n\
          for j = 0 to n2{\n\
            a[i][j] = a[i][j] * factor;\n\
          }\n\
        }\n\
      }\n\
      \n\
      main ( ){\n\
        a[0][0] = 1;\n\
        a[0][1] = 2;\n\
        a[1][0] = 3;\n\
        a[1][1] = 4;\n\
        \n\
        n = 2;\n\
        n2 = 2;\n\
        \n\
        write("What is the integer to multiply the matrix by?");\n\
        read(z);\n\
        \n\
        mult(z);\n\
        for i = 0 to n{\n\
          for j = 0 to n2{\n\
            write(a[i][j]);\n\
          }\n\
        }\n\
      }'},
    ]
  }

}
