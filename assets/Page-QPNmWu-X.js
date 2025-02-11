import{g as be,K as B,a as fe,r as ge,u as T,m as De,b as i,C as oe,i as pe,c as E,d as he,e as Re,j as r,B as M,G as xe,L as Z,f as ze,h as z,k as Me,l as Be,n as L,R as Fe,o as de,T as _e,p as ke,s as ee,q as He}from"./index-CYtm5Ivz.js";import{S as A,u as We}from"./base-CkoMxS7O.js";import{M as Le,a as Ae,b as Ze}from"./index-cf3E3JiM.js";import{M as Ve}from"./index-DgLpV6dk.js";import{R as qe,C as Ue}from"./row-D0k2i_7I.js";import{u as Xe}from"./usePageTitle-BgdMRMEQ.js";import{S as Ge}from"./index-Cxxa0A_f.js";import{I as Ke}from"./index-DJCO6rUO.js";import"./Skeleton-DRscEBPR.js";import"./index-fc85Zh8G.js";import"./responsiveObserver-BfmC1mZK.js";const Ye=new B("antStatusProcessing",{"0%":{transform:"scale(0.8)",opacity:.5},"100%":{transform:"scale(2.4)",opacity:0}}),Qe=new B("antZoomBadgeIn",{"0%":{transform:"scale(0) translate(50%, -50%)",opacity:0},"100%":{transform:"scale(1) translate(50%, -50%)"}}),Je=new B("antZoomBadgeOut",{"0%":{transform:"scale(1) translate(50%, -50%)"},"100%":{transform:"scale(0) translate(50%, -50%)",opacity:0}}),et=new B("antNoWrapperZoomBadgeIn",{"0%":{transform:"scale(0)",opacity:0},"100%":{transform:"scale(1)"}}),tt=new B("antNoWrapperZoomBadgeOut",{"0%":{transform:"scale(1)"},"100%":{transform:"scale(0)",opacity:0}}),ot=new B("antBadgeLoadingCircle",{"0%":{transformOrigin:"50%"},"100%":{transform:"translate(50%, -50%) rotate(360deg)",transformOrigin:"50%"}}),nt=e=>{const{componentCls:t,iconCls:s,antCls:o,badgeShadowSize:n,textFontSize:u,textFontSizeSM:a,statusSize:h,dotSize:v,textFontWeight:g,indicatorHeight:m,indicatorHeightSM:l,marginXS:p,calc:x}=e,b=`${o}-scroll-number`,S=fe(e,(C,N)=>{let{darkColor:f}=N;return{[`&${t} ${t}-color-${C}`]:{background:f,[`&:not(${t}-count)`]:{color:f},"a:hover &":{background:f}}}});return{[t]:Object.assign(Object.assign(Object.assign(Object.assign({},ge(e)),{position:"relative",display:"inline-block",width:"fit-content",lineHeight:1,[`${t}-count`]:{display:"inline-flex",justifyContent:"center",zIndex:e.indicatorZIndex,minWidth:m,height:m,color:e.badgeTextColor,fontWeight:g,fontSize:u,lineHeight:T(m),whiteSpace:"nowrap",textAlign:"center",background:e.badgeColor,borderRadius:x(m).div(2).equal(),boxShadow:`0 0 0 ${T(n)} ${e.badgeShadowColor}`,transition:`background ${e.motionDurationMid}`,a:{color:e.badgeTextColor},"a:hover":{color:e.badgeTextColor},"a:hover &":{background:e.badgeColorHover}},[`${t}-count-sm`]:{minWidth:l,height:l,fontSize:a,lineHeight:T(l),borderRadius:x(l).div(2).equal()},[`${t}-multiple-words`]:{padding:`0 ${T(e.paddingXS)}`,bdi:{unicodeBidi:"plaintext"}},[`${t}-dot`]:{zIndex:e.indicatorZIndex,width:v,minWidth:v,height:v,background:e.badgeColor,borderRadius:"100%",boxShadow:`0 0 0 ${T(n)} ${e.badgeShadowColor}`},[`${t}-count, ${t}-dot, ${b}-custom-component`]:{position:"absolute",top:0,insetInlineEnd:0,transform:"translate(50%, -50%)",transformOrigin:"100% 0%",[`&${s}-spin`]:{animationName:ot,animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"linear"}},[`&${t}-status`]:{lineHeight:"inherit",verticalAlign:"baseline",[`${t}-status-dot`]:{position:"relative",top:-1,display:"inline-block",width:h,height:h,verticalAlign:"middle",borderRadius:"50%"},[`${t}-status-success`]:{backgroundColor:e.colorSuccess},[`${t}-status-processing`]:{overflow:"visible",color:e.colorInfo,backgroundColor:e.colorInfo,borderColor:"currentcolor","&::after":{position:"absolute",top:0,insetInlineStart:0,width:"100%",height:"100%",borderWidth:n,borderStyle:"solid",borderColor:"inherit",borderRadius:"50%",animationName:Ye,animationDuration:e.badgeProcessingDuration,animationIterationCount:"infinite",animationTimingFunction:"ease-in-out",content:'""'}},[`${t}-status-default`]:{backgroundColor:e.colorTextPlaceholder},[`${t}-status-error`]:{backgroundColor:e.colorError},[`${t}-status-warning`]:{backgroundColor:e.colorWarning},[`${t}-status-text`]:{marginInlineStart:p,color:e.colorText,fontSize:e.fontSize}}}),S),{[`${t}-zoom-appear, ${t}-zoom-enter`]:{animationName:Qe,animationDuration:e.motionDurationSlow,animationTimingFunction:e.motionEaseOutBack,animationFillMode:"both"},[`${t}-zoom-leave`]:{animationName:Je,animationDuration:e.motionDurationSlow,animationTimingFunction:e.motionEaseOutBack,animationFillMode:"both"},[`&${t}-not-a-wrapper`]:{[`${t}-zoom-appear, ${t}-zoom-enter`]:{animationName:et,animationDuration:e.motionDurationSlow,animationTimingFunction:e.motionEaseOutBack},[`${t}-zoom-leave`]:{animationName:tt,animationDuration:e.motionDurationSlow,animationTimingFunction:e.motionEaseOutBack},[`&:not(${t}-status)`]:{verticalAlign:"middle"},[`${b}-custom-component, ${t}-count`]:{transform:"none"},[`${b}-custom-component, ${b}`]:{position:"relative",top:"auto",display:"block",transformOrigin:"50% 50%"}},[b]:{overflow:"hidden",transition:`all ${e.motionDurationMid} ${e.motionEaseOutBack}`,[`${b}-only`]:{position:"relative",display:"inline-block",height:m,transition:`all ${e.motionDurationSlow} ${e.motionEaseOutBack}`,WebkitTransformStyle:"preserve-3d",WebkitBackfaceVisibility:"hidden",[`> p${b}-only-unit`]:{height:m,margin:0,WebkitTransformStyle:"preserve-3d",WebkitBackfaceVisibility:"hidden"}},[`${b}-symbol`]:{verticalAlign:"top"}},"&-rtl":{direction:"rtl",[`${t}-count, ${t}-dot, ${b}-custom-component`]:{transform:"translate(-50%, -50%)"}}})}},Ce=e=>{const{fontHeight:t,lineWidth:s,marginXS:o,colorBorderBg:n}=e,u=t,a=s,h=e.colorTextLightSolid,v=e.colorError,g=e.colorErrorHover;return De(e,{badgeFontHeight:u,badgeShadowSize:a,badgeTextColor:h,badgeColor:v,badgeColorHover:g,badgeShadowColor:n,badgeProcessingDuration:"1.2s",badgeRibbonOffset:o,badgeRibbonCornerTransform:"scaleY(0.75)",badgeRibbonCornerFilter:"brightness(75%)"})},ve=e=>{const{fontSize:t,lineHeight:s,fontSizeSM:o,lineWidth:n}=e;return{indicatorZIndex:"auto",indicatorHeight:Math.round(t*s)-2*n,indicatorHeightSM:t,dotSize:o/2,textFontSize:o,textFontSizeSM:o,textFontWeight:"normal",statusSize:o/2}},st=be("Badge",e=>{const t=Ce(e);return nt(t)},ve),rt=e=>{const{antCls:t,badgeFontHeight:s,marginXS:o,badgeRibbonOffset:n,calc:u}=e,a=`${t}-ribbon`,h=`${t}-ribbon-wrapper`,v=fe(e,(g,m)=>{let{darkColor:l}=m;return{[`&${a}-color-${g}`]:{background:l,color:l}}});return{[h]:{position:"relative"},[a]:Object.assign(Object.assign(Object.assign(Object.assign({},ge(e)),{position:"absolute",top:o,padding:`0 ${T(e.paddingXS)}`,color:e.colorPrimary,lineHeight:T(s),whiteSpace:"nowrap",backgroundColor:e.colorPrimary,borderRadius:e.borderRadiusSM,[`${a}-text`]:{color:e.badgeTextColor},[`${a}-corner`]:{position:"absolute",top:"100%",width:n,height:n,color:"currentcolor",border:`${T(u(n).div(2).equal())} solid`,transform:e.badgeRibbonCornerTransform,transformOrigin:"top",filter:e.badgeRibbonCornerFilter}}),v),{[`&${a}-placement-end`]:{insetInlineEnd:u(n).mul(-1).equal(),borderEndEndRadius:0,[`${a}-corner`]:{insetInlineEnd:0,borderInlineEndColor:"transparent",borderBlockEndColor:"transparent"}},[`&${a}-placement-start`]:{insetInlineStart:u(n).mul(-1).equal(),borderEndStartRadius:0,[`${a}-corner`]:{insetInlineStart:0,borderBlockEndColor:"transparent",borderInlineStartColor:"transparent"}},"&-rtl":{direction:"rtl"}})}},it=be(["Badge","Ribbon"],e=>{const t=Ce(e);return rt(t)},ve),at=e=>{const{className:t,prefixCls:s,style:o,color:n,children:u,text:a,placement:h="end",rootClassName:v}=e,{getPrefixCls:g,direction:m}=i.useContext(oe),l=g("ribbon",s),p=`${l}-wrapper`,[x,b,S]=it(l,p),C=pe(n,!1),N=E(l,`${l}-placement-${h}`,{[`${l}-rtl`]:m==="rtl",[`${l}-color-${n}`]:C},t),f={},j={};return n&&!C&&(f.background=n,j.color=n),x(i.createElement("div",{className:E(p,v,b,S)},u,i.createElement("div",{className:E(N,b),style:Object.assign(Object.assign({},f),o)},i.createElement("span",{className:`${l}-text`},a),i.createElement("div",{className:`${l}-corner`,style:j}))))},ue=e=>{const{prefixCls:t,value:s,current:o,offset:n=0}=e;let u;return n&&(u={position:"absolute",top:`${n}00%`,left:0}),i.createElement("span",{style:u,className:E(`${t}-only-unit`,{current:o})},s)};function lt(e,t,s){let o=e,n=0;for(;(o+10)%10!==t;)o+=s,n+=s;return n}const ct=e=>{const{prefixCls:t,count:s,value:o}=e,n=Number(o),u=Math.abs(s),[a,h]=i.useState(n),[v,g]=i.useState(u),m=()=>{h(n),g(u)};i.useEffect(()=>{const x=setTimeout(m,1e3);return()=>clearTimeout(x)},[n]);let l,p;if(a===n||Number.isNaN(n)||Number.isNaN(a))l=[i.createElement(ue,Object.assign({},e,{key:n,current:!0}))],p={transition:"none"};else{l=[];const x=n+10,b=[];for(let f=n;f<=x;f+=1)b.push(f);const S=v<u?1:-1,C=b.findIndex(f=>f%10===a);l=(S<0?b.slice(0,C+1):b.slice(C)).map((f,j)=>{const I=f%10;return i.createElement(ue,Object.assign({},e,{key:f,value:I,offset:S<0?j-C:j,current:j===C}))}),p={transform:`translateY(${-lt(a,n,S)}00%)`}}return i.createElement("span",{className:`${t}-only`,style:p,onTransitionEnd:m},l)};var dt=function(e,t){var s={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(s[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(s[o[n]]=e[o[n]]);return s};const ut=i.forwardRef((e,t)=>{const{prefixCls:s,count:o,className:n,motionClassName:u,style:a,title:h,show:v,component:g="sup",children:m}=e,l=dt(e,["prefixCls","count","className","motionClassName","style","title","show","component","children"]),{getPrefixCls:p}=i.useContext(oe),x=p("scroll-number",s),b=Object.assign(Object.assign({},l),{"data-show":v,style:a,className:E(x,n,u),title:h});let S=o;if(o&&Number(o)%1===0){const C=String(o).split("");S=i.createElement("bdi",null,C.map((N,f)=>i.createElement(ct,{prefixCls:x,count:Number(o),value:N,key:C.length-f})))}return a!=null&&a.borderColor&&(b.style=Object.assign(Object.assign({},a),{boxShadow:`0 0 0 1px ${a.borderColor} inset`})),m?he(m,C=>({className:E(`${x}-custom-component`,C==null?void 0:C.className,u)})):i.createElement(g,Object.assign({},b,{ref:t}),S)});var mt=function(e,t){var s={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(s[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(s[o[n]]=e[o[n]]);return s};const bt=i.forwardRef((e,t)=>{var s,o,n,u,a;const{prefixCls:h,scrollNumberPrefixCls:v,children:g,status:m,text:l,color:p,count:x=null,overflowCount:b=99,dot:S=!1,size:C="default",title:N,offset:f,style:j,className:I,rootClassName:d,classNames:$,styles:O,showZero:V=!1}=e,ne=mt(e,["prefixCls","scrollNumberPrefixCls","children","status","text","color","count","overflowCount","dot","size","title","offset","style","className","rootClassName","classNames","styles","showZero"]),{getPrefixCls:se,direction:q,badge:c}=i.useContext(oe),y=se("badge",h),[re,Se,$e]=st(y),U=x>b?`${b}+`:x,_=U==="0"||U===0,Ne=x===null||_&&!V,X=(m!=null||p!=null)&&Ne,F=S&&!_,P=F?"":U,D=i.useMemo(()=>(P==null||P===""||_&&!V)&&!F,[P,_,V,F]),ie=i.useRef(x);D||(ie.current=x);const R=ie.current,ae=i.useRef(P);D||(ae.current=P);const G=ae.current,le=i.useRef(F);D||(le.current=F);const k=i.useMemo(()=>{if(!f)return Object.assign(Object.assign({},c==null?void 0:c.style),j);const w={marginTop:f[1]};return q==="rtl"?w.left=parseInt(f[0],10):w.right=-parseInt(f[0],10),Object.assign(Object.assign(Object.assign({},w),c==null?void 0:c.style),j)},[q,f,j,c==null?void 0:c.style]),je=N??(typeof R=="string"||typeof R=="number"?R:void 0),Oe=D||!l?null:i.createElement("span",{className:`${y}-status-text`},l),we=!R||typeof R!="object"?void 0:he(R,w=>({style:Object.assign(Object.assign({},k),w.style)})),H=pe(p,!1),Ee=E($==null?void 0:$.indicator,(s=c==null?void 0:c.classNames)===null||s===void 0?void 0:s.indicator,{[`${y}-status-dot`]:X,[`${y}-status-${m}`]:!!m,[`${y}-color-${p}`]:H}),K={};p&&!H&&(K.color=p,K.background=p);const ce=E(y,{[`${y}-status`]:X,[`${y}-not-a-wrapper`]:!g,[`${y}-rtl`]:q==="rtl"},I,d,c==null?void 0:c.className,(o=c==null?void 0:c.classNames)===null||o===void 0?void 0:o.root,$==null?void 0:$.root,Se,$e);if(!g&&X){const w=k.color;return re(i.createElement("span",Object.assign({},ne,{className:ce,style:Object.assign(Object.assign(Object.assign({},O==null?void 0:O.root),(n=c==null?void 0:c.styles)===null||n===void 0?void 0:n.root),k)}),i.createElement("span",{className:Ee,style:Object.assign(Object.assign(Object.assign({},O==null?void 0:O.indicator),(u=c==null?void 0:c.styles)===null||u===void 0?void 0:u.indicator),K)}),l&&i.createElement("span",{style:{color:w},className:`${y}-status-text`},l)))}return re(i.createElement("span",Object.assign({ref:t},ne,{className:ce,style:Object.assign(Object.assign({},(a=c==null?void 0:c.styles)===null||a===void 0?void 0:a.root),O==null?void 0:O.root)}),g,i.createElement(Re,{visible:!D,motionName:`${y}-zoom`,motionAppear:!1,motionDeadline:1e3},w=>{let{className:Te}=w;var Y,Q;const Ie=se("scroll-number",v),J=le.current,Pe=E($==null?void 0:$.indicator,(Y=c==null?void 0:c.classNames)===null||Y===void 0?void 0:Y.indicator,{[`${y}-dot`]:J,[`${y}-count`]:!J,[`${y}-count-sm`]:C==="small",[`${y}-multiple-words`]:!J&&G&&G.toString().length>1,[`${y}-status-${m}`]:!!m,[`${y}-color-${p}`]:H});let W=Object.assign(Object.assign(Object.assign({},O==null?void 0:O.indicator),(Q=c==null?void 0:c.styles)===null||Q===void 0?void 0:Q.indicator),k);return p&&!H&&(W=W||{},W.background=p),i.createElement(ut,{prefixCls:Ie,show:!D,motionClassName:Te,className:Pe,count:G,title:je,style:W,key:"scrollNumber"},we)}),Oe))}),ye=bt;ye.Ribbon=at;const ft=e=>{const{isDeleting:t,onRemoveConstructor:s}=e,[o,n]=i.useState(!1),u=()=>{n(!0)},a=()=>{s()},h=()=>{n(!1)};return r.jsxs(r.Fragment,{children:[r.jsx(M,{block:!0,className:"block",type:"text","data-testid":"delete-button",danger:!0,icon:r.jsx(Le,{size:18}),onClick:u},"delete"),r.jsx(Ve,{title:"Удаление",open:o,onOk:a,confirmLoading:t,onCancel:h,footer:[r.jsx(M,{onClick:h,children:"Отмена"},"back"),r.jsx(M,{color:"danger",variant:"filled",loading:t,onClick:a,children:"Удалить"},"submit")],children:r.jsx("p",{children:"Вы действительно хотите удалить форму?"})})]})},gt=e=>{const{item:t,onDelete:s,isDeleting:o}=e,n=()=>{s(t.id)};return r.jsxs(xe,{className:"h-full flex flex-col !shadow-none",children:[r.jsx("div",{className:"py-3 px-1 flex items-center justify-center ",children:r.jsx(Z,{to:`/forms/${t.id}`,className:"text-textPrimary hover:text-primary line-clamp-1 text-base font-semibold",children:t.title})}),r.jsx("div",{className:"flex flex-grow items-center justify-center py-3 px-1 border-t border-b dark:border-border-dark",children:r.jsx("div",{className:"line-clamp-3 text-textPrimary text-sm",children:t.description})}),r.jsxs("div",{className:"flex justify-around items-center p-2",children:[r.jsx(Z,{to:`/forms/${t.id}/responses`,className:"block w-full",children:r.jsx(M,{block:!0,type:"text",icon:r.jsx(ye,{count:t.responseCount??0,showZero:!0,size:"small",styles:{indicator:{fontSize:10},root:{color:"inherit"}},children:r.jsx(Ae,{size:18})})})},"response"),r.jsx("div",{className:"border-l w-1 h-full ml-2 pl-2 dark:border-border-dark"}),r.jsx(Z,{to:`/forms/${t.id}/edit`,className:"block w-full",children:r.jsx(M,{block:!0,type:"text",icon:r.jsx(Ze,{size:18})})},"edit"),r.jsx("div",{className:"border-l w-1 h-full ml-2 pl-2 dark:border-border-dark"}),r.jsx(ft,{isDeleting:o,onRemoveConstructor:n})]})]})},pt=e=>{const{items:t,onDelete:s,isDeleting:o}=e;return r.jsx(qe,{gutter:[16,16],align:"stretch",children:t.map(n=>r.jsx(Ue,{span:24,md:12,lg:8,children:r.jsx(gt,{item:n,onDelete:s,isDeleting:o})},n.id))})};function ht(e,t){let s=null;return function(...o){s!==null&&clearTimeout(s),s=setTimeout(()=>{e.apply(this,o),s=null},t)}}const{Search:xt}=Ke,{Text:me}=_e,te={TIME_ASC:{field:"createdAt",type:A.ASC},TIME_DESC:{field:"createdAt",type:A.DESC},TITLE_ASC:{field:"title",type:A.ASC},TITLE_DESC:{field:"title",type:A.DESC}},Ct=[{value:"TIME_DESC",label:"Сначала новые"},{value:"TIME_ASC",label:"Сначала старые"},{value:"TITLE_DESC",label:"Порядок А-Я"},{value:"TITLE_ASC",label:"Порядок Я-А"}],vt=30,Dt=()=>{const e=ze(),t=z(d=>d.formSlice.status),s=z(d=>d.user.user),o=z(d=>d.formSlice.order),n=z(d=>d.formSlice.search),u=z(d=>d.formSlice.data),a=z(d=>d.formSlice.hasNext),[h,v]=Me(),[g,m]=i.useState(h.get("search")??""),[l,p]=i.useState(h.get("order")??"TIME_DESC"),[x,{isLoading:b}]=Be(),{ref:S}=We({threshold:1,onChange:async d=>{d&&t!=="pending"&&j()}}),C=async d=>{try{await x(d).unwrap(),e(ke(d)),ee.info({message:"Форма успешно удалена"})}catch($){console.error("Ошибка удаления:",$),ee.error({message:"Ошибка"})}},N=ht(d=>{e(L()),m(d)},300),f=d=>{e(L()),p(d)};i.useEffect(()=>{const d={order:l};g.length&&(d.search=g),v(d,{replace:!0})},[l,g,v]),i.useEffect(()=>{var d,$;if(g!==(n??"")){e(L());return}if(((d=te[l])==null?void 0:d.field)!==(o==null?void 0:o.field)||(($=te[l])==null?void 0:$.type)!==(o==null?void 0:o.type)){e(L());return}},[]);const j=()=>{if(!s){ee.error({message:"Не найдены данные пользователя"});return}e(He({search:g.length?{key:"title",value:g}:void 0,sort:te[l],limit:vt,reference:{collectionName:"users",key:"userId",id:s.uid}}))},I=(t==="success"||t===null)&&a;return Xe("Главная страница"),r.jsxs(xe,{"data-testid":"home-page",className:"flex flex-col gap-4 p-5",children:[r.jsxs("div",{className:"flex-col sm:flex-row flex justify-between gap-4",children:[r.jsx(xt,{defaultValue:g,onSearch:N,className:"w-full sm:w-[300px]",disabled:t==="pending"}),r.jsx(Ge,{value:l,options:Ct,onChange:f,className:"w-full sm:w-[200px]"})]}),r.jsxs("div",{children:[u.length>0?r.jsx(pt,{items:u.filter(d=>d!==null),onDelete:C,isDeleting:b}):t!=="pending"&&!I&&r.jsxs("div",{className:"flex flex-col gap-4",children:[r.jsx(me,{children:"Нет доступных форм."}),r.jsx(Z,{to:Fe.FORMS_NEW,children:r.jsx(M,{type:"primary",children:"Создать форму"})})]}),t==="pending"&&r.jsx(de,{}),I&&r.jsx("div",{ref:S,className:"mt-4 mb-5",children:r.jsx(de,{})}),t==="rejected"&&!u.length&&r.jsx(me,{children:"Произошла ошибка, попробуйте обновить страницу"})]})]})};export{Dt as Home};
