function vid() {
    var id = keys(window).filter(
        function (k, v) { 
            if(k.match('swf')) 
                return true; 
        }
    )[0];
    var src = window[id].variables.video_src;
    return unescape(src);
}
