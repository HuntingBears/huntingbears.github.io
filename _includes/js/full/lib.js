if(!Array.prototype.indexOf){

    Array.prototype.indexOf = function(searchElement, fromIndex){

        if(this === undefined || this === null){
            throw new TypeError('"this" is null or not defined');
        }

        var length = this.length >>> 0;

        fromIndex = +fromIndex || 0;

        if(Math.abs(fromIndex) === Infinity){
            fromIndex = 0;
        }

        if(fromIndex < 0){
            fromIndex += length;
            if(fromIndex < 0){
                fromIndex = 0;
            }
        }

        for(;fromIndex < length; fromIndex++){
            if(this[fromIndex] === searchElement){
                return fromIndex;
            }
        }

        return -1;
    };
}

window.getMetaContent = function(property){
    var metas = document.getElementsByTagName('meta');

    for (i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') == property) {
            return metas[i].getAttribute('content');
        }
    }

    return "";
};

window.shuffleArray = function(arr){
    for (var i, tmp, n = arr.length; n; i = Math.floor(Math.random() * n), tmp = arr[--n], arr[n] = arr[i], arr[i] = tmp);
    return arr;
};

window.preloadList = function(legacy, disqus){

    var common_assets = [];
    var legacy_assets = ['http://huntingbears.com.ve/static/css/legacy.min.css',
                         'http://huntingbears.com.ve/static/js/legacy.min.js'];
    var nonlegacy_assets = ['http://huntingbears.com.ve/static/css/styles.min.css',
                            'http://huntingbears.com.ve/static/js/scripts.min.js'];
    var third_party_scripts = ['http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                               'http://www.google-analytics.com/analytics.js'];

    if (disqus) {
        third_party_scripts.push('http://' + disqus_shortname + '.disqus.com/embed.js');
    }

    if (legacy) {
        common_assets = common_assets.concat(legacy_assets);
    } else {
        common_assets = common_assets.concat(nonlegacy_assets);
    }

    return common_assets.concat(third_party_scripts);
}
