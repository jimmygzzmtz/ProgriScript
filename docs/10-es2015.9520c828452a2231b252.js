(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{tmrb:function(t,e,n){"use strict";n.r(e),n.d(e,"Tab1PageModule",(function(){return l}));var o=n("TEn/"),r=n("ofXK"),i=n("3Pt+"),a=n("qtYk"),b=n("tyNb"),c=n("fXoL"),d=n("KjtJ");const s=[{path:"",component:(()=>{class t{constructor(t,e){this.route=t,this.router=e,this.codeOutput="Code Output Will Go Here",this.monacoEditor=!1,this.standardEditor=!1,this.userAgentString=navigator.userAgent,this.theme="vs-dark",this.model={language:"typescript",uri:"main.ts",value:"hello world"},this.options={lineNumbers:!0,minimap:{enabled:!1},automaticLayout:!0},this.route.queryParams.subscribe(t=>{this.router.getCurrentNavigation().extras.state&&(0==this.monacoEditor?this.model={language:"typescript",uri:"main.ts",value:this.router.getCurrentNavigation().extras.state.template}:this.codeTextArea=this.router.getCurrentNavigation().extras.state.template)})}onCodeChanged(t){}run(){this.codeOutput="Code Output"}share(){let t;t=window.navigator,t&&t.share&&t.share({title:"ProgriScript Code",text:0==this.monacoEditor?this.model.value:this.codeTextArea})}ionViewWillEnter(){this.userAgentString.includes("Android")?this.monacoEditor=!0:this.standardEditor=!0}}return t.\u0275fac=function(e){return new(e||t)(c.Hb(b.a),c.Hb(b.g))},t.\u0275cmp=c.Bb({type:t,selectors:[["app-tab1"]],decls:32,vars:9,consts:[[3,"translucent"],[3,"fullscreen"],[3,"hidden"],[3,"theme","codeModel","options","valueChanged"],["slot","end",3,"click"],["rows","15","cols","10","id","textArea","placeholder","Type Code Here",3,"ngModel","ngModelChange"]],template:function(t,e){1&t&&(c.Kb(0,"ion-header",0),c.Kb(1,"ion-toolbar"),c.Kb(2,"ion-title"),c.bc(3," Run "),c.Jb(),c.Jb(),c.Jb(),c.Kb(4,"ion-content",1),c.Kb(5,"ion-card",2),c.Kb(6,"ion-card-header"),c.Kb(7,"ion-card-title"),c.bc(8,"Code"),c.Jb(),c.Jb(),c.Kb(9,"ion-card-content"),c.Kb(10,"ngs-code-editor",3),c.Rb("valueChanged",(function(t){return e.onCodeChanged(t)})),c.Jb(),c.Kb(11,"ion-button",4),c.Rb("click",(function(){return e.run()})),c.bc(12,"Run"),c.Jb(),c.Kb(13,"ion-button",4),c.Rb("click",(function(){return e.share()})),c.bc(14,"Share"),c.Jb(),c.Jb(),c.Jb(),c.Kb(15,"ion-card",2),c.Kb(16,"ion-card-header"),c.Kb(17,"ion-card-title"),c.bc(18,"Code"),c.Jb(),c.Jb(),c.Kb(19,"ion-card-content"),c.Kb(20,"ion-textarea",5),c.Rb("ngModelChange",(function(t){return e.codeTextArea=t})),c.Jb(),c.Kb(21,"ion-button",4),c.Rb("click",(function(){return e.run()})),c.bc(22,"Run"),c.Jb(),c.Kb(23,"ion-button",4),c.Rb("click",(function(){return e.share()})),c.bc(24,"Share"),c.Jb(),c.Jb(),c.Jb(),c.Kb(25,"ion-card"),c.Kb(26,"ion-card-header"),c.Kb(27,"ion-card-title"),c.bc(28,"Output"),c.Jb(),c.Jb(),c.Kb(29,"ion-card-content"),c.Kb(30,"p"),c.bc(31),c.Jb(),c.Jb(),c.Jb(),c.Jb()),2&t&&(c.Vb("translucent",!0),c.xb(4),c.Vb("fullscreen",!0),c.xb(1),c.Vb("hidden",e.monacoEditor),c.xb(5),c.Vb("theme",e.theme)("codeModel",e.model)("options",e.options),c.xb(5),c.Vb("hidden",e.standardEditor),c.xb(5),c.Vb("ngModel",e.codeTextArea),c.xb(11),c.cc(e.codeOutput))},directives:[o.i,o.s,o.r,o.h,o.c,o.e,o.g,o.d,d.a,o.b,o.q,o.w,i.d,i.e],styles:[""]}),t})()}];let u=(()=>{class t{}return t.\u0275mod=c.Fb({type:t}),t.\u0275inj=c.Eb({factory:function(e){return new(e||t)},imports:[[b.i.forChild(s)],b.i]}),t})(),l=(()=>{class t{}return t.\u0275mod=c.Fb({type:t}),t.\u0275inj=c.Eb({factory:function(e){return new(e||t)},imports:[[o.t,r.b,i.a,a.a,u,d.b]]}),t})()}}]);