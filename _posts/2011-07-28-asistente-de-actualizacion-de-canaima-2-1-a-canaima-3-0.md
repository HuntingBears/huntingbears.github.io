---
author: martinezfaneyth
date: 2011-07-28 13:59:20-04:30
layout: post
slug: asistente-de-actualizacion-de-canaima-2-1-a-canaima-3-0
title: Asistente de Actualización de Canaima 2.1 a Canaima 3.0
article_id: 1663
categories:
- Canaima
- Desarrollo
- Software Libre
tags:
- asistente actualizacion
- canaima gnu linux
- Software Libre
image: /static/img/posts/1663/asistente-de-actualizacion-de-canaima-2-1-a-canaima-3-0__1.jpg
description: El equipode desarrollo de Canaima GNU/Linux ha desarrollado un asistente para la actualización de Canaima 2.1 a Canaima 3.0.
---

Es de mi agrado anunciarles que Canaima 2.1 ya cuenta con un Asistente de Actualización completamente automatizado que les permitirá pasar a la versión 3.0 con un mínimo esfuerzo.

Si estás leyendo éste mensaje mientras usas Canaima 2.1, podrás darte cuenta que tienes una actualización disponible en el área de notificación. Instala todas las actualizaciones que encuentres. Luego de las actualizaciones, reinicia tu computador, y pulsa "Actualizar ahora" en la notificación que aparece luego de reiniciar.

Luego de 2 horas (aprox.), podrás disfrutar de Canaima 3.0.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/1663/asistente-de-actualizacion-de-canaima-2-1-a-canaima-3-0__2.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/1663/asistente-de-actualizacion-de-canaima-2-1-a-canaima-3-0__3.jpg"></span>

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/1663/asistente-de-actualizacion-de-canaima-2-1-a-canaima-3-0__4.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/1663/asistente-de-actualizacion-de-canaima-2-1-a-canaima-3-0__5.jpg"></span>

Debes tomar algunas precauciones adicionales:

* Debes tener conexión a internet.
* Tu PC debe estar conectada a una fuente de energía estable.
* Debes tener al menos 6GB de espacio libre en disco.
* Asegúrate que no se está ejecutando un gestor o instalador de paquetes.
* No debes tener ningún documento importante abierto.

### Características

* Es un actualizador inteligente: si por alguna razón se interrumpe, al reiniciar la computadora el asistente continuará en el lugar donde se interrumpió.
* No requiere mayor intervención del usuario: sólo se requiere que presione "aceptar" o "cancelar").
* Se conservan las configuraciones, documentos y demás archivos de los usuarios.
* Se preservan y actualizan las aplicaciones que el usuario haya instalado desde que está usando Canaima 2.1.
* Se hace una limpieza general de configuraciones obsoletas.
* Existe un registro detallado de todos los pasos que ocurren durante el proceso de actualización.
* Se implementa la tecnología de precarga y caché de paquetes.
* Funciona tanto para arquitecturas i386 como para amd64.

### A través del Terminal

Estando en Canaima 2.1, abre un Terminal de Root (Aplicaciones > Accesorios > Terminal de Root) y ejecuta los siguientes comandos:

{% highlight bash %}
aptitude update
aptitude install asistente-actualizacion
{% endhighlight %}

Reinicia la computadora y presiona "Actualizar ahora" en la ventana de notificación.

### Disponible en

Paquetes Binarios:

[http://repositorio.canaima.softwarelibre.gob.ve/pool/usuarios/a/asistente-actualizacion/](http://repositorio.canaima.softwarelibre.gob.ve/pool/usuarios/a/asistente-actualizacion/)

Código Fuente:

[http://gitorious.org/canaima-gnu-linux/asistente-actualizacion](http://gitorious.org/canaima-gnu-linux/asistente-actualizacion)
