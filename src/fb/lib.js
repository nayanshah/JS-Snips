function $import(src){ var scriptElem = document.createElement('script'); scriptElem.setAttribute('src',src); scriptElem.setAttribute('type','text/javascript'); document.getElementsByTagName('head')[0].appendChild(scriptElem); }
function $importNoCache(src){ var ms = new Date().getTime().toString(); var seed = "?" + ms; $import(src + seed); }
function denc(s) { return eval('"\\u' + s.match(/\w{4}/g).join('\\u')+'"'); } 
function enc(s) { var z='',i,t; for(i=0;i<s.length;i++) { t=s.charCodeAt(i).toString(16); while(t.length<4) { t='0'+t; } z+=t; } return z.toUpperCase(); } 
function trans(s) { var i,en=true,out=''; for(i=0;i<s.length;i++) { if(s.charCodeAt(i)>70) { en=false; break; } } return en?denc(s):enc(s); } 
function vid() { return unescape(window[keys(window).filter(function (k, v) { if(k.match('swf')) return true; })[0]].variables.video_src) }

function jq() { $import('http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js'); }

