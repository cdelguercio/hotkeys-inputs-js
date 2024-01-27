"use strict";const k=require("./gamecontrol.js");require("./gamepad-58404dcd.js");var C=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function x(e,t,r,n){e.addEventListener?e.addEventListener(t,r,n):e.attachEvent&&e.attachEvent("on".concat(t),function(){r(window.event)})}function D(e,t){for(var r=t.slice(0,t.length-1),n=0;n<r.length;n++)r[n]=e[r[n].toLowerCase()];return r}function I(e){typeof e!="string"&&(e=""),e=e.replace(/\s/g,"");for(var t=e.split(","),r=t.lastIndexOf("");r>=0;)t[r-1]+=",",t.splice(r,1),r=t.lastIndexOf("");return t}function V(e,t){for(var r=e.length>=t.length?e:t,n=e.length>=t.length?t:e,i=!0,s=0;s<r.length;s++)n.indexOf(r[s])===-1&&(i=!1);return i}var K={backspace:8,"⌫":8,tab:9,clear:12,enter:13,"↩":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"⇪":20,",":188,".":190,"/":191,"`":192,"-":C?173:189,"=":C?61:187,";":C?59:186,"'":222,"[":219,"]":221,"\\":220},v={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},S={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},u={16:!1,18:!1,17:!1,91:!1},l={};for(var A=1;A<20;A++)K["f".concat(A)]=111+A;var o=[],H=!1,T="all",$=[],E=function(t){return K[t.toLowerCase()]||v[t.toLowerCase()]||t.toUpperCase().charCodeAt(0)},F=function(t){return Object.keys(K).find(function(r){return K[r]===t})},X=function(t){return Object.keys(v).find(function(r){return v[r]===t})};function q(e){T=e||"all"}function O(){return T||"all"}function z(){return o.slice(0)}function J(){return o.map(function(e){return F(e)||X(e)||String.fromCharCode(e)})}function Q(e){var t=e.target||e.srcElement,r=t.tagName,n=!0;return(t.isContentEditable||(r==="INPUT"||r==="TEXTAREA"||r==="SELECT")&&!t.readOnly)&&(n=!1),n}function W(e){return typeof e=="string"&&(e=E(e)),o.indexOf(e)!==-1}function Y(e,t){var r,n;e||(e=O());for(var i in l)if(Object.prototype.hasOwnProperty.call(l,i))for(r=l[i],n=0;n<r.length;)r[n].scope===e?r.splice(n,1):n++;O()===e&&q(t||"all")}function Z(e){var t=e.keyCode||e.which||e.charCode,r=o.indexOf(t);if(r>=0&&o.splice(r,1),e.key&&e.key.toLowerCase()==="meta"&&o.splice(0,o.length),(t===93||t===224)&&(t=91),t in u){u[t]=!1;for(var n in v)v[n]===t&&(m[n]=!1)}}function N(e){if(typeof e>"u")Object.keys(l).forEach(function(f){return delete l[f]});else if(Array.isArray(e))e.forEach(function(f){f.key&&j(f)});else if(typeof e=="object")e.key&&j(e);else if(typeof e=="string"){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var i=r[0],s=r[1];typeof i=="function"&&(s=i,i=""),j({key:e,scope:i,method:s,splitKey:"+"})}}var j=function(t){var r=t.key,n=t.scope,i=t.method,s=t.splitKey,f=s===void 0?"+":s,d=I(r);d.forEach(function(a){var c=a.split(f),b=c.length,p=c[b-1],h=p==="*"?"*":E(p);if(l[h]){n||(n=O());var w=b>1?D(v,c):[];l[h]=l[h].filter(function(g){var y=i?g.method===i:!0;return!(y&&g.scope===n&&V(g.mods,w))})}})};function U(e,t,r,n){if(t.element===n){var i;if(t.scope===r||t.scope==="all"){i=t.mods.length>0;for(var s in u)Object.prototype.hasOwnProperty.call(u,s)&&(!u[s]&&t.mods.indexOf(+s)>-1||u[s]&&t.mods.indexOf(+s)===-1)&&(i=!1);(t.mods.length===0&&!u[16]&&!u[18]&&!u[17]&&!u[91]||i||t.shortcut==="*")&&t.method(e,t)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0))}}}function B(e,t){var r=l["*"],n=e.keyCode||e.which||e.charCode;if(m.filter.call(this,e)){if((n===93||n===224)&&(n=91),o.indexOf(n)===-1&&n!==229&&o.push(n),["ctrlKey","altKey","shiftKey","metaKey"].forEach(function(g){var y=S[g];e[g]&&o.indexOf(y)===-1?o.push(y):!e[g]&&o.indexOf(y)>-1?o.splice(o.indexOf(y),1):g==="metaKey"&&e[g]&&o.length===3&&(e.ctrlKey||e.shiftKey||e.altKey||(o=o.slice(o.indexOf(y))))}),n in u){u[n]=!0;for(var i in v)v[i]===n&&(m[i]=!0);if(!r)return}for(var s in u)Object.prototype.hasOwnProperty.call(u,s)&&(u[s]=e[S[s]]);e.getModifierState&&!(e.altKey&&!e.ctrlKey)&&e.getModifierState("AltGraph")&&(o.indexOf(17)===-1&&o.push(17),o.indexOf(18)===-1&&o.push(18),u[17]=!0,u[18]=!0);var f=O();if(r)for(var d=0;d<r.length;d++)r[d].scope===f&&(e.type==="keydown"&&r[d].keydown||e.type==="keyup"&&r[d].keyup)&&U(e,r[d],f,t);if(n in l){for(var a=0;a<l[n].length;a++)if((e.type==="keydown"&&l[n][a].keydown||e.type==="keyup"&&l[n][a].keyup)&&l[n][a].key){for(var c=l[n][a],b=c.splitKey,p=c.key.split(b),h=[],w=0;w<p.length;w++)h.push(E(p[w]));h.sort().join("")===o.sort().join("")&&U(e,c,f,t)}}}}function ee(e){return $.indexOf(e)>-1}function m(e,t,r){o=[];var n=I(e),i=[],s="all",f=document,d=0,a=!1,c=!0,b="+",p=!1;for(r===void 0&&typeof t=="function"&&(r=t),Object.prototype.toString.call(t)==="[object Object]"&&(t.scope&&(s=t.scope),t.element&&(f=t.element),t.keyup&&(a=t.keyup),t.keydown!==void 0&&(c=t.keydown),t.capture!==void 0&&(p=t.capture),typeof t.splitKey=="string"&&(b=t.splitKey)),typeof t=="string"&&(s=t);d<n.length;d++)e=n[d].split(b),i=[],e.length>1&&(i=D(v,e)),e=e[e.length-1],e=e==="*"?"*":E(e),e in l||(l[e]=[]),l[e].push({keyup:a,keydown:c,scope:s,mods:i,shortcut:n[d],method:r,key:n[d],splitKey:b,element:f});typeof f<"u"&&!ee(f)&&window&&($.push(f),x(f,"keydown",function(h){B(h,f)},p),H||(H=!0,x(window,"focus",function(){o=[]},p)),x(f,"keyup",function(h){B(h,f),Z(h)},p))}function te(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"all";Object.keys(l).forEach(function(r){var n=l[r].filter(function(i){return i.scope===t&&i.shortcut===e});n.forEach(function(i){i&&i.method&&i.method()})})}var P={getPressedKeyString:J,setScope:q,getScope:O,deleteScope:Y,getPressedKeyCodes:z,isPressed:W,filter:Q,trigger:te,unbind:N,keyMap:K,modifier:v,modifierMap:S};for(var M in P)Object.prototype.hasOwnProperty.call(P,M)&&(m[M]=P[M]);if(typeof window<"u"){var re=window.hotkeys;m.noConflict=function(e){return e&&window.hotkeys===m&&(window.hotkeys=re),m},window.hotkeys=m}const ne={on:function(e,t,r="changed"){r==="repeat"?m(e,(n,i)=>{n.preventDefault(),t(1)}):m(e,{keyup:r==="released"||r==="changed"?!0:null,keydown:r==="pressed"||r==="changed"?!0:null},(i,s)=>{i.repeat||t(m.isPressed(e)===!0?1:0)})},off:function(e,t){m.unbind(e)}},G={supportedInputHandlers:["keyboard","gamepad"],handlers:{keyboard:{handler:ne,enabled:!0},gamepad:{handler:void 0,enabled:!1}},definedActions:{},registeredActions:{keyboard:{},gamepad:{}},get gamepadEnabled(){return this.handlers.gamepad.enabled},set gamepadEnabled(e){this.handlers.gamepad.enabled=e},get keyboardEnabled(){return this.handlers.keyboard.enabled},set keyboardEnabled(e){this.handlers.keyboard.enabled=e},unregisterActionsCallbacks:{},init:function(){k.on("connect",e=>{this.handlers.gamepad.handler||(this.handlers.gamepad.handler=e,Object.entries(this.registeredActions.gamepad).forEach(([t,r])=>{var n;(n=this.handlers.gamepad.handler)==null||n.on(t,r.handler,r.event)}))}),k.on("disconnect",e=>{e.id===this.handlers.gamepad.handler.id&&(this.handlers.gamepad.handler=void 0)}),Object.entries(k.getGamepads()).find(([e,t])=>{t!==null&&t.id!==this.handlers.gamepad.handler.id&&(this.handlers.gamepad.handler=t)})},defineInputActions:function(e,t){Object.entries(e).map(([r,n])=>{if(!(t!=null&&t.override)&&this.definedActions[r])throw new Error(`${r} action has already been defined as a dependancy.`);this.definedActions[r]=n})},cleanInputActions:function(){this.definedActions={}},onInputActions:function(e,t,r){const n=new Set;Object.entries(t).forEach(([s,f])=>{const d=this.definedActions[s];d==null||d.forEach(a=>{var p,h,w,g;const c=this.registeredActions[a.type][a.key];if(c){if(c.id===e)throw new Error(`There is already a group of event registered under the id [${e}]. Unsubscribe this group of event before registering a new one`);n.add(c.id),(p=this.handlers[a.type].handler)==null||p.off(a.key,c.handler)}const b=y=>{var _,L;if(!this.handlers[a.type].enabled)return;if(!y){f();return}const R=y===1?((_=a.options)==null?void 0:_.value)??1:y===0?0:(((L=a.options)==null?void 0:L.value)??1)/1*y;f(R)};this.registeredActions[a.type][a.key]={handler:b,id:e,event:(h=a.options)==null?void 0:h.event},(g=this.handlers[a.type].handler)==null||g.on(a.key,b,(w=a.options)==null?void 0:w.event)})}),r&&(this.unregisterActionsCallbacks[e]=r),this.supportedInputHandlers.forEach(s=>{Object.entries(this.registeredActions[s]).forEach(([f,d])=>{var a;n.has(d.id)&&((a=this.handlers[s].handler)==null||a.off(f,d.handler),delete this.registeredActions[s][f])})});for(var i of Array.from(n.values()))this.unregisterActionsCallbacks[i]&&this.unregisterActionsCallbacks[i]()},offInputActions:function(e){this.supportedInputHandlers.forEach(t=>{Object.entries(this.registeredActions[t]).forEach(([r,n])=>{var i;e===n.id&&((i=this.handlers[t].handler)==null||i.off(r),delete this.registeredActions[t][r])})}),this.unregisterActionsCallbacks[e]&&this.unregisterActionsCallbacks[e]()}};G.init();module.exports=G;
