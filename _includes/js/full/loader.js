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

        window.disqus_config = function(){
            this.callbacks.onNewComment.push(function(comment){
                ga('send', 'social', 'Disqus', 'Comment', disqus_url);
            });
        };
    }
}]);
