---
author: martinezfaneyth
date: 2012-10-29 14:13:02-04:30
layout: post
slug: ayudanos-a-probar-el-nuevo-instalador-de-canaima-popular-3-1
title: Ayúdanos a probar el nuevo instalador de Canaima Popular 3.1
article_id: 2730
categories:
- Canaima
- Desarrollo
- Software Libre
tags:
- Canaima
- instalador
- pruebas
image: /static/img/posts/2730/ayudanos-a-probar-el-nuevo-instalador-de-canaima-popular-3-1__1.jpg
description: Hemos hecho un nuevo instalador más amigable, intuitivo y eficiente.
---

El instalador es una de las nuevas aplicaciones que se incluyen en Canaima Popular 3.1 y es quizás una de las más importantes. La incorporación de nuevas aplicaciones dentro del CD de Canaima, hizo necesario que se explorara la eliminación de otras aplicaciones menos relevantes. Se tomó la decisión de hacer un instalador desde cero, en un lenguaje popular y ampliamente documentado (python), más completo, robusto y amigable, pero sobre todo: liviano. Esta decisión nos permitió prescindir de los antiguos instaladores de Canaima 3.0 (debian-installer, canaima-instalador-vivo), que en total ocupaban alrededor de 100MB de los 700MB disponibles en un CD.

El nuevo instalador integra varias tecnologías, entre las que podemos mencionar: python-gtk2, python-cairo, python-parted, python-webkit, jquery, multihilos, entre otros. La creación estuvo a cargo de [William Cabrera](http://twitter.com/willicab), [Erick Birbe](http://twitter.com/erickcion) y este servidor, [Luis Martínez](http://twitter.com/luisalejandro).

### ¿Cómo ayudo con las pruebas?

La mejor forma de ayudarnos es instalando Canaima tantas veces y a tantas personas como puedas. Es importante que tu computadora esté conectada a internet. Las instrucciones son sencillas:

Descarga la última imagen ISO de Canaima según la arquitectura de tu computador, desde los enlaces que aparecen abajo (si no conoces la arquitectura, descarga la i386).

[Descargar imagen ISO para arquitectura amd64](http://descargas.canaima.softwarelibre.gob.ve/canaima-popular-3.1~estable_amd64.iso)

[Descargar imagen ISO para arquitectura i386](http://descargas.canaima.softwarelibre.gob.ve/canaima-popular-3.1~estable_i386.iso)

Una vez descargada la imagen ISO, utiliza un programa quemador de CD/DVD como _Brasero_, _K3b_ o _Nero_ (Windows) para grabar la imagen ISO en un CD o DVD. También puedes utilizar un procedimiento similar para grabarlo en un pen-drive, que puedes consultar en [este enlace]({{ site.url }}/como-instalar-canaima-3-0-desde-una-memoria-usb.html).

Después de tener tu CD o DVD con la imagen grabada, insertalo en la bandeja de la unidad CD/DVD y reinicia tu computadora. Tu computador iniciará el sistema operativo que se encuentra en el CD o DVD en vez del sistema operativo que se encuentra en tu disco duro. No hay de que alarmarse, una vez que extraigas el CD o DVD y reinicies tu PC, todo volverá a como estaba antes.

Aparecerá la pantalla de inicio de la imagen, en donde deberás esperar algunos minutos mientras se carga Canaima desde el CD o DVD. Al terminar la carga, aparecerá el escritorio, en donde deberás ejecutar el Terminal de Root (haz click en el menú, luego en Accesorios y luego Terminal de Root) y ejecutar los siguientes comandos:

{% highlight bash %}
aptitude update
aptitude upgrade canaima-instalador
{% endhighlight %}

Normalmente estos comandos no hay que ejecutarlos en una instalación normal de Canaima, pero para este período de pruebas, nos ayudarán a corregir algunos errores.

Seguidamente, ejecutamos el instalador con el siguiente comando dentro de la misma Terminal de Root.

{% highlight bash %}
canaima-instalador
{% endhighlight %}

Las instrucciones en pantalla son bastante intuitivas. Síguelas con atención y observa todos los detalles que puedas. Si detectas un comportamiento inesperado, necesitamos que nos avises para que podamos corregirlo. La mejor manera de avisarnos es a través de nuestro sistema de reporte de tickets.

Para poder reportar un ticket, necesitas tener una cuenta en la plataforma colaborativa del proyecto Canaima. Si no posees una, puedes crear una rápidamente a través del [siguiente enlace](http://registro.canaima.softwarelibre.gob.ve/NewUserForm.php). Si ya tienes una cuenta, autentícate en el sistema de tickets a través de [este enlace](http://trac.canaima.softwarelibre.gob.ve/canaima/login) para que puedas [reportar el error](http://trac.canaima.softwarelibre.gob.ve/canaima/).

Dentro del reporte de error, cuéntanos que estabas haciendo cuando ocurrió el error, qué te salió y cuál es el error en sí. Es **muy importante** que copies de la terminal la mayoría de las líneas de error y las pegues al final del reporte de ticket, nos ayudará mucho a resolver el problema.

### Descripción general

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2730/ayudanos-a-probar-el-nuevo-instalador-de-canaima-popular-3-1__2.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2730/ayudanos-a-probar-el-nuevo-instalador-de-canaima-popular-3-1__1.jpg"></span>

El nuevo instalador posee una pantalla de selección para la distribución del teclado con una ilustración que refleja la selección actual. Seguidamente, encontraremos la pantalla de selección del disco y método de instalación; en esta pantalla se puede elegir dentro de una serie de opciones disponibles según las condiciones del disco seleccionado, a saber:

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2730/ayudanos-a-probar-el-nuevo-instalador-de-canaima-popular-3-1__4.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2730/ayudanos-a-probar-el-nuevo-instalador-de-canaima-popular-3-1__5.jpg"></span>

**Instalar usando todo el disco**: estará disponible en la mayoría de los casos, a excepción de cuando el disco tenga una capacidad inferior al espacio mínimo necesario (6GB). Esta opción borrará todas las particiones existentes en el disco (junto con los datos) e instalará Canaima en todo el disco.

**Instalar redimensionando /dev/sdXY para liberar espacio**: esta opción estará disponible cuando exista una partición que esté habilitada para cambiar de tamaño y que además tenga 6GB o más de espacio sin ocupar. En este caso, Canaima se instalará en el espacio liberado.

**Instalar en el espacio libre de XGB**: estará disponible cuando exista un espacio libre mayor o igual a 6GB. El espacio libre se utilizará para instalar Canaima.

**Instalar particionando manualmente**: estará disponible cuando el tamaño del disco sea mayor o igual a 6GB. Esta opción permitirá crear, borrar, redimensionar, formatear (entre otras operaciones) tantas particiones como el usuario desee, sin necesidad de utilizar un programa externo.

Si se selecciona "Instalar usando todo el disco" o "Instalar usando espacio libre de XGB", la siguiente pantalla será una barra de desplazamiento que permitirá decidir cuanto espacio libre se dejará contiguo a la instalación de Canaima (o en su defecto usar todo el espacio). La misma pantalla también permite elegir cómo se particionará el disco (separando /home, /boot, /var, /usr, entre otros).

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2730/ayudanos-a-probar-el-nuevo-instalador-de-canaima-popular-3-1__6.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2730/ayudanos-a-probar-el-nuevo-instalador-de-canaima-popular-3-1__7.jpg"></span>

Si se selecciona "Instalar redimensionando /dev/sdXY para liberar espacio", la siguiente pantalla también presentará una barra de desplazamiento que permitirá decidir cuanto se reducirá la partición para hacer espacio para la instalación de Canaima. También permite elegir cómo se particionará el disco.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2730/ayudanos-a-probar-el-nuevo-instalador-de-canaima-popular-3-1__8.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2730/ayudanos-a-probar-el-nuevo-instalador-de-canaima-popular-3-1__9.jpg"></span>

Si se selecciona "Instalar particionando manualmente", la siguiente pantalla presentará un cuadro con las particiones existentes y el espacio libre (de existir) junto con un conjunto de botones que permitiran editar las particiones según las necesidades del usuario.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2730/ayudanos-a-probar-el-nuevo-instalador-de-canaima-popular-3-1__10.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2730/ayudanos-a-probar-el-nuevo-instalador-de-canaima-popular-3-1__11.jpg"></span>

La pantalla siguiente es la de la información de usuario. Se le preguntará por sus contraseñas, su nombre real, su nombre de usuario y algunas configuraciones adicionales. Seguidamente, la pantalla de resúmen y luego la instalación como tal. La instalación tarda entre 10 y 15min en un equipo de prestaciones medias.

Al terminar la instalación, revisa que todo esté en orden y échanos el cuento!
