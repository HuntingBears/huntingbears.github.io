---
author: martinezfaneyth
language: es
date: 2013-09-10 17:30:51-04:30
layout: post
slug: usando-jaulas-interoperables-como-alternativa-a-la-virtualizacion-por-hardware
title: Usando jaulas interoperables como alternativa a la virtualización por hardware
wordpress_id: 4082
categories:
- Desarrollo
- Software Libre
- Tutoriales
tags:
- chroot
- debootstrap
- jaula
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/4082/77d7bdf0573cb95dcbed2d5048c51751.jpg
description: Hacer jaulas interoperables permite aislar las operaciones de desarrollo y pruebas de tu ambiente para uso personal.
---

El título de este artículo puede parecer pomposo, pero no tiene ni una pizca de amarillismo o exageración. Una jaula, desde el punto de vista de desarrollo, es un sistema embebido dentro de otro que permite establecer una comunicación entre los procesos del sistema anfitrión y el huésped, es decir, permite hacerlos interoperables. En debian, tener una jaula (o varias jaulas) permite tener otro sistema operativo encerrado en una carpeta, listo para usar, sin la necesidad de utilizar máquinas virtuales. Incluso, es posible tener un sistema huésped de arquitectura diferente al anfitrión.

En teoría, cualquier sistema operativo que cumpla con los estándares [POSIX](http://es.wikipedia.org/wiki/POSIX) y [LSB](http://es.wikipedia.org/wiki/Linux_Standard_Base) (la mayoría de los GNU/Linux), y que además compartan el mismo tipo de kernel que el sistema anfitrión, puede convertirse en un sistema huésped; por ejemplo, [ArchLinux y Debian](http://sites.google.com/site/uxhakx/debootstrap-on-archlinux-howto), [Gentoo y Debian](http://www.maketecheasier.com/how-to-run-multiple-linux-distros-without-virtualization/2009/08/11), [Canaima y Debian](http://huntingbears.com.ve/tip-como-se-hace-una-jaula-chroot-de-canaima-4-0-desde-debian.html), [CentOS y Debian](http://www.lucas-nussbaum.net/blog/?p=385), [Fedora y Debian](http://blog.parahard.com/2013/03/creating-debian-chroot-inside-fedora.html), entre otros. La única desventaja es que está pensado para propósitos de desarrollo, es decir, para uso por consola (aunque existen guías para [arrancar la interfaz gráfica con Xnest](http://www.tricksfind.in/2011/01/screen-for-chroot.html)).

Los casos de uso para las jaulas son infinitos. Por su capacidad para aislarse del sistema anfitrión, es usado en casos de compilación y empaquetamiento, en donde se hace necesario instalar dependencias que pueden dañar o desconfigurar el sistema anfitrión (que a menudo es nuestro sistema de uso personal y cotidiano), pero al hacerse dentro de la jaula, todo posible daño queda confinado en el sistema huésped.

<!-- more -->

### ¿Cómo se hace una jaula?

Existen varias herramientas para generar y gestionar jaulas, dependiendo del sistema operativo que utilices y el tiempo que dispongas. Las cosas pueden ser tan fáciles como un comando sencillo, o varios comandos al estilo [Linux from Scratch](http://www.linuxfromscratch.org/). Para este caso utilizaremos Debian Sid como sistema Anfitrión y Canaima Kerepakupai (4.0) como huésped, y para asistirnos en la creación y operación de la jaula, usaremos debootstrap y coreutils. Los instalamos así, usando una consola de root del sistema anfitrión:

{% highlight bash %}
aptitude install debootstrap coreutils
{% endhighlight %}

Chroot es una aplicación que engaña al sistema anfitrión, haciéndolo creer que es el sistema huésped para la sesión de consola que se está ejecutando. Por otro lado, deboostrap es un script que automatiza la creación de la jaula, instalando todos los paquetes esenciales que necesita un sistema operativo básico para funcionar. El único detalle con debootstrap es que sólo contiene scripts para un número limitado de versiones de Debian y de Ubuntu. Nosotros resolveremos este problema haciendo un enlace simbólico desde Debian Wheezy a Canaima Kerepakupai en una consola de root, así:

{% highlight bash %}
ln -s /usr/share/debootstrap/wheezy /usr/share/debootstrap/kerepakupai
{% endhighlight %}

Luego ejecutamos debootstrap para crear la jaula dentro de una carpeta que escojamos, diciéndole que no revise las las llaves de las firmas del repositorio (`--no-check-gpg`) y que la arquitectura de la jaula será i386 (`--arch="i386"`):

{% highlight bash %}
mkdir /media/jaulas/kerepakupai-i386
debootstrap --arch="i386" --no-check-gpg kerepakupai /media/jaulas/kerepakupai-i386 http://paquetes.canaima.softwarelibre.gob.ve/
{% endhighlight %}

Terminado este paso, la jaula está lista, pero todavía debemos hacer otras operaciones antes de empezarla a utilizar.

El sistema huésped utilizará el espacio de kernel del sistema anfitrión para obtener las funcionalidades básicas del sistema operativo, sin embargo, para gestionar los dispositivos del sistema (entre otras cosas), necesita tener disponibles algunas otras cosas dentro de la jaula. Para ello hacemos:

{% highlight bash %}
mount -o bind /proc /media/jaulas/kerepakupai-i386/proc
mount -o bind /sys /media/jaulas/kerepakupai-i386/sys
mount -o bind /dev /media/jaulas/kerepakupai-i386/dev
mount -o bind /dev/pts /media/jaulas/kerepakupai-i386/dev/pts
{% endhighlight %}

Estos montajes son del tipo "bind" (enlaces), permitiendo que el comportamiento de `/dev`, `/dev/pts`, `/proc` y `/sys` del sistema anfitrión se replique en el sistema huésped. Además son montajes temporales: si reinicias la computadora, los montajes se perderán y tendrás que volverlos a hacer. Si quieres montajes permanentes deberás editar el archivo `/etc/fstab`.

Ahora estamos listos para ingresar en la jaula con el comando:

{% highlight bash %}
chroot /media/jaulas/kerepakupai-i386
{% endhighlight %}

Al estar dentro, el sistema anfitrión ya no existe, estamos dentro de la jaula _y podemos hacer desastres_.
