window.page_layout = getMetaContent('dcterms.type');
window.page_language = getMetaContent('dcterms.language');
window.page_description = getMetaContent('dcterms.description');
window.disqus_url = getMetaContent('dcterms.source');
window.disqus_title = getMetaContent('dcterms.title');
window.disqus_identifier = getMetaContent('dcterms.identifier');
window.disqus_shortname = getMetaContent('dcterms.publisher');

window.github_user = 'LuisAlejandro';
window.behance_api_key = 'S8Rm0bXUVyx3dSHrmNMGnEDm8VO1t50M';
window.disqus_api_key = '71jXpT8VH7lzUNCYHVFYSwfGcBIDHyak9pPSz9stR8GWXrbKFfxdCA1kBBusvClO';

window.popup_height = 400;
window.popup_width = 800;
window.popup_left = (window.screen.width/2) - ((popup_width/2) + 10);
window.popup_top = (window.screen.height/2) - ((popup_height/2) + 50);
window.popup_options = [
                        'height='+popup_height,
                        'width='+popup_width,
                        'toolbar=0',
                        'location=0',
                        'directories=0',
                        'status=0',
                        'menubar=0',
                        'scrollbars=0',
                        'resizable=0',
                        'copyhistory=0',
                        'top='+popup_top,
                        'left='+popup_left,
                        'screenY='+popup_top,
                        'screenX='+popup_left
                    ];

window.GoogleAnalyticsObject = 'ga';
window.ga = function(){window.ga.q.push(arguments)};
window.ga.l = 1 * new Date();
window.ga.q = [];

window.adsbygoogle = [];

var is_legacy_browser = (bowser.msie && bowser.version < 10) ||
                        (bowser.firefox && bowser.version < 16) ||
                        (bowser.chrome && bowser.version < 26) ||
                        (bowser.opera && bowser.version < 12.1) ||
                        (bowser.android && bowser.version < 4.4) ||
                        (bowser.ios && bowser.version < 7.1) ||
                        (bowser.safari && bowser.version < 6.1) ||
                        !Modernizr.fontface || !Modernizr.backgroundsize ||
                        !Modernizr.borderradius || !Modernizr.boxshadow ||
                        !Modernizr.opacity || !Modernizr.rgba ||
                        !Modernizr.textshadow || !Modernizr.cssgradients ||
                        !Modernizr.csstransitions || !Modernizr.svg ||
                        !Modernizr.inlinesvg || !Modernizr.mq('only all');
var needs_disqus = (page_layout == 'post') && !(bowser.msie && bowser.version < 8);
var asset_preload_list = preloadList(is_legacy_browser, needs_disqus);
