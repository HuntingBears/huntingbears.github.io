---
author: martinezfaneyth
date: 2011-06-10 15:07:24-04:30
layout: post
slug: instalando-el-driver-privativo-de-ati-radeon-en-canaima-3-0debian-6-0
title: Instalando el driver privativo de ATI Radeon en Canaima 3.0/Debian 6.0
article_id: 1349
categories:
- Canaima
- Software Libre
- Tutoriales
tags:
- canaima gnu linux
- driver ATI
- tutorial
image: /static/img/posts/1349/instalando-el-driver-privativo-de-ati-radeon-en-canaima-3-0debian-6-0__1.jpg
description: Esta guía permite instalar el driver privativo de ATI.
---

¿Te ha pasado que cuando inicias Debian Squeeze o Canaima 3.0, observas el siguiente error, muy al estilo matrix? (si es que lo logras ver sin hacer un `tail -l /var/log/dmesg`)

    radeon 0000:01:00.0: object_init failed for (5242880, 0x00000002)
    [drm:radeon_gem_object_create] *ERROR* Failed to allocate GEM object (5242880, 2, 4096, -22)
    [drm:radeon_gart_bind] *ERROR* trying to bind memory to unitialized GART !
    [drm:radeon_ttm_backend_bind] *ERROR* failed to bind 1280 pages at 0x00000000
    [TTM] Couldn't bind backend.

Bueno, este error ocurre cuando posees una tarjeta ATI Radeon, y no has instalado el driver privativo fglrx. Lamentablemente, todavía no hemos podido desarrollar un driver libre para sistemas GNU/Linux (recuerden que como los fabricantes no liberan el código fuente, los desarrolladores GNU/Linux deben utilizar ingeniería inversa para hacer los drivers, lo cual es muy engorroso).

Si no te importa perder un poco del control de tu computadora instalando drivers que no sabes lo que tienen por dentro pero que hacen funcionar el hardware, entonces ésta guía es para ti.

1. Primero averiguemos cuál es la arquitectura bajo la cual está corriendo tu sistema operativo GNU/Linux con el siguiente comando en consola de root (Aplicaciones > Accesorios > Terminal de Root).

        uname -r | sed 's,[^-]*-[^-]*-,,'

2. Luego, procedemos a instalar los paquetes `fglrx-control`, `fglrx-driver`, `fglrx-glx`, `fglrx-modules-dkms` y `linux-headers-2.6-ARQUITECTURA`, que en mi caso es `linux-headers-2.6-686`. Podemos hacerlo a través del gestor de paquetes synaptic, o con el siguiente comando en consola (con permisos de root):

        aptitude install linux-headers-2.6-686 fglrx-control fglrx-driver fglrx-glx fglrx-modules-dkms

    Ésto va a instalar el driver nuevo, inhibir el viejo y hacer las inserciones de módulos necesarias en el kernel.

3. Seguidamente, configuramos el archivo de configuraciones `/etc/X11/xorg.conf`:

        aticonfig --initial

5. Actualizamos nuestro initramfs para que cargue los nuevos drivers (fglrx) y olvide los viejos (radeon). Al instalar el paquete `fglrx-glx`, se agrega una entrada al blacklist de los módulos de kernel que evita que radeon se cargue al inicio en los próximos booteos.

        update-initramfs -u

6. Reiniciamos la PC.

    Para comprobar que tenemos cargados los drivers privativos, podemos verificar la salida del siguiente comando:

        glxinfo | grep "OpenGL vendor string:"

Si la salida es "ATI Technologies Inc.", todo está bien.
