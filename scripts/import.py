#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import yaml
from urllib.request import urlopen
from urllib.parse import urlparse
from PIL import Image

from util import find_files, get_path, is_valid_url
from config import BASEDIR

img_files_valid_ext = ['png', 'jpeg', 'jpg']

print('Searching for images inside Markdown files ...')

for md in find_files(get_path([BASEDIR, '_posts']), '*.md'):

    md_file = open(md, 'r')
    md_content = md_file.read()
    md_file.close()

    md_yaml_regex = re.compile(r'(?s)(---.*---)$', re.MULTILINE)
    md_yaml_string = re.match(md_yaml_regex, md_content).group(0).replace('---', '')
    md_yaml_data = yaml.load(md_yaml_string)

    md_url_list = re.findall(r'\[[^]]+]\(\s*(http[s]?://[^)]+)\s*\)', md_content)
    md_url_list = md_url_list + [md_yaml_data['image']]
    md_url_list = md_url_list + re.findall(r'"(http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+)"', md_content)
    new_dir = get_path([BASEDIR, 'static', 'img', 'posts', str(md_yaml_data['article_id'])])

    if os.path.exists(new_dir):
        count = max([int(os.path.splitext(image.split('__')[1])[0]) for image in find_files(new_dir, '*.jpg')])

    else:
        count = 0

    for url in md_url_list:

        if is_valid_url(url):
            urlp = urlparse(url)
            ext = os.path.splitext(urlp.path)[1].lower().strip('.')

            if (ext in img_files_valid_ext and
                    urlp.netloc != 'huntingbears.com.ve' and
                    urlp.netloc):

                count = count + 1

                if not os.path.exists(new_dir):
                    os.makedirs(new_dir)

                new_name = md_yaml_data['slug']+'__'+str(count)+'.jpg'
                new_path = get_path([new_dir, new_name])
                new_url = os.path.join('/', 'static', 'img', 'posts',
                                       str(md_yaml_data['article_id']),
                                       new_name)
                new_url = 'http://huntingbears.com.ve'+new_url
                print(url)
                blob = urlopen(url)
                img = Image.open(blob)
                img.thumbnail((1000, 1000), Image.LANCZOS)
                img.save(new_path, optimize=True, progressive=True)
                print('Saving '+new_url)

                md_content = md_content.replace(url, new_url)

    md_file = open(md, 'w')
    md_file.write(md_content)
    md_file.close()
