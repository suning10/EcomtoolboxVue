(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b431098"],{"0830":function(t,e,n){"use strict";var r=n("3ab3"),a=n.n(r);a.a},"0f69":function(t,e,n){"use strict";n.d(e,"d",(function(){return a})),n.d(e,"f",(function(){return i})),n.d(e,"e",(function(){return c})),n.d(e,"g",(function(){return o})),n.d(e,"h",(function(){return l})),n.d(e,"c",(function(){return u})),n.d(e,"b",(function(){return s})),n.d(e,"a",(function(){return d}));var r=n("b32d"),a=function(t,e){return Object(r["a"])({url:"/vertica/pbDelivered",method:"get",params:{start:t,end:e}})},i=function(t,e){return Object(r["a"])({url:"/vertica/pbDelivered",method:"get",params:{start:t,end:e}})},c=function(t,e){return Object(r["a"])({url:"/vertica/pbDeliveredSummary",method:"get",params:{start:t,end:e}})},o=function(t,e){return Object(r["a"])({url:"/vertica/pbDeliveredSummary",method:"get",params:{start:t,end:e}})},l=function(t){return Object(r["a"])({url:"/vertica/ups",method:"post",data:t})},u=function(t){return Object(r["a"])({url:"/vertica/fedex",method:"post",data:t})},s=function(t){return Object(r["a"])({url:"/vertica/edd",method:"post",data:t})},d=function(t,e){return Object(r["a"])({url:"/vertica/originScanUPS",method:"get",params:{start:t,end:e}})}},"1c4c":function(t,e,n){"use strict";var r=n("9b43"),a=n("5ca1"),i=n("4bf8"),c=n("1fa8"),o=n("33a4"),l=n("9def"),u=n("f1ae"),s=n("27ee");a(a.S+a.F*!n("5cc5")((function(t){Array.from(t)})),"Array",{from:function(t){var e,n,a,d,f=i(t),p="function"==typeof this?this:Array,h=arguments.length,v=h>1?arguments[1]:void 0,b=void 0!==v,g=0,m=s(f);if(b&&(v=r(v,h>2?arguments[2]:void 0,2)),void 0==m||p==Array&&o(m))for(e=l(f.length),n=new p(e);e>g;g++)u(n,g,b?v(f[g],g):f[g]);else for(d=m.call(f),n=new p;!(a=d.next()).done;g++)u(n,g,b?c(d,v,[a.value,g],!0):a.value);return n.length=g,n}})},"28a5":function(t,e,n){"use strict";var r=n("aae3"),a=n("cb7c"),i=n("ebd6"),c=n("0390"),o=n("9def"),l=n("5f1b"),u=n("520a"),s=n("79e5"),d=Math.min,f=[].push,p="split",h="length",v="lastIndex",b=4294967295,g=!s((function(){RegExp(b,"y")}));n("214f")("split",2,(function(t,e,n,s){var m;return m="c"=="abbc"[p](/(b)*/)[1]||4!="test"[p](/(?:)/,-1)[h]||2!="ab"[p](/(?:ab)*/)[h]||4!="."[p](/(.?)(.?)/)[h]||"."[p](/()()/)[h]>1||""[p](/.?/)[h]?function(t,e){var a=String(this);if(void 0===t&&0===e)return[];if(!r(t))return n.call(a,t,e);var i,c,o,l=[],s=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),d=0,p=void 0===e?b:e>>>0,g=new RegExp(t.source,s+"g");while(i=u.call(g,a)){if(c=g[v],c>d&&(l.push(a.slice(d,i.index)),i[h]>1&&i.index<a[h]&&f.apply(l,i.slice(1)),o=i[0][h],d=c,l[h]>=p))break;g[v]===i.index&&g[v]++}return d===a[h]?!o&&g.test("")||l.push(""):l.push(a.slice(d)),l[h]>p?l.slice(0,p):l}:"0"[p](void 0,0)[h]?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,r){var a=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,a,r):m.call(String(a),n,r)},function(t,e){var r=s(m,t,this,e,m!==n);if(r.done)return r.value;var u=a(t),f=String(this),p=i(u,RegExp),h=u.unicode,v=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(g?"y":"g"),y=new p(g?u:"^(?:"+u.source+")",v),_=void 0===e?b:e>>>0;if(0===_)return[];if(0===f.length)return null===l(y,f)?[f]:[];var k=0,j=0,O=[];while(j<f.length){y.lastIndex=g?j:0;var S,w=l(y,g?f:f.slice(j));if(null===w||(S=d(o(y.lastIndex+(g?0:j)),f.length))===k)j=c(f,j,h);else{if(O.push(f.slice(k,j)),O.length===_)return O;for(var x=1;x<=w.length-1;x++)if(O.push(w[x]),O.length===_)return O;j=k=S}}return O.push(f.slice(k)),O}]}))},"2fdb":function(t,e,n){"use strict";var r=n("5ca1"),a=n("d2c8"),i="includes";r(r.P+r.F*n("5147")(i),"String",{includes:function(t){return!!~a(this,t,i).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},"3ab3":function(t,e,n){},"4f7f":function(t,e,n){"use strict";var r=n("c26b"),a=n("b39a"),i="Set";t.exports=n("e0b8")(i,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{add:function(t){return r.def(a(this,i),t=0===t?0:t,t)}},r)},"504c":function(t,e,n){var r=n("9e1e"),a=n("0d58"),i=n("6821"),c=n("52a7").f;t.exports=function(t){return function(e){var n,o=i(e),l=a(o),u=l.length,s=0,d=[];while(u>s)n=l[s++],r&&!c.call(o,n)||d.push(t?[n,o[n]]:o[n]);return d}}},"5dbc":function(t,e,n){var r=n("d3f4"),a=n("8b97").set;t.exports=function(t,e,n){var i,c=e.constructor;return c!==n&&"function"==typeof c&&(i=c.prototype)!==n.prototype&&r(i)&&a&&a(t,i),t}},"5df3":function(t,e,n){"use strict";var r=n("02f4")(!0);n("01f9")(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})}))},6762:function(t,e,n){"use strict";var r=n("5ca1"),a=n("c366")(!0);r(r.P,"Array",{includes:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")("includes")},8615:function(t,e,n){var r=n("5ca1"),a=n("504c")(!1);r(r.S,"Object",{values:function(t){return a(t)}})},"8b97":function(t,e,n){var r=n("d3f4"),a=n("cb7c"),i=function(t,e){if(a(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{r=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),r(t,[]),e=!(t instanceof Array)}catch(a){e=!0}return function(t,n){return i(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:i}},a1b4:function(t,e,n){"use strict";n.r(e);var r,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"addBrand-container"},[n("h2",{staticStyle:{"text-align":"center","margin-bottom":"10px"}},[t._v("UPS Tracking with Scans")]),n("div",{staticClass:"container"},[t.displayResult?n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.currentChange,border:""}},[n("el-table-column",{attrs:{prop:"trackingId",label:"trackingId",width:"180"}}),n("el-table-column",{attrs:{prop:"estimatedDelivery",label:"estimatedDelivery",width:"180"}}),n("el-table-column",{attrs:{prop:"eventStatusCode",label:"eventStatusCode",width:"180"}}),n("el-table-column",{attrs:{prop:"eventStatusDescription",label:"eventStatusDescription"}}),n("el-table-column",{attrs:{prop:"eventLocationCity",label:"eventLocationCity",width:"180"}}),n("el-table-column",{attrs:{prop:"eventDateTime",label:"eventDateTime",width:"180"}}),n("el-table-column",{attrs:{prop:"shippedTs",label:"shippedTs",width:"180"}}),n("el-table-column",{attrs:{prop:"actualDeliveredTs",label:"actualDeliveredTs",width:"180"}}),n("el-table-column",{attrs:{prop:"originalScanTs",label:"originalScanTs",width:"180"}}),n("el-table-column",{attrs:{prop:"outForDeliveryTs",label:"outForDeliveryTs",width:"180"}}),n("el-table-column",{attrs:{prop:"isActive",label:"isActive"}})],1),n("el-pagination",{staticStyle:{"text-align":"right"},attrs:{"current-page":t.page,"page-sizes":[10,50,100,1e3],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.page=e},"update:current-page":function(e){t.page=e}}}),n("el-button",{attrs:{type:"primary"},on:{click:t.exportToCSV}},[t._v("ExportToCSV")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.goBack(!1)}}},[t._v("Back")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.goBack(!0)}}},[t._v("Clear and Back")])],1):n("el-form",{ref:"form",attrs:{"label-width":"240px"}},[n("el-form-item",{attrs:{label:"Need Scans?"}},[n("el-radio",{attrs:{label:"1"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("Latest")]),n("el-radio",{attrs:{label:"2"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("Scans")])],1),n("el-form-item",{attrs:{label:"UPS Tracking Numbers"}},[n("el-input",{attrs:{type:"textarea",placeholder:"Please Enter UPS Tracking Number Here, One in a Line ",rows:"30"},model:{value:t.trackingIds,callback:function(e){t.trackingIds=e},expression:"trackingIds"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.upsTrackingSearch}},[t._v("Search")])],1),t.loader?n("div",{staticClass:"loader"}):t._e()],1)],1)])},i=[],c=(n("6762"),n("2fdb"),n("8615"),n("456d"),n("ac6a"),n("4f7f"),n("5df3"),n("1c4c"),n("28a5"),n("d225")),o=n("b0b4"),l=n("308d"),u=n("6bb5"),s=n("013f"),d=n("4e2b"),f=n("bd86"),p=n("9ab4"),h=n("60a3"),v=n("0f69"),b=(r=function(t){function e(){var t,n;Object(c["a"])(this,e);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return n=Object(l["a"])(this,(t=Object(u["a"])(e)).call.apply(t,[this].concat(a))),Object(f["a"])(Object(s["a"])(n),"trackingIds",""),Object(f["a"])(Object(s["a"])(n),"page",1),Object(f["a"])(Object(s["a"])(n),"pageSize",20),Object(f["a"])(Object(s["a"])(n),"total",0),Object(f["a"])(Object(s["a"])(n),"currentData",[]),Object(f["a"])(Object(s["a"])(n),"selectedDate",""),Object(f["a"])(Object(s["a"])(n),"summaryFlag",!0),Object(f["a"])(Object(s["a"])(n),"loader",!1),Object(f["a"])(Object(s["a"])(n),"emptyRDO",!0),Object(f["a"])(Object(s["a"])(n),"radio","1"),Object(f["a"])(Object(s["a"])(n),"displayResult",!1),Object(f["a"])(Object(s["a"])(n),"tableData",[]),n}return Object(d["a"])(e,t),Object(o["a"])(e,[{key:"handleSizeChange",value:function(t){this.pageSize=t,this.page=1}},{key:"handleCurrentChange",value:function(t){this.page=t}},{key:"upsTrackingSearch",value:function(){var t=this;if(this.loader=!0,this.trackingIds.length>1){var e=this.trackingIds.split("\n").filter((function(t){return t.trim().length>0}));try{var n=Array.from(new Set(e)),r={trackingId:n,isActive:this.radio};Object(v["h"])(r).then((function(e){1===e.data.code?(t.tableData=e.data.data,t.total=t.tableData.length,t.loader=!1,t.displayResult=!t.displayResult):(t.$message.error("No Records Can Be Found"),t.loader=!1)}))}catch(a){this.$message.error(a)}}else this.loader=!1,this.$message.error("Please Enter Tracking Number")}},{key:"exportToCSV",value:function(){var t=this.convertToCSV(this.tableData),e=new Blob([t],{type:"text/csv"}),n=document.createElement("a");n.href=window.URL.createObjectURL(e),n.download="data.csv",n.click()}},{key:"convertToCSV",value:function(t){var e=Object.keys(t[0]).join(","),n=t.map((function(t){return Object.values(t).map((function(t){return"string"===typeof t&&t.includes(",")?'"'.concat(t,'"'):t})).join(",")}));return e+"\n"+n.join("\n")}},{key:"goBack",value:function(t){t&&(this.trackingIds=""),this.displayResult=!this.displayResult}},{key:"currentChange",get:function(){var t=this.pageSize*(this.page-1),e=t+this.pageSize;return this.tableData.slice(t,e)}}]),e}(h["c"]),r);b=Object(p["a"])([Object(h["a"])({name:"UPSTracking"})],b);var g=b,m=g,y=(n("0830"),n("2877")),_=Object(y["a"])(m,a,i,!1,null,"52e251e0",null);e["default"]=_.exports},b39a:function(t,e,n){var r=n("d3f4");t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},c26b:function(t,e,n){"use strict";var r=n("86cc").f,a=n("2aeb"),i=n("dcbc"),c=n("9b43"),o=n("f605"),l=n("4a59"),u=n("01f9"),s=n("d53b"),d=n("7a56"),f=n("9e1e"),p=n("67ab").fastKey,h=n("b39a"),v=f?"_s":"size",b=function(t,e){var n,r=p(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,u){var s=t((function(t,r){o(t,s,e,"_i"),t._t=e,t._i=a(null),t._f=void 0,t._l=void 0,t[v]=0,void 0!=r&&l(r,n,t[u],t)}));return i(s.prototype,{clear:function(){for(var t=h(this,e),n=t._i,r=t._f;r;r=r.n)r.r=!0,r.p&&(r.p=r.p.n=void 0),delete n[r.i];t._f=t._l=void 0,t[v]=0},delete:function(t){var n=h(this,e),r=b(n,t);if(r){var a=r.n,i=r.p;delete n._i[r.i],r.r=!0,i&&(i.n=a),a&&(a.p=i),n._f==r&&(n._f=a),n._l==r&&(n._l=i),n[v]--}return!!r},forEach:function(t){h(this,e);var n,r=c(t,arguments.length>1?arguments[1]:void 0,3);while(n=n?n.n:this._f){r(n.v,n.k,this);while(n&&n.r)n=n.p}},has:function(t){return!!b(h(this,e),t)}}),f&&r(s.prototype,"size",{get:function(){return h(this,e)[v]}}),s},def:function(t,e,n){var r,a,i=b(t,e);return i?i.v=n:(t._l=i={i:a=p(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=i),r&&(r.n=i),t[v]++,"F"!==a&&(t._i[a]=i)),t},getEntry:b,setStrong:function(t,e,n){u(t,e,(function(t,n){this._t=h(t,e),this._k=n,this._l=void 0}),(function(){var t=this,e=t._k,n=t._l;while(n&&n.r)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?s(0,"keys"==e?n.k:"values"==e?n.v:[n.k,n.v]):(t._t=void 0,s(1))}),n?"entries":"values",!n,!0),d(e)}}},e0b8:function(t,e,n){"use strict";var r=n("7726"),a=n("5ca1"),i=n("2aba"),c=n("dcbc"),o=n("67ab"),l=n("4a59"),u=n("f605"),s=n("d3f4"),d=n("79e5"),f=n("5cc5"),p=n("7f20"),h=n("5dbc");t.exports=function(t,e,n,v,b,g){var m=r[t],y=m,_=b?"set":"add",k=y&&y.prototype,j={},O=function(t){var e=k[t];i(k,t,"delete"==t?function(t){return!(g&&!s(t))&&e.call(this,0===t?0:t)}:"has"==t?function(t){return!(g&&!s(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return g&&!s(t)?void 0:e.call(this,0===t?0:t)}:"add"==t?function(t){return e.call(this,0===t?0:t),this}:function(t,n){return e.call(this,0===t?0:t,n),this})};if("function"==typeof y&&(g||k.forEach&&!d((function(){(new y).entries().next()})))){var S=new y,w=S[_](g?{}:-0,1)!=S,x=d((function(){S.has(1)})),C=f((function(t){new y(t)})),T=!g&&d((function(){var t=new y,e=5;while(e--)t[_](e,e);return!t.has(-0)}));C||(y=e((function(e,n){u(e,y,t);var r=h(new m,e,y);return void 0!=n&&l(n,b,r[_],r),r})),y.prototype=k,k.constructor=y),(x||T)&&(O("delete"),O("has"),b&&O("get")),(T||w)&&O(_),g&&k.clear&&delete k.clear}else y=v.getConstructor(e,t,b,_),c(y.prototype,n),o.NEED=!0;return p(y,t),j[t]=y,a(a.G+a.W+a.F*(y!=m),j),g||v.setStrong(y,t,b),y}}}]);
//# sourceMappingURL=chunk-3b431098.d1bbe1f1.js.map