#!/usr/bin/env python
# -*- coding: utf-8 -*-

from tools import BASEDIR
from tools.util import get_path
from tools.categorize import create_categories, create_tags


if __name__ == '__main__':

    create_categories(destination=get_path([BASEDIR, 'cat']))
    create_tags(destination=get_path([BASEDIR, 'tag']))