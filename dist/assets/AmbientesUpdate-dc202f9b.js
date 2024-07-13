import{A as T}from"./AppBar-caeecede.js";import{u as n}from"./vee-validate.esm-472c5a5d.js";import{_ as k,o as h,f as P,c as r,w as t,i as c,a2 as l,a1 as g,j as _,l as p,k as I,d as v,n as E,F as M,e as u,q as $,s as y,h as N}from"./index-bf573807.js";import{_ as w}from"./_plugin-vue_export-helper-c27b6911.js";import{V as f}from"./VRow-835fc559.js";import{V}from"./VAutocomplete-22e1fd5b.js";import{V as D}from"./VDialog-7687c8ff.js";import{V as R,c as C,d as L}from"./VCard-8ca74176.js";import{V as B}from"./VSpacer-441d260f.js";import{V as S}from"./VContainer-bdb2f7f7.js";import"./layout-c76e1f01.js";const H=e=>($("data-v-c1b3bdd1"),e=e(),y(),e),z=H(()=>N("h1",{class:"ml-5 mt-5 mb-5",style:{color:"#777777"}},"Ambientes",-1)),O={data(){return{userData:{},predios:{descricao:void 0,numero_ocupantes:void 0,area:void 0,tabvalores_tipo_ambiente_id:void 0,predio_area_id:void 0},showError:!1,tipos:[],areas:[]}},methods:{returnToMainPage(){this.$router.push("/predios-ambientes/index")},async loadTipos(){try{const e={Authorization:`Bearer ${this.userData.token}`},i=(await u.get("http://45.55.192.246:3333/service/gerencia/listaTiposAmbientes",{headers:e})).data[0].func_json_tiposambientes;this.tipos=i}catch(e){console.error("Erro ao carregar tipos:",e)}},async loadAreas(){const a={predio_token:JSON.parse(localStorage.getItem("predio")).predio_token};try{const i={Authorization:`Bearer ${this.userData.token}`},m=(await u.post("http://45.55.192.246:3333/service/gerencia/listaAreasAmbientes",a,{headers:i})).data[0].func_json_areas;this.areas=m,console.log(this.areas)}catch(i){console.error("Erro ao carregar áreas:",i)}},async loadPredioDetails(){try{const e={Authorization:`Bearer ${this.userData.token}`},a=await u.get(`http://45.55.192.246:3333/service/gerencia/PrediosAmbiente/${this.predios.id}`,{headers:e});this.predios.descricao=a.data.descricao,this.predios.numero_ocupantes=a.data.numero_ocupantes,this.predios.area=a.data.area,this.predios.tabvalores_tipo_ambiente_id=a.data.tabvalores_tipo_ambiente_id,this.predios.predio_area_id=a.data.predio_area_id}catch(e){console.error("Erro ao carregar detalhes do prédio:",e)}},async update(){this.predios.numero_ocupantes===void 0&&(this.predios.numero_ocupantes=null,console.log(this.predios.numero_ocupantes)),this.predios.predio_area_id===void 0&&(this.predios.predio_area_id=null,console.log(this.predios.predio_area_id));const e={descricao:this.predios.descricao,numero_ocupantes:this.predios.numero_ocupantes,area:this.predios.area,tabvalores_tipo_ambiente_id:this.predios.tabvalores_tipo_ambiente_id,predio_area_id:this.predios.predio_area_id};try{const a={Authorization:`Bearer ${this.userData.token}`};console.log(`###################-this.predios.area-####################
`,this.predios.area);const i=await u.put(`http://45.55.192.246:3333/service/gerencia/PrediosAmbiente/${this.predios.id}`,e,{headers:a});return this.$router.push("/predios-ambientes/index"),this.$router.push("/predios-ambientes/index"),i}catch(a){console.error("Erro na criação do registro:",a),this.showError=!0}}},created(){this.$route.query.id?this.predios.id=this.$route.query.id:console.log("Erro em carregar dados")},mounted(){this.userData=JSON.parse(localStorage.getItem("user")),this.loadPredioDetails(),this.loadTipos(),this.loadAreas()}},j=Object.assign(O,{__name:"UpdateAmbientes",setup(e){const a=n("descricao"),i=n("numero_ocupantes"),b=n("area"),m=n("tabvalores_tipo_ambiente_id"),U=n("predio_area_id");return(o,d)=>{const A=k("mask");return h(),P(M,null,[r(T),r(S,null,{default:t(()=>[z,r(c,{class:"ml-5 mr-5",modelValue:o.predios.descricao,"onUpdate:modelValue":d[0]||(d[0]=s=>o.predios.descricao=s),"error-messages":l(a).errorMessage.value,label:"Descrição(*)",autofocus:""},null,8,["modelValue","error-messages"]),r(f,{"no-gutters":""},{default:t(()=>[r(V,{class:"ml-5 align-end",modelValue:o.predios.tabvalores_tipo_ambiente_id,"onUpdate:modelValue":d[1]||(d[1]=s=>o.predios.tabvalores_tipo_ambiente_id=s),items:o.tipos,"item-title":"descricao","item-value":"id","error-messages":l(m).errorMessage.value,label:"Selecione um Tipo",clearable:""},null,8,["modelValue","items","error-messages"]),r(V,{class:"ml-5 mr-5 align-end",modelValue:o.predios.predio_area_id,"onUpdate:modelValue":d[2]||(d[2]=s=>o.predios.predio_area_id=s),items:o.areas,label:"Selecione uma Área","item-title":"descricao","item-value":"id","error-messages":l(U).errorMessage.value,clearable:""},null,8,["modelValue","items","error-messages"])]),_:1}),r(f,{class:"mt-5","no-gutters":""},{default:t(()=>[g(r(c,{class:"ml-5",modelValue:o.predios.numero_ocupantes,"onUpdate:modelValue":d[3]||(d[3]=s=>o.predios.numero_ocupantes=s),modelModifiers:{number:!0},"error-messages":l(i).errorMessage.value,label:"Numero Ocupantes"},null,8,["modelValue","error-messages"]),[[A,"###"]]),g(r(c,{class:"ml-5 mr-5",modelValue:o.predios.area,"onUpdate:modelValue":d[4]||(d[4]=s=>o.predios.area=s),modelModifiers:{number:!0},"error-messages":l(b).errorMessage.value,label:"Área(m2)"},null,8,["modelValue","error-messages"]),[[A,"###.##"]])]),_:1}),r(_,{class:"ml-5 me-4 mt-8",color:"red",onClick:o.returnToMainPage},{default:t(()=>[p(" Voltar ")]),_:1},8,["onClick"]),r(D,{"max-width":"500"},{activator:t(({props:s})=>[r(_,I({class:"me-4 mt-8"},s,{color:"green",onClick:o.update}),{default:t(()=>[p(" Atualizar ")]),_:2},1040,["onClick"])]),default:t(({isActive:s})=>[o.showError?(h(),v(R,{key:0},{default:t(()=>[r(C,null,{default:t(()=>[p(" Ocorreu erro ao atualizar o campo. ")]),_:1}),r(L,null,{default:t(()=>[r(B),r(_,{style:{"background-color":"#1b5175",color:"white"},onClick:G=>s.value=!1},{default:t(()=>[p("OK")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)):E("",!0)]),_:1})]),_:1})],64)}}}),F=w(j,[["__scopeId","data-v-c1b3bdd1"]]),ae={__name:"AmbientesUpdate",setup(e){return(a,i)=>(h(),v(F))}};export{ae as default};