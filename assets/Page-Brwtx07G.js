import{j as e,G as d,T as t,bb as m,bd as p,ce as f,o as j,B as x,L as o}from"./index-04I5l0VS.js";import{NotFound as u}from"./Page-BYH-YaK2.js";import{u as h}from"./usePageTitle-nQ1xBVOI.js";const g=({data:r})=>{const n=s=>typeof s=="string"?e.jsx(t.Text,{children:s}):e.jsx(t.Text,{children:s.map((l,i)=>e.jsx(t.Text,{children:l},l+i))});return e.jsx(d,{className:"p-3 shadow-none",children:e.jsxs("div",{className:"flex flex-col items-start gap-1",children:[e.jsx(t.Text,{className:"font-semibold",children:r.question}),n(r.answer)]})},r.id)},L=()=>{const{formId:r,responseId:n}=m(),{data:s,isLoading:l}=p(r||""),{data:i,isLoading:c}=f(n||"");return h(s!=null&&s.title?`Отклик | ${s.title}`:"Отклик"),l||c?e.jsx(j,{}):!s||!i?e.jsx(u,{}):e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(t.Text,{className:"!text-xl font-medium xl:px-0 md:!text-2xl self-start",children:"Отклик на форму"}),e.jsxs(d,{className:"flex flex-col gap-4 p-5 w-full",children:[e.jsxs("div",{className:"flex flex-col justify-center",children:[e.jsx(t.Text,{className:"text-xl",children:s.title}),e.jsx(t.Text,{children:s.description})]}),e.jsxs("div",{className:"flex flex-col gap-3",children:[i.fields.map(a=>e.jsx(g,{data:a},a.id)),e.jsxs("div",{className:"flex items-center gap-3 justify-end",children:[e.jsx(x,{children:e.jsx(o,{to:`/forms/${r}/edit`,children:"Редактировать форму"})}),e.jsx(x,{type:"primary",children:e.jsx(o,{to:`/forms/${r}`,children:"Перейти к форме"})})]})]})]})]})};export{L as FormResponse};
