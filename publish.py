#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
from tools import BASEDIR
from tools.util import get_path
from tools.publish import publish_post

if __name__ == '__main__':

    draft_path = get_path([BASEDIR, sys.argv[1]])

    if os.path.exists(draft_path):
        publish_post(draft=draft_path)
    else:
        print '¡Este archivo no existe!'