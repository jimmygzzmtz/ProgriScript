!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{tmrb:function(n,o,r){"use strict";r.r(o),r.d(o,"Tab1PageModule",(function(){return m}));var i,a,c,b=r("TEn/"),u=r("ofXK"),d=r("3Pt+"),s=r("qtYk"),l=r("tyNb"),h=r("fXoL"),p=r("KjtJ"),f=[{path:"",component:(i=function(){function n(e,o){var r=this;t(this,n),this.route=e,this.router=o,this.codeOutput="Code Output Will Go Here",this.monacoEditor=!1,this.standardEditor=!1,this.userAgentString=navigator.userAgent,this.theme="vs-dark",this.model={language:"typescript",uri:"main.ts",value:"hello world"},this.options={lineNumbers:!0,minimap:{enabled:!1},automaticLayout:!0},this.route.queryParams.subscribe((function(t){r.router.getCurrentNavigation().extras.state&&(0==r.monacoEditor?r.model={language:"typescript",uri:"main.ts",value:r.router.getCurrentNavigation().extras.state.template}:r.codeTextArea=r.router.getCurrentNavigation().extras.state.template)}))}var o,r,i;return o=n,(r=[{key:"onCodeChanged",value:function(t){}},{key:"run",value:function(){this.codeOutput="Code Output"}},{key:"share",value:function(){var t;(t=window.navigator)&&t.share&&t.share({title:"ProgriScript Code",text:0==this.monacoEditor?this.model.value:this.codeTextArea})}},{key:"ionViewWillEnter",value:function(){this.userAgentString.includes("Android")?this.monacoEditor=!0:this.standardEditor=!0}}])&&e(o.prototype,r),i&&e(o,i),n}(),i.\u0275fac=function(t){return new(t||i)(h.Hb(l.a),h.Hb(l.g))},i.\u0275cmp=h.Bb({type:i,selectors:[["app-tab1"]],decls:32,vars:9,consts:[[3,"translucent"],[3,"fullscreen"],[3,"hidden"],[3,"theme","codeModel","options","valueChanged"],["slot","end",3,"click"],["rows","15","cols","10","id","textArea","placeholder","Type Code Here",3,"ngModel","ngModelChange"]],template:function(t,e){1&t&&(h.Kb(0,"ion-header",0),h.Kb(1,"ion-toolbar"),h.Kb(2,"ion-title"),h.bc(3," Run "),h.Jb(),h.Jb(),h.Jb(),h.Kb(4,"ion-content",1),h.Kb(5,"ion-card",2),h.Kb(6,"ion-card-header"),h.Kb(7,"ion-card-title"),h.bc(8,"Code"),h.Jb(),h.Jb(),h.Kb(9,"ion-card-content"),h.Kb(10,"ngs-code-editor",3),h.Rb("valueChanged",(function(t){return e.onCodeChanged(t)})),h.Jb(),h.Kb(11,"ion-button",4),h.Rb("click",(function(){return e.run()})),h.bc(12,"Run"),h.Jb(),h.Kb(13,"ion-button",4),h.Rb("click",(function(){return e.share()})),h.bc(14,"Share"),h.Jb(),h.Jb(),h.Jb(),h.Kb(15,"ion-card",2),h.Kb(16,"ion-card-header"),h.Kb(17,"ion-card-title"),h.bc(18,"Code"),h.Jb(),h.Jb(),h.Kb(19,"ion-card-content"),h.Kb(20,"ion-textarea",5),h.Rb("ngModelChange",(function(t){return e.codeTextArea=t})),h.Jb(),h.Kb(21,"ion-button",4),h.Rb("click",(function(){return e.run()})),h.bc(22,"Run"),h.Jb(),h.Kb(23,"ion-button",4),h.Rb("click",(function(){return e.share()})),h.bc(24,"Share"),h.Jb(),h.Jb(),h.Jb(),h.Kb(25,"ion-card"),h.Kb(26,"ion-card-header"),h.Kb(27,"ion-card-title"),h.bc(28,"Output"),h.Jb(),h.Jb(),h.Kb(29,"ion-card-content"),h.Kb(30,"p"),h.bc(31),h.Jb(),h.Jb(),h.Jb(),h.Jb()),2&t&&(h.Vb("translucent",!0),h.xb(4),h.Vb("fullscreen",!0),h.xb(1),h.Vb("hidden",e.monacoEditor),h.xb(5),h.Vb("theme",e.theme)("codeModel",e.model)("options",e.options),h.xb(5),h.Vb("hidden",e.standardEditor),h.xb(5),h.Vb("ngModel",e.codeTextArea),h.xb(11),h.cc(e.codeOutput))},directives:[b.i,b.s,b.r,b.h,b.c,b.e,b.g,b.d,p.a,b.b,b.q,b.w,d.d,d.e],styles:[""]}),i)}],g=((c=function e(){t(this,e)}).\u0275mod=h.Fb({type:c}),c.\u0275inj=h.Eb({factory:function(t){return new(t||c)},imports:[[l.i.forChild(f)],l.i]}),c),m=((a=function e(){t(this,e)}).\u0275mod=h.Fb({type:a}),a.\u0275inj=h.Eb({factory:function(t){return new(t||a)},imports:[[b.t,u.b,d.a,s.a,g,p.b]]}),a)}}])}();