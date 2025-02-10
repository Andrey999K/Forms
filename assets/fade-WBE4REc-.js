import{K as i,bW as s}from"./index-DzLWzYrC.js";const r=new i("antFadeIn",{"0%":{opacity:0},"100%":{opacity:1}}),c=new i("antFadeOut",{"0%":{opacity:1},"100%":{opacity:0}}),u=function(a){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;const{antCls:o}=a,n=`${o}-fade`,t=e?"&":"";return[s(n,r,c,a.motionDurationMid,e),{[`
        ${t}${n}-enter,
        ${t}${n}-appear
      `]:{opacity:0,animationTimingFunction:"linear"},[`${t}${n}-leave`]:{animationTimingFunction:"linear"}}]};export{u as i};
