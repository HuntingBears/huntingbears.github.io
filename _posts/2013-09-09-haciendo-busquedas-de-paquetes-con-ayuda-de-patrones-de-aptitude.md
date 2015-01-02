---
author: martinezfaneyth
language: es
date: 2013-09-09 19:10:10-04:30
layout: post
slug: haciendo-busquedas-de-paquetes-con-ayuda-de-patrones-de-aptitude
title: Haciendo búsquedas de paquetes con ayuda de patrones de aptitude
wordpress_id: 4087
categories:
- Debian
- Software Libre
- Tips
tags:
- aptitude
- patterns
- search
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/4087/3b1e58941a008647bede01ade386a732.jpg
description: Utiliza patrones de búsqueda en aptitude para encontrar las cosas que buscas más rápido.
---

El sistema de paquetes de Debian es uno de los gestores de instalación y desinstalación de software más avanzados en el mundo de las distribuciones GNU/Linux. No podría ser de otra manera, ya que Debian también es una de las distribuciones que más paquetes posee en sus repositorios (mas de _32.000_ para la versión **7.0**).

Si tienes Debian, Canaima o Ubuntu, ¿Alguna vez haz tenido la oportunidad de listar todos los paquetes que tienes instalados? Normalmente daría dolor de cabeza tratar de buscar un paquete en una lista de entre 1000 y 2000 nombres (la cantidad promedio de paquetes instalados en un sistema operativo de escritorio). Es por ello que existen diversos filtros de búsqueda para manejadores de la base de datos de paquetes como _aptitude_ (aunque, estos filtros son implementados de forma nativa por aplicaciones gráficas como _Synaptic_ y _Software Center_).

Normalmente buscamos en la base de datos con `aptitude search [paquete]`, sin embargo, existen formas de ser más específicos con los términos de búsqueda. Por ejemplo, supongamos que queremos buscar todos los paquetes que comiencen con la palabra google. En ese caso, haríamos `aptitude search google` y tendríamos un resultado así:

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/4087/05f5009344c45fb32369b6fae3a78623.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/4087/05f5009344c45fb32369b6fae3a78623.jpg"></span>

Como observamos, existen algunos resultados que no necesariamente coinciden con lo que queríamos buscar, puesto que también existen paquetes que contienen la palabra _google_ en el medio de la palabra, por ejemplo. Veamos que sucede su utilizamos el patrón de búsqueda por nombre de paquete `~n` y agregamos la expresión regular `^` al principio de _google_, indicando que queremos listar todos los paquetes que comiencen por _google_, de la siguiente forma: `aptitude search ~n^google`.

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/4087/4bb4cbf00b5d59ccb83f600478a70d57.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/4087/4bb4cbf00b5d59ccb83f600478a70d57.jpg"></span>

Como vemos, el resultado es más corto y preciso que el anterior.

<!-- more -->

Existen muchos patrones de búsqueda que son útiles en nuestra búsqueda de paquetes; por ejemplo, búsqueda por descripción, por versión, por mantenedor, por repositorio, entre otros. Más abajo tenemos una tabla con todos los patrones disponibles:

|**Forma corta**|**Descripción**|
|---|---|
|`~F`|Selecciona ningún paquete.|
|`~T`|Selecciona todos los paquetes.|
|`[PATRÓN1] [PATRÓN2]`|Seleccionar cualquier paquete que coincida con el `[PATRÓN1]` y el `[PATRÓN2]`.|
|<code>[PATRÓN1] &#124; [PATRÓN2]</code>|Selecciona paquetes que coincidan con el `[PATRÓN1]`, el `[PATRÓN2]` o ambos.|
|`![PATRÓN]`|Seleccionar cualquier paquete que no coincida con el `[PATRÓN]`.|
|`~n[PATRÓN]`|Selecciona paquetes cuyo nombre coincida con `[PATRÓN]`.|
|`~m[PATRÓN]`|Selecciona paquetes cuyo mantenedor coincida con `[PATRÓN]`.|
|`~d[PATRÓN]`|Selecciona paquetes que contengan `[PATRÓN]` en su descripción.|
|`~V[PATRÓN]`|Selecciona paquetes cuya versión coincida con `[PATRÓN]`.|
|`~E`|Selecciona paquetes esenciales (aquellos que contienen `Essential: yes` en sus archivos `debian/control`).|
|`~O[PATRÓN]`|Selecciona paquetes desde el origen que coincida con `[PATRÓN].`|
|`~P[PATRÓN]`|Selecciona paquetes que proveean otro paquete que coincida con `[PATRÓN]`.|
|`~p[PATRÓN]`|Selecciona paquetes que tengan una prioridad que coincida con `[PATRÓN]`.|
|`~s[PATRÓN]`|Selecciona paquetes que pertenezcan a una sección que coincida con `[PATRÓN]`.|
|`~G[PATRÓN]`|Selecciona paquetes que contengan un `DebTag` que coincida con `[PATRÓN]`.|
|`~t[PATRÓN]`|Selecciona paquetes que estén en una tarea que coincida con `[PATRÓN]`.|
|`~M`|Seleccionar paquetes que estén marcados como instalados automáticamente.|
|`~a[PATRÓN]`|Seleccionar los paquetes que se encuentren marcados para una acción de aptitude (p. ej.: "install", "upgrade") que coincida con `[PATRÓN]`.|
|`~A[PATRÓN]`|Seleccionar paquetes desde un rama de un repositorio en específico que se encuentre en el archivo `/etc/apt/sources.list` (p. ej.: sid) y que coincida con `[PATRÓN]`.|
|`~b`|Seleccionar paquetes que tengan al menos una dependencia rota.|
|`~C[PATRÓN]`|Seleccionar paquetes que entran en conflicto con los paquetes que coincidan con `[PATRÓN]`.|
|`~c`|Seleccionar los paquetes que fueron removidos pero no purgados y aún tienen archivos de configuración en el sistema.|
|`~g`|Selecciona paquetes que no son requeridos por algún paquete instalado manualmente..|
|`~D[TIPO]:[PATRÓN]`|Seleccionar paquetes que contengan un `[TIPO]` de dependencia sobre paquetes que coincidan con `[PATRÓN]`.|
|`~i`|Selecciona paquetes que se encuentren instalados.|
|`~N`|Selecciona paquetes nuevos que hayan sido incorporados al repositorio desde la última vez que se hizo `aptitude update`.|
|`~o`|Selecciona paquetes obsoletos, es decir, que después del último `aptitude update` hayan sido removidos del repositorio (probablemente reemplazados por otros paquetes).|
|`~U`|Selecciona paquetes instalados que puedan ser actualizados luego de un `aptitude update`.|
|`~v`|Selecciona paquetes virtuales.|

### Ejemplos prácticos

Todos mis paquetes (en Canaima):

{% highlight bash %}
aptitude search ~mFaneyth
{% endhighlight %}

Todos los paquetes de [Erick Birbe](http://twitter.com/erickcion), [Sasha Solano](http://twitter.com/sasha_veronica), [Carlos Espinoza](http://twitter.com/armikhael) y [Francisco Vásquez](http://twitter.com/franjvasquezg) que estén instalados (en Canaima):

{% highlight bash %}
aptitude search ~i~merickcion ~i~mssolano ~i~marmikhael ~i~mfranjvasquezg
{% endhighlight %}

Todos los paquetes que dependen de Blender:

{% highlight bash %}
aptitude search ~DDepends:Blender
{% endhighlight %}

Todos los paquetes que provean al paquete virtual "mail" y que estén instalados

{% highlight bash %}
aptitude search ~i~DProvides:mail
{% endhighlight %}

o lo que es lo mismo:

{% highlight bash %}
aptitude search ~i~Pmail
{% endhighlight %}

Todos los paquetes que estorban de tu sistema:

{% highlight bash %}
aptitude search ~c ~g
{% endhighlight %}

Todos los paquetes que tengan "RC" (Release Candidate) en su número de versión y que estén instalados

{% highlight bash %}
aptitude search ~i~VRC
{% endhighlight %}

¿Cuántos paquetes tengo instalados?

{% highlight bash %}
aptitude search ~i | wc -l
{% endhighlight %}

Todos los paquetes de desarrollo para python que estén instalados:

{% highlight bash %}
aptitude search ~i~n^python.*dev$
{% endhighlight %}

Y así, espero que puedas encontrar lo que estás buscando.

¡Hasta una próxima!
