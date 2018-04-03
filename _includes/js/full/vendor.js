window.GoogleAnalyticsObject = 'ga';
window.ga = function(){window.ga.q.push(arguments)};
window.ga.l = (new Date()).getTime();
window.ga.q = [];

window.adsbygoogle = [];

window.disqus_config = function(){
    this.callbacks.onNewComment.push(function(comment){
        ga('send', 'social', 'Disqus', 'Comment', HB.disqus_url);
    });
};