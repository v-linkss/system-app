import{u as c}from"./vee-validate.esm-21a037af.js";import{A as I}from"./AppBar-b18ab963.js";import{_ as E,o as U,f as k,c as r,w as n,i as u,a2 as m,a1 as C,j as f,l as g,k as L,F as M,e as _,q as P,s as R,h as T,d as w}from"./index-00aeabf3.js";import{_ as N}from"./_plugin-vue_export-helper-c27b6911.js";import{V}from"./VRow-7de6535c.js";import{V as h}from"./VAutocomplete-6d9bbb06.js";import{V as A}from"./VCheckbox-ba7dfe1e.js";import{V as S}from"./VDialog-774dba8d.js";import{V as q,c as y,d as D}from"./VCard-d3a9fcc6.js";import{V as $}from"./VSpacer-4c538066.js";import{V as B}from"./VContainer-83225802.js";import"./layout-8c213624.js";const H=i=>(P("data-v-72395988"),i=i(),R(),i),j=H(()=>T("h1",{class:"ml-5 mt-5 mb-5",style:{color:"#777777"}},"Lancamentos",-1)),O={data(){return{userData:{},lancamentos:{descricao:void 0,conta_id:void 0,predio_ambiente_id:void 0,predio_equipamento_id:void 0,data:void 0,valor:void 0,recursos_proprios:void 0,pagador_cpfcnpj:void 0,pagador_nome:void 0,imprimir_boleto:void 0},showError:!1,contas:[],ambientes:[],equipamentos:[]}},methods:{returnToMainPage(){this.$router.push("/pi-lancamentos/index")},async carregarEquipamentosCombolist(){console.log(this.lancamentos.imprimir_boleto);const l={predio_token:JSON.parse(localStorage.getItem("predio")).predio_token};try{const s={Authorization:`Bearer ${this.userData.token}`},t=(await _.post("http://45.55.192.246:3333/service/gerencia/combolistEquipamentosLance",l,{headers:s})).data[0].func_json_equipamentos_combolist;this.equipamentos=t}catch(s){console.error("Erro ao carregar tipos:",s)}},async carregarAmbientesCombolist(){const l={predio_id:JSON.parse(localStorage.getItem("predio")).predio_id};try{const s={Authorization:`Bearer ${this.userData.token}`},t=(await _.post("http://45.55.192.246:3333/service/gerencia/combolistAmbientes",l,{headers:s})).data.ambientes;this.ambientes=t}catch(s){console.error("Erro ao carregar tipos:",s)}},async carregarContasCombolist(){const l={predio_id:JSON.parse(localStorage.getItem("predio")).predio_id};try{const s={Authorization:`Bearer ${this.userData.token}`},t=(await _.post("http://45.55.192.246:3333/service/gerencia/combolistContas",l,{headers:s})).data.contas;this.contas=t}catch(s){console.error("Erro ao carregar tipos:",s)}},async submit(){this.lancamentos.predio_equipamento_id===void 0&&(this.lancamentos.predio_equipamento_id=null),this.lancamentos.conta_id===void 0&&(this.lancamentos.conta_id=null),this.lancamentos.predio_ambiente_id===void 0&&(this.lancamentos.predio_ambiente_id=null);const i=JSON.parse(localStorage.getItem("predio")),l=JSON.parse(localStorage.getItem("user")),s=!!this.lancamentos.recursos_proprios,d={descricao:this.lancamentos.descricao,valor:this.lancamentos.valor,predio_ambiente_id:this.lancamentos.predio_ambiente_id,conta_id:this.lancamentos.conta_id,predio_equipamento_id:this.lancamentos.predio_equipamento_id,data:this.lancamentos.data,pagador_cpfcnpj:this.lancamentos.pagador_cpfcnpj,pagador_nome:this.lancamentos.pagador_nome,predio_id:i.predio_id,user_created:l.id,recursos_proprios:s};try{const t={Authorization:`Bearer ${this.userData.token}`},b=await _.post("http://45.55.192.246:3333/service/gerencia/createLancamentos",d,{headers:t});if(console.log("createLancamentos"),this.lancamentos.imprimir_boleto===!0)try{const p={titulo_token:i.predio_token},e=await _.post("http://45.55.192.246:3333/service/gerencia/imprimirRecibo",p,{headers:t});console.log("imprimirRecibo");const o=window.open();this.$router.push("/pi-lancamentos/index"),o.document.write(e.data[0].func_imprime_recibo_titulo)}catch(p){console.error("Erro ao executar a função de impressão:",p)}return this.$router.push("/pi-lancamentos/index"),b}catch(t){console.error("Erro na criação do registro:",t),this.showError=!0}}},mounted(){this.userData=JSON.parse(localStorage.getItem("user")),this.carregarContasCombolist(),this.carregarEquipamentosCombolist(),this.carregarAmbientesCombolist()}},J=Object.assign(O,{__name:"RegisterLancamentos",setup(i){const l=c("descricao"),s=c("equipamento_id"),d=c("vida_util"),t=c("codigo"),b=c("fabricante"),p=c("entra_pmoc");return(e,o)=>{const v=E("mask");return U(),k(M,null,[r(I),r(B,null,{default:n(()=>[j,r(V,{"no-gutters":""},{default:n(()=>[r(u,{class:"ml-5 mr-5",modelValue:e.lancamentos.data,"onUpdate:modelValue":o[0]||(o[0]=a=>e.lancamentos.data=a),"error-messages":m(b).errorMessage.value,label:"Data(*)",type:"date",autofocus:""},null,8,["modelValue","error-messages"])]),_:1}),C(r(u,{class:"ml-5 mr-5",modelValue:e.lancamentos.valor,"onUpdate:modelValue":o[1]||(o[1]=a=>e.lancamentos.valor=a),modelModifiers:{number:!0},"error-messages":m(d).errorMessage.value,label:"Valor"},null,8,["modelValue","error-messages"]),[[v,"#####.##"]]),r(u,{class:"ml-5 mr-5",modelValue:e.lancamentos.descricao,"onUpdate:modelValue":o[2]||(o[2]=a=>e.lancamentos.descricao=a),"error-messages":m(l).errorMessage.value,label:"Descrição"},null,8,["modelValue","error-messages"]),r(V,{"no-gutters":""},{default:n(()=>[r(h,{class:"ml-5 mr-5 mb-5",modelValue:e.lancamentos.predio_equipamento_id,"onUpdate:modelValue":o[3]||(o[3]=a=>e.lancamentos.predio_equipamento_id=a),items:e.equipamentos,"item-title":"descricao","item-value":"id","error-messages":m(s).errorMessage.value,label:"Selecione um Equipamento",dense:"",clearable:""},null,8,["modelValue","items","error-messages"]),r(h,{class:"ml-5 mr-5 mb-5",modelValue:e.lancamentos.conta_id,"onUpdate:modelValue":o[4]||(o[4]=a=>e.lancamentos.conta_id=a),items:e.contas,"item-title":"descricao","item-value":"id","error-messages":m(s).errorMessage.value,label:"Selecione uma Conta(*)",dense:"",clearable:""},null,8,["modelValue","items","error-messages"]),r(h,{class:"ml-5 mr-5 mb-5",modelValue:e.lancamentos.predio_ambiente_id,"onUpdate:modelValue":o[5]||(o[5]=a=>e.lancamentos.predio_ambiente_id=a),items:e.ambientes,"item-title":"descricao","item-value":"id","error-messages":m(s).errorMessage.value,label:"Selecione um Ambiente",dense:"",clearable:""},null,8,["modelValue","items","error-messages"])]),_:1}),r(V,{"no-gutters":""},{default:n(()=>[r(A,{class:"ml-5 mr-5",modelValue:e.lancamentos.imprimir_boleto,"onUpdate:modelValue":o[6]||(o[6]=a=>e.lancamentos.imprimir_boleto=a),"error-messages":m(p).errorMessage.value,label:"Imprimir Boleto"},null,8,["modelValue","error-messages"]),r(u,{class:"ml-5 mr-5",modelValue:e.lancamentos.pagador_cpfcnpj,"onUpdate:modelValue":o[7]||(o[7]=a=>e.lancamentos.pagador_cpfcnpj=a),disabled:!e.lancamentos.imprimir_boleto,"error-messages":m(t).errorMessage.value,label:"CPF/CNPJ"},null,8,["modelValue","disabled","error-messages"]),r(u,{class:"ml-5 mr-5",modelValue:e.lancamentos.pagador_nome,"onUpdate:modelValue":o[8]||(o[8]=a=>e.lancamentos.pagador_nome=a),disabled:!e.lancamentos.imprimir_boleto,"error-messages":m(t).errorMessage.value,label:"Pagador"},null,8,["modelValue","disabled","error-messages"])]),_:1}),r(A,{class:"ml-5 mr-5",modelValue:e.lancamentos.recursos_proprios,"onUpdate:modelValue":o[9]||(o[9]=a=>e.lancamentos.recursos_proprios=a),"error-messages":m(t).errorMessage.value,label:"Recursos Proprios"},null,8,["modelValue","error-messages"]),r(f,{class:"me-4 mt-8",color:"red",onClick:e.returnToMainPage},{default:n(()=>[g(" Voltar ")]),_:1},8,["onClick"]),r(S,{modelValue:e.showError,"onUpdate:modelValue":o[11]||(o[11]=a=>e.showError=a),"max-width":"500"},{activator:n(({props:a})=>[r(f,L(a,{color:"green",class:"me-4 mt-8",onClick:e.submit}),{default:n(()=>[g(" Salvar ")]),_:2},1040,["onClick"])]),default:n(()=>[r(q,null,{default:n(()=>[r(y,null,{default:n(()=>[g(" Faltou preencher os campos obrigatórios ")]),_:1}),r(D,null,{default:n(()=>[r($),r(f,{style:{"background-color":"#1b5175",color:"white"},onClick:o[10]||(o[10]=a=>e.showError=!1)},{default:n(()=>[g(" OK ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})],64)}}}),F=N(J,[["__scopeId","data-v-72395988"]]),re={__name:"RegisterLancamentos",setup(i){return(l,s)=>(U(),w(F))}};export{re as default};