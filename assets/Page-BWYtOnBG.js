import{j as e,ao as c,by as t,bC as p,bE as x,b$ as f,aj as h,B as l,L as d}from"./index-DKiSfYVU.js";import{NotFound as j}from"./Page-Bk918JrL.js";import{u as g}from"./usePageTitle-C0a4UgZv.js";const u=({data:r})=>{const a=s=>typeof s=="string"?e.jsx(t.Paragraph,{style:{textAlign:"start",fontSize:"0.875rem"},children:s}):e.jsx(t.Paragraph,{style:{textAlign:"start",fontSize:"0.875rem",display:"flex",flexDirection:"column",gap:"0.5rem"},children:s.map((i,n)=>e.jsx(t.Text,{children:i},i+n))});return e.jsx(c,{className:"p-5",children:e.jsxs("div",{className:"flex flex-col items-start gap-1",children:[e.jsx(t.Title,{level:5,style:{fontWeight:600,marginBottom:0},children:r.question}),a(r.answer)]})},r.id)},N=()=>{const{formId:r,responseId:a}=p(),{data:s,isLoading:i}=x(r||""),{data:n,isLoading:m}=f(a||"");return g(s!=null&&s.title?`Отклик | ${s.title}`:"Отклик"),i||m?e.jsx(h,{}):!s||!n?e.jsx(j,{}):e.jsxs("div",{className:"pt-5 pb-20",children:[e.jsxs(t.Text,{style:{fontSize:"0.875rem",fontWeight:"bold"},children:["Название формы — ",s.title]}),e.jsx(t.Paragraph,{style:{fontSize:"0.875rem",marginTop:"0.5rem"},children:s.description})," ",e.jsxs("div",{className:"flex flex-col gap-2 mt-8",children:[n.fields.map(o=>e.jsx(u,{data:o},o.id)),e.jsxs("div",{className:"flex items-center gap-3 mt-4",children:[e.jsx(l,{type:"primary",children:e.jsx(d,{to:`/forms/${r}`,children:"Перейти к форме"})}),e.jsx(l,{children:e.jsx(d,{to:`/forms/${r}/edit`,children:"Редактировать форму"})})]})]})]})};export{N as FormResponse};
