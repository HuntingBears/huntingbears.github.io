(function($){
    $(function($){

        $('#searchbar > .search_input_container > .search_input').on('keyup', function(event){

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
                            var purl = posts_index[i].url
                            var pdesc = posts_index[i].description
                            var ptitle = posts_index[i].title
                            var pimage = posts_index[i].image

                            if(posts_index[i].hasOwnProperty(key) && haystack.indexOf(needle) >= 0){
                                matches_html.push(
                                    '<li>'+
                                        '<a href="'+purl+'" title="'+pdesc+' (opens new window)" rel="bookmark" target="_blank">'+
                                            '<span class="image" style="background-image: url('+pimage+');"></span>'+
                                            '<span class="title">'+ptitle+'</span>'+
                                            '<span class="description">'+pdesc+'</span>'+
                                            '<span class="description">'+pdesc+'</span>'+
                                        '</a>'+
                                    '</li>'
                                );
                                break;
                            }
                        }
                    }

                    $('#searchbar > .search_results > .search_results_body').html(matches_html.join(''));
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
