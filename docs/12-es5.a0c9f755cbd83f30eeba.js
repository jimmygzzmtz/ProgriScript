!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{TUkU:function(e,i,o){"use strict";o.r(i),o.d(i,"Tab2PageModule",(function(){return v}));var r=o("TEn/"),a=o("ofXK"),c=o("3Pt+"),s=o("qtYk"),b=o("tyNb"),u=o("fXoL");function d(n,t){if(1&n){var e=u.Lb();u.Kb(0,"ion-card",3),u.Sb("click",(function(){u.ac(e);var n=t.$implicit;return u.Ub().cardClick(n)})),u.Kb(1,"ion-card-header"),u.Kb(2,"ion-card-title"),u.fc(3),u.Jb(),u.Jb(),u.Kb(4,"ion-card-content"),u.Kb(5,"p"),u.fc(6),u.Jb(),u.Jb(),u.Jb()}if(2&n){var i=t.$implicit;u.xb(3),u.gc(i.name),u.xb(3),u.gc(i.description)}}var f,p,l,m=[{path:"",component:(f=function(){function e(t){n(this,e),this.router=t,this.codeSnippets=[],this.templateCode=["int test = 1;",'string test = "lol";',"for (int i = 0; i < 10; i++){};"],this.fillSnippets()}var i,o,r;return i=e,(o=[{key:"cardClick",value:function(n){this.router.navigate(["/tabs/tab1"],{state:{template:n.code}})}},{key:"fillSnippets",value:function(){this.codeSnippets=[{name:"Date Types",description:"Use different data types depending on the type of the value.",code:"program test;\n      var int a;\n      float b;\n      char c;\n      \n      main ( ){\n        a = 1;\n        b = 2.5;\n        c = 'c';\n      }"},{name:"Read/Write",description:"Read and Write values to communicate with the user.",code:"program test;\n      var int a, b;\n      main ( ){\n        read(a);\n        read(b);\n        \n        write(a+b);\n      }"},{name:"If/Else",description:"Use If and Else decisions to control which code executes.",code:'program test;\n      var int a;\n      \n      main ( ){\n        a = 1;\n        \n        if(a >= 0){\n          write("positive!");\n        }\n        else{\n          write("negative!");\n        }\n        \n      }'},{name:"For/While Loops",description:"Use For or While loops to execute code until a condition is met.",code:"program test;\n      var int a, b;\n      \n      main ( ){\n        for a = 0 to 5{\n          write(a);\n        }\n        \n        b = 5;\n      \n        while(b <= 10){\n          write(b);\n          b = b + 1;\n        }\n        \n      }"},{name:"Functions",description:"Use functions to avoid repeating code.",code:"program test;\n      var int a, b;\n      \n      module int sum(int c, int d)\n      {\n        return (c + d);\n      }\n      \n      main ( ){\n        read(a);\n        read(b);\n        write(sum(a, b));\n      }"}]}}])&&t(i.prototype,o),r&&t(i,r),e}(),f.\u0275fac=function(n){return new(n||f)(u.Hb(b.g))},f.\u0275cmp=u.Bb({type:f,selectors:[["app-tab2"]],decls:6,vars:3,consts:[[3,"translucent"],[3,"fullscreen"],["button","true",3,"click",4,"ngFor","ngForOf"],["button","true",3,"click"]],template:function(n,t){1&n&&(u.Kb(0,"ion-header",0),u.Kb(1,"ion-toolbar"),u.Kb(2,"ion-title"),u.fc(3," Snippets "),u.Jb(),u.Jb(),u.Jb(),u.Kb(4,"ion-content",1),u.ec(5,d,7,2,"ion-card",2),u.Jb()),2&n&&(u.Xb("translucent",!0),u.xb(4),u.Xb("fullscreen",!0),u.xb(1),u.Xb("ngForOf",t.codeSnippets))},directives:[r.i,r.u,r.t,r.h,a.h,r.d,r.f,r.g,r.e],styles:[""]}),f)}],h=((l=function t(){n(this,t)}).\u0275mod=u.Fb({type:l}),l.\u0275inj=u.Eb({factory:function(n){return new(n||l)},imports:[[b.i.forChild(m)],b.i]}),l),v=((p=function t(){n(this,t)}).\u0275mod=u.Fb({type:p}),p.\u0275inj=u.Eb({factory:function(n){return new(n||p)},imports:[[r.v,a.b,c.a,s.a,h]]}),p)},qtYk:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));var o=i("ofXK"),r=i("3Pt+"),a=i("TEn/"),c=i("fXoL"),s=function(){var t=function t(){n(this,t)};return t.\u0275mod=c.Fb({type:t}),t.\u0275inj=c.Eb({factory:function(n){return new(n||t)},imports:[[o.b,r.a,a.v]]}),t}()}}])}();