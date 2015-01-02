---
author: martinezfaneyth
language: es
date: 2010-10-04 21:42:53-04:30
layout: post
slug: guia-de-empaquetamiento-con-git-buildpackage-para-canaima-debian-o-ubuntu
title: Guía de empaquetamiento con git-buildpackage para Canaima, Debian o Ubuntu
wordpress_id: 261
categories:
- Desarrollo
- Software Libre
tags:
- desarrollo
- empaquetamiento
- git-buidpackage
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/261/6aef055f0aaeeef03358a7e94f662747.jpg
description: Con esta guía podrás entender los elementos básicos para producir paquetes compatibles con Canaima, Debian o Ubuntu.
---


### ESTE ARTÍCULO ESTÁ SIENDO REESCRITO

<!-- @TODO@ -->

En ésta oportunidad y continuando mi [empeño](http://huntingbears.com.ve/guia-basica-de-desarrollo-con-git.html) en promover el uso de [git](http://es.wikipedia.org/wiki/Git), les enseñaré cómo hacer paquetes de software para cualquier distribución basada en Debian (como Canaima o Ubuntu) a partir de un paquete fuente de una aplicación determinada, utilizando una metodología de empaquetamiento basada en `git-buildpackage`. Ésta metodología involucra, como eje fundamental, el sistema de versionamiento git fusionado con la metodología de [empaquetamiento debian debhelper](http://cdbs-doc.duckcorp.org/en/cdbs-doc.xhtml), permitiéndole al desarrollador mantener el [flujo de trabajo](http://blog-luisalejandro.rhcloud.com/static/img/posts/261/6aef055f0aaeeef03358a7e94f662747.jpg) estándar en proyectos de Software Libre, usando una sola herramienta.

### Términos Fundamentales

Para comenzar, primero debemos revisar algunos conceptos que nos ayudarán a desenvolvernos mejor en el ambiente de desarrollo que necesitaremos. Éstos términos serán descritos de forma que cualquiera lo pueda entender, puesto que es la introducción de éste post y a medida que vayas leyendo, el nivel de dificultad irá aumentando. Sin embargo, sólo se escribirá lo necesario para que empaquetes, es decir, nada faltará ni nada sobrará.

<!-- more -->

Un **Paquete Fuente** (comúnmente de extensión .tar.gz) es un paquete comprimido que contiene los archivos fuente de un determinado software. Éstos pueden ser por sí mismos los archivos ejecutables (binarios, scripts, entre otros) o, pueden ser los archivos a través de los cuales se generan los ejecutables mediante de un proceso de compilación que depende directamente del lenguaje en que está escrito el software. Para que éstos archivos ejecutables (y demás archivos de contenido y configuración) sean reconocidos por el Sistema de Gestión de Paquetes de Debian, y gocen del beneficio que esto representa (tanto para el desarrollador como para el Sistema operativo), éstos deben ser agrupados y distribuidos a los usuarios en paquetes binarios (.deb).

Por otra parte, los paquetes fuente (adaptados a Debian GNU/Linux) contienen una carpeta llamada "debian" (nótese las minúsculas), en donde se encuentran diferentes archivos que contienen toda la información necesaria para generar el paquete binario a partir del código fuente. Comúnmente la generación de ésta carpeta (proceso al que se le llama "Debianización del Código Fuente") es la parte más difícil del empaquetamiento, ya que se debe editar manualmente y para ello se debe conocer la estructura del Sistema Operativo (donde va cada tipo de cosa) y la estructura del programa que se desea empaquetar (para qué sirve cada cosa).

Los paquetes fuentes son distribuidos por el desarrollador de la aplicación y por el mantenedor del paquete en las diferentes distribuciones en las que esté disponible. Ejemplo: última versión de [canaima-semilla](http://gitorious.org/canaima-gnu-linux/canaima-semilla/archive-tarball/master).

Los **Paquetes Debian** (.deb), también llamados paquetes binarios, son paquetes que contienen software instalable en sistemas operativos Debian y derivados (Ubuntu, Canaima, etc...). Está compuesto por dos partes fundamentales: **Archivos de Control** y **Archivos de Datos**.

Los Archivos de Control están agrupados en una carpeta llamada "DEBIAN" (nótese las mayúsculas) y contienen la información necesaria para que el sistema de gestión de paquetes instale (control, md5sum) y configure el paquete (preinst, postinst, prerm, preinst); no debe ser confundido con la carpeta debian de los archivos fuente, la carpeta DEBIAN es generada a partir de la carpeta debian en el proceso de empaquetamiento.

Los Archivos de Datos son los archivos binarios, de texto, configuración y de contenido general propios de la aplicación, dispuestos en la estructura de archivos del sistema tal cual van a ser copiados.

Los paquetes binarios son distribuídos por el mantenedor (o empaquetador) de la aplicación en las diferentes distribuciones en las que esté disponible. Ejemplo: última versión de [canaima-semilla](http://gitorious.org/canaima-gnu-linux/canaima-semilla).

Un **Makefile** es un archivo que forma parte de un paquete fuente y que contiene las instrucciones para probar, compilar, instalar, limpiar y desinstalar el software que se distribuye de forma "estática" (no recibe actualizaciones ni se verifican dependencias mediante el sistema de paquetes de Debian). Es generado por el desarrollador del software, quien conoce exactamente como realizar éstas operaciones.

En algunos casos más complejos, se hace necesario hacer un Makefile para distintos propósitos, por lo que se usa otro elemento que a partir de ciertos procedimientos, genera el Makefile automáticamente; éste elemento es el archivo **configure**. El archivo configure es producido por un set de herramientas desarrolladas por el proyecto GNU denominadas autotools (aunque también puede ser generado manualmente). Puedes encontrar mayor información de cómo generar el makefile para tus aplicaciones [aquí](http://wiki.gnome.cl/Autotools_y_amigos), aquí, también [aquí](http://www.ubuntizando.com/2010/07/23/gnu-autotools-aplicaciones-para-todos/) y probablemente [aquí](http://www.gentoo.org/doc/es/articles/autotools-practices.xml) y [aquí](http://crysol.org/es/node/1221) (también [aquí](http://islascruz.org/html/index.php/blog/show/Utilizando_las_autotools_para_configurar_scripts_en_python.html), [aquí](http://listas.velug.org.ve/pipermail/l-desarrollo/2009-November/001111.html), [aquí](http://smalltalk.gnu.org/blog/bonzinip/all-you-should-really-know-about-autoconf-and-automake) y [aquí](http://geus.wordpress.com/2009/03/14/desarrollando-con-gnu-autotools-parte-i/)). Ejemplo: Makefile de [canaima-semilla](http://gitorious.org/canaima-gnu-linux/canaima-semilla/blobs/master/Makefile).

El archivo **rules** de la carpeta debian es un archivo Makefile, que contiene las operaciones a realizar para generar la estructura de los Archivos de Datos de un paquete binario. Generalmente son operaciones comunes de movimiento de archivos, y creación de carpetas; sin embargo, pueden incluirse operaciones más complejas dependiendo de las necesidades del mantenedor del paquete. Recientemente, y gracias al conjunto de scripts debhelper, no es necesario realizar éstas operaciones "a mano" ya que existen "ayudantes" que detectan qué debe hacerse con cuales archivos a partir de la presencia de ciertas instrucciones en la carpeta debian durante el proceso de empaquetado. Puedes ampliar la información [aquí](http://manpages.ubuntu.com/manpages/lucid/man7/debhelper.7.html). Ejemplo: Archivo rules de [canaima-semilla](http://gitorious.org/canaima-gnu-linux/canaima-semilla/blobs/master/debian/rules).

Suficientes términos por ahora, ¡manos a la obra!

### Empezando

Para comenzar, necesitaremos varios insumos, uno de ellos es la descripción de nuestro entorno de trabajo. Estamos trabajando en el sistema operativo Debian Squeeze, sin embargo, ésta guía también es aplicable a sistemas operativos basados en Debian Lenny (con ligeras diferencias). Usaremos el paquete canaima-semilla para nuestro ejemplo.

Otra cosa que necesitaremos son herramientas de empaquetamiento. A continuación abran una terminal con permisos de Administrador y ejecuten el siguiente comando:

{% highlight bash %}
aptitude install git-core git-buildpackage dh-make debhelper cdbs
{% endhighlight %}

### Obteniendo el código fuente

Seguidamente obtengamos el código fuente de la aplicación a empaquetar, cosa que podemos hacer de dos formas:

1. Clonando el repositorio git con el comando `gpb-clone`:

        gbp-clone git@gitorious.org:canaima-gnu-linux/canaima-semilla.git

2. O, generando un repositorio git local a partir de un paquete tar.gz:

        mkdir canaima-semilla
        cd canaima-semilla
        git init
        git-import-orig canaima-semilla-1.5+3.orig.tar.gz

Luego de aplicado alguno de los métodos previos, tendremos una carpeta llamada "canaima-semilla", conteniendo nuestro código fuente. Es una buena práctica renombar en ésta etapa la carpeta para que cumpla con el siguiente formato: `[Paquete]-[Versión]+[Revisión]`, para evitarnos problemas más adelante. En el caso de nuestro ejemplo quedaría: `canaima-semilla-1.5+3`.

Por supuesto, si se está empezando a escribir el programa desde cero, los métodos anteriores no son válidos, ya que ya tendríamos las fuentes en nuestro computador. En ese caso, simplemente posicionate en la carpeta raíz de tu proyecto y haz [tu primera versión con git](http://huntingbears.com.ve/guia-basica-de-desarrollo-con-git.html).

### Debianizando el código fuente

Suponiendo que nuestro paquete no contiene la carpeta debian (generalmente se incluye) o que estamos haciendo un desarrollo nuevo (y no ha sido empaquetado antes), necesitaremos realizar éste trabajo por nosotros mismos mediante el comando `dh_make` (debhelper). También, aunque ya tengamos la carpeta debian en nuestro código fuente, éste comando nos permite generar automáticamente una copia de las fuentes modificadas con el sufijo `.orig`, el cual es un elemento que será utilizado como insumo en un proceso posterior del empaquetado.

Como precaución, es recomendable declarar las siguientes variables de entorno antes de ejecutar el comando `dh_make`, para asegurarnos de identificarnos bien.

{% highlight bash %}
export DEBFULLNAME="[nombre completo del mantenedor]"
export DEBEMAIL="[correo del mantenedor]"
{% endhighlight %}

Estando dentro de la carpeta del paquete fuente, ejecutaremos el siguiente comando:

{% highlight bash %}
dh_make --createorig --cdbs --copyright [licencia] --email [correo]
{% endhighlight %}

En donde:

* `--createorig`: creará una copia de la carpeta donde se encuentra el código fuente, añadiendo el sufijo .orig. Ésto servirá para regenerar el paquete fuente en etapas posteriores del proceso.
* `--cdbs`: le dirá al proceso que vamos a utilizar el Common Debian Build System, por lo que incluirá algunas plantillas útiles en la carpeta debian.
* `--copyright`: especificará bajo cual licencia publicaremos nuestro software.
* `--email`: identificará el código fuente con nuestro correo.

Para nuestro ejemplo haremos:

{% highlight bash %}
dh_make --createorig --cdbs --copyright gpl3 --email lmartinez@gmail.com
{% endhighlight %}

Una vez finalizado el proceso, tendremos unas fuentes debianizadas. Sin embargo, ahora hay que adaptarlas a las necesidades del paquete binario que queremos construir. Examinemos lo que ha puesto `dh_make` en la carpeta debian por nosotros:

{% highlight text %}
changelog
compat
control
copyright
cron.d.ex
docs
emacsen-install.ex
emacsen-remove.ex
emacsen-startup.ex
init.d.ex
manpage.1.ex
manpage.sgml.ex
manpage.xml.ex
menu.ex
postinst.ex
postrm.ex
preinst.ex
prerm.ex
prueba.cron.d.ex
prueba.default.ex
prueba.doc-base.EX
README.source
README.Debian
rules
source
watch.ex
{% endhighlight %}

Cada uno de éstos archivos son utilizados por algún ayudante de [debhelper](http://manpages.ubuntu.com/manpages/lucid/man7/debhelper.7.html) para construir el paquete. Su configuración es bastante [intuitiva](http://www.debian.org/doc/maint-guide/ch-dreq.es.html#rules), sin embargo proporcionamos algunos ejemplos:

* `debian/control`: Este archivo controla el nombre del paquete fuente, el nombre del paquete binario, en qué sección va el paquete, quién es el responsable (aquí podemos definir también co-responsables), si el paquete reemplaza a otro, sugerir y/o recomendar otras cosas y definir dependencias (tanto en fuentes como en binarios). [Más información...](http://www.debian.org/doc/maint-guide/ch-dreq.es.html#control)
* `debian/changelog`: En este archivo verás el paquete, la versión+revisión Debian, repositorio y la urgencia, algo como canaima-semilla (1.5+3) desarrollo; urgency=low. Donde 1.5 es la versión del programa, +3 es la revisión de Debian, desarrollo es el repositorio al que deberías subirlo y urgency=low establece cuánto tiempo pasará en paquete en «desarrollo» antes de que se intente migrar a «pruebas» («low» significa 10 días), normalmente usarás el valor «low», aunque «medium» y «high» también están disponibles. [Más información...](http://www.debian.org/doc/maint-guide/ch-dreq.es.html#changelog)
* `debian/copyright`: En este archivo debes especificar el autor original, el lugar desde el que descargaste el software, y la licencia del programa. [Más información...](http://www.debian.org/doc/maint-guide/ch-dreq.es.html#copyright)
* `debian/docs`: Este archivo incluye los documentos que se copiarán a `/usr/share/doc/paquete` cuando se instale. Deben incluirse uno por línea.
* `debian/compat`: Este archivo determina el nivel de compatibilidad con debhelper. Actualmente el nivel recomendado es 7.

### Realizar cambios al código fuente

Ésta etapa es bastante flexible y depende en su totalidad de la persona que lo haga. Aquí se harán los cambios que el desarrollador considere de acuerdo con sus objetivos (corregir errores, agregar funcionalidades, entre otros). Usará las herramientas que considere necesarias e incorporará y modificará los archivos que desee sin ningún tipo de restricción, siempre y cuando lo haga dentro de la carpeta de trabajo e incorpore las nuevas reglas (si las hubiera) en los archivos de construcción e instalación del paquete (`Makefile`, `debian/rules`, etc).

### Versionar los cambios

Una vez realizados los cambios, y se considere que son suficientes como para que constituyan una nueva versión de nuestro paquete, es tiempo de versionar el nuevo estado de tu proyecto. Para ello utilizaremos el flujo de trabajo natural de git, que describimos en un post anterior, para luego plasmar los cambios en el archivo debian/changelog mediante el comando [git-dch](http://honk.sigxcpu.org/projects/git-buildpackage/manual-html/gbp.html). Éste comando se encargará de recopilar todos los commits nuevos que se han hecho desde la última versión y usará todos sus mensajes para llenar el archivo debian/changelog con una nueva entrada.

Como precaución, es recomendable declarar las siguientes variables de entorno antes de ejecutar el comando `git-dch`, para asegurarnos de identificarnos bien.

{% highlight bash %}
export DEBFULLNAME="[nombre completo del mantenedor]"
export DEBEMAIL="[correo del mantenedor]"
{% endhighlight %}

Ejecutamos en el directorio base, el siguiente comando:

{% highlight bash %}
git-dch --release --auto --id-length=7 --full
{% endhighlight %}

En donde:

* `--release`: indica que es una nueva versión y que es definitiva (si en cambio usamos `--snapshot`, se considerará como una versión temporal)
* `--auto`: indica que se adivinará el número de la versión a partir de la entrada anterior.
* `--id-length=N`: es el número de caracteres del código del commit que se incluirán.
* `--full`: le indicará que debe incluir todo el mensaje del commit y no un extracto del mismo.

Si por casualidad hemos ejecutado éste comando sin tener commits nuevos, la nueva entrada del `debian/changelog` será rellenada con la palabra "UNRELEASED", la cual desaparecerá en el próximo ciclo de versionamiento.

### Generar el paquete fuente

Para generar el paquete fuente, necesitamos añadir los cambios a la rama upstream, la cual es usada como rama "fuente". Si no está disponible debemos crearla con el comando git branch upstream. Para añadir los cambios debemos fusionar la rama master con la upstream de la siguiente forma:

{% highlight bash %}
git checkout upstream
git merge master
git checkout master
{% endhighlight %}

El siguiente paso es generar la carpeta .orig.tar.gz que va a ser utilizada para generar el paquete fuente, a través de dh-make:

{% highlight bash %}
dh_make --createorig --cdbs --copyright [licencia] --email [correo]
{% endhighlight %}

Seguidamente, creamos el paquete fuente en cuestión, excluyendo el directorio git:

{% highlight bash %}
cd ..
dpkg-source --format="1.0" -i.git/ -I.git -b canaima-semilla-1.5+3
{% endhighlight %}

### Publicar los cambios

En ésta etapa, es hora de hacer saber a los demás que existe una nueva versión del código fuente, y la mejor forma de hacerlo es a través de un repositorio público como github o gitorious.

{% highlight bash %}
git push origin master upstream
{% endhighlight %}

### Generar el paquete binario

Finalmente podemos generar nuestro paquete binario. Para ello ejecutamos el siguiente comando:

{% highlight bash %}
git-buildpackage -k[llave] -tc --git-tag -j[N]
{% endhighlight %}

En donde:

* `-k`: especifica la llave pública GPG con que se firmará el paquete.
* `-tc`: limpia el directorio base de los residuos de la construcción del paquete.
* `--git-tag`: crea una etiqueta que agrupa todos los commits de una determinada versión.
* `-j[N]`: permite utilizar un número `[N]` de hilos para ejecutar el proceso. Se recomienda que N sea el número de procesadores más uno.

Si el proceso culmina satisfactoriamente, correrá lintian para indicarnos si hay alguna discrepancia con las normas de empaquetamiento de debian.

Si el proceso se interrumpe, es una buena práctica crear el tag para evitar errores al correr `git-dch` en el próximo ciclo. Ejecuta `git-buildpackage --git-tag-only` para asignar el tag sin volver a intentar construir el paquete.

### Hoja Resumen del flujo de trabajo

{% highlight bash %}
git add .
git commit --all
git-dch --release --auto --id-length=7 --full
(directorio renombrado)
cd ../nuevo-directorio/
git commit --all
git checkout upstream
git merge master
git checkout master
git push origin master upstream
dh_make --createorig --cdbs --copyright [licencia] --email [correo]
cd ..
(para crear las fuentes formato 1.0)
dpkg-source --format="1.0" -i.git/ -I.git -b nuevo-directorio
cd nuevo-directorio
git push gitorious master upstream
git-buildpackage -k[llave] -tc --git-tag -j[N]
{% endhighlight %}

¡Feliz Empaquetado!
