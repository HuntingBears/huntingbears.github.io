if(page_layout == 'page'){

    (function($){
        $(function($){

            var github_boxes_html = [];
            var behance_boxes_html = [];
            var github_boxes = ['tribus', 'aguilas', 'pipsalabim',
                                'dockershelf', 'pypicontents',
                                'luisalejandro.github.io', 'subliminal-view',
                                'odoo-candyshop'];
            var behance_boxes = ['14183751',
                                 '14184715',
                                 '14167967',
                                 '14187447'];

            for(var i = 0; i < github_boxes.length; i++){

                var github_repo_api_end = 'https://api.github.com/repos/'+github_user+'/'+github_boxes[i];

                window.parse_github = function(results){

                    var d = new Date(results.data.pushed_at);
                    var github_pushed_at = ('0' + d.getDate().toString()).substr(-2)  + '/' + ('0' + (d.getMonth() + 1).toString()).substr(-2) + '/' + (d.getFullYear().toString()).substr(2);

                    github_boxes_html.push(
                        "<div class='github-box'>" +
                            "<div class='github-box-header'>" +
                                "<h3>" +
                                    "<a href='" + results.data.html_url + "'>" + results.data.name + "</a>" +
                                "</h3>" +
                                "<div class='github-stats'>" +
                                    "<a class='repo-stars' target='_blank' title='Stars' href='" + results.data.html_url + "/watchers'>" +
                                        "<span class='icon'><span class='sprite'></span></span>" +
                                        "<span class='text'>"+ results.data.watchers +"</span>" +
                                    "</a>" +
                                    "<a class='repo-forks' target='_blank' title='Forks' href='" + results.data.html_url + "/network'>" +
                                        "<span class='icon'><span class='sprite'></span></span>" +
                                        "<span class='text'>"+ results.data.forks +"</span>" +
                                    "</a>" +
                                "</div>" +
                            "</div>" +
                            "<div class='github-box-content'>" +
                                "<p>" + results.data.description + " &mdash; <a href='" + results.data.html_url + "#readme'>Read more</a></p>" +
                            "</div>" +
                            "<div class='github-box-download'>" +
                                "<p class='repo-update'>Last active " + github_pushed_at + "</p>" +
                                "<a class='repo-download' target='_blank' title='Download' href='" + results.data.html_url + "/zipball/master'>" +
                                    "<span class='icon'><span class='sprite'></span></span>" +
                                    "<span class='text'>Download</span>" +
                                "</a>" +
                                "<a class='repo-explore' target='_blank' title='Explore' href='" + results.data.html_url + "'>" +
                                    "<span class='icon'><span class='sprite'></span></span>" +
                                    "<span class='text'>Explore</span>" +
                                "</a>" +
                            "</div>" +
                        "</div>"
                    );

                    if(github_boxes_html.length == github_boxes.length){
                        $('#github-boxes').html(github_boxes_html.join(''));
                    }
                }

                $.ajax({
                    type: 'GET',
                    url: github_repo_api_end,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'parse_github',
                    timeout: 5000
                });

            }

            for(var i = 0; i < behance_boxes.length; i++){

                var behance_project_api_end = 'http://www.behance.net/v2/projects/'+behance_boxes[i];
                var behance_project_api_param = $.param({'api_key': behance_api_key});

                window.parse_behance = function(results){

                    var modified_on_date = new Date(parseInt(results.project.modified_on+'000'));
                    var d = new Date(modified_on_date);
                    var behance_modified_on_date = ('0' + d.getDate().toString()).substr(-2)  + '/' + ('0' + (d.getMonth() + 1).toString()).substr(-2) + '/' + (d.getFullYear().toString()).substr(2);

                    behance_boxes_html.push(
                        "<div class='behance-box'>" +
                            "<div class='behance-box-header'>" +
                                "<div class='behance-stats'>" +
                                    "<a class='project-appreciations' title='Appreciations' href='" + results.project.owners[0].url + "/stats'>" +
                                        "<span class='icon'><span class='sprite'></span></span>" +
                                        "<span class='text'>"+ results.project.stats.appreciations +"</span>" +
                                    "</a>" +
                                    "<a class='project-views' title='Views' href='" + results.project.url + "'>" +
                                        "<span class='icon'><span class='sprite'></span></span>" +
                                        "<span class='text'>"+ results.project.stats.views +"</span>" +
                                    "</a>" +
                                "</div>" +
                            "</div>" +
                            "<div class='behance-box-content' style='background-image: url(" + results.project.covers["404"] + ")'></div>" +
                            "<div class='behance-box-download'>" +
                                "<h3>" + results.project.name + "</h3>" +
                                "<p class='project-update'>Last active " + behance_modified_on_date + "</p>" +
                                "<a class='project-explore' title='See on Behance' href='" + results.project.url + "'>" +
                                    "<span class='icon'><span class='sprite'></span></span>" +
                                       "<span class='text'>See on Behance</span>" +
                            "</div>" +
                        "</div>"
                    );

                    if(behance_boxes_html.length == behance_boxes.length){
                        $('#behance-boxes').html(behance_boxes_html.join(''));
                    }
                }

                $.ajax({
                    type: 'GET',
                    url: behance_project_api_end+'?'+behance_project_api_param,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'parse_behance',
                    timeout: 5000
                });

            }

        });
    }(window.jQuery));

}
