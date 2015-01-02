---
author: martinezfaneyth
language: es
date: 2011-09-20 13:50:12-04:30
layout: post
slug: creando-un-metapaquete-a-la-canaima-con-canaima-desarrollador
title: Creando un metapaquete 'a la canaima' con Canaima Desarrollador
wordpress_id: 1794
categories:
- Canaima
- Debian
- Desarrollo
- Software Libre
tags:
- canaima desarrollador
- empaquetamiento
- metapaquetes
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/1794/417fc1e6d23200fc66dfd6842c4a7925.jpg
description: Canaima Desarrollador permite realizar Metapaquetes muy fácilmente.
---

Como usuario de alguna distribución GNU/Linux, seguramente has oído/leído acerca de los **metapaquetes**, esos paquetes que no pesan mucho pero que instalan un montón de cosas. Si bien el concepto detrás de un metapaquete es bastante sencillo, son piezas clave en la construcción organizada y engranaje de subsistemas dentro de una distribución GNU/Linux.

Por ejemplo, imagínate por un instante que queremos incorporar una nueva línea de ensamblaje de computadores a nuestra fábrica "_Bien Barato Electrónica_". Si pudieras de alguna forma comprar la línea completa a través de un nombre o marca, en vez de comprar los tornillos, las tuercas, las cintas rodantes, los rodillos, los tubos, los brazos robóticos, los cables, etc. y armarla tu mismo, entonces eso sería instalar un metapaquete dentro de tu distribución "_Bien Barato Electrónica_".

En definitiva, un metapaquete es un paquete que sirve para instalar otro conjunto de paquetes a través de sus dependencias. Generalmente está **casi** vacío (es decir, no se copian archivos al sistema cuando se instala); sin embargo, si está bien construido, siempre se incluye una pequeña documentación (changelog, copyright, entre otros).

<!-- more -->

### Estructura de un metapaquete

Tomemos un momento para detenernos a observar la estructura de un metapaquete. Tal como los paquetes comunes, los metapaquetes deben ser generados a partir de un código fuente basado en las [políticas de Debian](http://www.debian.org/doc/debian-policy/ch-source.html). No te asustes, no es tan complicado como suena. La mayoría de los detalles que describiré no tendrás que reproducirlos tu mismo "a mano", existen asistentes que automatizan esta tarea; sin embargo, no está demás describirlos para que tengas una idea.

En resumen, la estructura es más o menos la siguiente:

{% highlight text %}
metapaquete
    |-- AUTHORS                (opcional)
    |-- COPYING                (opcional)
    |-- debian
    |    |-- changelog
    |    |-- compat
    |    |-- control
    |    |-- copyright
    |    |-- postinst
    |    |-- postrm
    |    |-- preinst
    |    |-- prerm
    |    |-- rules
    |    `-- source
    |        `-- format
    |-- LICENSE                (opcional)
    |-- Makefile               (opcional)
    |-- README                 (opcional)
    |-- THANKS                 (opcional)
    `-- TODO                   (opcional)
{% endhighlight %}

La carpeta debian contiene los siguientes archivos:

* `changelog` [↗](http://www.debian.org/doc/debian-policy/ch-source.html#s-dpkgchangelog): Lista cronológica de versiones del metapaquete, que además contiene una descripción significativa de los cambios hechos en cada una de ellas.
* `compat` [↗](http://www.debian.org/doc/manuals/maint-guide/dother.en.html#compat): versión de debhelper utilizada.
* `control` [↗](http://www.debian.org/doc/debian-policy/ch-controlfields.html): El archivo más importante en un metapaquete. Especifica las dependencias, el nombre del paquete, el responsable (mantenedor), descripción, entre otros campos.
* `copyright` [↗](http://www.debian.org/doc/debian-policy/ch-source.html#s-dpkgcopyright): Declaración de derechos de autor (si los hubiere) y licencia de distribución del paquete.
* `postinst, postrm, preinst, prerm` [↗](http://www.debian.org/doc/debian-policy/ch-maintainerscripts.html): Los scripts del mantenedor permiten configurar o modificar partes del sistema en diferentes momentos de la instalación del paquete.
* `rules` [↗](http://www.debian.org/doc/manuals/maint-guide/dreq.en.html#defaultrules): El archivo rules especifica las reglas para el empaquetado de la aplicación.
* `source/format` [↗](http://www.debian.org/doc/manuals/maint-guide/dother.en.html#sourcef): Especifica el formato del código fuente, el más recomendado es _3.0 (quilt)_.

Los siguientes son archivos opcionales que pueden o no ser incluidos a gusto del desarrollador. Normalmente se incluyen, pero en el caso de los metapaquetes no hay código que compilar, ni copiar dentro del paquete (que es para lo que sirve el Makefile), ni tampoco hay código que documentar o describir.

* `AUTHORS`: Contiene el o los autores del código fuente.
* `COPYING`: Declaración de derechos de autor (si los hubiere) y licencia de distribución del código fuente.
* `LICENSE`: Una copia exacta de la licencia con que se distribuye el código fuente.
* `Makefile`: Son el conjunto de instrucciones necesarias para que el código fuente se organice, (compile si es necesario) e instale en el sistema. También contiene instrucciones para limpiar y desinstalar.
* `README`: Descripción detallada del software. Se responden preguntas como: ¿Para que sirve? ¿Cómo se instala? ¿Cómo se desinstala? ¿Donde consigo ayuda?
* `THANKS`: Agradecimientos a las personas que contribuyeron contigo.
* `TODO`: Cosas que quisieras hacer en el futuro con tu software.

### Empaquetando 'a la canaima'

[Canaima Desarrollador](http://huntingbears.com.ve/canaima-desarrollador-herramienta-para-el-desarrollo-y-empaquetamiento-de-software-libre.html) es una herramienta relativamente nueva, introducida en la versión 3.0 de Canaima, orientada a facilitar la apropiación del conocimiento relacionado con la creación de paquetes. Es bastante versátil y en éste artículo la utilizaremos para crear un metapaquete 'a la canaima'.

Para instalarlo nos vamos a una terminal con permisos de root (Aplicaciones > Accesorios > Terminal de Root) y ejecutamos el siguiente comando:

{% highlight bash %}
aptitude install canaima-desarrollador
{% endhighlight %}

Una vez instalado, hay que configurarlo tal cual se explica [en este artículo](http://huntingbears.com.ve/canaima-desarrollador-herramienta-para-el-desarrollo-y-empaquetamiento-de-software-libre.html) (sección "_Configurando Canaima Desarrollador_").

Para crear nuestro metapaquete utilizaremos el ayudante `crear-proyecto`, para ello nos ubicamos en la carpeta del desarrollador (la que especificamos en la variable `DEV_DIR` de la configuración) y ejecutamos el siguiente comando:

{% highlight bash %}
c-d crear-proyecto --nombre="metapaquete-ejemplo" --version="1.0+0" --destino="personal" --licencia="gpl3"
{% endhighlight %}

En donde:

* `--nombre`: nombre del paquete (se recomienda sólo usar caracteres alfanuméricos, guiones y guiones bajos).
* `--version`: versión inicial del paquete (recomendación: usar el formato X.Y+Z).
* `--destino`: puede ser _personal_ (el mantenedor del paquete serás tu) o _canaima_ (el mantenedor será el equipo de desarrollo de Canaima).
* `--licencia`: puede ser apache, artistic, bsd, gpl, gpl2, gpl3, lgpl, lgpl2 ó lgpl3.

Al presionar _enter_ se desplegará la siguiente información, indicando que se ha creado el paquete fuente con los datos proporcionados, y además se ha hecho el primer _commit_ bajo el [sistema de versionamiento git](http://huntingbears.com.ve/guia-basica-de-desarrollo-con-git.html).

{% highlight text %}
Iniciando Canaima Desarrollador ...
Nombre del Paquete: metapaquete-ejemplo
Versión: 1.0+0
Mantenedor: Luis Alejandro Martínez Faneyth
Correo del Mantenedor: martinez.faneyth@gmail.com
Licencia: gpl3
Repositorio git inicializado
Definiendo "git@gitorious.org:canaima-gnu-linux/metapaquete-ejemplo.git" como repositorio git "origin"
Repositorios establecidos
[master (root-commit) 8cf3369] Versión inicial de metapaquete-ejemplo-1.0+0 para Canaima GNU/Linux
35 files changed, 2014 insertions(+), 0 deletions(-)
create mode 100644 AUTHORS
create mode 100644 COPYING
create mode 100644 LICENSE
create mode 100644 Makefile
create mode 100644 README
create mode 100644 THANKS
create mode 100644 TODO
create mode 100644 debian/changelog
create mode 100644 debian/compat
create mode 100644 debian/control
create mode 100644 debian/copyright
create mode 100644 debian/docs
create mode 100644 debian/ejemplos/README.Debian
create mode 100644 debian/ejemplos/README.source
create mode 100644 debian/ejemplos/emacsen-install.ex
create mode 100644 debian/ejemplos/emacsen-remove.ex
create mode 100644 debian/ejemplos/emacsen-startup.ex
create mode 100644 debian/ejemplos/init.d.ex
create mode 100644 debian/ejemplos/manpage.1.ex
create mode 100644 debian/ejemplos/manpage.sgml.ex
create mode 100644 debian/ejemplos/manpage.xml.ex
create mode 100644 debian/ejemplos/menu.ex
create mode 100644 debian/ejemplos/metapaquete-ejemplo.cron.d.ex
create mode 100644 debian/ejemplos/metapaquete-ejemplo.default.ex
create mode 100644 debian/ejemplos/metapaquete-ejemplo.doc-base.EX
create mode 100644 debian/ejemplos/postinst.ex
create mode 100644 debian/ejemplos/postrm.ex
create mode 100644 debian/ejemplos/preinst.ex
create mode 100644 debian/ejemplos/prerm.ex
create mode 100644 debian/ejemplos/watch.ex
create mode 100755 debian/postinst
create mode 100755 debian/postrm
create mode 100755 debian/preinst
create mode 100755 debian/prerm
create mode 100755 debian/rules
create mode 100644 debian/source/format
¡Proyecto metapaquete-ejemplo creado!
Lee los comentarios en los archivos creados para mayor información
{% endhighlight %}

Como vemos, la estructura generada es muy parecida a la descrita anteriormente, con la adición de una carpeta llamada ejemplos, en donde se encuentran varias muestras de scripts comunes (que deben ser borrados si no se van a utilizar).

Bien, seguidamente modificamos el archivo debian/control para incluir las dependencias del metapaquete para que quede más o menos así:

{% highlight control %}
Source: metapaquete-ejemplo
Section: unknown
Priority: extra
Maintainer: Luis Alejandro Martínez Faneyth
Build-Depends: cdbs, debhelper (>= 7.0.50~)
Standards-Version: 3.9.1

Package: metapaquete-ejemplo
Architecture: all
Depends: dependencia-a, dependencia-b, dependencia-c, dependencia-d, ${shlibs:Depends}, ${misc:Depends}
Description: Metapaquete de ejemplo
 Esto es un ejemplo didáctico de como crear un metapaquete
 con canaima-desarrollador.
{% endhighlight %}

Limpiamos un poco las cosas innecesarias:

{% highlight bash %}
rm -rf debian/docs debian/ejemplos
{% endhighlight %}

Y ya estamos listos para empaquetar (estando dentro de la carpeta fuente del metapaquete):

{% highlight bash %}
c-d empaquetar --mensaje="Agregando las dependencias para metapaquete-ejemplo."
{% endhighlight %}

Normalmente, antes de empaquetar hay que realizar una serie de pasos (agregar una nueva entrada en el changelog, crear el paquete fuente _.orig.tar.gz_ y _.debian.tar.gz_, hacer push al repositorio git, entre otros); sin embargo, canaima-desarrollador ya hace todo eso por ti. Por ejemplo, el parámetro `--mensaje` es utilizado para el mensaje del commit de los cambios hechos al paquete (si no hay cambios no se subirá la versión), y este a su vez es utilizado para incluir el mensaje de los cambios en el changelog a través de la aplicación `git-dch`. Es posible que el `git push` falle si tu usuario no tiene los permisos apropiados en el repositorio remoto o el repositorio no existe, sin embargo esto no afectará en la creación del paquete.

Al finalizar el proceso, podrás encontrar el paquete .deb, los paquetes fuentes y el log de empaquetamiento en sus respectivas carpetas (ver variables `DEPOSITO_DEBS`, `DEPOSITO_SOURCES` y `DEPOSITO_LOGS` en el archivo de configuración de canaima-desarrollador).

Un metapaquete también puede servir para aplicar configuraciones a través de los scripts del mantenedor (postinst, postrm, preinst y prerm), más adelante escribiré acerca de las mejores prácticas en ese sentido.

Espero te haya sido útil. Cualquier pregunta que tengas, no dudes en hacerla.
