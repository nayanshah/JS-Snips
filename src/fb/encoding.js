function denc(s) { 
    return eval('"\\u' + s.match(/\w{4}/g).join('\\u')+'"'); 
} 

function enc(s) { 
    var z='', i, t; 
    for(i=0; i<s.length; i++) { 
        t= s.charCodeAt(i).toString(16); 
        while(t.length < 4) { 
            t= '0' + t; 
        } 
        z+=t; 
    } 
    return z.toUpperCase(); 
} 

function trans(s) { 
    var i, en=true; 
    for(i=0; i<s.length; i++) { 
        if(s.charCodeAt(i) > 70) { 
            en=false; break; 
        } 
    }
    return en ? 'Decoded: ' + denc(s) : 'Encoded: ' + enc(s);  
}

