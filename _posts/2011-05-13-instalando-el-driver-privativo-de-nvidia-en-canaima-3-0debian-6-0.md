---
author: martinezfaneyth
date: 2011-05-13 21:26:57-04:30
layout: post
slug: instalando-el-driver-privativo-de-nvidia-en-canaima-3-0debian-6-0
title: Instalando el driver privativo de NVIDIA en Canaima 3.0/Debian 6.0
article_id: 1113
categories:
- Canaima
- Software Libre
- Tutoriales
tags:
- howto
- instalar
- nvidia driver
image: http://huntingbears.com.ve/static/img/posts/1113/instalando-el-driver-privativo-de-nvidia-en-canaima-3-0debian-6-0__1.jpg
description: Si el driver libre de nVidia no le da soporte a tu targeta gráfica, lamentablemente tendrás que utilizar el privativo.
---

Lamentablemente, el driver privativo para las tarjetas NVIDIA todavía sigue prestando mayor rendimiento que su equivalente libre (NOUVEAU). Hay que seguir ciertos pasos que no están especificados explícitamente en muchas de las guías que encontré en internet para instalarlo.

1. Primero averiguemos cuál es la versión del kernel que está corriendo en tu pc. En el menú Aplicaciones > Herramientas del Sistema > Monitor del Sistema, ubica la pestaña "Sistema". Allí verás algo como:

    <span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/1113/instalando-el-driver-privativo-de-nvidia-en-canaima-3-0debian-6-0__2.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/1113/instalando-el-driver-privativo-de-nvidia-en-canaima-3-0debian-6-0__2.jpg"></span>

    Para éste ejemplo, la versión del kernel es `2.6.32-5-686`.

    También puedes obtener la versión del kernel directamente de la consola con el siguiente comando:

        uname -r

2. Luego, procedemos a instalar los paquetes `nvidia-glx`, `nvidia-settings`, `nvidia-xconfig` y `nvidia-kernel-VERSIÓN-DE-KERNEL`, que en mi caso es `nvidia-kernel-2.6.32-5-686`. Podemos hacerlo a través del gestor de paquetes synaptic, o con el siguiente comando en consola (con permisos de root):

        aptitude install nvidia-glx nvidia-settings nvidia-xconfig nvidia-kernel-2.6.32-5-686

3. Seguidamente, configuramos el archivo de configuraciones `/etc/X11/xorg.conf`:

        nvidia-xconfig

4. (opcional) Si queremos evitar que salga en logo de NVIDIA al inicio del sistema, podemos editar el archivo `/etc/X11/xorg.conf`. En la sección "Device", podemos agregar la línea:

        Option              "NoLogo" "true"

    Para que quede:

        Section "Device"
            Identifier            "Device0"
            Driver                "nvidia"
            Option                "NoLogo" "true"
            VendorName            "NVIDIA Corporation"
        EndSection

5. Actulizamos nuestro initramfs para que cargue los nuevos drivers (nvidia) y olvide los viejos (nouveau). Al instalar el paquete `nvidia-glx`, se agrega una entrada al blacklist de los módulos de kernel que evita que nouveau se cargue al inicio en los próximos booteos.

        update-initramfs -u

6. Reiniciamos la PC.

    Para comprobar que tenemos cargados los drivers privativos, podemos verificar la salida del siguiente comando:

        glxinfo | grep "OpenGL vendor string:"

    Si la salida es "NVIDIA Corporation", todo está bien.
