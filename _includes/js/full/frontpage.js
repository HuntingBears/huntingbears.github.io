if(page_layout == 'frontpage'){

    (function($){
        $(function($){

            $('#content > .preview > .social > .twitter > a').on('click', function(event){
                event.preventDefault();
                window.open($(this).attr('href'), 'Twitter', popup_options.toString());
                ga('send', 'social', 'Twitter', 'Tweet', disqus_url);
            });

            $('#content > .preview > .social > .facebook > a').on('click', function(event){
                event.preventDefault();
                window.open($(this).attr('href'), 'Facebook', popup_options.toString());
                ga('send', 'social', 'Facebook', 'Share', disqus_url);
            });

            $('#content > .preview > .social > .googleplus > a').on('click', function(event){
                event.preventDefault();
                window.open($(this).attr('href'), 'Google+', popup_options.toString());
                ga('send', 'social', 'Google+', 'Share', disqus_url);
            });

            $('.n_compartidos').each(function(index, element){

                var self = $(element);

                for(i in posts_index){
                    if(i == self.attr('data-ident')){
                        self.text(posts_index[i]['share_count']);
                    }
                }
            });

            $('.n_comentarios').each(function(index, element){

                var self = $(element);

                for(i in posts_index){
                    if(i == self.attr('data-ident')){
                        self.text(posts_index[i]['comment_count']);
                    }
                }
            });

        });
    }(window.jQuery || window.Zepto));
}
