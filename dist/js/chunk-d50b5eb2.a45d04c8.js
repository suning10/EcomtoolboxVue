(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d50b5eb2"],{"1c4c":function(t,e,r){"use strict";var n=r("9b43"),a=r("5ca1"),i=r("4bf8"),o=r("1fa8"),c=r("33a4"),l=r("9def"),u=r("f1ae"),s=r("27ee");a(a.S+a.F*!r("5cc5")((function(t){Array.from(t)})),"Array",{from:function(t){var e,r,a,f,d=i(t),p="function"==typeof this?this:Array,h=arguments.length,b=h>1?arguments[1]:void 0,v=void 0!==b,g=0,y=s(d);if(v&&(b=n(b,h>2?arguments[2]:void 0,2)),void 0==y||p==Array&&c(y))for(e=l(d.length),r=new p(e);e>g;g++)u(r,g,v?b(d[g],g):d[g]);else for(f=y.call(d),r=new p;!(a=f.next()).done;g++)u(r,g,v?o(f,b,[a.value,g],!0):a.value);return r.length=g,r}})},"28a5":function(t,e,r){"use strict";var n=r("aae3"),a=r("cb7c"),i=r("ebd6"),o=r("0390"),c=r("9def"),l=r("5f1b"),u=r("520a"),s=r("79e5"),f=Math.min,d=[].push,p="split",h="length",b="lastIndex",v=4294967295,g=!s((function(){RegExp(v,"y")}));r("214f")("split",2,(function(t,e,r,s){var y;return y="c"=="abbc"[p](/(b)*/)[1]||4!="test"[p](/(?:)/,-1)[h]||2!="ab"[p](/(?:ab)*/)[h]||4!="."[p](/(.?)(.?)/)[h]||"."[p](/()()/)[h]>1||""[p](/.?/)[h]?function(t,e){var a=String(this);if(void 0===t&&0===e)return[];if(!n(t))return r.call(a,t,e);var i,o,c,l=[],s=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),f=0,p=void 0===e?v:e>>>0,g=new RegExp(t.source,s+"g");while(i=u.call(g,a)){if(o=g[b],o>f&&(l.push(a.slice(f,i.index)),i[h]>1&&i.index<a[h]&&d.apply(l,i.slice(1)),c=i[0][h],f=o,l[h]>=p))break;g[b]===i.index&&g[b]++}return f===a[h]?!c&&g.test("")||l.push(""):l.push(a.slice(f)),l[h]>p?l.slice(0,p):l}:"0"[p](void 0,0)[h]?function(t,e){return void 0===t&&0===e?[]:r.call(this,t,e)}:r,[function(r,n){var a=t(this),i=void 0==r?void 0:r[e];return void 0!==i?i.call(r,a,n):y.call(String(a),r,n)},function(t,e){var n=s(y,t,this,e,y!==r);if(n.done)return n.value;var u=a(t),d=String(this),p=i(u,RegExp),h=u.unicode,b=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(g?"y":"g"),m=new p(g?u:"^(?:"+u.source+")",b),_=void 0===e?v:e>>>0;if(0===_)return[];if(0===d.length)return null===l(m,d)?[d]:[];var O=0,S=0,k=[];while(S<d.length){m.lastIndex=g?S:0;var w,j=l(m,g?d:d.slice(S));if(null===j||(w=f(c(m.lastIndex+(g?0:S)),d.length))===O)S=o(d,S,h);else{if(k.push(d.slice(O,S)),k.length===_)return k;for(var R=1;R<=j.length-1;R++)if(k.push(j[R]),k.length===_)return k;S=O=w}}return k.push(d.slice(O)),k}]}))},"2fdb":function(t,e,r){"use strict";var n=r("5ca1"),a=r("d2c8"),i="includes";n(n.P+n.F*r("5147")(i),"String",{includes:function(t){return!!~a(this,t,i).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},"4f7f":function(t,e,r){"use strict";var n=r("c26b"),a=r("b39a"),i="Set";t.exports=r("e0b8")(i,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{add:function(t){return n.def(a(this,i),t=0===t?0:t,t)}},n)},"504c":function(t,e,r){var n=r("9e1e"),a=r("0d58"),i=r("6821"),o=r("52a7").f;t.exports=function(t){return function(e){var r,c=i(e),l=a(c),u=l.length,s=0,f=[];while(u>s)r=l[s++],n&&!o.call(c,r)||f.push(t?[r,c[r]]:c[r]);return f}}},"5dbc":function(t,e,r){var n=r("d3f4"),a=r("8b97").set;t.exports=function(t,e,r){var i,o=e.constructor;return o!==r&&"function"==typeof o&&(i=o.prototype)!==r.prototype&&n(i)&&a&&a(t,i),t}},"5df3":function(t,e,r){"use strict";var n=r("02f4")(!0);r("01f9")(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,e=this._t,r=this._i;return r>=e.length?{value:void 0,done:!0}:(t=n(e,r),this._i+=t.length,{value:t,done:!1})}))},6762:function(t,e,r){"use strict";var n=r("5ca1"),a=r("c366")(!0);n(n.P,"Array",{includes:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),r("9c6c")("includes")},8615:function(t,e,r){var n=r("5ca1"),a=r("504c")(!1);n(n.S,"Object",{values:function(t){return a(t)}})},"8b97":function(t,e,r){var n=r("d3f4"),a=r("cb7c"),i=function(t,e){if(a(t),!n(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,n){try{n=r("9b43")(Function.call,r("11e9").f(Object.prototype,"__proto__").set,2),n(t,[]),e=!(t instanceof Array)}catch(a){e=!0}return function(t,r){return i(t,r),e?t.__proto__=r:n(t,r),t}}({},!1):void 0),check:i}},b39a:function(t,e,r){var n=r("d3f4");t.exports=function(t,e){if(!n(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},b8d4:function(t,e,r){"use strict";r.d(e,"b",(function(){return a})),r.d(e,"a",(function(){return i})),r.d(e,"c",(function(){return o}));var n=r("b32d"),a=function(t){return Object(n["a"])({url:"ageReturn/byRDO",method:"post",data:t})},i=function(t){return Object(n["a"])({url:"ageReturn/byPO",method:"post",data:t})},o=function(t){return Object(n["a"])({url:"ageReturn/byRDOSimple",method:"post",data:t})}},c26b:function(t,e,r){"use strict";var n=r("86cc").f,a=r("2aeb"),i=r("dcbc"),o=r("9b43"),c=r("f605"),l=r("4a59"),u=r("01f9"),s=r("d53b"),f=r("7a56"),d=r("9e1e"),p=r("67ab").fastKey,h=r("b39a"),b=d?"_s":"size",v=function(t,e){var r,n=p(e);if("F"!==n)return t._i[n];for(r=t._f;r;r=r.n)if(r.k==e)return r};t.exports={getConstructor:function(t,e,r,u){var s=t((function(t,n){c(t,s,e,"_i"),t._t=e,t._i=a(null),t._f=void 0,t._l=void 0,t[b]=0,void 0!=n&&l(n,r,t[u],t)}));return i(s.prototype,{clear:function(){for(var t=h(this,e),r=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete r[n.i];t._f=t._l=void 0,t[b]=0},delete:function(t){var r=h(this,e),n=v(r,t);if(n){var a=n.n,i=n.p;delete r._i[n.i],n.r=!0,i&&(i.n=a),a&&(a.p=i),r._f==n&&(r._f=a),r._l==n&&(r._l=i),r[b]--}return!!n},forEach:function(t){h(this,e);var r,n=o(t,arguments.length>1?arguments[1]:void 0,3);while(r=r?r.n:this._f){n(r.v,r.k,this);while(r&&r.r)r=r.p}},has:function(t){return!!v(h(this,e),t)}}),d&&n(s.prototype,"size",{get:function(){return h(this,e)[b]}}),s},def:function(t,e,r){var n,a,i=v(t,e);return i?i.v=r:(t._l=i={i:a=p(e,!0),k:e,v:r,p:n=t._l,n:void 0,r:!1},t._f||(t._f=i),n&&(n.n=i),t[b]++,"F"!==a&&(t._i[a]=i)),t},getEntry:v,setStrong:function(t,e,r){u(t,e,(function(t,r){this._t=h(t,e),this._k=r,this._l=void 0}),(function(){var t=this,e=t._k,r=t._l;while(r&&r.r)r=r.p;return t._t&&(t._l=r=r?r.n:t._t._f)?s(0,"keys"==e?r.k:"values"==e?r.v:[r.k,r.v]):(t._t=void 0,s(1))}),r?"entries":"values",!r,!0),f(e)}}},cb7a:function(t,e,r){t.exports=r.p+"img/AgingReturn.3871eac9.png"},dd30:function(t,e,r){"use strict";r.r(e);var n,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"addBrand-container"},[n("h2",{staticStyle:{"text-align":"center","margin-bottom":"10px"}},[t._v("Age Return Search")]),n("div",{staticClass:"container"},[t.displayResult?n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.currentChange,border:""}},[n("el-table-column",{attrs:{prop:"poLookupKey",label:"poLookupKey",width:"180"}}),n("el-table-column",{attrs:{prop:"rdoId",label:"rdo",width:"180"}}),n("el-table-column",{attrs:{prop:"returnTrackingId",label:"returnTrackingId",width:"180"}}),n("el-table-column",{attrs:{prop:"poId",label:"poId"}}),n("el-table-column",{attrs:{prop:"trackingId",label:"Outbound Tracking",width:"180"}}),n("el-table-column",{attrs:{prop:"sku",label:"sku",width:"180"}}),n("el-table-column",{attrs:{prop:"rsoId",label:"rsoId"}}),n("el-table-column",{attrs:{prop:"refundDt",label:"refundDt",width:"180"}}),n("el-table-column",{attrs:{prop:"currentRefundStatus",label:"currentRefundStatus"}})],1),n("el-pagination",{staticStyle:{"text-align":"right"},attrs:{"current-page":t.page,"page-sizes":[10,50,100,1e3],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.page=e},"update:current-page":function(e){t.page=e}}}),n("el-button",{attrs:{type:"primary"},on:{click:t.exportToCSV}},[t._v("ExportToCSV")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.goBack(!1)}}},[t._v("Back")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.goBack(!0)}}},[t._v("Clear and Back")])],1):n("el-form",{ref:"form",attrs:{model:t.ruleform,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"Search By"}},[n("el-select",{attrs:{placeholder:"Select"},model:{value:t.emptyRDO,callback:function(e){t.emptyRDO=e},expression:"emptyRDO"}},[n("el-option",{attrs:{label:"RDO",value:!0}}),n("el-option",{attrs:{label:"PO&SKU",value:!1}})],1)],1),t.emptyRDO?n("el-form-item",{attrs:{label:"RDOs"}},[n("el-input",{attrs:{type:"textarea",placeholder:"please enter RDO (Start with 8) here",rows:"30"},model:{value:t.ruleform.id,callback:function(e){t.$set(t.ruleform,"id",e)},expression:"ruleform.id"}})],1):n("el-form-item",{attrs:{label:"PO&SKUs"}},[n("el-input",{attrs:{type:"textarea",placeholder:"please enter PO and SKU here eg. sa1234567SM-F721",rows:"30"},model:{value:t.ruleform.poId,callback:function(e){t.$set(t.ruleform,"poId",e)},expression:"ruleform.poId"}})],1),t.emptyRDO?n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.rdoSearch}},[t._v("Search Return Tracking")])],1):n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.poSearch}},[t._v("PO&SKU Search")])],1)],1),n("br"),t._m(0),n("img",{attrs:{src:r("cb7a")}})],1)])},i=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("h3",[t._v("Check Refund Status\r\n          "),r("br"),r("a",{staticStyle:{color:"blue","text-decoration":"underline"},attrs:{href:"http://stacs/sites/Logistics/_layouts/15/DocIdRedir.aspx?ID=W52DUE32R37W-21-2126"}},[t._v("Link to Template")])])}],o=(r("6762"),r("2fdb"),r("8615"),r("456d"),r("ac6a"),r("4f7f"),r("5df3"),r("1c4c"),r("28a5"),r("d225")),c=r("b0b4"),l=r("308d"),u=r("6bb5"),s=r("013f"),f=r("4e2b"),d=r("bd86"),p=r("9ab4"),h=r("b8d4"),b=r("60a3"),v=(n=function(t){function e(){var t,r;Object(o["a"])(this,e);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return r=Object(l["a"])(this,(t=Object(u["a"])(e)).call.apply(t,[this].concat(a))),Object(d["a"])(Object(s["a"])(r),"ruleform",{id:"",poId:""}),Object(d["a"])(Object(s["a"])(r),"page",1),Object(d["a"])(Object(s["a"])(r),"pageSize",25),Object(d["a"])(Object(s["a"])(r),"total",0),Object(d["a"])(Object(s["a"])(r),"currentData",[]),Object(d["a"])(Object(s["a"])(r),"emptyRDO",!0),Object(d["a"])(Object(s["a"])(r),"displayResult",!1),Object(d["a"])(Object(s["a"])(r),"tableData",[]),r}return Object(f["a"])(e,t),Object(c["a"])(e,[{key:"handleSizeChange",value:function(t){this.pageSize=t,this.page=1}},{key:"handleCurrentChange",value:function(t){this.page=t}},{key:"rdoSearch",value:function(){var t=this;if(this.ruleform.id.length>1){var e=this.ruleform.id.split("\n").filter((function(t){return t.trim().length>0})),r=Array.from(new Set(e)),n={rdo:r};Object(h["b"])(n).then((function(e){1===e.data.code&&(console.log(e.data),t.tableData=e.data.data,t.total=t.tableData.length)})),this.displayResult=!this.displayResult}else this.$message.error("Please enter RDO or PO&SKU ")}},{key:"poSearch",value:function(){var t=this;if(this.ruleform.poId.length>1){var e=this.ruleform.poId.split("\n").filter((function(t){return t.trim().length>0})),r=Array.from(new Set(e)),n={rdo:r};Object(h["a"])(n).then((function(e){1===e.data.code?(t.tableData=e.data.data,t.total=t.tableData.length):t.$message.warning("no result found")})),this.displayResult=!this.displayResult}else this.$message.error("Please enter RDO or PO&SKU ")}},{key:"exportToCSV",value:function(){var t=this.convertToCSV(this.tableData),e=new Blob([t],{type:"text/csv"}),r=document.createElement("a");r.href=window.URL.createObjectURL(e),r.download="data.csv",r.click()}},{key:"convertToCSV",value:function(t){var e=Object.keys(t[0]).join(","),r=t.map((function(t){return Object.values(t).map((function(t){return"string"===typeof t&&t.includes(",")?'"'.concat(t,'"'):t})).join(",")}));return e+"\n"+r.join("\n")}},{key:"goBack",value:function(t){t&&(this.ruleform={id:"",poId:""}),this.displayResult=!this.displayResult}},{key:"currentChange",get:function(){var t=this.pageSize*(this.page-1),e=t+this.pageSize;return this.tableData.slice(t,e)}}]),e}(b["c"]),n);v=Object(p["a"])([Object(b["a"])({name:"AgeReturnSearch"})],v);var g=v,y=g,m=(r("f2fe"),r("2877")),_=Object(m["a"])(y,a,i,!1,null,"045048d9",null);e["default"]=_.exports},e0b8:function(t,e,r){"use strict";var n=r("7726"),a=r("5ca1"),i=r("2aba"),o=r("dcbc"),c=r("67ab"),l=r("4a59"),u=r("f605"),s=r("d3f4"),f=r("79e5"),d=r("5cc5"),p=r("7f20"),h=r("5dbc");t.exports=function(t,e,r,b,v,g){var y=n[t],m=y,_=v?"set":"add",O=m&&m.prototype,S={},k=function(t){var e=O[t];i(O,t,"delete"==t?function(t){return!(g&&!s(t))&&e.call(this,0===t?0:t)}:"has"==t?function(t){return!(g&&!s(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return g&&!s(t)?void 0:e.call(this,0===t?0:t)}:"add"==t?function(t){return e.call(this,0===t?0:t),this}:function(t,r){return e.call(this,0===t?0:t,r),this})};if("function"==typeof m&&(g||O.forEach&&!f((function(){(new m).entries().next()})))){var w=new m,j=w[_](g?{}:-0,1)!=w,R=f((function(){w.has(1)})),x=d((function(t){new m(t)})),D=!g&&f((function(){var t=new m,e=5;while(e--)t[_](e,e);return!t.has(-0)}));x||(m=e((function(e,r){u(e,m,t);var n=h(new y,e,m);return void 0!=r&&l(r,v,n[_],n),n})),m.prototype=O,O.constructor=m),(R||D)&&(k("delete"),k("has"),v&&k("get")),(D||j)&&k(_),g&&O.clear&&delete O.clear}else m=b.getConstructor(e,t,v,_),o(m.prototype,r),c.NEED=!0;return p(m,t),S[t]=m,a(a.G+a.W+a.F*(m!=y),S),g||b.setStrong(m,t,v),m}},f2fe:function(t,e,r){"use strict";var n=r("fb8f"),a=r.n(n);a.a},fb8f:function(t,e,r){}}]);
//# sourceMappingURL=chunk-d50b5eb2.a45d04c8.js.map