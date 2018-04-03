(function($){
    $(function($){

        HB.search_button = $('#container > header > nav > ul > li.search > a');
        HB.search_input = $('#search_dialog > .search_input');
        HB.search_dialog = $('#search_dialog');
        HB.search_dialog_info = $('#search_dialog > .info');
        HB.search_results_body = $('#search_dialog > .search_results > .search_results_body');

        HB.login_button = $('#container > header > nav > ul > li.login > a');
        HB.login_dialog = $('#login_dialog');

        HB.search_button.on('click', function(event){
            event.preventDefault();

            if(!$('#index').length){
                HB.index_script_el = HB.loadIndex();
                HB.index_script_el.onload = function(){
                    HB.fuse_search = new Fuse(HB.fuseList(HB.index), HB.fuse_options);
                    HB.search_input.prop('disabled', false)
                        .val('')
                        .trigger('keyup')
                        .trigger('focus');
                };
            }

            if(HB.login_button.hasClass('active')){
                HB.login_button.removeClass('active');
            }

            if(HB.login_dialog.hasClass('show')){
                HB.login_dialog.removeClass('show');
            }

            HB.search_button.toggleClass('active');
            HB.search_dialog.toggleClass('show');

            HB.search_input.val('')
                .trigger('keyup')
                .trigger('focus');
            
            event.stopPropagation();
        });
        
        HB.search_dialog.on('click', function(event){
            event.stopPropagation();
        });


        HB.login_button.on('click', function(event){
            event.preventDefault();

            if(HB.search_button.hasClass('active')){
                HB.search_button.removeClass('active');
            }

            if(HB.search_dialog.hasClass('show')){
                HB.search_dialog.removeClass('show');
                HB.search_input.val('')
                    .trigger('keyup');
            }

            HB.login_button.toggleClass('active');
            HB.login_dialog.toggleClass('show');

            event.stopPropagation();
        });
        
        HB.login_dialog.on('click', function(event){
            event.stopPropagation();
        });

        $(document).on('click', function(event){
            if(HB.login_button.hasClass('active')){
                HB.login_button.removeClass('active');
            }

            if(HB.login_dialog.hasClass('show')){
                HB.login_dialog.removeClass('show');
            }

            if(HB.search_button.hasClass('active')){
                HB.search_button.removeClass('active');
            }

            if(HB.search_dialog.hasClass('show')){
                HB.search_dialog.removeClass('show');
                HB.search_input.val('')
                    .trigger('keyup');
            }
        });

        HB.search_input.on('keyup', function(event){
            event.preventDefault();

            var timer = 0;
            var matches_html = [];
            var search_query = HB.search_input.val();
            var searchables = ['title', 'description', 'keywords'];

            HB.searchDelay(function(){
                if(search_query.length){
                    var search_result = HB.fuse_search.search(search_query);
                    for(var i = 0; i < search_result.length; i++){

                        var pid = search_result[i]
                        var purl = HB.index[pid].url;
                        var pdesc = HB.index[pid].description;
                        var ptitle = HB.index[pid].title;
                        var pimage = HB.index[pid].image;
                        var pdate = moment(HB.index[pid].date).fromNow();

                        matches_html.push(
                            '<li>'+
                                '<a href="'+purl+'" title="'+pdesc+' (opens new window)" rel="bookmark" target="_blank">'+
                                    '<span class="image" style="background-image: url('+pimage+');">'+
                                        '<span class="triangle"></span>'+
                                    '</span>'+
                                    '<span class="title">'+ptitle+'</span>'+
                                    '<span class="description">'+pdesc+'</span>'+
                                    '<span class="description">Published '+pdate+'.</span>'+
                                '</a>'+
                            '</li>'
                        );
                    }

                    if(matches_html.length){
                        HB.search_dialog_info.html(search_result.length+' results found for "'+search_query+'".');
                        HB.search_results_body.html(matches_html.join(''));
                    } else {
                        HB.search_dialog_info.html('No results found for "'+search_query+'".');
                        HB.search_results_body.html('');
                    }

                    ga('send', 'pageview', '/?searchinput='+search_query);

                } else {
                    HB.search_dialog_info.html('');
                    HB.search_results_body.html('');
                }
            }, 500);
        });

    });
}(window.jQuery));
