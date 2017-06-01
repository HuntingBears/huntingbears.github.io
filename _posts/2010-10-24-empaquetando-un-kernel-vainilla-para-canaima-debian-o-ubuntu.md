---
author: martinezfaneyth
date: 2010-10-24 04:56:00-04:30
layout: post
slug: empaquetando-un-kernel-vainilla-para-canaima-debian-o-ubuntu
title: Empaquetando un Kernel Vainilla para Canaima, Debian o Ubuntu
article_id: 371
categories:
- Desarrollo
- Software Libre
tags:
- empaquetar
- kernel vainilla
- make-kpkg
image: http://huntingbears.com.ve/static/img/posts/371/empaquetando-un-kernel-vainilla-para-canaima-debian-o-ubuntu__1.jpg
description: El kernel Linux es el principal componente del sistema operativo. Aprende a generar uno actualizado para tu distribución con este artículo.
---

**Kernel Vainilla:** Código fuente del kernel Linux obtenido directamente de kernel.org.

Éste documento persigue crear un instrumento que le permita a cualquier usuario obtener, configurar, compilar, crear e instalar un kernel vainilla.

### Descarga

Primeramente, ubicamos y descargamos el código fuente de la versión del kernel que deseemos compilar. Un criterio útil para la elección de la versión del kernel es tomar como referencia las versiones de los kernels "stable", "testing" e "inestable" de la Distribución Debian. Por ejemplo, si queremos compilar un kernel para la rama "pruebas" de Canaima GNU/Linux, deberíamos descargar las fuentes de un kernel muy cercano al actual de la rama "testing" de Debian, que para el momento de la redacción de éste documento es el 2.6.32. Una vez decidida la versión de kernel a descargar, procedemos a hacerlo desde la siguiente dirección web:

[http://kernel.org/](http://kernel.org)

Ésta página contiene los kernels Linux desarrollados por Linus Torvalds y su equipo a través del tiempo. Comúnmente se les denominan "Kernels Vainilla".

Antes de continuar, instalemos las herramientas que necesitaremos para éste procedimiento. para ello, ejecutemos con permisos de superusuario la siguiente línea en consola:

{% highlight bash %}
aptitude install build-essential make kernel-package
{% endhighlight %}

El siguiente paso es descomprimir los archivos fuentes en el directorio de tu preferencia. Lo puedes realizar con las siguientes líneas en consola dependiendo del caso.

Si descargaste el archivo .tar.bz2:

{% highlight bash %}
tar -xvjf linux-X.X.XX.tar.bz2
{% endhighlight %}

Si descargaste el archivo .tar.gz:

{% highlight bash %}
tar -xvzf linux-X.X.XX.tar.gz
{% endhighlight %}

Accede al directorio creado en el paso anterior:

{% highlight bash %}
cd linux-X.X.XX/
{% endhighlight %}

### Configuración

Lo primero que debemos hacer para preparar el código fuente para la compilación es limpiar las fuentes. Aunque para unas fuentes recién descomprimidas no es necesario, es una buena práctica. Ésto lo hacemos con la siguiente línea en consola:

{% highlight bash %}
make mrproper
{% endhighlight %}

Seguidamente debemos configurar las fuentes para decidir cuáles características tendrá nuestro nuevo kernel. Entre éstas Características tenemos:

* Arquitectura del entorno de Hardware (i386, amd64, etc..).
* Módulos (drivers) incluidos dentro del kernel.
* Optimizaciones puntuales de rendimiento.
* Opciones de depuración para desarrolladores.
* Opciones especiales para hardware específico.

Para hacer ésto, el mejor método es copiar las opciones de cofiguración del kernel en donde se está trabajando y en base a ella, modificar las opciones deseadas. Ésto lo hacemos con la siguiente línea en consola:

{% highlight bash %}
make oldconfig
{% endhighlight %}

Éste comando tomará la configuración del kernel residente, y en caso de haber opciones nuevas o faltantes (por la diferencia de versiones), se le preguntará al usuario qué desea hacer con ellas.

Una vez culminado éste proceso, podemos editar manualmente la configuración del kernel con la siguiente línea en consola, según tu preferencia.

{% highlight bash %}
make config
{% endhighlight %}

Método basado en texto bastante simple, pero poco amigable. No necesita paquetes adicionales.

{% highlight bash %}
make menuconfig
{% endhighlight %}

Método basado en texto con mejoras en la usabilidad. Necesita las librerías ncurses. Dependencias (Canaima-Debian): `libncurses-dev`

{% highlight bash %}
make xconfig
{% endhighlight %}

Método gráfico bastante amigable basado en QT. Necesita las librerías qt3. Dependencias (Canaima-Debian): `libqt3-mt-dev`

{% highlight bash %}
make gconfig
{% endhighlight %}

Método gráfico bastante amigable basado en GTK. Necesita las librerías GTK. Dependencias (Canaima-Debian): `libgtk2.0-dev libglib2.0-dev libglade2-dev`

### Compilación y Empaquetamiento

Finalizada la configuración, es hora de compilar y empaquetar nuestro kernel. Para ello haremos uso de la herramienta `make-kpkg` (kernel-package), una herramienta de la distribución Debian que facilita ampliamente el procedimiento.

Configuremos la herramienta para satisfacer nuestras necesidades:

En el archivo `/etc/kernel-pkg.conf` se encuentran dos parámetros de interés, que debemos editar para colocar nuestros datos personales. Éstos son `maintainer` e `email`.

El archivo `/usr/share/kernel-package/Control` contiene información importante acerca de los paquetes que serán generados al finalizar éste procedimiento.

El archivo `/usr/share/kernel-package/changelog` contiene el historial de cambios realizados al paquete.

Una vez completados éstos requerimientos, podemos ejecutar make-kpkg. Existen diversos paquetes que ésta herramienta puede compilar, y que pueden ser visualizados a través del comando `make-kpkg --targets`. Por ahora sólo requerimos de la imagen principal de kernel (`linux-image-X.X.XX-X-XXX`) y las cabeceras (`linux-headers-X.X.XX-X-XXX`). Este procedimiento tarda aproximadamente 1 Hora en una máquina promedio, sin embargo ésto depende directamente de la capacidad de procesamiento del equipo. Iniciamos la compilación con la siguiente línea en la consola (como superusuario):

{% highlight bash %}
make-kpkg --initrd kernel_image kernel_headers
{% endhighlight %}

Éste comando puede ser personalizado para agregar funcionalidades a los paquetes generados:

{% highlight bash %}
make-kpkg --initrd --append-to-version="-1-686-canaima" --revision="2.6.32+15" --pgpsign="XXXX" binary
{% endhighlight %}

En éste ejemplo, podemos hacer notar lo siguiente:

* `--append-to-version`: Ésta opción permite añadir una cadena de texto que permitirá sub-versionar el paquete generado, además de personalizarlo a gusto del desarrollador. Es importante conocer que ésta cadena de texto formará parte del nombre del paquete final.
* `--revision`: Ésta opción tambien permite sub-versionar el paquete, sólo que ésta cadena no formará parte del nombre del paquete.
* `--pgpsign`: Permite firmar el paquete con tu clave pgp personal.
* `binary`: Es un parámetro que compila todos los paquetes que la herramienta puede compilar.

Al final de éste procedimiento tendremos varios paquetes .deb ubicados en el directorio superior al que nos encontramos. Para éste ejemplo sólo tendremos en cuenta `linux-image-2.6.32.15-1-686-canaima_2.6.32+15_i386.deb` y `linux-headers-2.6.32.15-1-686-canaima_2.6.32+15_i386.deb`.

### Instalación

Para instalar el nuevo kernel, ejecutamos las siguientes líneas:

{% highlight bash %}
dpkg -i linux-image-2.6.32.15-1-686-canaima_2.6.32+15_i386.deb
dpkg -i linux-headers-2.6.32.15-1-686-canaima_2.6.32+15_i386.deb
{% endhighlight %}

Reinicia y disfruta de tu nuevo kernel.
