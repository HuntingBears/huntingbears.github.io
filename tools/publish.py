#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import re
import yaml
import shutil
from datetime import datetime
from tools import BASEDIR
from tools.util import slugify, get_path, find_files, CaracasTime


def publish_post(draft=None):

    post_file = open(draft, 'r')
    post_content = post_file.read()
    post_file.close()

    post_file = open(draft, 'w')

    post_date = datetime.now(tz=CaracasTime()).strftime('%Y-%m-%d %H:%M:%S%z')
    post_slug_date = datetime.now(tz=CaracasTime()).strftime('%Y-%m-%d')

    regex = re.compile('(?s)(---.*---)$', re.MULTILINE)
    string = re.match(regex, post_content).group(0).replace('---', '')

    data = yaml.load(string)
    data['date'] = post_date
    post_file.write('---\n'+yaml.dump(data=data, allow_unicode=True)+'---')
    post_file.close()

    post_new_path = get_path([BASEDIR, '_posts', '%s-%s' % (post_slug_date, data['slug'])])

    if  post_new_path != draft:
        print draft, post_new_path
        shutil.move(draft, post_new_path)