import{A}from"./AppBar-caeecede.js";import{r as p,o as m,d as g,w as o,c as e,f as C,l as s,x as n,a4 as _,j as u,k as I,e as f,q as T,s as k,h as v}from"./index-bf573807.js";import{_ as y}from"./_plugin-vue_export-helper-c27b6911.js";import{V as h}from"./VContainer-bdb2f7f7.js";import{V as l}from"./VCol-394eff1d.js";import{V as d}from"./VSheet-5e2af548.js";import{V as P}from"./VDialog-7687c8ff.js";import{V as L}from"./VCard-8ca74176.js";import{V as S}from"./VSpacer-441d260f.js";import"./VAutocomplete-22e1fd5b.js";import"./layout-c76e1f01.js";const $=t=>(T("data-v-34ea1222"),t=t(),k(),t),w={key:1},U=$(()=>v("h1",{class:"ml-1 mt-5",style:{color:"#777777"}},"Cancelar Titulo",-1)),N={data(){return{userData:{},dados:{},loading:!0,dialog:!1}},methods:{returnToMainPage(){this.$router.push("/gestao-perimetros/index")},async updateProrrogacao(){try{const t={Authorization:`Bearer ${this.userData.token}`},a=JSON.parse(localStorage.getItem("user")),r={dt_cancelamento:new Date().toISOString(),user_alteracao:a.id},i=await f.put(`http://45.55.192.246:3333/service/gerencia/updatePrediosTitulos/${this.dados.documento}`,r,{headers:t});return console.log(i),this.$router.push("/gestao-perimetros/index"),i}catch(t){console.error("Erro na chamada de API:",t)}},async loadLotes(){try{const t={Authorization:`Bearer ${this.userData.token}`},a=await f.get(`http://45.55.192.246:3333/service/gerencia/getPrediosTitulosById/${this.dados.documento}`,{headers:t});this.dados=a.data,console.log(this.dados)}catch(t){console.error("Erro na chamada de API:",t)}finally{this.loading=!1}}},created(){this.$route.query.documento?(this.dados.documento=this.$route.query.documento,this.loadLotes()):console.log("Erro em carregar dados")},mounted(){this.userData=JSON.parse(localStorage.getItem("user")),(async()=>await this.loadLotes())()}},B=Object.assign(N,{__name:"TitulosCancelamento",setup(t){return(a,r)=>{const i=p("font-awesome-icon"),V=p("LoadingComponent");return a.loading?(m(),g(V,{key:0},{default:o(()=>[e(i,{icon:["fas","spinner"],spin:""})]),_:1})):(m(),C("div",w,[e(A),e(h,null,{default:o(()=>[U,e(h,{class:"data-container mt-7 mb-8"},{default:o(()=>[e(l,null,{default:o(()=>[e(d,{class:"pa-2 ma-2"},{default:o(()=>[s(" Lote: "+n(a.dados.pi_lotes.numero)+" - "+n(a.dados.pi_lotes.nome),1)]),_:1})]),_:1}),e(l,null,{default:o(()=>[e(d,{class:"pa-2 ma-2"},{default:o(()=>[s(" Título: "+n(a.dados.documento),1)]),_:1})]),_:1}),e(_,{width:"100%"}),e(l,null,{default:o(()=>[e(d,{class:"pa-2 ma-2"},{default:o(()=>[s(" Nosso Número: "+n(a.dados.nosso_numero),1)]),_:1})]),_:1}),e(l,null,{default:o(()=>[e(d,{class:"pa-2 ma-2"},{default:o(()=>[s(" Valor:R$ "+n(a.dados.valor),1)]),_:1})]),_:1}),e(l,null,{default:o(()=>[e(d,{class:"pa-2 ma-2"},{default:o(()=>[s("Vencimento: "+n(a.dados.dt_vencimento),1)]),_:1})]),_:1}),e(_,{width:"100%"}),e(l,null,{default:o(()=>[e(d,{class:"pa-2 ma-2"},{default:o(()=>[s(" Link do Boleto: "+n(a.dados.link_boleto),1)]),_:1})]),_:1})]),_:1}),e(u,{class:"me-4",color:"red",onClick:a.returnToMainPage},{default:o(()=>[s(" Voltar ")]),_:1},8,["onClick"]),e(P,{modelValue:a.dialog,"onUpdate:modelValue":r[1]||(r[1]=c=>a.dialog=c),"max-width":"400",persistent:""},{activator:o(({props:c})=>[e(u,I({class:"me-4"},c,{color:"green"}),{default:o(()=>[s(" Salvar ")]),_:2},1040)]),default:o(()=>[e(L,{text:"Deseja salvar esta data de cancelamento?",title:"Confirmação"},{actions:o(()=>[e(S),e(u,{onClick:r[0]||(r[0]=c=>a.dialog=!1)},{default:o(()=>[s(" Voltar ")]),_:1}),e(u,{onClick:a.updateProrrogacao},{default:o(()=>[s(" Confirmar ")]),_:1},8,["onClick"])]),_:1})]),_:1},8,["modelValue"])]),_:1})]))}}}),D=y(B,[["__scopeId","data-v-34ea1222"]]),x={__name:"TitulosCancelamento",setup(t){return(a,r)=>(m(),g(D))}};export{x as default};