---
author: martinezfaneyth
date: 2013-08-14 16:14:04-04:30
layout: post
slug: tribus-concretando-el-esquema-de-participacion-comunitaria-en-canaima
title: 'Tribus: Concretando el esquema de participación comunitaria en Canaima'
article_id: 2859
categories:
- Canaima
- Desarrollo
- Software Libre
tags:
- colaborativo
- comunidad
- tribus
image: http://huntingbears.com.ve/static/img/posts/2859/tribus-concretando-el-esquema-de-participacion-comunitaria-en-canaima__1.jpg
description: Tribus es un intento para automatizar las actividades de una Comunidad de Software Libre.
---

### Un poco de historia

El [Proyecto Canaima](http://canaima.softwarelibre.gob.ve) nació a finales del año 2007, en la forma de un sistema operativo destinado a satisfacer una necesidad concreta: el cumplimiento de la migración a Software Libre establecida en el Decreto Presidencial 3390. Durante esas épocas, era común escuchar a [Carlos Figueira](http://twitter.com/carlosfigueirar), Jhon Monrroy y [Ernesto Hernández-Novich](http://twitter.com/iamemhn) hablar sobre conceptos de remasterización, Debian y distribuciones derivadas en las oficinas del [Centro Nacional de Tecnologías de Información](http://cnti.gob.ve) (CNTI). La primera versión de Canaima (1.0) fue una remasterización de Debian que sirvió para migrar las oficinas internas del CNTI y comenzar el plan piloto de migración.

La segunda versión de Canaima (2008), estuvo determinada a abrir las puertas para el desarrollo comunitario en Canaima. [José Parella](http://twitter.com/bureado), [Nehomar Barragán](http://twitter.com/n3h0), [Carlos Marrero](http://twitter.com/cdmarrero), entre otros, lograron poner las bases fundacionales a través de un esquema de construcción de paquetes y una plataforma de servicios capaz de articular el flujo de desarrollo, gestionar la comunicación a través de listas de correo, impulsar la documentación a través de una enciclopedia colaborativa, entre otras funcionalidades. Sin embargo, la historia demostraría que sería necesario un estudio más profundo de las interacciones comunitarias.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2859/tribus-concretando-el-esquema-de-participacion-comunitaria-en-canaima__2.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2859/tribus-concretando-el-esquema-de-participacion-comunitaria-en-canaima__3.jpg"></span>
6ta Cayapa Canaima. [Imagen de David Hernández](http://www.flickr.com/photos/davidhdz/) ([by-nc-sa](http://creativecommons.org/licenses/by-nc-sa/2.0/)).

El enfoque de la tercera versión de Canaima (2011), estuvo centralizado en impulsar las herramientas de colaboración desde el ámbito del usuario. La creación de herramientas como Canaima Semilla, para facilitar la creación de distribuciones derivadas y aclarar el proceso de construcción de imágenes; y Canaima Desarrollador, para facilitar la creación de paquetes, estuvieron enfocadas en esa dirección.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2859/tribus-concretando-el-esquema-de-participacion-comunitaria-en-canaima__4.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2859/tribus-concretando-el-esquema-de-participacion-comunitaria-en-canaima__5.jpg"></span>
Mini Cayapa de Sabores Canaima. [Imagen de David Hernández](http://www.flickr.com/photos/davidhdz/) ([by-nc-sa](http://creativecommons.org/licenses/by-nc-sa/2.0/)).

Durante el año 2011, 2012 y lo que ha transcurrido del 2013, la dinámica comunitaria ha venido gestando espacios de construcción y organización de los procesos internos de la Metadistribución Canaima. A través de Cayapas y Mini Cayapas, se han planteado diferentes procedimientos y estructuras para optimizar la participación comunitaria en Canaima. Es preciso destacar las siguientes ideas:

* Máquina de empaquetamiento de software automático a través de Buildbot: Jesús Lara.
* Herramienta de valoración de colaboración (Colab): Orlando Fiol, Leonardo Caballero, entre otros.
* Sabor de Canaima basado en Debian Testing, como Rolling Release (Canaima Comunitario): Ernesto Crespo, Franklin Mendoza, entre otros.
* Flujo de desarrollo entre Canaima Popular y Canaima Comunitario: Mesa de Plataforma en la 6ta Cayapa.
* Esquema de desarrolladores, aprendices y mentores "Chamanes": Héctor Colina, Joaquín Muñoz, entre otros.
* Estructura organizacional de los "Caimancitos": Canaima Universitario.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2859/tribus-concretando-el-esquema-de-participacion-comunitaria-en-canaima__6.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2859/tribus-concretando-el-esquema-de-participacion-comunitaria-en-canaima__7.jpg"></span>
Esquema de Chamanes, por [Héctor Colina](http://twitter.com/e1th0r)/Joaquín Muñoz. [Imagen de David Hernández](http://www.flickr.com/photos/davidhdz/) ([by-nc-sa](http://creativecommons.org/licenses/by-nc-sa/2.0/)).

Basándose en éstas ideas, el equipo de desarrollo de Canaima en CNTI ha decidido componer una aplicación integral que conjugue todos estos elementos para que finalmente se materialice una plataforma que realmente permita potenciar la participación comunitaria.

### ¿Qué es Tribus?

[Tribus es una aplicación](http://canaimagnulinux.github.io/tribus/) que está siendo escrita principalmente en [Django](http://djangoproject.com), un conocido framework web escrito en python. Elegimos django debido a la existencia de gran cantidad de código reutilizable que facilitará el proceso de desarrollo. Además, _python es cool_.

Primero que todo debe advertirse que es una plataforma ambiciosa y su tiempo de desarrollo será prolongado, así que probablemente su implementación se haga por fases. Además **su estado de desarrollo es prematuro**, y **los diagramas de la aplicación no están completos aún**. Dicho esto, la intención con Tribus es que sea un desarrollo comunitario que permita realizar un ensayo de la dinámica que vendrá luego de que la aplicación esté en línea.

### ¿Cómo se hace para participar?

Estaremos trabajando en [GitHub](http://github.com/CanaimaGNULinux/tribus). GitHub permite hacer seguimiento de los aportes de los participantes a través de tickets, llevar la documentación interna a través de una wiki y gestionar fácilmente las copias internas del equipo a través de forks y pull requests. También estaremos usando [Read the docs](http://tribus.readthedocs.org/) para mantener una copia actualizada de la documentación y un foro en [Google Groups](http://groups.google.com/forum/#!forum/tribusdev) para comunicación entre desarrolladores.

Si deseas iniciarte en el desarrollo de Tribus, te recomendamos las siguientes lecturas:

  * [Protocolo para la incorporación de contribuciones](http://tribus.readthedocs.org/es/latest/development/contributing.html)
  * [Herramientas de mantenimiento y desarrollo](http://tribus.readthedocs.org/es/latest/development/maintaining.html)
  * [Normas de estilo para contribuciones](http://tribus.readthedocs.org/es/latest/development/style.html)
  * [Documentación conceptual](http://tribus.readthedocs.org/es/latest/development/concepts.html)
  * [Hojas de ruta](http://tribus.readthedocs.org/es/latest/development/roadmap.html)

Podemos resumir el flujo de trabajo de la siguiente manera:

1. Luego de que hayas curioseado lo suficiente ([clonando el código](http://tribus.readthedocs.org/es/latest/development/contributing.html), revisándolo, [reproduciendo el ambiente de desarrollo](http://tribus.readthedocs.org/es/latest/development/maintaining.html)), puedes [mirar aquí](http://tribus.readthedocs.org/es/latest/development/roadmap.html) para que veas cuales son las tareas pendientes. Cada tarea pendiente (debería) tener asignado un _ticket_ y un _Documento de Especificaciones_. El ticket nos permite llevar un registro de quién está haciendo que cosa, mientras que el Documento de Especificaciones nos explica en qué consiste esta funcionalidad. Si falta la asignación de ticket o el Documento de Especificaciones, ten un poco de paciencia, los desarrolladores de Tribus lo completarán pronto. Si lo deseas recuérdanos [en el foro](http://groups.google.com/forum/#!forum/tribusdev) que estos elementos no se encuentras asignados a la tarea que quieres realizar.
2. Si todo está en orden, haz un comentario en el ticket manifestando tu deseo de llevar a cabo la tarea que se describe, también comenta cualquier duda, sugerencia o indicación que tengas. En poco tiempo, un desarrollador de tribus te asistirá.
3. Realiza todas las modificaciones de tu aporte en una rama de git por separado, como se indica en el [protocolo de contribuciones](http://tribus.readthedocs.org/es/latest/development/contributing.html).
4. Cuando hayas terminado de trabajar en el ticket, realiza un pull-request como [se indica aquí](http://help.github.com/articles/using-pull-requests#initiating-the-pull-request). Opcionalmente puedes [cerrar el ticket con el pull-request](http://github.com/blog/1506-closing-issues-via-pull-requests).

### ¿Y qué vamos a hacer?

Puedes echar un ojo a los [diagramas de la aplicación](http://tribus.readthedocs.org/es/latest/development/concepts.html).

Y tu, ¿nos echas una mano?
