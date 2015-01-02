---
author: martinezfaneyth
language: es
date: 2011-09-20 19:47:21-04:30
layout: post
slug: organizando-tu-musica-con-musicbrainz-picard
title: Organizando tu música con MusicBrainz Picard
wordpress_id: 1907
categories:
- Música
- Tutoriales
tags:
- música
- musicbrainz picard
- organizar
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/1907/0741e5c8e0f239ac4398d95d73669ee0.jpg
description: MusicBrainz Picard permite completar la información faltante acerca de los archivos de música y organizarlos por carpetas.
---

No hay nada peor para un adicto pseudoparanóico al orden que ver errores ortográficos, nombres incorrectos u omisiones importantes en la lista de reproducción de tu reproductor de música favorito. En consecuencia, organizar manualmente una colección de música de más de 1000 canciones puede convertirse en algo extremadamente tedioso, por no decir imposible. Es en estos casos cuando un organizador de música como MusicBrainz Picard es de gran ayuda.

Esta aplicación nos permite clasificar de forma fácil e inteligente los archivos de música a través de los metadatos o etiquetas que usualmente contienen información referida al autor, nombre de la pista, álbum, año, entre otros campos.

Instalarla es fácil en cualquiera de las distribuciones  GNU/Linux más populares (Debian, Ubuntu, Canaima). En una consola de root (Aplicaciones > Accesorios > Terminal de Root), ejecuta el siguiente comando:

{% highlight bash %}
aptitude install picard
{% endhighlight %}

<!-- more -->

### Organizando los archivos

Lo primero que hay que hacer es iniciar la aplicación, seleccionar un conjunto de música para organizar y arrastrarla a la ventana izquierda, como se muestra en la figura.

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/1907/8415c1520c24d025d957ae4ab2ab93e7.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/1907/3883c6de73eb306c1ee0072779be61fb.jpg"></span>

Automáticamente se cargarán y dependiendo del análisis los metadatos contenidos en cada uno de los archivos pasará lo siguiente:

* Si el archivo ya ha sido procesado por Picard con anterioridad, será movido a la ventana derecha.
* Si el archivo contiene el campo álbum completo, entonces será agrupado en la carpeta _grupos_ de la ventana izquierda.
* De lo contrario, el archivo quedará en la capeta _archivos desagrupados_ de la ventana izquierda.

Bien, una vez hecho esto, seleccionamos los archivos desagrupados y le damos al botón _cluster_ para que sean agrupados.

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/1907/5fffa7a4c21ceabc5ea95f8c15d86dec.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/1907/d5835eb266c113249d235a059420adbe.jpg"></span>

Seguidamente debemos comparar la información que tenemos con la base de datos musicbrainz.org para completar los datos faltantes de las canciones (si los hubiere). Para ello tenemos dos opciones:

* _Lookup_: Hace una búsqueda en la base de datos con los campos existentes en el archivo. Rápido, pero sujeto a errores presentes en los campos existentes.
* _Analizar_: Realiza una búsqueda basado en el PUID, el cual es un identificador único basado en muestras de audio del archivo. Lento, pero menos posibilidades de error.

Independientemente de la opción que utilices, las canciones se irán organizando en la ventana derecha una vez hayan sido clasificadas correctamente.

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/1907/49bf454b746a53e253e7bc86285afdd4.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/1907/6cf1d7fa33bbccc5f04f1eb2c4541924.jpg"></span>

Finalmente se seleccionan las canciones de la ventana derecha y se guardan.

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/1907/f2137b23abd64d0d1e0f35664467b408.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/1907/07ba1db6adb78188ec21b3e44209c1ca.jpg"></span>

Útil, ¿no?
