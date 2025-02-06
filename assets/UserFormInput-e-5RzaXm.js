import{a6 as A,j as ie,bI as ze}from"./index-CrfkSw2x.js";import{F as wt}from"./index-DbeczEIu.js";import{I as Dt}from"./index-DZkrk_1m.js";const Jt={name:{required:{value:!0,message:"Введите имя"},validate:{startsWithCapital:(e="")=>/^[A-ZА-ЯЁ]/.test(e)||"Имя должно начинаться с заглавной буквы",validCharacters:(e="")=>/^[A-ZА-ЯЁ][a-zа-яё\s-]+$/i.test(e)||"Имя должно содержать только буквы и дефисы"},minLength:{value:2,message:"Имя должно быть не менее 2 символов"},maxLength:{value:50,message:"Имя должно быть не более 50 символов"}},surname:{required:{value:!0,message:"Введите фамилию"},validate:{startsWithCapital:(e="")=>/^[A-ZА-ЯЁ]/.test(e)||"Фамилия должна начинаться с заглавной буквы",validCharacters:(e="")=>/^[A-ZА-ЯЁ][a-zа-яё\s-]+$/i.test(e)||"Фамилия должна содержать только буквы и дефисы"},minLength:{value:2,message:"Фамилия должна быть не менее 2 символов"},maxLength:{value:50,message:"Фамилия должна быть не более 50 символов"}},email:{required:{value:!0,message:"Введите email"},pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,message:"Неверный формат электронной почты"}},password:{required:{value:!0,message:"Введите пароль"},minLength:{value:6,message:"Минимальная длина пароля 6 символов"},maxLength:{value:25,message:"Максимальная длина пароля 25 символов"}},copyPassword:e=>({required:{value:!0,message:"Введите пароль"},minLength:{value:6,message:"Минимальная длина пароля 6 символов"},maxLength:{value:25,message:"Максимальная длина пароля 25 символов"},validate:{matchesPassword:(s="")=>s===e||"Пароли должны совпадать"}})};var ge=e=>e.type==="checkbox",te=e=>e instanceof Date,M=e=>e==null;const st=e=>typeof e=="object";var E=e=>!M(e)&&!Array.isArray(e)&&st(e)&&!te(e),it=e=>E(e)&&e.target?ge(e.target)?e.target.checked:e.target.value:e,Et=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,at=(e,s)=>e.has(Et(s)),St=e=>{const s=e.constructor&&e.constructor.prototype;return E(s)&&s.hasOwnProperty("isPrototypeOf")},Le=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function B(e){let s;const t=Array.isArray(e),a=typeof FileList<"u"?e instanceof FileList:!1;if(e instanceof Date)s=new Date(e);else if(e instanceof Set)s=new Set(e);else if(!(Le&&(e instanceof Blob||a))&&(t||E(e)))if(s=t?[]:{},!t&&!St(e))s=e;else for(const u in e)e.hasOwnProperty(u)&&(s[u]=B(e[u]));else return e;return s}var xe=e=>Array.isArray(e)?e.filter(Boolean):[],D=e=>e===void 0,c=(e,s,t)=>{if(!s||!E(e))return t;const a=xe(s.split(/[,[\].]+?/)).reduce((u,l)=>M(u)?u:u[l],e);return D(a)||a===e?D(e[s])?t:e[s]:a},j=e=>typeof e=="boolean",Te=e=>/^\w*$/.test(e),ut=e=>xe(e.replace(/["|']|\]/g,"").split(/\.|\[/)),w=(e,s,t)=>{let a=-1;const u=Te(s)?[s]:ut(s),l=u.length,y=l-1;for(;++a<l;){const g=u[a];let x=t;if(a!==y){const k=e[g];x=E(k)||Array.isArray(k)?k:isNaN(+u[a+1])?{}:[]}if(g==="__proto__"||g==="constructor"||g==="prototype")return;e[g]=x,e=e[g]}return e};const me={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},Z={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},Y={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},kt=A.createContext(null),Ue=()=>A.useContext(kt);var lt=(e,s,t,a=!0)=>{const u={defaultValues:s._defaultValues};for(const l in e)Object.defineProperty(u,l,{get:()=>{const y=l;return s._proxyFormState[y]!==Z.all&&(s._proxyFormState[y]=!a||Z.all),t&&(t[y]=!0),e[y]}});return u},I=e=>E(e)&&!Object.keys(e).length,nt=(e,s,t,a)=>{t(e);const{name:u,...l}=e;return I(l)||Object.keys(l).length>=Object.keys(s).length||Object.keys(l).find(y=>s[y]===(!a||Z.all))},de=e=>Array.isArray(e)?e:[e],ot=(e,s,t)=>!e||!s||e===s||de(e).some(a=>a&&(t?a===s:a.startsWith(s)||s.startsWith(a)));function Oe(e){const s=A.useRef(e);s.current=e,A.useEffect(()=>{const t=!e.disabled&&s.current.subject&&s.current.subject.subscribe({next:s.current.next});return()=>{t&&t.unsubscribe()}},[e.disabled])}function pt(e){const s=Ue(),{control:t=s.control,disabled:a,name:u,exact:l}=e||{},[y,g]=A.useState(t._formState),x=A.useRef(!0),k=A.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,validatingFields:!1,isValidating:!1,isValid:!1,errors:!1}),b=A.useRef(u);return b.current=u,Oe({disabled:a,next:v=>x.current&&ot(b.current,v.name,l)&&nt(v,k.current,t._updateFormState)&&g({...t._formState,...v}),subject:t._subjects.state}),A.useEffect(()=>(x.current=!0,k.current.isValid&&t._updateValid(!0),()=>{x.current=!1}),[t]),A.useMemo(()=>lt(y,t,k.current,!1),[y,t])}var z=e=>typeof e=="string",ft=(e,s,t,a,u)=>z(e)?(a&&s.watch.add(e),c(t,e,u)):Array.isArray(e)?e.map(l=>(a&&s.watch.add(l),c(t,l))):(a&&(s.watchAll=!0),t);function Ct(e){const s=Ue(),{control:t=s.control,name:a,defaultValue:u,disabled:l,exact:y}=e||{},g=A.useRef(a);g.current=a,Oe({disabled:l,subject:t._subjects.values,next:b=>{ot(g.current,b.name,y)&&k(B(ft(g.current,t._names,b.values||t._formValues,!1,u)))}});const[x,k]=A.useState(t._getWatch(a,u));return A.useEffect(()=>t._removeUnmounted()),x}function Lt(e){const s=Ue(),{name:t,disabled:a,control:u=s.control,shouldUnregister:l}=e,y=at(u._names.array,t),g=Ct({control:u,name:t,defaultValue:c(u._formValues,t,c(u._defaultValues,t,e.defaultValue)),exact:!0}),x=pt({control:u,name:t,exact:!0}),k=A.useRef(u.register(t,{...e.rules,value:g,...j(e.disabled)?{disabled:e.disabled}:{}})),b=A.useMemo(()=>Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!c(x.errors,t)},isDirty:{enumerable:!0,get:()=>!!c(x.dirtyFields,t)},isTouched:{enumerable:!0,get:()=>!!c(x.touchedFields,t)},isValidating:{enumerable:!0,get:()=>!!c(x.validatingFields,t)},error:{enumerable:!0,get:()=>c(x.errors,t)}}),[x,t]),v=A.useMemo(()=>({name:t,value:g,...j(a)||x.disabled?{disabled:x.disabled||a}:{},onChange:O=>k.current.onChange({target:{value:it(O),name:t},type:me.CHANGE}),onBlur:()=>k.current.onBlur({target:{value:c(u._formValues,t),name:t},type:me.BLUR}),ref:O=>{const N=c(u._fields,t);N&&O&&(N._f.ref={focus:()=>O.focus(),select:()=>O.select(),setCustomValidity:S=>O.setCustomValidity(S),reportValidity:()=>O.reportValidity()})}}),[t,u._formValues,a,x.disabled,g,u._fields]);return A.useEffect(()=>{const O=u._options.shouldUnregister||l,N=(S,ue)=>{const P=c(u._fields,S);P&&P._f&&(P._f.mount=ue)};if(N(t,!0),O){const S=B(c(u._options.defaultValues,t));w(u._defaultValues,t,S),D(c(u._formValues,t))&&w(u._formValues,t,S)}return()=>{(y?O&&!u._state.action:O)?u.unregister(t):N(t,!1)}},[t,u,y,l]),A.useEffect(()=>{j(a)&&c(u._fields,t)&&u._updateDisabledField({disabled:a,fields:u._fields,name:t,value:c(u._fields,t)._f.value})},[a,t,u]),A.useMemo(()=>({field:v,formState:x,fieldState:b}),[v,x,b])}const Tt=e=>e.render(Lt(e));var Ut=(e,s,t,a,u)=>s?{...t[e],types:{...t[e]&&t[e].types?t[e].types:{},[a]:u||!0}}:{},Ke=e=>({isOnSubmit:!e||e===Z.onSubmit,isOnBlur:e===Z.onBlur,isOnChange:e===Z.onChange,isOnAll:e===Z.all,isOnTouch:e===Z.onTouched}),Ge=(e,s,t)=>!t&&(s.watchAll||s.watch.has(e)||[...s.watch].some(a=>e.startsWith(a)&&/^\.\w+/.test(e.slice(a.length))));const ye=(e,s,t,a)=>{for(const u of t||Object.keys(e)){const l=c(e,u);if(l){const{_f:y,...g}=l;if(y){if(y.refs&&y.refs[0]&&s(y.refs[0],u)&&!a)return!0;if(y.ref&&s(y.ref,y.name)&&!a)return!0;if(ye(g,s))break}else if(E(g)&&ye(g,s))break}}};var Ot=(e,s,t)=>{const a=de(c(e,t));return w(a,"root",s[t]),w(e,t,a),e},Re=e=>e.type==="file",$=e=>typeof e=="function",be=e=>{if(!Le)return!1;const s=e?e.ownerDocument:0;return e instanceof(s&&s.defaultView?s.defaultView.HTMLElement:HTMLElement)},_e=e=>z(e),Me=e=>e.type==="radio",Fe=e=>e instanceof RegExp;const Ye={value:!1,isValid:!1},Je={value:!0,isValid:!0};var ct=e=>{if(Array.isArray(e)){if(e.length>1){const s=e.filter(t=>t&&t.checked&&!t.disabled).map(t=>t.value);return{value:s,isValid:!!s.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!D(e[0].attributes.value)?D(e[0].value)||e[0].value===""?Je:{value:e[0].value,isValid:!0}:Je:Ye}return Ye};const Qe={isValid:!1,value:null};var dt=e=>Array.isArray(e)?e.reduce((s,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:s,Qe):Qe;function Xe(e,s,t="validate"){if(_e(e)||Array.isArray(e)&&e.every(_e)||j(e)&&!e)return{type:t,message:_e(e)?e:"",ref:s}}var ae=e=>E(e)&&!Fe(e)?e:{value:e,message:""},et=async(e,s,t,a,u)=>{const{ref:l,refs:y,required:g,maxLength:x,minLength:k,min:b,max:v,pattern:O,validate:N,name:S,valueAsNumber:ue,mount:P,disabled:J}=e._f,F=c(s,S);if(!P||J)return{};const K=y?y[0]:l,G=m=>{a&&K.reportValidity&&(K.setCustomValidity(j(m)?"":m||""),K.reportValidity())},p={},re=Me(l),he=ge(l),X=re||he,se=(ue||Re(l))&&D(l.value)&&D(F)||be(l)&&l.value===""||F===""||Array.isArray(F)&&!F.length,q=Ut.bind(null,S,t,p),ve=(m,V,C,R=Y.maxLength,H=Y.minLength)=>{const W=m?V:C;p[S]={type:m?R:H,message:W,ref:l,...q(m?R:H,W)}};if(u?!Array.isArray(F)||!F.length:g&&(!X&&(se||M(F))||j(F)&&!F||he&&!ct(y).isValid||re&&!dt(y).isValid)){const{value:m,message:V}=_e(g)?{value:!!g,message:g}:ae(g);if(m&&(p[S]={type:Y.required,message:V,ref:K,...q(Y.required,V)},!t))return G(V),p}if(!se&&(!M(b)||!M(v))){let m,V;const C=ae(v),R=ae(b);if(!M(F)&&!isNaN(F)){const H=l.valueAsNumber||F&&+F;M(C.value)||(m=H>C.value),M(R.value)||(V=H<R.value)}else{const H=l.valueAsDate||new Date(F),W=oe=>new Date(new Date().toDateString()+" "+oe),le=l.type=="time",ne=l.type=="week";z(C.value)&&F&&(m=le?W(F)>W(C.value):ne?F>C.value:H>new Date(C.value)),z(R.value)&&F&&(V=le?W(F)<W(R.value):ne?F<R.value:H<new Date(R.value))}if((m||V)&&(ve(!!m,C.message,R.message,Y.max,Y.min),!t))return G(p[S].message),p}if((x||k)&&!se&&(z(F)||u&&Array.isArray(F))){const m=ae(x),V=ae(k),C=!M(m.value)&&F.length>+m.value,R=!M(V.value)&&F.length<+V.value;if((C||R)&&(ve(C,m.message,V.message),!t))return G(p[S].message),p}if(O&&!se&&z(F)){const{value:m,message:V}=ae(O);if(Fe(m)&&!F.match(m)&&(p[S]={type:Y.pattern,message:V,ref:l,...q(Y.pattern,V)},!t))return G(V),p}if(N){if($(N)){const m=await N(F,s),V=Xe(m,K);if(V&&(p[S]={...V,...q(Y.validate,V.message)},!t))return G(V.message),p}else if(E(N)){let m={};for(const V in N){if(!I(m)&&!t)break;const C=Xe(await N[V](F,s),K,V);C&&(m={...C,...q(V,C.message)},G(C.message),t&&(p[S]=m))}if(!I(m)&&(p[S]={ref:K,...m},!t))return p}}return G(!0),p};function Rt(e,s){const t=s.slice(0,-1).length;let a=0;for(;a<t;)e=D(e)?a++:e[s[a++]];return e}function Mt(e){for(const s in e)if(e.hasOwnProperty(s)&&!D(e[s]))return!1;return!0}function L(e,s){const t=Array.isArray(s)?s:Te(s)?[s]:ut(s),a=t.length===1?e:Rt(e,t),u=t.length-1,l=t[u];return a&&delete a[l],u!==0&&(E(a)&&I(a)||Array.isArray(a)&&Mt(a))&&L(e,t.slice(0,-1)),e}var Se=()=>{let e=[];return{get observers(){return e},next:u=>{for(const l of e)l.next&&l.next(u)},subscribe:u=>(e.push(u),{unsubscribe:()=>{e=e.filter(l=>l!==u)}}),unsubscribe:()=>{e=[]}}},Ce=e=>M(e)||!st(e);function Q(e,s){if(Ce(e)||Ce(s))return e===s;if(te(e)&&te(s))return e.getTime()===s.getTime();const t=Object.keys(e),a=Object.keys(s);if(t.length!==a.length)return!1;for(const u of t){const l=e[u];if(!a.includes(u))return!1;if(u!=="ref"){const y=s[u];if(te(l)&&te(y)||E(l)&&E(y)||Array.isArray(l)&&Array.isArray(y)?!Q(l,y):l!==y)return!1}}return!0}var yt=e=>e.type==="select-multiple",Nt=e=>Me(e)||ge(e),ke=e=>be(e)&&e.isConnected,gt=e=>{for(const s in e)if($(e[s]))return!0;return!1};function Ve(e,s={}){const t=Array.isArray(e);if(E(e)||t)for(const a in e)Array.isArray(e[a])||E(e[a])&&!gt(e[a])?(s[a]=Array.isArray(e[a])?[]:{},Ve(e[a],s[a])):M(e[a])||(s[a]=!0);return s}function ht(e,s,t){const a=Array.isArray(e);if(E(e)||a)for(const u in e)Array.isArray(e[u])||E(e[u])&&!gt(e[u])?D(s)||Ce(t[u])?t[u]=Array.isArray(e[u])?Ve(e[u],[]):{...Ve(e[u])}:ht(e[u],M(s)?{}:s[u],t[u]):t[u]=!Q(e[u],s[u]);return t}var fe=(e,s)=>ht(e,s,Ve(s)),vt=(e,{valueAsNumber:s,valueAsDate:t,setValueAs:a})=>D(e)?e:s?e===""?NaN:e&&+e:t&&z(e)?new Date(e):a?a(e):e;function pe(e){const s=e.ref;if(!(e.refs?e.refs.every(t=>t.disabled):s.disabled))return Re(s)?s.files:Me(s)?dt(e.refs).value:yt(s)?[...s.selectedOptions].map(({value:t})=>t):ge(s)?ct(e.refs).value:vt(D(s.value)?e.ref.value:s.value,e)}var Bt=(e,s,t,a)=>{const u={};for(const l of e){const y=c(s,l);y&&w(u,l,y._f)}return{criteriaMode:t,names:[...e],fields:u,shouldUseNativeValidation:a}},ce=e=>D(e)?e:Fe(e)?e.source:E(e)?Fe(e.value)?e.value.source:e.value:e;const tt="AsyncFunction";var It=e=>!!e&&!!e.validate&&!!($(e.validate)&&e.validate.constructor.name===tt||E(e.validate)&&Object.values(e.validate).find(s=>s.constructor.name===tt)),Pt=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function rt(e,s,t){const a=c(e,t);if(a||Te(t))return{error:a,name:t};const u=t.split(".");for(;u.length;){const l=u.join("."),y=c(s,l),g=c(e,l);if(y&&!Array.isArray(y)&&t!==l)return{name:t};if(g&&g.type)return{name:l,error:g};u.pop()}return{name:t}}var jt=(e,s,t,a,u)=>u.isOnAll?!1:!t&&u.isOnTouch?!(s||e):(t?a.isOnBlur:u.isOnBlur)?!e:(t?a.isOnChange:u.isOnChange)?e:!0,qt=(e,s)=>!xe(c(e,s)).length&&L(e,s);const Wt={mode:Z.onSubmit,reValidateMode:Z.onChange,shouldFocusError:!0};function Ht(e={}){let s={...Wt,...e},t={submitCount:0,isDirty:!1,isLoading:$(s.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:s.errors||{},disabled:s.disabled||!1},a={},u=E(s.defaultValues)||E(s.values)?B(s.defaultValues||s.values)||{}:{},l=s.shouldUnregister?{}:B(u),y={action:!1,mount:!1,watch:!1},g={mount:new Set,unMount:new Set,array:new Set,watch:new Set},x,k=0;const b={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},v={values:Se(),array:Se(),state:Se()},O=Ke(s.mode),N=Ke(s.reValidateMode),S=s.criteriaMode===Z.all,ue=r=>i=>{clearTimeout(k),k=setTimeout(r,i)},P=async r=>{if(!s.disabled&&(b.isValid||r)){const i=s.resolver?I((await X()).errors):await q(a,!0);i!==t.isValid&&v.state.next({isValid:i})}},J=(r,i)=>{!s.disabled&&(b.isValidating||b.validatingFields)&&((r||Array.from(g.mount)).forEach(n=>{n&&(i?w(t.validatingFields,n,i):L(t.validatingFields,n))}),v.state.next({validatingFields:t.validatingFields,isValidating:!I(t.validatingFields)}))},F=(r,i=[],n,d,f=!0,o=!0)=>{if(d&&n&&!s.disabled){if(y.action=!0,o&&Array.isArray(c(a,r))){const h=n(c(a,r),d.argA,d.argB);f&&w(a,r,h)}if(o&&Array.isArray(c(t.errors,r))){const h=n(c(t.errors,r),d.argA,d.argB);f&&w(t.errors,r,h),qt(t.errors,r)}if(b.touchedFields&&o&&Array.isArray(c(t.touchedFields,r))){const h=n(c(t.touchedFields,r),d.argA,d.argB);f&&w(t.touchedFields,r,h)}b.dirtyFields&&(t.dirtyFields=fe(u,l)),v.state.next({name:r,isDirty:m(r,i),dirtyFields:t.dirtyFields,errors:t.errors,isValid:t.isValid})}else w(l,r,i)},K=(r,i)=>{w(t.errors,r,i),v.state.next({errors:t.errors})},G=r=>{t.errors=r,v.state.next({errors:t.errors,isValid:!1})},p=(r,i,n,d)=>{const f=c(a,r);if(f){const o=c(l,r,D(n)?c(u,r):n);D(o)||d&&d.defaultChecked||i?w(l,r,i?o:pe(f._f)):R(r,o),y.mount&&P()}},re=(r,i,n,d,f)=>{let o=!1,h=!1;const _={name:r};if(!s.disabled){const T=!!(c(a,r)&&c(a,r)._f&&c(a,r)._f.disabled);if(!n||d){b.isDirty&&(h=t.isDirty,t.isDirty=_.isDirty=m(),o=h!==_.isDirty);const U=T||Q(c(u,r),i);h=!!(!T&&c(t.dirtyFields,r)),U||T?L(t.dirtyFields,r):w(t.dirtyFields,r,!0),_.dirtyFields=t.dirtyFields,o=o||b.dirtyFields&&h!==!U}if(n){const U=c(t.touchedFields,r);U||(w(t.touchedFields,r,n),_.touchedFields=t.touchedFields,o=o||b.touchedFields&&U!==n)}o&&f&&v.state.next(_)}return o?_:{}},he=(r,i,n,d)=>{const f=c(t.errors,r),o=b.isValid&&j(i)&&t.isValid!==i;if(s.delayError&&n?(x=ue(()=>K(r,n)),x(s.delayError)):(clearTimeout(k),x=null,n?w(t.errors,r,n):L(t.errors,r)),(n?!Q(f,n):f)||!I(d)||o){const h={...d,...o&&j(i)?{isValid:i}:{},errors:t.errors,name:r};t={...t,...h},v.state.next(h)}},X=async r=>{J(r,!0);const i=await s.resolver(l,s.context,Bt(r||g.mount,a,s.criteriaMode,s.shouldUseNativeValidation));return J(r),i},se=async r=>{const{errors:i}=await X(r);if(r)for(const n of r){const d=c(i,n);d?w(t.errors,n,d):L(t.errors,n)}else t.errors=i;return i},q=async(r,i,n={valid:!0})=>{for(const d in r){const f=r[d];if(f){const{_f:o,...h}=f;if(o){const _=g.array.has(o.name),T=f._f&&It(f._f);T&&b.validatingFields&&J([d],!0);const U=await et(f,l,S,s.shouldUseNativeValidation&&!i,_);if(T&&b.validatingFields&&J([d]),U[o.name]&&(n.valid=!1,i))break;!i&&(c(U,o.name)?_?Ot(t.errors,U,o.name):w(t.errors,o.name,U[o.name]):L(t.errors,o.name))}!I(h)&&await q(h,i,n)}}return n.valid},ve=()=>{for(const r of g.unMount){const i=c(a,r);i&&(i._f.refs?i._f.refs.every(n=>!ke(n)):!ke(i._f.ref))&&Ae(r)}g.unMount=new Set},m=(r,i)=>!s.disabled&&(r&&i&&w(l,r,i),!Q(Ne(),u)),V=(r,i,n)=>ft(r,g,{...y.mount?l:D(i)?u:z(r)?{[r]:i}:i},n,i),C=r=>xe(c(y.mount?l:u,r,s.shouldUnregister?c(u,r,[]):[])),R=(r,i,n={})=>{const d=c(a,r);let f=i;if(d){const o=d._f;o&&(!o.disabled&&w(l,r,vt(i,o)),f=be(o.ref)&&M(i)?"":i,yt(o.ref)?[...o.ref.options].forEach(h=>h.selected=f.includes(h.value)):o.refs?ge(o.ref)?o.refs.length>1?o.refs.forEach(h=>(!h.defaultChecked||!h.disabled)&&(h.checked=Array.isArray(f)?!!f.find(_=>_===h.value):f===h.value)):o.refs[0]&&(o.refs[0].checked=!!f):o.refs.forEach(h=>h.checked=h.value===f):Re(o.ref)?o.ref.value="":(o.ref.value=f,o.ref.type||v.values.next({name:r,values:{...l}})))}(n.shouldDirty||n.shouldTouch)&&re(r,f,n.shouldTouch,n.shouldDirty,!0),n.shouldValidate&&oe(r)},H=(r,i,n)=>{for(const d in i){const f=i[d],o=`${r}.${d}`,h=c(a,o);(g.array.has(r)||E(f)||h&&!h._f)&&!te(f)?H(o,f,n):R(o,f,n)}},W=(r,i,n={})=>{const d=c(a,r),f=g.array.has(r),o=B(i);w(l,r,o),f?(v.array.next({name:r,values:{...l}}),(b.isDirty||b.dirtyFields)&&n.shouldDirty&&v.state.next({name:r,dirtyFields:fe(u,l),isDirty:m(r,o)})):d&&!d._f&&!M(o)?H(r,o,n):R(r,o,n),Ge(r,g)&&v.state.next({...t}),v.values.next({name:y.mount?r:void 0,values:{...l}})},le=async r=>{y.mount=!0;const i=r.target;let n=i.name,d=!0;const f=c(a,n),o=()=>i.type?pe(f._f):it(r),h=_=>{d=Number.isNaN(_)||te(_)&&isNaN(_.getTime())||Q(_,c(l,n,_))};if(f){let _,T;const U=o(),ee=r.type===me.BLUR||r.type===me.FOCUS_OUT,Vt=!Pt(f._f)&&!s.resolver&&!c(t.errors,n)&&!f._f.deps||jt(ee,c(t.touchedFields,n),t.isSubmitted,N,O),De=Ge(n,g,ee);w(l,n,U),ee?(f._f.onBlur&&f._f.onBlur(r),x&&x(0)):f._f.onChange&&f._f.onChange(r);const Ee=re(n,U,ee,!1),xt=!I(Ee)||De;if(!ee&&v.values.next({name:n,type:r.type,values:{...l}}),Vt)return b.isValid&&(s.mode==="onBlur"?ee&&P():P()),xt&&v.state.next({name:n,...De?{}:Ee});if(!ee&&De&&v.state.next({...t}),s.resolver){const{errors:Ze}=await X([n]);if(h(U),d){const At=rt(t.errors,a,n),$e=rt(Ze,a,At.name||n);_=$e.error,n=$e.name,T=I(Ze)}}else J([n],!0),_=(await et(f,l,S,s.shouldUseNativeValidation))[n],J([n]),h(U),d&&(_?T=!1:b.isValid&&(T=await q(a,!0)));d&&(f._f.deps&&oe(f._f.deps),he(n,T,_,Ee))}},ne=(r,i)=>{if(c(t.errors,i)&&r.focus)return r.focus(),1},oe=async(r,i={})=>{let n,d;const f=de(r);if(s.resolver){const o=await se(D(r)?r:f);n=I(o),d=r?!f.some(h=>c(o,h)):n}else r?(d=(await Promise.all(f.map(async o=>{const h=c(a,o);return await q(h&&h._f?{[o]:h}:h)}))).every(Boolean),!(!d&&!t.isValid)&&P()):d=n=await q(a);return v.state.next({...!z(r)||b.isValid&&n!==t.isValid?{}:{name:r},...s.resolver||!r?{isValid:n}:{},errors:t.errors}),i.shouldFocus&&!d&&ye(a,ne,r?f:g.mount),d},Ne=r=>{const i={...y.mount?l:u};return D(r)?i:z(r)?c(i,r):r.map(n=>c(i,n))},Be=(r,i)=>({invalid:!!c((i||t).errors,r),isDirty:!!c((i||t).dirtyFields,r),error:c((i||t).errors,r),isValidating:!!c(t.validatingFields,r),isTouched:!!c((i||t).touchedFields,r)}),_t=r=>{r&&de(r).forEach(i=>L(t.errors,i)),v.state.next({errors:r?t.errors:{}})},Ie=(r,i,n)=>{const d=(c(a,r,{_f:{}})._f||{}).ref,f=c(t.errors,r)||{},{ref:o,message:h,type:_,...T}=f;w(t.errors,r,{...T,...i,ref:d}),v.state.next({name:r,errors:t.errors,isValid:!1}),n&&n.shouldFocus&&d&&d.focus&&d.focus()},mt=(r,i)=>$(r)?v.values.subscribe({next:n=>r(V(void 0,i),n)}):V(r,i,!0),Ae=(r,i={})=>{for(const n of r?de(r):g.mount)g.mount.delete(n),g.array.delete(n),i.keepValue||(L(a,n),L(l,n)),!i.keepError&&L(t.errors,n),!i.keepDirty&&L(t.dirtyFields,n),!i.keepTouched&&L(t.touchedFields,n),!i.keepIsValidating&&L(t.validatingFields,n),!s.shouldUnregister&&!i.keepDefaultValue&&L(u,n);v.values.next({values:{...l}}),v.state.next({...t,...i.keepDirty?{isDirty:m()}:{}}),!i.keepIsValid&&P()},Pe=({disabled:r,name:i,field:n,fields:d,value:f})=>{if(j(r)&&y.mount||r){const o=r?void 0:D(f)?pe(n?n._f:c(d,i)._f):f;(r||!r&&!D(o))&&w(l,i,o),re(i,o,!1,!1,!0)}},we=(r,i={})=>{let n=c(a,r);const d=j(i.disabled)||j(s.disabled);return w(a,r,{...n||{},_f:{...n&&n._f?n._f:{ref:{name:r}},name:r,mount:!0,...i}}),g.mount.add(r),n?Pe({field:n,disabled:j(i.disabled)?i.disabled:s.disabled,name:r,value:i.value}):p(r,!0,i.value),{...d?{disabled:i.disabled||s.disabled}:{},...s.progressive?{required:!!i.required,min:ce(i.min),max:ce(i.max),minLength:ce(i.minLength),maxLength:ce(i.maxLength),pattern:ce(i.pattern)}:{},name:r,onChange:le,onBlur:le,ref:f=>{if(f){we(r,i),n=c(a,r);const o=D(f.value)&&f.querySelectorAll&&f.querySelectorAll("input,select,textarea")[0]||f,h=Nt(o),_=n._f.refs||[];if(h?_.find(T=>T===o):o===n._f.ref)return;w(a,r,{_f:{...n._f,...h?{refs:[..._.filter(ke),o,...Array.isArray(c(u,r))?[{}]:[]],ref:{type:o.type,name:r}}:{ref:o}}}),p(r,!1,void 0,o)}else n=c(a,r,{}),n._f&&(n._f.mount=!1),(s.shouldUnregister||i.shouldUnregister)&&!(at(g.array,r)&&y.action)&&g.unMount.add(r)}}},je=()=>s.shouldFocusError&&ye(a,ne,g.mount),bt=r=>{j(r)&&(v.state.next({disabled:r}),ye(a,(i,n)=>{const d=c(a,n);d&&(i.disabled=d._f.disabled||r,Array.isArray(d._f.refs)&&d._f.refs.forEach(f=>{f.disabled=d._f.disabled||r}))},0,!1))},qe=(r,i)=>async n=>{let d;if(n&&(n.preventDefault&&n.preventDefault(),n.persist&&n.persist()),s.disabled){i&&await i({...t.errors},n);return}let f=B(l);if(v.state.next({isSubmitting:!0}),s.resolver){const{errors:o,values:h}=await X();t.errors=o,f=h}else await q(a);if(L(t.errors,"root"),I(t.errors)){v.state.next({errors:{}});try{await r(f,n)}catch(o){d=o}}else i&&await i({...t.errors},n),je(),setTimeout(je);if(v.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:I(t.errors)&&!d,submitCount:t.submitCount+1,errors:t.errors}),d)throw d},Ft=(r,i={})=>{c(a,r)&&(D(i.defaultValue)?W(r,B(c(u,r))):(W(r,i.defaultValue),w(u,r,B(i.defaultValue))),i.keepTouched||L(t.touchedFields,r),i.keepDirty||(L(t.dirtyFields,r),t.isDirty=i.defaultValue?m(r,B(c(u,r))):m()),i.keepError||(L(t.errors,r),b.isValid&&P()),v.state.next({...t}))},We=(r,i={})=>{const n=r?B(r):u,d=B(n),f=I(r),o=f?u:d;if(i.keepDefaultValues||(u=n),!i.keepValues){if(i.keepDirtyValues){const h=new Set([...g.mount,...Object.keys(fe(u,l))]);for(const _ of Array.from(h))c(t.dirtyFields,_)?w(o,_,c(l,_)):W(_,c(o,_))}else{if(Le&&D(r))for(const h of g.mount){const _=c(a,h);if(_&&_._f){const T=Array.isArray(_._f.refs)?_._f.refs[0]:_._f.ref;if(be(T)){const U=T.closest("form");if(U){U.reset();break}}}}a={}}l=s.shouldUnregister?i.keepDefaultValues?B(u):{}:B(o),v.array.next({values:{...o}}),v.values.next({values:{...o}})}g={mount:i.keepDirtyValues?g.mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},y.mount=!b.isValid||!!i.keepIsValid||!!i.keepDirtyValues,y.watch=!!s.shouldUnregister,v.state.next({submitCount:i.keepSubmitCount?t.submitCount:0,isDirty:f?!1:i.keepDirty?t.isDirty:!!(i.keepDefaultValues&&!Q(r,u)),isSubmitted:i.keepIsSubmitted?t.isSubmitted:!1,dirtyFields:f?{}:i.keepDirtyValues?i.keepDefaultValues&&l?fe(u,l):t.dirtyFields:i.keepDefaultValues&&r?fe(u,r):i.keepDirty?t.dirtyFields:{},touchedFields:i.keepTouched?t.touchedFields:{},errors:i.keepErrors?t.errors:{},isSubmitSuccessful:i.keepIsSubmitSuccessful?t.isSubmitSuccessful:!1,isSubmitting:!1})},He=(r,i)=>We($(r)?r(l):r,i);return{control:{register:we,unregister:Ae,getFieldState:Be,handleSubmit:qe,setError:Ie,_executeSchema:X,_getWatch:V,_getDirty:m,_updateValid:P,_removeUnmounted:ve,_updateFieldArray:F,_updateDisabledField:Pe,_getFieldArray:C,_reset:We,_resetDefaultValues:()=>$(s.defaultValues)&&s.defaultValues().then(r=>{He(r,s.resetOptions),v.state.next({isLoading:!1})}),_updateFormState:r=>{t={...t,...r}},_disableForm:bt,_subjects:v,_proxyFormState:b,_setErrors:G,get _fields(){return a},get _formValues(){return l},get _state(){return y},set _state(r){y=r},get _defaultValues(){return u},get _names(){return g},set _names(r){g=r},get _formState(){return t},set _formState(r){t=r},get _options(){return s},set _options(r){s={...s,...r}}},trigger:oe,register:we,handleSubmit:qe,watch:mt,setValue:W,getValues:Ne,reset:He,resetField:Ft,clearErrors:_t,unregister:Ae,setError:Ie,setFocus:(r,i={})=>{const n=c(a,r),d=n&&n._f;if(d){const f=d.refs?d.refs[0]:d.ref;f.focus&&(f.focus(),i.shouldSelect&&$(f.select)&&f.select())}},getFieldState:Be}}function Qt(e={}){const s=A.useRef(),t=A.useRef(),[a,u]=A.useState({isDirty:!1,isValidating:!1,isLoading:$(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:$(e.defaultValues)?void 0:e.defaultValues});s.current||(s.current={...Ht(e),formState:a});const l=s.current.control;return l._options=e,Oe({subject:l._subjects.state,next:y=>{nt(y,l._proxyFormState,l._updateFormState,!0)&&u({...l._formState})}}),A.useEffect(()=>l._disableForm(e.disabled),[l,e.disabled]),A.useEffect(()=>{if(l._proxyFormState.isDirty){const y=l._getDirty();y!==a.isDirty&&l._subjects.state.next({isDirty:y})}},[l,a.isDirty]),A.useEffect(()=>{e.values&&!Q(e.values,t.current)?(l._reset(e.values,l._options.resetOptions),t.current=e.values,u(y=>({...y}))):l._resetDefaultValues()},[e.values,l]),A.useEffect(()=>{e.errors&&l._setErrors(e.errors)},[e.errors,l]),A.useEffect(()=>{l._state.mount||(l._updateValid(),l._state.mount=!0),l._state.watch&&(l._state.watch=!1,l._subjects.state.next({...l._formState})),l._removeUnmounted()}),A.useEffect(()=>{e.shouldUnregister&&l._subjects.values.next({values:l._getWatch()})},[e.shouldUnregister,l]),A.useMemo(()=>({...s.current,formState:lt(a,l)}),[a,l])}const Xt=({name:e,label:s,control:t,rules:a,...u})=>ie.jsx(Tt,{name:e,control:t,rules:a,render:({field:l,fieldState:y})=>ie.jsx(wt.Item,{className:"input-item",validateStatus:y.error?"error":void 0,help:y.error&&ie.jsx(ze.Text,{type:"danger",style:{textAlign:"left",display:"block",lineHeight:"1.4"},className:"text-red-500 text-xs md:text-sm ml-2 ",children:y.error.message}),children:ie.jsxs("div",{className:"flex flex-col items-start",children:[s&&ie.jsx(ze.Text,{className:"ml-2",children:s}),ie.jsx(Dt,{...l,...u,status:y.error&&"error",style:{boxShadow:"none"},className:"py-1.5 px-4 rounded-lg bg-[#EFF2F6] placeholder-[#4a4b4d] focus:!outline-none focus:!ring-0 focus:!border-transparent focus:!transition-none !transition-none"})]})})});export{Xt as U,Jt as a,Qt as u};
