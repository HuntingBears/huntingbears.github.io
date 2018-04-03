---
author: martinezfaneyth
date: 2010-10-08 09:47:27-04:30
layout: post
slug: describiendo-el-ciclo-de-desarrollo-de-canaima-gnulinux
title: Describiendo el ciclo de desarrollo de Canaima GNU/Linux
article_id: 301
categories:
- Canaima
- Desarrollo
tags:
- Canaima
- ciclo
- desarrollo
image: /static/img/posts/301/describiendo-el-ciclo-de-desarrollo-de-canaima-gnulinux__1.jpg
description: El ciclo de desarrollo de Canaima GNU/Linux permite definir un flujo de trabajo para los integrantes del proyecto.
---

Buenas tardes, compañeros y compañeras del software libre.

Es bien sabido que Canaima GNU/Linux es una de las distribuciones de Software Libre más importantes de Venezuela. Actualmente se incluye en más de 880 mil portátiles del proyecto Canaima Educativo, [ha sido descargado](http://estadisticas.canaima.softwarelibre.gob.ve) más de 120 mil veces del [portal oficial](http://canaima.softwarelibre.gob.ve) y se planea extender el Proyecto a toda la Administración Pública Nacional.

Sin embargo, la popularidad no lo es todo. Detrás de Canaima GNU/Linux existe un ciclo de desarrollo bastante particular, propio de la dinámica socio-tecnológica en que está envuelto. Si bien es cierto que éste ciclo no ha sido difundido con mucha claridad ni fuerza, - entre otras cosas porque aún están agregándosele elementos y definiendo procedimientos - , intentaré describir el procedimiento actual en aras de incentivar la participación de la Comunidad en los procesos tecnológicos de Canaima.

En ese sentido, podemos decir que básicamente el ciclo de desarrollo de Canaima sigue un flujo natural de los acontecimientos tal cual se reseñan en el esquema adjunto:

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/301/describiendo-el-ciclo-de-desarrollo-de-canaima-gnulinux__2.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/301/describiendo-el-ciclo-de-desarrollo-de-canaima-gnulinux__1.jpg"></span>

### ¿Quienes son los actores?

La comunidad canaima está conformada por un gran número de personas que tienen intereses comunes y que comparten un mismo espacio virtual conformado por una serie de herramientas y servicios condensados en una plataforma pública. Éstos actores provienen de distintas organizaciones y colectivos, a saber: el CNTI, Instituciones Públicas en general, Unidades Productivas, Cooperativas, Empresas Privadas, Activistas Sociales y Usuarios en general. Éste conjunto de personas poseen una dinámica propia, característica de sus realidades particulares; sin embargo, es posible diferenciar un ciclo que se ejecuta cada vez que se publica una nueva versión de Canaima GNU/Linux.

### Cocinando una nueva versión de Canaima GNU/Linux

En teoría, una versión de Canaima es publicada cada ~6 meses en sincronía con la Cayapa. Para que ésto se cumpla, ciertos hitos deben ser alcanzados.

La primera meta es realizar un producto. ¿Quien puede realizar un producto para Canaima GNU/Linux? Cualquiera puede hacerlo, sin embargo te recomendamos ciertas cosas que te ayudarán a hacerlo con mayor calidad y eficiencia:

1. Léete la [guía de empaquetamiento con git-buildpackage]({{ site.url }}/guia-de-empaquetamiento-con-git-buildpackage-para-canaima-debian-o-ubuntu.html).
2. Participa en la lista de correo [desarrolladores](http://listas.canaima.softwarelibre.gob.ve/cgi-bin/mailman/listinfo/desarrolladores), [discusión](http://listas.canaima.softwarelibre.gob.ve/cgi-bin/mailman/listinfo/discusion) y [soporte](http://listas.canaima.softwarelibre.gob.ve/cgi-bin/mailman/listinfo/soporte).
3. Usa Canaima para todo.
4. Infórmate acerca de las conclusiones a las que se llegaron en la última [Cayapa](http://cayapa.canaima.softwarelibre.gob.ve).

¿Que producto hago? Existen dos formas de actuar en éste dilema: determinar y seleccionar una necesidad actual del Proyecto Canaima, a través de los medios de comunicación destinados a ello ([Listas de Correo](http://listas.canaima.softwarelibre.gob.ve/cgi-bin/mailman/listinfo), [Sistema de reporte de bugs](http://trac.canaima.softwarelibre.gob.ve/canaima/), [chat IRC](http://canaima.softwarelibre.gob.ve/Soporte), [Cayapas](http://cayapa.canaima.softwarelibre.gob.ve) y otros eventos sociales) o seleccionar un proyecto de iniciativa propia. Una vez concretado el producto que vas a hacer, cómo lo vas a hacer y en que tiempo, anúncialo, comunícalo a la comunidad y ¡Manos a la obra!

Es importante añadir tu proyecto en el Mapa de ruta de la próxima versión de Canaima.

### Etapas de Desarrollo

Las etapas de desarrollo iniciales de un producto son locales e involucran casi cualquier elemento que al desarrollador se le ocurra, en fin, es producto de un proceso creativo que en mi opinión se acerca mucho al arte. Cuando tu proyecto tenga una estructura más o menos definida, es hora de [versionarlo con git]({{ site.url }}/guia-basica-de-desarrollo-con-git.html) e ir publicando tu código; en ésta etapa entra en juego [forja.softwarelibre.gob.ve](http://forja.softwarelibre.gob.ve).

"La forja" es un espacio público donde puedes alojar proyectos de software libre de una forma práctica y gratuita, bajo la plataforma de Canaima GNU/Linux y usando un repositorio git. [Crea un proyecto](http://forja.softwarelibre.gob.ve/) y ve publicando tu código ahí.

A medida que vas madurando y depurando tu código, es buena idea ir también trabajando en la [debianización]({{ site.url }}/guia-de-empaquetamiento-con-git-buildpackage-para-canaima-debian-o-ubuntu.html) del paquete fuente para finalmente generar el paquete binario con [git-buildpackage]({{ site.url }}/guia-de-empaquetamiento-con-git-buildpackage-para-canaima-debian-o-ubuntu.html).  Haz sucesivas pruebas de empaquetado con tu proyecto, y cuando llegues a un nivel en donde sea usable, puedes solicitar a través de la lista de correo [desarrolladores@canaima.softwarelibre.gob.ve](http://listas.canaima.softwarelibre.gob.ve/cgi-bin/mailman/listinfo/desarrolladores) permisos suficientes en los servidores de la Plataforma Canaima para subir tus paquetes a la rama de desarrollo. En tu solicitud debes incluir:

1. Nombre del Paquete (Completo).
2. Descripción de su utilidad.
3. Dependencias con otros paquetes.
4. Dirección del código fuente.
5. Direccción del paquete .deb tal cual va a ser incluído en los repositorios.

Una vez otorgados los permisos, puedes subir cuantas versiones consideres, con la frecuencia que necesites. Está demás decir que cualquier intento de violar la privacidad del usuario o de inyectar código malicioso resultará en una severa penalización.

Cuando sientas que haz llegado a una versión estable de tu paquete, es hora de incluírlo en la rama pruebas, para que el colectivo lo use y ofrezca su retroalimentación. El procedimiento es similar al anterior, realiza la petición de inclusión del paquete en la rama pruebas incluyendo la siguiente información:

1. Nombre del Paquete (Completo).
2. Descripción de su utilidad.
3. Dependencias con otros paquetes.
4. Dirección del código fuente.
5. Direccción del paquete .deb tal cual va a ser incluído en los repositorios.

Finalmente, cuando todos los objetivos establecidos en el mapa de ruta se hayan cumplido, todos los paquetes de la rama pruebas serán pasados a estable, generando así una nueva versión de Canaima. Los medios vivos instalables serán generados a través de [canaima-semilla]({{ site.url }}/canaima-semilla-herramienta-para-la-creacion-y-distribucion-de-sabores-canaima.html).

¡Happy Programming!
