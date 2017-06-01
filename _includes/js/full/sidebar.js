(function($){
    $(function($){

        var disqus_threads_listpopular_api_end = 'https://disqus.com/api/3.0/threads/listPopular.jsonp';
        var disqus_threads_listpopular_api_param = $.param({'api_key': disqus_api_key,
                                                            'forum': disqus_shortname,
                                                            'limit': 10,
                                                            'interval': '90d'});

        var disqus_forums_listposts_api_end = 'https://disqus.com/api/3.0/forums/listPosts.jsonp';
        var disqus_forums_listposts_api_param = $.param({'api_key': disqus_api_key,
                                                         'forum': disqus_shortname,
                                                         'limit': 10,
                                                         'related': 'thread'});

        window.parse_poparts = function(results){
            var poparts_html = [];

            for(var i = 0; i < results.response.length; i++){
                poparts_html.push('<li><a href="'+results.response[i].link+'" title="'+results.response[i].title+'">'+results.response[i].title+'</a></li>');
            }

            $('#poparts').html(poparts_html.join(''));
        }

        window.parse_lastcomms = function(results){
            var lastcomms_html = [];

            for(var i = 0; i < results.response.length; i++){
                lastcomms_html.push('<li><a href="'+results.response[i].url+'" title="'+results.response[i].thread.title+'"><strong>'+results.response[i].author.name+'</strong>: '+results.response[i].thread.title+'</a></li>');
            }

            $('#lastcomms').html(lastcomms_html.join(''));
        }

        $.ajax({
            type: 'GET',
            url: disqus_threads_listpopular_api_end+'?'+disqus_threads_listpopular_api_param,
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'parse_poparts',
            timeout: 5000
        });

        $.ajax({
            type: 'GET',
            url: disqus_forums_listposts_api_end+'?'+disqus_forums_listposts_api_param,
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'parse_lastcomms',
            timeout: 5000
        });

        $('#feedburner_form').on('submit', function(event){
            event.preventDefault();
            var feedburner_api_end = 'http://feedburner.google.com/fb/a/mailverify';
            var feedburner_mail = $('#feedburner_mail').val();
            var feedburner_uri = $('#feedburner_uri').val();
            var feedburner_loc = $('#feedburner_loc').val();
            var feedburner_api_call = feedburner_api_end+'?email='+feedburner_mail+'&uri='+feedburner_uri+'&loc='+feedburner_loc;
            window.open(feedburner_api_call, 'Feedburner', popup_options.toString());
        });

    });
}(window.jQuery));
