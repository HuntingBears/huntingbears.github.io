if(HB.page_layout == 'frontpage'){

    (function($){
        $(function($){

            HB.share_buttons = $('#content > .preview > .bg > ul.socialbar > .share > button');
            HB.share_buttons = HB.share_buttons.add('#featured > article > .bg > ul.socialbar > .share > button');

            HB.reactions = $('#content > .preview > .bg > ul.socialbar > .reactions > span');
            HB.reactions = HB.reactions.add('#featured > article > .bg > ul.socialbar > .reactions > span');

            HB.article_dates = $('#content > .preview > .data > a > .description > time.datetime');
            HB.article_dates = HB.article_dates.add('#featured > article > .data > a > .description > time.datetime');

            HB.reactions.each(function(index, element){
                var self = $(element);
                var pid = self.attr('data-ident');
                var comment_count = parseInt(HB.social_stats[pid]['comment_count']);
                var share_count = parseInt(HB.social_stats[pid]['share_count']);
                var reactions_count = comment_count + share_count;
                var reactions_index = reactions_count * 100 / HB.max_reactions;
                var reactions_color = HB.getReactionsColor(reactions_index);
                self.css('background-color', reactions_color)
                self.text(reactions_count + ' Reactions');
            });

            HB.article_dates.each(function(index, element){
                var self = $(element);
                self.text(moment(self.attr('datetime')).fromNow());
            });

            HB.share_buttons.on('click', function(event){
                event.preventDefault();

                var self = $(this);
                var pid = self.attr('data-ident');
                var share_dialog = $('#post-' + pid + ' > .bg > .socialpop');
                var post_bg = $('#post-' + pid + ' > .bg');

                self.toggleClass('active');
                share_dialog.toggleClass('show');
                post_bg.toggleClass('dark');
            });

            // var twitter_buttons = ;

            // $('#content > .preview > .social > .twitter > a').on('click', function(event){
            //     event.preventDefault();
            //     window.open($(this).attr('href'), 'Twitter', popup_options.toString());
            //     ga('send', 'social', 'Twitter', 'Tweet', disqus_url);
            // });

            // $('#content > .preview > .social > .facebook > a').on('click', function(event){
            //     event.preventDefault();
            //     window.open($(this).attr('href'), 'Facebook', popup_options.toString());
            //     ga('send', 'social', 'Facebook', 'Share', disqus_url);
            // });

            // $('#content > .preview > .social > .googleplus > a').on('click', function(event){
            //     event.preventDefault();
            //     window.open($(this).attr('href'), 'Google+', popup_options.toString());
            //     ga('send', 'social', 'Google+', 'Share', disqus_url);
            // });

            // $('.shares > .qty').each(function(index, element){
            //     var self = $(element);
            //     self.text(posts_index[self.attr('data-ident')]['share_count']);
            // });

            // $('.comments > .qty').each(function(index, element){
            //     var self = $(element);
            //     self.text(posts_index[self.attr('data-ident')]['comment_count']);
            // });

        });
    }(window.jQuery));
}
