---
author: martinezfaneyth
date: 2011-09-23 15:45:03-04:30
layout: post
slug: los-backports-y-sus-riesgos
title: Los backports y sus riesgos
article_id: 1899
categories:
- Debian
- Desarrollo
- Estudios
- Software Libre
tags:
- backports
- estudio
- riesgos
image: http://huntingbears.com.ve/static/img/posts/1899/los-backports-y-sus-riesgos__1.jpg
description: Los backports permiten traer software nuevo a distribuciones viejas, corriendo algunos riesgos.
---

Un _backport_ es un paquete (o un conjunto de paquetes) que pertenecen a un estado superior de desarrollo. La idea general con los backports es **incluir software más nuevo en una distribución estable**, que por sus características tiende a quedarse con software viejo.

Es de esperarse entonces, que un software diseñado para un ambiente de interacciones con otros programas, no funcione de igual forma en un ambiente diferente (a menos que su interacción con los demás no dependa en gran medida del ambiente).

Esta premisa varía mucho dependiendo de la naturaleza del paquete y sus dependencias. Determinar cuan riesgoso es backportear un paquete se convierte entonces en una tarea de análisis minucioso.

Por otra parte, backportear un paquete que necesite funciones que no están presentes en el sistema, puede traer consecuencias tan sutiles como un "_flickering_" en un borde de ventana, o tan catastróficas como un "_kernel panic_", sino se toman las previsiones necesarias, ni se hacen las pruebas correspondientes.

Existen algunas consideraciones que deben hacerse.

* Si el paquete del estado superior tiene dependencias con librerías trascendentales que se encuentren en versiones superiores, - como por ejemplo python, perl, c++, entre otros -, entonces ese paquete debe ser modificado (y empaquetado) para que funcione con las librerías que se encuentran en versiones inferiores en el estado donde se quiere incluir el software.

ó

* Incluir también las dependencias junto con el paquete del estado superior.

Un caso de backporting en debian es, por ejemplo, incluir el navegador web Iceweasel 7.0 (actualmente en Inestable) e incluirlo en un sistema estable. Para este ejemplo en particular, estamos manejando un software modular (al igual que muchas otras aplicaciones), es decir, no depende de librerías que cambien mucho entre estados, y las dependencias que necesita vienen con él, es decir, se puede "enchufar y desenchufar" sin muchos detalles de los cuales estar pendiente.

Por otro lado, actualmente gnome necesita **GTK2** para la distribución Estable, y **GTK3** en la distribución Inestable. En este caso, backportearlo a estable implica incluir GTK3 (con todas las posibles consecuencias) o modificar gnome para que funcione con GTK2 (implica deshabilitar alguna de sus funcionalidades nuevas, además de ser un trabajo titánico). Lo mismo ocurre con muchos otros paquetes que están ligados a librerías trascendentales, como por ejemplo: el kernel, apt, aplicaciones basadas en python o perl, entre otros.

A manera de referencia, en Canaima 3.0 se incluyeron programas de estados superiores que tenían un comportamiento modular y por tanto, mínimo riesgo de conflictos, específicamente:

* Libreoffice
* Cunaguaro
* Guácharo
* BURG

### Backportear un kernel

Backportear un kernel implica muchos otros aspectos a los ya mencionados:

* El kernel depende de muchas librerías fundamentales como perl, c++, y las reglas udev que deben estar presentes para que funcione. Perl, por ejemplo es una librería que usualmente varía entre los estados de desarrollo.
* El kernel, aunque no es una librería de por si, muchos programas están diseñados para trabajar con versiones específicas de el. Por ejemplo, los módulos de kernel, los drivers de video, algunos drivers de sonido, están empaquetados para versiones específicas de kernel. Cambiar el kernel significa que esos drivers dejarán de funcionar, a menos que también se incluyan los paquetes de esos drivers específicos para el nuevo kernel.
* El kernel es una de las partes más sensibles de una distribución. Utilizar un kernel que no haya pasado por todos los estados de desarrollo puede significar que no esté lo suficientemente probado. Un pequeño error desapercibido en el kernel puede generar errores catastróficos en la experiencia de usuario (p. ej. kernel panic).
* No siempre es cierto que para soportar nuevos dispositivos es necesario incluir un nuevo kernel. Existen módulos de kernel genéricos que están ajustados a un patrón de diseño de dispositivos y no a un modelo en particular, permitiendo que el mismo sirva para una serie de dispositivos existentes (y por existir).

La recomendación final es, si piensas utilizar backports en tu distribución estable, ten mucho cuidado con lo que haces, podrías generar una inestabilidad incluso mayor a la existente en la distribución inestable.
