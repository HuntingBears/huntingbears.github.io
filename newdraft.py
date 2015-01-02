#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
from tools import BASEDIR
from tools.util import get_path
from tools.newdraft import create_draft

if __name__ == '__main__':

    draft_title = unicode(sys.argv[1].decode('utf-8'))

    if draft_title:
        create_draft(title=draft_title)
    else:
        print '¡No se proporcionó un título!'