import{b as w,c7 as y,h as b,al as v,j as s,bE as l,S as k,q as i,c8 as n}from"./index-KjgpTZ4D.js";import{L,C as N,A as S,a as c}from"./AuthTextLink-BSk_o75s.js";import{u as E,U as m,a as d}from"./UserFormInput-CgYSPA_R.js";import{G as F,h as T,i as P,j as R}from"./index-FVIe_JHD.js";import{R as M}from"./index-B3qg__9c.js";import{u as z}from"./usePageTitle-E8o8tVs4.js";import{F as C}from"./index-CfccGPf9.js";import"./index-DwvoWsHF.js";import"./SearchOutlined--2PuX4q0.js";import"./row-zHu7lj0b.js";function O(e){return F({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"},child:[]},{tag:"polyline",attr:{points:"10 17 15 12 10 7"},child:[]},{tag:"line",attr:{x1:"15",y1:"12",x2:"3",y2:"12"},child:[]}]})(e)}const Y=()=>{const[e,x]=w.useState(!1),{control:a,handleSubmit:h}=E({mode:"onBlur"}),[u,{isLoading:o}]=y(),r=b(),p=v(),f=()=>x(t=>!t),j=async t=>{r(n(!0));try{await u(t).unwrap(),p(i.HOME)}catch(g){console.error("Ошибка авторизации:",g)}finally{r(n(!1))}};return z("Авторизация"),s.jsx(L,{className:"min-h-screen auth-bg-gradient overflow-hidden",children:s.jsx(N,{className:"flex justify-center items-center min-h-screen overflow-y-auto",children:s.jsxs("div",{className:"bg-white bg-opacity-20 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg max-w-sm w-full",children:[s.jsxs("div",{className:"mb-6",children:[s.jsx("div",{className:"flex justify-center mb-2",children:s.jsx("div",{className:"w-14 h-14 flex items-center justify-center bg-[#EEF5F8] rounded-2xl shadow-lg",children:s.jsx(O,{size:30,color:"#808897"})})}),s.jsx(l.Title,{level:2,style:{marginBottom:"0.5rem"},children:"Авторизация"}),s.jsx(l.Title,{level:5,style:{margin:"0"},children:"Войти с помощью почты"})]}),s.jsxs(C,{onFinish:h(j),autoComplete:"off",children:[s.jsx(m,{control:a,name:"email",placeholder:"Email",rules:d.email,prefix:s.jsx(T,{color:"#808897",size:20,className:"mr-1"})}),s.jsx(m,{control:a,name:"password",type:e?"text":"password",placeholder:"Пароль",rules:d.password,prefix:s.jsx(M,{color:"#808897",size:20,className:"mr-1"}),suffix:s.jsx("span",{onClick:f,className:"flex items-center justify-center cursor-pointer p-0 m-0 h-auto w-auto hover:text-gray-500","aria-label":e?"hidePassword":"showPassword",children:e?s.jsx(P,{size:20}):s.jsx(R,{size:20})})}),s.jsx(S,{disabled:o,children:o?s.jsx(k,{size:"small"}):"Войти"}),s.jsx(c,{text:"Забыли пароль?",linkText:"Сбросить пароль",linkTo:i.RECOVERY_PASSWORD}),s.jsx(c,{text:"Нет аккаунта?",linkText:"Зарегистрироваться",linkTo:i.SIGNUP})]})]})})})};export{Y as Login};
