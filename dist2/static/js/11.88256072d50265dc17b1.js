webpackJsonp([11],{177:function(e,t,n){n(393);var i=n(13)(n(327),n(424),null,null);e.exports=i.exports},206:function(e,t){e.exports=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-DD HH:mm:ss";"string"==typeof e&&(e=new Date(e.replace(/-/g,"/"))),"number"==typeof e&&(e=new Date(e));var n={"M+":e.getMonth()+1,"D+":e.getDate(),"h+":e.getHours()%12==0?12:e.getHours()%12,"H+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()},i={0:"日",1:"一",2:"二",3:"三",4:"四",5:"五",6:"六"};/(Y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),/(E+)/.test(t)&&(t=t.replace(RegExp.$1,(RegExp.$1.length>1?RegExp.$1.length>2?"星期":"周":"")+i[e.getDay()+""]));for(var o in n)new RegExp("("+o+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?n[o]:("00"+n[o]).substr((""+n[o]).length)));return t}},213:function(e,t,n){"use strict";t.a={created:function(){this.uuid=Math.random().toString(36).substring(3,8)}}},240:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(269),o=n.n(i),r=n(276),s=n.n(r),l=n(213);t.default={mixins:[l.a],mounted:function(){var e=this;this.$nextTick(function(){setTimeout(function(){var t=e,n="vux-ximg-"+e.uuid;e.$el.setAttribute("id",n),e.blazy=new o.a({scroller:e.scroller,container:e.container,selector:"#"+n,offset:t.offset,errorClass:t.errorClass,successClass:t.successClass,success:function(e){t.$emit("on-success",t.src,e)},error:function(e,n){t.$emit("on-error",t.src,e,n)}})},e.delay)})},computed:{currentSrc:function(){return s()()&&this.webpSrc?this.webpSrc:this.src}},props:{src:String,webpSrc:String,defaultSrc:{type:String,default:"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="},errorClass:String,successClass:String,offset:{type:Number,defaut:100},scroller:Object,container:String,delay:{type:Number,default:100}},beforeDestroy:function(){this.blazy&&this.blazy.destroy()}}},247:function(e,t,n){t=e.exports=n(168)(),t.push([e.i,".b-lazy{-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out;max-width:100%;opacity:0}.b-lazy.b-loaded{opacity:1}","",{version:3,sources:["D:/frontend/vue-run/node_modules/vux/src/components/x-img/index.vue"],names:[],mappings:"AACA,QACE,2CAA8C,AAC9C,mCAAsC,AACtC,eAAgB,AAChB,SAAW,CACZ,AACD,iBACE,SAAW,CACZ",file:"index.vue",sourcesContent:["\n.b-lazy {\n  -webkit-transition: opacity 500ms ease-in-out;\n  transition: opacity 500ms ease-in-out;\n  max-width: 100%;\n  opacity: 0;\n}\n.b-lazy.b-loaded {\n  opacity: 1;\n}\n"],sourceRoot:""}])},253:function(e,t,n){var i=n(247);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(169)("24fb7fc8",i,!0)},266:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("img",{staticClass:"vux-x-img",attrs:{src:e.defaultSrc,"data-src":e.currentSrc}})},staticRenderFns:[]}},269:function(e,t,n){var i,o;!function(r,s){i=s,void 0!==(o="function"==typeof i?i.call(t,n,t,e):i)&&(e.exports=o)}(0,function(){"use strict";function e(e){var n=e._util;if(n.elements=A(e.options.selector),n.count=n.elements.length,n.destroyed&&(n.destroyed=!1,e.options.container&&p(e.options.container,function(e){u(e,"scroll",n.validateT)}),u(window,"resize",n.saveViewportOffsetT),u(window,"resize",n.validateT),u(window,"scroll",n.validateT),e.options.scroller)){var i=e.options.scroller._xscroll,o=i.userConfig.useOriginScroll?"scroll":"scrollend";i.on("afterrender",n.validateT,e),i.on(o,n.validateT,e)}t(e)}function t(e){for(var t=e._util,i=0;i<t.count;i++){var o=t.elements[i];(n(o)||c(o,e.options.successClass))&&(e.load(o),t.elements.splice(i,1),t.count--,i--)}0===t.count&&e.destroy()}function n(e){var t=e.getBoundingClientRect();return t.right>=g.left&&t.bottom>=g.top&&t.left<=g.right&&t.top<=g.bottom}function i(e,t,n){if(!c(e,n.successClass)&&(t||n.loadInvisible||e.offsetWidth>0&&e.offsetHeight>0)){var i=e.getAttribute(C)||e.getAttribute(n.src);if(i){var A=i.split(n.separator),d=A[B&&A.length>1?1:0],m=l(e,"img");if(m||void 0===e.src){var g=new Image,b=function(){n.error&&n.error(e,"invalid"),a(e,n.errorClass),f(g,"error",b),f(g,"load",w)},w=function(){if(m){r(e,d),s(e,v,n.srcset);var t=e.parentNode;t&&l(t,"picture")&&p(t.getElementsByTagName("source"),function(e){s(e,v,n.srcset)}),n.scroller&&n.scroller.reset()}else e.style.backgroundImage='url("'+d+'")';o(e,n),f(g,"load",w),f(g,"error",b)};u(g,"error",b),u(g,"load",w),r(g,d)}else r(e,d),o(e,n)}else l(e,"video")?(p(e.getElementsByTagName("source"),function(e){s(e,h,n.src)}),e.load(),o(e,n)):(n.error&&n.error(e,"missing"),a(e,n.errorClass))}}function o(e,t){a(e,t.successClass),t.success&&t.success(e),e.removeAttribute(t.src),p(t.breakpoints,function(t){e.removeAttribute(t.src)})}function r(e,t){e[h]=t}function s(e,t,n){var i=e.getAttribute(n);i&&(e[t]=i,e.removeAttribute(n))}function l(e,t){return e.nodeName.toLowerCase()===t}function c(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")!==-1}function a(e,t){c(e,t)||(e.className+=" "+t)}function A(e){for(var t=[],n=document.querySelectorAll(e),i=n.length;i--;t.unshift(n[i]));return t}function d(e){g.bottom=(window.innerHeight||document.documentElement.clientHeight)+e,g.right=(window.innerWidth||document.documentElement.clientWidth)+e}function u(e,t,n){e.attachEvent?e.attachEvent&&e.attachEvent("on"+t,n):e.addEventListener(t,n,!1)}function f(e,t,n){e.detachEvent?e.detachEvent&&e.detachEvent("on"+t,n):e.removeEventListener(t,n,!1)}function p(e,t){if(e&&t)for(var n=e.length,i=0;i<n&&t(e[i],i)!==!1;i++);}function m(e,t,n){var i=0;return function(){var o=+new Date;o-i<t||(i=o,e.apply(n,arguments))}}var C,g,B,h="src",v="srcset";return function(n){if(!document.querySelectorAll){var o=document.createStyleSheet();document.querySelectorAll=function(e,t,n,i,r){for(r=document.all,t=[],e=e.replace(/\[for\b/gi,"[htmlFor").split(","),n=e.length;n--;){for(o.addRule(e[n],"k:v"),i=r.length;i--;)r[i].currentStyle.k&&t.push(r[i]);o.removeRule(0)}return t}}var r=this,s=r._util={};s.elements=[],s.destroyed=!0,r.options=n||{},r.options.error=r.options.error||!1,r.options.offset=r.options.offset||100,r.options.success=r.options.success||!1,r.options.selector=r.options.selector||".b-lazy",r.options.separator=r.options.separator||"|",r.options.container=!!r.options.container&&document.querySelectorAll(r.options.container),r.options.errorClass=r.options.errorClass||"b-error",r.options.breakpoints=r.options.breakpoints||!1,r.options.loadInvisible=r.options.loadInvisible||!1,r.options.successClass=r.options.successClass||"b-loaded",r.options.validateDelay=r.options.validateDelay||25,r.options.saveViewportOffsetDelay=r.options.saveViewportOffsetDelay||50,r.options.srcset=r.options.srcset||"data-srcset",r.options.src=C=r.options.src||"data-src",B=window.devicePixelRatio>1,g={},g.top=0-r.options.offset,g.left=0-r.options.offset,r.revalidate=function(){e(this)},r.load=function(e,t){var n=this.options;void 0===e.length?i(e,t,n):p(e,function(e){i(e,t,n)})},r.destroy=function(){var e=this,t=e._util;e.options.container&&p(e.options.container,function(e){f(e,"scroll",t.validateT)}),f(window,"scroll",t.validateT),f(window,"resize",t.validateT),f(window,"resize",t.saveViewportOffsetT),e.scroller&&e.scroller._xscroll&&e.scroller._xscroll.off("scroll scrollend afterrender",t.validateT,e.scroller._xscroll),t.count=0,t.elements.length=0,t.destroyed=!0},s.validateT=m(function(){t(r)},r.options.validateDelay,r),s.saveViewportOffsetT=m(function(){d(r.options.offset)},r.options.saveViewportOffsetDelay,r),d(r.options.offset),p(r.options.breakpoints,function(e){if(e.width>=window.screen.width)return C=e.src,!1}),setTimeout(function(){e(r)})}})},270:function(e,t,n){n(253);var i=n(13)(n(240),n(266),null,null);e.exports=i.exports},276:function(e,t){var n="can_use_webp";!function(){if(window.localStorage&&"object"==typeof localStorage&&(!localStorage.getItem(n)||"available"!==localStorage.getItem(n)&&"disable"!==localStorage.getItem(n))){var e=document.createElement("img");e.onload=function(){try{localStorage.setItem(n,"available")}catch(e){}},e.onerror=function(){try{localStorage.setItem(n,"disable")}catch(e){}},e.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=="}}(),e.exports=function(){return!!window.localStorage&&"available"===window.localStorage.getItem(n)}},327:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(69),o=n.n(i),r=n(270),s=n.n(r),l=n(206),c=n.n(l),a=n(41);t.default={components:{XImg:s.a,dateFormat:c.a},filters:{filterLoc:function(e){return e.toString()},filterComment:function(e){var t=[];for(var n in e)t.push(n);return t.length},filterDate:function(e){var t=Date.parse(new Date)/1e3;return console.log(t-e),t-e<600&&t-e>=60?"1分钟前":t-e<1200&&t-e>=600?"5分钟前":t-e<6e3&&t-e>=1200?"10分钟前":t-e<12e3&&t-e>=6e3?"1小时前":t-1*e<12e4&&t-e>=12e3?"2小时前":t-1*e<24e4&&t-e>=12e4?"1天前":t-1*e&&t-e>=24e4?"2天前":c()(1e3*e,"MM-DD HH:mm")}},created:function(){this.$store.dispatch("get_circles_friend_list",{begin:0,offset:100,isfriend:1,uid:localStorage.getItem("loginopenid")})},computed:o()({},n.i(a.c)(["circles_friend_list"])),methods:{success:function(e,t){var n=t.parentNode.querySelector("span");t.parentNode.removeChild(n)},error:function(e,t,n){t.parentNode.querySelector("span").innerText="加载失败。。。"}},data:function(){return{options:{getThumbBoundsFn:function(e){var t=document.querySelectorAll(".previewer-demo-img")[e],n=window.pageYOffset||document.documentElement.scrollTop,i=t.getBoundingClientRect();return{x:i.left,y:i.top+n,w:i.width}}}}}}},364:function(e,t,n){t=e.exports=n(168)(),t.push([e.i,".circleFriend{padding:.5rem;background-color:#f9f9f9}.circleFriend .cells{border-bottom:1px solid #ddd;padding:.5rem 0;position:relative}.circleFriend .cells .head{line-height:1.5;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative}.circleFriend .cells .head .headImg{width:2rem;height:2rem}.circleFriend .cells .head .headImg img{width:100%;border-radius:50%}.circleFriend .cells .head .headTitle{margin-left:.5rem}.circleFriend .cells .head .headTitle h3{font-size:.8rem;color:#333;font-weight:400}.circleFriend .cells .head .headTitle p{font-size:.5rem;color:#999}.circleFriend .cells .head .focus{width:2.5rem;line-height:2;font-size:.5rem;color:#1cc019;text-align:center;background:#e8e8e8;border:0 solid #e5e5e5;border-radius:1px;position:absolute;right:.5rem;top:.3rem}.circleFriend .cells .conten_title{font-size:.75rem;color:#333;margin:.4rem 0;line-height:1.6}.circleFriend .cells .content_img{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-top:.2rem}.circleFriend .cells .content_img div{padding:.1rem}.circleFriend .cells .content_img div img{width:100%}.circleFriend .cells .bottom{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;text-align:right}.circleFriend .cells .bottom .zan{margin-top:.2rem;position:relative;width:100%}.circleFriend .cells .bottom .zan div{margin-right:.8rem;display:inline}.circleFriend .cells .bottom .zan div i{font-size:.8rem;color:#576b95;margin-right:.2rem}.circleFriend .cells .bottom .zan div span{font-size:.5rem;color:#576b95;font-weight:400}.addNew{background-color:#1cc019;width:2rem;height:2rem;padding:.3rem;border-radius:50%;position:fixed;bottom:1.5rem;right:1rem;text-align:center;line-height:1.8}.addNew i{font-size:1.2rem;color:#fff}","",{version:3,sources:["D:/frontend/vue-run/src/components/circles/circleFriend.vue"],names:[],mappings:"AACA,cACE,cAAe,AACf,wBAA0B,CAC3B,AACD,qBACI,6BAA8B,AAC9B,gBAAiB,AACjB,iBAAmB,CACtB,AACD,2BACM,gBAAiB,AACjB,oBAAqB,AACrB,qBAAsB,AACtB,oBAAqB,AACrB,aAAc,AACd,iBAAmB,CACxB,AACD,oCACQ,WAAY,AACZ,WAAa,CACpB,AACD,wCACU,WAAY,AACZ,iBAAmB,CAC5B,AACD,sCACQ,iBAAmB,CAC1B,AACD,yCACU,gBAAkB,AAClB,WAAY,AACZ,eAAoB,CAC7B,AACD,wCACU,gBAAkB,AAClB,UAAY,CACrB,AACD,kCACQ,aAAc,AACd,cAAe,AACf,gBAAkB,AAClB,cAAe,AACf,kBAAmB,AACnB,mBAAoB,AACpB,uBAA0B,AAC1B,kBAAmB,AACnB,kBAAmB,AACnB,YAAa,AACb,SAAW,CAClB,AACD,mCACM,iBAAmB,AACnB,WAAY,AACZ,eAAgB,AAChB,eAAiB,CACtB,AACD,kCACM,oBAAqB,AACrB,qBAAsB,AACtB,oBAAqB,AACrB,aAAc,AACd,gBAAkB,CACvB,AACD,sCACQ,aAAe,CACtB,AACD,0CACU,UAAY,CACrB,AACD,6BACM,oBAAqB,AACrB,qBAAsB,AACtB,oBAAqB,AACrB,aAAc,AACd,gBAAkB,CACvB,AACD,kCACQ,iBAAkB,AAClB,kBAAmB,AACnB,UAAY,CACnB,AACD,sCACU,mBAAoB,AACpB,cAAgB,CACzB,AACD,wCACY,gBAAkB,AAClB,cAAe,AACf,kBAAoB,CAC/B,AACD,2CACY,gBAAkB,AAClB,cAAe,AACf,eAAoB,CAC/B,AACD,QACE,yBAA0B,AAC1B,WAAY,AACZ,YAAa,AACb,cAAe,AACf,kBAAmB,AACnB,eAAgB,AAChB,cAAe,AACf,WAAY,AACZ,kBAAmB,AACnB,eAAiB,CAClB,AACD,UACI,iBAAkB,AAClB,UAAY,CACf",file:"circleFriend.vue",sourcesContent:["\n.circleFriend {\n  padding: .5rem;\n  background-color: #f9f9f9;\n}\n.circleFriend .cells {\n    border-bottom: 1px solid #ddd;\n    padding: .5rem 0;\n    position: relative;\n}\n.circleFriend .cells .head {\n      line-height: 1.5;\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      position: relative;\n}\n.circleFriend .cells .head .headImg {\n        width: 2rem;\n        height: 2rem;\n}\n.circleFriend .cells .head .headImg img {\n          width: 100%;\n          border-radius: 50%;\n}\n.circleFriend .cells .head .headTitle {\n        margin-left: .5rem;\n}\n.circleFriend .cells .head .headTitle h3 {\n          font-size: 0.8rem;\n          color: #333;\n          font-weight: normal;\n}\n.circleFriend .cells .head .headTitle p {\n          font-size: 0.5rem;\n          color: #999;\n}\n.circleFriend .cells .head .focus {\n        width: 2.5rem;\n        line-height: 2;\n        font-size: 0.5rem;\n        color: #1CC019;\n        text-align: center;\n        background: #e8e8e8;\n        border: 0px solid #E5E5E5;\n        border-radius: 1px;\n        position: absolute;\n        right: .5rem;\n        top: .3rem;\n}\n.circleFriend .cells .conten_title {\n      font-size: 0.75rem;\n      color: #333;\n      margin: .4rem 0;\n      line-height: 1.6;\n}\n.circleFriend .cells .content_img {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      margin-top: .2rem;\n}\n.circleFriend .cells .content_img div {\n        padding: .1rem;\n}\n.circleFriend .cells .content_img div img {\n          width: 100%;\n}\n.circleFriend .cells .bottom {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      text-align: right;\n}\n.circleFriend .cells .bottom .zan {\n        margin-top: .2rem;\n        position: relative;\n        width: 100%;\n}\n.circleFriend .cells .bottom .zan div {\n          margin-right: .8rem;\n          display: inline;\n}\n.circleFriend .cells .bottom .zan div i {\n            font-size: 0.8rem;\n            color: #576B95;\n            margin-right: .2rem;\n}\n.circleFriend .cells .bottom .zan div span {\n            font-size: 0.5rem;\n            color: #576B95;\n            font-weight: normal;\n}\n.addNew {\n  background-color: #1CC019;\n  width: 2rem;\n  height: 2rem;\n  padding: .3rem;\n  border-radius: 50%;\n  position: fixed;\n  bottom: 1.5rem;\n  right: 1rem;\n  text-align: center;\n  line-height: 1.8;\n}\n.addNew i {\n    font-size: 1.2rem;\n    color: #fff;\n}\n"],sourceRoot:""}])},393:function(e,t,n){var i=n(364);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(169)("6e4d4b57",i,!0)},424:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"circleFriend"},[e._l(e.circles_friend_list,function(t,i){return e._l(t,function(t){return n("div",{staticClass:"cells"},[n("div",{staticClass:"head"},[n("div",{staticClass:"headImg"},[n("img",{attrs:{src:t.headerurl}})]),e._v(" "),n("div",{staticClass:"headTitle ellipsis"},[n("h3",[e._v(e._s(t.nickname))]),e._v(" "),n("p",[e._v(e._s(e._f("filterDate")(t.time)))])]),e._v(" "),0==t.isFocus?n("span",{staticClass:"focus",on:{click:function(e){}}},[e._v("关注")]):e._e()]),e._v(" "),n("div",{staticClass:"conten_title"},[e._v(e._s(t.title))]),e._v(" "),n("div",{staticClass:"content_img"},e._l(t.img,function(t,i){return n("div",{staticStyle:{"text-align":"center"}},[n("span",{staticStyle:{"font-size":".6rem"}},[e._v("图片加载中...")]),e._v(" "),n("x-img",{attrs:{width:"200",src:t,"webp-src":t+"?type=webp"},on:{"on-success":e.success,"on-error":e.error}})],1)})),e._v(" "),n("div",{staticClass:"bottom ellipsis"},[n("div",{staticClass:"zan"},[n("div",[n("i",{staticClass:"iconfont icon-dianzan-copy"}),n("span",[e._v(e._s(t.likes))])]),e._v(" "),n("div",[n("i",{staticClass:"iconfont icon-dazhongicon04"}),e._v(" "),n("span",{staticStyle:{top:".35rem",position:"absolute"}},[e._v(e._s(e._f("filterComment")(t.comments)))])])])])])})}),e._v(" "),n("div",{staticClass:"addNew",on:{click:function(t){e.$router.push("circle/topic/addTopic")}}},[n("i",{staticClass:"iconfont icon-zhaoxiangji"})])],2)},staticRenderFns:[]}}});
//# sourceMappingURL=11.88256072d50265dc17b1.js.map