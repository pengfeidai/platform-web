(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32b47108"],{"28a5":function(e,t,n){"use strict";var a=n("aae3"),i=n("cb7c"),r=n("ebd6"),c=n("0390"),s=n("9def"),o=n("5f1b"),l=n("520a"),u=n("79e5"),d=Math.min,h=[].push,f="split",p="length",v="lastIndex",g=4294967295,b=!u(function(){RegExp(g,"y")});n("214f")("split",2,function(e,t,n,u){var m;return m="c"=="abbc"[f](/(b)*/)[1]||4!="test"[f](/(?:)/,-1)[p]||2!="ab"[f](/(?:ab)*/)[p]||4!="."[f](/(.?)(.?)/)[p]||"."[f](/()()/)[p]>1||""[f](/.?/)[p]?function(e,t){var i=String(this);if(void 0===e&&0===t)return[];if(!a(e))return n.call(i,e,t);var r,c,s,o=[],u=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),d=0,f=void 0===t?g:t>>>0,b=new RegExp(e.source,u+"g");while(r=l.call(b,i)){if(c=b[v],c>d&&(o.push(i.slice(d,r.index)),r[p]>1&&r.index<i[p]&&h.apply(o,r.slice(1)),s=r[0][p],d=c,o[p]>=f))break;b[v]===r.index&&b[v]++}return d===i[p]?!s&&b.test("")||o.push(""):o.push(i.slice(d)),o[p]>f?o.slice(0,f):o}:"0"[f](void 0,0)[p]?function(e,t){return void 0===e&&0===t?[]:n.call(this,e,t)}:n,[function(n,a){var i=e(this),r=void 0==n?void 0:n[t];return void 0!==r?r.call(n,i,a):m.call(String(i),n,a)},function(e,t){var a=u(m,e,this,t,m!==n);if(a.done)return a.value;var l=i(e),h=String(this),f=r(l,RegExp),p=l.unicode,v=(l.ignoreCase?"i":"")+(l.multiline?"m":"")+(l.unicode?"u":"")+(b?"y":"g"),y=new f(b?l:"^(?:"+l.source+")",v),x=void 0===t?g:t>>>0;if(0===x)return[];if(0===h.length)return null===o(y,h)?[h]:[];var j=0,S=0,w=[];while(S<h.length){y.lastIndex=b?S:0;var k,T=o(y,b?h:h.slice(S));if(null===T||(k=d(s(y.lastIndex+(b?0:S)),h.length))===j)S=c(h,S,p);else{if(w.push(h.slice(j,S)),w.length===x)return w;for(var O=1;O<=T.length-1;O++)if(w.push(T[O]),w.length===x)return w;S=j=k}}return w.push(h.slice(j)),w}]})},"4f37":function(e,t,n){"use strict";n("aa77")("trim",function(e){return function(){return e(this,3)}})},"84f8":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-header",[n("el-card",{attrs:{height:60,"body-style":{padding:"10px 10px 10px 20px"}}},[n("el-row",[n("el-col",{staticStyle:{float:"right"},attrs:{span:3}},[n("el-button",{staticStyle:{float:"right"},on:{click:e.handleFullScreen}},[n("v-icon",{attrs:{small:""}},[e._v("fullscreen")])],1)],1)],1)],1)],1),n("el-container",[n("div",{staticStyle:{width:"100%"},attrs:{id:"shell"}})])],1)},i=[],r=(n("7f7f"),n("4f37"),n("28a5"),n("d225")),c=n("b0b4"),s=n("308d"),o=n("6bb5"),l=n("4e2b"),u=n("9ab4"),d=n("60a3"),h=n("d70b"),f=h["a"].url.basicUrl+"/v1/b",p=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(s["a"])(this,Object(o["a"])(t).apply(this,arguments)),e.height="500px",e}return Object(l["a"])(t,e),Object(c["a"])(t,[{key:"created",value:function(){}},{key:"mounted",value:function(){this.height=.8*window.innerHeight+"px",this.renderTerminal()}},{key:"renderTerminal",value:function(){var e=this;window.jQuery.terminal?jQuery(function(t,n){t("#shell").terminal(function(a,i){if(""!=a){var r="COMMANDS:\n    exit        exit fullscreen\n    call        Call a service endpoint using rpc\n    health      Query the health of a service\n    list        List items in registry\n    get         Get item from registry\n";try{var c=a.trim().split(/\s+/);switch(c[0]){case"exit":e.$xools.toggleFullScreen("shell");break;case"help":i.echo(r);break;case"list":if(1==c.length||"services"!=c[1])return void i.echo("COMMANDS:\n    services    List services in registry\n");t.ajax({dataType:"json",contentType:"application/json",url:f+"/services",data:{},success:function(e){for(var t=[],n=0;n<e.data.length;n++)t.push(e.data[n].name);i.echo(t.join("\n"))}});break;case"get":if(c.length<3||"service"!=c[1])return void i.echo("COMMANDS:\n    service    Get service from registry\n");t.ajax({dataType:"json",contentType:"application/json",url:f+"/service/"+c[2],data:{},success:function(e){if(0!=e.data.length){i.echo("service\t"+c[2]),i.echo(" ");for(var a={},r=0;r<e.data.length;r++){var s=e.data[r];i.echo("\nversion "+s.version),i.echo(" "),i.echo("Id\tAddress\tPort\tMetadata\n");for(var o=function(e){var n=s.nodes[e],a=[];t.each(n.metadata,function(e,t){a.push(e+"="+t)}),i.echo(n.id+"\t"+n.address+"\t"+n.port+"\t"+a.join(","))},l=0;l<s.nodes.length;l++)o(l);i.echo(" ");for(var u=0;s.endpoints&&u<s.endpoints.length;u++)a[s.endpoints[u].name]==n&&(a[s.endpoints[u].name]=s.endpoints[u])}t.each(a,function(e,n){i.echo("Endpoint: "+e);var a=[];t.each(n.metadata,function(e,t){a.push(e+"="+t)}),i.echo("Metadata: "+a.join(","))})}}});break;case"health":if(c.length<2)return void i.echo("USAGE:\n    health [service]");t.ajax({dataType:"json",contentType:"application/json",url:f+"/service/"+c[1],data:{},success:function(e){i.echo("service\t"+c[1]),i.echo(" ");for(var n=0;n<e.data.length;n++){var a=e.data[n];i.echo("\nversion "+a.version),i.echo(" "),i.echo("Id\tAddress:Port\tStatus\n");for(var r=0;r<a.nodes.length;r++){var s=a.nodes[r];t.ajax({dataType:"json",url:f+"/health",data:{service:a.name,address:s.address+":"+s.port},success:function(e){i.echo(s.id+"\t"+s.address+":"+s.port+"\t"+e.data.status)},error:function(e){i.echo(s.id+"\t"+s.address+":"+s.port+"\t"+e.data.status)}})}i.echo(" ")}}});break;case"call":if(c.length<3)return void i.echo("USAGE:\n    call [service] [endpoint] [request]");var s="{}";c.length>3&&(s=c.slice(3).join(" ")),t.ajax({method:"post",endpoint:"POST",dataType:"json",contentType:"application/json",url:f+"/rpc",data:JSON.stringify({service:c[1],endpoint:c[2],request:s}),success:function(e){i.echo(JSON.stringify(e,null,2))}});break;default:i.echo(a+": command not found"),i.echo(r)}}catch(o){i.error(new String(o))}}else i.echo("")},{greetings:"",name:"micro_cli",height:500,prompt:"micro:~$ "})}):setTimeout(this.renderTerminal,500)}},{key:"handleFullScreen",value:function(){this.$xools.toggleFullScreen("shell")}}]),t}(d["c"]);p=u["a"]([Object(d["a"])({components:{}})],p);var v=p,g=v,b=(n("c69ac"),n("2877")),m=Object(b["a"])(g,a,i,!1,null,"5ca0a46c",null);t["default"]=m.exports},aa77:function(e,t,n){var a=n("5ca1"),i=n("be13"),r=n("79e5"),c=n("fdef"),s="["+c+"]",o="​",l=RegExp("^"+s+s+"*"),u=RegExp(s+s+"*$"),d=function(e,t,n){var i={},s=r(function(){return!!c[e]()||o[e]()!=o}),l=i[e]=s?t(h):c[e];n&&(i[n]=l),a(a.P+a.F*s,"String",i)},h=d.trim=function(e,t){return e=String(i(e)),1&t&&(e=e.replace(l,"")),2&t&&(e=e.replace(u,"")),e};e.exports=d},aae3:function(e,t,n){var a=n("d3f4"),i=n("2d95"),r=n("2b4c")("match");e.exports=function(e){var t;return a(e)&&(void 0!==(t=e[r])?!!t:"RegExp"==i(e))}},b1d8:function(e,t,n){},c69ac:function(e,t,n){"use strict";var a=n("b1d8"),i=n.n(a);i.a},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-32b47108.fbbf29d4.js.map