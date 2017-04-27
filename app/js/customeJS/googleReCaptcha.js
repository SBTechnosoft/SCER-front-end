/**
 * @license angular-recaptcha build:2017-03-14
 * https://github.com/vividcortex/angular-recaptcha
 * Copyright (c) 2017 VividCortex
**/

!function(a){"use strict";a.module("vcRecaptcha",[])}(angular),function(a){"use strict";function b(){throw new Error('You need to set the "key" attribute to your public reCaptcha key. If you don\'t have a key, please get one from https://www.google.com/recaptcha/admin/create')}a.module("vcRecaptcha").provider("vcRecaptchaService",function(){var c=this,d={};c.onLoadFunctionName="vcRecaptchaApiLoaded",c.setDefaults=function(b){a.copy(b,d)},c.setSiteKey=function(a){d.key=a},c.setTheme=function(a){d.theme=a},c.setStoken=function(a){d.stoken=a},c.setSize=function(a){d.size=a},c.setType=function(a){d.type=a},c.setLang=function(a){d.lang=a},c.setOnLoadFunctionName=function(a){c.onLoadFunctionName=a},c.$get=["$rootScope","$window","$q","$document",function(e,f,g,h){function i(){return k?g.when(k):m}function j(){if(!k)throw new Error("reCaptcha has not been loaded yet.")}var k,l=g.defer(),m=l.promise,n={};f.vcRecaptchaApiLoadedCallback=f.vcRecaptchaApiLoadedCallback||[];var o=function(){k=f.grecaptcha,l.resolve(k)};if(f.vcRecaptchaApiLoadedCallback.push(o),f[c.onLoadFunctionName]=function(){f.vcRecaptchaApiLoadedCallback.forEach(function(a){a()})},a.isDefined(f.grecaptcha))o();else{var p=f.document.createElement("script");p.async=!0,p.defer=!0,p.src="https://www.google.com/recaptcha/api.js?onload="+c.onLoadFunctionName+"&render=explicit",h.find("body").append(p)}return{create:function(a,c){return c.sitekey=c.key||d.key,c.theme=c.theme||d.theme,c.stoken=c.stoken||d.stoken,c.size=c.size||d.size,c.type=c.type||d.type,c.hl=c.lang||d.lang,c.sitekey&&40===c.sitekey.length||b(),i().then(function(b){var d=b.render(a,c);return n[d]=a,d})},reload:function(a){j(),k.reset(a),e.$broadcast("reCaptchaReset",a)},useLang:function(a,b){var c=n[a];if(!c)throw new Error("reCaptcha Widget ID not exists",a);var d=c.querySelector("iframe");if(!b)return d&&d.src&&/[?&]hl=\w+/.test(d.src)?d.src.replace(/.+[?&]hl=(\w+)([^\w].+)?/,"$1"):null;if(d&&d.src){var e=d.src;/[?&]hl=/.test(e)?e=e.replace(/([?&]hl=)\w+/,"$1"+b):e+=(e.indexOf("?")===-1?"?":"&")+"hl="+b,d.src=e}},getResponse:function(a){return j(),k.getResponse(a)},getInstance:function(a){return n[a]},destroy:function(a){delete n[a]}}}]})}(angular),function(a){"use strict";a.module("vcRecaptcha").directive("vcRecaptcha",["$document","$timeout","vcRecaptchaService",function(b,c,d){return{restrict:"A",require:"?^^form",scope:{response:"=?ngModel",key:"=?",stoken:"=?",theme:"=?",size:"=?",type:"=?",lang:"=?",tabindex:"=?",required:"=?",onCreate:"&",onSuccess:"&",onExpire:"&"},link:function(e,f,g,h){function i(){h&&h.$setValidity("recaptcha",null),l()}function j(){c(function(){e.response="",k(),e.onExpire({widgetId:e.widgetId})})}function k(){h&&h.$setValidity("recaptcha",e.required===!1?null:Boolean(e.response))}function l(){d.destroy(e.widgetId),a.element(b[0].querySelectorAll(".pls-container")).parent().remove()}e.widgetId=null,h&&a.isDefined(g.required)&&e.$watch("required",k);var m=e.$watch("key",function(b){var h=function(a){c(function(){e.response=a,k(),e.onSuccess({response:a,widgetId:e.widgetId})})};d.create(f[0],{callback:h,key:b,stoken:e.stoken||g.stoken||null,theme:e.theme||g.theme||null,type:e.type||g.type||null,lang:e.lang||g.lang||null,tabindex:e.tabindex||g.tabindex||null,size:e.size||g.size||null,"expired-callback":j}).then(function(b){k(),e.widgetId=b,e.onCreate({widgetId:b}),e.$on("$destroy",i),e.$on("reCaptchaReset",function(c,d){(a.isUndefined(d)||b===d)&&(e.response="",k())})}),m()})}}}])}(angular);