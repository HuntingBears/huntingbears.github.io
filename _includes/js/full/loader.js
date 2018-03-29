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

window.preloadList = function(){

    var common_assets = ['{{ site.url }}/static/css/styles.min.css',
                         '{{ site.url }}/static/js/scripts.min.js'];
    var third_party_scripts = ['http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                               'http://www.google-analytics.com/analytics.js'];

    if (page_layout == 'post') {
        third_party_scripts.push('http://' + disqus_shortname + '.disqus.com/embed.js');
    }

    return common_assets.concat(third_party_scripts);
}

window.page_layout = getMetaContent('dcterms.type');
window.page_language = getMetaContent('dcterms.language');
window.page_description = getMetaContent('dcterms.description');
window.disqus_url = getMetaContent('dcterms.source');
window.disqus_title = getMetaContent('dcterms.title');
window.disqus_identifier = getMetaContent('dcterms.identifier');
window.disqus_shortname = getMetaContent('dcterms.publisher');

window.disqus_api_key = '71jXpT8VH7lzUNCYHVFYSwfGcBIDHyak9pPSz9stR8GWXrbKFfxdCA1kBBusvClO';

window.popup_height = 400;
window.popup_width = 800;
window.popup_left = (window.screen.width/2) - ((popup_width/2) + 10);
window.popup_top = (window.screen.height/2) - ((popup_height/2) + 50);
window.popup_options = [
                        'height='+popup_height,
                        'width='+popup_width,
                        'toolbar=0',
                        'location=0',
                        'directories=0',
                        'status=0',
                        'menubar=0',
                        'scrollbars=0',
                        'resizable=0',
                        'copyhistory=0',
                        'top='+popup_top,
                        'left='+popup_left,
                        'screenY='+popup_top,
                        'screenX='+popup_left
                    ];

window.GoogleAnalyticsObject = 'ga';
window.ga = function(){window.ga.q.push(arguments)};
window.ga.l = 1 * new Date();
window.ga.q = [];

window.adsbygoogle = [];

window.asset_preload_list = preloadList();

Modernizr.load([{
    'load': asset_preload_list,
    'complete': function(){

        ga('create', 'UA-46768223-1', 'auto');
        ga('send', 'pageview');

        var ads = document.getElementsByTagName('ins');
        for(var i = 0; i < ads.length; i++){
            if(ads[i].getAttribute('class') == 'adsbygoogle'){
                window.adsbygoogle.push({});
            }
        }

        if (page_layout == 'post') {
            window.disqus_config = function(){
                this.callbacks.onNewComment.push(function(comment){
                    ga('send', 'social', 'Disqus', 'Comment', disqus_url);
                });
            };
        }
    }
}]);
