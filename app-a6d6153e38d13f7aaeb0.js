(()=>{"use strict";const e=["a","able","about","above","across","after","again","against","ain","all","am","an","and","any","are","aren","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can","couldn","couldn't","d","did","didn","didn't","do","does","doesn","doesn't","doing","don","don't","down","during","each","few","for","from","further","had","hadn","hadn't","has","hasn","hasn't","have","haven","haven't","having","he","her","here","hers","herself","him","himself","his","how","i","if","in","into","is","isn","isn't","it","it's","its","itself","just","ll","m","ma","me","mightn","mightn't","more","most","mustn","mustn't","my","myself","needn","needn't","no","nor","not","now","o","of","off","on","once","only","or","other","our","ours","ourselves","out","over","own","re","s","same","shan","shan't","she","she's","should","should've","shouldn","shouldn't","so","some","such","t","than","that","that'll","the","their","theirs","them","themselves","then","there","these","they","this","those","through","to","too","under","until","up","ve","very","was","wasn","wasn't","we","were","weren","weren't","what","when","where","which","while","who","whom","why","will","with","won","won't","wouldn","wouldn't","y","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"].reduce(((e,t)=>(e[t]=t,e)),{});function t(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function s(e){return null==e}function n(e,s){const n={};for(const r of Object.keys(e))t(s,r)&&(n[r]=e[r]);return n}function r(e,s){const n={};for(const r of Object.keys(e))t(s,r)||(n[r]=e[r]);return n}function i(e,t){let s;for(let n=0;n<e.length;n++)if(e[n]===t){s=e.splice(n,1)[0];break}return s}function a(e){const t=e.concat();if(!t.length)return t;let s=t.shift();const n=[s];for(const e of t){const t=s+e;n.push(t),s=t}return n}function o(e=""){return e.replace(/["]/g,"")}function h(e=""){return e.replace(/\s+/g," ").trim()}function c(t){return Boolean(e[t])||!t.match(/(\w+)/g)}function u(e){const t=[];for(const s of e.split(/\s+/g))c(s)||t.push(s);return t.join(" ")}var l;new Map([["[object Undefined]","undefined"],["[object Null]","null"],["[object Boolean]","boolean"],["[object String]","string"],["[object Number]","number"],["[object Array]","array"],["[object Set]","set"],["[object Object]","object"],["[object Map]","map"],["[object Function]","function"],["[object Date]","date"],["[object RegExp]","regexp"],["[object Symbol]","symbol"],["[object Error]","error"]]),function(e){e.Invalid="Invalid",e.PresenceTerm="PresenceTerm",e.ExactTerm="ExactTerm",e.Term="Term"}(l||(l={}));const d={[l.PresenceTerm]:/(?<PresenceTerm>(?:(\s+)?([-+]))((\w{2,})|"(?:[^"]+)"))/,[l.ExactTerm]:/(?<ExactTerm>("(?:[^"]+)"))/,[l.Term]:/(?<Term>[^ ]+)/},m=new RegExp(`${d[l.PresenceTerm].source}|${d[l.ExactTerm].source}|${d[l.Term].source}`,"g");class p{constructor(e,t){this.type=e,this.text=t}}class f{constructor(e){this.queryInvalidChars=/(?:[\^*()_}\]\\[{>\\<|\\/`~}]+)/gi,this.queryText=e.replace(this.queryInvalidChars,"")}getTokenType(e={}){let t=l.Invalid;return e.PresenceTerm?t=l.PresenceTerm:e.ExactTerm?t=l.ExactTerm:e.Term&&(t=l.Term),t}tokenize(){const e=[];for(const t of this.queryText.matchAll(m))if(t&&t.groups){const s=this.getTokenType(t.groups),n=(t[0]||"").trim();n&&!c(n)&&e.push(new p(s,n))}return e}}var g;!function(e){e[e.Simple=0]="Simple",e[e.Negated=1]="Negated",e[e.Required=2]="Required"}(g||(g={}));class b{constructor(){this.parts=[]}add(e){this.parts.push(e)}}class y{constructor(e){this.tokens=e}parsePresence(e){let t=h(e.term).trim();t.startsWith("-")?e.type=g.Negated:t.startsWith("+")&&(e.type=g.Required),t=function(e=""){return e.replace(/^([-+]+)/,"")}(t),t.startsWith('"')&&(e.isPhrase=!0),e.term=o(t).trim(),e.term=u(e.term)}parseExact(e){e.isPhrase=!0,e.term=h(o(e.term)),e.term=u(e.term)}parse(){const e=new b;for(const t of this.tokens){const s={term:t.text.toLocaleLowerCase(),isPhrase:!1,type:g.Simple};switch(t.type){case l.PresenceTerm:this.parsePresence(s);break;case l.ExactTerm:this.parseExact(s)}e.add(s)}return e}}const v=/\s+/g;class w{constructor(e){this.documentsTable={},this.indexTable={},this.uidKey=e.uidKey||"id",this.searchFields=new Set([...e.searchFields||w.defaultSearchFields]),this.documentSplitter=e.splitter||v}tokenizeText(e){return h(e).toLocaleLowerCase().split(this.documentSplitter)}tokensWithPostings(e){const t=[];let s=0;for(const n of e)if(!c(n)){const e={text:n,posting:s};s+=n.length+1,t.push(e)}return t}parseDocMetadata(e){if(!e)return{frequency:0,postings:[]};const[t,s]=e.split("/");return{frequency:Number(t),postings:a(s.split(",").map(Number))}}stringifyDocMetadata(e){return`${e.frequency}/${function(e){const t=e.concat();if(!t.length)return t;let s=t.shift();const n=[s];for(const e of t)n.push(e-s),s=e;return n}(e.postings).join(",")}`}index(e){if(s(e)||!(t=e)||!/\S+/g.test(t))return this;var t;this.searchFields.add(e);for(const t of Object.values(this.documentsTable))this.indexDocument(e,t);return this}indexDocument(e,t){const n=t[this.uidKey];if(s(n))return;const r=this.tokensWithPostings(this.tokenizeText(t[e]));for(const e of r){this.indexTable[e.text]||(this.indexTable[e.text]={});const t=this.parseDocMetadata(this.indexTable[e.text][n]);t.postings.push(e.posting),t.frequency+=1,this.indexTable[e.text][n]=this.stringifyDocMetadata(t)}}addDocuments(e){if(s(e)||!Array.isArray(e))return this;for(const t of e){const e=t[this.uidKey];this.documentsTable[e]=t}return this.searchFields.forEach((e=>this.index(e))),this}groupQueryParts(e){const t={required:[],negated:[],simple:[]};for(const s of e)switch(s.type){case g.Required:t.required.push(s);break;case g.Negated:t.negated.push(s);break;case g.Simple:t.simple.push(s)}return t}getSimpleMatches(e){const t=e&&this.indexTable[e.term]||{};return Object.assign({},t)}getRequiredMatches(e){let t={};for(let s=0;s<e.length;s++){const r=e[s],i=r.isPhrase?this.getPhraseMatches(r):this.getSimpleMatches(r);if(!i){t={};break}t=0===s?i:n(t,i)}return t}searchPhrase({uids:e,terms:t}){const n={},r=t.length,a={};for(const o of e){for(const e of t){const t=this.parseDocMetadata(this.indexTable[e][o]);a[e]=t.postings}let e=0;const h=[a[t[0]].shift()];for(;h.length&&!s(t[e+1])&&n[o]!==r;){0===e&&(n[o]=1);const r=h[h.length-1]+t[e].length+1,c=i(a[t[e+1]],r);if(s(c)){e=0,h.length=0;const n=a[t[0]].shift();s(n)||h.push(n)}else h.push(c),n[o]+=1,e++}n[o]!==r&&delete n[o]}return n}getPhraseMatches(e){const t=e.term.split(this.documentSplitter);if(1===t.length)return this.getSimpleMatches(e);const s=this.getRequiredMatches(t.map((e=>({term:e,isPhrase:!1}))));return this.searchPhrase({terms:t,uids:Object.keys(s)})}getMatches(e){const t={};for(const s of e)s.isPhrase?Object.assign(t,this.getPhraseMatches(s)):Object.assign(t,this.getSimpleMatches(s));return t}search(e){const t=this.groupQueryParts(e.parts),s=this.getMatches(t.negated);if(t.required.length){const e=this.getRequiredMatches(t.required);return Object.keys(r(e,s)).map((e=>this.documentsTable[e]))}const n=this.getMatches(t.simple);return Object.keys(r(n,s)).map((e=>this.documentsTable[e]))}getDocumentsTable(){return Object.assign({},this.documentsTable)}getIndexTable(){return Object.assign({},this.indexTable)}toJSON(){return{searchFields:[...this.searchFields],documents:this.getDocumentsTable(),index:this.getIndexTable()}}}w.defaultSearchFields=new Set;const T=e=>document.querySelector(e);class x extends Event{constructor(e){super("statechange"),this.state=e}}class E extends EventTarget{constructor(e={}){super(),this.value=e}set(e){this.value=e,this.dispatchEvent(new x(this.value))}get(){return this.value}}class j extends EventTarget{get tagName(){return"div"}get classNames(){return[]}constructor(e={}){super(),this.settings={},this.settings=Object.assign(Object.assign({},this.settings),e),this._createElement()}_createElement(){this.settings.element||(this.element=document.createElement(this.tagName)),this.element.classList.add(...this.classNames)}destroy(){this.element.remove(),this.element=this.settings=null}}class P extends j{constructor(){super(...arguments),this.inputElement=null}get classNames(){return["search-input"]}handleInputChange(){this.inputElement.value?this.dispatchInputEvent():this.dispatchClearEvent()}dispatchInputEvent(){const e=new CustomEvent("input:value",{bubbles:!0,detail:{value:this.inputElement.value}});this.dispatchEvent(e)}dispatchClearEvent(){const e=new CustomEvent("input:clear",{bubbles:!0});this.dispatchEvent(e)}setValue(e){this.inputElement&&(this.inputElement.value=e)}template(){let e="<form>";return e+='<input type="search" role="search" autocorrect="off" placeholder="Search for something...">',e+="</form>",'<form><input type="search" role="search" autocorrect="off" placeholder="Search for something..."></form>'}render(){return this.element.insertAdjacentHTML("beforeend",this.template()),this.inputElement=this.element.querySelector("input"),this.inputElement&&(this.inputElement.addEventListener("input",(()=>this.handleInputChange())),this.addEventListener("input:value",(e=>this.setValue(e.detail.value)))),this}}class S extends j{get classNames(){return["search-results"]}resultsTemplate(e){return e.reduce(((e,t)=>e+`<article>${t.title}${t.body}</article>`),"")}noResultsTemplate(){return"<p>No results found</p>"}render(e=[]){return this.element.innerHTML=e?e.length?this.resultsTemplate(e):this.noResultsTemplate():"",this}}(new class{constructor(){this.searchIndex=new w({uidKey:"id",searchFields:["body"],splitter:/\W+|\d+/g}),this.state=new E,this.$header=T("header"),this.$main=T("main"),this.$stats=T(".search-stats"),this.searchInput=new P,this.searchResults=new S,this.debouncedSearch=function(e,t=0,s){let n=null;return(...r)=>{n&&window.clearTimeout(n),n=window.setTimeout((()=>e.apply(s,r)),t)}}(this.search,100,this)}async start(){try{await this.loadDocuments()}catch(e){console.error(e)}this.$header.prepend(this.searchInput.render().element),this.$main.append(this.searchResults.element),this.searchInput.addEventListener("input:value",this),this.searchInput.addEventListener("input:clear",this),this.state.addEventListener("statechange",this),this.dispatchDefaultInputValue()}async loadDocuments(){const e=await fetch("./data.json"),{data:t}=await e.json();this.searchIndex.addDocuments(t)}dispatchDefaultInputValue(){this.searchInput.dispatchEvent(new CustomEvent("input:value",{detail:{value:"southwestern Utah"}}))}handleEvent(e){if("input:value"===e.type)return this.debouncedSearch(e.detail.value);if("input:clear"===e.type)return this.state.set({results:null});if("statechange"===e.type){const{results:t}=e.state;this.searchResults.render(t),this.$stats.textContent=t?`Total results: ${t.length}`:""}}search(e=""){if(e.length<=1)return;const t=new f(e).tokenize(),s=new y(t).parse();this.state.set({results:this.searchIndex.search(s)})}}).start()})();