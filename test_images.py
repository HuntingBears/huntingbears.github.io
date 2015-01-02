#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

import os
import re
import yaml
import urllib2
import urlparse
import hashlib
from wand.image import Image

from tools import BASEDIR
from tools.util import find_files, get_path, is_valid_url, HeadRequest

bad_links = []
img_files_valid_ext = ['png', 'jpeg', 'jpg']
md_files = find_files(get_path([BASEDIR]), '*.md')

print 'Searching for images inside HTML files.'

for md in md_files:

    print md

    md_file = open(md, 'r')
    md_content = md_file.read()
    md_file.close()

    md_yaml_regex = re.compile(ur'(?s)(---.*---)$', re.MULTILINE)
    md_yaml_string = re.match(md_yaml_regex, md_content).group(0).replace('---', '')
    md_yaml_data = yaml.load(md_yaml_string)

    md_url_list = re.findall(ur'\[[^]]+]\(\s*(http[s]?://[^)]+)\s*\)', md_content)
    md_url_list = md_url_list + [md_yaml_data['image']]
    md_url_list = md_url_list + re.findall(ur'"(http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+)"', md_content)

    for url in md_url_list:

        if is_valid_url(url):

            urlp = urlparse.urlparse(url)
            ext = os.path.splitext(urlp.path)[1].lower().strip('.')

            if ext in img_files_valid_ext and urlp.netloc == 'huntingbears.com.ve':

                try:
                    response = urllib2.urlopen(HeadRequest(url))

                except urllib2.HTTPError, e:
                    bad_links.append(url)

                except urllib2.URLError, e:

                    bad_links.append(url)

for i in set(bad_links):
    print i
