#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import json
import fnmatch
import base64
import hmac
import hashlib
import unicodedata
from urllib.request import urlopen, Request
from urllib.parse import quote
from datetime import timedelta, tzinfo


def normalize(value):
    return unicodedata.normalize('NFKD', str(value)).encode('ascii', 'ignore').decode('ascii')


def escape(_string):
    return quote(_string, safe='~')


def utfize(_string):
    return str(_string)


def slugify(value):
    return re.sub('[-\s]+', '-', re.sub('[^\w\s-]', '', normalize(value)).strip().lower())


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
        return timedelta(minutes=-1 * 60 * 9 / 2)

    def tzname(self, dt):
        return 'America/Caracas'

    def dst(self, dt):
        return timedelta(minutes=0)


class HeadRequest(Request):
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


def get_json(request):
    return json.loads(str(urlopen(request).read(), 'utf-8'))


def get_twitter_signature_base_string(method, url, params):
    return method + '&' + escape(url) + '&' + escape(params)


def get_twitter_signature_params_string(consumer_key, token, params, nonce,
                                        timestamp):
    _params = {}
    _params['oauth_version'] = '1.0'
    _params['oauth_signature_method'] = 'HMAC-SHA1'
    _params['oauth_nonce'] = nonce
    _params['oauth_timestamp'] = timestamp
    _params['oauth_consumer_key'] = consumer_key
    _params['oauth_token'] = token
    _params.update(params)
    _params = [escape(k) + '=' + escape(v) for k, v in sorted(_params.items())]
    return '&'.join(_params)


def get_twitter_signature(consumer_secret, token_secret, signature_base_string):
    SIGNING_KEY = str(consumer_secret + '&' + escape(token_secret)).encode()
    OAUTH_HMAC_HASH = hmac.new(SIGNING_KEY, signature_base_string.encode(), hashlib.sha1)
    return base64.b64encode(OAUTH_HMAC_HASH.digest()).decode()


def get_twitter_oauth_header_string(consumer_key, token, signature,
                                    nonce, timestamp):
    _header = {}
    _header['oauth_version'] = '1.0'
    _header['oauth_signature_method'] = 'HMAC-SHA1'
    _header['oauth_nonce'] = nonce
    _header['oauth_timestamp'] = timestamp
    _header['oauth_consumer_key'] = consumer_key
    _header['oauth_token'] = token
    _header['oauth_signature'] = signature
    _header = [escape(k) + '="' + escape(v) + '"' for k, v in sorted(_header.items())]
    _header = ', '.join(_header)
    return 'OAuth ' + _header


def get_twitter_oauth_header(method, url, params, consumer_key,
                             consumer_secret, token, token_secret,
                             nonce, timestamp):
    params = get_twitter_signature_params_string(
        consumer_key=consumer_key, token=token, params=params, nonce=nonce,
        timestamp=timestamp)
    signature_base_string = get_twitter_signature_base_string(
        method=method, url=url, params=params)
    signature = get_twitter_signature(
        consumer_secret=consumer_secret,
        token_secret=token_secret,
        signature_base_string=signature_base_string)
    header = get_twitter_oauth_header_string(
        consumer_key=consumer_key, token=token, signature=signature,
        nonce=nonce, timestamp=timestamp)
    return header
