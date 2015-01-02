#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import re
import yaml
import time
import shutil
from tools.util import find_files, slugify, normalize, get_path
from tools import BASEDIR


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
            cat.append(c)

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
            tag.append(c)

    return set(tag)


def create_categories(destination=None):

    if os.path.isdir(destination):
        try:
            shutil.rmtree(destination)
        except Exception as e:
            print e

    if not os.path.isdir(destination):
        try:
            os.makedirs(destination)
        except Exception as e:
            print e

    for cat in parse_categories(BASEDIR):

        cat = normalize(cat)
        cat_slug = slugify(cat)
        cat_image = 'http://blog-luisalejandro.rhcloud.com/static/img/site/mstile-310x310.png'
        cat_title = 'Categoría [{0}]'.format(cat)
        cat_description = 'Lista de artículos bajo la categoría [{0}]'.format(cat)

        tmpl_content = yaml.dump(data={'layout': 'category',
                                       'category_name': str(cat_slug),
                                       'title': unicode(cat_title.decode('utf-8')),
                                       'image': str(cat_image),
                                       'description': unicode(cat_description.decode('utf-8'))},
                                 allow_unicode=True, explicit_start=False,
                                 explicit_end=False, default_flow_style=False)

        feed_content = yaml.dump(data={'layout': 'category_feed',
                                       'category_name': str(cat_slug)},
                                 allow_unicode=True, explicit_start=False,
                                 explicit_end=False, default_flow_style=False)

        os.makedirs(get_path([destination, cat_slug]))
        f = open(get_path([destination, cat_slug, 'index.md']), 'w')
        f.write('---\n'+tmpl_content+'---')
        f.close()

        os.makedirs(get_path([destination, cat_slug, 'feed']))
        f = open(get_path([destination, cat_slug, 'feed', 'index.xml']), 'w')
        f.write('---\n'+feed_content+'---')
        f.close()

        print 'Creando categoría {0}'.format(cat_slug)


def create_tags(destination=None):

    if os.path.isdir(destination):
        try:
            shutil.rmtree(destination)
        except Exception as e:
            print e

    if not os.path.isdir(destination):
        try:
            os.makedirs(destination)
        except Exception as e:
            print e

    for tag in parse_tags(BASEDIR):

        tag = normalize(tag)
        tag_slug = slugify(tag)
        tag_image = 'http://blog-luisalejandro.rhcloud.com/static/img/site/mstile-310x310.png'
        tag_title = 'Etiqueta [{0}]'.format(tag)
        tag_description = 'Lista de artículos bajo la etiqueta [{0}]'.format(tag)

        tmpl_content = yaml.dump(data={'layout': 'tag',
                                       'tag_name': str(tag_slug),
                                       'title': unicode(tag_title.decode('utf-8')),
                                       'image': str(tag_image),
                                       'description': unicode(tag_description.decode('utf-8'))},
                                 allow_unicode=True, explicit_start=False,
                                 explicit_end=False, default_flow_style=False)

        feed_content = yaml.dump(data={'layout': 'tag_feed',
                                       'tag_name': str(tag_slug)},
                                 allow_unicode=True, explicit_start=False,
                                 explicit_end=False, default_flow_style=False)

        os.makedirs(get_path([destination, tag_slug]))
        f = open(get_path([destination, tag_slug, 'index.md']), 'w')
        f.write('---\n'+tmpl_content+'---')
        f.close()

        os.makedirs(get_path([destination, tag_slug, 'feed']))
        f = open(get_path([destination, tag_slug, 'feed', 'index.xml']), 'w')
        f.write('---\n'+feed_content+'---')
        f.close()

        print 'Creando tag {0}'.format(tag_slug)
