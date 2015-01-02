---
author: martinezfaneyth
language: es
date: 2011-03-21 16:17:10-04:30
layout: post
slug: cunaguaro-y-guacharo-nuevas-aplicaciones-para-canaima-gnulinux-3-0
title: 'Cunaguaro y Guácharo: Nuevas aplicaciones para Canaima GNU/Linux 3.0'
wordpress_id: 912
categories:
- Canaima
- Noticias
- Software Libre
tags:
- canaima gnu linux
- cunaguaro
- guacharo
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/912/4145644672e31bb49903f16b865f11a1.jpg
description: Cunaguaro y Guácharo son el nuevo navegador web y cliente de correo de Canaima 3.0
---

En la nueva versión de Canaima 3.0 se incluye un nuevo Navegador Web llamado Cunaguaro, y un nuevo Cliente de Correo llamado Guácharo.

|||
|---|---|
|<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/912/cf7c1311bb0766ac7e1e2824d98b1de5.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/912/cf7c1311bb0766ac7e1e2824d98b1de5.jpg"></span>|<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/912/cd25d1f9da12e703ac00537d0c19beb1.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/912/cd25d1f9da12e703ac00537d0c19beb1.jpg"></span>|

Cunaguaro y Guácharo son paquetes derivados de Iceweasel y Icedove respectivamente. Éstos dos últimos son el navegador web y cliente de correo principales de Debian GNU/Linux, la distribución en la que se basa Canaima.

### Nuevas características

* Mejoras de rendimiento: se han modificado los valores por defecto de las configuraciones de usuario para mejorar la forma en que se cargan las páginas y el tiempo con que la GUI reacciona para brindar mayor rapidez en la experiencia del usuario.
* Añadido el Feed RSS al twitter de Canaima ([@CanaimaGNULinux](http://twitter.com/CanaimaGNULinux)) a la barra de marcadores.
* Añadido el Feed RSS de las noticias del portal Canaima a la barra de marcadores.
* Añadido a los favoritos las páginas principales desde las cuales se puede interactuar con la comunidad.
* Añadido el Plugin "[Adblock Plus](http://addons.mozilla.org/es-ES/firefox/addon/adblock-plus/)", el cual remueve molestos mensaje publicitarios, mejorando la velocidad de carga de las páginas.
* Añadido el Plugin "[Download StatusBar](http://addons.mozilla.org/es-ES/firefox/addon/download-statusbar/)", el cual redirige todas las descargas para que se visualicen en una cómoda y compacta barra de descargas en la parte inferior, permitiendo ver el progreso de las mismas, cancelarlas, reanudarlas, entre otras interesantes funcionalidades.
* Añadido el Plugin "[Hide MenuBar](http://addons.mozilla.org/en-us/firefox/addon/hidemenubar/)", el cual remueve la barra de Menú para ofrecer mayor espacio de visualización, pero se muestra si presionas la tecla ALT.
* Agregada funcionalidad de búsqueda en tres ámbitos de la Plataforma Canaima: El portal principal, las listas y la wiki.
* Imagen y nombres más ajustados a la identidad venezolana.

<!-- more -->

### La razón detrás del cambio

Muchos se preguntarán ¿Por qué el cambio?, al parecer no era algo primordial. Bueno, resulta que desde cierto punto, sí lo era.
Como saben, Canaima 2.1 viene con el navegador Firefox y el cliente de correo Thunderbird, ambos con versiones bastante caducas, incluso arrastradas de versiones anteriores de Canaima. Lo cierto es que esto se hizo mientras Debian todavía los empaquetaba.

Cuando Debian dejó de empaquetarlos, por los conflictos de licencia que todos conocemos, a Canaima se le hizo cada vez más difícil empaquetarlos, hasta llegar al punto que de la versión 2.0.4 a la 2.1, **se dejaron las mismas versiones**.

Para Canaima 3.0 había que tomar una decisión, ante la imposibilidad de empaquetar Firefox y Thunderbird: había que cambiarnos de navegador y cliente de correo por unos que estuviesen más disponibles. Lo primero que nos pasó por la mente fueron Iceweasel y Icedove, de Debian GNU/Linux.

Sin embargo, había que asegurar que la transición fuese suave, y la resistencia al cambio fuese lo más baja posible ... los nombres e imágenes de esos programas no ayudaban mucho. Entonces se nos ocurrió hacerlos nosotros mismos, basándonos en Iceweasel y Icedove... y así nacieron Cunaguaro y Guácharo.

### ¿Como instalar?

Abre el archivo `/etc/apt/sources.list` con tu editor de textos preferido (con permisos de root) y modifícalo de forma tal que sólo queden las siguientes líneas:

{% highlight bash %}
deb http://repositorio.canaima.softwarelibre.gob.ve/ pruebas usuarios
deb http://universo.canaima.softwarelibre.gob.ve/ squeeze main contrib non-free
{% endhighlight %}

Luego ejecuta los siguientes comandos para instalar Cunaguaro, Guácharo y sus traducciones al español:

{% highlight bash %}
aptitude update
aptitude install cunaguaro cunaguaro-l10n-es-es guacharo guacharo-l10n-es-es
{% endhighlight %}

Listo, con ésto quedará instalado.
