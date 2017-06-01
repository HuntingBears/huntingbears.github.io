#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import sys
import yaml
import shutil
from datetime import datetime

from config import BASEDIR
from util import get_path, CaracasTime, find_files


def parse_ids(source=BASEDIR):
    ids = []

    for md in find_files(path=source, pattern='*.md'):
        _file = open(md).read()
        string = re.match('(?s)---(.*?)---(.*)$', _file, re.MULTILINE)
        data = yaml.load(string.group(1))

        if 'article_id' not in data.keys():
            data['article_id'] = 0

        ids.append(data['article_id'])

    return set(ids)


def publish_post(draft=None):

    post_file = open(draft, 'r')
    post_content = post_file.read()
    post_file.close()

    post_date = datetime.now(tz=CaracasTime()).strftime('%Y-%m-%d %H:%M:%S%z')
    post_slug_date = datetime.now(tz=CaracasTime()).strftime('%Y-%m-%d')

    string = re.match('(?s)---(.*?)---(.*)$', post_content, re.MULTILINE)
    data = yaml.load(string.group(1))
    data['date'] = post_date
    data['article_id'] = max(parse_ids(source=BASEDIR)) + 1

    post_file = open(draft, 'w')
    post_file.write('---\n' + yaml.safe_dump(data=data, allow_unicode=True) + '---')
    post_file.write(string.group(2))
    post_file.close()

    post_new_path = get_path([BASEDIR, '_posts', '%s-%s.md' % (post_slug_date, data['slug'])])

    if post_new_path != draft:
        print('Original draft: ' + os.path.basename(draft))
        print('Publishing to: ' + os.path.basename(post_new_path))
        shutil.move(draft, post_new_path)


if __name__ == '__main__':

    draft_path = get_path([BASEDIR, sys.argv[1]])

    if os.path.exists(draft_path):
        publish_post(draft=draft_path)
    else:
        print('This draft does not exist!')
