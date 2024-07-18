import{u as i}from"./vee-validate.esm-472c5a5d.js";import{A as h}from"./AppBar-caeecede.js";import{o as _,f as g,c as a,w as r,i as u,a2 as d,j as p,l as m,k as V,d as I,n as A,F as U,e as f,q as v,s as b,h as C}from"./index-bf573807.js";import{_ as L}from"./_plugin-vue_export-helper-c27b6911.js";import{V as k}from"./VAutocomplete-22e1fd5b.js";import{V as y}from"./VRow-835fc559.js";import{V as E}from"./VDialog-7687c8ff.js";import{V as M,c as N,d as S}from"./VCard-8ca74176.js";import{V as T}from"./VSpacer-441d260f.js";import{V as $}from"./VContainer-bdb2f7f7.js";import"./layout-c76e1f01.js";const q=o=>(v("data-v-5ded816e"),o=o(),b(),o),P=q(()=>C("h1",{class:"ml-5 mt-5 mb-5",style:{color:"#777777"}}," Lancamentos Informações ",-1)),w={data(){return{userData:{},lancamentosInformacoes:{conta_id:void 0,quantidade:void 0,data:void 0,valor:null},showError:!1,contas:[]}},methods:{returnToMainPage(){this.$router.push("/pi-informacoes/index")},async carregarContasCombolist(){const s={predio_id:JSON.parse(localStorage.getItem("predio")).predio_id};try{const n={Authorization:`Bearer ${this.userData.token}`},e=(await f.post("http://45.55.192.246:3333/service/gerencia/combolistContasInformacoes",s,{headers:n})).data.contas;this.contas=e}catch(n){console.error("Erro ao carregar tipos:",n)}},async loadLancamentosInformacoesDetails(){try{const o={Authorization:`Bearer ${this.userData.token}`},s=await f.get(`http://45.55.192.246:3333/service/gerencia/getLancamentosInformacoesById/${this.lancamentosInformacoes.id}`,{headers:o});this.lancamentosInformacoes.valor=s.data.lancamentos.valor,this.lancamentosInformacoes.data=s.data.lancamentos.data,this.lancamentosInformacoes.conta_id=s.data.lancamentos.conta_id,this.lancamentosInformacoes.quantidade=s.data.lancamentos.quantidade}catch(o){console.error("Erro ao carregar detalhes do prédio_equipamentos:",o)}},async update(){this.lancamentosInformacoes.conta_id===void 0&&(this.lancamentosInformacoes.conta_id=null);const o=JSON.parse(localStorage.getItem("predio")),s=JSON.parse(localStorage.getItem("user")),n={valor:this.lancamentosInformacoes.valor,quantidade:this.lancamentosInformacoes.quantidade,conta_id:this.lancamentosInformacoes.conta_id,data:this.lancamentosInformacoes.data,predio_id:o.predio_id,user_alteracao:s.id};try{const c={Authorization:`Bearer ${this.userData.token}`},e=await f.put(`http://45.55.192.246:3333/service/gerencia/updateLancamentos/${this.lancamentosInformacoes.id}`,n,{headers:c});return this.$router.push("/pi-informacoes/index"),console.log(e),e}catch(c){console.error("Erro na criação do registro:",c),this.showError=!0}}},created(){this.$route.query.id?this.lancamentosInformacoes.id=this.$route.query.id:console.log("Erro em carregar dados")},mounted(){this.userData=JSON.parse(localStorage.getItem("user")),this.loadLancamentosInformacoesDetails(),this.carregarContasCombolist()}},B=Object.assign(w,{__name:"UpdateLancamentosInformacoes",setup(o){const s=i("equipamento_id"),n=i("codigo"),c=i("fabricante");return(e,l)=>(_(),g(U,null,[a(h),a($,null,{default:r(()=>[P,a(u,{class:"ml-5 mr-5",modelValue:e.lancamentosInformacoes.data,"onUpdate:modelValue":l[0]||(l[0]=t=>e.lancamentosInformacoes.data=t),"error-messages":d(c).errorMessage.value,label:"Data(*)",type:"date",autofocus:""},null,8,["modelValue","error-messages"]),a(k,{class:"ml-5 mr-5 mb-5",modelValue:e.lancamentosInformacoes.conta_id,"onUpdate:modelValue":l[1]||(l[1]=t=>e.lancamentosInformacoes.conta_id=t),items:e.contas,"item-title":"descricao","item-value":"id","error-messages":d(s).errorMessage.value,label:"Selecione uma Conta(*)",dense:"",clearable:""},null,8,["modelValue","items","error-messages"]),a(y,{"no-gutters":""},{default:r(()=>[a(u,{class:"ml-5 mr-5",modelValue:e.lancamentosInformacoes.quantidade,"onUpdate:modelValue":l[2]||(l[2]=t=>e.lancamentosInformacoes.quantidade=t),modelModifiers:{number:!0},"error-messages":d(n).errorMessage.value,label:"Quantidade"},null,8,["modelValue","error-messages"]),a(u,{class:"ml-5 mr-5",modelValue:e.lancamentosInformacoes.valor,"onUpdate:modelValue":l[3]||(l[3]=t=>e.lancamentosInformacoes.valor=t),modelModifiers:{number:!0},"error-messages":d(n).errorMessage.value,label:"Valor(*)"},null,8,["modelValue","error-messages"])]),_:1}),a(p,{class:"me-4 mt-8",color:"red",onClick:e.returnToMainPage},{default:r(()=>[m(" Voltar ")]),_:1},8,["onClick"]),a(E,{"max-width":"500"},{activator:r(({props:t})=>[a(p,V({class:"me-4 mt-8"},t,{color:"green",onClick:e.update}),{default:r(()=>[m(" Salvar ")]),_:2},1040,["onClick"])]),default:r(({isActive:t})=>[e.showError?(_(),I(M,{key:0},{default:r(()=>[a(N,null,{default:r(()=>[m(" Faltou preencher os campos obrigatorios ")]),_:1}),a(S,null,{default:r(()=>[a(T),a(p,{style:{"background-color":"#1b5175",color:"white"},onClick:R=>t.value=!1},{default:r(()=>[m("OK")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)):A("",!0)]),_:1})]),_:1})],64))}}),D=L(B,[["__scopeId","data-v-5ded816e"]]),X={__name:"UpdateLancamentosInformacao",setup(o){return(s,n)=>(_(),I(D))}};export{X as default};
