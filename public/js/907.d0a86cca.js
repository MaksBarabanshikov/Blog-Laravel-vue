(self["webpackChunkblog_vue_cli"]=self["webpackChunkblog_vue_cli"]||[]).push([[907],{9907:function(n,t,e){e(1703),function(t,r){n.exports=r(e(6866))}(window,(function(n){return function(n){var t={};function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)e.d(r,o,function(t){return n[t]}.bind(null,o));return r},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=3)}([function(t,e){t.exports=n},function(n,t,e){"use strict";(function(n){var e="object"==typeof n&&n&&n.Object===Object&&n;t.a=e}).call(this,e(2))},function(n,t){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(n){"object"==typeof window&&(e=window)}n.exports=e},function(n,t,e){"use strict";e.r(t);var r=e(0),o=e.n(r),u=function(n){var t=typeof n;return null!=n&&("object"==t||"function"==t)},i=e(1),c="object"==typeof self&&self&&self.Object===Object&&self,f=i.a||c||Function("return this")(),a=function(){return f.Date.now()},s=/\s/,l=function(n){for(var t=n.length;t--&&s.test(n.charAt(t)););return t},d=/^\s+/,p=function(n){return n?n.slice(0,l(n)+1).replace(d,""):n},m=f.Symbol,h=Object.prototype,v=h.hasOwnProperty,y=h.toString,b=m?m.toStringTag:void 0,g=function(n){var t=v.call(n,b),e=n[b];try{n[b]=void 0;var r=!0}catch(n){}var o=y.call(n);return r&&(t?n[b]=e:delete n[b]),o},w=Object.prototype.toString,S=function(n){return w.call(n)},R=m?m.toStringTag:void 0,E=function(n){return null==n?void 0===n?"[object Undefined]":"[object Null]":R&&R in Object(n)?g(n):S(n)},C=function(n){return null!=n&&"object"==typeof n},T=function(n){return"symbol"==typeof n||C(n)&&"[object Symbol]"==E(n)},j=/^[-+]0x[0-9a-f]+$/i,O=/^0b[01]+$/i,x=/^0o[0-7]+$/i,k=parseInt,M=function(n){if("number"==typeof n)return n;if(T(n))return NaN;if(u(n)){var t="function"==typeof n.valueOf?n.valueOf():n;n=u(t)?t+"":t}if("string"!=typeof n)return 0===n?n:+n;n=p(n);var e=O.test(n);return e||x.test(n)?k(n.slice(2),e?2:8):j.test(n)?NaN:+n},D=Math.max,V=Math.min,N=function(n,t,e){var r,o,i,c,f,s,l=0,d=!1,p=!1,m=!0;if("function"!=typeof n)throw new TypeError("Expected a function");function h(t){var e=r,u=o;return r=o=void 0,l=t,c=n.apply(u,e)}function v(n){return l=n,f=setTimeout(b,t),d?h(n):c}function y(n){var e=n-s;return void 0===s||e>=t||e<0||p&&n-l>=i}function b(){var n=a();if(y(n))return g(n);f=setTimeout(b,function(n){var e=t-(n-s);return p?V(e,i-(n-l)):e}(n))}function g(n){return f=void 0,m&&r?h(n):(r=o=void 0,c)}function w(){var n=a(),e=y(n);if(r=arguments,o=this,s=n,e){if(void 0===f)return v(s);if(p)return clearTimeout(f),f=setTimeout(b,t),h(s)}return void 0===f&&(f=setTimeout(b,t)),c}return t=M(t)||0,u(e)&&(d=!!e.leading,i=(p="maxWait"in e)?D(M(e.maxWait)||0,t):i,m="trailing"in e?!!e.trailing:m),w.cancel=function(){void 0!==f&&clearTimeout(f),l=0,r=s=o=f=void 0},w.flush=function(){return void 0===f?c:g(a())},w},P={name:"ckeditor",created(){const{CKEDITOR_VERSION:n}=window;if(n){const[t]=n.split(".").map(Number);t<34&&console.warn("The <CKEditor> component requires using CKEditor 5 in version 34 or higher.")}else console.warn('Cannot find the "CKEDITOR_VERSION" in the "window" scope.')},render(){return Object(r.h)(this.tagName)},model:{prop:"modelValue",event:"update:modelValue"},props:{editor:{type:Function,default:null},modelValue:{type:String,default:""},config:{type:Object,default:()=>({})},tagName:{type:String,default:"div"},disabled:{type:Boolean,default:!1}},data:()=>({instance:null,lastEditorData:{type:String,default:""}}),mounted(){const n=Object.assign({},this.config);this.modelValue&&(n.initialData=this.modelValue),this.editor.create(this.$el,n).then((t=>{this.instance=Object(r.markRaw)(t),this.setUpEditorEvents(),this.modelValue!==n.initialData&&t.setData(this.modelValue),this.disabled&&t.enableReadOnlyMode("Integration Sample"),this.$emit("ready",t)})).catch((n=>{console.error(n)}))},beforeUnmount(){this.instance&&(this.instance.destroy(),this.instance=null),this.$emit("destroy",this.instance)},watch:{modelValue(n){this.instance&&n!==this.lastEditorData&&this.instance.setData(n)},disabled(n){n?this.instance.enableReadOnlyMode("Integration Sample"):this.instance.disableReadOnlyMode("Integration Sample")}},methods:{setUpEditorEvents(){const n=this.instance,t=N((t=>{const e=this.lastEditorData=n.getData();this.$emit("update:modelValue",e,t,n),this.$emit("input",e,t,n)}),300,{leading:!0});n.model.document.on("change:data",t),n.editing.view.document.on("focus",(t=>{this.$emit("focus",t,n)})),n.editing.view.document.on("blur",(t=>{this.$emit("blur",t,n)}))}}};const U=o.a?o.a.version:r.version,[I]=U.split(".").map((n=>parseInt(n,10)));if(I<3)throw new Error("The CKEditor plugin works only with Vue 3+. For more information, please refer to https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html");const _={install(n){n.component("ckeditor",P)},component:P};t.default=_}]).default}))},6866:function(n,t,e){"use strict";e.r(t),e.d(t,{BaseTransition:function(){return r.P$},Comment:function(){return r.sv},EffectScope:function(){return r.Bj},Fragment:function(){return r.HY},KeepAlive:function(){return r.Ob},ReactiveEffect:function(){return r.qq},Static:function(){return r.qG},Suspense:function(){return r.n4},Teleport:function(){return r.lR},Text:function(){return r.xv},Transition:function(){return r.uT},TransitionGroup:function(){return r.W3},VueElement:function(){return r.a2},callWithAsyncErrorHandling:function(){return r.$d},callWithErrorHandling:function(){return r.KU},camelize:function(){return r._A},capitalize:function(){return r.kC},cloneVNode:function(){return r.Ho},compatUtils:function(){return r.ry},compile:function(){return o},computed:function(){return r.Fl},createApp:function(){return r.ri},createBlock:function(){return r.j4},createCommentVNode:function(){return r.kq},createElementBlock:function(){return r.iD},createElementVNode:function(){return r._},createHydrationRenderer:function(){return r.Eo},createPropsRestProxy:function(){return r.p1},createRenderer:function(){return r.Us},createSSRApp:function(){return r.vr},createSlots:function(){return r.Nv},createStaticVNode:function(){return r.uE},createTextVNode:function(){return r.Uk},createVNode:function(){return r.Wm},customRef:function(){return r.ZM},defineAsyncComponent:function(){return r.RC},defineComponent:function(){return r.aZ},defineCustomElement:function(){return r.MW},defineEmits:function(){return r.Bz},defineExpose:function(){return r.WY},defineProps:function(){return r.yb},defineSSRCustomElement:function(){return r.Ah},devtools:function(){return r.mW},effect:function(){return r.cE},effectScope:function(){return r.B},getCurrentInstance:function(){return r.FN},getCurrentScope:function(){return r.nZ},getTransitionRawChildren:function(){return r.Q6},guardReactiveProps:function(){return r.F4},h:function(){return r.h},handleError:function(){return r.S3},hydrate:function(){return r.ZB},initCustomFormatter:function(){return r.Mr},initDirectivesForSSR:function(){return r.Nd},inject:function(){return r.f3},isMemoSame:function(){return r.nQ},isProxy:function(){return r.X3},isReactive:function(){return r.PG},isReadonly:function(){return r.$y},isRef:function(){return r.dq},isRuntimeOnly:function(){return r.of},isShallow:function(){return r.yT},isVNode:function(){return r.lA},markRaw:function(){return r.Xl},mergeDefaults:function(){return r.u_},mergeProps:function(){return r.dG},nextTick:function(){return r.Y3},normalizeClass:function(){return r.C_},normalizeProps:function(){return r.vs},normalizeStyle:function(){return r.j5},onActivated:function(){return r.dl},onBeforeMount:function(){return r.wF},onBeforeUnmount:function(){return r.Jd},onBeforeUpdate:function(){return r.Xn},onDeactivated:function(){return r.se},onErrorCaptured:function(){return r.d1},onMounted:function(){return r.bv},onRenderTracked:function(){return r.bT},onRenderTriggered:function(){return r.Yq},onScopeDispose:function(){return r.EB},onServerPrefetch:function(){return r.vl},onUnmounted:function(){return r.SK},onUpdated:function(){return r.ic},openBlock:function(){return r.wg},popScopeId:function(){return r.Cn},provide:function(){return r.JJ},proxyRefs:function(){return r.WL},pushScopeId:function(){return r.dD},queuePostFlushCb:function(){return r.qb},reactive:function(){return r.qj},readonly:function(){return r.OT},ref:function(){return r.iH},registerRuntimeCompiler:function(){return r.Y1},render:function(){return r.sY},renderList:function(){return r.Ko},renderSlot:function(){return r.WI},resolveComponent:function(){return r.up},resolveDirective:function(){return r.Q2},resolveDynamicComponent:function(){return r.LL},resolveFilter:function(){return r.eq},resolveTransitionHooks:function(){return r.U2},setBlockTracking:function(){return r.qZ},setDevtoolsHook:function(){return r.ec},setTransitionHooks:function(){return r.nK},shallowReactive:function(){return r.Um},shallowReadonly:function(){return r.YS},shallowRef:function(){return r.XI},ssrContextKey:function(){return r.Uc},ssrUtils:function(){return r.G},stop:function(){return r.sT},toDisplayString:function(){return r.zw},toHandlerKey:function(){return r.hR},toHandlers:function(){return r.mx},toRaw:function(){return r.IU},toRef:function(){return r.Vh},toRefs:function(){return r.BK},transformVNodeArgs:function(){return r.C3},triggerRef:function(){return r.oR},unref:function(){return r.SU},useAttrs:function(){return r.l1},useCssModule:function(){return r.fb},useCssVars:function(){return r.sj},useSSRContext:function(){return r.Zq},useSlots:function(){return r.Rr},useTransitionState:function(){return r.Y8},vModelCheckbox:function(){return r.e8},vModelDynamic:function(){return r.YZ},vModelRadio:function(){return r.G2},vModelSelect:function(){return r.bM},vModelText:function(){return r.nr},vShow:function(){return r.F8},version:function(){return r.i8},warn:function(){return r.ZK},watch:function(){return r.YP},watchEffect:function(){return r.m0},watchPostEffect:function(){return r.Rh},watchSyncEffect:function(){return r.yX},withAsyncContext:function(){return r.mv},withCtx:function(){return r.w5},withDefaults:function(){return r.b9},withDirectives:function(){return r.wy},withKeys:function(){return r.D2},withMemo:function(){return r.MX},withModifiers:function(){return r.iM},withScopeId:function(){return r.HX}});var r=e(9242);const o=()=>{0}}}]);
//# sourceMappingURL=907.d0a86cca.js.map