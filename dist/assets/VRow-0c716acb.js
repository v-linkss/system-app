import"./VSpacer-49a1f52c.js";import{p as b,m as v,a as S,g as V,K as k,b8 as w,b9 as L,ba as N}from"./index-88a5129e.js";const o=["start","end","center"],g=["space-between","space-around","space-evenly"];function i(t,s){return L.reduce((e,a)=>{const n=t+N(a);return e[n]=s(),e},{})}const P=[...o,"baseline","stretch"],d=t=>P.includes(t),f=i("align",()=>({type:String,default:null,validator:d})),A=[...o,...g],y=t=>A.includes(t),m=i("justify",()=>({type:String,default:null,validator:y})),E=[...o,...g,"stretch"],C=t=>E.includes(t),j=i("alignContent",()=>({type:String,default:null,validator:C})),u={align:Object.keys(f),justify:Object.keys(m),alignContent:Object.keys(j)},h={align:"align",justify:"justify",alignContent:"align-content"};function G(t,s,e){let a=h[t];if(e!=null){if(s){const n=s.replace(t,"");a+=`-${n}`}return a+=`-${e}`,a.toLowerCase()}}const R=b({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d},...f,justify:{type:String,default:null,validator:y},...m,alignContent:{type:String,default:null,validator:C},...j,...v(),...S()},"VRow"),I=V()({name:"VRow",props:R(),setup(t,s){let{slots:e}=s;const a=k(()=>{const n=[];let l;for(l in u)u[l].forEach(c=>{const p=t[c],r=G(l,c,p);r&&n.push(r)});return n.push({"v-row--no-gutters":t.noGutters,"v-row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),n});return()=>{var n;return w(t.tag,{class:["v-row",a.value,t.class],style:t.style},(n=e.default)==null?void 0:n.call(e))}}});export{I as V};
