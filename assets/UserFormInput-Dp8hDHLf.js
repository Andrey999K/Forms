import{g as wt,u as St,b as de,C as Dt,c as Ct,Y as A,j as ie,O as Ke}from"./index-CiIgmuQL.js";import{F as Et}from"./index-CA0fvEJV.js";import{I as kt}from"./index-CvxP4lQU.js";const Tt=e=>{const{antCls:r,componentCls:t,colorText:i,footerBg:n,headerHeight:l,headerPadding:d,headerColor:y,footerPadding:m,fontSize:w,bodyBg:x,headerBg:v}=e;return{[t]:{display:"flex",flex:"auto",flexDirection:"column",minHeight:0,background:x,"&, *":{boxSizing:"border-box"},[`&${t}-has-sider`]:{flexDirection:"row",[`> ${t}, > ${t}-content`]:{width:0}},[`${t}-header, &${t}-footer`]:{flex:"0 0 auto"},"&-rtl":{direction:"rtl"}},[`${t}-header`]:{height:l,padding:d,color:y,lineHeight:St(l),background:v,[`${r}-menu`]:{lineHeight:"inherit"}},[`${t}-footer`]:{padding:m,color:i,fontSize:w,background:n},[`${t}-content`]:{flex:"auto",color:i,minHeight:0}}},Bt=e=>{const{colorBgLayout:r,controlHeight:t,controlHeightLG:i,colorText:n,controlHeightSM:l,marginXXS:d,colorTextLightSolid:y,colorBgContainer:m}=e,w=i*1.25;return{colorBgHeader:"#001529",colorBgBody:r,colorBgTrigger:"#002140",bodyBg:r,headerBg:"#001529",headerHeight:t*2,headerPadding:`0 ${w}px`,headerColor:n,footerPadding:`${l}px ${w}px`,footerBg:r,siderBg:"#001529",triggerHeight:i+d*2,triggerBg:"#002140",triggerColor:y,zeroTriggerWidth:i,zeroTriggerHeight:i,lightSiderBg:m,lightTriggerBg:m,lightTriggerColor:n}},Lt=[["colorBgBody","bodyBg"],["colorBgHeader","headerBg"],["colorBgTrigger","triggerBg"]],Ot=wt("Layout",e=>[Tt(e)],Bt,{deprecatedTokens:Lt});var Nt=function(e,r){var t={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&r.indexOf(i)<0&&(t[i]=e[i]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,i=Object.getOwnPropertySymbols(e);n<i.length;n++)r.indexOf(i[n])<0&&Object.prototype.propertyIsEnumerable.call(e,i[n])&&(t[i[n]]=e[i[n]]);return t};function Rt(e){let{suffixCls:r,tagName:t,displayName:i}=e;return n=>de.forwardRef((d,y)=>de.createElement(n,Object.assign({ref:y,suffixCls:r,tagName:t},d)))}const Ut=de.forwardRef((e,r)=>{const{prefixCls:t,suffixCls:i,className:n,tagName:l}=e,d=Nt(e,["prefixCls","suffixCls","className","tagName"]),{getPrefixCls:y}=de.useContext(Dt),m=y("layout",t),[w,x,v]=Ot(m),B=i?`${m}-${i}`:m;return w(de.createElement(l,Object.assign({className:Ct(t||B,n,x,v),ref:r},d)))}),or=Rt({suffixCls:"content",tagName:"main",displayName:"Content"})(Ut),cr={name:{required:{value:!0,message:"Введите имя"},validate:{startsWithCapital:(e="")=>/^[A-ZА-ЯЁ]/.test(e)||"Имя должно начинаться с заглавной буквы",validCharacters:(e="")=>/^[A-ZА-ЯЁ][a-zа-яё\s-]+$/i.test(e)||"Имя должно содержать только буквы и дефисы"},minLength:{value:2,message:"Имя должно быть не менее 2 символов"},maxLength:{value:50,message:"Имя должно быть не более 50 символов"}},surname:{required:{value:!0,message:"Введите фамилию"},validate:{startsWithCapital:(e="")=>/^[A-ZА-ЯЁ]/.test(e)||"Фамилия должна начинаться с заглавной буквы",validCharacters:(e="")=>/^[A-ZА-ЯЁ][a-zа-яё\s-]+$/i.test(e)||"Фамилия должна содержать только буквы и дефисы"},minLength:{value:2,message:"Фамилия должна быть не менее 2 символов"},maxLength:{value:50,message:"Фамилия должна быть не более 50 символов"}},email:{required:{value:!0,message:"Введите email"},pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,message:"Неверный формат электронной почты"}},password:{required:{value:!0,message:"Введите пароль"},minLength:{value:6,message:"Минимальная длина пароля 6 символов"},maxLength:{value:25,message:"Максимальная длина пароля 25 символов"}},copyPassword:e=>({required:{value:!0,message:"Введите пароль"},minLength:{value:6,message:"Минимальная длина пароля 6 символов"},maxLength:{value:25,message:"Максимальная длина пароля 25 символов"},validate:{matchesPassword:(r="")=>r===e||"Пароли должны совпадать"}})};var he=e=>e.type==="checkbox",te=e=>e instanceof Date,R=e=>e==null;const it=e=>typeof e=="object";var D=e=>!R(e)&&!Array.isArray(e)&&it(e)&&!te(e),at=e=>D(e)&&e.target?he(e.target)?e.target.checked:e.target.value:e,Pt=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,nt=(e,r)=>e.has(Pt(r)),Mt=e=>{const r=e.constructor&&e.constructor.prototype;return D(r)&&r.hasOwnProperty("isPrototypeOf")},Be=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function P(e){let r;const t=Array.isArray(e),i=typeof FileList<"u"?e instanceof FileList:!1;if(e instanceof Date)r=new Date(e);else if(e instanceof Set)r=new Set(e);else if(!(Be&&(e instanceof Blob||i))&&(t||D(e)))if(r=t?[]:{},!t&&!Mt(e))r=e;else for(const n in e)e.hasOwnProperty(n)&&(r[n]=P(e[n]));else return e;return r}var Ae=e=>Array.isArray(e)?e.filter(Boolean):[],S=e=>e===void 0,f=(e,r,t)=>{if(!r||!D(e))return t;const i=Ae(r.split(/[,[\].]+?/)).reduce((n,l)=>R(n)?n:n[l],e);return S(i)||i===e?S(e[r])?t:e[r]:i},H=e=>typeof e=="boolean",Le=e=>/^\w*$/.test(e),lt=e=>Ae(e.replace(/["|']|\]/g,"").split(/\.|\[/)),p=(e,r,t)=>{let i=-1;const n=Le(r)?[r]:lt(r),l=n.length,d=l-1;for(;++i<l;){const y=n[i];let m=t;if(i!==d){const w=e[y];m=D(w)||Array.isArray(w)?w:isNaN(+n[i+1])?{}:[]}if(y==="__proto__"||y==="constructor"||y==="prototype")return;e[y]=m,e=e[y]}return e};const be={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},W={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},X={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},It=A.createContext(null),Oe=()=>A.useContext(It);var ut=(e,r,t,i=!0)=>{const n={defaultValues:r._defaultValues};for(const l in e)Object.defineProperty(n,l,{get:()=>{const d=l;return r._proxyFormState[d]!==W.all&&(r._proxyFormState[d]=!i||W.all),t&&(t[d]=!0),e[d]}});return n},M=e=>D(e)&&!Object.keys(e).length,ot=(e,r,t,i)=>{t(e);const{name:n,...l}=e;return M(l)||Object.keys(l).length>=Object.keys(r).length||Object.keys(l).find(d=>r[d]===(!i||W.all))},ge=e=>Array.isArray(e)?e:[e],ct=(e,r,t)=>!e||!r||e===r||ge(e).some(i=>i&&(t?i===r:i.startsWith(r)||r.startsWith(i)));function Ne(e){const r=A.useRef(e);r.current=e,A.useEffect(()=>{const t=!e.disabled&&r.current.subject&&r.current.subject.subscribe({next:r.current.next});return()=>{t&&t.unsubscribe()}},[e.disabled])}function Ht(e){const r=Oe(),{control:t=r.control,disabled:i,name:n,exact:l}=e||{},[d,y]=A.useState(t._formState),m=A.useRef(!0),w=A.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,validatingFields:!1,isValidating:!1,isValid:!1,errors:!1}),x=A.useRef(n);return x.current=n,Ne({disabled:i,next:v=>m.current&&ct(x.current,v.name,l)&&ot(v,w.current,t._updateFormState)&&y({...t._formState,...v}),subject:t._subjects.state}),A.useEffect(()=>(m.current=!0,w.current.isValid&&t._updateValid(!0),()=>{m.current=!1}),[t]),A.useMemo(()=>ut(d,t,w.current,!1),[d,t])}var Z=e=>typeof e=="string",ft=(e,r,t,i,n)=>Z(e)?(i&&r.watch.add(e),f(t,e,n)):Array.isArray(e)?e.map(l=>(i&&r.watch.add(l),f(t,l))):(i&&(r.watchAll=!0),t);function jt(e){const r=Oe(),{control:t=r.control,name:i,defaultValue:n,disabled:l,exact:d}=e||{},y=A.useRef(i);y.current=i,Ne({disabled:l,subject:t._subjects.values,next:x=>{ct(y.current,x.name,d)&&w(P(ft(y.current,t._names,x.values||t._formValues,!1,n)))}});const[m,w]=A.useState(t._getWatch(i,n));return A.useEffect(()=>t._removeUnmounted()),m}function $t(e){const r=Oe(),{name:t,disabled:i,control:n=r.control,shouldUnregister:l}=e,d=nt(n._names.array,t),y=jt({control:n,name:t,defaultValue:f(n._formValues,t,f(n._defaultValues,t,e.defaultValue)),exact:!0}),m=Ht({control:n,name:t,exact:!0}),w=A.useRef(n.register(t,{...e.rules,value:y,...H(e.disabled)?{disabled:e.disabled}:{}})),x=A.useMemo(()=>Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!f(m.errors,t)},isDirty:{enumerable:!0,get:()=>!!f(m.dirtyFields,t)},isTouched:{enumerable:!0,get:()=>!!f(m.touchedFields,t)},isValidating:{enumerable:!0,get:()=>!!f(m.validatingFields,t)},error:{enumerable:!0,get:()=>f(m.errors,t)}}),[m,t]),v=A.useMemo(()=>({name:t,value:y,...H(i)||m.disabled?{disabled:m.disabled||i}:{},onChange:B=>w.current.onChange({target:{value:at(B),name:t},type:be.CHANGE}),onBlur:()=>w.current.onBlur({target:{value:f(n._formValues,t),name:t},type:be.BLUR}),ref:B=>{const U=f(n._fields,t);U&&B&&(U._f.ref={focus:()=>B.focus(),select:()=>B.select(),setCustomValidity:C=>B.setCustomValidity(C),reportValidity:()=>B.reportValidity()})}}),[t,n._formValues,i,m.disabled,y,n._fields]);return A.useEffect(()=>{const B=n._options.shouldUnregister||l,U=(C,ne)=>{const I=f(n._fields,C);I&&I._f&&(I._f.mount=ne)};if(U(t,!0),B){const C=P(f(n._options.defaultValues,t));p(n._defaultValues,t,C),S(f(n._formValues,t))&&p(n._formValues,t,C)}return()=>{(d?B&&!n._state.action:B)?n.unregister(t):U(t,!1)}},[t,n,d,l]),A.useEffect(()=>{H(i)&&f(n._fields,t)&&n._updateDisabledField({disabled:i,fields:n._fields,name:t,value:f(n._fields,t)._f.value})},[i,t,n]),A.useMemo(()=>({field:v,formState:m,fieldState:x}),[v,m,x])}const qt=e=>e.render($t(e));var Wt=(e,r,t,i,n)=>r?{...t[e],types:{...t[e]&&t[e].types?t[e].types:{},[i]:n||!0}}:{},Ge=e=>({isOnSubmit:!e||e===W.onSubmit,isOnBlur:e===W.onBlur,isOnChange:e===W.onChange,isOnAll:e===W.all,isOnTouch:e===W.onTouched}),Xe=(e,r,t)=>!t&&(r.watchAll||r.watch.has(e)||[...r.watch].some(i=>e.startsWith(i)&&/^\.\w+/.test(e.slice(i.length))));const ye=(e,r,t,i)=>{for(const n of t||Object.keys(e)){const l=f(e,n);if(l){const{_f:d,...y}=l;if(d){if(d.refs&&d.refs[0]&&r(d.refs[0],n)&&!i)return!0;if(d.ref&&r(d.ref,d.name)&&!i)return!0;if(ye(y,r))break}else if(D(y)&&ye(y,r))break}}};var zt=(e,r,t)=>{const i=ge(f(e,t));return p(i,"root",r[t]),p(e,t,i),e},Re=e=>e.type==="file",z=e=>typeof e=="function",xe=e=>{if(!Be)return!1;const r=e?e.ownerDocument:0;return e instanceof(r&&r.defaultView?r.defaultView.HTMLElement:HTMLElement)},_e=e=>Z(e),Ue=e=>e.type==="radio",Ve=e=>e instanceof RegExp;const Ye={value:!1,isValid:!1},Je={value:!0,isValid:!0};var dt=e=>{if(Array.isArray(e)){if(e.length>1){const r=e.filter(t=>t&&t.checked&&!t.disabled).map(t=>t.value);return{value:r,isValid:!!r.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!S(e[0].attributes.value)?S(e[0].value)||e[0].value===""?Je:{value:e[0].value,isValid:!0}:Je:Ye}return Ye};const Qe={isValid:!1,value:null};var gt=e=>Array.isArray(e)?e.reduce((r,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:r,Qe):Qe;function et(e,r,t="validate"){if(_e(e)||Array.isArray(e)&&e.every(_e)||H(e)&&!e)return{type:t,message:_e(e)?e:"",ref:r}}var ae=e=>D(e)&&!Ve(e)?e:{value:e,message:""},tt=async(e,r,t,i,n)=>{const{ref:l,refs:d,required:y,maxLength:m,minLength:w,min:x,max:v,pattern:B,validate:U,name:C,valueAsNumber:ne,mount:I,disabled:Y}=e._f,V=f(r,C);if(!I||Y)return{};const K=d?d[0]:l,G=b=>{i&&K.reportValidity&&(K.setCustomValidity(H(b)?"":b||""),K.reportValidity())},E={},re=Ue(l),ve=he(l),Q=re||ve,se=(ne||Re(l))&&S(l.value)&&S(V)||xe(l)&&l.value===""||V===""||Array.isArray(V)&&!V.length,j=Wt.bind(null,C,t,E),me=(b,F,k,N=X.maxLength,q=X.minLength)=>{const $=b?F:k;E[C]={type:b?N:q,message:$,ref:l,...j(b?N:q,$)}};if(n?!Array.isArray(V)||!V.length:y&&(!Q&&(se||R(V))||H(V)&&!V||ve&&!dt(d).isValid||re&&!gt(d).isValid)){const{value:b,message:F}=_e(y)?{value:!!y,message:y}:ae(y);if(b&&(E[C]={type:X.required,message:F,ref:K,...j(X.required,F)},!t))return G(F),E}if(!se&&(!R(x)||!R(v))){let b,F;const k=ae(v),N=ae(x);if(!R(V)&&!isNaN(V)){const q=l.valueAsNumber||V&&+V;R(k.value)||(b=q>k.value),R(N.value)||(F=q<N.value)}else{const q=l.valueAsDate||new Date(V),$=oe=>new Date(new Date().toDateString()+" "+oe),le=l.type=="time",ue=l.type=="week";Z(k.value)&&V&&(b=le?$(V)>$(k.value):ue?V>k.value:q>new Date(k.value)),Z(N.value)&&V&&(F=le?$(V)<$(N.value):ue?V<N.value:q<new Date(N.value))}if((b||F)&&(me(!!b,k.message,N.message,X.max,X.min),!t))return G(E[C].message),E}if((m||w)&&!se&&(Z(V)||n&&Array.isArray(V))){const b=ae(m),F=ae(w),k=!R(b.value)&&V.length>+b.value,N=!R(F.value)&&V.length<+F.value;if((k||N)&&(me(k,b.message,F.message),!t))return G(E[C].message),E}if(B&&!se&&Z(V)){const{value:b,message:F}=ae(B);if(Ve(b)&&!V.match(b)&&(E[C]={type:X.pattern,message:F,ref:l,...j(X.pattern,F)},!t))return G(F),E}if(U){if(z(U)){const b=await U(V,r),F=et(b,K);if(F&&(E[C]={...F,...j(X.validate,F.message)},!t))return G(F.message),E}else if(D(U)){let b={};for(const F in U){if(!M(b)&&!t)break;const k=et(await U[F](V,r),K,F);k&&(b={...k,...j(F,k.message)},G(k.message),t&&(E[C]=b))}if(!M(b)&&(E[C]={ref:K,...b},!t))return E}}return G(!0),E};function Zt(e,r){const t=r.slice(0,-1).length;let i=0;for(;i<t;)e=S(e)?i++:e[r[i++]];return e}function Kt(e){for(const r in e)if(e.hasOwnProperty(r)&&!S(e[r]))return!1;return!0}function T(e,r){const t=Array.isArray(r)?r:Le(r)?[r]:lt(r),i=t.length===1?e:Zt(e,t),n=t.length-1,l=t[n];return i&&delete i[l],n!==0&&(D(i)&&M(i)||Array.isArray(i)&&Kt(i))&&T(e,t.slice(0,-1)),e}var Ce=()=>{let e=[];return{get observers(){return e},next:n=>{for(const l of e)l.next&&l.next(n)},subscribe:n=>(e.push(n),{unsubscribe:()=>{e=e.filter(l=>l!==n)}}),unsubscribe:()=>{e=[]}}},Te=e=>R(e)||!it(e);function J(e,r){if(Te(e)||Te(r))return e===r;if(te(e)&&te(r))return e.getTime()===r.getTime();const t=Object.keys(e),i=Object.keys(r);if(t.length!==i.length)return!1;for(const n of t){const l=e[n];if(!i.includes(n))return!1;if(n!=="ref"){const d=r[n];if(te(l)&&te(d)||D(l)&&D(d)||Array.isArray(l)&&Array.isArray(d)?!J(l,d):l!==d)return!1}}return!0}var yt=e=>e.type==="select-multiple",Gt=e=>Ue(e)||he(e),Ee=e=>xe(e)&&e.isConnected,ht=e=>{for(const r in e)if(z(e[r]))return!0;return!1};function Fe(e,r={}){const t=Array.isArray(e);if(D(e)||t)for(const i in e)Array.isArray(e[i])||D(e[i])&&!ht(e[i])?(r[i]=Array.isArray(e[i])?[]:{},Fe(e[i],r[i])):R(e[i])||(r[i]=!0);return r}function vt(e,r,t){const i=Array.isArray(e);if(D(e)||i)for(const n in e)Array.isArray(e[n])||D(e[n])&&!ht(e[n])?S(r)||Te(t[n])?t[n]=Array.isArray(e[n])?Fe(e[n],[]):{...Fe(e[n])}:vt(e[n],R(r)?{}:r[n],t[n]):t[n]=!J(e[n],r[n]);return t}var ce=(e,r)=>vt(e,r,Fe(r)),mt=(e,{valueAsNumber:r,valueAsDate:t,setValueAs:i})=>S(e)?e:r?e===""?NaN:e&&+e:t&&Z(e)?new Date(e):i?i(e):e;function ke(e){const r=e.ref;if(!(e.refs?e.refs.every(t=>t.disabled):r.disabled))return Re(r)?r.files:Ue(r)?gt(e.refs).value:yt(r)?[...r.selectedOptions].map(({value:t})=>t):he(r)?dt(e.refs).value:mt(S(r.value)?e.ref.value:r.value,e)}var Xt=(e,r,t,i)=>{const n={};for(const l of e){const d=f(r,l);d&&p(n,l,d._f)}return{criteriaMode:t,names:[...e],fields:n,shouldUseNativeValidation:i}},fe=e=>S(e)?e:Ve(e)?e.source:D(e)?Ve(e.value)?e.value.source:e.value:e;const rt="AsyncFunction";var Yt=e=>!!e&&!!e.validate&&!!(z(e.validate)&&e.validate.constructor.name===rt||D(e.validate)&&Object.values(e.validate).find(r=>r.constructor.name===rt)),Jt=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function st(e,r,t){const i=f(e,t);if(i||Le(t))return{error:i,name:t};const n=t.split(".");for(;n.length;){const l=n.join("."),d=f(r,l),y=f(e,l);if(d&&!Array.isArray(d)&&t!==l)return{name:t};if(y&&y.type)return{name:l,error:y};n.pop()}return{name:t}}var Qt=(e,r,t,i,n)=>n.isOnAll?!1:!t&&n.isOnTouch?!(r||e):(t?i.isOnBlur:n.isOnBlur)?!e:(t?i.isOnChange:n.isOnChange)?e:!0,er=(e,r)=>!Ae(f(e,r)).length&&T(e,r);const tr={mode:W.onSubmit,reValidateMode:W.onChange,shouldFocusError:!0};function rr(e={}){let r={...tr,...e},t={submitCount:0,isDirty:!1,isLoading:z(r.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:r.errors||{},disabled:r.disabled||!1},i={},n=D(r.defaultValues)||D(r.values)?P(r.defaultValues||r.values)||{}:{},l=r.shouldUnregister?{}:P(n),d={action:!1,mount:!1,watch:!1},y={mount:new Set,unMount:new Set,array:new Set,watch:new Set},m,w=0;const x={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},v={values:Ce(),array:Ce(),state:Ce()},B=Ge(r.mode),U=Ge(r.reValidateMode),C=r.criteriaMode===W.all,ne=s=>a=>{clearTimeout(w),w=setTimeout(s,a)},I=async s=>{if(!r.disabled&&(x.isValid||s)){const a=r.resolver?M((await Q()).errors):await j(i,!0);a!==t.isValid&&v.state.next({isValid:a})}},Y=(s,a)=>{!r.disabled&&(x.isValidating||x.validatingFields)&&((s||Array.from(y.mount)).forEach(u=>{u&&(a?p(t.validatingFields,u,a):T(t.validatingFields,u))}),v.state.next({validatingFields:t.validatingFields,isValidating:!M(t.validatingFields)}))},V=(s,a=[],u,g,c=!0,o=!0)=>{if(g&&u&&!r.disabled){if(d.action=!0,o&&Array.isArray(f(i,s))){const h=u(f(i,s),g.argA,g.argB);c&&p(i,s,h)}if(o&&Array.isArray(f(t.errors,s))){const h=u(f(t.errors,s),g.argA,g.argB);c&&p(t.errors,s,h),er(t.errors,s)}if(x.touchedFields&&o&&Array.isArray(f(t.touchedFields,s))){const h=u(f(t.touchedFields,s),g.argA,g.argB);c&&p(t.touchedFields,s,h)}x.dirtyFields&&(t.dirtyFields=ce(n,l)),v.state.next({name:s,isDirty:b(s,a),dirtyFields:t.dirtyFields,errors:t.errors,isValid:t.isValid})}else p(l,s,a)},K=(s,a)=>{p(t.errors,s,a),v.state.next({errors:t.errors})},G=s=>{t.errors=s,v.state.next({errors:t.errors,isValid:!1})},E=(s,a,u,g)=>{const c=f(i,s);if(c){const o=f(l,s,S(u)?f(n,s):u);S(o)||g&&g.defaultChecked||a?p(l,s,a?o:ke(c._f)):N(s,o),d.mount&&I()}},re=(s,a,u,g,c)=>{let o=!1,h=!1;const _={name:s};if(!r.disabled){const L=!!(f(i,s)&&f(i,s)._f&&f(i,s)._f.disabled);if(!u||g){x.isDirty&&(h=t.isDirty,t.isDirty=_.isDirty=b(),o=h!==_.isDirty);const O=L||J(f(n,s),a);h=!!(!L&&f(t.dirtyFields,s)),O||L?T(t.dirtyFields,s):p(t.dirtyFields,s,!0),_.dirtyFields=t.dirtyFields,o=o||x.dirtyFields&&h!==!O}if(u){const O=f(t.touchedFields,s);O||(p(t.touchedFields,s,u),_.touchedFields=t.touchedFields,o=o||x.touchedFields&&O!==u)}o&&c&&v.state.next(_)}return o?_:{}},ve=(s,a,u,g)=>{const c=f(t.errors,s),o=x.isValid&&H(a)&&t.isValid!==a;if(r.delayError&&u?(m=ne(()=>K(s,u)),m(r.delayError)):(clearTimeout(w),m=null,u?p(t.errors,s,u):T(t.errors,s)),(u?!J(c,u):c)||!M(g)||o){const h={...g,...o&&H(a)?{isValid:a}:{},errors:t.errors,name:s};t={...t,...h},v.state.next(h)}},Q=async s=>{Y(s,!0);const a=await r.resolver(l,r.context,Xt(s||y.mount,i,r.criteriaMode,r.shouldUseNativeValidation));return Y(s),a},se=async s=>{const{errors:a}=await Q(s);if(s)for(const u of s){const g=f(a,u);g?p(t.errors,u,g):T(t.errors,u)}else t.errors=a;return a},j=async(s,a,u={valid:!0})=>{for(const g in s){const c=s[g];if(c){const{_f:o,...h}=c;if(o){const _=y.array.has(o.name),L=c._f&&Yt(c._f);L&&x.validatingFields&&Y([g],!0);const O=await tt(c,l,C,r.shouldUseNativeValidation&&!a,_);if(L&&x.validatingFields&&Y([g]),O[o.name]&&(u.valid=!1,a))break;!a&&(f(O,o.name)?_?zt(t.errors,O,o.name):p(t.errors,o.name,O[o.name]):T(t.errors,o.name))}!M(h)&&await j(h,a,u)}}return u.valid},me=()=>{for(const s of y.unMount){const a=f(i,s);a&&(a._f.refs?a._f.refs.every(u=>!Ee(u)):!Ee(a._f.ref))&&pe(s)}y.unMount=new Set},b=(s,a)=>!r.disabled&&(s&&a&&p(l,s,a),!J(Pe(),n)),F=(s,a,u)=>ft(s,y,{...d.mount?l:S(a)?n:Z(s)?{[s]:a}:a},u,a),k=s=>Ae(f(d.mount?l:n,s,r.shouldUnregister?f(n,s,[]):[])),N=(s,a,u={})=>{const g=f(i,s);let c=a;if(g){const o=g._f;o&&(!o.disabled&&p(l,s,mt(a,o)),c=xe(o.ref)&&R(a)?"":a,yt(o.ref)?[...o.ref.options].forEach(h=>h.selected=c.includes(h.value)):o.refs?he(o.ref)?o.refs.length>1?o.refs.forEach(h=>(!h.defaultChecked||!h.disabled)&&(h.checked=Array.isArray(c)?!!c.find(_=>_===h.value):c===h.value)):o.refs[0]&&(o.refs[0].checked=!!c):o.refs.forEach(h=>h.checked=h.value===c):Re(o.ref)?o.ref.value="":(o.ref.value=c,o.ref.type||v.values.next({name:s,values:{...l}})))}(u.shouldDirty||u.shouldTouch)&&re(s,c,u.shouldTouch,u.shouldDirty,!0),u.shouldValidate&&oe(s)},q=(s,a,u)=>{for(const g in a){const c=a[g],o=`${s}.${g}`,h=f(i,o);(y.array.has(s)||D(c)||h&&!h._f)&&!te(c)?q(o,c,u):N(o,c,u)}},$=(s,a,u={})=>{const g=f(i,s),c=y.array.has(s),o=P(a);p(l,s,o),c?(v.array.next({name:s,values:{...l}}),(x.isDirty||x.dirtyFields)&&u.shouldDirty&&v.state.next({name:s,dirtyFields:ce(n,l),isDirty:b(s,o)})):g&&!g._f&&!R(o)?q(s,o,u):N(s,o,u),Xe(s,y)&&v.state.next({...t}),v.values.next({name:d.mount?s:void 0,values:{...l}})},le=async s=>{d.mount=!0;const a=s.target;let u=a.name,g=!0;const c=f(i,u),o=()=>a.type?ke(c._f):at(s),h=_=>{g=Number.isNaN(_)||te(_)&&isNaN(_.getTime())||J(_,f(l,u,_))};if(c){let _,L;const O=o(),ee=s.type===be.BLUR||s.type===be.FOCUS_OUT,Ft=!Jt(c._f)&&!r.resolver&&!f(t.errors,u)&&!c._f.deps||Qt(ee,f(t.touchedFields,u),t.isSubmitted,U,B),Se=Xe(u,y,ee);p(l,u,O),ee?(c._f.onBlur&&c._f.onBlur(s),m&&m(0)):c._f.onChange&&c._f.onChange(s);const De=re(u,O,ee,!1),At=!M(De)||Se;if(!ee&&v.values.next({name:u,type:s.type,values:{...l}}),Ft)return x.isValid&&(r.mode==="onBlur"?ee&&I():I()),At&&v.state.next({name:u,...Se?{}:De});if(!ee&&Se&&v.state.next({...t}),r.resolver){const{errors:ze}=await Q([u]);if(h(O),g){const pt=st(t.errors,i,u),Ze=st(ze,i,pt.name||u);_=Ze.error,u=Ze.name,L=M(ze)}}else Y([u],!0),_=(await tt(c,l,C,r.shouldUseNativeValidation))[u],Y([u]),h(O),g&&(_?L=!1:x.isValid&&(L=await j(i,!0)));g&&(c._f.deps&&oe(c._f.deps),ve(u,L,_,De))}},ue=(s,a)=>{if(f(t.errors,a)&&s.focus)return s.focus(),1},oe=async(s,a={})=>{let u,g;const c=ge(s);if(r.resolver){const o=await se(S(s)?s:c);u=M(o),g=s?!c.some(h=>f(o,h)):u}else s?(g=(await Promise.all(c.map(async o=>{const h=f(i,o);return await j(h&&h._f?{[o]:h}:h)}))).every(Boolean),!(!g&&!t.isValid)&&I()):g=u=await j(i);return v.state.next({...!Z(s)||x.isValid&&u!==t.isValid?{}:{name:s},...r.resolver||!s?{isValid:u}:{},errors:t.errors}),a.shouldFocus&&!g&&ye(i,ue,s?c:y.mount),g},Pe=s=>{const a={...d.mount?l:n};return S(s)?a:Z(s)?f(a,s):s.map(u=>f(a,u))},Me=(s,a)=>({invalid:!!f((a||t).errors,s),isDirty:!!f((a||t).dirtyFields,s),error:f((a||t).errors,s),isValidating:!!f(t.validatingFields,s),isTouched:!!f((a||t).touchedFields,s)}),_t=s=>{s&&ge(s).forEach(a=>T(t.errors,a)),v.state.next({errors:s?t.errors:{}})},Ie=(s,a,u)=>{const g=(f(i,s,{_f:{}})._f||{}).ref,c=f(t.errors,s)||{},{ref:o,message:h,type:_,...L}=c;p(t.errors,s,{...L,...a,ref:g}),v.state.next({name:s,errors:t.errors,isValid:!1}),u&&u.shouldFocus&&g&&g.focus&&g.focus()},bt=(s,a)=>z(s)?v.values.subscribe({next:u=>s(F(void 0,a),u)}):F(s,a,!0),pe=(s,a={})=>{for(const u of s?ge(s):y.mount)y.mount.delete(u),y.array.delete(u),a.keepValue||(T(i,u),T(l,u)),!a.keepError&&T(t.errors,u),!a.keepDirty&&T(t.dirtyFields,u),!a.keepTouched&&T(t.touchedFields,u),!a.keepIsValidating&&T(t.validatingFields,u),!r.shouldUnregister&&!a.keepDefaultValue&&T(n,u);v.values.next({values:{...l}}),v.state.next({...t,...a.keepDirty?{isDirty:b()}:{}}),!a.keepIsValid&&I()},He=({disabled:s,name:a,field:u,fields:g,value:c})=>{if(H(s)&&d.mount||s){const o=s?void 0:S(c)?ke(u?u._f:f(g,a)._f):c;(s||!s&&!S(o))&&p(l,a,o),re(a,o,!1,!1,!0)}},we=(s,a={})=>{let u=f(i,s);const g=H(a.disabled)||H(r.disabled);return p(i,s,{...u||{},_f:{...u&&u._f?u._f:{ref:{name:s}},name:s,mount:!0,...a}}),y.mount.add(s),u?He({field:u,disabled:H(a.disabled)?a.disabled:r.disabled,name:s,value:a.value}):E(s,!0,a.value),{...g?{disabled:a.disabled||r.disabled}:{},...r.progressive?{required:!!a.required,min:fe(a.min),max:fe(a.max),minLength:fe(a.minLength),maxLength:fe(a.maxLength),pattern:fe(a.pattern)}:{},name:s,onChange:le,onBlur:le,ref:c=>{if(c){we(s,a),u=f(i,s);const o=S(c.value)&&c.querySelectorAll&&c.querySelectorAll("input,select,textarea")[0]||c,h=Gt(o),_=u._f.refs||[];if(h?_.find(L=>L===o):o===u._f.ref)return;p(i,s,{_f:{...u._f,...h?{refs:[..._.filter(Ee),o,...Array.isArray(f(n,s))?[{}]:[]],ref:{type:o.type,name:s}}:{ref:o}}}),E(s,!1,void 0,o)}else u=f(i,s,{}),u._f&&(u._f.mount=!1),(r.shouldUnregister||a.shouldUnregister)&&!(nt(y.array,s)&&d.action)&&y.unMount.add(s)}}},je=()=>r.shouldFocusError&&ye(i,ue,y.mount),xt=s=>{H(s)&&(v.state.next({disabled:s}),ye(i,(a,u)=>{const g=f(i,u);g&&(a.disabled=g._f.disabled||s,Array.isArray(g._f.refs)&&g._f.refs.forEach(c=>{c.disabled=g._f.disabled||s}))},0,!1))},$e=(s,a)=>async u=>{let g;if(u&&(u.preventDefault&&u.preventDefault(),u.persist&&u.persist()),r.disabled){a&&await a({...t.errors},u);return}let c=P(l);if(v.state.next({isSubmitting:!0}),r.resolver){const{errors:o,values:h}=await Q();t.errors=o,c=h}else await j(i);if(T(t.errors,"root"),M(t.errors)){v.state.next({errors:{}});try{await s(c,u)}catch(o){g=o}}else a&&await a({...t.errors},u),je(),setTimeout(je);if(v.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:M(t.errors)&&!g,submitCount:t.submitCount+1,errors:t.errors}),g)throw g},Vt=(s,a={})=>{f(i,s)&&(S(a.defaultValue)?$(s,P(f(n,s))):($(s,a.defaultValue),p(n,s,P(a.defaultValue))),a.keepTouched||T(t.touchedFields,s),a.keepDirty||(T(t.dirtyFields,s),t.isDirty=a.defaultValue?b(s,P(f(n,s))):b()),a.keepError||(T(t.errors,s),x.isValid&&I()),v.state.next({...t}))},qe=(s,a={})=>{const u=s?P(s):n,g=P(u),c=M(s),o=c?n:g;if(a.keepDefaultValues||(n=u),!a.keepValues){if(a.keepDirtyValues){const h=new Set([...y.mount,...Object.keys(ce(n,l))]);for(const _ of Array.from(h))f(t.dirtyFields,_)?p(o,_,f(l,_)):$(_,f(o,_))}else{if(Be&&S(s))for(const h of y.mount){const _=f(i,h);if(_&&_._f){const L=Array.isArray(_._f.refs)?_._f.refs[0]:_._f.ref;if(xe(L)){const O=L.closest("form");if(O){O.reset();break}}}}i={}}l=r.shouldUnregister?a.keepDefaultValues?P(n):{}:P(o),v.array.next({values:{...o}}),v.values.next({values:{...o}})}y={mount:a.keepDirtyValues?y.mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},d.mount=!x.isValid||!!a.keepIsValid||!!a.keepDirtyValues,d.watch=!!r.shouldUnregister,v.state.next({submitCount:a.keepSubmitCount?t.submitCount:0,isDirty:c?!1:a.keepDirty?t.isDirty:!!(a.keepDefaultValues&&!J(s,n)),isSubmitted:a.keepIsSubmitted?t.isSubmitted:!1,dirtyFields:c?{}:a.keepDirtyValues?a.keepDefaultValues&&l?ce(n,l):t.dirtyFields:a.keepDefaultValues&&s?ce(n,s):a.keepDirty?t.dirtyFields:{},touchedFields:a.keepTouched?t.touchedFields:{},errors:a.keepErrors?t.errors:{},isSubmitSuccessful:a.keepIsSubmitSuccessful?t.isSubmitSuccessful:!1,isSubmitting:!1})},We=(s,a)=>qe(z(s)?s(l):s,a);return{control:{register:we,unregister:pe,getFieldState:Me,handleSubmit:$e,setError:Ie,_executeSchema:Q,_getWatch:F,_getDirty:b,_updateValid:I,_removeUnmounted:me,_updateFieldArray:V,_updateDisabledField:He,_getFieldArray:k,_reset:qe,_resetDefaultValues:()=>z(r.defaultValues)&&r.defaultValues().then(s=>{We(s,r.resetOptions),v.state.next({isLoading:!1})}),_updateFormState:s=>{t={...t,...s}},_disableForm:xt,_subjects:v,_proxyFormState:x,_setErrors:G,get _fields(){return i},get _formValues(){return l},get _state(){return d},set _state(s){d=s},get _defaultValues(){return n},get _names(){return y},set _names(s){y=s},get _formState(){return t},set _formState(s){t=s},get _options(){return r},set _options(s){r={...r,...s}}},trigger:oe,register:we,handleSubmit:$e,watch:bt,setValue:$,getValues:Pe,reset:We,resetField:Vt,clearErrors:_t,unregister:pe,setError:Ie,setFocus:(s,a={})=>{const u=f(i,s),g=u&&u._f;if(g){const c=g.refs?g.refs[0]:g.ref;c.focus&&(c.focus(),a.shouldSelect&&z(c.select)&&c.select())}},getFieldState:Me}}function fr(e={}){const r=A.useRef(),t=A.useRef(),[i,n]=A.useState({isDirty:!1,isValidating:!1,isLoading:z(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:z(e.defaultValues)?void 0:e.defaultValues});r.current||(r.current={...rr(e),formState:i});const l=r.current.control;return l._options=e,Ne({subject:l._subjects.state,next:d=>{ot(d,l._proxyFormState,l._updateFormState,!0)&&n({...l._formState})}}),A.useEffect(()=>l._disableForm(e.disabled),[l,e.disabled]),A.useEffect(()=>{if(l._proxyFormState.isDirty){const d=l._getDirty();d!==i.isDirty&&l._subjects.state.next({isDirty:d})}},[l,i.isDirty]),A.useEffect(()=>{e.values&&!J(e.values,t.current)?(l._reset(e.values,l._options.resetOptions),t.current=e.values,n(d=>({...d}))):l._resetDefaultValues()},[e.values,l]),A.useEffect(()=>{e.errors&&l._setErrors(e.errors)},[e.errors,l]),A.useEffect(()=>{l._state.mount||(l._updateValid(),l._state.mount=!0),l._state.watch&&(l._state.watch=!1,l._subjects.state.next({...l._formState})),l._removeUnmounted()}),A.useEffect(()=>{e.shouldUnregister&&l._subjects.values.next({values:l._getWatch()})},[e.shouldUnregister,l]),A.useMemo(()=>({...r.current,formState:ut(i,l)}),[i,l])}const dr=({name:e,label:r,control:t,rules:i,...n})=>ie.jsx(qt,{name:e,control:t,rules:i,render:({field:l,fieldState:d})=>ie.jsx(Et.Item,{className:"input-item",validateStatus:d.error?"error":void 0,help:d.error&&ie.jsx(Ke.Text,{type:"danger",style:{textAlign:"left",display:"block",lineHeight:"1.4"},className:"text-xs md:text-sm ml-2",children:d.error.message}),children:ie.jsxs("div",{className:"flex flex-col items-start",children:[r&&ie.jsx(Ke.Text,{className:"ml-2",children:r}),ie.jsx(kt,{...l,...n,status:d.error&&"error",style:{boxShadow:"none"},className:"py-1.5 px-4 rounded-lg focus:!outline-none focus:!ring-0 focus:!border-transparent focus:!transition-none !transition-none"})]})})});export{or as C,dr as U,cr as a,fr as u};
