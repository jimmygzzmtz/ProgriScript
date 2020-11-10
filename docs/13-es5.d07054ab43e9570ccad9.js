!function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"k+ul":function(t,o,i){"use strict";i.r(o),i.d(o,"Tab3PageModule",(function(){return w}));var r,a,c,l=i("TEn/"),s=i("tyNb"),u=i("ofXK"),b=i("3Pt+"),m=i("mrSG"),f=i("fXoL"),h=i("e8h1"),p=((r=function(){function t(n,o){e(this,t),this.storage=n,this.alertController=o}var o,i,r;return o=t,(i=[{key:"share",value:function(){var e;(e=window.navigator)&&e.share&&e.share({title:"ProgriScript",text:"https://jimmygzzmtz.github.io/ProgriScript/"})}},{key:"clearStorage",value:function(){return Object(m.a)(this,void 0,void 0,regeneratorRuntime.mark((function e(){var n,t=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.alertController.create({header:"Clear Storage",message:"This will delete all the saved code",buttons:[{text:"Cancel"},{text:"OK",handler:function(e){return Object(m.a)(t,void 0,void 0,regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.storage.clear();case 2:location.reload();case 3:case"end":return e.stop()}}),e,this)})))}}]});case 2:return n=e.sent,e.next=5,n.present();case 5:case"end":return e.stop()}}),e,this)})))}},{key:"installPrompt",value:function(){return Object(m.a)(this,void 0,void 0,regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.alertController.create({header:"How to Install",message:"<ion-icon name='logo-apple'></ion-icon> Tap on <ion-icon name='share'></ion-icon>, then 'Add to Homescreen'.<br><br>      <ion-icon name='logo-android'></ion-icon> Tap on <ion-icon name='menu'></ion-icon>, then 'Add to Homescreen'.<br><br>      <ion-icon name='logo-chrome'></ion-icon><ion-icon name='logo-edge'></ion-icon> Click on <ion-icon name='add'></ion-icon> on the address bar.",buttons:[{text:"OK"}]});case 2:return n=e.sent,e.next=5,n.present();case 5:case"end":return e.stop()}}),e,this)})))}}])&&n(o.prototype,i),r&&n(o,r),t}()).\u0275fac=function(e){return new(e||r)(f.Hb(h.b),f.Hb(l.a))},r.\u0275cmp=f.Bb({type:r,selectors:[["app-tab3"]],decls:29,vars:2,consts:[[3,"translucent"],[3,"fullscreen"],["lines","full"],["slot","start","name","information-circle-outline"],["lines","full",3,"click"],["slot","start","name","download"],["lines","full","target","_blank",3,"click"],["slot","start","name","share-social-outline"],["lines","full","href","mailto: jimmygzzmtz@gmail.com, raul_ehs@hotmail.com"],["slot","start","name","people-outline"],["lines","full","target","_blank","href","https://github.com/jimmygzzmtz/ProgriScript"],["slot","start","name","logo-github"],["slot","start","name","trash"]],template:function(e,n){1&e&&(f.Kb(0,"ion-header",0),f.Kb(1,"ion-toolbar"),f.Kb(2,"ion-title"),f.fc(3," Settings "),f.Jb(),f.Jb(),f.Jb(),f.Kb(4,"ion-content",1),f.Kb(5,"ion-item",2),f.Ib(6,"ion-icon",3),f.Kb(7,"ion-label"),f.fc(8,"Version 1.0"),f.Jb(),f.Jb(),f.Kb(9,"ion-item",4),f.Sb("click",(function(){return n.installPrompt()})),f.Ib(10,"ion-icon",5),f.Kb(11,"ion-label"),f.fc(12,"How to Install"),f.Jb(),f.Jb(),f.Kb(13,"ion-item",6),f.Sb("click",(function(){return n.share()})),f.Ib(14,"ion-icon",7),f.Kb(15,"ion-label"),f.fc(16,"Share ProgriScript"),f.Jb(),f.Jb(),f.Kb(17,"ion-item",8),f.Ib(18,"ion-icon",9),f.Kb(19,"ion-label"),f.fc(20,"Contact"),f.Jb(),f.Jb(),f.Kb(21,"ion-item",10),f.Ib(22,"ion-icon",11),f.Kb(23,"ion-label"),f.fc(24,"GitHub"),f.Jb(),f.Jb(),f.Kb(25,"ion-item",4),f.Sb("click",(function(){return n.clearStorage()})),f.Ib(26,"ion-icon",12),f.Kb(27,"ion-label"),f.fc(28,"Clear Storage"),f.Jb(),f.Jb(),f.Jb()),2&e&&(f.Xb("translucent",!0),f.xb(4),f.Xb("fullscreen",!0))},directives:[l.i,l.u,l.t,l.h,l.k,l.j,l.l],styles:[""]}),r),d=i("qtYk"),g=[{path:"",component:p}],v=((c=function n(){e(this,n)}).\u0275mod=f.Fb({type:c}),c.\u0275inj=f.Eb({factory:function(e){return new(e||c)},imports:[[s.i.forChild(g)],s.i]}),c),w=((a=function n(){e(this,n)}).\u0275mod=f.Fb({type:a}),a.\u0275inj=f.Eb({factory:function(e){return new(e||a)},imports:[[l.v,u.b,b.a,d.a,s.i.forChild([{path:"",component:p}]),v,h.a.forRoot()]]}),a)}}])}();