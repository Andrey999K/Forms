import{h as P,k,l as I,bv as M,bx as _,b as i,bu as r,j as t,L as R,S as b,bD as L,bG as Y,bH as G}from"./index-Wksj64F0.js";import{S as j,u as V,C as $}from"./base-CSI8LZO8.js";import{P as H}from"./PageTitle-BndTg6mX.js";import{S as q}from"./index-CsX_RiAa.js";import{D as F}from"./index-56uy7J0h.js";import"./Skeleton-DFODZ4KB.js";import"./PlusOutlined-B7YrIz-m.js";import"./SearchOutlined-B9t4gyto.js";const{Text:O,Title:m}=L,{RangePicker:Q}=F,z="YYYY-MM-DD",B=30,J={TIME_ASC:{field:"createdAt",type:j.ASC},TIME_DESC:{field:"createdAt",type:j.DESC}},K=[{value:"TIME_DESC",label:"Сначала новые"},{value:"TIME_ASC",label:"Сначала старые"}],re=()=>{const x=P(),n=k(e=>e.responseSlice.status),[l,p]=I(),{formId:u}=M(),{data:o}=_(u??""),[c,f]=i.useState([]),[d,y]=i.useState(l.get("sort")??"TIME_DESC"),[a,D]=i.useState({start:l.get("start")?r.unix(Number(l.get("start"))):null,end:l.get("end")?r.unix(Number(l.get("end"))):null}),[v,h]=i.useState(!0),E=(()=>{const e=[];if(a.start&&(e==null||e.push({key:"createdAt",operator:">=",value:new Date(r(a.start).toDate())})),a.end){let s=a.end.clone();s=s.add(1,"day"),e==null||e.push({key:"createdAt",operator:"<=",value:new Date(s.toDate())})}return e})(),{ref:C}=V({threshold:1,onChange:async e=>{e&&n!=="pending"&&T()}});i.useEffect(()=>{const e={sort:d};a.start&&(e.start=a.start.unix().toString()),a.end&&(e.end=a.end.unix().toString()),p(e,{replace:!0})},[d,a,p]);const N=e=>{g(),y(e)},w=(e,s)=>{g(),D({start:s[0]?r(s[0]):null,end:s[0]?r(s[1]):null})},T=()=>{x(Y({limit:B,reference:{collectionName:"form",id:u??"",key:"formId"},filters:E,sort:J[d]})).unwrap().then(e=>{const s=e.data.data??[];if(!s.length){h(!1);return}f(A=>[...A,...s])})},g=()=>{x(G()),h(!0),f([])},S=(n==="success"||n===null)&&v;return t.jsxs(t.Fragment,{children:[t.jsx(H,{title:o?`Отклики | ${o.title}`:"Отклики"}),t.jsxs(m,{className:"mt-10 px-5 !text-2xl lg:px-0 md:!text-4xl",children:["Отклики формы ",t.jsx("br",{}),' "',o==null?void 0:o.title,'"']}),t.jsxs("div",{className:"flex flex-col w-full gap-2 mt-10 px-5 mb-4 lg:px-0 sm:justify-between sm:flex-row",children:[t.jsx(q,{defaultValue:d,onChange:N,options:K,disabled:!c.length,className:"w-full sm:w-[200px] text-left"}),t.jsx(Q,{defaultValue:[a.start,a.end],onChange:w,className:"w-full sm:max-w-[300px]",format:z,allowEmpty:!0,disabled:!c.length,maxDate:r()})]}),t.jsx("div",{className:"flex flex-col gap-4 mb-4 px-5 lg:px-0",children:c.length?c.map((e,s)=>t.jsx(R,{to:`/forms/${u}/responses/${e.id}`,children:t.jsx($,{className:"bg-[#fdf8f4]/85 backdrop-blur-sm hover:backdrop-blur-sm hover:bg-[#fdf8f4] hover:-translate-y-1 hover:shadow-lg transition duration-200 ease-in-out",children:t.jsxs("div",{className:"flex items-center justify-between gap-5",children:[t.jsxs(m,{italic:!0,level:5,style:{margin:0},children:["Отклик #",s+1]}),t.jsx(O,{children:r(e.updatedAt).toString()})]})})},e.id)):n!=="pending"&&!S&&t.jsx(m,{level:2,children:"У данной формы нет откликов."})}),n==="pending"&&t.jsx("div",{className:"mb-5 mt-4",children:t.jsx(b,{})}),S&&t.jsx("div",{ref:C,className:"mt-4 mb-5",children:t.jsx(b,{})}),n==="rejected"&&!c.length&&t.jsx(m,{level:2,children:"Произошла ошибка, попробуйте обновить страницу"})]})};export{re as FormResponses};
