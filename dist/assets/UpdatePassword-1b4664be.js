import{y as D,p as F,I as z,m as M,z as H,A as O,B as j,C as q,D as G,E as J,a as K,G as Q,H as W,g as X,J as Y,K as u,L as Z,M as ee,N as ae,O as te,P as se,Q as ne,R as oe,S as le,T as ie,U as re,W as de,c as s,X as ce,Y as ue,Z as _,j as v,k as ve,e as me,o as m,f as pe,h as p,V as ye,i as k,w as i,l as V,d as b,n as fe,q as he,s as _e}from"./index-bf573807.js";import{_ as ke}from"./Logo-abaa2168.js";import{_ as Ve}from"./_plugin-vue_export-helper-c27b6911.js";import{V as be}from"./VSpacer-441d260f.js";import{V as ge}from"./VContainer-bdb2f7f7.js";const Pe=D("v-alert-title"),Ce=["success","info","warning","error"],Se=F({border:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:z,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>Ce.includes(e)},...M(),...H(),...O(),...j(),...q(),...G(),...J(),...K(),...Q(),...W({variant:"flat"})},"VAlert"),we=X()({name:"VAlert",props:Se(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0},setup(e,t){let{emit:r,slots:a}=t;const d=Y(e,"modelValue"),o=u(()=>{if(e.icon!==!1)return e.type?e.icon??`$${e.type}`:e.icon}),n=u(()=>({color:e.color??e.type,variant:e.variant})),{themeClasses:P}=Z(e),{colorClasses:C,colorStyles:S,variantClasses:w}=ee(n),{densityClasses:I}=ae(e),{dimensionStyles:A}=te(e),{elevationClasses:$}=se(e),{locationStyles:T}=ne(e),{positionClasses:x}=oe(e),{roundedClasses:B}=le(e),{textColorClasses:E,textColorStyles:U}=ie(re(e,"borderColor")),{t:L}=de(),y=u(()=>({"aria-label":L(e.closeLabel),onClick(c){d.value=!1,r("click:close",c)}}));return()=>{const c=!!(a.prepend||o.value),R=!!(a.title||e.title),N=!!(a.close||e.closable);return d.value&&s(e.tag,{class:["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${e.border===!0?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},P.value,C.value,I.value,$.value,x.value,B.value,w.value,e.class],style:[S.value,A.value,T.value,e.style],role:"alert"},{default:()=>{var f,h;return[ce(!1,"v-alert"),e.border&&s("div",{key:"border",class:["v-alert__border",E.value],style:U.value},null),c&&s("div",{key:"prepend",class:"v-alert__prepend"},[a.prepend?s(_,{key:"prepend-defaults",disabled:!o.value,defaults:{VIcon:{density:e.density,icon:o.value,size:e.prominent?44:28}}},a.prepend):s(ue,{key:"prepend-icon",density:e.density,icon:o.value,size:e.prominent?44:28},null)]),s("div",{class:"v-alert__content"},[R&&s(Pe,{key:"title"},{default:()=>{var l;return[((l=a.title)==null?void 0:l.call(a))??e.title]}}),((f=a.text)==null?void 0:f.call(a))??e.text,(h=a.default)==null?void 0:h.call(a)]),a.append&&s("div",{key:"append",class:"v-alert__append"},[a.append()]),N&&s("div",{key:"close",class:"v-alert__close"},[a.close?s(_,{key:"close-defaults",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>{var l;return[(l=a.close)==null?void 0:l.call(a,{props:y.value})]}}):s(v,ve({key:"close-btn",icon:e.closeIcon,size:"x-small",variant:"text"},y.value),null)])]}})}}});const Ie={data:()=>({visible:!1,showPasswordError:!1,senha_nova:"",senha_redigitada:""}),computed:{usuario(){return this.$store.getters.usuarios}},methods:{async verificaSenha(){this.senha_nova===this.senha_redigitada?(this.recuperarSenha(),this.$router.push({name:"login"})):(this.showPasswordError=!0,console.log("A senha redigitada é diferente da nova senha"))},async recuperarSenha(){const e={senha_nova:this.senha_nova,token:this.usuario.user_token};try{const t=await me.post("http://45.55.192.246:3333/alterarSenha",e);console.log(t.data),t.status===200&&window.console.log("Verifique a caixa de E-mail para alterar a senha")}catch(t){console.error(t)}}}},g=e=>(he("data-v-3881d143"),e=e(),_e(),e),Ae={class:"container1"},$e={class:"container"},Te=g(()=>p("div",{class:"text"},"Redifinir a Senha",-1)),xe=g(()=>p("div",{class:"background-image"},null,-1));function Be(e,t,r,a,d,o){return m(),pe("div",Ae,[p("div",$e,[s(ye,{class:"image",width:250,height:"180",src:ke}),Te,s(k,{class:"input",modelValue:e.senha_nova,"onUpdate:modelValue":t[0]||(t[0]=n=>e.senha_nova=n),"append-inner-icon":e.visible?"mdi-eye-off":"mdi-eye",type:e.visible?"text":"password",density:"compact",placeholder:"Digite a nova senha","prepend-inner-icon":"mdi-lock-outline",variant:"outlined","onClick:appendInner":t[1]||(t[1]=n=>e.visible=!e.visible)},null,8,["modelValue","append-inner-icon","type"]),s(k,{class:"input",modelValue:e.senha_redigitada,"onUpdate:modelValue":t[2]||(t[2]=n=>e.senha_redigitada=n),"append-inner-icon":e.visible?"mdi-eye-off":"mdi-eye",type:e.visible?"text":"password",density:"compact",placeholder:"Redigite a nova senha","prepend-inner-icon":"mdi-lock-outline",variant:"outlined","onClick:appendInner":t[3]||(t[3]=n=>e.visible=!e.visible)},null,8,["modelValue","append-inner-icon","type"]),s(v,{block:"",rounded:"",class:"button",onClick:o.verificaSenha},{default:i(()=>[V(" Salvar Nova Senha ")]),_:1},8,["onClick"]),e.showPasswordError?(m(),b(ge,{key:0},{default:i(()=>[s(we,{text:"Erro na autenticação da senha, Senhas divergentes",type:"error"},{default:i(()=>[s(be),s(v,{text:"Fechar",onClick:t[4]||(t[4]=n=>e.showPasswordError=!1)},{default:i(()=>[V("Fechar")]),_:1})]),_:1})]),_:1})):fe("",!0)]),xe])}const Ee=Ve(Ie,[["render",Be],["__scopeId","data-v-3881d143"]]),Fe={__name:"UpdatePassword",setup(e){return(t,r)=>(m(),b(Ee))}};export{Fe as default};
