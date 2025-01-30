import{b as s,aI as O,a0 as M,g as B,m as N,r as j,u as d,C as P,c as W}from"./index-lcoQv0vF.js";var k={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"info-circle",theme:"filled"},R=function(e,o){return s.createElement(O,M({},e,{ref:o,icon:k}))},L=s.forwardRef(R);const A=t=>{const{componentCls:e,sizePaddingEdgeHorizontal:o,colorSplit:r,lineWidth:i,textPaddingInline:c,orientationMargin:l,verticalMarginInline:a}=t;return{[e]:Object.assign(Object.assign({},j(t)),{borderBlockStart:`${d(i)} solid ${r}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",marginInline:a,marginBlock:0,verticalAlign:"middle",borderTop:0,borderInlineStart:`${d(i)} solid ${r}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${d(t.dividerHorizontalGutterMargin)} 0`},[`&-horizontal${e}-with-text`]:{display:"flex",alignItems:"center",margin:`${d(t.dividerHorizontalWithTextGutterMargin)} 0`,color:t.colorTextHeading,fontWeight:500,fontSize:t.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${r}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${d(i)} solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${e}-with-text-left`]:{"&::before":{width:`calc(${l} * 100%)`},"&::after":{width:`calc(100% - ${l} * 100%)`}},[`&-horizontal${e}-with-text-right`]:{"&::before":{width:`calc(100% - ${l} * 100%)`},"&::after":{width:`calc(${l} * 100%)`}},[`${e}-inner-text`]:{display:"inline-block",paddingBlock:0,paddingInline:c},"&-dashed":{background:"none",borderColor:r,borderStyle:"dashed",borderWidth:`${d(i)} 0 0`},[`&-horizontal${e}-with-text${e}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${e}-dashed`]:{borderInlineStartWidth:i,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},"&-dotted":{background:"none",borderColor:r,borderStyle:"dotted",borderWidth:`${d(i)} 0 0`},[`&-horizontal${e}-with-text${e}-dotted`]:{"&::before, &::after":{borderStyle:"dotted none none"}},[`&-vertical${e}-dotted`]:{borderInlineStartWidth:i,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${e}-with-text`]:{color:t.colorText,fontWeight:"normal",fontSize:t.fontSize},[`&-horizontal${e}-with-text-left${e}-no-default-orientation-margin-left`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${e}-inner-text`]:{paddingInlineStart:o}},[`&-horizontal${e}-with-text-right${e}-no-default-orientation-margin-right`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${e}-inner-text`]:{paddingInlineEnd:o}}})}},H=t=>({textPaddingInline:"1em",orientationMargin:.05,verticalMarginInline:t.marginXS}),T=B("Divider",t=>{const e=N(t,{dividerHorizontalWithTextGutterMargin:t.margin,dividerHorizontalGutterMargin:t.marginLG,sizePaddingEdgeHorizontal:0});return[A(e)]},H,{unitless:{orientationMargin:!0}});var _=function(t,e){var o={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(o[r[i]]=t[r[i]]);return o};const V=t=>{const{getPrefixCls:e,direction:o,divider:r}=s.useContext(P),{prefixCls:i,type:c="horizontal",orientation:l="center",orientationMargin:a,className:$,rootClassName:u,children:h,dashed:x,variant:g="solid",plain:v,style:S}=t,w=_(t,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","variant","plain","style"]),n=e("divider",i),[C,y,z]=T(n),f=!!h,m=l==="left"&&a!=null,b=l==="right"&&a!=null,I=W(n,r==null?void 0:r.className,y,z,`${n}-${c}`,{[`${n}-with-text`]:f,[`${n}-with-text-${l}`]:f,[`${n}-dashed`]:!!x,[`${n}-${g}`]:g!=="solid",[`${n}-plain`]:!!v,[`${n}-rtl`]:o==="rtl",[`${n}-no-default-orientation-margin-left`]:m,[`${n}-no-default-orientation-margin-right`]:b},$,u),p=s.useMemo(()=>typeof a=="number"?a:/^\d+$/.test(a)?Number(a):a,[a]),E=Object.assign(Object.assign({},m&&{marginLeft:p}),b&&{marginRight:p});return C(s.createElement("div",Object.assign({className:I,style:Object.assign(Object.assign({},r==null?void 0:r.style),S)},w,{role:"separator"}),h&&c!=="vertical"&&s.createElement("span",{className:`${n}-inner-text`,style:E},h)))};var D=(t=>(t.INPUT="input",t.TEXTAREA="textarea",t.RADIO="radio",t.CHECKBOX="checkbox",t))(D||{});const X="exists",F={fields:[],title:"Название формы",description:"Описание формы",timer:"",tags:[]},U="https://api.dicebear.com/6.x/avataaars/svg";export{U as B,V as D,D as F,F as N,L as R,X as a};
