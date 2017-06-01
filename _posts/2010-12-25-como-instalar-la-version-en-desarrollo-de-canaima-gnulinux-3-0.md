---
author: martinezfaneyth
date: 2010-12-25 00:49:18-04:30
layout: post
slug: como-instalar-la-version-en-desarrollo-de-canaima-gnulinux-3-0
title: Como instalar la versión en desarrollo de Canaima GNU/Linux 3.0
article_id: 396
categories:
- Canaima
- Desarrollo
- Software Libre
tags:
- canaima 3.0
- canaima gnu linux
- desarrollo
image: http://huntingbears.com.ve/static/img/posts/396/como-instalar-la-version-en-desarrollo-de-canaima-gnulinux-3-0__1.jpg
description: La versión en desarrollo de Canaima 3.0 puede instalarse fácilmente.
---

### ACTUALIZACIÓN

**Éste artículo es antiguo, ya que a partir del 05/05/2011, Canaima GNU/Linux 3.0 fue declarado como estable. Te recomiendo que saltes al Método III directamente.**

Como saben, trabajo en el desarrollo de la nueva versión de [Canaima GNU/Linux](http://canaima.softwarelibre.gob.ve) en el [CNTI](http://www.cnti.gob.ve), cosa que me está consumiendo gran parte de mi tiempo actual. En ese sentido, puedo comentar que la nueva versión trae muchas mejoras tecnológicas, que resuelven gran parte de los problemas presentados en versiones anteriores. La mayoría de éste adelanto se debe a que Canaima 3.0 se basa en Debian Squeeze, la versión de pruebas de ésta gran distribución; aunado al hecho de la incorporación de paquetes con alto nivel de desarrollo tecnológico propios de Canaima GNU/Linux y su comunidad.

### ¿Que hay de nuevo, viejo?

Dentro de los beneficios específicos de ésta nueva versión tenemos:

* Soporte para la mayoría de los dispositivos USB inalámbricos que no eran soportados out-of-the-box por Canaima 2.1.
* Cunaguaro 3.6.13: Navegador web basado en Iceweasel 3.6.13, optimizado para aprovechar mejor los recursos del sistema e integrado con la plataforma comunitaria de Canaima.
* Guacharo 3.1.7: Cliente de Correo basado en Icedove 3.1.7.
* [LibreOffice](http://es.wikipedia.org/wiki/LibreOffice): Versión de OpenOffice libre de la influencia de la empresa privada Oracle.
* [Turpial](http://turpial.org.ve): Cliente de Twitter/Identi.ca desarrollado por venezolanos.
* Nuevo estilo visual basado en el tema Equinox, iconos Faenza, Plymouth como indicador de arranque y nuevos fondos de escritorio.
* Nuevas aplicaciones preinstaladas: Deluge (Gestor de descargas por Torrent), emesene (cliente de mensajería instantánea), exaile (Reproductor de música), shotwell (visor de imágenes) y simple-scan (Gestor de escáneres).
* Nuevo esquema de empaquetamiento, con las mejores prácticas existentes, basado en [git-buildpackage]({{ site.url }}/guia-de-empaquetamiento-con-git-buildpackage-para-canaima-debian-o-ubuntu.html).
* Generación de imágenes ISO's con canaima-semilla, una herramienta propia basada en el proyecto Debian Live.
* Medios vivos instalables con versiones para CD, DVD y dispositivos de almacenamiento extraíble.
* Gestor de arranque BURG, una versión mejorada del GRUB.
* Optimización del sistema de arranque, mediante la implementación de readahead, prelink, preload, arranque basado en dependencias, postergación del DHCP y la eliminación de demonios de inicio innecesarios **(bootea entre 10 a 15 segundos según el hardware)**.

Sin embargo, no está demás advertirtelo: **es una versión en desarrollo, cabe la posibilidad de que tu Canaima Estable se rompa**. No me hago responsable por las pérdidas de datos que ésto pueda ocasionar, pero si estoy dispuesto a ayudarte por ésta vía para solucionar tu (eventual) problema. En caso de emergencia, haz un comentario y te responderé.

Todo eso se oye muy chévere, pero ... ¿Puedo echarle un vistazo antes de probarlo?

¡Por supuesto! Puedes ver algunas capturas de pantalla del [escritorio](http://twitpic.com/3it5u1), del [BURG](http://twitpic.com/3iex8z), del [plymouth](http://twitpic.com/3jltfa) y del [libreofice](http://twitpic.com/3jk8me) pa' que te vayas enamorando.

Para comenzar, te recomiendo que desinstales los paquetes que enumero a continuación, ya que causan conflictos con los paquetes de Canaima 3.0. Basta con hacer un aptitude purge "paquete".

* openoffice.org (todos los paquetes)
* iceweasel
* icedove

### Método I: Migrando de Canaima 2.1 a 3.0

Antes que nada debemos cambiar la forma en que el sistema escoge la preferencia de repositorios. Cambiemos el archivo `/etc/apt/preferences` para que diga lo siguiente:

{% highlight bash %}
Package: *
Pin: release o=Canaima
Pin-Priority: 900

Package: *
Pin: release o=Debian
Pin-Priority: 100
{% endhighlight %}

Para ello abre un terminal con permisos de root y edítalo con tu editor de textos preferido, de la siguiente forma:

{% highlight bash %}
gedit /etc/apt/preferences
{% endhighlight %}

Como saben, Canaima 2.1 está basada en Debian Lenny, por lo que pasarse a la versión en desarrollo de Canaima implica descargar toda la paquetería nueva de Debian Squeeze, más los paquetes de Canaima 3.0.

Para hacer ésto debemos hacerlo en dos partes:

Primero actualicemos la base Debian, para ello debemos editar nuestro archivo sources.list. Abrir un terminal con permisos de root y escribir el siguiente comando:

{% highlight bash %}
gedit /etc/apt/sources.list
{% endhighlight %}

Modifica la línea que dice:

{% highlight bash %}
deb http://universo.canaima.softwarelibre.gob.ve/ lenny main contrib non-free
{% endhighlight %}

por:

{% highlight bash %}
deb http://universo.canaima.softwarelibre.gob.ve/ squeeze main contrib non-free
{% endhighlight %}

Luego ejecuta los siguientes comandos:

{% highlight bash %}
aptitude update
aptitude full-upgrade
{% endhighlight %}

Ésto te pedirá actualizar muchos paquetes, a tal punto que deberás descargar aproximadamente 1.4GB de datos. Lamentablemente la falta de optimización de Canaima 2.1 en cuanto a cantidad de datos y tamaño (la ISO pesa 1.3GB) causa éste pequeño inconveniente. Afortunadamente, la ISO de la nueva versión de Canaima está pensada para ser lo más minimalista posible y cuando sea liberada, cabrá en un CD.

Una vez terminada la actualización, vamos a proseguir con Canaima. Modifica la línea del archivo `/etc/apt/sources.list` que dice:

{% highlight bash %}
deb http://repositorio.canaima.softwarelibre.gob.ve/ estable usuarios
{% endhighlight %}

por:

{% highlight bash %}
deb http://repositorio.canaima.softwarelibre.gob.ve/ roraima usuarios
{% endhighlight %}

Y ejecuta los siguientes comandos:

{% highlight bash %}
aptitude update
aptitude full-upgrade
{% endhighlight %}

Reinicia tu computador para que puedas notar todos los cambios de la nueva versión.

### Método II: Convirtiendo Debian Squeeze en Canaima 3.0

Éste método es menos traumático, debido a que teniendo la instalada la base de Canaima 3.0 (Debian Squeeze) la cantidad de paquetes que se deben descargar es considerablemente menor.

De nuevo, abre el archivo `/etc/apt/sources.list` y modifícalo de forma tal que sólo queden las siguientes líneas:

{% highlight bash %}
deb http://repositorio.canaima.softwarelibre.gob.ve/ pruebas usuarios
deb http://universo.canaima.softwarelibre.gob.ve/ squeeze main contrib non-free
{% endhighlight %}

Luego ejecuta los siguientes comandos:

{% highlight bash %}
aptitude update
aptitude install canaima-base
{% endhighlight %}

Reinicia tu computador para que puedas notar todos los cambios de la nueva versión.

### Método III: Descargando la imagen e instalándolo

El jueves 05/05/11 se hicieron disponibles las ISO's de la [Versión Estable de Canaima 3.0]({{ site.url }}/lanzamiento-de-canaima-gnulinux-3-0-como-estable.html):

* [Imagen ISO para la arquitectura amd64 (~700MB)](http://descargas.canaima.softwarelibre.gob.ve/canaima-3.0~estable_amd64.iso)
* [Imagen ISO para la arquitectura i386 (~700MB)](http://descargas.canaima.softwarelibre.gob.ve/canaima-3.0~estable_i386.iso)

### Premio

En Canaima 3.0 hay dos [Huevos de Pascua](http://es.wikipedia.org/wiki/Huevo_de_pascua_%28virtual%29), el primero que los encuentre y diga cuales son aquí en éste post, prometo regalarle el primer CD de Canaima 3.0 que se fabrique para su distribución (si está en el interior del país, se lo envío por correo) (abstenerse de participar mis compañeros de trabajo en el CNTI).

Para concluir, les puedo decir que me siento bastante orgulloso de ésta versión, de lo que aprendimos y vivimos en comunidad. No me cabe la menor duda de que a partir de ésta versión, Canaima GNU/Linux agarró el toro por los cachos y ya no es un "Debian pintado de marrón y verde".

### ¡A PROBAR SE HA DICHO!
