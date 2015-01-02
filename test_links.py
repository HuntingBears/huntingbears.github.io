#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

import re
import urllib2

from tools import BASEDIR
from tools.util import find_files, get_path, is_valid_url, HeadRequest

bad_links = []

html_files = find_files(get_path([BASEDIR, '_site']), '*.html')

print 'Searching for images inside HTML files.'

for html in html_files:

    print html

    html_file = open(html, 'r')
    html_content = html_file.read()
    html_file.close()

    html_url_list = re.findall(ur'(http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+)"', html_content)

    for url in html_url_list:

        if is_valid_url(url):

            try:
                response = urllib2.urlopen(HeadRequest(url))

            except urllib2.HTTPError, e:
                bad_links.append(url)

            except urllib2.URLError, e:

                bad_links.append(url)

for i in set(bad_links):
    print i
