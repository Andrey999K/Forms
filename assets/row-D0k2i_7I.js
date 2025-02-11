import{b as n,C as B,c as F}from"./index-CYtm5Ivz.js";import{u as D,a as K}from"./index-fc85Zh8G.js";import{u as Q,r as E}from"./responsiveObserver-BfmC1mZK.js";const H=n.createContext({});var T=function(e,c){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&c.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)c.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(a[t[s]]=e[t[s]]);return a};function L(e){return typeof e=="number"?`${e} ${e} auto`:/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?`0 0 ${e}`:e}const U=["xs","sm","md","lg","xl","xxl"],te=n.forwardRef((e,c)=>{const{getPrefixCls:a,direction:t}=n.useContext(B),{gutter:s,wrap:p}=n.useContext(H),{prefixCls:g,span:y,order:d,offset:m,push:x,pull:O,className:A,children:N,flex:h,style:C}=e,j=T(e,["prefixCls","span","order","offset","push","pull","className","children","flex","style"]),o=a("col",g),[v,P,S]=D(o),w={};let f={};U.forEach(l=>{let r={};const b=e[l];typeof b=="number"?r.span=b:typeof b=="object"&&(r=b||{}),delete j[l],f=Object.assign(Object.assign({},f),{[`${o}-${l}-${r.span}`]:r.span!==void 0,[`${o}-${l}-order-${r.order}`]:r.order||r.order===0,[`${o}-${l}-offset-${r.offset}`]:r.offset||r.offset===0,[`${o}-${l}-push-${r.push}`]:r.push||r.push===0,[`${o}-${l}-pull-${r.pull}`]:r.pull||r.pull===0,[`${o}-rtl`]:t==="rtl"}),r.flex&&(f[`${o}-${l}-flex`]=!0,w[`--${o}-${l}-flex`]=L(r.flex))});const G=F(o,{[`${o}-${y}`]:y!==void 0,[`${o}-order-${d}`]:d,[`${o}-offset-${m}`]:m,[`${o}-push-${x}`]:x,[`${o}-pull-${O}`]:O},A,f,P,S),u={};if(s&&s[0]>0){const l=s[0]/2;u.paddingLeft=l,u.paddingRight=l}return h&&(u.flex=L(h),p===!1&&!u.minWidth&&(u.minWidth=0)),v(n.createElement("div",Object.assign({},j,{style:Object.assign(Object.assign(Object.assign({},u),C),w),className:G,ref:c}),N))});var X=function(e,c){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&c.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)c.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(a[t[s]]=e[t[s]]);return a};function W(e,c){const[a,t]=n.useState(typeof e=="string"?e:""),s=()=>{if(typeof e=="string"&&t(e),typeof e=="object")for(let p=0;p<E.length;p++){const g=E[p];if(!c[g])continue;const y=e[g];if(y!==void 0){t(y);return}}};return n.useEffect(()=>{s()},[JSON.stringify(e),c]),a}const re=n.forwardRef((e,c)=>{const{prefixCls:a,justify:t,align:s,className:p,style:g,children:y,gutter:d=0,wrap:m}=e,x=X(e,["prefixCls","justify","align","className","style","children","gutter","wrap"]),{getPrefixCls:O,direction:A}=n.useContext(B),[N,h]=n.useState({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),[C,j]=n.useState({xs:!1,sm:!1,md:!1,lg:!1,xl:!1,xxl:!1}),o=W(s,C),v=W(t,C),P=n.useRef(d),S=Q();n.useEffect(()=>{const $=S.subscribe(I=>{j(I);const i=P.current||0;(!Array.isArray(i)&&typeof i=="object"||Array.isArray(i)&&(typeof i[0]=="object"||typeof i[1]=="object"))&&h(I)});return()=>S.unsubscribe($)},[]);const w=()=>{const $=[void 0,void 0];return(Array.isArray(d)?d:[d,void 0]).forEach((i,M)=>{if(typeof i=="object")for(let _=0;_<E.length;_++){const z=E[_];if(N[z]&&i[z]!==void 0){$[M]=i[z];break}}else $[M]=i}),$},f=O("row",a),[G,u,l]=K(f),r=w(),b=F(f,{[`${f}-no-wrap`]:m===!1,[`${f}-${v}`]:v,[`${f}-${o}`]:o,[`${f}-rtl`]:A==="rtl"},p,u,l),R={},V=r[0]!=null&&r[0]>0?r[0]/-2:void 0;V&&(R.marginLeft=V,R.marginRight=V);const[J,k]=r;R.rowGap=k;const q=n.useMemo(()=>({gutter:[J,k],wrap:m}),[J,k,m]);return G(n.createElement(H.Provider,{value:q},n.createElement("div",Object.assign({},x,{className:b,style:Object.assign(Object.assign({},R),g),ref:c}),y)))});export{te as C,re as R};
