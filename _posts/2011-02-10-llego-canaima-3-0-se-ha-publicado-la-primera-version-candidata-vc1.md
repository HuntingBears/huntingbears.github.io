---
author: martinezfaneyth
date: 2011-02-10 21:21:07-04:30
layout: post
slug: llego-canaima-3-0-se-ha-publicado-la-primera-version-candidata-vc1
title: 'Llegó Canaima 3.0: Se ha publicado la primera Versión Candidata (VC1)'
article_id: 669
categories:
- Canaima
- Desarrollo
- Software Libre
tags:
- canaima3
- nueva versión
- version candidata
image: /static/img/posts/669/llego-canaima-3-0-se-ha-publicado-la-primera-version-candidata-vc1__1.jpg
description: Canaima 3.0 representa un salto cuantitativo y cualitativo en la calidad del Sistema Operativo.
---

Después de un largo período de desarrollo, que implicó entre otras cosas el desarrollo de nuevas aplicaciones, la apropiación de otras, y el mejoramiento de las ya existentes, el equipo de desarrollo Canaima GNU/Linux publica la primera Versión Candidata (VC1), de la tan esperada versión 3.0 "Roraima".

La versión 3.0 supone un gran salto tecnológico y social. Las nuevas aplicaciones aplicaciones desarrolladas apuntan a fortalecer la apropiación social del conocimiento, y a que cada vez menos personas dependan de terceros para el complimiento de sus metas. Además, incluye una variada gama de aplicaciones innovadoras y gráficamente atractivas, que mejoran la experiencia real del usuario.

### ¿Que hay de nuevo viejo?

Canaima 3.0 incluye las siguientes características:

Nuevas aplicaciones por defecto:

* **Deluge:** Gestor de descargas torrent ligero basado en Python.
* **Emesene:** Cliente de Mensajería instantánea MSN basado en Python.
* **Turpial:** Cliente de twitter e identi.ca basado en Python, desarrollado por comunidades venezolanas.
* **Exaile**: Reproductor multimedia integral basado en Python.
* **LibreOffice**: Suite ofimática basada en OpenOffice, libre de restricciones corporativas.
* **Canaima Notas**: Aplicación propia desarrollada para facilitar el reporte de errores por parte de los usuarios. Publica características de hardware en la plataforma notas.canaima.softwarelibre.gob.ve.
* **Cunaguaro**: Navegador web basado en Iceweasel, adaptado a la plataforma Canaima y con mejoras de rendimiento. Desarrollado por comunidades venezolanas.
* **Guácharo**: Cliente de correo basado en Icedove, adaptado a la plataforma Canaima. Desarrollado por comunidades venezolanas.
* **Shotwell**: Visor de imágenes con diversas funcionalidades.
* **Simple Scan**: Gestor de scáneres.

Otras aplicaciones:

* **Canaima Desarrollador**: Conjunto de ayudantes y herramientas que asisten en el proceso de creación de software.
* **Canaima Semilla**: Herramienta para la creación de ISO's basadas en sabores de Canaima.
* **Canaima Contraseña**: Asistente de cambio de contraseña para los usuarios de las computadoras distribuídas por los fabricantes (VIT, CANTV, Siragon, etre otros).
* **Canaima Restaurar**: Permite restaurar el Sistema Operativo a su estado inicial de Instalación.
* **Canaima Curiara**: Visor HTML ligero y de alto rendimiento basado en Python-Webkit.

Agrupación de paquetes a través de metapaquetes temáticos (canaima-web, canaima-ofimatica, canaima-multimedia, entre otros).

Creación de un nuevo estilo visual:

* Nuevo tema GTK para la decoración de las ventanas.
* Nuevo tema Metacity para los bordes de las ventanas.
* Nuevo set de íconos basados en el tema Faenza Dark.
* Incluídos conjunto de 11 wallpapers hechos en comunidad.
* Nuevo gestor de inicio Plymouth, con tema adaptado a Canaima.
* Nuevo gestor de arranque BURG, con tema adaptado a Canaima.

Optimizaciones de rendimiento variadas:

* Implementación de demonios de optimización de la experiencia de usuario (prelink, preload, readahead).
* Reducción de los demonios que se activan durante el arranque del sistema.
* Reducción del factor de swappiness.
* Reducción del número de TTY's a 2.
* Implementación del parche de Lennart Poettering.
* Añadiendo la opción de noatime a los discos donde sea pertinente en /etc/fstab.

Generación del sabor canaima-primera-base, que es una base mínima de canaima, destinado a ser la fuente de los demás sabores.

Profunda reestructuración del sistema de paquetes de canaima, basándose en la metodología git-buildpackage para la generación de paquetes binarios a través de paquetes fuente.

### ¡A probarla!

Ésta primera versión candidata es el punto inicial para que la comunidad de usuarios y desarrolladores de Canaima pruebe, mediante los métodos que considere pertinentes, todo el contenido de software incluído en el lanzamiento. Producto de ese proceso, surgirá una retroalimentación, que será capaz de proveer los datos suficientes para el mejoramiento y la corrección de errores. A continuación las imágenes para su descarga:

**ACTUALIZACIÓN**: LA VERSIÓN ESTABLE YA ESTÁ DISPONIBLE.

* [Imagen ISO para la arquitectura amd64 (~700MB)](http://descargas.canaima.softwarelibre.gob.ve/canaima-3.0~estable_amd64.iso).
* [Suma de comprobación md5](http://descargas.canaima.softwarelibre.gob.ve/canaima-3.0~estable_amd64.iso.md5).
* [Imagen ISO para la arquitectura i386 (~700MB)](http://descargas.canaima.softwarelibre.gob.ve/canaima-3.0~estable_i386.iso).
* [Suma de comprobación md5](http://descargas.canaima.softwarelibre.gob.ve/canaima-3.0~estable_i386.iso.md5).

¡Happy Testing!
