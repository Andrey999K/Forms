import{b as a,a2 as V,bv as rt,B as ce,bw as we,a6 as h,bx as lt,c as N,P as R,O as me,t as Pe,S as U,M as de,e as Ne,aK as it,by as ge,aG as ve,bz as st,N as ct,ar as dt,x as Re,ag as ue,bA as Te,bB as ut,g as ft,az as mt,u as E,r as gt,aI as vt,m as Ct,C as oe,b2 as Ie,bC as bt,b6 as yt,bD as xt,aF as ne,bE as pt,a7 as ht,D as $t,A as St,y as Ot,z as Et,b8 as je,bF as wt,bG as Pt,bH as Nt,bI as Rt,ah as Tt}from"./index-p5UOtT9B.js";import{u as It,p as Ce,S as jt}from"./Skeleton-Ty2jmu_Q.js";import{g as Mt}from"./index-DTUMqTJ3.js";import{i as Bt}from"./fade-BKTpz-tX.js";import{w as zt}from"./index-u5w-hePJ.js";function Ht(){const[e,t]=a.useState([]),o=a.useCallback(n=>(t(r=>[].concat(V(r),[n])),()=>{t(r=>r.filter(i=>i!==n))}),[]);return[e,o]}function ie(e){return!!(e!=null&&e.then)}const Me=e=>{const{type:t,children:o,prefixCls:n,buttonProps:r,close:i,autoFocus:m,emitEvent:c,isSilent:s,quitOnNullishReturnValue:v,actionFn:l}=e,u=a.useRef(!1),d=a.useRef(null),[b,x]=rt(!1),g=function(){i==null||i.apply(void 0,arguments)};a.useEffect(()=>{let f=null;return m&&(f=setTimeout(()=>{var p;(p=d.current)===null||p===void 0||p.focus({preventScroll:!0})})),()=>{f&&clearTimeout(f)}},[]);const C=f=>{ie(f)&&(x(!0),f.then(function(){x(!1,!0),g.apply(void 0,arguments),u.current=!1},p=>{if(x(!1,!0),u.current=!1,!(s!=null&&s()))return Promise.reject(p)}))},y=f=>{if(u.current)return;if(u.current=!0,!l){g();return}let p;if(c){if(p=l(f),v&&!ie(p)){u.current=!1,g(f);return}}else if(l.length)p=l(i),u.current=!1;else if(p=l(),!ie(p)){g();return}C(p)};return a.createElement(ce,Object.assign({},we(t),{onClick:y,loading:b,prefixCls:n},r,{ref:d}),o)},ee=h.createContext({}),{Provider:Be}=ee,be=()=>{const{autoFocusButton:e,cancelButtonProps:t,cancelTextLocale:o,isSilent:n,mergedOkCancel:r,rootPrefixCls:i,close:m,onCancel:c,onConfirm:s}=a.useContext(ee);return r?h.createElement(Me,{isSilent:n,actionFn:c,close:function(){m==null||m.apply(void 0,arguments),s==null||s(!1)},autoFocus:e==="cancel",buttonProps:t,prefixCls:`${i}-btn`},o):null},ye=()=>{const{autoFocusButton:e,close:t,isSilent:o,okButtonProps:n,rootPrefixCls:r,okTextLocale:i,okType:m,onConfirm:c,onOk:s}=a.useContext(ee);return h.createElement(Me,{isSilent:o,type:m||"primary",actionFn:s,close:function(){t==null||t.apply(void 0,arguments),c==null||c(!0)},autoFocus:e==="ok",buttonProps:n,prefixCls:`${r}-btn`},i)};var ze=a.createContext({});function xe(e,t,o){var n=t;return!n&&o&&(n="".concat(e,"-").concat(o)),n}function pe(e,t){var o=e["page".concat(t?"Y":"X","Offset")],n="scroll".concat(t?"Top":"Left");if(typeof o!="number"){var r=e.document;o=r.documentElement[n],typeof o!="number"&&(o=r.body[n])}return o}function Ft(e){var t=e.getBoundingClientRect(),o={left:t.left,top:t.top},n=e.ownerDocument,r=n.defaultView||n.parentWindow;return o.left+=pe(r),o.top+=pe(r,!0),o}const Lt=a.memo(function(e){var t=e.children;return t},function(e,t){var o=t.shouldUpdate;return!o});var At={width:0,height:0,overflow:"hidden",outline:"none"},Dt={outline:"none"},He=h.forwardRef(function(e,t){var o=e.prefixCls,n=e.className,r=e.style,i=e.title,m=e.ariaId,c=e.footer,s=e.closable,v=e.closeIcon,l=e.onClose,u=e.children,d=e.bodyStyle,b=e.bodyProps,x=e.modalRender,g=e.onMouseDown,C=e.onMouseUp,y=e.holderRef,f=e.visible,p=e.forceRender,S=e.width,w=e.height,$=e.classNames,O=e.styles,j=h.useContext(ze),T=j.panel,Y=lt(y,T),L=a.useRef(),X=a.useRef();h.useImperativeHandle(t,function(){return{focus:function(){var M;(M=L.current)===null||M===void 0||M.focus({preventScroll:!0})},changeActive:function(M){var k=document,W=k.activeElement;M&&W===X.current?L.current.focus({preventScroll:!0}):!M&&W===L.current&&X.current.focus({preventScroll:!0})}}});var G={};S!==void 0&&(G.width=S),w!==void 0&&(G.height=w);var B=c?h.createElement("div",{className:N("".concat(o,"-footer"),$==null?void 0:$.footer),style:R({},O==null?void 0:O.footer)},c):null,z=i?h.createElement("div",{className:N("".concat(o,"-header"),$==null?void 0:$.header),style:R({},O==null?void 0:O.header)},h.createElement("div",{className:"".concat(o,"-title"),id:m},i)):null,A=a.useMemo(function(){return me(s)==="object"&&s!==null?s:s?{closeIcon:v??h.createElement("span",{className:"".concat(o,"-close-x")})}:{}},[s,v,o]),D=Pe(A,!0),q=me(s)==="object"&&s.disabled,J=s?h.createElement("button",U({type:"button",onClick:l,"aria-label":"Close"},D,{className:"".concat(o,"-close"),disabled:q}),A.closeIcon):null,K=h.createElement("div",{className:N("".concat(o,"-content"),$==null?void 0:$.content),style:O==null?void 0:O.content},J,z,h.createElement("div",U({className:N("".concat(o,"-body"),$==null?void 0:$.body),style:R(R({},d),O==null?void 0:O.body)},b),u),B);return h.createElement("div",{key:"dialog-element",role:"dialog","aria-labelledby":i?m:null,"aria-modal":"true",ref:Y,style:R(R({},r),G),className:N(o,n),onMouseDown:g,onMouseUp:C},h.createElement("div",{ref:L,tabIndex:0,style:Dt},h.createElement(Lt,{shouldUpdate:f||p},x?x(K):K)),h.createElement("div",{tabIndex:0,ref:X,style:At}))}),Fe=a.forwardRef(function(e,t){var o=e.prefixCls,n=e.title,r=e.style,i=e.className,m=e.visible,c=e.forceRender,s=e.destroyOnClose,v=e.motionName,l=e.ariaId,u=e.onVisibleChanged,d=e.mousePosition,b=a.useRef(),x=a.useState(),g=de(x,2),C=g[0],y=g[1],f={};C&&(f.transformOrigin=C);function p(){var S=Ft(b.current);y(d&&(d.x||d.y)?"".concat(d.x-S.left,"px ").concat(d.y-S.top,"px"):"")}return a.createElement(Ne,{visible:m,onVisibleChanged:u,onAppearPrepare:p,onEnterPrepare:p,forceRender:c,motionName:v,removeOnLeave:s,ref:b},function(S,w){var $=S.className,O=S.style;return a.createElement(He,U({},e,{ref:t,title:n,ariaId:l,prefixCls:o,holderRef:w,style:R(R(R({},O),r),f),className:N(i,$)}))})});Fe.displayName="Content";var Wt=function(t){var o=t.prefixCls,n=t.style,r=t.visible,i=t.maskProps,m=t.motionName,c=t.className;return a.createElement(Ne,{key:"mask",visible:r,motionName:m,leavedClassName:"".concat(o,"-mask-hidden")},function(s,v){var l=s.className,u=s.style;return a.createElement("div",U({ref:v,style:R(R({},u),n),className:N("".concat(o,"-mask"),l,c)},i))})},_t=function(t){var o=t.prefixCls,n=o===void 0?"rc-dialog":o,r=t.zIndex,i=t.visible,m=i===void 0?!1:i,c=t.keyboard,s=c===void 0?!0:c,v=t.focusTriggerAfterClose,l=v===void 0?!0:v,u=t.wrapStyle,d=t.wrapClassName,b=t.wrapProps,x=t.onClose,g=t.afterOpenChange,C=t.afterClose,y=t.transitionName,f=t.animation,p=t.closable,S=p===void 0?!0:p,w=t.mask,$=w===void 0?!0:w,O=t.maskTransitionName,j=t.maskAnimation,T=t.maskClosable,Y=T===void 0?!0:T,L=t.maskStyle,X=t.maskProps,G=t.rootClassName,B=t.classNames,z=t.styles,A=a.useRef(),D=a.useRef(),q=a.useRef(),J=a.useState(m),K=de(J,2),Q=K[0],M=K[1],k=it();function W(){ge(D.current,document.activeElement)||(A.current=document.activeElement)}function ae(){if(!ge(D.current,document.activeElement)){var P;(P=q.current)===null||P===void 0||P.focus()}}function H(P){if(P)ae();else{if(M(!1),$&&A.current&&l){try{A.current.focus({preventScroll:!0})}catch{}A.current=null}Q&&(C==null||C())}g==null||g(P)}function I(P){x==null||x(P)}var _=a.useRef(!1),re=a.useRef(),tt=function(){clearTimeout(re.current),_.current=!0},nt=function(){re.current=setTimeout(function(){_.current=!1})},fe=null;Y&&(fe=function(le){_.current?_.current=!1:D.current===le.target&&I(le)});function ot(P){if(s&&P.keyCode===ve.ESC){P.stopPropagation(),I(P);return}m&&P.keyCode===ve.TAB&&q.current.changeActive(!P.shiftKey)}a.useEffect(function(){m&&(M(!0),W())},[m]),a.useEffect(function(){return function(){clearTimeout(re.current)}},[]);var at=R(R(R({zIndex:r},u),z==null?void 0:z.wrapper),{},{display:Q?null:"none"});return a.createElement("div",U({className:N("".concat(n,"-root"),G)},Pe(t,{data:!0})),a.createElement(Wt,{prefixCls:n,visible:$&&m,motionName:xe(n,O,j),style:R(R({zIndex:r},L),z==null?void 0:z.mask),maskProps:X,className:B==null?void 0:B.mask}),a.createElement("div",U({tabIndex:-1,onKeyDown:ot,className:N("".concat(n,"-wrap"),d,B==null?void 0:B.wrapper),ref:D,onClick:fe,style:at},b),a.createElement(Fe,U({},t,{onMouseDown:tt,onMouseUp:nt,ref:q,closable:S,ariaId:k,prefixCls:n,visible:m&&Q,onClose:I,onVisibleChanged:H,motionName:xe(n,y,f)}))))},Le=function(t){var o=t.visible,n=t.getContainer,r=t.forceRender,i=t.destroyOnClose,m=i===void 0?!1:i,c=t.afterClose,s=t.panelRef,v=a.useState(o),l=de(v,2),u=l[0],d=l[1],b=a.useMemo(function(){return{panel:s}},[s]);return a.useEffect(function(){o&&d(!0)},[o]),!r&&m&&!u?null:a.createElement(ze.Provider,{value:b},a.createElement(st,{open:o||r||u,autoDestroy:!1,getContainer:n,autoLock:o||u},a.createElement(_t,U({},t,{destroyOnClose:m,afterClose:function(){c==null||c(),d(!1)}}))))};Le.displayName="Dialog";const Vt=()=>ct()&&window.document.documentElement;function he(){}const Gt=a.createContext({add:he,remove:he});function qt(e){const t=a.useContext(Gt),o=a.useRef(null);return dt(r=>{if(r){const i=e?r.querySelector(e):r;t.add(i),o.current=i}else t.remove(o.current)})}const $e=()=>{const{cancelButtonProps:e,cancelTextLocale:t,onCancel:o}=a.useContext(ee);return h.createElement(ce,Object.assign({onClick:o},e),t)},Se=()=>{const{confirmLoading:e,okButtonProps:t,okType:o,okTextLocale:n,onOk:r}=a.useContext(ee);return h.createElement(ce,Object.assign({},we(o),{loading:e,onClick:r},t),n)};function Ae(e,t){return h.createElement("span",{className:`${e}-close-x`},t||h.createElement(Re,{className:`${e}-close-icon`}))}const De=e=>{const{okText:t,okType:o="primary",cancelText:n,confirmLoading:r,onOk:i,onCancel:m,okButtonProps:c,cancelButtonProps:s,footer:v}=e,[l]=ue("Modal",Te()),u=t||(l==null?void 0:l.okText),d=n||(l==null?void 0:l.cancelText),b={confirmLoading:r,okButtonProps:c,cancelButtonProps:s,okTextLocale:u,cancelTextLocale:d,okType:o,onOk:i,onCancel:m},x=h.useMemo(()=>b,V(Object.values(b)));let g;return typeof v=="function"||typeof v>"u"?(g=h.createElement(h.Fragment,null,h.createElement($e,null),h.createElement(Se,null)),typeof v=="function"&&(g=v(g,{OkBtn:Se,CancelBtn:$e})),g=h.createElement(Be,{value:x},g)):g=v,h.createElement(ut,{disabled:!1},g)};function Oe(e){return{position:e,inset:0}}const Ut=e=>{const{componentCls:t,antCls:o}=e;return[{[`${t}-root`]:{[`${t}${o}-zoom-enter, ${t}${o}-zoom-appear`]:{transform:"none",opacity:0,animationDuration:e.motionDurationSlow,userSelect:"none"},[`${t}${o}-zoom-leave ${t}-content`]:{pointerEvents:"none"},[`${t}-mask`]:Object.assign(Object.assign({},Oe("fixed")),{zIndex:e.zIndexPopupBase,height:"100%",backgroundColor:e.colorBgMask,pointerEvents:"none",[`${t}-hidden`]:{display:"none"}}),[`${t}-wrap`]:Object.assign(Object.assign({},Oe("fixed")),{zIndex:e.zIndexPopupBase,overflow:"auto",outline:0,WebkitOverflowScrolling:"touch"})}},{[`${t}-root`]:Bt(e)}]},Xt=e=>{const{componentCls:t}=e;return[{[`${t}-root`]:{[`${t}-wrap-rtl`]:{direction:"rtl"},[`${t}-centered`]:{textAlign:"center","&::before":{display:"inline-block",width:0,height:"100%",verticalAlign:"middle",content:'""'},[t]:{top:0,display:"inline-block",paddingBottom:0,textAlign:"start",verticalAlign:"middle"}},[`@media (max-width: ${e.screenSMMax}px)`]:{[t]:{maxWidth:"calc(100vw - 16px)",margin:`${E(e.marginXS)} auto`},[`${t}-centered`]:{[t]:{flex:1}}}}},{[t]:Object.assign(Object.assign({},gt(e)),{pointerEvents:"none",position:"relative",top:100,width:"auto",maxWidth:`calc(100vw - ${E(e.calc(e.margin).mul(2).equal())})`,margin:"0 auto",paddingBottom:e.paddingLG,[`${t}-title`]:{margin:0,color:e.titleColor,fontWeight:e.fontWeightStrong,fontSize:e.titleFontSize,lineHeight:e.titleLineHeight,wordWrap:"break-word"},[`${t}-content`]:{position:"relative",backgroundColor:e.contentBg,backgroundClip:"padding-box",border:0,borderRadius:e.borderRadiusLG,boxShadow:e.boxShadow,pointerEvents:"auto",padding:e.contentPadding},[`${t}-close`]:Object.assign({position:"absolute",top:e.calc(e.modalHeaderHeight).sub(e.modalCloseBtnSize).div(2).equal(),insetInlineEnd:e.calc(e.modalHeaderHeight).sub(e.modalCloseBtnSize).div(2).equal(),zIndex:e.calc(e.zIndexPopupBase).add(10).equal(),padding:0,color:e.modalCloseIconColor,fontWeight:e.fontWeightStrong,lineHeight:1,textDecoration:"none",background:"transparent",borderRadius:e.borderRadiusSM,width:e.modalCloseBtnSize,height:e.modalCloseBtnSize,border:0,outline:0,cursor:"pointer",transition:`color ${e.motionDurationMid}, background-color ${e.motionDurationMid}`,"&-x":{display:"flex",fontSize:e.fontSizeLG,fontStyle:"normal",lineHeight:E(e.modalCloseBtnSize),justifyContent:"center",textTransform:"none",textRendering:"auto"},"&:disabled":{pointerEvents:"none"},"&:hover":{color:e.modalCloseIconHoverColor,backgroundColor:e.colorBgTextHover,textDecoration:"none"},"&:active":{backgroundColor:e.colorBgTextActive}},vt(e)),[`${t}-header`]:{color:e.colorText,background:e.headerBg,borderRadius:`${E(e.borderRadiusLG)} ${E(e.borderRadiusLG)} 0 0`,marginBottom:e.headerMarginBottom,padding:e.headerPadding,borderBottom:e.headerBorderBottom},[`${t}-body`]:{fontSize:e.fontSize,lineHeight:e.lineHeight,wordWrap:"break-word",padding:e.bodyPadding,[`${t}-body-skeleton`]:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",margin:`${E(e.margin)} auto`}},[`${t}-footer`]:{textAlign:"end",background:e.footerBg,marginTop:e.footerMarginTop,padding:e.footerPadding,borderTop:e.footerBorderTop,borderRadius:e.footerBorderRadius,[`> ${e.antCls}-btn + ${e.antCls}-btn`]:{marginInlineStart:e.marginXS}},[`${t}-open`]:{overflow:"hidden"}})},{[`${t}-pure-panel`]:{top:"auto",padding:0,display:"flex",flexDirection:"column",[`${t}-content,
          ${t}-body,
          ${t}-confirm-body-wrapper`]:{display:"flex",flexDirection:"column",flex:"auto"},[`${t}-confirm-body`]:{marginBottom:"auto"}}}]},Kt=e=>{const{componentCls:t}=e;return{[`${t}-root`]:{[`${t}-wrap-rtl`]:{direction:"rtl",[`${t}-confirm-body`]:{direction:"rtl"}}}}},Qt=e=>{const{componentCls:t}=e,o=Mt(e);delete o.xs;const n=Object.keys(o).map(r=>({[`@media (min-width: ${E(o[r])})`]:{width:`var(--${t.replace(".","")}-${r}-width)`}}));return{[`${t}-root`]:{[t]:[{width:`var(--${t.replace(".","")}-xs-width)`}].concat(V(n))}}},We=e=>{const t=e.padding,o=e.fontSizeHeading5,n=e.lineHeightHeading5;return Ct(e,{modalHeaderHeight:e.calc(e.calc(n).mul(o).equal()).add(e.calc(t).mul(2).equal()).equal(),modalFooterBorderColorSplit:e.colorSplit,modalFooterBorderStyle:e.lineType,modalFooterBorderWidth:e.lineWidth,modalCloseIconColor:e.colorIcon,modalCloseIconHoverColor:e.colorIconHover,modalCloseBtnSize:e.controlHeight,modalConfirmIconSize:e.fontHeight,modalTitleHeight:e.calc(e.titleFontSize).mul(e.titleLineHeight).equal()})},_e=e=>({footerBg:"transparent",headerBg:e.colorBgElevated,titleLineHeight:e.lineHeightHeading5,titleFontSize:e.fontSizeHeading5,contentBg:e.colorBgElevated,titleColor:e.colorTextHeading,contentPadding:e.wireframe?0:`${E(e.paddingMD)} ${E(e.paddingContentHorizontalLG)}`,headerPadding:e.wireframe?`${E(e.padding)} ${E(e.paddingLG)}`:0,headerBorderBottom:e.wireframe?`${E(e.lineWidth)} ${e.lineType} ${e.colorSplit}`:"none",headerMarginBottom:e.wireframe?0:e.marginXS,bodyPadding:e.wireframe?e.paddingLG:0,footerPadding:e.wireframe?`${E(e.paddingXS)} ${E(e.padding)}`:0,footerBorderTop:e.wireframe?`${E(e.lineWidth)} ${e.lineType} ${e.colorSplit}`:"none",footerBorderRadius:e.wireframe?`0 0 ${E(e.borderRadiusLG)} ${E(e.borderRadiusLG)}`:0,footerMarginTop:e.wireframe?0:e.marginSM,confirmBodyPadding:e.wireframe?`${E(e.padding*2)} ${E(e.padding*2)} ${E(e.paddingLG)}`:0,confirmIconMarginInlineEnd:e.wireframe?e.margin:e.marginSM,confirmBtnsMarginTop:e.wireframe?e.marginLG:e.marginSM}),Ve=ft("Modal",e=>{const t=We(e);return[Xt(t),Kt(t),Ut(t),mt(t,"zoom"),Qt(t)]},_e,{unitless:{titleLineHeight:!0}});var Zt=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};let se;const Yt=e=>{se={x:e.pageX,y:e.pageY},setTimeout(()=>{se=null},100)};Vt()&&document.documentElement.addEventListener("click",Yt,!0);const Ge=e=>{var t;const{getPopupContainer:o,getPrefixCls:n,direction:r,modal:i}=a.useContext(oe),m=H=>{const{onCancel:I}=e;I==null||I(H)},c=H=>{const{onOk:I}=e;I==null||I(H)},{prefixCls:s,className:v,rootClassName:l,open:u,wrapClassName:d,centered:b,getContainer:x,focusTriggerAfterClose:g=!0,style:C,visible:y,width:f=520,footer:p,classNames:S,styles:w,children:$,loading:O}=e,j=Zt(e,["prefixCls","className","rootClassName","open","wrapClassName","centered","getContainer","focusTriggerAfterClose","style","visible","width","footer","classNames","styles","children","loading"]),T=n("modal",s),Y=n(),L=Ie(T),[X,G,B]=Ve(T,L),z=N(d,{[`${T}-centered`]:!!b,[`${T}-wrap-rtl`]:r==="rtl"}),A=p!==null&&!O?a.createElement(De,Object.assign({},e,{onOk:c,onCancel:m})):null,[D,q,J]=It(Ce(e),Ce(i),{closable:!0,closeIcon:a.createElement(Re,{className:`${T}-close-icon`}),closeIconRender:H=>Ae(T,H)}),K=qt(`.${T}-content`),[Q,M]=bt("Modal",j.zIndex),[k,W]=a.useMemo(()=>f&&typeof f=="object"?[void 0,f]:[f,void 0],[f]),ae=a.useMemo(()=>{const H={};return W&&Object.keys(W).forEach(I=>{const _=W[I];_!==void 0&&(H[`--${T}-${I}-width`]=typeof _=="number"?`${_}px`:_)}),H},[W]);return X(a.createElement(yt,{form:!0,space:!0},a.createElement(xt.Provider,{value:M},a.createElement(Le,Object.assign({width:k},j,{zIndex:Q,getContainer:x===void 0?o:x,prefixCls:T,rootClassName:N(G,l,B,L),footer:A,visible:u??y,mousePosition:(t=j.mousePosition)!==null&&t!==void 0?t:se,onClose:m,closable:D&&{disabled:J,closeIcon:q},closeIcon:q,focusTriggerAfterClose:g,transitionName:ne(Y,"zoom",e.transitionName),maskTransitionName:ne(Y,"fade",e.maskTransitionName),className:N(G,v,i==null?void 0:i.className),style:Object.assign(Object.assign(Object.assign({},i==null?void 0:i.style),C),ae),classNames:Object.assign(Object.assign(Object.assign({},i==null?void 0:i.classNames),S),{wrapper:N(z,S==null?void 0:S.wrapper)}),styles:Object.assign(Object.assign({},i==null?void 0:i.styles),w),panelRef:K}),O?a.createElement(jt,{active:!0,title:!1,paragraph:{rows:4},className:`${T}-body-skeleton`}):$))))},Jt=e=>{const{componentCls:t,titleFontSize:o,titleLineHeight:n,modalConfirmIconSize:r,fontSize:i,lineHeight:m,modalTitleHeight:c,fontHeight:s,confirmBodyPadding:v}=e,l=`${t}-confirm`;return{[l]:{"&-rtl":{direction:"rtl"},[`${e.antCls}-modal-header`]:{display:"none"},[`${l}-body-wrapper`]:Object.assign({},ht()),[`&${t} ${t}-body`]:{padding:v},[`${l}-body`]:{display:"flex",flexWrap:"nowrap",alignItems:"start",[`> ${e.iconCls}`]:{flex:"none",fontSize:r,marginInlineEnd:e.confirmIconMarginInlineEnd,marginTop:e.calc(e.calc(s).sub(r).equal()).div(2).equal()},[`&-has-title > ${e.iconCls}`]:{marginTop:e.calc(e.calc(c).sub(r).equal()).div(2).equal()}},[`${l}-paragraph`]:{display:"flex",flexDirection:"column",flex:"auto",rowGap:e.marginXS,maxWidth:`calc(100% - ${E(e.marginSM)})`},[`${e.iconCls} + ${l}-paragraph`]:{maxWidth:`calc(100% - ${E(e.calc(e.modalConfirmIconSize).add(e.marginSM).equal())})`},[`${l}-title`]:{color:e.colorTextHeading,fontWeight:e.fontWeightStrong,fontSize:o,lineHeight:n},[`${l}-content`]:{color:e.colorText,fontSize:i,lineHeight:m},[`${l}-btns`]:{textAlign:"end",marginTop:e.confirmBtnsMarginTop,[`${e.antCls}-btn + ${e.antCls}-btn`]:{marginBottom:0,marginInlineStart:e.marginXS}}},[`${l}-error ${l}-body > ${e.iconCls}`]:{color:e.colorError},[`${l}-warning ${l}-body > ${e.iconCls},
        ${l}-confirm ${l}-body > ${e.iconCls}`]:{color:e.colorWarning},[`${l}-info ${l}-body > ${e.iconCls}`]:{color:e.colorInfo},[`${l}-success ${l}-body > ${e.iconCls}`]:{color:e.colorSuccess}}},kt=pt(["Modal","confirm"],e=>{const t=We(e);return[Jt(t)]},_e,{order:-1e3});var en=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};function qe(e){const{prefixCls:t,icon:o,okText:n,cancelText:r,confirmPrefixCls:i,type:m,okCancel:c,footer:s,locale:v}=e,l=en(e,["prefixCls","icon","okText","cancelText","confirmPrefixCls","type","okCancel","footer","locale"]);let u=o;if(!o&&o!==null)switch(m){case"info":u=a.createElement(Et,null);break;case"success":u=a.createElement(Ot,null);break;case"error":u=a.createElement(St,null);break;default:u=a.createElement($t,null)}const d=c??m==="confirm",b=e.autoFocusButton===null?!1:e.autoFocusButton||"ok",[x]=ue("Modal"),g=v||x,C=n||(d?g==null?void 0:g.okText:g==null?void 0:g.justOkText),y=r||(g==null?void 0:g.cancelText),f=Object.assign({autoFocusButton:b,cancelTextLocale:y,okTextLocale:C,mergedOkCancel:d},l),p=a.useMemo(()=>f,V(Object.values(f))),S=a.createElement(a.Fragment,null,a.createElement(be,null),a.createElement(ye,null)),w=e.title!==void 0&&e.title!==null,$=`${i}-body`;return a.createElement("div",{className:`${i}-body-wrapper`},a.createElement("div",{className:N($,{[`${$}-has-title`]:w})},u,a.createElement("div",{className:`${i}-paragraph`},w&&a.createElement("span",{className:`${i}-title`},e.title),a.createElement("div",{className:`${i}-content`},e.content))),s===void 0||typeof s=="function"?a.createElement(Be,{value:p},a.createElement("div",{className:`${i}-btns`},typeof s=="function"?s(S,{OkBtn:ye,CancelBtn:be}):S)):s,a.createElement(kt,{prefixCls:t}))}const tn=e=>{const{close:t,zIndex:o,maskStyle:n,direction:r,prefixCls:i,wrapClassName:m,rootPrefixCls:c,bodyStyle:s,closable:v=!1,onConfirm:l,styles:u}=e,d=`${i}-confirm`,b=e.width||416,x=e.style||{},g=e.mask===void 0?!0:e.mask,C=e.maskClosable===void 0?!1:e.maskClosable,y=N(d,`${d}-${e.type}`,{[`${d}-rtl`]:r==="rtl"},e.className),[,f]=wt(),p=a.useMemo(()=>o!==void 0?o:f.zIndexPopupBase+Pt,[o,f]);return a.createElement(Ge,Object.assign({},e,{className:y,wrapClassName:N({[`${d}-centered`]:!!e.centered},m),onCancel:()=>{t==null||t({triggerCancel:!0}),l==null||l(!1)},title:"",footer:null,transitionName:ne(c||"","zoom",e.transitionName),maskTransitionName:ne(c||"","fade",e.maskTransitionName),mask:g,maskClosable:C,style:x,styles:Object.assign({body:s,mask:n},u),width:b,zIndex:p,closable:v}),a.createElement(qe,Object.assign({},e,{confirmPrefixCls:d})))},Ue=e=>{const{rootPrefixCls:t,iconPrefixCls:o,direction:n,theme:r}=e;return a.createElement(je,{prefixCls:t,iconPrefixCls:o,direction:n,theme:r},a.createElement(tn,Object.assign({},e)))},Z=[];let Xe="";function Ke(){return Xe}const nn=e=>{var t,o;const{prefixCls:n,getContainer:r,direction:i}=e,m=Te(),c=a.useContext(oe),s=Ke()||c.getPrefixCls(),v=n||`${s}-modal`;let l=r;return l===!1&&(l=void 0),h.createElement(Ue,Object.assign({},e,{rootPrefixCls:s,prefixCls:v,iconPrefixCls:c.iconPrefixCls,theme:c.theme,direction:i??c.direction,locale:(o=(t=c.locale)===null||t===void 0?void 0:t.Modal)!==null&&o!==void 0?o:m,getContainer:l}))};function te(e){const t=Nt(),o=document.createDocumentFragment();let n=Object.assign(Object.assign({},e),{close:s,open:!0}),r,i;function m(){for(var l,u=arguments.length,d=new Array(u),b=0;b<u;b++)d[b]=arguments[b];if(d.some(C=>C==null?void 0:C.triggerCancel)){var g;(l=e.onCancel)===null||l===void 0||(g=l).call.apply(g,[e,()=>{}].concat(V(d.slice(1))))}for(let C=0;C<Z.length;C++)if(Z[C]===s){Z.splice(C,1);break}i()}function c(l){clearTimeout(r),r=setTimeout(()=>{const u=t.getPrefixCls(void 0,Ke()),d=t.getIconPrefixCls(),b=t.getTheme(),x=h.createElement(nn,Object.assign({},l));i=Rt()(h.createElement(je,{prefixCls:u,iconPrefixCls:d,theme:b},t.holderRender?t.holderRender(x):x),o)})}function s(){for(var l=arguments.length,u=new Array(l),d=0;d<l;d++)u[d]=arguments[d];n=Object.assign(Object.assign({},n),{open:!1,afterClose:()=>{typeof e.afterClose=="function"&&e.afterClose(),m.apply(this,u)}}),n.visible&&delete n.visible,c(n)}function v(l){typeof l=="function"?n=l(n):n=Object.assign(Object.assign({},n),l),c(n)}return c(n),Z.push(s),{destroy:s,update:v}}function Qe(e){return Object.assign(Object.assign({},e),{type:"warning"})}function Ze(e){return Object.assign(Object.assign({},e),{type:"info"})}function Ye(e){return Object.assign(Object.assign({},e),{type:"success"})}function Je(e){return Object.assign(Object.assign({},e),{type:"error"})}function ke(e){return Object.assign(Object.assign({},e),{type:"confirm"})}function on(e){let{rootPrefixCls:t}=e;Xe=t}var an=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};const rn=(e,t)=>{var o,{afterClose:n,config:r}=e,i=an(e,["afterClose","config"]);const[m,c]=a.useState(!0),[s,v]=a.useState(r),{direction:l,getPrefixCls:u}=a.useContext(oe),d=u("modal"),b=u(),x=()=>{var f;n(),(f=s.afterClose)===null||f===void 0||f.call(s)},g=function(){var f;c(!1);for(var p=arguments.length,S=new Array(p),w=0;w<p;w++)S[w]=arguments[w];if(S.some(j=>j==null?void 0:j.triggerCancel)){var O;(f=s.onCancel)===null||f===void 0||(O=f).call.apply(O,[s,()=>{}].concat(V(S.slice(1))))}};a.useImperativeHandle(t,()=>({destroy:g,update:f=>{v(p=>Object.assign(Object.assign({},p),f))}}));const C=(o=s.okCancel)!==null&&o!==void 0?o:s.type==="confirm",[y]=ue("Modal",Tt.Modal);return a.createElement(Ue,Object.assign({prefixCls:d,rootPrefixCls:b},s,{close:g,open:m,afterClose:x,okText:s.okText||(C?y==null?void 0:y.okText:y==null?void 0:y.justOkText),direction:s.direction||l,cancelText:s.cancelText||(y==null?void 0:y.cancelText)},i))},ln=a.forwardRef(rn);let Ee=0;const sn=a.memo(a.forwardRef((e,t)=>{const[o,n]=Ht();return a.useImperativeHandle(t,()=>({patchElement:n}),[]),a.createElement(a.Fragment,null,o)}));function cn(){const e=a.useRef(null),[t,o]=a.useState([]);a.useEffect(()=>{t.length&&(V(t).forEach(m=>{m()}),o([]))},[t]);const n=a.useCallback(i=>function(c){var s;Ee+=1;const v=a.createRef();let l;const u=new Promise(C=>{l=C});let d=!1,b;const x=a.createElement(ln,{key:`modal-${Ee}`,config:i(c),ref:v,afterClose:()=>{b==null||b()},isSilent:()=>d,onConfirm:C=>{l(C)}});return b=(s=e.current)===null||s===void 0?void 0:s.patchElement(x),b&&Z.push(b),{destroy:()=>{function C(){var y;(y=v.current)===null||y===void 0||y.destroy()}v.current?C():o(y=>[].concat(V(y),[C]))},update:C=>{function y(){var f;(f=v.current)===null||f===void 0||f.update(C)}v.current?y():o(f=>[].concat(V(f),[y]))},then:C=>(d=!0,u.then(C))}},[]);return[a.useMemo(()=>({info:n(Ze),success:n(Ye),error:n(Je),warning:n(Qe),confirm:n(ke)}),[]),a.createElement(sn,{key:"modal-holder",ref:e})]}var dn=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};const un=e=>{const{prefixCls:t,className:o,closeIcon:n,closable:r,type:i,title:m,children:c,footer:s}=e,v=dn(e,["prefixCls","className","closeIcon","closable","type","title","children","footer"]),{getPrefixCls:l}=a.useContext(oe),u=l(),d=t||l("modal"),b=Ie(u),[x,g,C]=Ve(d,b),y=`${d}-confirm`;let f={};return i?f={closable:r??!1,title:"",footer:"",children:a.createElement(qe,Object.assign({},e,{prefixCls:d,confirmPrefixCls:y,rootPrefixCls:u,content:c}))}:f={closable:r??!0,title:m,footer:s!==null&&a.createElement(De,Object.assign({},e)),children:c},x(a.createElement(He,Object.assign({prefixCls:d,className:N(g,`${d}-pure-panel`,i&&y,i&&`${y}-${i}`,o,C,b)},v,{closeIcon:Ae(d,n),closable:r},f)))},fn=zt(un);function et(e){return te(Qe(e))}const F=Ge;F.useModal=cn;F.info=function(t){return te(Ze(t))};F.success=function(t){return te(Ye(t))};F.error=function(t){return te(Je(t))};F.warning=et;F.warn=et;F.confirm=function(t){return te(ke(t))};F.destroyAll=function(){for(;Z.length;){const t=Z.pop();t&&t()}};F.config=on;F._InternalPanelDoNotUseOrYouWillBeFired=fn;export{F as M};
