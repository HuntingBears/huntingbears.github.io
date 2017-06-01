#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
import time
from random import getrandbits
from datetime import datetime
from urllib.request import Request
from urllib.parse import urlencode

from config import BASEDIR
from util import utfize, get_json, get_twitter_oauth_header


INDEX_OBJECT = {}
JSON_CONTENT = {}
INDEX_API_END = 'http://huntingbears.com.ve/static/json/index.json'
TWITTER_OAUTH_NONCE = str(getrandbits(64))
TWITTER_OAUTH_TIMESTAMP = datetime.now().strftime('%s')
TWITTER_API_END = 'https://api.twitter.com/1.1/search/tweets.json'
TWITTER_CONSUMER_KEY = 'EfRsYNSXgd62lFtuP1RahQ'
TWITTER_CONSUMER_SECRET = '5EAk7IYlUQe3GX00bONoHx0fDJbuVUYMMDfEbbIsuY'
TWITTER_OAUTH_TOKEN = '320430429-896na1d2phjByw67KI3jr1poGtW5V2jJcZp9Zp1x'
TWITTER_OAUTH_SECRET = 'pAw4XsOjqBBOqaeLw7TtnwHQrY12dLdktRZ9GQyMyGwoA'
FACEBOOK_API_END = 'http://graph.facebook.com/'
GOOGLE_API_END = 'https://clients6.google.com/rpc'
GOOGLE_API_KEY = 'AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ'
DISQUS_API_END = 'https://disqus.com/api/3.0/threads/set.json'
DISQUS_API_KEY = '71jXpT8VH7lzUNCYHVFYSwfGcBIDHyak9pPSz9stR8GWXrbKFfxdCA1kBBusvClO'
DISQUS_API_FORUM = 'huntingbears'
JSON_CONTENT_REQUEST = INDEX_API_END

JSON_CONTENT = get_json(JSON_CONTENT_REQUEST)

print('Regenerating index ...')

for h, i in enumerate(JSON_CONTENT.keys()):

    if h % 10 == 0:
        time.sleep(120)
    else:
        time.sleep(1)

    JSON_ITEM = {}
    TWITTER_COUNT = {}
    DISQUS_COUNT = {}
    FACEBOOK_COUNT = {}
    GOOGLE_COUNT = [{}]
    JSON_ITEM['comment_count'] = 0
    JSON_ITEM['share_count'] = 0
    JSON_ITEM['title'] = utfize(JSON_CONTENT[i]['title'])
    JSON_ITEM['description'] = utfize(JSON_CONTENT[i]['description'])
    JSON_ITEM['keywords'] = utfize(JSON_CONTENT[i]['keywords'])
    JSON_ITEM['image'] = utfize(JSON_CONTENT[i]['image'])
    JSON_ITEM['date'] = utfize(JSON_CONTENT[i]['date'])
    JSON_ITEM['url'] = utfize(JSON_CONTENT[i]['url'])

    DISQUS_COUNT_REQUEST = Request(
        url='%s?%s' % (DISQUS_API_END,
                       urlencode({'api_key': DISQUS_API_KEY,
                                  'forum': DISQUS_API_FORUM,
                                  'thread:ident': i}, doseq=True)))

    FACEBOOK_COUNT_REQUEST = Request(
        url='%s?%s' % (FACEBOOK_API_END, urlencode({'id': JSON_ITEM['url']})))

    TWITTER_COUNT_REQUEST = Request(
        url='%s?%s' % (TWITTER_API_END, urlencode({'q': JSON_ITEM['url']})),
        headers={
            'Authorization': get_twitter_oauth_header(
                method='GET',
                url=TWITTER_API_END,
                params={'q': JSON_ITEM['url']},
                consumer_key=TWITTER_CONSUMER_KEY,
                consumer_secret=TWITTER_CONSUMER_SECRET,
                token=TWITTER_OAUTH_TOKEN,
                token_secret=TWITTER_OAUTH_SECRET,
                nonce=TWITTER_OAUTH_NONCE,
                timestamp=TWITTER_OAUTH_TIMESTAMP)})

    GOOGLE_COUNT_REQUEST = Request(
        url='%s?%s' % (GOOGLE_API_END, urlencode({'key': GOOGLE_API_KEY})),
        data=json.dumps([{
            'method': 'pos.plusones.get',
            'id': 'p',
            'params': {
                'nolog': True,
                'id': JSON_ITEM['url'],
                'source': 'widget',
                'userId': '@viewer',
                'groupId': '@self'
            },
            'jsonrpc': '2.0',
            'key': 'p',
            'apiVersion': 'v1'
        }]).encode(),
        headers={'Content-Type': 'application/json'})

    try:
        DISQUS_COUNT = get_json(DISQUS_COUNT_REQUEST)
    except Exception as e:
        print(e)

    try:
        TWITTER_COUNT = get_json(TWITTER_COUNT_REQUEST)
    except Exception as e:
        print(e)

    try:
        FACEBOOK_COUNT = get_json(FACEBOOK_COUNT_REQUEST)
    except Exception as e:
        print(e)

    try:
        GOOGLE_COUNT = get_json(GOOGLE_COUNT_REQUEST)
    except Exception as e:
        print(e)

    if 'result' in GOOGLE_COUNT[0]:
        JSON_ITEM['share_count'] += int(float(utfize(GOOGLE_COUNT[0]['result']['metadata']['globalCounts']['count'])))

    if 'search_metadata' in TWITTER_COUNT:
        JSON_ITEM['share_count'] += int(float(utfize(TWITTER_COUNT['search_metadata']['count'])))

    if 'share' in FACEBOOK_COUNT:
        JSON_ITEM['share_count'] += int(float(utfize(FACEBOOK_COUNT['share']['share_count'])))

    if 'response' in DISQUS_COUNT:
        JSON_ITEM['comment_count'] += int(float(utfize(DISQUS_COUNT['response'][0]['posts'])))

    INDEX_OBJECT[utfize(i)] = JSON_ITEM

    print(JSON_ITEM['url'])

f = open(os.path.join(BASEDIR, '_includes', 'js', 'full', 'index.js'), 'w')
f.write('var posts_index = ' + json.dumps(INDEX_OBJECT, separators=(',', ': '),
                                          sort_keys=True, indent=4) + ';')
f.close()
