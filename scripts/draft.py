#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import sys
import yaml
from datetime import datetime

from util import slugify, get_path, find_files, CaracasTime, utfize
from config import BASEDIR


def parse_ids(source=BASEDIR):
    ids = []

    for md in find_files(path=source, pattern='*.md'):
        _file = open(md).read()
        _string = re.match('(?s)---(.*?)---(.*)$', _file, re.MULTILINE)
        data = yaml.load(_string.group(1))

        if 'article_id' not in data.keys():
            data['article_id'] = 0

        ids.append(data['article_id'])

    return set(ids)


def create_draft(title='Undefined'):

    draft_title = utfize(title)
    draft_slug = slugify(title)
    draft_date = datetime.now(tz=CaracasTime()).strftime('%Y-%m-%d %H:%M:%S%z')
    draft_slug_date = datetime.now(tz=CaracasTime()).strftime('%Y-%m-%d')
    draft_file_path = get_path([BASEDIR, '_drafts',
                                '%s-%s.md' % (draft_slug_date, draft_slug)])
    draft_id = max(parse_ids(source=BASEDIR)) + 1

    yaml_content = yaml.safe_dump(data={'author': 'martinezfaneyth',
                                        'date': draft_date,
                                        'layout': 'post',
                                        'slug': draft_slug,
                                        'title': draft_title,
                                        'article_id': draft_id,
                                        'categories': [],
                                        'tags': [],
                                        'image': '',
                                        'description': ''},
                                  allow_unicode=True, explicit_start=False,
                                  explicit_end=False, default_flow_style=False)

    if os.path.exists(draft_file_path):
        print('File already exists!')
    else:
        _file = open(draft_file_path, 'w')
        _file.write('---\n' + yaml_content + '---')
        _file.close()


if __name__ == '__main__':

    draft_title = sys.argv[1]

    if draft_title:
        create_draft(title=draft_title)
    else:
        print('No title was provided!')
