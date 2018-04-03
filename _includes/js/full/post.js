// if(page_layout == 'post'){

//     (function($){
//         $(function($){

//             $('#content > .post > .social > .twitter > a').on('click', function(event){
//                 event.preventDefault();
//                 window.open($(this).attr('href'), 'Twitter', popup_options.toString());
//                 ga('send', 'social', 'Twitter', 'Tweet', disqus_url);
//             });

//             $('#content > .post > .social > .facebook > a').on('click', function(event){
//                 event.preventDefault();
//                 window.open($(this).attr('href'), 'Facebook', popup_options.toString());
//                 ga('send', 'social', 'Facebook', 'Share', disqus_url);
//             });

//             $('#content > .post > .social > .googleplus > a').on('click', function(event){
//                 event.preventDefault();
//                 window.open($(this).attr('href'), 'Google+', popup_options.toString());
//                 ga('send', 'social', 'Google+', 'Share', disqus_url);
//             });

//             $('#content > .post > .social > .pinterest > a').on('click', function(event){
//                 event.preventDefault();
//                 window.open($(this).attr('href'), 'Pinterest', popup_options.toString());
//                 ga('send', 'social', 'Pinterest', 'Share', disqus_url);
//             });

//             $('#content > .post > .social > .tumblr > a').on('click', function(event){
//                 event.preventDefault();
//                 window.open($(this).attr('href'), 'Tumblr', popup_options.toString());
//                 ga('send', 'social', 'Tumblr', 'Share', disqus_url);
//             });

//             $('#content > .post > .social > .linkedin > a').on('click', function(event){
//                 event.preventDefault();
//                 window.open($(this).attr('href'), 'LinkedIn', popup_options.toString());
//                 ga('send', 'social', 'LinkedIn', 'Share', disqus_url);
//             });

//             $('.figure').each(function(index, element){
//                 var self = $(element);
//                 var figure_link = $('<a />', {'href': self.attr('data-figure-href'), 'title': page_description});
//                 var figure_container = $('<figure />', {'class': 'figure-container'});
//                 var figure_image = $('<img />', {'class': 'image', 'alt': page_description, 'src': self.attr('data-figure-src')});
//                 var figure_caption = $('<caption />', {'class': 'caption'}).text(page_description);
//                 figure_container.append(figure_image);
//                 figure_container.append(figure_caption);
//                 figure_link.append(figure_container);
//                 self.append(figure_link);
//             });

//             $('.youtube').each(function(index, element){
//                 var self = $(element);
//                 var youtube_api_end = 'https://www.youtube.com/embed/'+self.attr('data-youtube-id');
//                 var youtube_api_param = $.param({'rel': 0,
//                                                  'showinfo': 0,
//                                                  'theme': 'light',
//                                                  'iv_load_policy': 3,
//                                                  'autohide': 1,
//                                                  'modestbranding': 1});
//                 self.append($('<iframe />', {'id': 'youtube-player-'+index,
//                                              'type': 'text/html',
//                                              'src': youtube_api_end+'?'+youtube_api_param,
//                                              'allowfullscreen': 1,
//                                              'frameborder': 0}));
//             });

//             $('.soundcloud').each(function(index, element){
//                 var self = $(element);
//                 var soundcloud_api_end = 'https://w.soundcloud.com/player/';
//                 var soundcloud_api_param = $.param({'url': 'https://api.soundcloud.com/tracks/'+self.attr('data-soundcloud-id'),
//                                                     'color': 'ff5500',
//                                                     'auto_play': 'false',
//                                                     'hide_related': 'false',
//                                                     'show_artwork': 'true'});
//                 self.append($('<iframe />', {'id': 'soundcloud-widget-'+index,
//                                              'type': 'text/html',
//                                              'src': soundcloud_api_end+'?'+soundcloud_api_param,
//                                              'allowfullscreen': 0,
//                                              'scrolling': 0,
//                                              'frameborder': 0}));
//             });

//             var n_compartidos = $('.n_compartidos');
//             var n_comentarios = $('.n_comentarios');

//             n_compartidos.first().text(posts_index[n_compartidos.attr('data-ident')]['share_count']);
//             n_comentarios.first().text(posts_index[n_comentarios.attr('data-ident')]['comment_count']);

//             var related_posts_html = [];
//             var related_posts_list = [];
//             var relatedposts = $('#relatedposts');
//             var post_keywords = posts_index[relatedposts.attr('data-ident')]['keywords'].split(', ');

//             for(i in posts_index){
//                 for(j in post_keywords){
//                     var needle = post_keywords[j].toString().toLowerCase();
//                     var haystack = posts_index[i]['keywords'].toString().toLowerCase();
//                     if(haystack.indexOf(needle) >= 0 && related_posts_list.indexOf(i) == -1){
//                         related_posts_list.push(i);
//                     }
//                 }
//             }

//             var shuffled_posts = shuffleArray(related_posts_list).slice(0, 4);

//             for(var k = 0; k < shuffled_posts.length; k++){
//                 related_posts_html.push('<li><a href="'+posts_index[shuffled_posts[k]].url+'" title="'+posts_index[shuffled_posts[k]].description+'" rel="bookmark"><span class="thumbnail" style="background-image: url('+posts_index[shuffled_posts[k]].image+');"></span><span class="title">'+posts_index[shuffled_posts[k]].title+'</span></a></li>');
//             }

//             relatedposts.html(related_posts_html.join(''));

//         });
//     }(window.jQuery));

//     $(window).on('load', function(){

//         $('a[href]').filter(function(index){
//             return /\.(jpg|png|jpeg|gif|svg)$/i.test(this.href);
//         }).each(function(index, element){
//             var self = $(element);

//             self.on('click', function(event){
//                 event.preventDefault();
//                 $('#modal').css({'background-image': "url('"+self.attr('href')+"')"});
//                 $('#modal-container').css({'display': 'block'});
//             });

//             $('#modal-close').on('click', function(event){
//                 event.preventDefault();
//                 $('#modal-container').css({'display': 'none'});
//             });

//             $('#modal-overlay').on('click', function(event){
//                 event.preventDefault();
//                 $('#modal-container').css({'display': 'none'});
//             });

//             $('#modal-vertical-offset').on('click', function(event){
//                 event.preventDefault();
//                 $('#modal-container').css({'display': 'none'});
//             });
//         });

//     });

// }
