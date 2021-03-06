---
article_id: 4325
author: martinezfaneyth
categories: [Software Libre, Desarrollo, Reflexión]
date: 2015-08-18 10:28:19-0430
description: A veces no queda tan claro como debe gestionarse la colaboración en los
  proyectos de Software Libre. Acá trato de explicarlo.
image: http://huntingbears.com.ve/static/img/posts/4325/algunas-reflexiones-acerca-del-manejo-de-proyectos-de-software-libre__1.jpg
layout: post
slug: algunas-reflexiones-acerca-del-manejo-de-proyectos-de-software-libre
tags: [colaborativo, proyectos, software libre]
title: Algunas reflexiones acerca del manejo de proyectos de Software Libre
---

Durante los últimos días he estado dándole vueltas al asunto de la organización para el desarrollo de aplicaciones en Software Libre. He estado reflexionando y hablando con varias personas de la comunidad y sus experiencias en el desarrollo colaborativo de aplicaciones que han tenido éxito, es decir, que han logrado los objetivos que se trazaron. Destaca una conversación con Wil Álvarez (creador de Turpial) y la forma en como él y sus colaboradores han llevado un esquema de desarrollo sano y dinámico durante los últimos años.

Manejar un proyecto colaborativo no es una tarea fácil. Si arrugaste la cara cuando leíste esa última frase, piénsalo bien porque es probable que lo estés haciendo mal.

Puedo resumir la información que recopilé de la siguiente manera:

Los canales de comunicación deben ser prácticos, directos y claramente identificados. Lo ideal es tener una lista de correo para desarrollo y soporte dedicada a la aplicación. Si sientes que una determinada aplicación "no merece" tener una lista aparte, entonces esa aplicación puede que esté gastando una valiosísima porción de tu tiempo y merezca desaparecer.

Debe existir una documentación básica antes de hacer un llamado público a colaboración. La documentación debe describir perfectamente:

* ¿En qué consiste la aplicación? ¿Para qué la vamos a hacer?
* ¿Qué lenguajes y herramientas utilizaremos inicialmente (versiones, paquetes, etc)? (pueden cambiar con el tiempo)
* ¿Cuál es el proceso para arrancar la aplicación?
* ¿Cuál es el procedimiento para armar el ambiente en donde puedo empezar a desarrollar para la aplicación?
* ¿Cómo se hace para comunicarse con los desarrolladores/colaboradores?
* ¿Cómo se hace para modificar una parte del código? ¿A dónde lo mando? ¿Quién lo recibe?
* ¿Cómo sé si aceptarán mi aporte? ¿Dónde lo veo?
* ¿Cómo es el estilo de programación (code style) de los diferentes lenguajes que se utilizarán?
* Si se incluye un diagrama de objetos y un diagrama conceptual es mucho mejor.

Según la experiencia de muchos, la gente no le gusta participar en las fases de diseño de la aplicación, sino más adelante donde ya existen tareas concretas y granulares que se puedan seleccionar.

El código y todos los procedimientos (toma de decisiones, aceptación de contribuciones, lanzamiento de versiones, etc) deben ser públicos. Utilizar sistemas de versionamiento es ideal.

Debe existir (al menos) un arquitecto de software por cada aplicación. Generalmente este rol lo asumen las personas que diseñaron la aplicación y consiste en hacer la gestión de la construcción de la aplicación. Estas personas:

* Abren los tickets para las nuevas funcionalidades de acuerdo al diagrama conceptual.
* Asignan los tickets a las personas que se han ofrecido a colaborar en determinadas funcionalidades.
* Cierran los tickets de acuerdo a las funcionalidades completadas.
* Aceptan peticiones para la fusión de código (pull/merge requests) de los diferentes colaboradores, luego de haber hecho una revisión del estilo de programación y las funcionalidades agregadas o errores corregidos.
* Atienden los casos de desarrollo o soporte que se presenten en la lista de la aplicación.
* No pueden descuidar la aplicación mientras se forma la comunidad. Deben formar parte activa en los medios de comunicación.

Por ahora, hasta aquí el reporte. Más adelante estaré haciendo otros aportes.
