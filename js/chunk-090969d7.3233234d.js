(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-090969d7"],{"109d":function(t,s,e){},"12ef":function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"login shadow-lg rounded-lg",class:{show:t.loginopen}},[a("div",{staticClass:"form-section"},[a("img",{staticClass:"md:w-24 w-20 mb-4",attrs:{src:e("9d64"),alt:"Li-fe"}}),a("h2",{staticClass:"font-bold md:text-2xl text-xl md:mb-8 mb-4"},[t._v(" 會員登入 ")]),a("validation-observer",{staticClass:"w-full flex flex-col",scopedSlots:t._u([{key:"default",fn:function(s){var e=s.invalid;return[a("form",{on:{submit:function(s){return s.preventDefault(),t.login(s)}}},[a("validation-provider",{attrs:{rules:"required"}},[a("label",{staticClass:"block w-full mb-4"},[a("div",{staticClass:"flex justify-between items-center mb-1"},[a("span",{staticClass:"text-gray-700"},[t._v("Email")]),a("span",{staticClass:"text-gray-500 text-sm"},[t._v("*必填")])]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"input-field",attrs:{name:"使用者帳號",type:"email",placeholder:"example@service.com"},domProps:{value:t.user.email},on:{input:function(s){s.target.composing||t.$set(t.user,"email",s.target.value)}}})])]),a("validation-provider",{attrs:{rules:"required"}},[a("label",{staticClass:"block w-full mb-4"},[a("div",{staticClass:"flex justify-between items-center mb-1"},[a("span",{staticClass:"text-gray-700"},[t._v("Password")]),a("span",{staticClass:"text-gray-500 text-sm"},[t._v("*必填")])]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"input-field",attrs:{name:"密碼",type:"password",placeholder:"password"},domProps:{value:t.user.password},on:{input:function(s){s.target.composing||t.$set(t.user,"password",s.target.value)}}})])]),a("div",{staticClass:"text-right"},[a("a",{staticClass:"underline text-primary-default self-end mb-8",attrs:{href:"#"}},[t._v(" 忘記密碼 ")])]),a("button",{staticClass:"btn w-full bg-primary-default",class:{"bg-primary-light text-gray-500 cursor-not-allowed":e},attrs:{type:"submit",disabled:e}},[t._v(" 登入 ")])],1)]}}])})],1),a("div",{staticClass:"bg-img"},[a("button",{staticClass:"absolute p-4 right-0",attrs:{type:"button"},on:{click:t.loginOpen}},[a("span",{staticClass:"material-icons"},[t._v(" close ")])])])])},i=[],r=(e("99af"),{name:"LoginModal",props:["loginopen"],data:function(){return{isOpen:!1,user:{name:"",password:""},token:""}},methods:{loginOpen:function(){this.$emit("loginclose")},login:function(){var t=this;this.$store.dispatch("updateLoading",!0);var s="".concat("https://course-ec-api.hexschool.io","/api/auth/login");this.axios.post(s,this.user).then((function(s){var e=s.data.token,a=s.data.expired;document.cookie="hexToken=".concat(e,";expires=").concat(new Date(1e3*a),";"),t.$router.push({path:"/admin/products"}),t.$bus.$emit("message:push","登入成功","success"),t.$store.dispatch("updateLoading",!1)})).catch((function(){t.$bus.$emit("message:push","登入失敗","danger"),t.user.username="",t.user.password="",t.$store.dispatch("updateLoading",!1)}))}}}),n=r,o=e("2877"),l=Object(o["a"])(n,a,i,!1,null,null,null);s["a"]=l.exports},"1b8a":function(t,s,e){"use strict";e("109d")},2045:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"overlay",class:{show:t.overlayopen},on:{click:function(s){return t.overlayClose()}}})},i=[],r={name:"OverlayMask",props:["overlayopen"],methods:{overlayClose:function(){this.$emit("overlayclose")}}},n=r,o=(e("8a0e"),e("2877")),l=Object(o["a"])(n,a,i,!1,null,null,null);s["a"]=l.exports},"30a7":function(t,s,e){t.exports=e.p+"img/github.09697bba.svg"},"7be5":function(t,s){t.exports="data:image/png;base64,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"},"8a0e":function(t,s,e){"use strict";e("fc9c")},"9d64":function(t,s,e){t.exports=e.p+"img/logo.798669d1.png"},c6b5:function(t,s,e){},c8e5:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("a",{staticClass:"scroll-top",attrs:{id:"scrollTop",href:"#"},on:{click:function(s){return s.preventDefault(),t.scrollTop()}}},[e("span",{staticClass:"material-icons"},[t._v(" keyboard_arrow_up ")])])},i=[],r={name:"ScrollTop",mounted:function(){var t=document.querySelector("#scrollTop");window.addEventListener("scroll",(function(){window.pageYOffset>300?t.classList.add("active"):t.classList.remove("active")}))},methods:{scrollTop:function(){window.scroll({top:0,left:0,behavior:"smooth"})}}},n=r,o=(e("1b8a"),e("2877")),l=Object(o["a"])(n,a,i,!1,null,null,null);s["a"]=l.exports},da25:function(t,s,e){t.exports=e.p+"img/linkedIn.9eeb3fac.svg"},e987:function(t,s,e){"use strict";e("c6b5")},eae1:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"w-full mx-auto"},[e("Navbar"),e("transition",{attrs:{name:"fade"}},[e("router-view")],1),e("Footer"),e("ScrollTop")],1)},i=[],r=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"navbar"},[a("nav",{staticClass:"py-4 xl:px-0 lg:px-8 px-4",class:{"fixed-header":t.scrolled},attrs:{id:"navBar"}},[a("div",{staticClass:"relative md:max-w-screen-xl mx-auto\n      md:block flex justify-between items-center"},[a("div",{staticClass:"flex items-center md:hidden mr-4 z-60"},[a("button",{staticClass:"inline-flex items-center justify-center p-2 text-gray-700\n          border-2 border-gray-100 rounded-lg transition\n          focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-200",attrs:{"aria-expanded":"false"},on:{click:function(s){t.isOpen=!t.isOpen}}},[a("span",{staticClass:"sr-only"},[t._v("Open main menu")]),a("svg",{staticClass:"h-6 w-6",class:t.isOpen?"hidden":"block",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true"}},[a("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"}})]),a("svg",{staticClass:"h-6 w-6",class:t.isOpen?"block":"hidden",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true"}},[a("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"}})])])]),a("div",{staticClass:"flex justify-between items-center flex-grow"},[a("router-link",{staticClass:"navbar__logo",attrs:{to:"/"}},[a("img",{staticClass:"logo-img",attrs:{src:e("9d64"),alt:"Li-fe"}})]),a("div",{staticClass:"menu justify-end items-center flex"},[a("ul",{staticClass:"justify-end items-center hidden md:flex"},[a("li",{staticClass:"mr-8"},[a("router-link",{staticClass:"text-gray-600 transition hover:text-secondary-light",attrs:{to:"/products"}},[t._v(" 商品總覽 ")])],1),a("li",{staticClass:"mr-8"},[a("router-link",{staticClass:"text-gray-600 transition hover:text-secondary-light",attrs:{to:"/discount"}},[t._v(" 優惠活動 ")])],1),a("li",{staticClass:"mr-8"},[a("router-link",{staticClass:"text-gray-600 transition hover:text-secondary-light",attrs:{to:"/blog"}},[t._v(" 綠色生活 ")])],1),a("li",{staticClass:"mr-6"},[a("router-link",{staticClass:"text-gray-600 transition hover:text-secondary-light",attrs:{to:"/about"}},[t._v(" 品牌故事 ")])],1)]),a("span",{staticClass:"divider bg-secondary-light mr-6 hidden md:block"}),a("ul",{staticClass:"flex justify-end items-center"},[a("li",{staticClass:"md:mr-8 mr-6"},[a("a",{staticClass:"text-gray-600 transition hover:text-secondary-light",attrs:{href:"#"},on:{click:function(s){s.preventDefault(),t.loginOpen=!t.loginOpen}}},[a("span",{staticClass:"material-icons"},[t._v(" account_circle ")])])]),a("li",{staticClass:"md:mr-8 mr-6"},[a("router-link",{staticClass:"text-gray-600 transition hover:text-secondary-light",attrs:{to:"/favorites"}},[a("span",{staticClass:"material-icons"},[t._v(" favorite ")])])],1),a("li",[a("a",{staticClass:"text-gray-600 transition hover:text-secondary-light relative",attrs:{href:"#"},on:{click:function(s){s.preventDefault(),t.sideCartOpen=!t.sideCartOpen}}},[t.cart.length?a("span",{staticClass:"absolute bg-primary-default rounded-full\n                  w-4 h-4 text-xs text-center font-ubu font-bold -left-2 -top-1"},[t._v(" "+t._s(t.cart.length)+" ")]):t._e(),a("span",{staticClass:"material-icons"},[t._v(" shopping_basket ")])])])])])],1)])]),t.isMobile?a("div",{staticClass:"fixed bg-gray-100 top-0 left-0 right-0 bottom-0\n    items-center justify-center text-center w-full z-50",class:t.isOpen?"flex":"hidden"},[a("transition",{attrs:{name:"slide-fade"}},[t.isOpen?a("ul",{staticClass:"flex items-center flex-col text-lg w-2/3 divide-y-2"},[a("li",{staticClass:"w-full"},[a("router-link",{staticClass:"text-gray-500 tracking-wider py-3",attrs:{to:"/"}},[t._v(" 回首頁 ")])],1),a("li",{staticClass:"w-full"},[a("router-link",{staticClass:"text-gray-500 tracking-wider py-3",attrs:{to:"/products"}},[t._v(" 商品總覽 ")])],1),a("li",{staticClass:"w-full"},[a("router-link",{staticClass:"text-gray-500 tracking-wider py-3",attrs:{to:"/discount"}},[t._v(" 優惠活動 ")])],1),a("li",{staticClass:"w-full"},[a("router-link",{staticClass:"text-gray-500 tracking-wider py-3",attrs:{to:"/blog"}},[t._v(" 綠色生活 ")])],1),a("li",{staticClass:"w-full"},[a("router-link",{staticClass:"text-gray-500 tracking-wider py-3",attrs:{to:"/about"}},[t._v(" 品牌故事 ")])],1)]):t._e()])],1):t._e(),a("SideCart",{attrs:{cartlist:t.cart,cartopen:t.sideCartOpen,totalprice:t.totalprice},on:{qtyupdate:t.quantityUpdate,deleteproduct:t.removeCartItem,cartclose:function(s){t.sideCartOpen=!t.sideCartOpen}}}),a("LoginModal",{attrs:{loginopen:t.loginOpen},on:{loginclose:t.closeModal}}),a("OverlayMask",{attrs:{overlayopen:t.sideCartOpen||t.loginOpen},on:{overlayclose:t.closeModal}})],1)},n=[],o=(e("99af"),e("4160"),e("159b"),function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"cart",class:{show:t.cartopen}},[e("div",{staticClass:"cart-container"},[e("h2",{staticClass:"section-title sm:mb-4"},[t._v(" 我的購物車 ")]),t.cartlist.length<1?e("div",{staticClass:"cart-main text-center"},[e("h3",{staticClass:"font-bold text-lg py-8"},[t._v("您的購物車是空的喔！")]),e("router-link",{staticClass:"btn bg-primary-default hover:bg-primary-dark transition",attrs:{to:"/products"}},[t._v(" 快來看看吧！ ")])],1):e("div",{staticClass:"cart-main"},[e("div",{staticClass:"table-wrapper"},[e("vuescroll",{attrs:{ops:t.ops}},[e("table",{staticClass:"cart-list table-auto w-full mb-2"},[e("tbody",{staticClass:"divide-y-2"},t._l(t.cartlist,(function(s){return e("tr",{key:s.product.id,staticClass:"cart-item"},[e("td",{staticClass:"sm:py-4"},[e("div",{staticClass:"pic"},[e("img",{attrs:{src:s.product.imageUrl[0],alt:""}})])]),e("td",{staticClass:"sm:whitespace-nowrap"},[e("div",{staticClass:"content"},[e("router-link",{staticClass:"name truncate",attrs:{to:"/product/"+s.product.id}},[t._v(" "+t._s(s.product.title)+" ")]),e("div",{staticClass:"sm:block inline-block"},[e("span",{staticClass:"price"},[t._v("NT "+t._s(t._f("currency")(s.product.price)))]),e("span",{staticClass:"origin"},[t._v("NT "+t._s(t._f("currency")(s.product.origin_price)))])])],1)]),e("td",[e("div",{staticClass:"qty"},[e("button",{staticClass:"btn-minus",attrs:{type:"button",disabled:0===s.quantity},on:{click:function(e){return t.quantityUpdate(s.product.id,s.quantity-1)}}},[e("span",{staticClass:"material-icons text-base"},[t._v("remove")])]),e("input",{staticClass:"q-number",attrs:{type:"number",onkeyup:"value=value.replace(/^(0+)|[^\\d]+/g,'')"},domProps:{value:s.quantity},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.quantityUpdate(s.product.id,e.target.value)}}}),e("button",{staticClass:"btn-add",attrs:{type:"button"},on:{click:function(e){return t.quantityUpdate(s.product.id,s.quantity+1)}}},[e("span",{staticClass:"material-icons text-base"},[t._v("add")])])])]),e("td",[e("button",{staticClass:"btn-close hover:text-red-700 transition",attrs:{type:"button"},on:{click:function(e){return t.deleteProduct(s.product.id)}}},[e("span",{staticClass:"material-icons"},[t._v("close")])])])])})),0)])])],1),e("div",{staticClass:"flex justify-between items-center mb-4"},[e("p",{staticClass:"font-bold text-xl"},[t._v("小計")]),e("p",{staticClass:"font-bold font-ubu text-xl text-secondary-default"},[t._v(" NT "+t._s(t._f("currency")(t.totalprice))+" ")])]),t.cartlist.length?e("router-link",{staticClass:"btn w-full text-center bg-primary-default hover:bg-primary-dark transition",attrs:{to:"/checkout"}},[t._v(" 訂單結帳 ")]):e("router-link",{staticClass:"btn w-full text-center bg-primary-default hover:bg-primary-dark transition",attrs:{to:"/products"}},[t._v(" 繼續購物 ")])],1)])])}),l=[],c=e("77a0"),u=e.n(c),d={name:"SideCart",props:["cartlist","cartopen","totalprice"],data:function(){return{ops:{rail:{opacity:"0.2",background:"#FFFFF",border:void 0,size:"6px"},bar:{background:"#ECECEC",keepShow:!1,size:"4px",minSize:.2}}}},components:{vuescroll:u.a},methods:{quantitySelected:function(t){return this.value===t},deleteProduct:function(t){this.$emit("deleteproduct",t)},quantityUpdate:function(t,s){this.$emit("qtyupdate",t,s)},shoppingCartClose:function(){this.$emit("cartclose")}}},p=d,f=(e("e987"),e("2877")),h=Object(f["a"])(p,o,l,!1,null,null,null),m=h.exports,g=e("12ef"),v=e("2045"),C={name:"Navbar",data:function(){return{windowWidth:window.innerWidth,isOpen:!1,isMobile:!1,sideCartOpen:!1,loginOpen:!1,cart:[],totalprice:0,scrolled:!1,navHeight:0}},components:{SideCart:m,LoginModal:g["a"],OverlayMask:v["a"]},created:function(){var t=this;this.getCart(),this.$bus.$on("get-cart",(function(){t.getCart(),t.sideCartOpen=!0})),this.$bus.$on("update-cart",(function(){t.getCart()}))},mounted:function(){var t=this;this.navHeight=document.querySelector("#navBar").offsetHeight,this.mediaCheck(),window.addEventListener("scroll",(function(){t.handleScroll()})),window.addEventListener("resize",(function(){t.windowWidth=window.innerWidth,t.mediaCheck()}))},beforeDestroy:function(){window.removeEventListener("resize",this.mediaCheck()),window.removeEventListener("scroll",this.handleScroll())},watch:{$route:function(){this.isOpen=!1}},methods:{mediaCheck:function(){this.windowWidth<=768?this.isMobile=!0:this.isMobile=!1},handleScroll:function(){this.scrolled=window.scrollY>200},closeModal:function(){this.sideCartOpen&&(this.sideCartOpen=!1),this.loginOpen&&(this.loginOpen=!1)},getCart:function(){var t=this,s="".concat("https://course-ec-api.hexschool.io","/api/").concat("21acf264-850e-4f92-95d0-23bf823dd286","/ec/shopping");this.$store.dispatch("updateLoading",!0),this.axios.get(s).then((function(s){t.cart=s.data.data,t.totalprice=0,t.cart.forEach((function(s){t.totalprice+=s.product.price*s.quantity})),t.$store.dispatch("updateLoading",!1)})).catch((function(){t.$store.dispatch("updateLoading",!1)}))},quantityUpdate:function(t,s){var e=this;if(!(s<0)){var a="".concat("https://course-ec-api.hexschool.io","/api/").concat("21acf264-850e-4f92-95d0-23bf823dd286","/ec/shopping"),i={product:t,quantity:s};this.$store.dispatch("updateLoading",!0),this.axios.patch(a,i).then((function(){e.$store.dispatch("updateLoading",!1),e.getCart()}))}},removeCartItem:function(t){var s=this,e="".concat("https://course-ec-api.hexschool.io","/api/").concat("21acf264-850e-4f92-95d0-23bf823dd286","/ec/shopping/").concat(t);this.$store.dispatch("updateLoading",!0),this.axios.delete(e).then((function(){s.$store.dispatch("updateLoading",!1),s.getCart()}))},removeAllCartItem:function(){var t=this,s="".concat("https://course-ec-api.hexschool.io","/api/").concat("21acf264-850e-4f92-95d0-23bf823dd286","/ec/shopping/all/product");this.$store.dispatch("updateLoading",!0),this.axios.delete(s).then((function(){t.$store.dispatch("updateLoading",!1),t.getCart()}))}}},b=C,x=Object(f["a"])(b,r,n,!1,null,null,null),y=x.exports,w=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("footer",{staticClass:"bg-gray-800"},[e("div",{staticClass:"flex justify-between flex-wrap max-w-screen-xl m-auto xl:px-0 lg:px-8 px-4 py-12"},[e("div",{staticClass:"flex justify-center sm:justify-between md:justify-start\n    flex-col sm:flex-row w-full md:w-auto items-center sm:items-start"},[t._m(0),e("div",{staticClass:"flex text-sm"},[e("ul",{staticClass:"text-white mr-12 flex-none"},[e("li",{staticClass:"block mb-3 text-gray-400"},[t._v("購買")]),e("li",{staticClass:"block mb-3"},[e("router-link",{staticClass:"hover:text-primary-light",attrs:{to:"/products"}},[t._v("產品總覽")])],1),e("li",{staticClass:"block mb-3"},[e("router-link",{staticClass:"hover:text-primary-light",attrs:{to:"/discount"}},[t._v("優惠活動")])],1),e("li",{staticClass:"block mb-3"},[e("router-link",{staticClass:"hover:text-primary-light",attrs:{to:"/account"}},[t._v("會員專區")])],1)]),e("ul",{staticClass:"text-white mr-12 flex-none"},[e("li",{staticClass:"block mb-3 text-gray-400"},[t._v("關於")]),e("li",{staticClass:"block mb-3"},[e("router-link",{staticClass:"hover:text-primary-light",attrs:{to:"/blog"}},[t._v("綠色生活")])],1),e("li",{staticClass:"block mb-3"},[e("router-link",{staticClass:"hover:text-primary-light",attrs:{to:"/about"}},[t._v("品牌故事")])],1),e("li",{staticClass:"block mb-3"},[e("router-link",{staticClass:"hover:text-primary-light",attrs:{to:"/about"}},[t._v("聯絡我們")])],1)]),e("ul",{staticClass:"text-white md:mr-12 flex-none"},[e("li",{staticClass:"block mb-3 text-gray-400"},[t._v("幫助")]),e("li",{staticClass:"block mb-3"},[e("router-link",{staticClass:"hover:text-primary-light",attrs:{to:"/guide"}},[t._v("退款換貨須知")])],1),e("li",{staticClass:"block mb-3"},[e("router-link",{staticClass:"hover:text-primary-light",attrs:{to:"/"}},[t._v("賣家專區")])],1)])])]),t._m(1)])])},k=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"footer__logo flex-none mb-6 sm:mr-16 sm:mb-0"},[a("img",{attrs:{src:e("7be5"),alt:"Li-fe"}})])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"footer__author"},[a("ul",{staticClass:"text-white text-sm leading-6"},[a("li",{staticClass:"flex md:justify-start md:mb-6 mb-4 justify-center"},[a("a",{staticClass:"mr-4",attrs:{href:"#"}},[a("i",{staticClass:"social-media"},[a("img",{attrs:{src:e("30a7"),alt:""}})])]),a("a",{attrs:{href:"#"}},[a("i",{staticClass:"social-media"},[a("img",{attrs:{src:e("da25"),alt:""}})])])]),a("li",[a("h6",{staticClass:"copyright"},[t._v(" © 2021 Li-fe. All Rights Reserved."),a("br"),t._v(" 僅作為練習使用，無任何商業用途 ")])])])])}],A={name:"Footer",data:function(){return{}}},_=A,L=Object(f["a"])(_,w,k,!1,null,null,null),O=L.exports,E=e("c8e5"),Y={name:"Home",data:function(){return{}},components:{Navbar:y,Footer:O,ScrollTop:E["a"]}},j=Y,M=Object(f["a"])(j,a,i,!1,null,null,null);s["default"]=M.exports},fc9c:function(t,s,e){}}]);
//# sourceMappingURL=chunk-090969d7.3233234d.js.map