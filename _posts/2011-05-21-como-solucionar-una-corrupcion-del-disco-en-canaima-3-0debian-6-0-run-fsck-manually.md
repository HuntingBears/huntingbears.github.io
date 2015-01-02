---
author: martinezfaneyth
language: es
date: 2011-05-21 16:44:45-04:30
layout: post
slug: como-solucionar-una-corrupcion-del-disco-en-canaima-3-0debian-6-0-run-fsck-manually
title: Cómo solucionar una corrupción del Disco en Canaima 3.0/Debian 6.0 (Run fsck manually)
wordpress_id: 1146
categories:
- Canaima
- Educativo
- Software Libre
tags:
- canaima gnu linux
- disco corrupto
- run fsck manually
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/1146/c9cbddb283d7b980f8042863e72b6ee5.jpg
description: A veces, cuando un disco duro no finaliza sesión apropiadamente, algunos datos se corrompen momentáneamente. Aquí se explica como resolver esta falla.
---

De vez en cuando, especialmente luego de una variación brusca en la alimentación de voltaje que llega al disco duro o un "apagado forzado" (cuando mantenemos presionado el boton de apagado), los datos que están almacenados en el disco quedan corruptos.

Entonces, usualmente obtenemos una pantalla parecida a la que mostramos más abajo, que no nos permite acceder al sistema.

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/1146/0ae824a5ff34f481a0636106309c2694.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/1146/c9cbddb283d7b980f8042863e72b6ee5.jpg"></span>

(Captura de pantalla cortesía de los usuarios Felipe y Johan en los comentarios, gracias)

<!-- more -->

Si prestamos atención, en la imagen de arriba observaremos lo siguiente:

> Give root password for maintenaince
> (or type Control-D to continue):

Eso significa "Introduzca el password de root para hacer mantenimiento o presione CTRL+D para continuar". Lo que haremos es introducir la contraseña de root (no te preocupes si no sale nada mientras la escribes, es así) y presionar enter. Aparecerá una línea de comandos en donde introduciremos el siguiente comando que arreglará el disco corrupto:

{% highlight bash %}
fsck -A -y
{% endhighlight %}

Esperaremos a que el proceso culmine y podremos reiniciar la pc con el siguiente comando:

{% highlight bash %}
reboot
{% endhighlight %}

¡Espero les haya sido de utilidad!
