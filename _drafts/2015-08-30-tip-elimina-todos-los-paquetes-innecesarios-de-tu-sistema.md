---
article_id: 4337
author: martinezfaneyth
categories: []
date: 2015-08-30 15:34:09-0430
description: ''
image: ''
layout: post
slug: tip-elimina-todos-los-paquetes-innecesarios-de-tu-sistema
tags: []
title: 'Tip: Elimina todos los paquetes innecesarios de tu sistema'
---



aptitude purge $(deborphan --all-packages --force-hold --nice-mode --find-config --libdevel --guess-all --no-show-section) $(aptitude search ~c ~g -F %p)
