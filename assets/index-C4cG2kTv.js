import{b as l,g as Je,cc as et,cd as Te,r as He,u as J,m as tt,ce as be,ai as ye,cf as Ie,N as K,e as nt,c as ne,cg as rt,ch as ot,ci as lt,b1 as at,C as Ce,aF as it,cj as st,ck as ct,af as ut,cl as dt,cm as We,cn as re,co as mt,bZ as ft,b0 as ue,aK as Ee,t as gt,an as pt,cp as Oe,cq as ht,aC as ze,aH as bt,$ as yt,ad as Ct,aB as vt,av as xt,w as $t,bh as wt,bK as St,o as It,cr as De,cs as Et,ct as Ot,a4 as Ft,cu as Mt,cv as jt,d as Nt,cw as Pt,cx as Rt,cy as _t}from"./index-zuoAzybi.js";import{C as qe,R as Vt}from"./row-CGLc5Rxu.js";import{R as Lt,a as Tt}from"./ExclamationCircleFilled-YxpfJDAi.js";const Fe=e=>typeof e=="object"&&e!=null&&e.nodeType===1,Me=(e,t)=>(!t||e!=="hidden")&&e!=="visible"&&e!=="clip",pe=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const n=getComputedStyle(e,null);return Me(n.overflowY,t)||Me(n.overflowX,t)||(r=>{const o=(a=>{if(!a.ownerDocument||!a.ownerDocument.defaultView)return null;try{return a.ownerDocument.defaultView.frameElement}catch{return null}})(r);return!!o&&(o.clientHeight<r.scrollHeight||o.clientWidth<r.scrollWidth)})(e)}return!1},ce=(e,t,n,r,o,a,i,u)=>a<e&&i>t||a>e&&i<t?0:a<=e&&u<=n||i>=t&&u>=n?a-e-r:i>t&&u<n||a<e&&u>n?i-t+o:0,Ht=e=>{const t=e.parentElement;return t??(e.getRootNode().host||null)},je=(e,t)=>{var n,r,o,a;if(typeof document>"u")return[];const{scrollMode:i,block:u,inline:c,boundary:f,skipOverflowHiddenElements:w}=t,h=typeof f=="function"?f:W=>W!==f;if(!Fe(e))throw new TypeError("Invalid target");const S=document.scrollingElement||document.documentElement,N=[];let v=e;for(;Fe(v)&&h(v);){if(v=Ht(v),v===S){N.push(v);break}v!=null&&v===document.body&&pe(v)&&!pe(document.documentElement)||v!=null&&pe(v,w)&&N.push(v)}const x=(r=(n=window.visualViewport)==null?void 0:n.width)!=null?r:innerWidth,I=(a=(o=window.visualViewport)==null?void 0:o.height)!=null?a:innerHeight,{scrollX:$,scrollY:M}=window,{height:s,width:g,top:d,right:b,bottom:R,left:E}=e.getBoundingClientRect(),{top:j,right:V,bottom:_,left:q}=(W=>{const m=window.getComputedStyle(W);return{top:parseFloat(m.scrollMarginTop)||0,right:parseFloat(m.scrollMarginRight)||0,bottom:parseFloat(m.scrollMarginBottom)||0,left:parseFloat(m.scrollMarginLeft)||0}})(e);let O=u==="start"||u==="nearest"?d-j:u==="end"?R+_:d+s/2-j+_,y=c==="center"?E+g/2-q+V:c==="end"?b+V:E-q;const L=[];for(let W=0;W<N.length;W++){const m=N[W],{height:H,width:T,top:A,right:z,bottom:B,left:Y}=m.getBoundingClientRect();if(i==="if-needed"&&d>=0&&E>=0&&R<=I&&b<=x&&d>=A&&R<=B&&E>=Y&&b<=z)return L;const ee=getComputedStyle(m),Q=parseInt(ee.borderLeftWidth,10),X=parseInt(ee.borderTopWidth,10),p=parseInt(ee.borderRightWidth,10),F=parseInt(ee.borderBottomWidth,10);let C=0,D=0;const k="offsetWidth"in m?m.offsetWidth-m.clientWidth-Q-p:0,U="offsetHeight"in m?m.offsetHeight-m.clientHeight-X-F:0,oe="offsetWidth"in m?m.offsetWidth===0?0:T/m.offsetWidth:0,te="offsetHeight"in m?m.offsetHeight===0?0:H/m.offsetHeight:0;if(S===m)C=u==="start"?O:u==="end"?O-I:u==="nearest"?ce(M,M+I,I,X,F,M+O,M+O+s,s):O-I/2,D=c==="start"?y:c==="center"?y-x/2:c==="end"?y-x:ce($,$+x,x,Q,p,$+y,$+y+g,g),C=Math.max(0,C+M),D=Math.max(0,D+$);else{C=u==="start"?O-A-X:u==="end"?O-B+F+U:u==="nearest"?ce(A,B,H,X,F+U,O,O+s,s):O-(A+H/2)+U/2,D=c==="start"?y-Y-Q:c==="center"?y-(Y+T/2)+k/2:c==="end"?y-z+p+k:ce(Y,z,T,Q,p+k,y,y+g,g);const{scrollLeft:P,scrollTop:Z}=m;C=te===0?0:Math.max(0,Math.min(Z+C/te,m.scrollHeight-H/te+U)),D=oe===0?0:Math.max(0,Math.min(P+D/oe,m.scrollWidth-T/oe+k)),O+=Z-C,y+=P-D}L.push({el:m,top:C,left:D})}return L},Wt=e=>e===!1?{block:"end",inline:"nearest"}:(t=>t===Object(t)&&Object.keys(t).length!==0)(e)?e:{block:"start",inline:"nearest"};function zt(e,t){if(!e.isConnected||!(o=>{let a=o;for(;a&&a.parentNode;){if(a.parentNode===document)return!0;a=a.parentNode instanceof ShadowRoot?a.parentNode.host:a.parentNode}return!1})(e))return;const n=(o=>{const a=window.getComputedStyle(o);return{top:parseFloat(a.scrollMarginTop)||0,right:parseFloat(a.scrollMarginRight)||0,bottom:parseFloat(a.scrollMarginBottom)||0,left:parseFloat(a.scrollMarginLeft)||0}})(e);if((o=>typeof o=="object"&&typeof o.behavior=="function")(t))return t.behavior(je(e,t));const r=typeof t=="boolean"||t==null?void 0:t.behavior;for(const{el:o,top:a,left:i}of je(e,Wt(t))){const u=a-n.top+n.bottom,c=i-n.left+n.right;o.scroll({top:u,left:c,behavior:r})}}function de(e){const[t,n]=l.useState(e);return l.useEffect(()=>{const r=setTimeout(()=>{n(e)},e.length?0:10);return()=>{clearTimeout(r)}},[e]),t}const Dt=e=>{const{componentCls:t}=e,n=`${t}-show-help`,r=`${t}-show-help-item`;return{[n]:{transition:`opacity ${e.motionDurationFast} ${e.motionEaseInOut}`,"&-appear, &-enter":{opacity:0,"&-active":{opacity:1}},"&-leave":{opacity:1,"&-active":{opacity:0}},[r]:{overflow:"hidden",transition:`height ${e.motionDurationFast} ${e.motionEaseInOut},
                     opacity ${e.motionDurationFast} ${e.motionEaseInOut},
                     transform ${e.motionDurationFast} ${e.motionEaseInOut} !important`,[`&${r}-appear, &${r}-enter`]:{transform:"translateY(-5px)",opacity:0,"&-active":{transform:"translateY(0)",opacity:1}},[`&${r}-leave-active`]:{transform:"translateY(-5px)"}}}}},qt=e=>({legend:{display:"block",width:"100%",marginBottom:e.marginLG,padding:0,color:e.colorTextDescription,fontSize:e.fontSizeLG,lineHeight:"inherit",border:0,borderBottom:`${J(e.lineWidth)} ${e.lineType} ${e.colorBorder}`},'input[type="search"]':{boxSizing:"border-box"},'input[type="radio"], input[type="checkbox"]':{lineHeight:"normal"},'input[type="file"]':{display:"block"},'input[type="range"]':{display:"block",width:"100%"},"select[multiple], select[size]":{height:"auto"},"input[type='file']:focus,\n  input[type='radio']:focus,\n  input[type='checkbox']:focus":{outline:0,boxShadow:`0 0 0 ${J(e.controlOutlineWidth)} ${e.controlOutline}`},output:{display:"block",paddingTop:15,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight}}),Ne=(e,t)=>{const{formItemCls:n}=e;return{[n]:{[`${n}-label > label`]:{height:t},[`${n}-control-input`]:{minHeight:t}}}},At=e=>{const{componentCls:t}=e;return{[e.componentCls]:Object.assign(Object.assign(Object.assign({},He(e)),qt(e)),{[`${t}-text`]:{display:"inline-block",paddingInlineEnd:e.paddingSM},"&-small":Object.assign({},Ne(e,e.controlHeightSM)),"&-large":Object.assign({},Ne(e,e.controlHeightLG))})}},Bt=e=>{const{formItemCls:t,iconCls:n,componentCls:r,rootPrefixCls:o,antCls:a,labelRequiredMarkColor:i,labelColor:u,labelFontSize:c,labelHeight:f,labelColonMarginInlineStart:w,labelColonMarginInlineEnd:h,itemMarginBottom:S}=e;return{[t]:Object.assign(Object.assign({},He(e)),{marginBottom:S,verticalAlign:"top","&-with-help":{transition:"none"},[`&-hidden,
        &-hidden${a}-row`]:{display:"none"},"&-has-warning":{[`${t}-split`]:{color:e.colorError}},"&-has-error":{[`${t}-split`]:{color:e.colorWarning}},[`${t}-label`]:{flexGrow:0,overflow:"hidden",whiteSpace:"nowrap",textAlign:"end",verticalAlign:"middle","&-left":{textAlign:"start"},"&-wrap":{overflow:"unset",lineHeight:e.lineHeight,whiteSpace:"unset"},"> label":{position:"relative",display:"inline-flex",alignItems:"center",maxWidth:"100%",height:f,color:u,fontSize:c,[`> ${n}`]:{fontSize:e.fontSize,verticalAlign:"top"},[`&${t}-required:not(${t}-required-mark-optional)::before`]:{display:"inline-block",marginInlineEnd:e.marginXXS,color:i,fontSize:e.fontSize,fontFamily:"SimSun, sans-serif",lineHeight:1,content:'"*"',[`${r}-hide-required-mark &`]:{display:"none"}},[`${t}-optional`]:{display:"inline-block",marginInlineStart:e.marginXXS,color:e.colorTextDescription,[`${r}-hide-required-mark &`]:{display:"none"}},[`${t}-tooltip`]:{color:e.colorTextDescription,cursor:"help",writingMode:"horizontal-tb",marginInlineStart:e.marginXXS},"&::after":{content:'":"',position:"relative",marginBlock:0,marginInlineStart:w,marginInlineEnd:h},[`&${t}-no-colon::after`]:{content:'"\\a0"'}}},[`${t}-control`]:{"--ant-display":"flex",flexDirection:"column",flexGrow:1,[`&:first-child:not([class^="'${o}-col-'"]):not([class*="' ${o}-col-'"])`]:{width:"100%"},"&-input":{position:"relative",display:"flex",alignItems:"center",minHeight:e.controlHeight,"&-content":{flex:"auto",maxWidth:"100%"}}},[t]:{"&-additional":{display:"flex",flexDirection:"column"},"&-explain, &-extra":{clear:"both",color:e.colorTextDescription,fontSize:e.fontSize,lineHeight:e.lineHeight},"&-explain-connected":{width:"100%"},"&-extra":{minHeight:e.controlHeightSM,transition:`color ${e.motionDurationMid} ${e.motionEaseOut}`},"&-explain":{"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning}}},[`&-with-help ${t}-explain`]:{height:"auto",opacity:1},[`${t}-feedback-icon`]:{fontSize:e.fontSize,textAlign:"center",visibility:"visible",animationName:Te,animationDuration:e.motionDurationMid,animationTimingFunction:e.motionEaseOutBack,pointerEvents:"none","&-success":{color:e.colorSuccess},"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning},"&-validating":{color:e.colorPrimary}}})}},Pe=(e,t)=>{const{formItemCls:n}=e;return{[`${t}-horizontal`]:{[`${n}-label`]:{flexGrow:0},[`${n}-control`]:{flex:"1 1 0",minWidth:0},[`${n}-label[class$='-24'], ${n}-label[class*='-24 ']`]:{[`& + ${n}-control`]:{minWidth:"unset"}}}}},Xt=e=>{const{componentCls:t,formItemCls:n,inlineItemMarginBottom:r}=e;return{[`${t}-inline`]:{display:"flex",flexWrap:"wrap",[n]:{flex:"none",marginInlineEnd:e.margin,marginBottom:r,"&-row":{flexWrap:"nowrap"},[`> ${n}-label,
        > ${n}-control`]:{display:"inline-block",verticalAlign:"top"},[`> ${n}-label`]:{flex:"none"},[`${t}-text`]:{display:"inline-block"},[`${n}-has-feedback`]:{display:"inline-block"}}}}},G=e=>({padding:e.verticalLabelPadding,margin:e.verticalLabelMargin,whiteSpace:"initial",textAlign:"start","> label":{margin:0,"&::after":{visibility:"hidden"}}}),Ae=e=>{const{componentCls:t,formItemCls:n,rootPrefixCls:r}=e;return{[`${n} ${n}-label`]:G(e),[`${t}:not(${t}-inline)`]:{[n]:{flexWrap:"wrap",[`${n}-label, ${n}-control`]:{[`&:not([class*=" ${r}-col-xs"])`]:{flex:"0 0 100%",maxWidth:"100%"}}}}}},kt=e=>{const{componentCls:t,formItemCls:n,antCls:r}=e;return{[`${t}-vertical`]:{[`${n}:not(${n}-horizontal)`]:{[`${n}-row`]:{flexDirection:"column"},[`${n}-label > label`]:{height:"auto"},[`${n}-control`]:{width:"100%"},[`${n}-label,
        ${r}-col-24${n}-label,
        ${r}-col-xl-24${n}-label`]:G(e)}},[`@media (max-width: ${J(e.screenXSMax)})`]:[Ae(e),{[t]:{[`${n}:not(${n}-horizontal)`]:{[`${r}-col-xs-24${n}-label`]:G(e)}}}],[`@media (max-width: ${J(e.screenSMMax)})`]:{[t]:{[`${n}:not(${n}-horizontal)`]:{[`${r}-col-sm-24${n}-label`]:G(e)}}},[`@media (max-width: ${J(e.screenMDMax)})`]:{[t]:{[`${n}:not(${n}-horizontal)`]:{[`${r}-col-md-24${n}-label`]:G(e)}}},[`@media (max-width: ${J(e.screenLGMax)})`]:{[t]:{[`${n}:not(${n}-horizontal)`]:{[`${r}-col-lg-24${n}-label`]:G(e)}}}}},Kt=e=>{const{formItemCls:t,antCls:n}=e;return{[`${t}-vertical`]:{[`${t}-row`]:{flexDirection:"column"},[`${t}-label > label`]:{height:"auto"},[`${t}-control`]:{width:"100%"}},[`${t}-vertical ${t}-label,
      ${n}-col-24${t}-label,
      ${n}-col-xl-24${t}-label`]:G(e),[`@media (max-width: ${J(e.screenXSMax)})`]:[Ae(e),{[t]:{[`${n}-col-xs-24${t}-label`]:G(e)}}],[`@media (max-width: ${J(e.screenSMMax)})`]:{[t]:{[`${n}-col-sm-24${t}-label`]:G(e)}},[`@media (max-width: ${J(e.screenMDMax)})`]:{[t]:{[`${n}-col-md-24${t}-label`]:G(e)}},[`@media (max-width: ${J(e.screenLGMax)})`]:{[t]:{[`${n}-col-lg-24${t}-label`]:G(e)}}}},Gt=e=>({labelRequiredMarkColor:e.colorError,labelColor:e.colorTextHeading,labelFontSize:e.fontSize,labelHeight:e.controlHeight,labelColonMarginInlineStart:e.marginXXS/2,labelColonMarginInlineEnd:e.marginXS,itemMarginBottom:e.marginLG,verticalLabelPadding:`0 0 ${e.paddingXS}px`,verticalLabelMargin:0,inlineItemMarginBottom:0}),Be=(e,t)=>tt(e,{formItemCls:`${e.componentCls}-item`,rootPrefixCls:t}),ve=Je("Form",(e,t)=>{let{rootPrefixCls:n}=t;const r=Be(e,n);return[At(r),Bt(r),Dt(r),Pe(r,r.componentCls),Pe(r,r.formItemCls),Xt(r),kt(r),Kt(r),et(r),Te]},Gt,{order:-1e3}),Re=[];function he(e,t,n){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return{key:typeof e=="string"?e:`${t}-${r}`,error:e,errorStatus:n}}const Xe=e=>{let{help:t,helpStatus:n,errors:r=Re,warnings:o=Re,className:a,fieldId:i,onVisibleChanged:u}=e;const{prefixCls:c}=l.useContext(be),f=`${c}-item-explain`,w=ye(c),[h,S,N]=ve(c,w),v=l.useMemo(()=>Ie(c),[c]),x=de(r),I=de(o),$=l.useMemo(()=>t!=null?[he(t,"help",n)]:[].concat(K(x.map((g,d)=>he(g,"error","error",d))),K(I.map((g,d)=>he(g,"warning","warning",d)))),[t,n,x,I]),M=l.useMemo(()=>{const g={};return $.forEach(d=>{let{key:b}=d;g[b]=(g[b]||0)+1}),$.map((d,b)=>Object.assign(Object.assign({},d),{key:g[d.key]>1?`${d.key}-fallback-${b}`:d.key}))},[$]),s={};return i&&(s.id=`${i}_help`),h(l.createElement(nt,{motionDeadline:v.motionDeadline,motionName:`${c}-show-help`,visible:!!M.length,onVisibleChanged:u},g=>{const{className:d,style:b}=g;return l.createElement("div",Object.assign({},s,{className:ne(f,d,N,w,a,S),style:b,role:"alert"}),l.createElement(rt,Object.assign({keys:M},Ie(c),{motionName:`${c}-show-help-item`,component:!1}),R=>{const{key:E,error:j,errorStatus:V,className:_,style:q}=R;return l.createElement("div",{key:E,className:ne(_,{[`${f}-${V}`]:V}),style:q},j)}))}))},Yt=["parentNode"],Qt="form_item";function ie(e){return e===void 0||e===!1?[]:Array.isArray(e)?e:[e]}function ke(e,t){if(!e.length)return;const n=e.join("_");return t?`${t}_${n}`:Yt.includes(n)?`${Qt}_${n}`:n}function Ke(e,t,n,r,o,a){let i=r;return a!==void 0?i=a:n.validating?i="validating":e.length?i="error":t.length?i="warning":(n.touched||o&&n.validated)&&(i="success"),i}function _e(e){return ie(e).join("_")}function Ve(e,t){const n=t.getFieldInstance(e),r=lt(n);if(r)return r;const o=ke(ie(e),t.__INTERNAL__.name);if(o)return document.getElementById(o)}function Ge(e){const[t]=ot(),n=l.useRef({}),r=l.useMemo(()=>e??Object.assign(Object.assign({},t),{__INTERNAL__:{itemRef:o=>a=>{const i=_e(o);a?n.current[i]=a:delete n.current[i]}},scrollToField:function(o){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const i=Ve(o,r);i&&zt(i,Object.assign({scrollMode:"if-needed",block:"nearest"},a))},focusField:o=>{var a;const i=Ve(o,r);i&&((a=i.focus)===null||a===void 0||a.call(i))},getFieldInstance:o=>{const a=_e(o);return n.current[a]}}),[e,t]);return[r]}var Ut=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const Zt=(e,t)=>{const n=l.useContext(at),{getPrefixCls:r,direction:o,form:a}=l.useContext(Ce),{prefixCls:i,className:u,rootClassName:c,size:f,disabled:w=n,form:h,colon:S,labelAlign:N,labelWrap:v,labelCol:x,wrapperCol:I,hideRequiredMark:$,layout:M="horizontal",scrollToFirstError:s,requiredMark:g,onFinishFailed:d,name:b,style:R,feedbackIcons:E,variant:j}=e,V=Ut(e,["prefixCls","className","rootClassName","size","disabled","form","colon","labelAlign","labelWrap","labelCol","wrapperCol","hideRequiredMark","layout","scrollToFirstError","requiredMark","onFinishFailed","name","style","feedbackIcons","variant"]),_=it(f),q=l.useContext(st),O=l.useMemo(()=>g!==void 0?g:$?!1:a&&a.requiredMark!==void 0?a.requiredMark:!0,[$,g,a]),y=S??(a==null?void 0:a.colon),L=r("form",i),W=ye(L),[m,H,T]=ve(L,W),A=ne(L,`${L}-${M}`,{[`${L}-hide-required-mark`]:O===!1,[`${L}-rtl`]:o==="rtl",[`${L}-${_}`]:_},T,W,H,a==null?void 0:a.className,u,c),[z]=Ge(h),{__INTERNAL__:B}=z;B.name=b;const Y=l.useMemo(()=>({name:b,labelAlign:N,labelCol:x,labelWrap:v,wrapperCol:I,vertical:M==="vertical",colon:y,requiredMark:O,itemRef:B.itemRef,form:z,feedbackIcons:E}),[b,N,x,I,M,y,O,z,E]),ee=l.useRef(null);l.useImperativeHandle(t,()=>{var p;return Object.assign(Object.assign({},z),{nativeElement:(p=ee.current)===null||p===void 0?void 0:p.nativeElement})});const Q=(p,F)=>{if(p){let C={block:"nearest"};typeof p=="object"&&(C=Object.assign(Object.assign({},C),p)),z.scrollToField(F,C),C.focus&&z.focusField(F)}},X=p=>{if(d==null||d(p),p.errorFields.length){const F=p.errorFields[0].name;if(s!==void 0){Q(s,F);return}a&&a.scrollToFirstError!==void 0&&Q(a.scrollToFirstError,F)}};return m(l.createElement(ct.Provider,{value:j},l.createElement(ut,{disabled:w},l.createElement(dt.Provider,{value:_},l.createElement(We,{validateMessages:q},l.createElement(re.Provider,{value:Y},l.createElement(mt,Object.assign({id:b},V,{name:b,onFinishFailed:X,form:z,ref:ee,style:Object.assign(Object.assign({},a==null?void 0:a.style),R),className:A}))))))))},Jt=l.forwardRef(Zt);function en(e){if(typeof e=="function")return e;const t=ft(e);return t.length<=1?t[0]:t}const Ye=()=>{const{status:e,errors:t=[],warnings:n=[]}=l.useContext(ue);return{status:e,errors:t,warnings:n}};Ye.Context=ue;function tn(e){const[t,n]=l.useState(e),r=l.useRef(null),o=l.useRef([]),a=l.useRef(!1);l.useEffect(()=>(a.current=!1,()=>{a.current=!0,Ee.cancel(r.current),r.current=null}),[]);function i(u){a.current||(r.current===null&&(o.current=[],r.current=Ee(()=>{r.current=null,n(c=>{let f=c;return o.current.forEach(w=>{f=w(f)}),f})})),o.current.push(u))}return[t,i]}function nn(){const{itemRef:e}=l.useContext(re),t=l.useRef({});function n(r,o){const a=o&&typeof o=="object"&&o.ref,i=r.join("_");return(t.current.name!==i||t.current.originRef!==a)&&(t.current.name=i,t.current.originRef=a,t.current.ref=gt(e(r),a)),t.current.ref}return n}const rn=e=>{const{formItemCls:t}=e;return{"@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)":{[`${t}-control`]:{display:"flex"}}}},on=pt(["Form","item-item"],(e,t)=>{let{rootPrefixCls:n}=t;const r=Be(e,n);return[rn(r)]});var ln=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const an=24,sn=e=>{const{prefixCls:t,status:n,labelCol:r,wrapperCol:o,children:a,errors:i,warnings:u,_internalItemRender:c,extra:f,help:w,fieldId:h,marginBottom:S,onErrorVisibleChanged:N,label:v}=e,x=`${t}-item`,I=l.useContext(re),$=l.useMemo(()=>{let y=Object.assign({},o||I.wrapperCol||{});return v===null&&!r&&!o&&I.labelCol&&[void 0,"xs","sm","md","lg","xl","xxl"].forEach(W=>{const m=W?[W]:[],H=Oe(I.labelCol,m),T=typeof H=="object"?H:{},A=Oe(y,m),z=typeof A=="object"?A:{};"span"in T&&!("offset"in z)&&T.span<an&&(y=ht(y,[].concat(m,["offset"]),T.span))}),y},[o,I]),M=ne(`${x}-control`,$.className),s=l.useMemo(()=>ln(I,["labelCol","wrapperCol"]),[I]),g=l.useRef(null),[d,b]=l.useState(0);ze(()=>{f&&g.current?b(g.current.clientHeight):b(0)},[f]);const R=l.createElement("div",{className:`${x}-control-input`},l.createElement("div",{className:`${x}-control-input-content`},a)),E=l.useMemo(()=>({prefixCls:t,status:n}),[t,n]),j=S!==null||i.length||u.length?l.createElement(be.Provider,{value:E},l.createElement(Xe,{fieldId:h,errors:i,warnings:u,help:w,helpStatus:n,className:`${x}-explain-connected`,onVisibleChanged:N})):null,V={};h&&(V.id=`${h}_extra`);const _=f?l.createElement("div",Object.assign({},V,{className:`${x}-extra`,ref:g}),f):null,q=j||_?l.createElement("div",{className:`${x}-additional`,style:S?{minHeight:S+d}:{}},j,_):null,O=c&&c.mark==="pro_table_render"&&c.render?c.render(e,{input:R,errorList:j,extra:_}):l.createElement(l.Fragment,null,R,q);return l.createElement(re.Provider,{value:s},l.createElement(qe,Object.assign({},$,{className:M}),O),l.createElement(on,{prefixCls:t}))};var cn={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"question-circle",theme:"outlined"},un=function(t,n){return l.createElement(bt,yt({},t,{ref:n,icon:cn}))},dn=l.forwardRef(un),mn=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function fn(e){return e?typeof e=="object"&&!l.isValidElement(e)?e:{title:e}:null}const gn=e=>{let{prefixCls:t,label:n,htmlFor:r,labelCol:o,labelAlign:a,colon:i,required:u,requiredMark:c,tooltip:f,vertical:w}=e;var h;const[S]=Ct("Form"),{labelAlign:N,labelCol:v,labelWrap:x,colon:I}=l.useContext(re);if(!n)return null;const $=o||v||{},M=a||N,s=`${t}-item-label`,g=ne(s,M==="left"&&`${s}-left`,$.className,{[`${s}-wrap`]:!!x});let d=n;const b=i===!0||I!==!1&&i!==!1;b&&!w&&typeof n=="string"&&n.trim()&&(d=n.replace(/[:|：]\s*$/,""));const E=fn(f);if(E){const{icon:q=l.createElement(dn,null)}=E,O=mn(E,["icon"]),y=l.createElement(vt,Object.assign({},O),l.cloneElement(q,{className:`${t}-item-tooltip`,title:"",onClick:L=>{L.preventDefault()},tabIndex:null}));d=l.createElement(l.Fragment,null,d,y)}const j=c==="optional",V=typeof c=="function";V?d=c(d,{required:!!u}):j&&!u&&(d=l.createElement(l.Fragment,null,d,l.createElement("span",{className:`${t}-item-optional`,title:""},(S==null?void 0:S.optional)||((h=xt.Form)===null||h===void 0?void 0:h.optional))));const _=ne({[`${t}-item-required`]:u,[`${t}-item-required-mark-optional`]:j||V,[`${t}-item-no-colon`]:!b});return l.createElement(qe,Object.assign({},$,{className:g}),l.createElement("label",{htmlFor:r,className:_,title:typeof n=="string"?n:""},d))},pn={success:Lt,warning:Tt,error:$t,validating:wt};function Qe(e){let{children:t,errors:n,warnings:r,hasFeedback:o,validateStatus:a,prefixCls:i,meta:u,noStyle:c}=e;const f=`${i}-item`,{feedbackIcons:w}=l.useContext(re),h=Ke(n,r,u,null,!!o,a),{isFormItemInput:S,status:N,hasFeedback:v,feedbackIcon:x}=l.useContext(ue),I=l.useMemo(()=>{var $;let M;if(o){const g=o!==!0&&o.icons||w,d=h&&(($=g==null?void 0:g({status:h,errors:n,warnings:r}))===null||$===void 0?void 0:$[h]),b=h&&pn[h];M=d!==!1&&b?l.createElement("span",{className:ne(`${f}-feedback-icon`,`${f}-feedback-icon-${h}`)},d||l.createElement(b,null)):null}const s={status:h||"",errors:n,warnings:r,hasFeedback:!!o,feedbackIcon:M,isFormItemInput:!0};return c&&(s.status=(h??N)||"",s.isFormItemInput=S,s.hasFeedback=!!(o??v),s.feedbackIcon=o!==void 0?s.feedbackIcon:x),s},[h,o,c,S,N]);return l.createElement(ue.Provider,{value:I},t)}var hn=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function bn(e){const{prefixCls:t,className:n,rootClassName:r,style:o,help:a,errors:i,warnings:u,validateStatus:c,meta:f,hasFeedback:w,hidden:h,children:S,fieldId:N,required:v,isRequired:x,onSubItemMetaChange:I,layout:$}=e,M=hn(e,["prefixCls","className","rootClassName","style","help","errors","warnings","validateStatus","meta","hasFeedback","hidden","children","fieldId","required","isRequired","onSubItemMetaChange","layout"]),s=`${t}-item`,{requiredMark:g,vertical:d}=l.useContext(re),b=d||$==="vertical",R=l.useRef(null),E=de(i),j=de(u),V=a!=null,_=!!(V||i.length||u.length),q=!!R.current&&St(R.current),[O,y]=l.useState(null);ze(()=>{if(_&&R.current){const T=getComputedStyle(R.current);y(parseInt(T.marginBottom,10))}},[_,q]);const L=T=>{T||y(null)},m=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;const A=T?E:f.errors,z=T?j:f.warnings;return Ke(A,z,f,"",!!w,c)}(),H=ne(s,n,r,{[`${s}-with-help`]:V||E.length||j.length,[`${s}-has-feedback`]:m&&w,[`${s}-has-success`]:m==="success",[`${s}-has-warning`]:m==="warning",[`${s}-has-error`]:m==="error",[`${s}-is-validating`]:m==="validating",[`${s}-hidden`]:h,[`${s}-${$}`]:$});return l.createElement("div",{className:H,style:o,ref:R},l.createElement(Vt,Object.assign({className:`${s}-row`},It(M,["_internalItemRender","colon","dependencies","extra","fieldKey","getValueFromEvent","getValueProps","htmlFor","id","initialValue","isListField","label","labelAlign","labelCol","labelWrap","messageVariables","name","normalize","noStyle","preserve","requiredMark","rules","shouldUpdate","trigger","tooltip","validateFirst","validateTrigger","valuePropName","wrapperCol","validateDebounce"])),l.createElement(gn,Object.assign({htmlFor:N},e,{requiredMark:g,required:v??x,prefixCls:t,vertical:b})),l.createElement(sn,Object.assign({},e,f,{errors:E,warnings:j,prefixCls:t,status:m,help:a,marginBottom:O,onErrorVisibleChanged:L}),l.createElement(De.Provider,{value:I},l.createElement(Qe,{prefixCls:t,meta:f,errors:f.errors,warnings:f.warnings,hasFeedback:w,validateStatus:m},S)))),!!O&&l.createElement("div",{className:`${s}-margin-offset`,style:{marginBottom:-O}}))}const yn="__SPLIT__";function Cn(e,t){const n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every(o=>{const a=e[o],i=t[o];return a===i||typeof a=="function"||typeof i=="function"})}const vn=l.memo(e=>{let{children:t}=e;return t},(e,t)=>Cn(e.control,t.control)&&e.update===t.update&&e.childProps.length===t.childProps.length&&e.childProps.every((n,r)=>n===t.childProps[r]));function Le(){return{errors:[],warnings:[],touched:!1,validating:!1,name:[],validated:!1}}function xn(e){const{name:t,noStyle:n,className:r,dependencies:o,prefixCls:a,shouldUpdate:i,rules:u,children:c,required:f,label:w,messageVariables:h,trigger:S="onChange",validateTrigger:N,hidden:v,help:x,layout:I}=e,{getPrefixCls:$}=l.useContext(Ce),{name:M}=l.useContext(re),s=en(c),g=typeof s=="function",d=l.useContext(De),{validateTrigger:b}=l.useContext(Et),R=N!==void 0?N:b,E=t!=null,j=$("form",a),V=ye(j),[_,q,O]=ve(j,V);Pt();const y=l.useContext(Ot),L=l.useRef(),[W,m]=tn({}),[H,T]=Ft(()=>Le()),A=p=>{const F=y==null?void 0:y.getKey(p.name);if(T(p.destroy?Le():p,!0),n&&x!==!1&&d){let C=p.name;if(p.destroy)C=L.current||C;else if(F!==void 0){const[D,k]=F;C=[D].concat(K(k)),L.current=C}d(p,C)}},z=(p,F)=>{m(C=>{const D=Object.assign({},C),U=[].concat(K(p.name.slice(0,-1)),K(F)).join(yn);return p.destroy?delete D[U]:D[U]=p,D})},[B,Y]=l.useMemo(()=>{const p=K(H.errors),F=K(H.warnings);return Object.values(W).forEach(C=>{p.push.apply(p,K(C.errors||[])),F.push.apply(F,K(C.warnings||[]))}),[p,F]},[W,H.errors,H.warnings]),ee=nn();function Q(p,F,C){return n&&!v?l.createElement(Qe,{prefixCls:j,hasFeedback:e.hasFeedback,validateStatus:e.validateStatus,meta:H,errors:B,warnings:Y,noStyle:!0},p):l.createElement(bn,Object.assign({key:"row"},e,{className:ne(r,O,V,q),prefixCls:j,fieldId:F,isRequired:C,errors:B,warnings:Y,meta:H,onSubItemMetaChange:z,layout:I}),p)}if(!E&&!g&&!o)return _(Q(s));let X={};return typeof w=="string"?X.label=w:t&&(X.label=String(t)),h&&(X=Object.assign(Object.assign({},X),h)),_(l.createElement(Mt,Object.assign({},e,{messageVariables:X,trigger:S,validateTrigger:R,onMetaChange:A}),(p,F,C)=>{const D=ie(t).length&&F?F.name:[],k=ke(D,M),U=f!==void 0?f:!!(u!=null&&u.some(P=>{if(P&&typeof P=="object"&&P.required&&!P.warningOnly)return!0;if(typeof P=="function"){const Z=P(C);return(Z==null?void 0:Z.required)&&!(Z!=null&&Z.warningOnly)}return!1})),oe=Object.assign({},p);let te=null;if(Array.isArray(s)&&E)te=s;else if(!(g&&(!(i||o)||E))){if(!(o&&!g&&!E))if(l.isValidElement(s)){const P=Object.assign(Object.assign({},s.props),oe);if(P.id||(P.id=k),x||B.length>0||Y.length>0||e.extra){const ae=[];(x||B.length>0)&&ae.push(`${k}_help`),e.extra&&ae.push(`${k}_extra`),P["aria-describedby"]=ae.join(" ")}B.length>0&&(P["aria-invalid"]="true"),U&&(P["aria-required"]="true"),jt(s)&&(P.ref=ee(D,s)),new Set([].concat(K(ie(S)),K(ie(R)))).forEach(ae=>{P[ae]=function(){for(var xe,$e,me,we,fe,Se=arguments.length,ge=new Array(Se),se=0;se<Se;se++)ge[se]=arguments[se];(me=oe[ae])===null||me===void 0||(xe=me).call.apply(xe,[oe].concat(ge)),(fe=(we=s.props)[ae])===null||fe===void 0||($e=fe).call.apply($e,[we].concat(ge))}});const Ze=[P["aria-required"],P["aria-invalid"],P["aria-describedby"]];te=l.createElement(vn,{control:oe,update:s,childProps:Ze},Nt(s,P))}else g&&(i||o)&&!E?te=s(C):te=s}return Q(te,k,U)}))}const Ue=xn;Ue.useStatus=Ye;var $n=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const wn=e=>{var{prefixCls:t,children:n}=e,r=$n(e,["prefixCls","children"]);const{getPrefixCls:o}=l.useContext(Ce),a=o("form",t),i=l.useMemo(()=>({prefixCls:a,status:"error"}),[a]);return l.createElement(Rt,Object.assign({},r),(u,c,f)=>l.createElement(be.Provider,{value:i},n(u.map(w=>Object.assign(Object.assign({},w),{fieldKey:w.key})),c,{errors:f.errors,warnings:f.warnings})))};function Sn(){const{form:e}=l.useContext(re);return e}const le=Jt;le.Item=Ue;le.List=wn;le.ErrorList=Xe;le.useForm=Ge;le.useFormInstance=Sn;le.useWatch=_t;le.Provider=We;le.create=()=>{};export{le as F};
