#!/usr/bin/env python
# -*- coding: utf-8 -*-

from tools import BASEDIR
from tools.util import get_path
from tools.compress import compress_css, compress_js


if __name__ == '__main__':
    compress_css(source=get_path([BASEDIR, '_includes', 'css', 'full']),
                 destination=get_path([BASEDIR, '_includes', 'css', 'min']))
    compress_js(source=get_path([BASEDIR, '_includes', 'js', 'full']),
                destination=get_path([BASEDIR, '_includes', 'js', 'min']))