#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import yaml
import shutil

from config import BASEDIR
from util import find_files, slugify, utfize, get_path


def parse_categories(source=BASEDIR):
    cat = []
    regex = re.compile('(?s)(---.*---)$', re.MULTILINE)

    for md in find_files(path=source, pattern='*.md'):
        _file = open(md).read()
        string = re.match(regex, _file).group(0).replace('---', '')
        data = yaml.load(string)

        if 'categories' not in data.keys():
            data['categories'] = []

        for c in data['categories']:
            cat.append(c.lower())

    return set(cat)


def parse_tags(source=BASEDIR):
    tag = []
    regex = re.compile('(?s)(---.*---)$', re.MULTILINE)

    for md in find_files(path=source, pattern='*.md'):
        _file = open(md).read()
        string = re.match(regex, _file).group(0).replace('---', '')
        data = yaml.load(string)

        if 'tags' not in data.keys():
            data['tags'] = []

        for c in data['tags']:
            tag.append(c.lower())

    return set(tag)


def create_categories(destination=None):

    if os.path.isdir(destination):
        try:
            shutil.rmtree(destination)
        except Exception as e:
            print(e)

    if not os.path.isdir(destination):
        try:
            os.makedirs(destination)
        except Exception as e:
            print(e)

    for cat in parse_categories(get_path([BASEDIR, '_posts'])):

        cat_slug = slugify(cat)
        cat_image = utfize(u'http://huntingbears.com.ve/static/img/site/mstile-310x310.png')
        cat_title = utfize(u'[{0}] Category'.format(cat))
        cat_description = utfize(u'List of articles under [{0}] category.'.format(cat))

        tmpl_content = yaml.safe_dump(data={'layout': 'category',
                                            'slug': cat_slug,
                                            'title': cat_title,
                                            'image': cat_image,
                                            'article_id': 0,
                                            'description': cat_description},
                                      allow_unicode=True,
                                      explicit_start=False,
                                      explicit_end=False,
                                      default_flow_style=False)

        feed_content = yaml.safe_dump(data={'layout': 'category_feed',
                                            'slug': cat_slug},
                                      allow_unicode=True,
                                      explicit_start=False,
                                      explicit_end=False,
                                      default_flow_style=False)

        os.makedirs(get_path([destination, cat_slug]))
        os.makedirs(get_path([destination, cat_slug, 'feed']))

        f = open(get_path([destination, cat_slug, 'index.md']), 'w')
        f.write('---\n')
        f.write(tmpl_content)
        f.write('---')
        f.close()

        f = open(get_path([destination, cat_slug, 'feed', 'index.xml']), 'w')
        f.write('---\n')
        f.write(feed_content)
        f.write('---')
        f.close()

        print('Creating category {0}'.format(cat_slug))


def create_tags(destination=None):

    if os.path.isdir(destination):
        try:
            shutil.rmtree(destination)
        except Exception as e:
            print(e)

    if not os.path.isdir(destination):
        try:
            os.makedirs(destination)
        except Exception as e:
            print(e)

    for tag in parse_tags(get_path([BASEDIR, '_posts'])):

        tag_slug = slugify(tag)
        tag_image = utfize(u'http://huntingbears.com.ve/static/img/site/mstile-310x310.png')
        tag_title = utfize(u'[{0}] Tag'.format(tag))
        tag_description = utfize(u'List of articles under [{0}] tag.'.format(tag))

        tmpl_content = yaml.safe_dump(data={'layout': 'tag',
                                            'slug': tag_slug,
                                            'title': tag_title,
                                            'image': tag_image,
                                            'article_id': 0,
                                            'description': tag_description},
                                      allow_unicode=True,
                                      explicit_start=False,
                                      explicit_end=False,
                                      default_flow_style=False)

        feed_content = yaml.safe_dump(data={'layout': 'tag_feed',
                                            'slug': tag_slug},
                                      allow_unicode=True,
                                      explicit_start=False,
                                      explicit_end=False,
                                      default_flow_style=False)

        os.makedirs(get_path([destination, tag_slug]))
        os.makedirs(get_path([destination, tag_slug, 'feed']))

        f = open(get_path([destination, tag_slug, 'index.md']), 'w')
        f.write('---\n')
        f.write(tmpl_content)
        f.write('---')
        f.close()

        f = open(get_path([destination, tag_slug, 'feed', 'index.xml']), 'w')
        f.write('---\n')
        f.write(feed_content)
        f.write('---')
        f.close()

        print('Creating tag {0}'.format(tag_slug))


if __name__ == '__main__':

    create_categories(destination=get_path([BASEDIR, 'cat']))
    create_tags(destination=get_path([BASEDIR, 'tag']))
