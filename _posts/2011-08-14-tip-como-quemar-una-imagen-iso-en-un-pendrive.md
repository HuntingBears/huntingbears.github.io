---
author: martinezfaneyth
date: 2011-08-14 22:15:04-04:30
layout: post
slug: tip-como-quemar-una-imagen-iso-en-un-pendrive
title: 'Tip: Cómo quemar una imagen ISO en un pendrive'
article_id: 1822
categories:
- Minipost
- Software Libre
- Tips
tags:
- quemar iso en USB
- Software Libre
- tips
image: /static/img/posts/1822/tip-como-quemar-una-imagen-iso-en-un-pendrive__1.jpg
description: Una imagen ISO puede ser grabada en un dispositivo óptico (CD, DVD) o un pendrive.
---

Es bastante sencillo. Luego de que hayas descargado tu imagen ISO preferida (dependiendo de la [arquitectura de tu procesador]({{ site.url }}/tip-como-identificar-si-un-procesador-soporta-64bits.html)), utiliza una Terminal de Root (Aplicaciones > Accesorios > Terminal de Root) para ejecutar el siguiente comando:

{% highlight bash %}
dd if=[imagen] of=[dispositivo]
{% endhighlight %}

en donde imagen es la ruta completa a la imagen ISO que deseas grabar y dispositivo la ruta completa hacia el pendrive, por ejemplo:

{% highlight bash %}
dd if=/home/huntingbears/Descargas/debian-testing-i386-businesscard.iso of=/dev/sdb
{% endhighlight %}

¿No sabes cuál es la ruta completa a tu pendrive? [Acá te enseño]({{ site.url }}/tip-como-identificar-la-ruta-al-disco-usb-que-acabas-de-conectar.html).
