import{_ as T,o,d as g,t as b,f as a,c as h,h as n,w as v,F as p,v as w,i as x,$ as A,x as m,n as _,l as L,a1 as f,a2 as V,a3 as k,e as I,q as E,s as S}from"./index-bf573807.js";import{_ as C,a as P}from"./visualizar-491b4619.js";import{_ as U,a as $}from"./ativo-27666d69.js";import{_ as Q}from"./excluido-5dd3f69f.js";import{A as B}from"./AppBar-caeecede.js";import{_ as R}from"./_plugin-vue_export-helper-c27b6911.js";import{V as z}from"./VRow-835fc559.js";import"./VAutocomplete-22e1fd5b.js";import"./VSpacer-441d260f.js";import"./layout-c76e1f01.js";const u=t=>(E("data-v-5be7e10f"),t=t(),S(),t),N={key:1},D=u(()=>n("img",{class:"ml-8 mr-2",style:{width:"40px",height:"40px"},src:C,alt:"novo"},null,-1)),q=u(()=>n("h1",{style:{color:"#777777"}},"Lancamentos Informações",-1)),O={key:0},F={key:1},H={key:0,class:"custom-td"},M=["onClick"],K=u(()=>n("img",{style:{width:"40px",height:"40px"},src:P,alt:"Visualizar"},null,-1)),G=[K],J=["onClick"],j=u(()=>n("img",{style:{width:"40px",height:"40px"},src:$,alt:"Visualizar"},null,-1)),W=[j],X=["onClick"],Y={key:0,src:Q,alt:"Excluir",class:"trash-icon",style:{width:"40px",height:"40px"},title:"Reativar"},Z={key:1,src:U,alt:"Excluir",class:"trash-icon",style:{width:"40px",height:"40px"},title:"Excluir"},ee={components:{VDataTable:k},data(){return{userData:{},filteredLancamentosInformacoes:[],loading:!0,lancamentosInformacoes:[],searchQuery:"",itemsPerPage:[20],footerProps:[20],emptyInputs:[{id:"",descricao:"",area:"",actions:""}],headers:[{title:"Data",value:"data",search:""},{title:"Conta",search:""},{title:"Quantidade",value:"quantidade",search:""},{title:"Valor",value:"valor",search:""},{title:"Ações",value:"actions",search:""}]}},computed:{displayedItems(){return[...this.emptyInputs,...this.filteredLancamentosInformacoes]}},methods:{filterTable(){this.filteredLancamentosInformacoes=this.lancamentosInformacoes.filter(t=>this.headers.every(e=>{if(e.search.trim()==="")return!0;const r=String(t[e.value]).toLowerCase(),i=e.search.toLowerCase();return r.includes(i)}))},filterOnEnter(){this.filterTable()},filterOnBlur(){this.filterTable()},redirectToView(t){this.$router.push({name:"pi-informacoes/index/vizualizar",query:{id:t}})},redirectToRegister(){this.$router.push("/pi-informacoes/index/cadastro")},redirectToUpdate(t){this.$router.push({name:"pi-informacoes/index/atualizar",query:{id:t}})},async toggleExclusion(t){try{t.excluido=!t.excluido;const e={Authorization:`Bearer ${this.userData.token}`},r=await I.put(`http://45.55.192.246:3333/service/gerencia/updateLancamentos/${t.id}`,{excluido:t.excluido},{headers:e});console.log("Resposta da requisição:",r.data),console.log(t.excluido)}catch(e){console.error("Erro ao atualizar exclusão:",e),t.excluido=!t.excluido}},saveSearchQuery(){localStorage.setItem("searchQuery",this.searchQuery);const t=localStorage.getItem("searchQuery");console.log("saveSearchQuery:",t)}},mounted(){this.userData=JSON.parse(localStorage.getItem("user"));const e={predio_id:JSON.parse(localStorage.getItem("predio")).predio_id},r={Authorization:`Bearer ${this.userData.token}`};I.post("http://45.55.192.246:3333/service/gerencia/tabLancamentosInformacoes",e,{headers:r}).then(s=>{this.lancamentosInformacoes=s.data.lancamentos,this.filteredLancamentosInformacoes=this.lancamentosInformacoes}).catch(s=>{console.error("Erro na chamada de API:",s)}).finally(()=>{this.loading=!1});const i=localStorage.getItem("searchQuery");console.log("Valor carregado do localStorage:",i),this.searchQuery=i||""}},te=Object.assign(ee,{__name:"TableLancamentosInformacoes",setup(t){return(e,r)=>{const i=T("b-tooltip");return e.loading?(o(),g(b,{key:0,class:"loading-spinner",indeterminate:"",size:"64"})):(o(),a("div",N,[h(B),n("div",{class:"btn-pointer mt-8 mb-10",onClick:r[0]||(r[0]=s=>e.redirectToRegister())},[h(z,null,{default:v(()=>[D,q]),_:1})]),h(V(k),{headers:e.headers,search:e.searchQuery,items:e.displayedItems,"rows-per-page-items":e.itemsPerPage,"footer-props":e.footerProps,density:"default"},{item:v(({item:s,index:y})=>[n("tr",null,[(o(!0),a(p,null,w(e.headers,(c,l)=>(o(),a("td",{key:l},[y===0&&l!==e.headers.length-1?(o(),g(x,{key:0,modelValue:c.search,"onUpdate:modelValue":d=>c.search=d,outlined:"","hide-details":"",onKeydown:A(e.filterOnEnter,["enter"]),onBlur:e.filterOnBlur,ref_for:!0,ref:"searchFields",style:{width:"100%","background-color":"#ffffff",border:"1px solid #cccccc","border-radius":"5px"}},null,8,["modelValue","onUpdate:modelValue","onKeydown","onBlur"])):l!==e.headers.length-1?(o(),a(p,{key:1},[c.title==="Conta"?(o(),a("td",O,m(s.pi_contas.descricao),1)):_("",!0),c.title==="Equipamento"?(o(),a("td",F,m(s.predios_equipamentos?s.predios_equipamentos.descricao:""),1)):_("",!0),L(" "+m(s[c.value]),1)],64)):(o(),a(p,{key:2},[y!==0&&l===e.headers.length-1?(o(),a("div",H,[f((o(),a("div",{class:"btn-pointer",onClick:d=>e.redirectToView(s.id),title:"Visualizar"},G,8,M)),[[i,void 0,void 0,{hover:!0}]]),f((o(),a("div",{class:"btn-pointer",onClick:d=>e.redirectToUpdate(s.id),title:"Editar"},W,8,J)),[[i,void 0,void 0,{hover:!0}]]),f((o(),a("div",{class:"btn-pointer",id:"exclusão",onClick:d=>e.toggleExclusion(s),title:"Excluir"},[s.excluido?(o(),a("img",Y)):(o(),a("img",Z))],8,X)),[[i,void 0,void 0,{hover:!0}]])])):_("",!0)],64))]))),128))])]),_:1},8,["headers","search","items","rows-per-page-items","footer-props"])]))}}}),oe=R(te,[["__scopeId","data-v-5be7e10f"]]),pe={__name:"TableLancamentosInformacao",setup(t){return(e,r)=>(o(),g(oe))}};export{pe as default};
