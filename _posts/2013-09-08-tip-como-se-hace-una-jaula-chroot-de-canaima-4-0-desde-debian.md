---
author: martinezfaneyth
date: 2013-09-08 20:30:25-04:30
layout: post
slug: tip-como-se-hace-una-jaula-chroot-de-canaima-4-0-desde-debian
title: 'Tip: ¿Cómo se hace una jaula (chroot) de Canaima 4.0 desde Debian?'
article_id: 4194
categories:
- Canaima
- Software Libre
- Tips
tags:
- Canaima
- chroot
- debootstrap
image: http://huntingbears.com.ve/static/img/posts/4194/tip-como-se-hace-una-jaula-chroot-de-canaima-4-0-desde-debian__1.jpg
description: Hacer una jaula te permitirá trabajar con Canaima 4.0 incluso desde otro Sistema Operativo de otra versión.
---

¿Te preguntabas cómo hacer un [chroot](http://es.wikipedia.org/wiki/Chroot) de Canaima 4.0? Aquí está en cuatro pasos:

1. Instala coreutils y debootstrap:

        aptitude install coreutils debootstrap

2. Enlaza el script de Debian Wheezy a Canaima Kerepakupai:

        ln -s /usr/share/debootstrap/wheezy /usr/share/debootstrap/kerepakupai

3. Ejecuta debootstrap así (`--no-check-gpg` porque no tenemos las llaves del repositorio):

        debootstrap --no-check-gpg kerepakupai /ruta/a/la/carpeta/ http://paquetes.canaima.softwarelibre.gob.ve/

4. Entra a la jaula:

        chroot /ruta/a/la/carpeta/

¡Listo!, ya tienes un Canaima 4.0 básico para empezar a hackear. Enjoy.

Gracias a [Flamel Canto](http://twitter.com/flamelcanto) por el Beta testing :-D
