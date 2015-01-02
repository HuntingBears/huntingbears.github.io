if(page_layout == 'page'){

    (function($){
        $(function($){

            $('.github-box-wrap').each(function(index, element){

                var self = $(element);
                var github_repo_api_end = 'https://api.github.com/repos/'+self.attr('data-repo');

                window.parse_github = function(results){
                    self.append("<div class='github-box'>" +
                                    "<div class='github-box-header'>" +
                                        "<h3>" +
                                            "<a href='" + results.data.html_url + "'>" + results.data.name + "</a>" +
                                        "</h3>" +
                                        "<div class='github-stats'>" +
                                            "<a class='repo-stars' title='Stars' href='" + results.data.html_url + "/watchers'>" +
                                                "<span class='fa fa-star'></span>" +
                                                "<span class='text'>"+ results.data.watchers +"</span>" +
                                            "</a>" +
                                            "<a class='repo-forks' title='Forks' href='" + results.data.html_url + "/network'>" +
                                                "<span class='fa fa-code-fork'></span>" +
                                                "<span class='text'>"+ results.data.forks +"</span>" +
                                            "</a>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='github-box-content'>" +
                                        "<p>" + results.data.description + " &mdash; <a href='" + results.data.html_url + "#readme'>Leer más ...</a></p>" +
                                    "</div>" +
                                    "<div class='github-box-download'>" +
                                        "<p class='repo-update'>Última actividad " + results.data.pushed_at + "</p>" +
                                        "<a class='repo-download' title='Descargar' href='" + results.data.html_url + "/zipball/master'>" +
                                            "<span class='fa fa-download'></span>" +
                                            "<span class='text'>Descargar</span>" +
                                        "</a>" +
                                        "<a class='repo-explore' title='Explorar' href='" + results.data.html_url + "'>" +
                                            "<span class='fa fa-folder-open'></span>" +
                                            "<span class='text'>Explorar</span>" +
                                        "</a>" +
                                    "</div>" +
                                "</div>");
                }

                $.ajax({
                    type: 'GET',
                    url: github_repo_api_end,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'parse_github',
                    timeout: 5000
                });

            });

            $('.behance-box-wrap').each(function(index, element){

                var self = $(element);
                var behance_project_api_end = 'http://www.behance.net/v2/projects/'+self.attr('data-project');
                var behance_project_api_param = $.param({'api_key': behance_api_key});

                window.parse_behance = function(results){
                    var modified_on_date = new Date(parseInt(results.project.modified_on+'000'));
                    self.append("<div class='behance-box'>" +
                                    "<div class='behance-box-header'>" +
                                        "<div class='behance-stats'>" +
                                            "<a class='project-appreciations' title='Appreciations' href='" + results.project.owners[0].url + "/stats'>" +
                                                "<span class='fa fa-heart'></span>" +
                                                "<span class='text'>"+ results.project.stats.appreciations +"</span>" +
                                            "</a>" +
                                            "<a class='project-views' title='Views' href='" + results.project.url + "'>" +
                                                "<span class='fa fa-eye'></span>" +
                                                "<span class='text'>"+ results.project.stats.views +"</span>" +
                                            "</a>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='behance-box-content' style='background-image: url(" + results.project.covers["404"] + ")'></div>" +
                                    "<div class='behance-box-download'>" +
                                        "<h3>" + results.project.name + "</h3>" +
                                        "<p class='project-update'>Última actividad " + moment(modified_on_date.toISOString()).lang(page_language).fromNow() + "</p>" +
                                        "<a class='project-explore' title='Ver en Behance' href='" + results.project.url + "'>" +
                                            "<span class='fa fa-folder-open'></span>" +
                                               "<span class='text'>Ver en Behance</span>" +
                                    "</div>" +
                                "</div>");
                }

                $.ajax({
                    type: 'GET',
                    url: behance_project_api_end+'?'+behance_project_api_param,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'parse_behance',
                    timeout: 5000
                });

            });

        });
    }(window.jQuery || window.Zepto));

}
