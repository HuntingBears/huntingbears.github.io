---
author: martinezfaneyth
language: es
date: 2011-08-14 22:10:38-04:30
layout: post
slug: tip-como-identificar-la-ruta-al-disco-usb-que-acabas-de-conectar
title: 'Tip: Cómo identificar la ruta al Disco USB que acabas de conectar'
wordpress_id: 1823
categories:
- Minipost
- Software Libre
- Tips
tags:
- disco usb
- Software Libre
- tips
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/1823/ad2580ce1e4b0e2030caa8b38a8bf54c.jpg
description: Acá te enseñamos como identificar la ruta en el sistema de un Disco USB.
---

Te voy a dar un truco que te informará la ruta completa que identifica al Disco USB que acabas de conectar.

En una Terminal de Root (Aplicaciones > Accesorios > Terminal de Root) ejecuta el siguiente comando ANTES de haber insertado el pendrive:

{% highlight bash %}
fdisk -l > ANTES
{% endhighlight %}

Seguidamente, inserta el Disco USB y una vez que se monte (es decir, puedas abrir su contenido), ejecuta el siguiente comando en la misma terminal:

{% highlight bash %}
fdisk -l > DESPUES
{% endhighlight %}

Luego:

{% highlight bash %}
diff -ruN ANTES DESPUES | grep +/dev | grep \* | awk '{print $1}' | cut -c2-9
{% endhighlight %}

Resultado:

{% highlight bash %}
/dev/sdb
{% endhighlight %}

¡Voilà!
