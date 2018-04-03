HB.getMetaContent = function(property){
    var metas = document.getElementsByTagName('meta');
    for(i = 0; i < metas.length; i++){
        if(metas[i].getAttribute('name') == property){
            return metas[i].getAttribute('content');
        }
    }
    return '';
};

// HB.shuffleArray = function(arr){
//     for (var i, tmp, n = arr.length; n; i = Math.floor(Math.random() * n), tmp = arr[--n], arr[n] = arr[i], arr[i] = tmp);
//     return arr;
// };

HB.searchDelay = (function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

HB.fuseList = function(index){
    var fuse_list = [];
    for(i in index){
        fuse_list.push({
            'id': i,
            'title': index[i].title,
            'description': index[i].description,
            'keywords': index[i].keywords
        });
    }
    return fuse_list;
};

HB.loadIndex = function(){
    if(document.getElementById('index')){
        return;
    }
    var fjs = document.getElementsByTagName('script')[0];
    var js = document.createElement('script');
    js.id = 'index';
    js.src = '{{ static_url }}/static/js/index.js';
    fjs.parentNode.insertBefore(js, fjs);
    return js;
};

HB.loadAds = function(){
    var ads_el = document.getElementsByTagName('ins');
    for(var i = 0; i < ads_el.length; i++){
        if(ads_el[i].getAttribute('class') == 'adsbygoogle'){
            window.adsbygoogle.push({});
        }
    }
};

HB.getMaxReactions = function(stats){
    var data = {};
    for(i in stats){
        data[i] = parseInt(stats[i]['share_count']) + parseInt(stats[i]['comment_count']);
    }
    var stat_list = Object.keys(data).map(function(key){return data[key];});
    return Math.max.apply(null, stat_list);
};

HB.getReactionsColor = function(index){
    var red, green, blue;
    var a = [180, 227, 173];
    var b = [248, 227, 152];
    var c = [245, 170, 155];
    var imin = 0.0;
    var imid = 50.0;
    var imax = 100.0;

    if(index >= imin && index <= imid){
        red = Math.round((((b[0] - a[0])/(imid - imin)) * index) + a[0])
        green = Math.round((((b[1] - a[1])/(imid - imin)) * index) + a[1])
        blue = Math.round((((b[2] - a[2])/(imid - imin)) * index) + a[2])
    } else {
        red = Math.round((((c[0] - b[0])/(imax - imid)) * index) + b[0])
        green = Math.round((((c[1] - b[1])/(imax - imid)) * index) + b[1])
        blue = Math.round((((c[2] - b[2])/(imax - imid)) * index) + b[2])

    }
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')'
};