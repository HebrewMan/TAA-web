import{R as E,r as d,e as R,j as x,c as ge}from"./index-afcb8d0f.js";import{c as W,a as T}from"./clsx.m-306d06a6.js";function Y(e,r){if(!e)return r;let i;return typeof e=="function"?i=e():"current"in e?i=e.current:i=e,i}function Ce(){}const tt=Object.assign,I=typeof window<"u";function K(e){return e!=null}function z(e){return typeof e=="function"}function be(e){return Oe(e)&&z(e.then)&&z(e.catch)}function Oe(e){return e!==null&&typeof e=="object"}function Ne(e){e.stopPropagation()}function ye(e,r){(typeof e.cancelable!="boolean"||e.cancelable)&&e.preventDefault(),r&&Ne(e)}const Se={click:"onClick"};function Z(e,r){const i=Object.assign({},r.props);for(const t of e){const s=Se[t];i[s]=function(n){var a,o;n.stopPropagation(),(o=(a=r.props)[s])===null||o===void 0||o.call(a,n)}}return E.cloneElement(r,i)}let q=!1;if(I)try{const e={};Object.defineProperty(e,"passive",{get(){q=!0}}),window.addEventListener("test-passive",null,e)}catch{}function J(e,r,i={}){if(!I)return;const{target:t=window,passive:s=!1,capture:n=!1,depends:a=[]}=i;let o;const c=()=>{const u=Y(t);u&&!o&&(u.addEventListener(e,r,q?{capture:n,passive:s}:n),o=!0)},l=()=>{const u=Y(t);u&&o&&(u.removeEventListener(e,r,n),o=!1)};d.useEffect(()=>(c(),()=>l()),[t,...a])}const X=10;function Te(e,r){return e>r&&e>X?"horizontal":r>e&&r>X?"vertical":""}function je(){const e=d.useRef(0),r=d.useRef(0),i=d.useRef(0),t=d.useRef(0),s=d.useRef(0),n=d.useRef(0),a=d.useRef(""),o=d.useRef(null),c=()=>a.current==="vertical",l=()=>a.current==="horizontal",u=()=>{i.current=0,t.current=0,s.current=0,n.current=0,a.current="",o.current=null};return{move:m=>{const h=m.touches[0];i.current=h.clientX<0?0:h.clientX-e.current,t.current=h.clientY-r.current,s.current=Math.abs(i.current),n.current=Math.abs(t.current),o.current===null?o.current=!0:o.current=!1,a.current||(a.current=Te(s.current,n.current))},start:m=>{u(),e.current=m.touches[0].clientX,r.current=m.touches[0].clientY},reset:u,startX:e,startY:r,deltaX:i,deltaY:t,offsetX:s,offsetY:n,direction:a,isVertical:c,isHorizontal:l,firstMove:o}}const U=/scroll|auto/i,ke=I?window:void 0;function Ie(e){return e.tagName!=="HTML"&&e.tagName!=="BODY"&&e.nodeType===1}function we(e,r=ke){r===void 0&&(r=window);let i=e;for(;i&&i!==r&&Ie(i);){const{overflowY:t}=window.getComputedStyle(i);if(U.test(t)){if(i.tagName!=="BODY")return i;const s=window.getComputedStyle(i.parentNode).overflowY;if(U.test(s))return i}i=i.parentNode}return r}const Pe=I?E.useLayoutEffect:E.useEffect,V=Pe;var Re=globalThis&&globalThis.__rest||function(e,r){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)r.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(i[t[s]]=e[t[s]]);return i};function _e(e){return e.substring(3).replace(/([A-Z])/g,"-$1").toLowerCase().replace(/^-/,"")}const Le=E.forwardRef((e,r)=>{const{name:i="",className:t,style:s,spin:n,rotate:a,tabIndex:o,onClick:c,children:l}=e,u=Re(e,["name","className","style","spin","rotate","tabIndex","onClick","children"]),p={};a&&(p.msTransform=`rotate(${a}deg)`,p.transform=`rotate(${a}deg)`);const f=i?_e(i):void 0;let m=o;m===void 0&&c&&(m=-1);const h=Object.assign({role:"img","aria-label":f,focusable:"false","data-icon":f,"aria-hidden":"true",preserveAspectRatio:"xMidYMid meet",ref:r,tabIndex:m,onClick:c,className:["rv-icon",f?`rv-icon-${f}`:"",n?"rv-icon--spin":"",t].join(" ").trim(),style:Object.assign(Object.assign({},s),p)},u);return E.cloneElement(l,h)}),De=Le,$e=e=>d.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"},e),d.createElement("path",{d:"M560.149 501.223l255.344 255.344c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L501.223 560.149 245.88 815.493c-16.272 16.272-42.654 16.272-58.925 0-16.272-16.272-16.272-42.654 0-58.926l255.344-255.344L186.954 245.88c-16.272-16.272-16.272-42.654 0-58.925 16.271-16.272 42.653-16.272 58.925 0l255.344 255.344 255.344-255.344c16.272-16.272 42.654-16.272 58.926 0 16.272 16.271 16.272 42.653 0 58.925L560.149 501.223z",fillRule:"nonzero"})),Me=d.forwardRef((e,r)=>d.createElement(De,Object.assign({name:"SvgCross"},e,{ref:r}),d.createElement($e,null))),Ae=Me;function L(){return L=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var i=arguments[r];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e},L.apply(this,arguments)}function Q(e,r){if(e==null)return{};var i={},t=Object.keys(e),s,n;for(n=0;n<t.length;n++)s=t[n],!(r.indexOf(s)>=0)&&(i[s]=e[s]);return i}function D(e,r){return D=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,s){return t.__proto__=s,t},D(e,r)}function ee(e,r){e.prototype=Object.create(r.prototype),e.prototype.constructor=e,D(e,r)}function Ye(e,r){return e.classList?!!r&&e.classList.contains(r):(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+r+" ")!==-1}function ze(e,r){e.classList?e.classList.add(r):Ye(e,r)||(typeof e.className=="string"?e.className=e.className+" "+r:e.setAttribute("class",(e.className&&e.className.baseVal||"")+" "+r))}function B(e,r){return e.replace(new RegExp("(^|\\s)"+r+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function Xe(e,r){e.classList?e.classList.remove(r):typeof e.className=="string"?e.className=B(e.className,r):e.setAttribute("class",B(e.className&&e.className.baseVal||"",r))}const G={disabled:!1},te=E.createContext(null);var j="unmounted",b="exited",O="entering",y="entered",$="exiting",g=function(e){ee(r,e);function r(t,s){var n;n=e.call(this,t,s)||this;var a=s,o=a&&!a.isMounting?t.enter:t.appear,c;return n.appearStatus=null,t.in?o?(c=b,n.appearStatus=O):c=y:t.unmountOnExit||t.mountOnEnter?c=j:c=b,n.state={status:c},n.nextCallback=null,n}r.getDerivedStateFromProps=function(s,n){var a=s.in;return a&&n.status===j?{status:b}:null};var i=r.prototype;return i.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},i.componentDidUpdate=function(s){var n=null;if(s!==this.props){var a=this.state.status;this.props.in?a!==O&&a!==y&&(n=O):(a===O||a===y)&&(n=$)}this.updateStatus(!1,n)},i.componentWillUnmount=function(){this.cancelNextCallback()},i.getTimeouts=function(){var s=this.props.timeout,n,a,o;return n=a=o=s,s!=null&&typeof s!="number"&&(n=s.exit,a=s.enter,o=s.appear!==void 0?s.appear:a),{exit:n,enter:a,appear:o}},i.updateStatus=function(s,n){s===void 0&&(s=!1),n!==null?(this.cancelNextCallback(),n===O?this.performEnter(s):this.performExit()):this.props.unmountOnExit&&this.state.status===b&&this.setState({status:j})},i.performEnter=function(s){var n=this,a=this.props.enter,o=this.context?this.context.isMounting:s,c=this.props.nodeRef?[o]:[R.findDOMNode(this),o],l=c[0],u=c[1],p=this.getTimeouts(),f=o?p.appear:p.enter;if(!s&&!a||G.disabled){this.safeSetState({status:y},function(){n.props.onEntered(l)});return}this.props.onEnter(l,u),this.safeSetState({status:O},function(){n.props.onEntering(l,u),n.onTransitionEnd(f,function(){n.safeSetState({status:y},function(){n.props.onEntered(l,u)})})})},i.performExit=function(){var s=this,n=this.props.exit,a=this.getTimeouts(),o=this.props.nodeRef?void 0:R.findDOMNode(this);if(!n||G.disabled){this.safeSetState({status:b},function(){s.props.onExited(o)});return}this.props.onExit(o),this.safeSetState({status:$},function(){s.props.onExiting(o),s.onTransitionEnd(a.exit,function(){s.safeSetState({status:b},function(){s.props.onExited(o)})})})},i.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},i.safeSetState=function(s,n){n=this.setNextCallback(n),this.setState(s,n)},i.setNextCallback=function(s){var n=this,a=!0;return this.nextCallback=function(o){a&&(a=!1,n.nextCallback=null,s(o))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},i.onTransitionEnd=function(s,n){this.setNextCallback(n);var a=this.props.nodeRef?this.props.nodeRef.current:R.findDOMNode(this),o=s==null&&!this.props.addEndListener;if(!a||o){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],l=c[0],u=c[1];this.props.addEndListener(l,u)}s!=null&&setTimeout(this.nextCallback,s)},i.render=function(){var s=this.state.status;if(s===j)return null;var n=this.props,a=n.children;n.in,n.mountOnEnter,n.unmountOnExit,n.appear,n.enter,n.exit,n.timeout,n.addEndListener,n.onEnter,n.onEntering,n.onEntered,n.onExit,n.onExiting,n.onExited,n.nodeRef;var o=Q(n,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return E.createElement(te.Provider,{value:null},typeof a=="function"?a(s,o):E.cloneElement(E.Children.only(a),o))},r}(E.Component);g.contextType=te;g.propTypes={};function N(){}g.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:N,onEntering:N,onEntered:N,onExit:N,onExiting:N,onExited:N};g.UNMOUNTED=j;g.EXITED=b;g.ENTERING=O;g.ENTERED=y;g.EXITING=$;const Ue=g;var Ve=function(r,i){return r&&i&&i.split(" ").forEach(function(t){return ze(r,t)})},_=function(r,i){return r&&i&&i.split(" ").forEach(function(t){return Xe(r,t)})},M=function(e){ee(r,e);function r(){for(var t,s=arguments.length,n=new Array(s),a=0;a<s;a++)n[a]=arguments[a];return t=e.call.apply(e,[this].concat(n))||this,t.appliedClasses={appear:{},enter:{},exit:{}},t.onEnter=function(o,c){var l=t.resolveArguments(o,c),u=l[0],p=l[1];t.removeClasses(u,"exit"),t.addClass(u,p?"appear":"enter","base"),t.props.onEnter&&t.props.onEnter(o,c)},t.onEntering=function(o,c){var l=t.resolveArguments(o,c),u=l[0],p=l[1],f=p?"appear":"enter";t.addClass(u,f,"active"),t.props.onEntering&&t.props.onEntering(o,c)},t.onEntered=function(o,c){var l=t.resolveArguments(o,c),u=l[0],p=l[1],f=p?"appear":"enter";t.removeClasses(u,f),t.addClass(u,f,"done"),t.props.onEntered&&t.props.onEntered(o,c)},t.onExit=function(o){var c=t.resolveArguments(o),l=c[0];t.removeClasses(l,"appear"),t.removeClasses(l,"enter"),t.addClass(l,"exit","base"),t.props.onExit&&t.props.onExit(o)},t.onExiting=function(o){var c=t.resolveArguments(o),l=c[0];t.addClass(l,"exit","active"),t.props.onExiting&&t.props.onExiting(o)},t.onExited=function(o){var c=t.resolveArguments(o),l=c[0];t.removeClasses(l,"exit"),t.addClass(l,"exit","done"),t.props.onExited&&t.props.onExited(o)},t.resolveArguments=function(o,c){return t.props.nodeRef?[t.props.nodeRef.current,o]:[o,c]},t.getClassNames=function(o){var c=t.props.classNames,l=typeof c=="string",u=l&&c?c+"-":"",p=l?""+u+o:c[o],f=l?p+"-active":c[o+"Active"],m=l?p+"-done":c[o+"Done"];return{baseClassName:p,activeClassName:f,doneClassName:m}},t}var i=r.prototype;return i.addClass=function(s,n,a){var o=this.getClassNames(n)[a+"ClassName"],c=this.getClassNames("enter"),l=c.doneClassName;n==="appear"&&a==="done"&&l&&(o+=" "+l),a==="active"&&s&&s.scrollTop,o&&(this.appliedClasses[n][a]=o,Ve(s,o))},i.removeClasses=function(s,n){var a=this.appliedClasses[n],o=a.base,c=a.active,l=a.done;this.appliedClasses[n]={},o&&_(s,o),c&&_(s,c),l&&_(s,l)},i.render=function(){var s=this.props;s.classNames;var n=Q(s,["classNames"]);return E.createElement(Ue,L({},n,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},r}(E.Component);M.defaultProps={classNames:""};M.propTypes={};const ne=M;const[Be]=W("overlay"),se=e=>{const r=d.useRef(null),{visible:i,duration:t}=e,s=a=>{e.lockScroll&&ye(a,!0)},n=()=>{const a=Object.assign(Object.assign({zIndex:e.zIndex!==void 0?+e.zIndex:void 0,touchAction:e.lockScroll&&"none"},e.style),e.customStyle);return K(t)&&(a.animationDuration=`${t}ms`),Z(e.stopPropagation,x.jsx("div",Object.assign({ref:r,style:a,onClick:o=>{var c;o.target===o.currentTarget&&((c=e.onClick)===null||c===void 0||c.call(e,o))},className:T(Be(),e.className)},{children:e.children})))};return J("touchmove",s,{target:r}),x.jsx(ne,Object.assign({nodeRef:r,mountOnEnter:!0,unmountOnExit:!0,in:i,timeout:t,classNames:"rv-fade"},{children:n()}))};se.defaultProps={stopPropagation:["click"],lockScroll:!0,duration:300};const Ge=se;function He(e){const{interceptor:r,args:i,done:t,canceled:s}=e;if(r){const n=r.apply(null,i||[]);be(n)?n.then(a=>{a?t():s&&s()}).catch(Ce):n?t():s&&s()}else t()}function Fe(e){return(typeof e=="function"?e():e)||document.body}function We(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function Ke(e,r){if(We()&&e){const i=Fe(e);return ge.createPortal(r,i)}return r}const Ze=d.createContext({}),qe=Ze;let S=0;const H="rv-overflow-hidden";function Je(e,r){const i=je(),t=a=>{i.move(a);const o=i.deltaY.current>0?"10":"01",c=we(a.target,e.current);if(!c)return;const{scrollHeight:l,offsetHeight:u,scrollTop:p}=c;let f="11";p===0?f=u>=l?"00":"01":p+u>=l&&(f="10"),f!=="11"&&i.isVertical()&&!(parseInt(f,2)&parseInt(o,2))&&a.cancelable&&a.preventDefault()},s=()=>{document.addEventListener("touchstart",i.start),document.addEventListener("touchmove",t,!1),S||document.body.classList.add(H),S++},n=()=>{S&&(document.removeEventListener("touchstart",i.start),document.removeEventListener("touchmove",t),S--,S||document.body.classList.remove(H))};d.useEffect(()=>{if(r)return s(),()=>{n()}},[r])}let F=2e3;const[k]=W("popup"),re=d.forwardRef((e,r)=>{var i;const{round:t,closeable:s,title:n,description:a,children:o,duration:c,closeIcon:l,position:u}=e,p=d.useRef(!1),f=d.useRef((i=e.zIndex)!==null&&i!==void 0?i:F),m=d.useRef(),[h,oe]=d.useState(e.visible),[ie,A]=d.useState(h),ae=d.useMemo(()=>{const v=Object.assign({zIndex:f.current},e.style);if(K(e.duration)){const C=e.position==="center"?"animationDuration":"transitionDuration";v[C]=`${e.duration}ms`}return v},[f.current,e.position,e.style,e.duration]),ce=()=>{var v;e.zIndex!==void 0?f.current=+e.zIndex:f.current=F++,p.current=!0,(v=e.onOpen)===null||v===void 0||v.call(e)},w=()=>{He({interceptor:e.beforeClose,args:["close"],done:()=>{var v;p.current=!1,(v=e.onClose)===null||v===void 0||v.call(e)}})},le=v=>{var C;(C=e.onClickOverlay)===null||C===void 0||C.call(e,v),e.closeOnClickOverlay&&w()},ue=()=>e.overlay?x.jsx(Ge,{visible:h,className:e.overlayClass,customStyle:e.overlayStyle,zIndex:f.current,duration:c,onClick:le}):null,fe=v=>{e.onClickCloseIcon&&e.onClickCloseIcon(v),w()},de=()=>{if(s){const{closeIconPosition:v}=e;return l?x.jsx("div",Object.assign({className:T(k("close-icon",v)),onClick:fe},{children:l})):null}return null},pe=()=>n?x.jsx("div",Object.assign({className:T(k("title"))},{children:n})):null,ve=()=>a?x.jsx("div",Object.assign({className:T(k("description"))},{children:a})):null,me=()=>{const{safeAreaInsetBottom:v}=e;return Z(e.stopPropagation,x.jsxs("div",Object.assign({ref:m,style:Object.assign(Object.assign({},ae),{display:!h&&!ie?"none":void 0}),className:T(k({round:t,[u]:u}),{"rv-safe-area-bottom":v},e.className),onClick:e.onClick},{children:[pe(),ve(),o,de()]})))},he=()=>{const{transition:v,destroyOnClose:C,forceRender:Ee}=e,xe=u==="center"?"rv-fade":`rv-popup-slide-${u}`;return x.jsx(ne,Object.assign({in:h,nodeRef:m,timeout:c,classNames:v||xe,mountOnEnter:!Ee,unmountOnExit:C,onEnter:ce,onEntered:e.onOpened,onExited:()=>{var P;A(!1),(P=e.onClosed)===null||P===void 0||P.call(e)}},{children:me()}))};return J("popstate",()=>{e.closeOnPopstate&&w()}),V(()=>{h&&A(!0)},[h]),V(()=>{oe(e.visible)},[e.visible]),Je(m,h&&e.lockScroll),d.useImperativeHandle(r,()=>({popupRef:m})),Ke(e.teleport,x.jsxs(qe.Provider,Object.assign({value:{visible:h}},{children:[ue(),he()]})))});re.defaultProps={duration:300,overlay:!0,lockScroll:!0,position:"center",closeIcon:x.jsx(Ae,{}),closeIconPosition:"top-right",closeOnClickOverlay:!0,stopPropagation:["click"],teleport:()=>document.body};const nt=re;export{Ae as C,De as I,nt as P,Oe as a,We as c,tt as e,K as i,Fe as r};
