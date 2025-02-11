import{b as d,cj as M,f as F,U as R,j as s,cg as A,G as B,T as m,B as E,R as c,ci as x}from"./index-CYtm5Ivz.js";import{u as L,C as U,U as i,a as t}from"./UserFormInput-ucnhghsn.js";import{l as V,g as p,k as I,i as u,j as h}from"./index-cf3E3JiM.js";import{R as f}from"./index-C9PH2wNh.js";import{A as O,a as G}from"./AuthTextLink-CfcX9Xht.js";import{u as W}from"./usePageTitle-BgdMRMEQ.js";import{F as j}from"./index-DiPSvnV-.js";import"./index-DJCO6rUO.js";import"./row-D0k2i_7I.js";import"./index-fc85Zh8G.js";import"./responsiveObserver-BfmC1mZK.js";const ss=()=>{const[o,w]=d.useState(!1),[l,y]=d.useState(!1),{control:a,handleSubmit:g,watch:b,reset:N}=L({mode:"onBlur"}),[P,{isLoading:e}]=M(),n=F(),v=R(),z=()=>w(r=>!r),S=()=>y(r=>!r),C=b("password"),T=async r=>{n(x(!0));try{await P(r).unwrap(),v(c.HOME)}catch(k){console.error("Ошибка авторизации:",k)}finally{n(x(!1))}};return W("Регистрация"),s.jsx(A,{children:s.jsx(U,{className:"flex px-8 md:p-0 justify-center items-center min-h-screen overflow-y-auto",children:s.jsxs(B,{className:"px-8 py-8 rounded-2xl max-w-sm w-full",style:{zIndex:10},children:[s.jsxs("div",{className:"mb-6",children:[s.jsx("div",{className:"flex justify-center mb-2",children:s.jsx("div",{className:"w-14 h-14 flex items-center justify-center bg-bgPrimary rounded-2xl shadow-lg",children:s.jsx(V,{size:30})})}),s.jsx(m.Title,{level:2,style:{marginBottom:"0.5rem"},children:"Регистрация"}),s.jsx(m.Title,{level:5,style:{margin:"0"},children:"Зарегистрироваться с помощью почты"})]}),s.jsxs(j,{onFinish:g(T),autoComplete:"off",children:[s.jsx(i,{control:a,name:"name",disabled:e,placeholder:"Имя",rules:t.name,prefix:s.jsx(p,{size:20,className:"mr-1"})}),s.jsx(i,{control:a,name:"surname",disabled:e,placeholder:"Фамилия",rules:t.surname,prefix:s.jsx(p,{size:20,className:"mr-1"})}),s.jsx(i,{control:a,name:"email",disabled:e,placeholder:"Email",rules:t.email,prefix:s.jsx(I,{size:20,className:"mr-1"})}),s.jsx(i,{control:a,name:"password",disabled:e,type:o?"text":"password",placeholder:"Пароль",rules:t.password,prefix:s.jsx(f,{size:20,className:"mr-1"}),suffix:s.jsx("span",{onClick:z,className:"flex items-center justify-center cursor-pointer p-0 m-0 h-auto w-auto hover:text-gray-500","aria-label":o?"hidePassword":"showPassword",children:o?s.jsx(u,{size:20}):s.jsx(h,{size:20})})}),s.jsx(i,{control:a,name:"copyPassword",type:l?"text":"password",disabled:e,placeholder:"Пароль",rules:t.copyPassword(C),prefix:s.jsx(f,{size:20,className:"mr-1"}),suffix:s.jsx("span",{onClick:S,className:"flex items-center justify-center cursor-pointer p-0 m-0 h-auto w-auto hover:text-gray-500","aria-label":l?"hidePassword":"showPassword",children:l?s.jsx(u,{size:20}):s.jsx(h,{size:20})})}),s.jsx(O,{disabled:e,loading:e,children:"Зарегистрироваться"}),s.jsxs("div",{className:"flex justify-between mb-0 gap-1",children:[s.jsx(j.Item,{className:"flex items-center justify-end",children:s.jsx(E,{onClick:()=>N(),color:"default",variant:"solid",children:"Очистить форму"})}),s.jsx(G,{text:"Есть аккаунт?",linkText:"Войти",linkTo:c.LOGIN})]})]})]})})})};export{ss as Signup};
