---
author: martinezfaneyth
date: 2011-11-09 23:12:34-04:30
layout: post
slug: haciendo-mirrors-de-debian-con-ftpsync-y-de-canaima-con-debmirror
title: Haciendo mirrors de Debian con ftpsync y de Canaima con debmirror
article_id: 2041
categories:
- Canaima
- Debian
- Software Libre
- Tutoriales
tags:
- debmirror
- ftpsync
- mirror
image: http://huntingbears.com.ve/static/img/posts/2041/haciendo-mirrors-de-debian-con-ftpsync-y-de-canaima-con-debmirror__1.jpg
description: Hacer mirrors locales de rus distribuciones favoritas permite agilizar los procesos de desarrollo, entre otros beneficios.
---

Muchas veces se hace útil tener una copia idéntica ([mirror](http://www.debian.org/mirror/)) del repositorio de paquetes [Debian](ftp://ftp.us.debian.org/debian/) y [Canaima](http://repositorio.canaima.softwarelibre.gob.ve/) en tu computadora: Acelera la instalación de paquetes, la creación de imágenes con canaima-semilla y permite tener un ambiente pruebas en caso de que manejes un repositorio en ambientes de producción.

Hacerlo no es tan difícil y requiere muy poca atención luego de realizado el procedimiento. Eso sí, el tiempo que utilizaremos inicialmente dependerá de tu velocidad de conexión. Podrás elegir cuales arquitecturas replicar y decidir si incluir las fuentes de los paquetes o no.

### Mirror Debian

1. Descarga el script [ftpsync](http://ftp-master.debian.org/ftpsync.tar.gz).
2. Crea un usuario en la computadora o servidor que utilizarás para hospedar el mirror. Para este ejemplo utilizaremos el usuario "mirror".
3. Inicia sesión con ese usuario. Puedes hacerlo con el comando `login mirror`.
4. Copia y descomprime el `ftpsync.tar.gz` en la carpeta `/home/` del usuario mirror. Aparecerá una carpeta etc, una bin, y otra log.
5. Cambia el nombre del archivo `etc/ftpsync.conf.sample` a `etc/ftpsync.conf`.
6. Edita el archivo `etc/ftpsync.conf` de la siguiente forma:
    * Descomenta la variable `MIRRORNAME`.
    * Descomenta la variable `TO` y le vas a poner de valor la ruta donde quieres que se haga el mirror, preferiblemente algo que pueda ver un servidor web como "/var/www", para este ejemplo utilizaremos `/var/www/debian`. Es importante que esa carpeta pertenezca al usuario que creaste para el mirror.
    * Descomenta la variable `RSYNC_PATH` y ponle "debian".
    * Descomenta la variable `RSYNC_HOST` y ponle "[ftp.us.debian.org](ftp://ftp.us.debian.org/)" o cualquier otro mirror del cual quieras hacer tu mirror, siempre y cuando se le pueda acceder por ftp.
    * Descomenta la variable `LOGDIR`.
    * Descomenta la variable `LOG`.
    * Descomenta la variable `ERRORSONLY` y ponle "false".
    * Descomenta la variable `FULLLOGS` y ponle "true".
    * Descomenta la variable `ARCH_EXCLUDE` y lista las arquitecturas que quieres excluir. Si quieres excluir las fuentes añades "source". Por ejemplo, en canaima sólo hacemos mirror de i386, amd64 y las fuentes, por lo que esa variable vale: "alpha arm armel hppa hurd-i386 ia64 kfreebsd-amd64 kfreebsd-i386 m68k mipsel mips powerpc s390 sh sparc".
    * Descomenta la variable `TRACE`.
    * Descomenta la variable `RSYNC` y ponle "rsync".
    * Descomenta la variable `RSYNC_OPTIONS`.
    * Descomenta la variable `RSYNC_OPTIONS1`.
    * Descomenta la variable `RSYNC_OPTIONS2`.
7. Finalmente, configura un cron para que se corra a determinadas horas. Edita el archivo `/etc/crontab` (como superusuario) y añade esta línea al final:

        30 1 * * * mirror /home/mirror/bin/ftpsync sync:all

    Esta línea correrá el script `/home/mirror/bin/ftpsync sync:all` por el usuario mirror todos los días a la 1:30am.

### Mirror Canaima

1. Instala el paquete debmirror.

        aptitude install debmirror

2. Inicia sesión con el usuario mirror que creaste para el mirror Debian.
3. Ejecuta el comando que aparece a continuación. El último parámetro es la ruta donde publicarás el repositorio, la cual debe pertenecer al usuario mirror y estar en un lugar visible para un servidor web como /var/www.

        debmirror --debug --progress --verbose --source --host=repositorio.canaima.softwarelibre.gob.ve --section=usuarios --method=rsync --root=:canaima --dist=estable,desarrollo,pruebas --arch=i386,amd64 --ignore-release-gpg --rsync-options=-aIL /var/www/canaima

4. Finalmente, debemos configurar un cron para que se ejecute a determinadas horas.

    Creemos un script BASH en la ruta `/home/mirror/mirror-canaima.sh` que tenga el siguiente contenido:

        #!/bin/bash

        debmirror --debug --progress --verbose --source --host=repositorio.canaima.softwarelibre.gob.ve --section=usuarios --method=rsync --root=:canaima --dist=estable,desarrollo,pruebas --arch=i386,amd64 --ignore-release-gpg --rsync-options=-aIL /var/www/canaima

5. Edita el archivo /etc/crontab (como superusuario) y añade esta línea al final:

        30 1 * * * mirror /home/mirror/mirror-canaima.sh

    Esta línea correrá el script `/home/mirror/mirror-canaima.sh` por el usuario mirror todos los días a la 1:30am.

### ¿Cómo usarlos?

Bien, una vez creados los mirrors, tenemos varias formas de usarlos e incluso, compartirlos con nuestros amigos.

Para usarlo localmente, podemos sustituir nuestro tradicional mirror debian en nuestro archivo `/etc/apt/sources.list`:

{% highlight bash %}
deb http://universo.canaima.softwarelibre.gob.ve/ squeeze main contrib non-free
{% endhighlight %}

por:

{% highlight bash %}
deb file:/var/www/debian main contrib non-free
{% endhighlight %}

Y nuestro repositorio Canaima:

{% highlight bash %}
deb http://repositorio.canaima.softwarelibre.gob.ve/ roraima usuarios
{% endhighlight %}

por:

{% highlight bash %}
deb file:/var/www/canaima roraima usuarios
{% endhighlight %}

Para permitir que otros puedan acceder a nuestros mirrors, debemos instalar un servidor web como apache, lighttpd o nginx.

Instalemos apache:

{% highlight bash %}
aptitude install apache2
{% endhighlight %}

Listo, dile a tus compañeros que usen la siguiente línea para el mirror Debian:

{% highlight bash %}
deb http://TU-DIRECCIÓN-IP/debian main contrib non-free
{% endhighlight %}

o esta para el mirror Canaima:

{% highlight bash %}
deb http://TU-DIRECCIÓN-IP/canaima roraima usuarios
{% endhighlight %}

¡Espero que te haya servido!
