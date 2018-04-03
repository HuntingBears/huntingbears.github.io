---
author: martinezfaneyth
date: 2011-05-20 21:25:13-04:30
layout: post
slug: tutorial-como-actualizar-a-canaima-3-0-desde-canaima-2-1
title: 'Tutorial: Cómo actualizar a Canaima 3.0 desde Canaima 2.1'
article_id: 1131
categories:
- Canaima
- Desarrollo
- Software Libre
tags:
- 2.1 a 3.0
- actualizar canaima
- tutorial
image: /static/img/posts/1131/tutorial-como-actualizar-a-canaima-3-0-desde-canaima-2-1__1.jpg
description: La actualización de Canaima 2.1 a Canaima 3.0 no es trivial. Aquí te lo explicamos.
---

El día de hoy, nuestro compañero [Carlos Guerrero](http://twitter.com/guerrerocarlos) hizo público un tutorial para lograr hacer una migración directa de Canaima 2.1 a Canaima 3.0. Dicho tutorial forma parte del desarrollo del asistente de actualización automatizado que será liberado próximamente para que cualquier usuario pueda actualizar cómodamente a Canaima 3.0.

Es importante que sepas que éste es un procedimiento intermedio - avanzado que todavía está en período de pruebas  y que **podría** dejar tu sistema operativo inutilizado. Síguelo con precaución.

### Requisitos

* Tener una conexión a internet.
* Tener 3GB de espacio libre en disco.
* Tener Canaima 2.1.
* Tener de 1 a 2 horas de tiempo libre.

### Fase 1: Preparación de Canaima 2.1

Primeramente, abrimos una consola con permisos de administrador en el menú Aplicaciones > Accesorios > Terminal de Root (debes conocer la contraseña de administrador o de root para poder ejecutar este paso).

Utilizando algún editor de texto de consola como vim, nano o gedit, cambia el contenido del archivo `/etc/apt/sources.list` para que luzca de la siguiente manera:

{% highlight bash %}
#
# Repositorios de Canaima GNU/Linux
#

# Repositorio Estable
deb http://repositorio.canaima.softwarelibre.gob.ve/ aponwao usuarios

# Repositorio de la Base (Debian)
deb http://universo.canaima.softwarelibre.gob.ve/ lenny main contrib non-free
{% endhighlight %}

Obtenemos las últimas actualizaciones disponibles para Canaima 2.1:

{% highlight bash %}
aptitude update
apt-get autoclean
aptitude --assume-yes full-upgrade
{% endhighlight %}

Instalamos el navegador galeon como navegador temporal de transición:

{% highlight bash %}
aptitude install --assume-yes galeon
{% endhighlight %}

Removemos la configuración por defecto de GRUB:

{% highlight bash %}
rm /etc/default/grub
{% endhighlight %}

Removemos software no necesario en Canaima 3.0:

{% highlight bash %}
apt-get purge --force-yes -y openoffice* firefox* thunderbird* canaima-instalador-vivo canaima-particionador
{% endhighlight %}

Removemos paquetes obsoletos.

{% highlight bash %}
apt-get autoremove --force-yes -y
{% endhighlight %}

### Fase 2: Actualizando Software de Instalación

En esta fase, comenzaremos a actualizar las herramientas de instalación y algunas otros componentes básicos (aptitude, apt, dpkg, locales y debian-keyring).

Debemos cambiar el contenido del archivo `/etc/apt/sources.list` para que tenga el siguiente contenido:

{% highlight bash %}
#
# Repositorios de Canaima GNU/Linux
#

# Repositorio de la Base (Debian)
deb http://universo.canaima.softwarelibre.gob.ve/ squeeze main contrib non-free
{% endhighlight %}

También el contenido del archivo `/etc/apt/preferences` debe decir lo siguiente:

{% highlight control %}
Package: *
Pin: release o=Debian
Pin-Priority: 800
{% endhighlight %}

Actualizamos los repositorios de software y limpiamos cualquier paquete huérfano que quede por ahí:

{% highlight bash %}
aptitude update
apt-get autoclean
{% endhighlight %}

Actualizamos finalmente los componentes básicos:

{% highlight bash %}
aptitude install --assume-yes aptitude apt dpkg debian-keyring locales --without-recommends
apt-get -f install
{% endhighlight %}

Actualizamos el Kernel, junto con las librerías de Perl:

{% highlight bash %}
aptitude install --assume-yes linux-image-2.6.32-5-686 perl libperl5.10
{% endhighlight %}

Acá debemos reiniciar la computadora y asegurarnos de iniciar con el último kernel instalado (linux-image-2.6.32-5-686).

### Fase 3: Actualizando Gestor de Dispositivos

Nos aseguramos de que no hay ningún paquete roto o mal instalado:

{% highlight bash %}
apt-get --force-yes -y -f install
{% endhighlight %}

Instalamos la nueva versión del UDEV (Gestor de Dispositivos):

{% highlight bash %}
aptitude install --assume-yes udev
{% endhighlight %}

Volvemos a reiniciar la computadora e iniciamos con el último kernel.

### Fase 4: Actualización del Sistema Base

Ésta es una de las fases más importantes, ya que se actualiza el sistema base de Canaima (Debian Squeeze). También es uno de los más largos, porque se descarga gran cantidad de contenido.

Actualizamos software específico relacionado con la configuración:

{% highlight bash %}
aptitude --assume-yes install gconf2=2.28.1-6 libgconf2-4=2.28.1-6 gconf2-common=2.28.1-6
{% endhighlight %}

Actualizamos los repositorios:

{% highlight bash %}
apt-get --force-yes -y update
{% endhighlight %}

Hacemos una actualización simple:

{% highlight bash %}
apt-get --force-yes -y upgrade
{% endhighlight %}

Luego una actualización parcial:

{% highlight bash %}
apt-get --force-yes -y dist-upgrade
{% endhighlight %}

Y finalmente la actualización completa:

{% highlight bash %}
aptitude --assume-yes full-upgrade
{% endhighlight %}

Volvemos a reiniciar la computadora.

### Fase 5: Actualización completa

Debemos cambiar el contenido del archivo `/etc/apt/sources.list` para que tenga el siguiente contenido:

{% highlight bash %}
#
# Repositorios de Canaima GNU/Linux
#

# Repositorio de Pruebas
deb http://repositorio.canaima.softwarelibre.gob.ve/ roraima usuarios

# Repositorio de la Base (Debian)
deb http://universo.canaima.softwarelibre.gob.ve/ squeeze main contrib non-free
{% endhighlight %}

También el contenido del archivo `/etc/apt/preferences` debe decir lo siguiente:

{% highlight control %}
Package: *
Pin: release o=Canaima
Pin-Priority: 900

Package: *
Pin: release o=Debian
Pin-Priority: 100
{% endhighlight %}

Removemos configuraciones obsoletas:

{% highlight bash %}
rm /etc/skel/.purple/accels /etc/skel/.purple/accounts.xml /etc/skel/.purple/blist.xml /etc/skel/.purple/status.xml
{% endhighlight %}

Actualizamos el repositorio de software:

{% highlight bash %}
aptitude update
apt-get autoclean
{% endhighlight %}

Instalamos las llaves del repositorio para la nueva versión:

{% highlight bash %}
aptitude install canaima-llaves
{% endhighlight %}

Removemos software obsoleto:

{% highlight bash %}
aptitude purge --assume-yes epiphany-browser epiphany-browser-data libgraphviz4 libslab0 gtkhtml3.14 busybox-syslogd dsyslog inetutils-syslogd rsyslog socklog-run sysklogd syslog-ng libfam0c102
{% endhighlight %}

Actualizamos la paquetería de Canaima 3.0:

{% highlight bash %}
aptitude install --assume-yes canaima-escritorio-gnome
{% endhighlight %}

Removemos software innecesario:

{% highlight bash %}
aptitude purge --assume-yes galeon canaima-accesibilidad
{% endhighlight %}

Actualizamos por completo toda la paquetería:

{% highlight bash %}
aptitude --assume-yes full-upgrade
{% endhighlight %}

Removemos software obsoleto:

{% highlight bash %}
aptitude purge --assume-yes gstreamer0.10-gnomevfs splashy
{% endhighlight %}

Forzamos la instalación de la nueva versión de GDM:

{% highlight bash %}
aptitude install --assume-yes gdm3
{% endhighlight %}

Forzamos la instalación de BURG:

{% highlight bash %}
aptitude install --assume-yes burg
{% endhighlight %}

Reinstalamos algunos paquetes:

{% highlight bash %}
aptitude reinstall --assume-yes canaima-base
aptitude reinstall --assume-yes canaima-estilo-visual
aptitude reinstall --assume-yes canaima-escritorio-gnome
{% endhighlight %}

Reconfiguramos el estilo visual:

{% highlight bash %}
dpkg-reconfigure canaima-estilo-visual
{% endhighlight %}

Actualizamos la configuración del BURG:

{% highlight bash %}
update-burg
{% endhighlight %}

Forzamos el uso de la nueva versión de GDM:

{% highlight bash %}
echo "/usr/sbin/gdm3" > /etc/X11/default-display-manager
{% endhighlight %}

Por última vez, reinicia la computadora y ... ¡Disfruta de tu Canaima 3.0!

Por favor cuéntame cómo te fué para que podamos seguir mejorando el asistente de actualización. ¡Gracias!
