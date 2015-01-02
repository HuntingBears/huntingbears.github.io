window.preloadList = function(legacy, zepto, disqus){
    var common_assets = ['http://blog-luisalejandro.rhcloud.com/static/css/styles.min.css',
                         'css!http://fonts.googleapis.com/css?family=Open+Sans:300',
                         'http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                         'http://www.google-analytics.com/analytics.js'];
    var yep_zepto_assets = ['http://cdnjs.cloudflare.com/ajax/libs/zepto/1.1.4/zepto.min.js'];
    var nope_zepto_assets = ['http://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min.js'];
    var yep_legacy_assets = ['http://blog-luisalejandro.rhcloud.com/static/css/legacy.min.css',
                             'http://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js',
                             'ie!http://cdn.jsdelivr.net/css3pie/1.0.0/PIE.js',
                             'ie!http://blog-luisalejandro.rhcloud.com/static/js/legacy.min.js'];
    var nope_legacy_assets = ['http://cdnjs.cloudflare.com/ajax/libs/svg.js/1.0.1/svg.min.js',
                              'http://blog-luisalejandro.rhcloud.com/static/js/banner.min.js'];
    var yep_disqus_assets = ['http://' + disqus_shortname + '.disqus.com/embed.js'];
    var last_assets = ['http://blog-luisalejandro.rhcloud.com/static/js/index.min.js',
                       'http://blog-luisalejandro.rhcloud.com/static/js/scripts.min.js'];

    if (zepto) {
       common_assets = common_assets.concat(yep_zepto_assets);
    } else {
       common_assets = common_assets.concat(nope_zepto_assets);
    };

    if (legacy) {
       common_assets = common_assets.concat(yep_legacy_assets);
    } else {
       common_assets = common_assets.concat(nope_legacy_assets);
    };

    if (disqus) {
       common_assets = common_assets.concat(yep_disqus_assets);
    };

    return common_assets.concat(last_assets);
}

var is_legacy_browser = (bowser.msie && bowser.version < 10) ||
                        (bowser.firefox && bowser.version < 16) ||
                        (bowser.chrome && bowser.version < 26) ||
                        (bowser.opera && bowser.version < 12.1) ||
                        (bowser.android && bowser.version < 4.4) ||
                        (bowser.ios && bowser.version < 7.1) ||
                        (bowser.safari && bowser.version < 6.1) ||
                        !Modernizr.fontface || !Modernizr.backgroundsize ||
                        !Modernizr.borderradius || !Modernizr.boxshadow ||
                        !Modernizr.opacity || !Modernizr.rgba ||
                        !Modernizr.textshadow || !Modernizr.cssgradients ||
                        !Modernizr.csstransitions || !Modernizr.svg ||
                        !Modernizr.inlinesvg || !Modernizr.mq('only all');
var is_zepto_capable = '__proto__' in {} && !is_legacy_browser;
var needs_disqus = (page_layout == 'post') && !(bowser.msie && bowser.version < 8);
var asset_preload_list = preloadList(is_legacy_browser,
                                     is_zepto_capable,
                                     needs_disqus);

Modernizr.load([{
    'load': asset_preload_list,
    'callback': function(url, result, key){
        console.log('PRELOADING:', url, result, key);
    },
    'complete': function(){

        ga('create', 'UA-46768223-1', 'huntingbears.com.ve');
        ga('send', 'pageview');

        (function($){
            $(function($){
                $('.adsbygoogle').each(function(index, element){
                    window.adsbygoogle.push({});
                });
            });
        }(window.jQuery || window.Zepto));

        window.disqus_config = function(){
            this.callbacks.onNewComment.push(function(comment){
                ga('send', 'social', 'Disqus', 'Comment', disqus_url);
            });
        };
    }
}]);
