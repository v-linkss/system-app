import{A as I}from"./AppBar-caeecede.js";import{u as d}from"./vee-validate.esm-472c5a5d.js";import{_ as N,o as V,f as $,c as s,w as t,i as m,a2 as n,a1 as c,j as f,l as q,k as y,d as A,n as R,F as w,h as L,e as g}from"./index-bf573807.js";import{V as h}from"./VRow-835fc559.js";import{V as b}from"./VAutocomplete-22e1fd5b.js";import{V as D}from"./VDialog-7687c8ff.js";import{V as C,c as S,d as B}from"./VCard-8ca74176.js";import{V as H}from"./VSpacer-441d260f.js";import{V as O}from"./VContainer-bdb2f7f7.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./layout-c76e1f01.js";const z=L("h1",{class:"mt-5 mb-5",style:{color:"#777777"}},"Predios Equipamentos",-1),G={data(){return{predios_equipamentos:{descricao:void 0,codigo:void 0,ano_fabricacao:void 0,patrimonio:void 0,potencia:void 0,vlr_compra:void 0,numero_serie:void 0,data_operacao:void 0,predio_ambiente_id:void 0,modelo_id:void 0,user_gestor:void 0},ambientes:[],modelos:[],users:[],showError:!1}},methods:{returnToTableTools(){this.$router.push("/predios-equipamentos/index")},async loadAmbientes(){const r={predio_token:JSON.parse(localStorage.getItem("predio")).predio_token};try{const i={Authorization:`Bearer ${this.userData.token}`},u=await g.post("http://45.55.192.246:3333/service/gerencia/listaAmbientes",r,{headers:i}),p=u.data[0].func_json_ambientes;this.ambientes=p,console.log(u)}catch(i){console.error("Erro ao carregar tipos:",i)}},async loadModelos(){const r={token_predio:JSON.parse(localStorage.getItem("predio")).predio_token};try{const i={Authorization:`Bearer ${this.userData.token}`},p=(await g.post("http://45.55.192.246:3333/service/gerencia/listaModeloEquipamentos",r,{headers:i})).data[0].func_json_modelos_equipamentos;this.modelos=p}catch(i){console.error("Erro ao carregar áreas:",i)}},async loadUsers(){const r={predio_token:JSON.parse(localStorage.getItem("predio")).predio_token};try{const i={Authorization:`Bearer ${this.userData.token}`},p=(await g.post("http://45.55.192.246:3333/service/gerencia/PrediosEquipamentosGestores",r,{headers:i})).data[0].func_json_gestores;this.users=p}catch(i){console.error("Erro ao carregar áreas:",i)}},async updatePrediosEquipamento(){this.predios_equipamentos.modelo_id===void 0&&(this.predios_equipamentos.modelo_id=null),this.predios_equipamentos.predio_ambiente_id===void 0&&(this.predios_equipamentos.predio_ambiente_id=null),this.predios_equipamentos.user_gestor===void 0&&(this.predios_equipamentos.user_gestor=null);const l={descricao:this.predios_equipamentos.descricao,codigo:this.predios_equipamentos.codigo,ano_fabricacao:this.predios_equipamentos.ano_fabricacao,patrimonio:this.predios_equipamentos.patrimonio,potencia:this.predios_equipamentos.potencia,vlr_compra:this.predios_equipamentos.vlr_compra,numero_serie:this.predios_equipamentos.numero_serie,data_operacao:this.predios_equipamentos.data_operacao,modelo_id:this.predios_equipamentos.modelo_id,predio_ambiente_id:this.predios_equipamentos.predio_ambiente_id,user_gestor:this.predios_equipamentos.user_gestor};try{const r=await g.put(`http://45.55.192.246:3333/service/gerencia/PrediosEquipamentosAtualizar/${this.predios_equipamentos.id}`,l,{headers});return this.$router.push("/predios-equipamentos/index"),r}catch(r){console.error("Erro na criação do registro:",r),this.showError=!0}},async loadPredioEquipamentosDetails(){try{const l={Authorization:`Bearer ${this.userData.token}`},r=await g.get(`http://45.55.192.246:3333/service/gerencia/getPrediosEquipamentos/${this.predios_equipamentos.id}`,{headers:l});this.predios_equipamentos.descricao=r.data.descricao,this.predios_equipamentos.codigo=r.data.codigo,this.predios_equipamentos.ano_fabricacao=r.data.ano_fabricacao,this.predios_equipamentos.modelo_id=r.data.modelo_id,this.predios_equipamentos.numero_serie=r.data.numero_serie,this.predios_equipamentos.potencia=r.data.potencia,this.predios_equipamentos.vlr_compra=r.data.vlr_compra,this.predios_equipamentos.predio_ambiente_id=r.data.predio_ambiente_id,this.predios_equipamentos.user_gestor=r.data.user_gestor,this.predios_equipamentos.data_operacao=r.data.data_operacao,this.predios_equipamentos.patrimonio=r.data.patrimonio}catch(l){console.error("Erro ao carregar detalhes do prédio_equipamentos:",l)}}},created(){this.$route.query.id?this.predios_equipamentos.id=this.$route.query.id:console.log("Erro em carregar dados")},mounted(){this.userData=JSON.parse(localStorage.getItem("user")),this.loadModelos(),this.loadAmbientes(),this.loadUsers(),this.loadPredioEquipamentosDetails()}},j=Object.assign(G,{__name:"UpdateBuildTools",setup(l){const r=d("descricao"),i=d("codigo"),u=d("ano_fabricacao"),p=d("patrimonio"),U=d("potencia"),v=d("vlr_compra"),T=d("numero_serie"),k=d("data_operacao"),M=d("modelo_id"),E=d("predio_ambiente_id"),P=d("user_gestor");return(e,a)=>{const _=N("mask");return V(),$(w,null,[s(I),s(O,null,{default:t(()=>[z,s(m,{class:"ml-5 mr-5",modelValue:e.predios_equipamentos.descricao,"onUpdate:modelValue":a[0]||(a[0]=o=>e.predios_equipamentos.descricao=o),"error-messages":n(r).errorMessage.value,label:"Descrição(*)",autofocus:""},null,8,["modelValue","error-messages"]),s(h,{"no-gutters":""},{default:t(()=>[s(b,{class:"ml-5 mr-5",modelValue:e.predios_equipamentos.modelo_id,"onUpdate:modelValue":a[1]||(a[1]=o=>e.predios_equipamentos.modelo_id=o),items:e.modelos,"item-title":"descricao","item-value":"id","error-messages":n(M).errorMessage.value,label:"Selecione um Modelo(*)",clearable:""},null,8,["modelValue","items","error-messages"]),s(b,{class:"ml-5 mr-5",modelValue:e.predios_equipamentos.predio_ambiente_id,"onUpdate:modelValue":a[2]||(a[2]=o=>e.predios_equipamentos.predio_ambiente_id=o),items:e.ambientes,"item-title":"descricao","item-value":"id","error-messages":n(E).errorMessage.value,label:"Selecione um Ambiente(*)",style:{"max-width":"600px"},clearable:""},null,8,["modelValue","items","error-messages"]),s(b,{class:"ml-5 mr-5",modelValue:e.predios_equipamentos.user_gestor,"onUpdate:modelValue":a[3]||(a[3]=o=>e.predios_equipamentos.user_gestor=o),items:e.users,label:"Selecione um Gestor","item-title":"nome","item-value":"id","error-messages":n(P).errorMessage.value,clearable:""},null,8,["modelValue","items","error-messages"])]),_:1}),s(h,{"no-gutters":""},{default:t(()=>[s(m,{class:"ml-5 mr-5 mt-5",modelValue:e.predios_equipamentos.codigo,"onUpdate:modelValue":a[4]||(a[4]=o=>e.predios_equipamentos.codigo=o),"error-messages":n(i).errorMessage.value,label:"Codigo"},null,8,["modelValue","error-messages"]),c(s(m,{class:"ml-5 mr-5 mt-5",modelValue:e.predios_equipamentos.vlr_compra,"onUpdate:modelValue":a[5]||(a[5]=o=>e.predios_equipamentos.vlr_compra=o),modelModifiers:{number:!0},"error-messages":n(v).errorMessage.value,label:"Valor de compra"},null,8,["modelValue","error-messages"]),[[_,"#####.##"]]),c(s(m,{class:"ml-5 mr-5 mt-5",modelValue:e.predios_equipamentos.data_operacao,"onUpdate:modelValue":a[6]||(a[6]=o=>e.predios_equipamentos.data_operacao=o),modelModifiers:{number:!0},"error-messages":n(k).errorMessage.value,label:"Inicio Operação"},null,8,["modelValue","error-messages"]),[[_,"####"]])]),_:1}),s(h,{"no-gutters":""},{default:t(()=>[s(m,{class:"ml-5 mr-5",modelValue:e.predios_equipamentos.patrimonio,"onUpdate:modelValue":a[7]||(a[7]=o=>e.predios_equipamentos.patrimonio=o),"error-messages":n(p).errorMessage.value,label:"Numero Patrimonio"},null,8,["modelValue","error-messages"]),c(s(m,{class:"ml-5 mr-5",modelValue:e.predios_equipamentos.numero_serie,"onUpdate:modelValue":a[8]||(a[8]=o=>e.predios_equipamentos.numero_serie=o),modelModifiers:{number:!0},"error-messages":n(T).errorMessage.value,label:"Numero Serie"},null,8,["modelValue","error-messages"]),[[_,"#####"]]),c(s(m,{class:"ml-5 mr-5",modelValue:e.predios_equipamentos.ano_fabricacao,"onUpdate:modelValue":a[9]||(a[9]=o=>e.predios_equipamentos.ano_fabricacao=o),modelModifiers:{number:!0},"error-messages":n(u).errorMessage.value,label:"Ano de Fabricação"},null,8,["modelValue","error-messages"]),[[_,"####"]])]),_:1}),s(h,{"no-gutters":""},{default:t(()=>[c(s(m,{class:"ml-5 mr-5",modelValue:e.predios_equipamentos.potencia,"onUpdate:modelValue":a[10]||(a[10]=o=>e.predios_equipamentos.potencia=o),modelModifiers:{number:!0},"error-messages":n(U).errorMessage.value,label:"Potência"},null,8,["modelValue","error-messages"]),[[_,"###.##"]])]),_:1}),s(f,{class:"me-4 mt-4",color:"red",onClick:e.returnToTableTools},{default:t(()=>[q(" Voltar ")]),_:1},8,["onClick"]),s(D,{"max-width":"500"},{activator:t(({props:o})=>[s(f,y({class:"me-4 mt-4"},o,{color:"green",onClick:e.updatePrediosEquipamento}),{default:t(()=>[q(" Atualizar ")]),_:2},1040,["onClick"])]),default:t(({isActive:o})=>[e.showError?(V(),A(C,{key:0},{default:t(()=>[s(S,null,{default:t(()=>[q(" Ocorreu erro ao atualizar o campo. ")]),_:1}),s(B,null,{default:t(()=>[s(H),s(f,{style:{"background-color":"#1b5175",color:"white"},onClick:F=>o.value=!1},{default:t(()=>[q("OK")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)):R("",!0)]),_:1})]),_:1})],64)}}}),se={__name:"UpdateTableTools",setup(l){return(r,i)=>(V(),A(j))}};export{se as default};