#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import cssmin
import slimit
import shutil
from tools.util import find_files, get_path
from tools import BASEDIR


def compress_css(source=None, destination=None):

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

    for cssfull_file in find_files(path=source, pattern='*.css'):

        cssmin_file = get_path([destination, os.path.basename(cssfull_file)])
        print 'Generando '+cssmin_file

        try:
            with open(cssmin_file, 'w') as _file:
                _file_content = open(cssfull_file).read()
                _file_minified = cssmin.cssmin(_file_content)
                _file.write(_file_minified.replace('\xef\xbb\xbf', ''))
                _file.close()

        except Exception as e:
            print e


def compress_js(source=None, destination=None):

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

    for jsfull_file in find_files(path=source, pattern='*.js'):

        jsmin_file = get_path([destination, os.path.basename(jsfull_file)])
        print 'Generando '+jsmin_file

        try:
            with open(jsmin_file, 'w') as _file:
                _file_content = open(jsfull_file).read()
                _file_minified = slimit.minify(_file_content)
                _file.write(_file_minified.replace('\xef\xbb\xbf', ''))
                _file.close()

        except Exception as e:
            print e