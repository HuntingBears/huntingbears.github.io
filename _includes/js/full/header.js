(function($){
    $(function($){

        var timer = 0;
        var matches = [];

        $('#container > #searchbar > #searchinput').on('keyup', function(event){

            var self = $(this);
            var search_query = self.val();

            event.preventDefault();
            clearTimeout(timer);
            $('#search_results_body').children().remove();

            if(search_query.length > 0){
                timer = setTimeout(function(){
                    ga('send', 'pageview', '/?searchinput='+search_query);
                    for(i in posts_index){
                        for(key in posts_index[i]){

                            var needle = search_query.toString().toLowerCase();
                            var haystack = posts_index[i][key].toString().toLowerCase();

                            if(posts_index[i].hasOwnProperty(key) && haystack.indexOf(needle) >= 0){
                                $('#search_results_body').append('<li><a href="'+posts_index[i].url+'" title="'+posts_index[i].description+'" rel="bookmark"><span class="title">'+posts_index[i].title+'</span><span class="description">'+posts_index[i].description+'</span></a></li>');
                                break;
                            }
                        }
                    }
                }, 1000);
            }
        });

        $('#container > header > nav > ul > li.search > a').on('click', function(event){
            event.preventDefault();
            $('#container > #searchbar').toggleClass('show');
        });

    });
}(window.jQuery || window.Zepto));
