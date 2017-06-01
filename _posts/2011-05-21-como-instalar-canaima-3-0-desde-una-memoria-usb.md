---
author: martinezfaneyth
date: 2011-05-21 23:57:39-04:30
layout: post
slug: como-instalar-canaima-3-0-desde-una-memoria-usb
title: Como instalar Canaima 3.0 desde una Memoria USB
article_id: 1135
categories:
- Canaima
- Educativo
- Software Libre
tags:
- canaima gnu linux
- grabar ISO en USB
- instalar desde pen drive
image: http://huntingbears.com.ve/static/img/posts/1135/como-instalar-canaima-3-0-desde-una-memoria-usb__1.jpg
description: Puedes instalar Canaima 3.0 desde una memoria USB, Aquí te explicamos como.
---

Muchas personas no tienen disponible un dispositivo lector de medios ópticos (CD/DVD) y las imágenes ISO son publicadas especificando que son especialmente para ser quemadas en ese tipo de dispositivos. Lo cierto es que esas mismas imágenes ISO pueden ser utilizadas para grabarse en un pen-drive o Dispositivo de Almacenamiento Portátil USB mediante la utilización un comando en consola, para que igualmente puedas instalar Canaima 3.0 desde éstos dispositivos (útil para las netbooks).

Debes tener a la mano un pen-drive con capacidad igual o mayor a 1 GB (la imagen de Canaima 3.0 pesa 700MB) y la imagen de Canaima 3.0 que sea de tu agrado (arquitectura de [64Bits](http://descargas.canaima.softwarelibre.gob.ve/canaima-3.0~estable_amd64.iso) o [32Bits](http://descargas.canaima.softwarelibre.gob.ve/canaima-3.0~estable_i386.iso)). También debes saber que éste procedimiento borrará por completo el contenido de tu dispositivo, respalda toda la información antes de continuar.

Lo primero que haremos es conocer la ruta del dispositivo USB, que usualmente es algo como `/dev/sdX`, en donde X es una letra del abecedario (en minúscula y usualmente entre a y f). Para ello, echémosle un vistazo a nuestro(s) disco(s) duro(s) utilizando el programa gparted (Sistema > Administración > Gparted), por ejemplo, como yo tengo uno solo, al pulsar la lista desplegable de la esquina superior derecha aparece sólo /dev/sda.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/1135/como-instalar-canaima-3-0-desde-una-memoria-usb__1.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/1135/como-instalar-canaima-3-0-desde-una-memoria-usb__3.jpg"></span>

La idea es que al enchufar el pen-drive, notemos cuál es el nuevo dispositivo existente. Enchufemos el pen-drive, presionemos CTRL+R (para actualizar los dispositivos) y nos daremos cuenta que hay un nuevo dispositivo, en mi caso es `/dev/sdb`.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/1135/como-instalar-canaima-3-0-desde-una-memoria-usb__4.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/1135/como-instalar-canaima-3-0-desde-una-memoria-usb__5.jpg"></span>

Bien, ahora procedemos a escribir el siguiente comando en una consola con permisos de root (Aplicaciones > Accesorios > Terminal de Root):

{% highlight bash %}
dd if=/ruta/a/la/imagen.iso of=/dev/sdX
{% endhighlight %}

En donde "if" es igual a la ruta donde se encuentra la imagen ISO de Canaima que hemos descargado (por ejemplo, si está en la carpeta "Descargas", la ruta es /home/TU_USUARIO/Descargas) y "of" es igual al dispositivo que identifica a tu pen-drive.

Éste proceso dura unos cuantos minutos, y culmina cuando aparece un resumen como el que sigue:

{% highlight text %}
1432276+0 records in
1432276+0 records out
733325312 bytes (733 MB) copied, 134,127 s, 5,5 MB/s
{% endhighlight %}

Finalmente, la imagen IMG de Canaima 3.0 se encuentra perfectamente alojada en nuestro pen-drive, y si reiniciamos nuestra PC (con el pen-drive enchufado), podremos acceder al instalador.

NOTA: el BIOS de tu máquina debe estar configurado para iniciar mediante dispositivo USB para que puedas ver el instalador de Canaima. Usualmente puedes acceder al menú de configuración de la BIOS presionando F2, F10, F11 o ESC (depende del modelo) al momento del arranque.
