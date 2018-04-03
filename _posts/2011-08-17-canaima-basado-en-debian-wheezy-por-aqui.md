---
author: martinezfaneyth
date: 2011-08-17 18:40:02-04:30
layout: post
slug: canaima-basado-en-debian-wheezy-por-aqui
title: ¿Canaima basado en Debian Wheezy? ¡Por aquí!
article_id: 1820
categories:
- Canaima
- Desarrollo
- Software Libre
tags:
- canaima 4.0
- debian wheezy
- Software Libre
image: /static/img/posts/1820/canaima-basado-en-debian-wheezy-por-aqui__1.jpg
description: Acá te explicamos como construir un Canaima basado en la versión en pruebas de Debian.
---

**Advertencia:** Lo siguiente es un procedimiento experimental netamente personal que no está directamente vinculado a comunidad o institución alguna en la que participe. Si bien al culminar el procedimiento tendrás un Canaima GNU/Linux basado en la rama testing de Debian, no garantizo que las sucesivas actualizaciones dejen todo tal cual como está, es posible que algunas cosas "se rompan" con el tiempo.

Bien, advertidos todos, a continuación les mostraré un procedimiento que te permitirá utilizar un Canaima GNU/Linux basado en la rama testing de Debian (actualmente Wheezy), la cual es la base a través de la cual se desarrollará Canaima 4.0.

Las versiones mayores de Canaima (2.0, 3.0, 4.0, ...) vienen sincronizadas con las versiones mayores de la distribución padre de Canaima ([Debian](http://debian.org)). Por ejemplo, Canaima 3.0 está basada en Debian 6.0 (codename squeeze), entonces, Canaima 4.0 estará basada en Debian 7.0 (codename wheezy).

Aunque en el ciclo de desarrollo actual, la próxima versión de Canaima es la 3.1, - con muchas mejoras que iremos viendo conforme se avanza el desarrollo -, nada nos impide experimentar un poco con el próximo ciclo de desarrollo.

### Instalando Debian Wheezy

Lo primero que haremos es bajarnos una ISO de Debian Wheezy (una daily build). No necesitaremos mucho, sólo la base, así que descargaremos la "netinstall", que pesa ~200MB.

* [Descargar netinstall para 64bits](http://cdimage.debian.org/cdimage/archive/7.2.0/amd64/iso-cd/debian-7.2.0-amd64-netinst.iso).
* [Descargar netinstall para 32bits](http://cdimage.debian.org/cdimage/archive/7.2.0/amd64/iso-cd/debian-7.2.0-amd64-netinst.iso).
* [No sé si mi computadora es 32Bits o 64Bits]({{ site.url }}/tip-como-identificar-si-un-procesador-soporta-64bits.html)

Una vez descargada, quémala en un CD o DVD con tu programa favorito (yo uso brasero) o, si quieres, también [puedes usar un pendrive]({{ site.url }}/tip-como-identificar-la-ruta-al-disco-usb-que-acabas-de-conectar.html).

Inserta el medio de almacenamiento que hayas elegido y reinicia la computadora para que inicie a través de allí (tal vez necesites modificar el orden de arranque de los dispositivos en la BIOS).

Sigue las instrucciones del instalador normalmente, sólo que cuando llegue a la sección de "Instalación de Aplicaciones" (tasksel), desmarca todas las que vienen seleccionadas por defecto, **nada más queremos el sistema base**.

Finaliza la instalación y reinicia la computadora.

### Convirtiendo Debian en Canaima

Afortunadamente, todavía las cosas "no han cambiado mucho" en Debian Wheezy, lo que nos permite utilizar los mismos paquetes de Canaima 3.0 para instalarlos acá.

Lo primero que hay que hacer es agregar el repositorio de paquetes de canaima a nuestro archivo de fuentes. Con tu editor de texto preferido, edita el archivo `/etc/apt/sources.list` (necesitas permisos de root para hacerlo), de forma que quede de la siguiente manera:

{% highlight bash %}
deb http://repositorio.canaima.softwarelibre.gob.ve/ roraima usuarios
deb http://ftp.us.debian.org/debian wheezy main contrib non-free
{% endhighlight %}

Luego, debemos editar las preferencias del sistema de paquetes, para evitar que las sucesivas actualizaciones de debian sobreescriban algún paquete de canaima. Edita el archivo `/etc/apt/preferences` para que que quede de la siguiente manera:

{% highlight control %}
Package: *
Pin: release o=Canaima
Pin-Priority: 900

Package: *
Pin: release o=Debian
Pin-Priority: 100
{% endhighlight %}

Actualiza las fuentes.

{% highlight bash %}
aptitude update
{% endhighlight %}

Seguidamente, instalaremos algunos paquetes esenciales para la identificación de Canaima:

{% highlight bash %}
aptitude -t roraima -f install base-files=6.0+canaima9 lsb-release=3.2-23.3canaima2
{% endhighlight %}

Ahora, instalemos la base de canaima (sin los paquetes recomendados).

{% highlight bash %}
aptitude install canaima-base --without-recommends
{% endhighlight %}

Chévere, ya tenemos canaima 4.0, pero ahora necesitamos un escritorio. Con ésto instalaremos un escritorio mínimo:

{% highlight bash %}
aptitude install gnome-core gdm3 xserver-xorg-input-all xserver-xorg-video-[MARCA] --without-recommends
{% endhighlight %}

En donde `[MARCA]` es la marca de tu tarjeta de video (puede ser ati, nvidia, intel, entre otras). El driver de video para la mía es `xserver-xorg-video-intel`.

Bien, ahora estamos listos para instalar el estilo visual de Canaima. Primero instalaremos el Plymouth y el BURG:

{% highlight bash %}
aptitude install plymouth plymouth-drm burg burg-themes
{% endhighlight %}

Seguidamente, la base de escritorio:

{% highlight bash %}
aptitude -t roraima -f install desktop-base=6.0.5+canaima9
{% endhighlight %}

Y finalmente, el estilo visual:

{% highlight bash %}
aptitude install canaima-estilo-visual --without-recommends
{% endhighlight %}

Ahora instalemos algunas aplicaciones extra:

{% highlight bash %}
aptitude install update-notifier update-manager-gnome readahead preload prelink xdg-user-dirs-gtk gnome-codec-install gnome-system-monitor gnome-media gnome-screenshot gnome-system-tools modemmanager usb-modeswitch mobile-broadband-provider-info network-manager-gnome ppp apt-xapian-index acpi-support software-properties-gtk gcalctool acpi hibernate gparted mesa-utils synaptic
{% endhighlight %}

Desinstalamos otras que no necesitamos:

{% highlight bash %}
aptitude purge epiphany-browser debian-reference-es debian-reference-en epiphany-browser-data debian-reference-common
{% endhighlight %}

Si queremos instalar iceweasel 6.0, agregamos la siguiente línea al archivo sources.list:

{% highlight bash %}
deb http://mozilla.debian.net/ squeeze-backports iceweasel-beta
{% endhighlight %}

Actualizamos las fuentes:

{% highlight bash %}
aptitude update
{% endhighlight %}


Instalamos iceweasel:

{% highlight bash %}
aptitude install -t squeeze-backports iceweasel
{% endhighlight %}

¿Qué te parece? ¡Te invito a probarlo!
