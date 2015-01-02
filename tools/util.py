#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import re
import urllib2
import fnmatch
import unicodedata
from datetime import timedelta, tzinfo


def slugify(value):
    value = unicodedata.normalize('NFKD', unicode(value)).encode('ascii', 'ignore').decode('ascii')
    value = re.sub('[^\w\s-]', '', value).strip().lower()
    return re.sub('[-\s]+', '-', value)


def normalize(value):
    return unicodedata.normalize('NFKD', unicode(value)).encode('ascii', 'ignore').decode('ascii')


def get_path(path=[]):
    return os.path.normpath(os.path.realpath(
        os.path.abspath(os.path.join(*path))))


def find_files(path=None, pattern='*'):
    d = []
    for directory, subdirs, files in os.walk(os.path.normpath(path)):
        for filename in fnmatch.filter(files, pattern):
            if os.path.isfile(os.path.join(directory, filename)):
                if os.path.islink(os.path.join(directory, filename)):
                    d.append(os.path.join(get_path([directory]), filename))
                else:
                    d.append(get_path([directory, filename]))
    return d


class CaracasTime(tzinfo):
    def utcoffset(self, dt):
        return timedelta(minutes=-1*60*9/2)

    def tzname(self, dt):
        return 'America/Caracas'

    def dst(self, dt):
        return timedelta(minutes=0)


class HeadRequest(urllib2.Request):
    def get_method(self):
        return 'HEAD'


def is_valid_url(url):
    import re
    regex = re.compile(
        r'^(?:http|ftp)s?://'
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'
        r'localhost|'
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'
        r'(?::\d+)?'
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return url is not None and regex.search(url)
