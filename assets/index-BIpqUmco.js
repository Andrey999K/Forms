import{b as l,I as be,_ as Ce,g as tt,a5 as nt,cd as He,r as We,u as Z,m as rt,ce as ye,aW as ve,a6 as Fe,Z as G,e as ot,c as ne,a7 as lt,cf as at,cg as it,aa as st,C as xe,aD as ct,ch as ut,ci as dt,cj as mt,ck as ft,cl as De,cm as re,cn as gt,b_ as pt,aY as ue,aG as Oe,v as ht,co as bt,cp as Me,cq as Ct,aC as qe,ac as yt,Q as vt,ad as xt,x as $t,a8 as wt,bJ as St,o as It,cr as Be,cs as Et,ct as Ft,cu as Ot,cv as Mt,cw as jt,d as Nt,cx as Pt,cy as Rt,cz as _t}from"./index-Csa7EjWW.js";import{C as Ae,R as Vt}from"./row-DCLpaNZl.js";var Lt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"}}]},name:"check-circle",theme:"filled"},Tt=function(t,n){return l.createElement(be,Ce({},t,{ref:n,icon:Lt}))},zt=l.forwardRef(Tt),Ht={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"exclamation-circle",theme:"filled"},Wt=function(t,n){return l.createElement(be,Ce({},t,{ref:n,icon:Ht}))},Dt=l.forwardRef(Wt);const je=e=>typeof e=="object"&&e!=null&&e.nodeType===1,Ne=(e,t)=>(!t||e!=="hidden")&&e!=="visible"&&e!=="clip",pe=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const n=getComputedStyle(e,null);return Ne(n.overflowY,t)||Ne(n.overflowX,t)||(r=>{const o=(a=>{if(!a.ownerDocument||!a.ownerDocument.defaultView)return null;try{return a.ownerDocument.defaultView.frameElement}catch{return null}})(r);return!!o&&(o.clientHeight<r.scrollHeight||o.clientWidth<r.scrollWidth)})(e)}return!1},ce=(e,t,n,r,o,a,i,u)=>a<e&&i>t||a>e&&i<t?0:a<=e&&u<=n||i>=t&&u>=n?a-e-r:i>t&&u<n||a<e&&u>n?i-t+o:0,qt=e=>{const t=e.parentElement;return t??(e.getRootNode().host||null)},Pe=(e,t)=>{var n,r,o,a;if(typeof document>"u")return[];const{scrollMode:i,block:u,inline:c,boundary:f,skipOverflowHiddenElements:w}=t,h=typeof f=="function"?f:H=>H!==f;if(!je(e))throw new TypeError("Invalid target");const S=document.scrollingElement||document.documentElement,N=[];let v=e;for(;je(v)&&h(v);){if(v=qt(v),v===S){N.push(v);break}v!=null&&v===document.body&&pe(v)&&!pe(document.documentElement)||v!=null&&pe(v,w)&&N.push(v)}const x=(r=(n=window.visualViewport)==null?void 0:n.width)!=null?r:innerWidth,I=(a=(o=window.visualViewport)==null?void 0:o.height)!=null?a:innerHeight,{scrollX:$,scrollY:M}=window,{height:s,width:g,top:d,right:b,bottom:R,left:E}=e.getBoundingClientRect(),{top:j,right:V,bottom:_,left:q}=(H=>{const m=window.getComputedStyle(H);return{top:parseFloat(m.scrollMarginTop)||0,right:parseFloat(m.scrollMarginRight)||0,bottom:parseFloat(m.scrollMarginBottom)||0,left:parseFloat(m.scrollMarginLeft)||0}})(e);let F=u==="start"||u==="nearest"?d-j:u==="end"?R+_:d+s/2-j+_,C=c==="center"?E+g/2-q+V:c==="end"?b+V:E-q;const L=[];for(let H=0;H<N.length;H++){const m=N[H],{height:z,width:T,top:B,right:W,bottom:A,left:Y}=m.getBoundingClientRect();if(i==="if-needed"&&d>=0&&E>=0&&R<=I&&b<=x&&d>=B&&R<=A&&E>=Y&&b<=W)return L;const ee=getComputedStyle(m),Q=parseInt(ee.borderLeftWidth,10),k=parseInt(ee.borderTopWidth,10),p=parseInt(ee.borderRightWidth,10),O=parseInt(ee.borderBottomWidth,10);let y=0,D=0;const X="offsetWidth"in m?m.offsetWidth-m.clientWidth-Q-p:0,U="offsetHeight"in m?m.offsetHeight-m.clientHeight-k-O:0,oe="offsetWidth"in m?m.offsetWidth===0?0:T/m.offsetWidth:0,te="offsetHeight"in m?m.offsetHeight===0?0:z/m.offsetHeight:0;if(S===m)y=u==="start"?F:u==="end"?F-I:u==="nearest"?ce(M,M+I,I,k,O,M+F,M+F+s,s):F-I/2,D=c==="start"?C:c==="center"?C-x/2:c==="end"?C-x:ce($,$+x,x,Q,p,$+C,$+C+g,g),y=Math.max(0,y+M),D=Math.max(0,D+$);else{y=u==="start"?F-B-k:u==="end"?F-A+O+U:u==="nearest"?ce(B,A,z,k,O+U,F,F+s,s):F-(B+z/2)+U/2,D=c==="start"?C-Y-Q:c==="center"?C-(Y+T/2)+X/2:c==="end"?C-W+p+X:ce(Y,W,T,Q,p+X,C,C+g,g);const{scrollLeft:P,scrollTop:J}=m;y=te===0?0:Math.max(0,Math.min(J+y/te,m.scrollHeight-z/te+U)),D=oe===0?0:Math.max(0,Math.min(P+D/oe,m.scrollWidth-T/oe+X)),F+=J-y,C+=P-D}L.push({el:m,top:y,left:D})}return L},Bt=e=>e===!1?{block:"end",inline:"nearest"}:(t=>t===Object(t)&&Object.keys(t).length!==0)(e)?e:{block:"start",inline:"nearest"};function At(e,t){if(!e.isConnected||!(o=>{let a=o;for(;a&&a.parentNode;){if(a.parentNode===document)return!0;a=a.parentNode instanceof ShadowRoot?a.parentNode.host:a.parentNode}return!1})(e))return;const n=(o=>{const a=window.getComputedStyle(o);return{top:parseFloat(a.scrollMarginTop)||0,right:parseFloat(a.scrollMarginRight)||0,bottom:parseFloat(a.scrollMarginBottom)||0,left:parseFloat(a.scrollMarginLeft)||0}})(e);if((o=>typeof o=="object"&&typeof o.behavior=="function")(t))return t.behavior(Pe(e,t));const r=typeof t=="boolean"||t==null?void 0:t.behavior;for(const{el:o,top:a,left:i}of Pe(e,Bt(t))){const u=a-n.top+n.bottom,c=i-n.left+n.right;o.scroll({top:u,left:c,behavior:r})}}function de(e){const[t,n]=l.useState(e);return l.useEffect(()=>{const r=setTimeout(()=>{n(e)},e.length?0:10);return()=>{clearTimeout(r)}},[e]),t}const kt=e=>{const{componentCls:t}=e,n=`${t}-show-help`,r=`${t}-show-help-item`;return{[n]:{transition:`opacity ${e.motionDurationFast} ${e.motionEaseInOut}`,"&-appear, &-enter":{opacity:0,"&-active":{opacity:1}},"&-leave":{opacity:1,"&-active":{opacity:0}},[r]:{overflow:"hidden",transition:`height ${e.motionDurationFast} ${e.motionEaseInOut},
                     opacity ${e.motionDurationFast} ${e.motionEaseInOut},
                     transform ${e.motionDurationFast} ${e.motionEaseInOut} !important`,[`&${r}-appear, &${r}-enter`]:{transform:"translateY(-5px)",opacity:0,"&-active":{transform:"translateY(0)",opacity:1}},[`&${r}-leave-active`]:{transform:"translateY(-5px)"}}}}},Xt=e=>({legend:{display:"block",width:"100%",marginBottom:e.marginLG,padding:0,color:e.colorTextDescription,fontSize:e.fontSizeLG,lineHeight:"inherit",border:0,borderBottom:`${Z(e.lineWidth)} ${e.lineType} ${e.colorBorder}`},'input[type="search"]':{boxSizing:"border-box"},'input[type="radio"], input[type="checkbox"]':{lineHeight:"normal"},'input[type="file"]':{display:"block"},'input[type="range"]':{display:"block",width:"100%"},"select[multiple], select[size]":{height:"auto"},"input[type='file']:focus,\n  input[type='radio']:focus,\n  input[type='checkbox']:focus":{outline:0,boxShadow:`0 0 0 ${Z(e.controlOutlineWidth)} ${e.controlOutline}`},output:{display:"block",paddingTop:15,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight}}),Re=(e,t)=>{const{formItemCls:n}=e;return{[n]:{[`${n}-label > label`]:{height:t},[`${n}-control-input`]:{minHeight:t}}}},Gt=e=>{const{componentCls:t}=e;return{[e.componentCls]:Object.assign(Object.assign(Object.assign({},We(e)),Xt(e)),{[`${t}-text`]:{display:"inline-block",paddingInlineEnd:e.paddingSM},"&-small":Object.assign({},Re(e,e.controlHeightSM)),"&-large":Object.assign({},Re(e,e.controlHeightLG))})}},Kt=e=>{const{formItemCls:t,iconCls:n,componentCls:r,rootPrefixCls:o,antCls:a,labelRequiredMarkColor:i,labelColor:u,labelFontSize:c,labelHeight:f,labelColonMarginInlineStart:w,labelColonMarginInlineEnd:h,itemMarginBottom:S}=e;return{[t]:Object.assign(Object.assign({},We(e)),{marginBottom:S,verticalAlign:"top","&-with-help":{transition:"none"},[`&-hidden,
        &-hidden${a}-row`]:{display:"none"},"&-has-warning":{[`${t}-split`]:{color:e.colorError}},"&-has-error":{[`${t}-split`]:{color:e.colorWarning}},[`${t}-label`]:{flexGrow:0,overflow:"hidden",whiteSpace:"nowrap",textAlign:"end",verticalAlign:"middle","&-left":{textAlign:"start"},"&-wrap":{overflow:"unset",lineHeight:e.lineHeight,whiteSpace:"unset"},"> label":{position:"relative",display:"inline-flex",alignItems:"center",maxWidth:"100%",height:f,color:u,fontSize:c,[`> ${n}`]:{fontSize:e.fontSize,verticalAlign:"top"},[`&${t}-required:not(${t}-required-mark-optional)::before`]:{display:"inline-block",marginInlineEnd:e.marginXXS,color:i,fontSize:e.fontSize,fontFamily:"SimSun, sans-serif",lineHeight:1,content:'"*"',[`${r}-hide-required-mark &`]:{display:"none"}},[`${t}-optional`]:{display:"inline-block",marginInlineStart:e.marginXXS,color:e.colorTextDescription,[`${r}-hide-required-mark &`]:{display:"none"}},[`${t}-tooltip`]:{color:e.colorTextDescription,cursor:"help",writingMode:"horizontal-tb",marginInlineStart:e.marginXXS},"&::after":{content:'":"',position:"relative",marginBlock:0,marginInlineStart:w,marginInlineEnd:h},[`&${t}-no-colon::after`]:{content:'"\\a0"'}}},[`${t}-control`]:{"--ant-display":"flex",flexDirection:"column",flexGrow:1,[`&:first-child:not([class^="'${o}-col-'"]):not([class*="' ${o}-col-'"])`]:{width:"100%"},"&-input":{position:"relative",display:"flex",alignItems:"center",minHeight:e.controlHeight,"&-content":{flex:"auto",maxWidth:"100%"}}},[t]:{"&-additional":{display:"flex",flexDirection:"column"},"&-explain, &-extra":{clear:"both",color:e.colorTextDescription,fontSize:e.fontSize,lineHeight:e.lineHeight},"&-explain-connected":{width:"100%"},"&-extra":{minHeight:e.controlHeightSM,transition:`color ${e.motionDurationMid} ${e.motionEaseOut}`},"&-explain":{"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning}}},[`&-with-help ${t}-explain`]:{height:"auto",opacity:1},[`${t}-feedback-icon`]:{fontSize:e.fontSize,textAlign:"center",visibility:"visible",animationName:He,animationDuration:e.motionDurationMid,animationTimingFunction:e.motionEaseOutBack,pointerEvents:"none","&-success":{color:e.colorSuccess},"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning},"&-validating":{color:e.colorPrimary}}})}},_e=(e,t)=>{const{formItemCls:n}=e;return{[`${t}-horizontal`]:{[`${n}-label`]:{flexGrow:0},[`${n}-control`]:{flex:"1 1 0",minWidth:0},[`${n}-label[class$='-24'], ${n}-label[class*='-24 ']`]:{[`& + ${n}-control`]:{minWidth:"unset"}}}}},Yt=e=>{const{componentCls:t,formItemCls:n,inlineItemMarginBottom:r}=e;return{[`${t}-inline`]:{display:"flex",flexWrap:"wrap",[n]:{flex:"none",marginInlineEnd:e.margin,marginBottom:r,"&-row":{flexWrap:"nowrap"},[`> ${n}-label,
        > ${n}-control`]:{display:"inline-block",verticalAlign:"top"},[`> ${n}-label`]:{flex:"none"},[`${t}-text`]:{display:"inline-block"},[`${n}-has-feedback`]:{display:"inline-block"}}}}},K=e=>({padding:e.verticalLabelPadding,margin:e.verticalLabelMargin,whiteSpace:"initial",textAlign:"start","> label":{margin:0,"&::after":{visibility:"hidden"}}}),ke=e=>{const{componentCls:t,formItemCls:n,rootPrefixCls:r}=e;return{[`${n} ${n}-label`]:K(e),[`${t}:not(${t}-inline)`]:{[n]:{flexWrap:"wrap",[`${n}-label, ${n}-control`]:{[`&:not([class*=" ${r}-col-xs"])`]:{flex:"0 0 100%",maxWidth:"100%"}}}}}},Qt=e=>{const{componentCls:t,formItemCls:n,antCls:r}=e;return{[`${t}-vertical`]:{[`${n}:not(${n}-horizontal)`]:{[`${n}-row`]:{flexDirection:"column"},[`${n}-label > label`]:{height:"auto"},[`${n}-control`]:{width:"100%"},[`${n}-label,
        ${r}-col-24${n}-label,
        ${r}-col-xl-24${n}-label`]:K(e)}},[`@media (max-width: ${Z(e.screenXSMax)})`]:[ke(e),{[t]:{[`${n}:not(${n}-horizontal)`]:{[`${r}-col-xs-24${n}-label`]:K(e)}}}],[`@media (max-width: ${Z(e.screenSMMax)})`]:{[t]:{[`${n}:not(${n}-horizontal)`]:{[`${r}-col-sm-24${n}-label`]:K(e)}}},[`@media (max-width: ${Z(e.screenMDMax)})`]:{[t]:{[`${n}:not(${n}-horizontal)`]:{[`${r}-col-md-24${n}-label`]:K(e)}}},[`@media (max-width: ${Z(e.screenLGMax)})`]:{[t]:{[`${n}:not(${n}-horizontal)`]:{[`${r}-col-lg-24${n}-label`]:K(e)}}}}},Ut=e=>{const{formItemCls:t,antCls:n}=e;return{[`${t}-vertical`]:{[`${t}-row`]:{flexDirection:"column"},[`${t}-label > label`]:{height:"auto"},[`${t}-control`]:{width:"100%"}},[`${t}-vertical ${t}-label,
      ${n}-col-24${t}-label,
      ${n}-col-xl-24${t}-label`]:K(e),[`@media (max-width: ${Z(e.screenXSMax)})`]:[ke(e),{[t]:{[`${n}-col-xs-24${t}-label`]:K(e)}}],[`@media (max-width: ${Z(e.screenSMMax)})`]:{[t]:{[`${n}-col-sm-24${t}-label`]:K(e)}},[`@media (max-width: ${Z(e.screenMDMax)})`]:{[t]:{[`${n}-col-md-24${t}-label`]:K(e)}},[`@media (max-width: ${Z(e.screenLGMax)})`]:{[t]:{[`${n}-col-lg-24${t}-label`]:K(e)}}}},Jt=e=>({labelRequiredMarkColor:e.colorError,labelColor:e.colorTextHeading,labelFontSize:e.fontSize,labelHeight:e.controlHeight,labelColonMarginInlineStart:e.marginXXS/2,labelColonMarginInlineEnd:e.marginXS,itemMarginBottom:e.marginLG,verticalLabelPadding:`0 0 ${e.paddingXS}px`,verticalLabelMargin:0,inlineItemMarginBottom:0}),Xe=(e,t)=>rt(e,{formItemCls:`${e.componentCls}-item`,rootPrefixCls:t}),$e=tt("Form",(e,t)=>{let{rootPrefixCls:n}=t;const r=Xe(e,n);return[Gt(r),Kt(r),kt(r),_e(r,r.componentCls),_e(r,r.formItemCls),Yt(r),Qt(r),Ut(r),nt(r),He]},Jt,{order:-1e3}),Ve=[];function he(e,t,n){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return{key:typeof e=="string"?e:`${t}-${r}`,error:e,errorStatus:n}}const Ge=e=>{let{help:t,helpStatus:n,errors:r=Ve,warnings:o=Ve,className:a,fieldId:i,onVisibleChanged:u}=e;const{prefixCls:c}=l.useContext(ye),f=`${c}-item-explain`,w=ve(c),[h,S,N]=$e(c,w),v=l.useMemo(()=>Fe(c),[c]),x=de(r),I=de(o),$=l.useMemo(()=>t!=null?[he(t,"help",n)]:[].concat(G(x.map((g,d)=>he(g,"error","error",d))),G(I.map((g,d)=>he(g,"warning","warning",d)))),[t,n,x,I]),M=l.useMemo(()=>{const g={};return $.forEach(d=>{let{key:b}=d;g[b]=(g[b]||0)+1}),$.map((d,b)=>Object.assign(Object.assign({},d),{key:g[d.key]>1?`${d.key}-fallback-${b}`:d.key}))},[$]),s={};return i&&(s.id=`${i}_help`),h(l.createElement(ot,{motionDeadline:v.motionDeadline,motionName:`${c}-show-help`,visible:!!M.length,onVisibleChanged:u},g=>{const{className:d,style:b}=g;return l.createElement("div",Object.assign({},s,{className:ne(f,d,N,w,a,S),style:b,role:"alert"}),l.createElement(lt,Object.assign({keys:M},Fe(c),{motionName:`${c}-show-help-item`,component:!1}),R=>{const{key:E,error:j,errorStatus:V,className:_,style:q}=R;return l.createElement("div",{key:E,className:ne(_,{[`${f}-${V}`]:V}),style:q},j)}))}))},Zt=["parentNode"],en="form_item";function ie(e){return e===void 0||e===!1?[]:Array.isArray(e)?e:[e]}function Ke(e,t){if(!e.length)return;const n=e.join("_");return t?`${t}_${n}`:Zt.includes(n)?`${en}_${n}`:n}function Ye(e,t,n,r,o,a){let i=r;return a!==void 0?i=a:n.validating?i="validating":e.length?i="error":t.length?i="warning":(n.touched||o&&n.validated)&&(i="success"),i}function Le(e){return ie(e).join("_")}function Te(e,t){const n=t.getFieldInstance(e),r=it(n);if(r)return r;const o=Ke(ie(e),t.__INTERNAL__.name);if(o)return document.getElementById(o)}function Qe(e){const[t]=at(),n=l.useRef({}),r=l.useMemo(()=>e??Object.assign(Object.assign({},t),{__INTERNAL__:{itemRef:o=>a=>{const i=Le(o);a?n.current[i]=a:delete n.current[i]}},scrollToField:function(o){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const i=Te(o,r);i&&At(i,Object.assign({scrollMode:"if-needed",block:"nearest"},a))},focusField:o=>{var a;const i=Te(o,r);i&&((a=i.focus)===null||a===void 0||a.call(i))},getFieldInstance:o=>{const a=Le(o);return n.current[a]}}),[e,t]);return[r]}var tn=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const nn=(e,t)=>{const n=l.useContext(st),{getPrefixCls:r,direction:o,form:a}=l.useContext(xe),{prefixCls:i,className:u,rootClassName:c,size:f,disabled:w=n,form:h,colon:S,labelAlign:N,labelWrap:v,labelCol:x,wrapperCol:I,hideRequiredMark:$,layout:M="horizontal",scrollToFirstError:s,requiredMark:g,onFinishFailed:d,name:b,style:R,feedbackIcons:E,variant:j}=e,V=tn(e,["prefixCls","className","rootClassName","size","disabled","form","colon","labelAlign","labelWrap","labelCol","wrapperCol","hideRequiredMark","layout","scrollToFirstError","requiredMark","onFinishFailed","name","style","feedbackIcons","variant"]),_=ct(f),q=l.useContext(ut),F=l.useMemo(()=>g!==void 0?g:$?!1:a&&a.requiredMark!==void 0?a.requiredMark:!0,[$,g,a]),C=S??(a==null?void 0:a.colon),L=r("form",i),H=ve(L),[m,z,T]=$e(L,H),B=ne(L,`${L}-${M}`,{[`${L}-hide-required-mark`]:F===!1,[`${L}-rtl`]:o==="rtl",[`${L}-${_}`]:_},T,H,z,a==null?void 0:a.className,u,c),[W]=Qe(h),{__INTERNAL__:A}=W;A.name=b;const Y=l.useMemo(()=>({name:b,labelAlign:N,labelCol:x,labelWrap:v,wrapperCol:I,vertical:M==="vertical",colon:C,requiredMark:F,itemRef:A.itemRef,form:W,feedbackIcons:E}),[b,N,x,I,M,C,F,W,E]),ee=l.useRef(null);l.useImperativeHandle(t,()=>{var p;return Object.assign(Object.assign({},W),{nativeElement:(p=ee.current)===null||p===void 0?void 0:p.nativeElement})});const Q=(p,O)=>{if(p){let y={block:"nearest"};typeof p=="object"&&(y=Object.assign(Object.assign({},y),p)),W.scrollToField(O,y),y.focus&&W.focusField(O)}},k=p=>{if(d==null||d(p),p.errorFields.length){const O=p.errorFields[0].name;if(s!==void 0){Q(s,O);return}a&&a.scrollToFirstError!==void 0&&Q(a.scrollToFirstError,O)}};return m(l.createElement(dt.Provider,{value:j},l.createElement(mt,{disabled:w},l.createElement(ft.Provider,{value:_},l.createElement(De,{validateMessages:q},l.createElement(re.Provider,{value:Y},l.createElement(gt,Object.assign({id:b},V,{name:b,onFinishFailed:k,form:W,ref:ee,style:Object.assign(Object.assign({},a==null?void 0:a.style),R),className:B}))))))))},rn=l.forwardRef(nn);function on(e){if(typeof e=="function")return e;const t=pt(e);return t.length<=1?t[0]:t}const Ue=()=>{const{status:e,errors:t=[],warnings:n=[]}=l.useContext(ue);return{status:e,errors:t,warnings:n}};Ue.Context=ue;function ln(e){const[t,n]=l.useState(e),r=l.useRef(null),o=l.useRef([]),a=l.useRef(!1);l.useEffect(()=>(a.current=!1,()=>{a.current=!0,Oe.cancel(r.current),r.current=null}),[]);function i(u){a.current||(r.current===null&&(o.current=[],r.current=Oe(()=>{r.current=null,n(c=>{let f=c;return o.current.forEach(w=>{f=w(f)}),f})})),o.current.push(u))}return[t,i]}function an(){const{itemRef:e}=l.useContext(re),t=l.useRef({});function n(r,o){const a=o&&typeof o=="object"&&o.ref,i=r.join("_");return(t.current.name!==i||t.current.originRef!==a)&&(t.current.name=i,t.current.originRef=a,t.current.ref=ht(e(r),a)),t.current.ref}return n}const sn=e=>{const{formItemCls:t}=e;return{"@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)":{[`${t}-control`]:{display:"flex"}}}},cn=bt(["Form","item-item"],(e,t)=>{let{rootPrefixCls:n}=t;const r=Xe(e,n);return[sn(r)]});var un=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const dn=24,mn=e=>{const{prefixCls:t,status:n,labelCol:r,wrapperCol:o,children:a,errors:i,warnings:u,_internalItemRender:c,extra:f,help:w,fieldId:h,marginBottom:S,onErrorVisibleChanged:N,label:v}=e,x=`${t}-item`,I=l.useContext(re),$=l.useMemo(()=>{let C=Object.assign({},o||I.wrapperCol||{});return v===null&&!r&&!o&&I.labelCol&&[void 0,"xs","sm","md","lg","xl","xxl"].forEach(H=>{const m=H?[H]:[],z=Me(I.labelCol,m),T=typeof z=="object"?z:{},B=Me(C,m),W=typeof B=="object"?B:{};"span"in T&&!("offset"in W)&&T.span<dn&&(C=Ct(C,[].concat(m,["offset"]),T.span))}),C},[o,I]),M=ne(`${x}-control`,$.className),s=l.useMemo(()=>un(I,["labelCol","wrapperCol"]),[I]),g=l.useRef(null),[d,b]=l.useState(0);qe(()=>{f&&g.current?b(g.current.clientHeight):b(0)},[f]);const R=l.createElement("div",{className:`${x}-control-input`},l.createElement("div",{className:`${x}-control-input-content`},a)),E=l.useMemo(()=>({prefixCls:t,status:n}),[t,n]),j=S!==null||i.length||u.length?l.createElement(ye.Provider,{value:E},l.createElement(Ge,{fieldId:h,errors:i,warnings:u,help:w,helpStatus:n,className:`${x}-explain-connected`,onVisibleChanged:N})):null,V={};h&&(V.id=`${h}_extra`);const _=f?l.createElement("div",Object.assign({},V,{className:`${x}-extra`,ref:g}),f):null,q=j||_?l.createElement("div",{className:`${x}-additional`,style:S?{minHeight:S+d}:{}},j,_):null,F=c&&c.mark==="pro_table_render"&&c.render?c.render(e,{input:R,errorList:j,extra:_}):l.createElement(l.Fragment,null,R,q);return l.createElement(re.Provider,{value:s},l.createElement(Ae,Object.assign({},$,{className:M}),F),l.createElement(cn,{prefixCls:t}))};var fn={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"question-circle",theme:"outlined"},gn=function(t,n){return l.createElement(be,Ce({},t,{ref:n,icon:fn}))},pn=l.forwardRef(gn),hn=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function bn(e){return e?typeof e=="object"&&!l.isValidElement(e)?e:{title:e}:null}const Cn=e=>{let{prefixCls:t,label:n,htmlFor:r,labelCol:o,labelAlign:a,colon:i,required:u,requiredMark:c,tooltip:f,vertical:w}=e;var h;const[S]=yt("Form"),{labelAlign:N,labelCol:v,labelWrap:x,colon:I}=l.useContext(re);if(!n)return null;const $=o||v||{},M=a||N,s=`${t}-item-label`,g=ne(s,M==="left"&&`${s}-left`,$.className,{[`${s}-wrap`]:!!x});let d=n;const b=i===!0||I!==!1&&i!==!1;b&&!w&&typeof n=="string"&&n.trim()&&(d=n.replace(/[:|：]\s*$/,""));const E=bn(f);if(E){const{icon:q=l.createElement(pn,null)}=E,F=hn(E,["icon"]),C=l.createElement(vt,Object.assign({},F),l.cloneElement(q,{className:`${t}-item-tooltip`,title:"",onClick:L=>{L.preventDefault()},tabIndex:null}));d=l.createElement(l.Fragment,null,d,C)}const j=c==="optional",V=typeof c=="function";V?d=c(d,{required:!!u}):j&&!u&&(d=l.createElement(l.Fragment,null,d,l.createElement("span",{className:`${t}-item-optional`,title:""},(S==null?void 0:S.optional)||((h=xt.Form)===null||h===void 0?void 0:h.optional))));const _=ne({[`${t}-item-required`]:u,[`${t}-item-required-mark-optional`]:j||V,[`${t}-item-no-colon`]:!b});return l.createElement(Ae,Object.assign({},$,{className:g}),l.createElement("label",{htmlFor:r,className:_,title:typeof n=="string"?n:""},d))},yn={success:zt,warning:Dt,error:$t,validating:wt};function Je(e){let{children:t,errors:n,warnings:r,hasFeedback:o,validateStatus:a,prefixCls:i,meta:u,noStyle:c}=e;const f=`${i}-item`,{feedbackIcons:w}=l.useContext(re),h=Ye(n,r,u,null,!!o,a),{isFormItemInput:S,status:N,hasFeedback:v,feedbackIcon:x}=l.useContext(ue),I=l.useMemo(()=>{var $;let M;if(o){const g=o!==!0&&o.icons||w,d=h&&(($=g==null?void 0:g({status:h,errors:n,warnings:r}))===null||$===void 0?void 0:$[h]),b=h&&yn[h];M=d!==!1&&b?l.createElement("span",{className:ne(`${f}-feedback-icon`,`${f}-feedback-icon-${h}`)},d||l.createElement(b,null)):null}const s={status:h||"",errors:n,warnings:r,hasFeedback:!!o,feedbackIcon:M,isFormItemInput:!0};return c&&(s.status=(h??N)||"",s.isFormItemInput=S,s.hasFeedback=!!(o??v),s.feedbackIcon=o!==void 0?s.feedbackIcon:x),s},[h,o,c,S,N]);return l.createElement(ue.Provider,{value:I},t)}var vn=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function xn(e){const{prefixCls:t,className:n,rootClassName:r,style:o,help:a,errors:i,warnings:u,validateStatus:c,meta:f,hasFeedback:w,hidden:h,children:S,fieldId:N,required:v,isRequired:x,onSubItemMetaChange:I,layout:$}=e,M=vn(e,["prefixCls","className","rootClassName","style","help","errors","warnings","validateStatus","meta","hasFeedback","hidden","children","fieldId","required","isRequired","onSubItemMetaChange","layout"]),s=`${t}-item`,{requiredMark:g,vertical:d}=l.useContext(re),b=d||$==="vertical",R=l.useRef(null),E=de(i),j=de(u),V=a!=null,_=!!(V||i.length||u.length),q=!!R.current&&St(R.current),[F,C]=l.useState(null);qe(()=>{if(_&&R.current){const T=getComputedStyle(R.current);C(parseInt(T.marginBottom,10))}},[_,q]);const L=T=>{T||C(null)},m=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;const B=T?E:f.errors,W=T?j:f.warnings;return Ye(B,W,f,"",!!w,c)}(),z=ne(s,n,r,{[`${s}-with-help`]:V||E.length||j.length,[`${s}-has-feedback`]:m&&w,[`${s}-has-success`]:m==="success",[`${s}-has-warning`]:m==="warning",[`${s}-has-error`]:m==="error",[`${s}-is-validating`]:m==="validating",[`${s}-hidden`]:h,[`${s}-${$}`]:$});return l.createElement("div",{className:z,style:o,ref:R},l.createElement(Vt,Object.assign({className:`${s}-row`},It(M,["_internalItemRender","colon","dependencies","extra","fieldKey","getValueFromEvent","getValueProps","htmlFor","id","initialValue","isListField","label","labelAlign","labelCol","labelWrap","messageVariables","name","normalize","noStyle","preserve","requiredMark","rules","shouldUpdate","trigger","tooltip","validateFirst","validateTrigger","valuePropName","wrapperCol","validateDebounce"])),l.createElement(Cn,Object.assign({htmlFor:N},e,{requiredMark:g,required:v??x,prefixCls:t,vertical:b})),l.createElement(mn,Object.assign({},e,f,{errors:E,warnings:j,prefixCls:t,status:m,help:a,marginBottom:F,onErrorVisibleChanged:L}),l.createElement(Be.Provider,{value:I},l.createElement(Je,{prefixCls:t,meta:f,errors:f.errors,warnings:f.warnings,hasFeedback:w,validateStatus:m},S)))),!!F&&l.createElement("div",{className:`${s}-margin-offset`,style:{marginBottom:-F}}))}const $n="__SPLIT__";function wn(e,t){const n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every(o=>{const a=e[o],i=t[o];return a===i||typeof a=="function"||typeof i=="function"})}const Sn=l.memo(e=>{let{children:t}=e;return t},(e,t)=>wn(e.control,t.control)&&e.update===t.update&&e.childProps.length===t.childProps.length&&e.childProps.every((n,r)=>n===t.childProps[r]));function ze(){return{errors:[],warnings:[],touched:!1,validating:!1,name:[],validated:!1}}function In(e){const{name:t,noStyle:n,className:r,dependencies:o,prefixCls:a,shouldUpdate:i,rules:u,children:c,required:f,label:w,messageVariables:h,trigger:S="onChange",validateTrigger:N,hidden:v,help:x,layout:I}=e,{getPrefixCls:$}=l.useContext(xe),{name:M}=l.useContext(re),s=on(c),g=typeof s=="function",d=l.useContext(Be),{validateTrigger:b}=l.useContext(Et),R=N!==void 0?N:b,E=t!=null,j=$("form",a),V=ve(j),[_,q,F]=$e(j,V);Pt();const C=l.useContext(Ft),L=l.useRef(),[H,m]=ln({}),[z,T]=Ot(()=>ze()),B=p=>{const O=C==null?void 0:C.getKey(p.name);if(T(p.destroy?ze():p,!0),n&&x!==!1&&d){let y=p.name;if(p.destroy)y=L.current||y;else if(O!==void 0){const[D,X]=O;y=[D].concat(G(X)),L.current=y}d(p,y)}},W=(p,O)=>{m(y=>{const D=Object.assign({},y),U=[].concat(G(p.name.slice(0,-1)),G(O)).join($n);return p.destroy?delete D[U]:D[U]=p,D})},[A,Y]=l.useMemo(()=>{const p=G(z.errors),O=G(z.warnings);return Object.values(H).forEach(y=>{p.push.apply(p,G(y.errors||[])),O.push.apply(O,G(y.warnings||[]))}),[p,O]},[H,z.errors,z.warnings]),ee=an();function Q(p,O,y){return n&&!v?l.createElement(Je,{prefixCls:j,hasFeedback:e.hasFeedback,validateStatus:e.validateStatus,meta:z,errors:A,warnings:Y,noStyle:!0},p):l.createElement(xn,Object.assign({key:"row"},e,{className:ne(r,F,V,q),prefixCls:j,fieldId:O,isRequired:y,errors:A,warnings:Y,meta:z,onSubItemMetaChange:W,layout:I}),p)}if(!E&&!g&&!o)return _(Q(s));let k={};return typeof w=="string"?k.label=w:t&&(k.label=String(t)),h&&(k=Object.assign(Object.assign({},k),h)),_(l.createElement(Mt,Object.assign({},e,{messageVariables:k,trigger:S,validateTrigger:R,onMetaChange:B}),(p,O,y)=>{const D=ie(t).length&&O?O.name:[],X=Ke(D,M),U=f!==void 0?f:!!(u!=null&&u.some(P=>{if(P&&typeof P=="object"&&P.required&&!P.warningOnly)return!0;if(typeof P=="function"){const J=P(y);return(J==null?void 0:J.required)&&!(J!=null&&J.warningOnly)}return!1})),oe=Object.assign({},p);let te=null;if(Array.isArray(s)&&E)te=s;else if(!(g&&(!(i||o)||E))){if(!(o&&!g&&!E))if(l.isValidElement(s)){const P=Object.assign(Object.assign({},s.props),oe);if(P.id||(P.id=X),x||A.length>0||Y.length>0||e.extra){const ae=[];(x||A.length>0)&&ae.push(`${X}_help`),e.extra&&ae.push(`${X}_extra`),P["aria-describedby"]=ae.join(" ")}A.length>0&&(P["aria-invalid"]="true"),U&&(P["aria-required"]="true"),jt(s)&&(P.ref=ee(D,s)),new Set([].concat(G(ie(S)),G(ie(R)))).forEach(ae=>{P[ae]=function(){for(var we,Se,me,Ie,fe,Ee=arguments.length,ge=new Array(Ee),se=0;se<Ee;se++)ge[se]=arguments[se];(me=oe[ae])===null||me===void 0||(we=me).call.apply(we,[oe].concat(ge)),(fe=(Ie=s.props)[ae])===null||fe===void 0||(Se=fe).call.apply(Se,[Ie].concat(ge))}});const et=[P["aria-required"],P["aria-invalid"],P["aria-describedby"]];te=l.createElement(Sn,{control:oe,update:s,childProps:et},Nt(s,P))}else g&&(i||o)&&!E?te=s(y):te=s}return Q(te,X,U)}))}const Ze=In;Ze.useStatus=Ue;var En=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const Fn=e=>{var{prefixCls:t,children:n}=e,r=En(e,["prefixCls","children"]);const{getPrefixCls:o}=l.useContext(xe),a=o("form",t),i=l.useMemo(()=>({prefixCls:a,status:"error"}),[a]);return l.createElement(Rt,Object.assign({},r),(u,c,f)=>l.createElement(ye.Provider,{value:i},n(u.map(w=>Object.assign(Object.assign({},w),{fieldKey:w.key})),c,{errors:f.errors,warnings:f.warnings})))};function On(){const{form:e}=l.useContext(re);return e}const le=rn;le.Item=Ze;le.List=Fn;le.ErrorList=Ge;le.useForm=Qe;le.useFormInstance=On;le.useWatch=_t;le.Provider=De;le.create=()=>{};export{le as F,zt as R,Dt as a};
