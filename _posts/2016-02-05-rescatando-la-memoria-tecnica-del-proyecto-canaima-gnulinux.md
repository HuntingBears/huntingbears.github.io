---
article_id: 4330
author: martinezfaneyth
categories: [Software Libre, Desarrollo, Canaima]
date: 2016-02-05 22:55:54-0430
description: Tribus GNU/Linux es un intento por rescatar el histórico perdido del
  Proyecto Canaima.
image: /static/img/posts/4330/rescatando-la-memoria-tecnica-del-proyecto-canaima-gnulinux__1.jpg
layout: post
slug: rescatando-la-memoria-tecnica-del-proyecto-canaima-gnulinux
tags: [tribus, proyecto, canaima]
title: Rescatando la memoria técnica del proyecto Canaima GNU/Linux
---

6ta Cayapa Canaima. [Imagen de David Hernández](https://plus.google.com/photos/+DavidHernandez/album/5742820850354469697/5743505222307522658) ([by-nc-sa](http://creativecommons.org/licenses/by-nc-sa/2.0/)).

Una actividad creativa tiene muchos matices y particularidades. Podemos estar de acuerdo en que **nada está realmente hecho desde cero**, puesto que siempre existe un antecedente del cual hemos tomado prestado inspiración. Específicamente en el desarrollo de Software Libre, esta es una actividad recurrente e incluso alentada como buena práctica. Y es que, todo el movimiento del conocimiento libre tiene como premisa **la mejora progresiva** de la forma en que la sociedad satisface sus necesidades, tomando como referencia los avances que otros han hecho y publicado.

[El Proyecto Canaima](http://canaima.softwarelibre.gob.ve/), por su parte, cumple 9 años desde la publicación de la versión 1.0. Desde ese entonces, año tras año, incontables personas han ayudado con su trabajo de diversa índole a la mejora progresiva de los procesos técnicos y no técnicos de la distribución.

Realmente son incontables. A pesar de no poseer la mano de obra de otras distribuciones, Canaima es utilizada en un número significativo de instituciones de la administración pública, sirve como sistema operativo para las más de 4 millones de canaimitas distribuídas a nivel nacional y ha entrado varias veces dentro de las 100 distribuciones más populares, según distrowatch.

Como trabajador del CNTI, fuí testigo directo de la evolución de la distribución, y de como con cada [Cayapa](http://cayapa.canaima.net.ve/) (reuniones técnicas o bug squash parties), la calidad del código, conceptos y estructura de la distribución maduraban.

### Borrón y cuenta nueva

En [la última minicayapa](http://canaima.softwarelibre.gob.ve/multimedia/noticias/canaima-noticias/188-gobierno-y-comunidad-de-software-libre-se-reunen-en-caracas-para-producir-canaima-5) celebrada en la Escuela Venezolana de Planificación en la ciudad de Caracas, los actores presentes tomaron la decisión de rehacer la distribución *desde cero*, bajo la justificación de que lo existente era *tan desastroso* que *no servía*.

Con un quórum cuestionable y una premura impresa por la institucionalidad, nacieron nuevos paquetes y nuevos procesos. Pero con ellos también volvieron los errores superados, las malas estructuras de diseño corregidas, los errores conceptuales que ya habían quedado atrás, sin mencionar los acuerdos alcanzados que fueron fácilmente rotos sin mayor explicación.

No es justificable de ninguna forma este accionar. Incluso, no estaría de acuerdo si se hubiese hecho borrón y cuenta nueva para sustituirlo por algo mejor. La memoria técnica de un proyecto no debe perderse.

### Rescatando lo perdido

Es así como he decidido continuar con la línea de investigación que el Proyecto Canaima (directa o indirectamente) echó a un lado. La nueva distribución tomará el nombre de Tribus GNU/Linux, el mismo nombre de su plataforma (Tribus). Preliminarmente estaré haciendo una imagen ISO con los mismos paquetes originales de Canaima (con los nombres cambiados), basada en Debian Sid y comenzando su versionamiento en 0.1, pero luego me dedicaré enteramente a terminar la plataforma de Tribus para poder establecer los criterios de participación comunitaria, modelos de gobernanza y automatización de procesos.

Por ahora, mientras la plataforma de Tribus se completa, las plataformas asistentes serán las siguientes:

* [Versionamiento en Github](https://github.com/TribusGNULinux).
* [Integración contínua en Travis](https://travis-ci.org/TribusGNULinux).
* Compilación de paquetes e isos en OpenShift (Pronto).
* [Listas de Correo en Google](https://groups.google.com/forum/#!forum/tribus).
* [Documentación en Read the Docs](http://tribus.readthedocs.org/en/development/).

Si alguno desea sumarse a esta iniciativa, es bienvenido en las listas de correo. Esta nueva distribución está dirigida al usuario común y tiene como propósito fundamental mejorar la experiencia en el área de escritorio.
