(()=>{"use strict";function e(e){return null==e}function t(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function s(e,s){const n={};for(const r of Object.keys(e))t(s,r)&&(n[r]=e[r]);return n}function n(e,s){const n={};for(const r of Object.keys(e))t(s,r)||(n[r]=e[r]);return n}function r(e,t){let s;for(let n=0;n<e.length;n++)if(e[n]===t){s=e.splice(n,1)[0];break}return s}new Map([["[object Undefined]","undefined"],["[object Null]","null"],["[object Boolean]","boolean"],["[object String]","string"],["[object Number]","number"],["[object Array]","array"],["[object Set]","set"],["[object Object]","object"],["[object Map]","map"],["[object Function]","function"],["[object RegExp]","regexp"],["[object Error]","error"]]);const i=["a","able","about","above","across","after","again","against","ain","all","am","an","and","any","are","aren","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can","couldn","couldn't","d","did","didn","didn't","do","does","doesn","doesn't","doing","don","don't","down","during","each","few","for","from","further","had","hadn","hadn't","has","hasn","hasn't","have","haven","haven't","having","he","her","here","hers","herself","him","himself","his","how","i","if","in","into","is","isn","isn't","it","it's","its","itself","just","ll","m","ma","me","mightn","mightn't","more","most","mustn","mustn't","my","myself","needn","needn't","no","nor","not","now","o","of","off","on","once","only","or","other","our","ours","ourselves","out","over","own","re","s","same","shan","shan't","she","she's","should","should've","shouldn","shouldn't","so","some","such","t","than","that","that'll","the","their","theirs","them","themselves","then","there","these","they","this","those","through","to","too","under","until","up","ve","very","was","wasn","wasn't","we","were","weren","weren't","what","when","where","which","while","who","whom","why","will","with","won","won't","wouldn","wouldn't","y","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"].reduce(((e,t)=>(e[t]=t,e)),{});function a(e){return function(e){return Boolean(i[e])}(e)||!e.match(/(\w+)/g)}function o(e){const t=[];for(const s of e.split(/\s+/g))a(s)||t.push(s);return t.join(" ")}var h;!function(e){e.Invalid="Invalid",e.PresenceTerm="PresenceTerm",e.ExactTerm="ExactTerm",e.Term="Term"}(h||(h={}));const c={[h.PresenceTerm]:/(?<PresenceTerm>(?:(\s+)?([-+]))((\w{2,})|"(?:[^"]+)"))/,[h.ExactTerm]:/(?<ExactTerm>("(?:[^"]+)"))/,[h.Term]:/(?<Term>[^ ]+)/},u=new RegExp(`${c[h.PresenceTerm].source}|${c[h.ExactTerm].source}|${c[h.Term].source}`,"g");class l{constructor(e,t){this.type=e,this.text=t}}class d{constructor(e){this.queryInvalidChars=/(?:[\^*()_}\]\\[{>\\<|\\/`~}]+)/gi,this.queryText=e.replace(this.queryInvalidChars,"")}getTokenType(e={}){let t=h.Invalid;return e.PresenceTerm?t=h.PresenceTerm:e.ExactTerm?t=h.ExactTerm:e.Term&&(t=h.Term),t}tokenize(){const e=[];for(const t of this.queryText.matchAll(u))if(t&&t.groups){const s=this.getTokenType(t.groups),n=(t[0]||"").trim();n&&!a(n)&&e.push(new l(s,n))}return e}}function p(e=""){return e.replace(/\s+/g," ").trim()}function m(e=""){return e.replace(/["]/g,"")}const f=/s$/i,g=/(ss|i?es)$/i;function y(e){const t=[];for(const s of e.split(/\s+/g))f.test(s)&&!g.test(s)?t.push(s.replace(f,"")):t.push(s);return t.join(" ")}var b;!function(e){e[e.Simple=0]="Simple",e[e.Negated=1]="Negated",e[e.Required=2]="Required"}(b||(b={}));class v{constructor(){this.parts=[]}add(e){this.parts.push(e)}}class w{constructor(e){this.tokens=e}parsePresence(e){let t=p(e.text.toLocaleLowerCase()).trim(),s=b.Simple,n=!1;return t.startsWith("-")?s=b.Negated:t.startsWith("+")&&(s=b.Required),t=function(e=""){return e.replace(/^([-+]+)/,"")}(t),t.startsWith('"')&&(t=m(t).trim(),n=!0),t=o(t),t=y(t),{term:t,type:s,isPhrase:n}}parseExact(e){let t=m(e.text.toLocaleLowerCase());return t=p(t).trim(),t=o(t),t=y(t),{term:t,type:b.Simple,isPhrase:!0}}parseSimple(e){return{term:y(e.text.toLocaleLowerCase().trim()),type:b.Simple,isPhrase:!1}}parse(){const e=new v;for(const t of this.tokens){let s;switch(t.type){case h.PresenceTerm:s=this.parsePresence(t);break;case h.ExactTerm:s=this.parseExact(t);break;default:s=this.parseSimple(t)}s.term&&e.add(s)}return e}}function T(e){const t=e.concat(),s=[];if(!t.length)return s;let n=parseInt(t.shift(),36);s.push(n);for(const e of t){const t=n+parseInt(e,36);s.push(t),n=t}return s}const E=/\s+/g;class x{constructor(e){this.documentsTable={},this.indexTable={},this.uidKey=e.uidKey||"id",this.fields=new Set(e.fields),this.documentSplitter=e.splitter||E}tokenizeText(e){return p(e).toLocaleLowerCase().split(this.documentSplitter)}tokensWithPostings(e){const t=[];let s=0;for(const n of e)if(!a(n)){const e={term:y(n),posting:s};s+=n.length+1,t.push(e)}return t}parseDocMetadata(e){if(!e)return{frequency:0,postings:[]};const[t,s]=e.split("/");return{frequency:Number(t),postings:T(s.split(","))}}stringifyDocMetadata(e){return`${e.frequency}/${function(e){const t=[];if(!e.length)return t;for(let s=0;s<e.length;s++){const n=e[s-1],r=e[s];if(0===s)t.push(r.toString(36));else{const e=r-n;t.push(e.toString(36))}}return t}(e.postings).join(",")}`}index(t){if(e(t)||!(s=t)||!/\S+/g.test(s))return this;var s;this.fields.add(t);for(const e of Object.values(this.documentsTable))this.indexDocument(t,e);return this}indexDocument(t,s){const n=s[this.uidKey];if(e(n))return;const r=this.tokensWithPostings(this.tokenizeText(s[t]));for(const e of r){this.indexTable[e.term]||(this.indexTable[e.term]={});const t=this.getDocumentEntry(e.term,n);t.postings.push(e.posting),t.frequency+=1,this.indexTable[e.term][n]=this.stringifyDocMetadata(t)}}addDocuments(t){if(e(t)||!Array.isArray(t))return this;for(const e of t){const t=e[this.uidKey];this.documentsTable[t]=e}return this.fields.forEach((e=>this.index(e))),this}getDocument(e){return this.documentsTable[e]}getTermEntry(e){return this.indexTable[e]||{}}getDocumentEntry(e,t){const s=this.getTermEntry(e);return this.parseDocMetadata(s[t])}toJSON(){return{fields:[...this.fields],documents:Object.assign({},this.documentsTable),index:Object.assign({},this.indexTable)}}}class j{constructor(e){this.invertedIndex=e}groupQueryParts(e){const t={required:[],negated:[],simple:[]};for(const s of e)switch(s.type){case b.Required:t.required.push(s);break;case b.Negated:t.negated.push(s);break;case b.Simple:t.simple.push(s)}return t}getSimpleMatches(e){const t=e&&this.invertedIndex.getTermEntry(e.term);return Object.assign({},t)}getRequiredMatches(e){let t={};for(let n=0;n<e.length;n++){const r=e[n],i=r.isPhrase?this.getPhraseMatches(r):this.getSimpleMatches(r);if(!i){t={};break}t=0===n?i:s(t,i)}return t}searchPhrase({uids:t,terms:s}){const n={},i=s.length,a={};for(const o of t){for(const e of s){const t=this.invertedIndex.getDocumentEntry(e,o);a[e]=t.postings}let t=0;const h=[a[s[0]].shift()];for(;h.length&&!e(s[t+1])&&n[o]!==i;){0===t&&(n[o]=1);const i=h[h.length-1]+s[t].length+1,c=r(a[s[t+1]],i);if(e(c)){t=0,h.length=0;const n=a[s[0]].shift();e(n)||h.push(n)}else h.push(c),n[o]+=1,t++}n[o]!==i&&delete n[o]}return n}getPhraseMatches(e){const t=e.term.split(/\s+/);if(1===t.length)return this.getSimpleMatches(e);const s=this.getRequiredMatches(t.map((e=>({term:e,isPhrase:!1}))));return this.searchPhrase({terms:t,uids:Object.keys(s)})}getMatches(e){const t={};for(const s of e)s.isPhrase?Object.assign(t,this.getPhraseMatches(s)):Object.assign(t,this.getSimpleMatches(s));return t}search(e){const t=function(e=""){if(!e)return new v;const t=new d(e).tokenize();return new w(t).parse()}(e),s=this.groupQueryParts(t.parts),r=this.getMatches(s.negated);if(s.required.length){const e=this.getRequiredMatches(s.required);return Object.keys(n(e,r)).map((e=>this.invertedIndex.getDocument(e)))}const i=this.getMatches(s.simple);return Object.keys(n(i,r)).map((e=>this.invertedIndex.getDocument(e)))}}const S=e=>document.querySelector(e);class I extends Event{constructor(e){super("statechange"),this.state=e}}class P extends EventTarget{constructor(e={}){super(),this.value=e}set(e){this.value=e,this.dispatchEvent(new I(this.value))}get(){return this.value}}class k extends EventTarget{get tagName(){return"div"}get classNames(){return[]}constructor(e={}){super(),this.settings={},this.settings=Object.assign(Object.assign({},this.settings),e),this._createElement()}_createElement(){this.settings.element||(this.element=document.createElement(this.tagName)),this.element.classList.add(...this.classNames)}destroy(){this.element.remove(),this.element=this.settings=null}}class q extends k{constructor(){super(...arguments),this.inputElement=null}get classNames(){return["search-input"]}handleInputChange(){this.inputElement.value?this.dispatchInputEvent():this.dispatchClearEvent()}dispatchInputEvent(){const e=new CustomEvent("input:value",{bubbles:!0,detail:{value:this.inputElement.value}});this.dispatchEvent(e)}dispatchClearEvent(){const e=new CustomEvent("input:clear",{bubbles:!0});this.dispatchEvent(e)}setValue(e){this.inputElement&&(this.inputElement.value=e)}template(){let e="<form>";return e+='<input type="search" role="search" autocorrect="off" placeholder="Search for something...">',e+="</form>",'<form><input type="search" role="search" autocorrect="off" placeholder="Search for something..."></form>'}render(){return this.element.insertAdjacentHTML("beforeend",this.template()),this.inputElement=this.element.querySelector("input"),this.inputElement&&(this.inputElement.addEventListener("input",(()=>this.handleInputChange())),this.addEventListener("input:value",(e=>this.setValue(e.detail.value)))),this}}class M extends k{get classNames(){return["search-results"]}resultsTemplate(e){return e.reduce(((e,t)=>e+`<article>${t.title}${t.body}</article>`),"")}noResultsTemplate(){return'<p class="no-results">No results found :(</p>'}render(e=[]){return this.element.innerHTML=e?e.length?this.resultsTemplate(e):this.noResultsTemplate():"",this}}(new class{constructor(){this.state=new P,this.$header=S("header"),this.$main=S("main"),this.$stats=S(".search-stats"),this.searchInput=new q,this.searchResults=new M,this.debouncedSearch=function(e,t=0,s){let n=null;return(...r)=>{n&&window.clearTimeout(n),n=window.setTimeout((()=>e.apply(s,r)),t)}}(this.search,100,this),this.invertedIndex=new x({uidKey:"id",fields:["body"],splitter:/\W+|\d+/g}),this.invertedSearch=new j(this.invertedIndex)}async start(){try{await this.loadDocuments()}catch(e){return console.error(e)}this.$header.prepend(this.searchInput.render().element),this.$main.append(this.searchResults.element),this.searchInput.addEventListener("input:value",this),this.searchInput.addEventListener("input:clear",this),this.state.addEventListener("statechange",this),this.dispatchDefaultInputValue()}async loadDocuments(){const e=await fetch("./data.json"),{data:t}=await e.json();this.invertedIndex.addDocuments(t),console.log(this.invertedIndex.toJSON())}dispatchDefaultInputValue(){this.searchInput.dispatchEvent(new CustomEvent("input:value",{detail:{value:'"sierra nevada"'}}))}handleEvent(e){if("input:value"===e.type)return this.debouncedSearch(e.detail.value);if("input:clear"===e.type)return this.state.set({results:null});if("statechange"===e.type){const{results:t}=e.state;this.searchResults.render(t),this.$stats.textContent=t?`Total results: ${t.length}`:""}}search(e=""){if(e.length<=1)return;const t=this.invertedSearch.search(e);this.state.set({results:t})}}).start()})();