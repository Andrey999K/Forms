import{c8 as c,j as e,bD as r,S as d,c5 as u,y as h}from"./index-XNEOmkkQ.js";import{L as p,C as x,A as j,a as f}from"./AuthTextLink-azt5KGol.js";import{u as b,U as g,a as y}from"./UserFormInput-cS-Qnztn.js";import{h as w}from"./index-D-X0ZdpH.js";import{u as v}from"./usePageTitle-tdOtIpzz.js";import{F as T}from"./index-BkaoFA1_.js";import"./index-DWMHSgaM.js";import"./SearchOutlined-C__73JiL.js";import"./row-pAXhkK7w.js";const A=()=>{const{control:o,handleSubmit:a,reset:t}=b({mode:"onChange"}),[i,{isLoading:s}]=c(),l=async({email:m})=>{try{await i(m).unwrap(),h.success("Письмо для сброса пароля отправлено на указанный email"),t()}catch(n){console.error("Ошибка сброса пароля:",n)}};return v("Восстановление пароля"),e.jsx(p,{className:"min-h-screen auth-bg-gradient bg-cover bg-center overflow-hidden",children:e.jsx(x,{className:"flex justify-center items-center min-h-screen overflow-y-auto",children:e.jsxs("div",{className:"bg-white bg-opacity-20 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg max-w-sm w-full",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx(r.Title,{level:2,style:{marginBottom:"0.5rem"},children:"Сброс пароля"}),e.jsx(r.Title,{level:5,style:{margin:"0"},children:"Введите почту, на которую будет отправлено письмо для сброса пароля."})]}),e.jsxs(T,{onFinish:a(l),autoComplete:"off",children:[e.jsx(g,{control:o,name:"email",placeholder:"Email",rules:y.email,prefix:e.jsx(w,{color:"#808897",size:20,className:"mr-1"})}),e.jsx(j,{disabled:s,children:s?e.jsx(d,{size:"small"}):"Сбросить пароль"}),e.jsx(f,{linkText:"На страницу входа",linkTo:u.LOGIN})]})]})})})};export{A as RecoveryPassword};
