---
author: martinezfaneyth
date: 2011-09-03 22:25:39-04:30
layout: post
slug: comandos-inteligentes-para-los-que-les-gusta-hacer-todo-por-consola
title: Comandos inteligentes para los que les gusta hacer todo por consola
article_id: 1908
categories:
- Educativo
- Minipost
- Software Libre
- Tips
tags:
- bash
- consola
- Software Libre
image: http://huntingbears.com.ve/static/img/posts/1908/comandos-inteligentes-para-los-que-les-gusta-hacer-todo-por-consola__1.jpg
description: Muchas veces nos gustaría tener comandos a la mano para hacer algún tipo de procesamiento de información.
---

Generalmente uno está buscando referencias de bash para hacer cosas pequeñas y puntuales. En una de esas búsquedas me topé con ésta página:

[http://www.commandlinefu.com/](http://www.commandlinefu.com/)

Es un compendio de comandos publicados por personas que consideran que han construido algo útil e inteligente, por ejemplo:

Capturar video de la pantalla

{% highlight bash %}
ffmpeg -f x11grab -s wxga -r 25 -i :0.0 -sameq /tmp/out.mpg
{% endhighlight %}

Enviar la entrada de un micrófono local a la corneta de una PC remota

{% highlight bash %}
dd if=/dev/dsp | ssh -c arcfour -C username@host dd of=/dev/dsp
{% endhighlight %}

Actualizar twitter

{% highlight bash %}
curl -u user:pass -d status="Tweeting from the shell" http://twitter.com/statuses/update.xml
{% endhighlight %}

Además, tiene una interesante [api](http://www.commandlinefu.com/site/api).

¿Tienes algunos comandos inteligentes? ¡Publícalos!
