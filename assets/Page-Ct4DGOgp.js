import{j as s,I as m,bx as x,bz as p,c3 as f,J as j,b as h,H as u,bC as N,E as o,L as c}from"./index-SlQ-HNSk.js";const g=({data:e})=>{const n=t=>typeof t=="string"?s.jsx("p",{className:"text-start text-sm",children:t}):s.jsx("p",{className:"text-start text-sm flex flex-col gap-2",children:t.map((r,a)=>s.jsx("span",{children:r},r+a))});return s.jsx(m,{className:"p-5",children:s.jsxs("div",{className:"flex flex-col items-start gap-1",children:[s.jsx("h3",{className:"font-semibold",children:e.question}),n(e.answer)]})},e.id)},L=()=>{const{formId:e,responseId:n}=x(),{data:t,isLoading:r}=p(e||""),{data:a,isLoading:l}=f(n||""),d=j();if(h.useEffect(()=>{document.title="Отклик"},[]),r||l)return s.jsx(u,{});if(!t||!a){d(N.NOT_FOUND);return}return s.jsxs("div",{className:"pt-5 pb-20",children:[s.jsxs("h2",{className:"font-semibold",children:["Название формы — ",t.title]}),s.jsx("p",{className:"text-sm mt-2",children:t.description}),s.jsxs("div",{className:"flex flex-col gap-2 mt-8",children:[a.fields.map(i=>s.jsx(g,{data:i},i.id)),s.jsxs("div",{className:"flex items-center gap-3 mt-4",children:[s.jsx(o,{type:"primary",children:s.jsx(c,{to:`/forms/${e}`,children:"Перейти к форме"})}),s.jsx(o,{children:s.jsx(c,{to:`/forms/${e}/edit`,children:"Редактировать форму"})})]})]})]})};export{L as FormResponse};
