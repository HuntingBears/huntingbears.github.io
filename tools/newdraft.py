#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import re
import yaml
from datetime import datetime
from tools import BASEDIR
from tools.util import slugify, get_path, find_files, CaracasTime


def parse_ids(source=BASEDIR):
    ids = []
    regex = re.compile('(?s)(---.*---)$', re.MULTILINE)

    for md in find_files(path=source, pattern='*.md'):
        _file = open(md).read()
        string = re.match(regex, _file).group(0).replace('---', '')
        data = yaml.load(string)

        if 'wordpress_id' not in data.keys():
            data['wordpress_id'] = 0

        ids.append(data['wordpress_id'])

    return set(ids)


def create_draft(title='Undefined'):

    draft_title = unicode(title)
    draft_date = datetime.now(tz=CaracasTime()).strftime('%Y-%m-%d %H:%M:%S%z')
    draft_slug_date = datetime.now(tz=CaracasTime()).strftime('%Y-%m-%d')
    draft_slug = slugify(draft_title)
    draft_file_path = get_path([BASEDIR, '_drafts', '%s-%s' % (draft_slug_date, draft_slug)])
    draft_id = max(parse_ids(source=BASEDIR))+1

    yaml_content = yaml.dump(data={'author': 'martinezfaneyth',
                                   'language': 'es',
                                   'date': draft_date,
                                   'layout': 'post',
                                   'slug': str(draft_slug),
                                   'title': draft_title,
                                   'wordpress_id': draft_id,
                                   'categories': [],
                                   'tags': [],
                                   'image': '',
                                   'description': ''},
                             allow_unicode=True, explicit_start=False,
                             explicit_end=False, default_flow_style=False)

    if os.path.exists(draft_file_path):
        print '¡El archivo ya existe!'
    else:
        _file = open(draft_file_path, 'w')
        _file.write('---\n'+yaml_content+'---')
        _file.close()