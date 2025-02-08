import{b as c,c4 as k,f as F,aq as R,j as s,c1 as A,ao as B,by as m,B as E,R as d,c3 as x}from"./index-DKiSfYVU.js";import{C as L,A as V,a as I}from"./AuthTextLink-D4s1Etcd.js";import{u as O,U as r,a as t}from"./UserFormInput-CLTDEnOt.js";import{j as U,d as p,g as G,h as u,i as h}from"./index-BayaFlfS.js";import{R as f}from"./index-DLYSuRfN.js";import{u as W}from"./usePageTitle-C0a4UgZv.js";import{F as j}from"./index-CzRNzGi2.js";import"./index-Ct0aK3ha.js";import"./SearchOutlined-BHK5eFvk.js";import"./row-C91WiqjA.js";const $=()=>{const[i,w]=c.useState(!1),[o,y]=c.useState(!1),{control:e,handleSubmit:g,watch:b,reset:N}=O({mode:"onBlur"}),[P,{isLoading:l}]=k(),n=F(),v=R(),z=()=>w(a=>!a),S=()=>y(a=>!a),C=b("password"),M=async a=>{n(x(!0));try{await P(a).unwrap(),v(d.HOME)}catch(T){console.error("Ошибка авторизации:",T)}finally{n(x(!1))}};return W("Регистрация"),s.jsx(A,{children:s.jsx(L,{className:"flex justify-center items-center min-h-screen overflow-y-auto px-8",children:s.jsxs(B,{className:"px-8 py-8 rounded-2xl max-w-sm w-full",style:{zIndex:10},children:[s.jsxs("div",{className:"mb-6",children:[s.jsx("div",{className:"flex justify-center mb-2",children:s.jsx("div",{className:"w-14 h-14 flex items-center justify-center bg-bgPrimary rounded-2xl shadow-lg",children:s.jsx(U,{size:30})})}),s.jsx(m.Title,{level:2,style:{marginBottom:"0.5rem"},children:"Регистрация"}),s.jsx(m.Title,{level:5,style:{margin:"0"},children:"Зарегистрироваться с помощью почты"})]}),s.jsxs(j,{onFinish:g(M),autoComplete:"off",children:[s.jsx(r,{control:e,name:"name",placeholder:"Имя",rules:t.name,prefix:s.jsx(p,{size:20,className:"mr-1"})}),s.jsx(r,{control:e,name:"surname",placeholder:"Фамилия",rules:t.surname,prefix:s.jsx(p,{size:20,className:"mr-1"})}),s.jsx(r,{control:e,name:"email",placeholder:"Email",rules:t.email,prefix:s.jsx(G,{size:20,className:"mr-1"})}),s.jsx(r,{control:e,name:"password",type:i?"text":"password",placeholder:"Пароль",rules:t.password,prefix:s.jsx(f,{size:20,className:"mr-1"}),suffix:s.jsx("span",{onClick:z,className:"flex items-center justify-center cursor-pointer p-0 m-0 h-auto w-auto hover:text-gray-500","aria-label":i?"hidePassword":"showPassword",children:i?s.jsx(u,{size:20}):s.jsx(h,{size:20})})}),s.jsx(r,{control:e,name:"copyPassword",type:o?"text":"password",placeholder:"Пароль",rules:t.copyPassword(C),prefix:s.jsx(f,{size:20,className:"mr-1"}),suffix:s.jsx("span",{onClick:S,className:"flex items-center justify-center cursor-pointer p-0 m-0 h-auto w-auto hover:text-gray-500","aria-label":o?"hidePassword":"showPassword",children:o?s.jsx(u,{size:20}):s.jsx(h,{size:20})})}),s.jsx(V,{disabled:l,loading:l,children:"Зарегистрироваться"}),s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(j.Item,{className:"flex justify-end mb-0",children:s.jsx(E,{onClick:()=>N(),color:"default",variant:"solid",children:"Очистить форму"})}),s.jsx(I,{text:"Есть аккаунт?",linkText:"Войти",linkTo:d.LOGIN})]})]})]})})})};export{$ as Signup};
