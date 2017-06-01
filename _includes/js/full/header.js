(function($){
    $(function($){

        $('#searchinput').on('keyup', function(event){

            var timer = 0;
            var matches_html = [];
            var self = $(this);
            var search_query = self.val();

            event.preventDefault();
            clearTimeout(timer);

            if(search_query.length > 0){
                timer = setTimeout(function(){
                    for(i in posts_index){
                        for(key in posts_index[i]){

                            var needle = search_query.toString().toLowerCase();
                            var haystack = posts_index[i][key].toString().toLowerCase();

                            if(posts_index[i].hasOwnProperty(key) && haystack.indexOf(needle) >= 0){
                                matches_html.push('<li><a href="'+posts_index[i].url+'" title="'+posts_index[i].description+'" rel="bookmark"><span class="title">'+posts_index[i].title+'</span><span class="description">'+posts_index[i].description+'</span></a></li>');
                                break;
                            }
                        }
                    }

                    $('#search_results_body').html(matches_html.join(''));
                    ga('send', 'pageview', '/?searchinput='+search_query);
                }, 1000);
            }
        });

        $('#container > header > nav > ul > li.search > a').on('click', function(event){
            event.preventDefault();
            $('#searchbar').toggleClass('show');
        });

    });
}(window.jQuery));
