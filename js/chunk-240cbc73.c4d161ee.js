(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-240cbc73"],{"183f":function(t,e,s){"use strict";s("79b3")},2045:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"overlay",class:{show:t.overlayopen},on:{click:function(e){return t.overlayClose()}}})},i=[],a={name:"OverlayMask",props:["overlayopen"],methods:{overlayClose:function(){this.$emit("overlayclose")}}},o=a,r=(s("8a0e"),s("2877")),c=Object(r["a"])(o,n,i,!1,null,null,null);e["a"]=c.exports},"550b":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4"},[s("TitleBanner",{staticClass:"md:mb-12 mb-6",attrs:{titleText:t.title,bgImg:t.bgImg}}),s("div",{staticClass:"block text-center sm:mb-12 mb-4"},[s("p",{staticClass:"font-bold sm:text-2xl text-lg mb-2"},[t._v(" - 快來試試手氣，立即獲得優惠 - ")]),s("p",{staticClass:"font-bold md:text-3xl sm:text-2xl text-xl mb-4"},[t._v(" 您尚有 "),s("span",{staticClass:"px-1 font-ubu text-primary-dark"},[t._v(" "+t._s(t.chance)+" ")]),t._v(" 機會可以使用 ")]),s("button",{staticClass:"btn sm:w-64 w-48 bg-primary-default text-lg",class:{"bg-primary-light text-gray-500 cursor-not-allowed":t.noChance},attrs:{type:"button",disabled:t.noChance},on:{click:function(e){return t.pressHandler()}}},[t._v(" 試試手氣 ")])]),s("div",{staticClass:"wheel-wrapper mb-8 md:mb-28"},[s("div",{attrs:{id:"wheel"}},[s("ul",{staticClass:"prize-box"},t._l(t.prizes,(function(e,n){return s("li",{key:n,staticClass:"prize",class:{active:t.active===n},style:{transform:t.transformHandler(n,"prize")}},[s("div",{staticClass:"prize-content",style:{transform:t.transformHandler(n,"content")}},[s("div",{staticClass:"prize-icon"},[s("img",{attrs:{src:""+e.icon,alt:""}})]),s("div",{staticClass:"prize-text",domProps:{innerHTML:t._s(e.text)}})])])})),0),s("div",{style:{transform:t.rotateHandler()},attrs:{id:"hand"},on:{click:function(e){return t.pressHandler()}}},[s("button",{staticClass:"press"},[t._v("GO")])])])]),t.showResult?s("div",{staticClass:"result-module"},[s("div",{staticClass:"box text-center relative"},[t.wellDone?s("div",{staticClass:"box-wrapper",attrs:{id:"good"}},[t._m(0),s("p",{staticClass:"font-bold sm:text-3xl text-xl text-center mb-4"},[t._v(" - 恭喜您獲得 - ")]),s("div",{staticClass:"box-content"},[s("p",{staticClass:"md:text-2xl text-xl text-center font-ubu border-2 bg-gray-100\n            mb-4 py-2 px-4"},[t._v(" "+t._s(t.winPrize.code)+" ")]),s("p",{staticClass:"font-bold md:text-5xl text-3xl text-center sm:mb-8 mb-4"},[t._v(" "+t._s(t.winPrize.text)+" ")]),s("button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.winPrize.code,expression:"winPrize.code",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:error",value:t.clipboardErrorHandler,expression:"clipboardErrorHandler",arg:"error"}],staticClass:"btn bg-primary-default w-full shadow-lg\n            hover:shadow-none hover:bg-primary-dark transition",attrs:{type:"button"},on:{click:t.copySuccess}},[t._v(" 立即使用 ")])])]):s("div",{staticClass:"box-wrapper",attrs:{id:"bad"}},[t._m(1),s("p",{staticClass:"font-bold sm:text-3xl text-xl text-center mb-4"},[t._v(" - 很可惜您獲得 - ")]),s("div",{staticClass:"box-content"},[s("p",{staticClass:"font-bold md:text-5xl text-3xl text-center sm:mb-8 mb-4"},[t._v(" "+t._s(t.winPrize.text)+" ")]),s("button",{staticClass:"text-primary-default underline mb-4\n            hover:text-primary-dark transition",attrs:{type:"button"},on:{click:function(e){t.showResult=!t.showResult}}},[t._v(" 回活動頁面 ")]),s("router-link",{staticClass:"btn bg-primary-default w-full shadow-lg\n            hover:shadow-none hover:bg-primary-dark transition",attrs:{to:"/"}},[t._v(" 回首頁 ")])],1)]),s("button",{staticClass:"close-button",attrs:{type:"button"},on:{click:function(e){t.showResult=!t.showResult}}},[s("span",{staticClass:"material-icons"},[t._v(" close ")])])])]):t._e(),s("OverlayMask",{attrs:{overlayopen:t.showResult},on:{overlayclose:function(e){return t.closeResult()}}})],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon"},[s("img",{attrs:{src:"images/icon/icon-giftcard.svg",alt:""}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon"},[s("img",{attrs:{src:"images/icon/icon-sad.svg",alt:""}})])}],a=(s("99af"),s("edd8")),o=s("2045"),r={name:"Discount",data:function(){return{title:"優惠活動",bgImg:"images/bg-event.jpg",windowWidth:document.documentElement.clientWidth,windowHeight:document.documentElement.clientHeight,showResult:!1,isPressed:!1,degree:0,active:-1,chance:3,noChance:!1,winPrize:{text:"",code:""},wellDone:!1,prizes:[{icon:"images/icon/icon-money.svg",text:"9折<br/>優惠券",value:"9折優惠券",code:"life_0090",count:10},{icon:"images/icon/icon-money.svg",text:"5折<br/>優惠券",value:"5折優惠券",code:"life_0050",count:5},{icon:"images/icon/icon-dissatisfied.svg",text:"銘謝惠顧",value:"銘謝惠顧",code:"",count:15},{icon:"images/icon/icon-sad.svg",text:"含淚說掰",value:"含淚說掰",count:10},{icon:"images/icon/icon-restar.svg",text:"下回再見",value:"下回再見",code:"",count:15},{icon:"images/icon/icon-giftcard.svg",text:"95折<br/>優惠券",value:"95折優惠券",code:"life_0095",count:10}]}},components:{TitleBanner:a["a"],OverlayMask:o["a"]},mounted:function(){window.addEventListener("resize",this.setDimensions)},beforeDestroy:function(){window.removeEventListener("resize",this.setDimensions)},methods:{setDimensions:function(){this.windowWidth=document.documentElement.clientWidth,this.windowHeight=document.documentElement.clientHeight},transformHandler:function(t,e){var s=this.prizes.length,n=360/s,i=-n/2,a=n-90,o="";return o=this.windowWidth<620?"translate(34px, 50px)":"translate(53px, 50px)","prize"===e?"rotate(".concat(i+t*n,"deg) skewY(").concat(a,"deg)"):"content"===e?"skewY(".concat(90-n,"deg) rotate(").concat(n/2,"deg) ").concat(o):o},generateIndex:function(t){for(var e=[],s=0;s<t.length;s+=1)0!==t[s].count&&e.push(s);return e},getRandomNumber:function(t){var e=this.generateIndex(t),s=Math.floor(Math.random()*e.length);return e[s]},pressHandler:function(){var t=this;if(!this.isPressed&&!this.noChance){var e=this.prizes,s=this.getRandomNumber(e);if(void 0===s)return;this.isPressed=!0,this.active=-1;var n=6,i=e.length,a=360*n+s*(360/i);this.degree+=a-this.degree%360,setTimeout((function(){switch(t.active=s,e[s].count>0&&(e[s].count-=1),t.winPrize.text=t.prizes[s].value,t.winPrize.code=t.prizes[s].code,t.winPrize.text){case"9折優惠券":case"5折優惠券":case"不限金額免運":t.wellDone=!0;break;default:t.wellDone=!1}t.showResult=!0,t.isPressed=!1}),6e3),this.chance-=1,this.chance<1&&(this.noChance=!0)}},rotateHandler:function(){return"rotate(".concat(this.degree,"deg)")},closeResult:function(){this.showResult=!1},copySuccess:function(){this.$bus.$emit("message:push","已複製代碼","success")},clipboardErrorHandler:function(){alert("發生錯誤，請直接選取代碼複製")}}},c=r,l=(s("183f"),s("2877")),u=Object(l["a"])(c,n,i,!1,null,null,null);e["default"]=u.exports},"79b3":function(t,e,s){},"8a0e":function(t,e,s){"use strict";s("fc9c")},9400:function(t,e,s){},"9ac4":function(t,e,s){"use strict";s("9400")},edd8:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"banner",style:{"background-image":"url("+t.bgImg+")"}},[s("h1",[t._v(t._s(t.titleText))])])},i=[],a={name:"TitleBanner",props:["titleText","bgImg"]},o=a,r=(s("9ac4"),s("2877")),c=Object(r["a"])(o,n,i,!1,null,"87d44bf0",null);e["a"]=c.exports},fc9c:function(t,e,s){}}]);
//# sourceMappingURL=chunk-240cbc73.c4d161ee.js.map