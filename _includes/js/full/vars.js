HB.page_layout = HB.getMetaContent('dcterms.type');
HB.page_language = HB.getMetaContent('dcterms.language');
HB.page_description = HB.getMetaContent('dcterms.description');
HB.page_url = HB.getMetaContent('dcterms.source');
HB.page_title = HB.getMetaContent('dcterms.title');
HB.page_identifier = HB.getMetaContent('dcterms.identifier');

HB.disqus_shortname = HB.getMetaContent('dcterms.publisher');
HB.disqus_api_key = '71jXpT8VH7lzUNCYHVFYSwfGcBIDHyak9pPSz9stR8GWXrbKFfxdCA1kBBusvClO';

HB.popup_height = 400;
HB.popup_width = 800;
HB.popup_left = (window.screen.width / 2) - ((HB.popup_width / 2) + 10);
HB.popup_top = (window.screen.height / 2) - ((HB.popup_height / 2) + 50);
HB.popup_options = [
	'height=' + HB.popup_height,
	'width=' + HB.popup_width,
	'toolbar=0',
	'location=0',
	'directories=0',
	'status=0',
	'menubar=0',
	'scrollbars=0',
	'resizable=0',
	'copyhistory=0',
	'top=' + HB.popup_top,
	'left=' + HB.popup_left,
	'screenY=' + HB.popup_top,
	'screenX=' + HB.popup_left
];

HB.fuse_options = {
    'id': 'id',
    'shouldSort': true,
    'tokenize': true,
    'threshold': 0.6,
    'location': 0,
    'distance': 100,
    'maxPatternLength': 32,
    'minMatchCharLength': 1,
    'matchAllTokens': true,
    'keys': ['title', 'description', 'keywords']
};

HB.max_reactions = HB.getMaxReactions(HB.social_stats);