---
author: martinezfaneyth
date: 2011-11-22 21:41:50-04:30
layout: post
slug: haciendo-repositorios-de-paquetes-binarios-con-reprepro
title: Haciendo repositorios de paquetes binarios con reprepro
article_id: 2037
categories:
- Canaima
- Debian
- Desarrollo
- Software Libre
tags:
- canaima gnu linux
- repositorios
- reprepro
image: http://huntingbears.com.ve/static/img/posts/2037/haciendo-repositorios-de-paquetes-binarios-con-reprepro__1.jpg
description: Reprepro es una herramienta que permite generar repositorios de paquetes de forma local.
---

Normalmente, dentro de los procesos involucrados en la creación de sabores o distribuciones derivadas de Canaima (o Debian) necesitamos utilizar paquetes que no se encuentran en repositorios públicos de Debian, Ubuntu u otra distribución porque generalmente son paquetes de [autoría propia]({{ site.url }}/creando-un-metapaquete-a-la-canaima-con-canaima-desarrollador.html), diseñados a nuestras necesidades.

En ese sentido, es buena idea hacer un repositorio local para guardar esos paquetes y así agilizar un poco más los procesos de desarrollo y pruebas de software. Además, si tienes la oportunidad de hacerlo público a través de un servidor web, podrías distribuir tus paquetes a otras personas o incluso [hacer]({{ site.url }}/canaima-semilla-herramienta-para-la-creacion-y-distribucion-de-sabores-canaima.html) un [sabor Canaima]({{ site.url }}/7-dia-debian-creando-tu-propia-distribucion-a-partir-de-canaima-semilla.html).

Primeramente necesitas instalar algunas aplicaciones. En una terminal de root (Aplicaciones > Accesorios > Terminal de Root) escribe el siguiente comando:

{% highlight bash %}
aptitude install reprepro pinentry-qt devscripts apache2
{% endhighlight %}

Una vez instaladas, en la misma terminal de root coloca el siguiente comando para crear el esqueleto del repositorio:

{% highlight bash %}
mkdir -p /var/www/repositorio/conf
{% endhighlight %}

Accede a la carpeta que acabas de crear y abre un archivo nuevo de nombre "distributions" con tu editor de texto favorito. Yo usaré vim.

{% highlight bash %}
cd /var/www/repositorio/conf
vim distributions
{% endhighlight %}

Acá vas a llenar el archivo con los siguientes datos:

* **Origin**: Nombre de la distribución o sabor. Sólo usar caracteres alfanuméricos y guiones, nada de espacios o caracteres especiales (p. ej.: Canaima).
* **Label**: Etiqueta de la distribución o sabor. Generalmente se utiliza el mismo valor de Origin.
* **Codename**: Nombre código de la distribución o sabor (p. ej: `aponwao`, `roraima`, `auyantepui`).
* **Suite**: Nombre del estado de desarrollo de la distribución (p. ej: `estable`, `pruebas`, `desarrollo`).
* **Version**: Versión de la distribución o sabor.
* **Pull**: Distribución desde donde se actualizan los paquetes.
* **Description**: Descripción de la distribución.
* **Architectures**: Arquitecturas soportadas por la distribución o sabor.
* **Components**: Componentes o secciones en las que se divide el repositorio (p. ej: `main`, `contrib`, `non-free`).
* **SignWith**: Código de la [Llave pública GPG]({{ site.url }}/mejorando-la-seguridad-de-tu-identidad-en-internet-con-gnupg.html) o correo asociado con que se firma el repositorio.
* **DebIndices**: Tipos de Índices a generar.

Debes agregar un bloque de éstos por cada estado de desarrollo de la distribución. Por ejemplo, el archivo `conf/distributions` del repositorio de Canaima para 3.0 es el siguiente:

{% highlight control %}
Origin: Canaima
Label: Canaima
Suite: antiguo
Codename: aponwao
Version: 2.1
Pull: estable
Architectures: i386 amd64 source
Components: usuarios
Description: Canaima GNU/Linux
SignWith: repositorios@canaima.softwarelibre.gob.ve
DebIndices: Packages Release . .gz .bz2

Origin: Canaima
Label: Canaima
Suite: estable
Codename: roraima
Version: 3.0
Pull: pruebas
Architectures: i386 amd64 source
Components: usuarios
Description: Canaima GNU/Linux
SignWith: repositorios@canaima.softwarelibre.gob.ve
DebIndices: Packages Release . .gz .bz2

Origin: Canaima
Label: Canaima
Suite: desarrollo
Codename: auyantepui
Version: 3.1
Architectures: i386 amd64 source
Components: usuarios
Description: Canaima GNU/Linux
SignWith: repositorios@canaima.softwarelibre.gob.ve
DebIndices: Packages Release . .gz .bz2
{% endhighlight %}

Cuando hayas armado el archivo `conf/distributions`, colocate en el directorio `/var/www/repositorio`:

{% highlight bash %}
cd /var/www/repositorio
{% endhighlight %}

Y ejecuta el siguiente comando para terminar de crear el esqueleto del repositorio:

{% highlight bash %}
reprepro -VVV export
{% endhighlight %}

Luego el siguiente comando creará los enlaces simbólicos Codename > Suite:

{% highlight bash %}
reprepro -VVV createsymlinks
{% endhighlight %}

Listo, tu repositorio se encuentra listo para que puedas agregarle paquetes.

### Agregando paquetes binarios y fuentes

Para agregar paquetes binarios (.deb) debes ubicarte en la carpeta raíz del repositorio (en nuestro ejemplo `/var/www/repositorio`) y ejecutar el siguiente comando:

{% highlight bash %}
reprepro includedeb [DISTRIBUCIÓN] [PAQUETE]
{% endhighlight %}

En donde `[DISTRIBUCIÓN]` será la rama de desarrollo donde se desea incluir y `[PAQUETE]` la ruta completa a donde se encuentra el paquete .deb dentro de la computadora. Por ejemplo:

{% highlight bash %}
reprepro includedeb auyantepui /home/huntingbears/canaima-desarrollador_3.0-1_all.deb
{% endhighlight %}

Para el caso de los paquetes fuente, el comando es el siguiente:

{% highlight bash %}
reprepro include [DISTRIBUCIÓN] [CHANGES]
{% endhighlight %}

En donde `[DISTRIBUCIÓN]` será la rama de desarrollo donde se desea incluir y `[CHANGES]` la ruta completa a donde se encuentra el archivo `.changes` producto del empaquetamiento (deben estar también en la misma carpeta el resto de los archivos que forman parte de los paquetes fuentes: dsc, .orig.tar.gz, .debian.tar.gz, más el paquete binario .deb). Por ejemplo:

{% highlight bash %}
reprepro include auyantepui /home/huntingbears/canaima-desarrollador_3.0-1_all.changes
{% endhighlight %}

### Eliminando paquetes

Eliminar un paquete de una rama es bastante sencillo:

{% highlight bash %}
reprepro remove [DISTRIBUCIÓN] [PAQUETE]
{% endhighlight %}

En donde `[DISTRIBUCIÓN]` es la rama de desarrollo de donde se desea remover el paquete y `[PAQUETE]` el nombre (sólo el nombre) del paquete que se desea remover. Por ejemplo:

{% highlight bash %}
reprepro remove auyantepui canaima-desarrollador
{% endhighlight %}

### Usando el repositorio

Puedes probar los paquetes binarios del repositorio colocando ésta linea en tu archivo `/etc/apt/sources.list`:

{% highlight bash %}
deb http://localhost/repositorio [DISTRIBUCIÓN] [COMPONENTES]
{% endhighlight %}

En donde `[DISTRIBUCIÓN]` es la rama de desarrollo donde se encuentran los paquetes que deseas probar y `[COMPONENTES]` los componentes que creaste para tu distribución en el archivo `conf/distributions`. Por ejemplo:

{% highlight bash %}
deb http://localhost/repositorio auyantepui usuarios
{% endhighlight %}

También puedes probar los paquetes fuentes del repositorio si agregas la siguiente línea igualmente en tu archivo `/etc/apt/sources.list`:

{% highlight bash %}
deb-src http://localhost/repositorio [DISTRIBUCIÓN] [COMPONENTES]
{% endhighlight %}

Si posees una IP fija o un nombre de dominio asignado a tu computadora o servidor, puedes publicarlo a las demás personas pidiéndoles que agreguen la línea en sus archivos `/etc/apt/sources.list`:

{% highlight bash %}
deb http://TU-DIRECCIÓN-IP/repositorio [DISTRIBUCIÓN] [COMPONENTES]
{% endhighlight %}

ó

{% highlight bash %}
deb http://TU-DOMINIO/repositorio [DISTRIBUCIÓN] [COMPONENTES]
{% endhighlight %}

Saludos a todos, espero les sea de utilidad.
