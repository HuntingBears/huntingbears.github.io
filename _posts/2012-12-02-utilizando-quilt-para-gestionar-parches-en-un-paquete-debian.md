---
author: martinezfaneyth
language: es
date: 2012-12-02 17:30:41-04:30
layout: post
slug: utilizando-quilt-para-gestionar-parches-en-un-paquete-debian
title: Utilizando quilt para gestionar parches en un paquete debian
wordpress_id: 2138
categories:
- Canaima
- Debian
- Desarrollo
- Software Libre
tags:
- debian
- parches
- quilt
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/2138/a2de776484d4a02ba0f7bf12208d50ab.jpg
description: Quilt es una herramienta para generar parches de código en los programas.
---

Un mantenedor de paquetes Debian es aquella persona que se encarga de transformar una determinada pieza de software (como por ejemplo una aplicación, un conjunto de scripts, archivos de imágenes, etc.) en otra pieza de software (un paquete) capaz de instalarse a través de un esquema común de instalación. El mantenedor Debian conoce muy bien el sistema operativo, y por tanto, sabe cuáles son los cambios que debe aplicar para hacer que la pieza de software funcione correctamente y de acuerdo a las normas y estándares de la distribución.

Una de las normas de calidad de Debian establece que no se debe tocar directamente el código de la pieza de software proveniente del desarrollador original. Si se debe hacer una modificación, debe hacerse a través de un parche durante el proceso de construcción del paquete. Esto permite aislar los cambios, asegurando que:

1. El conjunto de cambios reflejados en el parche pueden ser enviados a los desarrolladores originales para corregir errores o mejorar procesos.
2. Los cambios pueden ser aplicados a las sucesivas versiones del software, siempre y cuando las líneas afectadas no hayan sido modificadas por los desarrolladores originales.

Para mayor información puedes consultar la [Guía para la creación de parches](http://huntingbears.com.ve/colaborando-en-proyectos-de-codigo-abierto-a-traves-de-parches-git-quilt-diff.html).

En líneas generales, quilt es una herramienta que asiste a un mantenedor de paquetes Debian, ayudando en la gestión de cambios y diferencias con respecto a los desarrolladores originales del software que contiene el paquete en mantenimiento. Permite crear y modificar parches, así como también aplicarlos o desaplicarlos.

Cada paquete Debian que contiene parches posee un archivo series (`debian/patches/series`), el cual almacena el nombre de cada uno de los parches que deben ser aplicados en el momento de construcción del paquete. Si se desea deshabilitar un parche en específico sin borrarlo (para uso posterior), simplemente se borra su nombre del archivo series. Quilt interpreta este archivo como una pila de nombres que pueden ser agregados y/o removidos según su orden de entrada y/o salida.

Para instalarlo, debemos introducir el siguiente comando desde una Terminal de Root (Menú > Aplicaciones > Accesorios > Terminal de Root):

{% highlight bash %}
aptitude install quilt
{% endhighlight %}

<!-- more -->

Antes de comenzar a usar quilt, debemos configurarlo para que utilice siempre la carpeta `debian/patches` que se encuentra dentro de cada paquete. Para hacer esto, desde una Terminal de Usuario (Menú > Aplicaciones > Accesorios > Terminal) ejecuta el siguiente comando:

{% highlight bash %}
echo "QUILT_PATCHES=debian/patches" > ~/.quiltrc
{% endhighlight %}

### Operaciones manuales con quilt

Quilt trabaja dinámicamente dentro del código fuente del paquete. No es necesario hacer copias previas del código, ni mantener el código duplicado, ni mucho menos ejecutar comandos diff, svn o git. El proceso de creación de un parche con quilt es relativamente sencillo y puede ser resumido de la siguiente manera:

1. Notificar a quilt que se va a trabajar con un parche en específico.
2. Trabajar en el parche.
3. Pedirle a quilt que actualice el contenido del parche en cuestión.

Para empezar a trabajar en un parche ejecutamos el siguiente comando en una Terminal de Usuario desde el directorio raíz del proyecto:

{% highlight bash %}
quilt new [NOMBRE]
{% endhighlight %}

Una buena práctica es anteponer una numeración al `[NOMBRE]` del parche y colocar la extensión `.patch`. Este comando creará una nueva entrada en `debian/patches` y se convertirá en el último parche aplicado en la pila. Para comenzar las modificaciones que formarán parte del parche, ubicamos la ruta del primer archivo a editar y hacemos:

{% highlight bash %}
quilt edit [RUTA]
{% endhighlight %}

Este comando lanzará nuestro editor de texto predeterminado para que realicemos las modificaciones. Luego de guardar el archivo, es posible editar tantos archivos como de deban editar para completar el cambio deseado. El parche contendrá todas las modificaciones; sin embargo, se recomienda separar los parches por módulo o por funcionalidad agregada/modificada, para mantener un orden. Siempre es preferible modularizar a hacer un parche gigante.

Cuando se termine la edición de archivos, escribiremos los cambios al parche con el siguiente comando:

{% highlight bash %}
quilt refresh
{% endhighlight %}

Con este comando hemos terminado la creación del parche, sin embargo es bueno saber que el parche ha quedado aplicado.

Si hacemos `quilt applied` podremos ver cuáles son los parches que están aplicados al código fuente. Para desaplicar el último parche de la pila, hacemos `quilt pop`. Esto hará que el próximo parche se ponga en el tope de la pila. Para desaplicar todos los parches que se encuentran el la pila, hacemos `quilt pop -a`.

De forma similar, para aplicar parches uno a uno se hace `quilt push`, y para aplicar todos los parches en la pila, se hace `quilt push -a`.

Para modificar un parche, dicho parche debe estar en el tope de la pila y aplicado. La forma más fácil de hacer esto es desaplicar todos los parches e ir aplicando uno por uno hasta llegar al parche que se desea modificar. También se puede hace `quilt push [NOMBRE]`, si se conoce el nombre exacto del parche. Una vez hecho esto, se hace `quilt edit [RUTA]` para realizar la (o las) modificación(es) necesaria(s) y finalmente, `quilt refresh`.

### Integrando con paquetes

Antes de la aparición de quilt, era necesario gestionar, aplicar y desaplicar parches manualmente durante la construcción de un paquete. Varias rutinas eran necesarias para completar esta tarea completamente, y aunque la lógica era sencilla, muchas veces representaba un dolor de cabeza para quienes se iniciaban en el mantenimiento de paquetes.

Si eres (o piensas ser) mantenedor para Debian, Canaima o Ubuntu, y quieres utilizar quilt para gestionar tus parches, es necesario que realices los siguientes cambios en tus paquetes:

1. Coloca el formato de construcción para el paquete fuente en `3.0 (quilt)`.
2. Añade la dependencia de construcción (Build-Depends) a quilt en el archivo `debian/control`.
3. Construye los parches manualmente como se explicó en este artículo.
4. Recuerda desaplicar todos tus parches antes de construir el paquete.

Cualquier duda, haz la pregunta en los comentarios.
