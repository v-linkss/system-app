import{_ as T,o,d as _,t as k,f as s,c as p,h as l,w as f,F as h,v as E,i as b,$ as w,a0 as x,l as A,x as P,a1 as m,n as V,a2 as q,a3 as y,e as v,q as I,s as C}from"./index-00aeabf3.js";import{_ as S,a as U}from"./visualizar-491b4619.js";import{_ as $,a as B}from"./ativo-27666d69.js";import{_ as z}from"./excluido-5dd3f69f.js";import{A as Q}from"./AppBar-b18ab963.js";import{_ as N}from"./_plugin-vue_export-helper-c27b6911.js";import{V as R}from"./VRow-7de6535c.js";import"./VAutocomplete-6d9bbb06.js";import"./VSpacer-4c538066.js";import"./layout-8c213624.js";const d=t=>(I("data-v-07e8376e"),t=t(),C(),t),D={key:1},L=d(()=>l("img",{class:"ml-8 mr-2",style:{width:"40px",height:"40px"},src:S,alt:"novo"},null,-1)),O=d(()=>l("h1",{style:{color:"#777777"}},"Predio Equipamentos",-1)),F={key:0,class:"custom-td"},M=["onClick"],H=d(()=>l("img",{style:{width:"40px",height:"40px"},src:U,alt:"Visualizar"},null,-1)),K=[H],j=["onClick"],G=d(()=>l("img",{style:{width:"40px",height:"40px"},src:B,alt:"Visualizar"},null,-1)),J=[G],W=["onClick"],X={key:0,src:z,alt:"Excluir",class:"trash-icon",style:{width:"40px",height:"40px"},title:"Reativar"},Y={key:1,src:$,alt:"Excluir",class:"trash-icon",style:{width:"40px",height:"40px"},title:"Excluir"},Z={components:{VDataTable:y},data(){return{userData:{},filteredPrediosEquipamentos:[],predios_equipamentos:[],loading:!0,searchQuery:"",itemsPerPage:[20],footerProps:[20],headers:[{title:"Codigo",value:"codigo",search:""},{title:"Patrimonio",value:"patrimonio",search:""},{title:"Descrição",value:"descricao",search:""},{title:"Ambiente",value:"ambiente",search:""},{title:"Modelo",value:"modelo",search:""},{title:"Ações",value:"actions",search:""}],emptyInputs:[{Codigo:"",patrimonio:"",descricao:"",ambiente:"",modelo:"",actions:""}]}},computed:{displayedItems(){return[...this.emptyInputs,...this.filteredPrediosEquipamentos]}},methods:{redirectToView(t){this.$router.push({name:"predios-equipamentos/index/vizualizar",query:{id:t}})},redirectToRegister(){this.$router.push({name:"predios-equipamentos/index/cadastro"})},redirectToUpdate(t){this.$router.push({name:"predios-equipamentos/index/atualizar",query:{id:t}})},async toggleExclusion(t){try{const e={Authorization:`Bearer ${this.userData.token}`};t.excluido=!t.excluido,await v.put(`http://45.55.192.246:3333/service/gerencia/PrediosEquipamentos/excluir/${t.id}`,{excluido:t.excluido},{headers:e}),console.log(t.excluido)}catch(e){console.error("Erro ao atualizar exclusão:",e),t.excluido=!t.excluido}},saveSearchQuery(){localStorage.setItem("searchQuery",this.searchQuery);const t=localStorage.getItem("searchQuery");console.log("saveSearchQuery:",t)},filterTable(){this.filteredPrediosEquipamentos=this.predios_equipamentos.filter(t=>this.headers.every(e=>{if(e.search.trim()==="")return!0;const a=String(t[e.value]).toLowerCase(),i=e.search.toLowerCase();return a.includes(i)}))},filterOnEnter(){console.log("Enter pressionado"),this.filterTable()},filterOnBlur(){console.log("Campo perdeu o foco"),this.filterTable()}},mounted(){this.userData=JSON.parse(localStorage.getItem("user"));const e={predio_token:JSON.parse(localStorage.getItem("predio")).predio_token},a={Authorization:`Bearer ${this.userData.token}`};v.post("http://45.55.192.246:3333/service/gerencia/listaEquipamentos",e,{headers:a}).then(r=>{this.predios_equipamentos=r.data[0].func_json_equipamentos,this.filteredPrediosEquipamentos=this.predios_equipamentos}).catch(r=>{console.error("Erro na chamada de API:",r)}).finally(()=>{this.loading=!1});const i=localStorage.getItem("searchQuery");console.log("Valor carregado do localStorage:",i),this.searchQuery=i||""}},ee=Object.assign(Z,{__name:"TableBuildTools",setup(t){return(e,a)=>{const i=T("b-tooltip");return e.loading?(o(),_(k,{key:0,class:"loading-spinner",indeterminate:"",size:"64"})):(o(),s("div",D,[p(Q),l("div",{class:"btn-pointer mt-8 mb-10",onClick:a[0]||(a[0]=r=>e.redirectToRegister())},[p(R,null,{default:f(()=>[L,O]),_:1})]),p(q(y),{headers:e.headers,search:e.searchQuery,items:e.displayedItems,"rows-per-page-items":e.itemsPerPage,"footer-props":e.footerProps,density:"default"},{item:f(({item:r,index:g})=>[l("tr",null,[(o(!0),s(h,null,E(e.headers,(u,n)=>(o(),s("td",{key:n},[g===0&&n!==e.headers.length-1?(o(),_(b,{key:0,modelValue:u.search,"onUpdate:modelValue":c=>u.search=c,outlined:"","hide-details":"",onKeydown:w(e.filterOnEnter,["enter"]),onBlur:e.filterOnBlur,ref_for:!0,ref:"searchFields",style:{width:"100%","background-color":"#ffffff",border:"1px solid #cccccc","border-radius":"5px"},class:x({focused:e.isFocused})},null,8,["modelValue","onUpdate:modelValue","onKeydown","onBlur","class"])):n!==e.headers.length-1?(o(),s(h,{key:1},[A(P(r[u.value]),1)],64)):(o(),s(h,{key:2},[g!==0&&n===e.headers.length-1?(o(),s("div",F,[m((o(),s("div",{class:"btn-pointer",onClick:c=>e.redirectToView(r.id),title:"Visualizar"},K,8,M)),[[i,void 0,void 0,{hover:!0}]]),m((o(),s("div",{class:"btn-pointer",onClick:c=>e.redirectToUpdate(r.id),title:"Editar"},J,8,j)),[[i,void 0,void 0,{hover:!0}]]),m((o(),s("div",{class:"btn-pointer",id:"exclusão",onClick:c=>e.toggleExclusion(r),title:"Excluir"},[r.excluido?(o(),s("img",X)):(o(),s("img",Y))],8,W)),[[i,void 0,void 0,{hover:!0}]])])):V("",!0)],64))]))),128))])]),_:1},8,["headers","search","items","rows-per-page-items","footer-props"])]))}}}),te=N(ee,[["__scopeId","data-v-07e8376e"]]),pe={__name:"TableTools",setup(t){return(e,a)=>(o(),_(te))}};export{pe as default};