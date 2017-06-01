#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
from urllib.request import urlopen
from urllib.error import HTTPError, URLError

from config import BASEDIR
from util import find_files, get_path, is_valid_url, HeadRequest

bad_links = []

html_files = find_files(get_path([BASEDIR, '_site']), '*.html')

print('Searching for images inside HTML files.')

for html in html_files:

    print(html)

    html_file = open(html, 'r')
    html_content = html_file.read()
    html_file.close()

    html_url_list = re.findall(ur'(http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+)"', html_content)

    for url in html_url_list:

        if is_valid_url(url):

            try:
                response = urlopen(HeadRequest(url))

            except HTTPError as e:
                bad_links.append(url)

            except URLError as e:

                bad_links.append(url)

for i in set(bad_links):
    print(i)
