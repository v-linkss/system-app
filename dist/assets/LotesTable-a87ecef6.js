import{_ as b,o as s,d as f,t as T,f as r,c as n,w as p,h as l,a2 as k,a3 as y,F as _,v as w,i as A,$ as V,a0 as x,l as I,x as L,a1 as m,n as E,e as g,q as S,s as C}from"./index-88a5129e.js";import{_ as $,a as P}from"./visualizar-491b4619.js";import{_ as U,a as R}from"./ativo-27666d69.js";import{_ as z}from"./excluido-5dd3f69f.js";import{A as B}from"./AppBar-f0429b7c.js";import{_ as Q}from"./_plugin-vue_export-helper-c27b6911.js";import{V as D}from"./VRow-0c716acb.js";import{V as N}from"./VApp-b33aeed1.js";import"./VAutocomplete-6839ad36.js";import"./VSpacer-49a1f52c.js";import"./layout-44c14d18.js";const h=t=>(S("data-v-6b8965cb"),t=t(),C(),t),F={key:1},O=h(()=>l("img",{class:"ml-8 mr-2",style:{width:"40px",height:"40px"},src:$,alt:"novo"},null,-1)),H=[O],M=h(()=>l("h1",{class:"mt-8 mb-10",style:{color:"#777777"}},"Lotes",-1)),W={key:0,class:"custom-td"},q=["onClick"],K=h(()=>l("img",{style:{width:"40px",height:"40px"},src:P,alt:"Visualizar"},null,-1)),G=[K],J=["onClick"],j=h(()=>l("img",{style:{width:"40px",height:"40px"},src:R,alt:"Visualizar"},null,-1)),X=[j],Y=["onClick"],Z={key:0,src:z,alt:"Excluir",class:"trash-icon",style:{width:"40px",height:"40px"},title:"Reativar"},ee={key:1,src:U,alt:"Excluir",class:"trash-icon",style:{width:"40px",height:"40px"},title:"Excluir"},te={components:{VDataTable:y},data(){return{userData:{},filtrados_lotes:[],lotes:[],loading:!0,searchQuery:"",itemsPerPage:[20],footerProps:[20],headers:[{title:"Data",value:"data",search:""},{title:"Lote",value:"lote",search:""},{title:"Conta",value:"conta",search:""},{title:"Valor",value:"valor",search:""},{title:"Cobrar/Devolver",value:"cobrar",search:""},{title:"Ações",value:"actions",search:""}],emptyInputs:[{data:"",lote:"",conta:"",valor:"",cobrar:""}]}},computed:{displayedItems(){return[...this.emptyInputs,...this.filtrados_lotes]}},methods:{redirectToView(t){this.$router.push({name:"pi-lotes-receitas/index/vizualizar",query:{id:t}})},redirectToRegister(){this.$router.push({name:"pi-lotes-receitas/index/cadastro"})},redirectToUpdate(t){this.$router.push({name:"pi-lotes-receitas/index/atualizar",query:{id:t}})},async toggleExclusion(t){try{const e={Authorization:`Bearer ${this.userData.token}`};t.excluido=!t.excluido,await g.put(`http://localhost:3333/service/gerencia/updateReceitaLotes/${t.id}`,{excluido:t.excluido},{headers:e})}catch(e){console.error("Erro ao atualizar exclusão:",e),t.excluido=!t.excluido}},saveSearchQuery(){localStorage.setItem("searchQuery",this.searchQuery);const t=localStorage.getItem("searchQuery");console.log("saveSearchQuery:",t)},filterTable(){this.filtrados_lotes=this.lotes.filter(t=>this.headers.every(e=>{if(e.search.trim()==="")return!0;const a=String(t[e.value]).toLowerCase(),i=e.search.toLowerCase();return a.includes(i)}))},filterOnEnter(){this.filterTable()},filterOnBlur(){this.filterTable()},updateSearchFieldWidth(){const t=this.$refs.headerTitle;t&&(this.searchFieldWidth=t.clientWidth+"px")}},mounted(){this.userData=JSON.parse(localStorage.getItem("user"));const e={predio_id:JSON.parse(localStorage.getItem("predio")).predio_id},a={Authorization:`Bearer ${this.userData.token}`};g.post("http://localhost:3333/service/gerencia/listaLotesReceita",e,{headers:a}).then(o=>{this.lotes=o.data,this.filtrados_lotes=this.lotes,console.log(o)}).catch(o=>{console.error("Erro na chamada de API:",o)}).finally(()=>{this.loading=!1});const i=localStorage.getItem("searchQuery");this.searchQuery=i||""},updated(){this.updateSearchFieldWidth()}},se=Object.assign(te,{__name:"TableLotes",setup(t){return(e,a)=>{const i=b("b-tooltip");return e.loading?(s(),f(T,{key:0,class:"loading-spinner",indeterminate:"",size:"64"})):(s(),r("div",F,[n(B),n(D,null,{default:p(()=>[l("div",{class:"btn-pointer mt-8 mb-10",onClick:a[0]||(a[0]=o=>e.redirectToRegister())},H),M]),_:1}),n(N,null,{default:p(()=>[n(k(y),{headers:e.headers,search:e.searchQuery,items:e.displayedItems,"rows-per-page-items":e.itemsPerPage,"footer-props":e.footerProps,density:"default"},{item:p(({item:o,index:v})=>[l("tr",null,[(s(!0),r(_,null,w(e.headers,(u,c)=>(s(),r("td",{key:c},[v===0&&c!==e.headers.length-1?(s(),f(A,{key:0,modelValue:u.search,"onUpdate:modelValue":d=>u.search=d,outlined:"","hide-details":"",onKeydown:V(e.filterOnEnter,["enter"]),onBlur:e.filterOnBlur,ref_for:!0,ref:"searchFields",style:{width:"100%","background-color":"#ffffff",border:"1px solid #cccccc","border-radius":"5px"},class:x({focused:e.isFocused})},null,8,["modelValue","onUpdate:modelValue","onKeydown","onBlur","class"])):c!==e.headers.length-1?(s(),r(_,{key:1},[I(L(o[u.value]),1)],64)):(s(),r(_,{key:2},[v!==0&&c===e.headers.length-1?(s(),r("div",W,[m((s(),r("div",{class:"btn-pointer",onClick:d=>e.redirectToView(o.id),title:"Visualizar"},G,8,q)),[[i,void 0,void 0,{hover:!0}]]),m((s(),r("div",{class:"btn-pointer",onClick:d=>e.redirectToUpdate(o.id),title:"Editar"},X,8,J)),[[i,void 0,void 0,{hover:!0}]]),m((s(),r("div",{class:"btn-pointer",id:"exclusão",onClick:d=>e.toggleExclusion(o),title:"Excluir"},[o.excluido?(s(),r("img",Z)):(s(),r("img",ee))],8,Y)),[[i,void 0,void 0,{hover:!0}]])])):E("",!0)],64))]))),128))])]),_:1},8,["headers","search","items","rows-per-page-items","footer-props"])]),_:1})]))}}}),oe=Q(se,[["__scopeId","data-v-6b8965cb"]]),me={__name:"LotesTable",setup(t){return(e,a)=>(s(),f(oe))}};export{me as default};
