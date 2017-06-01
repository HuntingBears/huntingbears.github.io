---
article_id: 4335
author: martinezfaneyth
categories:
- Desarrollo
date: 2015-08-30 01:16:41-0430
description: Este script permite vaciar la papelera de reciclaje de cualquier buzón de correo.
image:
layout: post
slug: vaciando-la-papelera-de-tu-buzon-de-correo-a-traves-de-python
tags: []
title: 'Vaciando la papelera de tu buzón de correo a través de Python'
---

En estos días estaba tratando de vaciar la papelera de reciclaje de mi correo hospedado en hotmail y resultó ser un estrés porque tenía muchos correos. La aplicación web no es muy eficiente manejando grandes volúmenes


#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

import imaplib

count = 0
c = imaplib.IMAP4_SSL('[SERVIDOR]', [PUERTO])
c.login('[CORREO]', '[PASSWORD]')

try:

    # Which folder?
    c.select('Deleted')

    # How many messages we have?
    typ, [msg_ids] = c.search(None, 'ALL')
    msg_ids = msg_ids.split(' ')

    while len(msg_ids):
        msg_ids_string = ','.join(msg_ids[:500])
        msg_ids = msg_ids[500:]
        typ, response = c.store(msg_ids_string, '+FLAGS', r'(\Deleted)')
        typ, response = c.expunge()
        print 'Expunged:', len(response)
        print 'Left:', len(msg_ids)

finally:
    try:
        c.close()
    except:
        pass
    c.logout()
