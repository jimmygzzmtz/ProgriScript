(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{tmrb:function(e,t,o){"use strict";o.r(t),o.d(t,"Tab1PageModule",(function(){return m}));var n=o("TEn/"),i=o("ofXK"),c=o("3Pt+"),r=o("qtYk"),s=o("e8h1"),a=o("tyNb"),d=o("mrSG"),l=o("fXoL"),b=o("KjtJ");function u(e,t){if(1&e&&(l.Kb(0,"ion-select-option",9),l.cc(1),l.Jb()),2&e){const e=t.$implicit;l.Vb("value",e),l.xb(1),l.dc(e.name)}}const h=[{path:"",component:(()=>{class e{constructor(e,t,o,n){this.route=e,this.router=t,this.storage=o,this.alertController=n,this.codes=[],this.codeOutput="Code Output Will Go Here",this.monacoEditor=!1,this.standardEditor=!1,this.userAgentString=navigator.userAgent,this.theme="vs-dark",this.codeTextArea='write "Hello World!"',this.model={language:"typescript",uri:"main.ts",value:'write "Hello World!"'},this.options={lineNumbers:!0,minimap:{enabled:!1},automaticLayout:!0},this.codeSelect="new",this.storage.get("codes").then(e=>{"[]"!=e&&(this.codes=JSON.parse(e))}),this.route.queryParams.subscribe(e=>{this.router.getCurrentNavigation().extras.state&&(0==this.monacoEditor?this.model={language:"typescript",uri:"main.ts",value:this.router.getCurrentNavigation().extras.state.template}:this.codeTextArea=this.router.getCurrentNavigation().extras.state.template)})}onCodeChanged(e){}run(){this.codeOutput="Code Output"}share(){let e;e=window.navigator,e&&e.share&&e.share({title:"ProgriScript Code",text:0==this.monacoEditor?this.model.value:this.codeTextArea})}save(){return Object(d.a)(this,void 0,void 0,(function*(){if("new"==this.codeSelect){const e=yield this.alertController.create({header:"Save Code",inputs:[{name:"name",type:"text",placeholder:"Code Name"}],buttons:[{text:"Cancel"},{text:"Save",handler:e=>{null==this.codes&&(this.codes=[]),this.codes.push(0==this.monacoEditor?{name:e.name,code:this.model.value}:{name:e.name,code:this.codeTextArea}),this.codeSelect=this.codes[this.codes.length-1],this.storage.set("codes",JSON.stringify(this.codes))}}]});yield e.present()}else{var e;e=0==this.monacoEditor?{name:this.codeSelect.name,code:this.model.value}:{name:this.codeSelect.name,code:this.codeTextArea},this.codes[this.codes.indexOf(this.codeSelect)]=e,this.codeSelect=e,this.storage.set("codes",JSON.stringify(this.codes))}}))}loadCode(){var e="";"new"==this.codeSelect||(e=this.codeSelect.code),0==this.monacoEditor?this.model={language:"typescript",uri:"main.ts",value:e}:this.codeTextArea=e}delete(){"new"!=this.codeSelect&&(0==this.monacoEditor?this.model={language:"typescript",uri:"main.ts",value:'write "Hello World!"'}:this.codeTextArea='write "Hello World!"',this.codes.splice(this.codes.indexOf(this.codeSelect),1),this.codeSelect="new",this.storage.set("codes",JSON.stringify(this.codes)))}ionViewWillEnter(){this.userAgentString.includes("Android")?this.monacoEditor=!0:this.standardEditor=!0}}return e.\u0275fac=function(t){return new(t||e)(l.Hb(a.a),l.Hb(a.g),l.Hb(s.b),l.Hb(n.a))},e.\u0275cmp=l.Bb({type:e,selectors:[["app-tab1"]],decls:47,vars:11,consts:[[3,"translucent"],[3,"fullscreen"],["value","new","okText","Load","cancelText","Cancel",3,"ngModel","ngModelChange","ionChange"],["value","new"],[3,"value",4,"ngFor","ngForOf"],[3,"hidden"],[3,"theme","codeModel","options","valueChanged"],["slot","end",3,"click"],["rows","15","cols","10","id","textArea","placeholder","Type Code Here",3,"ngModel","ngModelChange"],[3,"value"]],template:function(e,t){1&e&&(l.Kb(0,"ion-header",0),l.Kb(1,"ion-toolbar"),l.Kb(2,"ion-title"),l.cc(3," Run "),l.Jb(),l.Jb(),l.Jb(),l.Kb(4,"ion-content",1),l.Kb(5,"ion-item"),l.Kb(6,"ion-label"),l.cc(7,"Loaded Code"),l.Jb(),l.Kb(8,"ion-select",2),l.Rb("ngModelChange",(function(e){return t.codeSelect=e}))("ionChange",(function(){return t.loadCode()})),l.Kb(9,"ion-select-option",3),l.cc(10,"New Code"),l.Jb(),l.bc(11,u,2,2,"ion-select-option",4),l.Jb(),l.Jb(),l.Kb(12,"ion-card",5),l.Kb(13,"ion-card-header"),l.Kb(14,"ion-card-title"),l.cc(15,"Code"),l.Jb(),l.Jb(),l.Kb(16,"ion-card-content"),l.Kb(17,"ngs-code-editor",6),l.Rb("valueChanged",(function(e){return t.onCodeChanged(e)})),l.Jb(),l.Kb(18,"ion-button",7),l.Rb("click",(function(){return t.run()})),l.cc(19,"Run"),l.Jb(),l.Kb(20,"ion-button",7),l.Rb("click",(function(){return t.share()})),l.cc(21,"Share"),l.Jb(),l.Kb(22,"ion-button",7),l.Rb("click",(function(){return t.save()})),l.cc(23,"Save"),l.Jb(),l.Kb(24,"ion-button",7),l.Rb("click",(function(){return t.delete()})),l.cc(25,"Delete"),l.Jb(),l.Jb(),l.Jb(),l.Kb(26,"ion-card",5),l.Kb(27,"ion-card-header"),l.Kb(28,"ion-card-title"),l.cc(29,"Code"),l.Jb(),l.Jb(),l.Kb(30,"ion-card-content"),l.Kb(31,"ion-textarea",8),l.Rb("ngModelChange",(function(e){return t.codeTextArea=e})),l.Jb(),l.Kb(32,"ion-button",7),l.Rb("click",(function(){return t.run()})),l.cc(33,"Run"),l.Jb(),l.Kb(34,"ion-button",7),l.Rb("click",(function(){return t.share()})),l.cc(35,"Share"),l.Jb(),l.Kb(36,"ion-button",7),l.Rb("click",(function(){return t.save()})),l.cc(37,"Save"),l.Jb(),l.Kb(38,"ion-button",7),l.Rb("click",(function(){return t.delete()})),l.cc(39,"Delete"),l.Jb(),l.Jb(),l.Jb(),l.Kb(40,"ion-card"),l.Kb(41,"ion-card-header"),l.Kb(42,"ion-card-title"),l.cc(43,"Output"),l.Jb(),l.Jb(),l.Kb(44,"ion-card-content"),l.Kb(45,"p"),l.cc(46),l.Jb(),l.Jb(),l.Jb(),l.Jb()),2&e&&(l.Vb("translucent",!0),l.xb(4),l.Vb("fullscreen",!0),l.xb(4),l.Vb("ngModel",t.codeSelect),l.xb(3),l.Vb("ngForOf",t.codes),l.xb(1),l.Vb("hidden",t.monacoEditor),l.xb(5),l.Vb("theme",t.theme)("codeModel",t.model)("options",t.options),l.xb(9),l.Vb("hidden",t.standardEditor),l.xb(5),l.Vb("ngModel",t.codeTextArea),l.xb(15),l.dc(t.codeOutput))},directives:[n.j,n.v,n.u,n.i,n.l,n.m,n.o,n.z,c.d,c.e,n.p,i.h,n.d,n.f,n.h,n.e,b.a,n.c,n.t,n.A],styles:[""]}),e})()}];let g=(()=>{class e{}return e.\u0275mod=l.Fb({type:e}),e.\u0275inj=l.Eb({factory:function(t){return new(t||e)},imports:[[a.i.forChild(h)],a.i]}),e})(),m=(()=>{class e{}return e.\u0275mod=l.Fb({type:e}),e.\u0275inj=l.Eb({factory:function(t){return new(t||e)},imports:[[n.w,i.b,c.a,r.a,g,b.b,s.a.forRoot()]]}),e})()}}]);