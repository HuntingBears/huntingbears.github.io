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
from tools.util import find_files, get_path, is_valid_url

count = 0
img_files_orig = []
img_files_valid_ext = ['png', 'jpeg', 'jpg']

html_files = find_files(get_path([BASEDIR, '_site']), '*.html')
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

            if (ext in img_files_valid_ext
               and urlp.netloc != 'huntingbears.com.ve'
               and urlp.netloc):

                img_blob = urllib2.urlopen(url).read()
                img_mod = Image(blob=img_blob)
                img_mod.format = 'pjpeg'
                img_mod.compression_quality = 80

                if img_mod.width >= 1000:
                    img_mod.transform(resize='1000x1000>')

                new_img_blob = img_mod.make_blob()
                new_img_dir = get_path([BASEDIR, 'static', 'img', 'posts',
                                        str(md_yaml_data['wordpress_id'])])
                new_img_name = hashlib.md5(new_img_blob).hexdigest()+'.jpg'
                new_img_path = get_path([new_img_dir, new_img_name])
                new_img_url = os.path.join('/', 'static', 'img', 'posts',
                                           str(md_yaml_data['wordpress_id']),
                                           new_img_name)

                if not os.path.exists(new_img_dir):
                    os.makedirs(new_img_dir)

                new_img_file = open(new_img_path, 'w')
                new_img_file.write(new_img_blob)
                new_img_file.close()

                md_content = md_content.replace(url, new_img_url)

    md_file = open(md, 'w')
    md_file.write(md_content)
    md_file.close()
