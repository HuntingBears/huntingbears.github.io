---
author: martinezfaneyth
date: 2011-07-17 16:30:32-04:30
layout: post
slug: emulando-el-nintendo-wii-en-canaima-3-0debian-6-0
title: Emulando el Nintendo Wii en Canaima 3.0/Debian 6.0
article_id: 1586
categories:
- Canaima
- Software Libre
- Tutoriales
tags:
- canaima gnu linux
- nintendo wii
- zelda twilight princess
image: http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__1.jpg
description: El emulador Dolphin permite emular Nintendo Wii y Gamecube en un sistema operativo basado en Debian.
---

**ADVERTENCIA:** Éste contenido tiene un propósito estrictamente académico. No se recomienda el uso de los juegos mencionados acá, a menos que estés consciente de que jugarlos no cambiará la forma en que te relacionas con la sociedad.

¿Que en Linux no se puede jugar? ¿Que Linux es Retrotecnológico? Hacer caso omiso de esas aseveraciones. En ésta oportunidad voy a enseñarte como convertir tu Canaima 3.0 (o Debian 6.0) en una consola de juegos Wii, con muy pocos materiales. Necesitarás:

|||
|---|---|
|<span class="figure figure-20" data-figure-src="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__2.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__3.jpg"></span>|**\[OPCIONAL\]** Uno o varios controlles wii (o _wiimotes_) con sus nunchucks. El precio varía entre 300 y 500BsF en una tienda de consolas de videojuego.|
|<span class="figure figure-20" data-figure-src="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__4.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__5.jpg"></span>|**\[OPCIONAL\]** Un adaptador (o _dongle_) bluetooth para establecer comunicaciones entre el wiimote y tu computadora. Se consiguen por 50BsF en cualquier tienda de artefactos electrónicos.|
|<span class="figure figure-20" data-figure-src="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__6.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__7.jpg"></span>|**\[OPCIONAL\]** Una barra de sensores infrarrojos para wii, permite al wiimote ubicarse en el espacio tridimensional a través de un sistema de referencia de 2 focos. Se consiguen por 50BsF en cualquier tienda de artefactos electrónicos.|

La experiencia de juego es mucho mejor si logras jugarlo con el _wiimote_, sin embargo no es un requisito obligatorio: si no posees un wiimote real, puedes emularlo a través del teclado y el mouse (pero es un poco incómodo).

También es recomendable que tengas una tarjeta gráfica [NVIDIA]({{ site.url }}/instalando-el-driver-privativo-de-nvidia-en-canaima-3-0debian-6-0.html) o [ATI]({{ site.url }}/instalando-el-driver-privativo-de-ati-radeon-en-canaima-3-0debian-6-0.html) con la aceleración 3D activada, 1GB de memoria RAM y un procesador doble núcleo; sin embargo, tampoco es obligatorio.

### Instalando Software Necesario

[Dolphin](http://www.dolphin-emulator.com/) (dolphin-emu) es un proyecto de Software Libre que busca emular las consolas de Nintendo Wii y Gamecube en sistemas GNU/Linux. Está enteramente escrito en Lenguaje C y C++, y podemos encontrar el código fuente en [Google Code](http://code.google.com/p/dolphin-emu/source/browse/). Una de las características más resaltantes es que permite emular los [juegos en alta definición](http://www.youtube.com/watch?v=ena3EKeAzC0) (720p o 1080p) aprovechando la aceleración gráfica de tu computadora, cosa que la consola Wii no puede hacer.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__8.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__9.jpg"></span>

Para instalar Dolphin necesitarás descargar e instalar los siguientes paquetes en el orden en que se encuentran, y según la arquitectura de tu computadora (AMD64 o I386):

* libao2 > [amd64](http://dl.dropboxusercontent.com/u/16329841/libao2_0.8.8-4_amd64.deb) | [i386](http://dl.dropboxusercontent.com/u/16329841/libao2_0.8.8-4_i386.deb)
* libsfml-network1.6 > [amd64](http://dl.dropboxusercontent.com/u/16329841/libsfml-network1.6_1.6%2Brepack1-0build1~lucid_amd64.deb) | [i386](http://dl.dropboxusercontent.com/u/16329841/libsfml-network1.6_1.6%2Brepack1-0build1~lucid_i386.deb)
* nvidia-cg-toolkit > [amd64](http://dl.dropboxusercontent.com/u/16329841/nvidia-cg-toolkit_2.2.201002-0ubuntu1~lucid_amd64.deb) | [i386](http://dl.dropboxusercontent.com/u/16329841/nvidia-cg-toolkit_2.2.201002-0ubuntu1~lucid_i386.deb)
* dolphin-emu > [amd64](http://dl.dropboxusercontent.com/u/16329841/dolphin-emu_3.0-0ubuntu1~lucid_amd64.deb) | [i386](http://dl.dropboxusercontent.com/u/16329841/dolphin-emu_3.0-0ubuntu1~lucid_i386.deb)

Los paquetes se instalan a través de la interfaz gráfica (click derecho sobre el paquete y luego "Abrir con Instalador de Paquetes GDebi") o a través de una Terminal de Root (Aplicaciones > Accesorios > Terminal de Root) con el comando:

{% highlight bash %}
dpkg -i /ruta/al/paquete.deb
{% endhighlight %}

Además, debes asegurarte que tienes instalados los paquetes para compatilidad con dispositivos Bluetooth, los necesitarás si planeas utilizar un wiimote real. Ejecuta el siguiente comando en un Terminal de Root:

{% highlight bash %}
aptitude install gnome-bluetooth bluetooth bluez bluez-utils blueman
{% endhighlight %}

### The Legend of Zelda: Twilight Princess

Seguidamente, necesitamos una imagen ISO de algún juego para poder emularlo. Descargar juegos de redes para [compartir archivos](http://kickass.to/wii/?field=seeders&sorder=desc) como por ejemplo [The Legend of Zelda: Twilight Princess](http://kickass.to/wii-the-legend-of-zelda-twilight-princess-pal-multi5-t1191745.html) es [ILEGAL](http://www.wiiiso.com/), debes ser dueño de una copia para poder utilizarlo.

Podrás iniciar Dolphin a través del menú Juegos > Dolphin-emu. Una vez allí puedes indicarle la carpeta en donde guardas las ISO haciendo click en Opciones > Configurar > Directorios.

Luego de ésto, te aparecerán en la ventana principal los juegos que tengas guardados en la carpeta que especificaste.

Bien, ahora configuremos el wiimote:

* Asegúrate que el wiimote tiene pilas con suficiente carga.
* Conecta el Adaptador Bluetooth a un puerto usb.
* Conecta el nunchuck al puerto del wiimote.
* Enciende la barra de sensores infrarrojos.
* En la barra de herramientas de Dolphin, haz click sobre el botón de configuración del wiimote. Seguidamente presiona al mismo tiempo los botones 1 y 2 del wiimote para que entre en modo de descubrimiento. Luego presiona "Actualizar", el control vibrará cuando se conecte.
* Finalmente haz doble click sobre el juego de tu preferencia y disfruta!

Acá les dejo algunas fotos de "[The Legend of Zelda: Twilight Princess](http://www.youtube.com/watch?v=F-D_doU8u40)" corriendo sobre Canaima GNU/Linux 3.0.

<div class="picasa">
    <ul class="picasa-album">
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__7.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__11.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__3.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__13.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__5.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__15.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__16.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__17.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__18.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__19.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__20.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__21.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__9.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__23.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__24.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/1586/emulando-el-nintendo-wii-en-canaima-3-0debian-6-0__25.jpg" />
            </a>
        </li>
    </ul>
</div>
