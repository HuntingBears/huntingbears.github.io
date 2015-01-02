(function($){
    $(function($){

        var rounded_clases = ['#container > header',
                              '#container > header > nav > ul > li > a',
                              '#container > #banner',
                              '#container > #searchbar',
                              '#container > #searchbar > #searchinput',
                              '#container > #searchbar > #search_results',
                              '#content > .pagination > span > a',
                              '#container > footer',
                              '#container > footer > nav > ul > li > a',
                              '#sidebar > ul > li',
                              '#sidebar > ul > .simple > form > #feedburner_mail',
                              '#sidebar > ul > .simple > form > #feedburner_button',
                              '#sidebar > ul > .list > ul > li',
                              '#sidebar > ul > .tags > ul > li > a',
                              '#content > .preview > .wrap > .data',
                              '#content > .post > .text .soundcloud',
                              '#content > .post > .text .youtube',
                              '.figure-100',
                              '.figure-right-40',
                              '.figure-right-30',
                              '.figure-right-20',
                              '.figure-left-40',
                              '.figure-left-30',
                              '.figure-left-20',
                              '#content > .post > .text > p > .picasa > .picasa-album > .picasa-image',
                              '#content > .post > .text > p > .picasa > .picasa-album > .picasa-image > .picasa-image-large',
                              '#content > .meta > .keywords > li > a',
                              '#content > .meta > .relatedposts > li > a',
                              '#modal',
                              '#content > .post > .text > .behance-box-wrap > .behance-box',
                              '#content > .post > .text > .github-box-wrap > .github-box',
                              '#content > .post > .text > .behance-box-wrap > .behance-box > .behance-box-header > .behance-stats > .project-appreciations',
                              '#content > .post > .text > .github-box-wrap > .github-box > .github-box-header > .github-stats > .repo-stars',
                              '#content > .post > .text > .behance-box-wrap > .behance-box > .behance-box-header > .behance-stats > .project-views',
                              '#content > .post > .text > .github-box-wrap > .github-box > .github-box-header > .github-stats > .repo-forks',
                              '#content > .post > .text > .behance-box-wrap > .behance-box > .behance-box-download > .project-explore',
                              '#content > .post > .text > .github-box-wrap > .github-box > .github-box-download > .repo-download',
                              '#content > .post > .text > .github-box-wrap > .github-box > .github-box-download > .repo-explore',
                              'pre',
                              'code'];

        $(rounded_clases.join(', ')).each(function(){
            PIE.attach(this);
        });

    });
}(window.jQuery || window.Zepto));
