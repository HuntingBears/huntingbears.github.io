---
author: martinezfaneyth
language: es
date: 2012-02-15 22:53:23-04:30
layout: post
slug: colaborando-en-proyectos-de-codigo-abierto-a-traves-de-parches-git-quilt-diff
title: Colaborando en proyectos de código abierto a través de parches [git, quilt, diff]
wordpress_id: 2101
categories:
- Desarrollo
- Software Libre
tags:
- colaborar
- diff
- parches
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/2101/8dbd70b4e814df1e552d7f7c42302222.jpg
description: Los parches nos permiten compilar una serie de cambios en un archivo. Ideal para trabajar colaborativamente.
---

Un parche es un archivo estructurado que contiene una lista de diferencias entre un conjunto de archivos y otro. Comúnmente es la forma más rápida y directa para aportar líneas de código a un proyecto de código abierto o de Software Libre, en respuesta a la solución de errores o implementación de nuevas funcionalidades.

Además, los parches hacen que el desarrollo sea **más fácil**, porque en lugar de proporcionar un archivo completo, posiblemente compuesto por cientos o miles de líneas de código, el parche incluye (o remueve) sólo los cambios exactos que se hicieron. Esto tiene dos ventajas: ayuda a comprender más rápidamente el cambio que se está presentando y seguirá siendo válido en el futuro siempre y cuando no se cambien las líneas afectadas.

En la actualidad, un parche puede ser generado por diferentes herramientas, y puede tener varios formatos. Sin embargo, podemos decir que la mayoría tiene un aspecto parecido al que se presenta a continuación:

{% highlight diff %}
diff --git a/token_example/token_example.tokens.inc b/token_example/token_example.tokens.inc
index 585dcea..b06d9d6 100644
--- a/token_example/token_example.tokens.inc
+++ b/token_example/token_example.tokens.inc
@@ -13,8 +13,8 @@ function token_example_token_info() {
   // second is the user's default text format, which is itself a 'format' token
   // type so it can be used directly.

- // This is a comment in the original file. It will be removed when the patch is applied.
+ // And here are lines we added when we were editing the file.
+ // They will replace the line above when the patch is applied.
   $info['types']['format'] = array(
     'name' => t('Text formats'),
     'description' => t('Tokens related to text formats.'),
{% endhighlight %}

Para este ejemplo, en la parte superior se especifica el nombre del archivo que está siendo afectado. Las líneas adicionales se muestran con un '`+`', las líneas eliminadas se muestran con un '`-`', y las líneas sustituidas muestran como la antigua línea se elimina y se añade la nueva. Un mismo parche puede contener cambios a uno o más archivos.

<!-- more -->

### Primeros pasos

Para efectos de este tutorial, necesitaremos instalar git para poder realizar las prácticas. En un Terminal de Root (Aplicaciones > Accesorios > Terminal de Root) ejecutamos:

{% highlight bash %}
aptitude install git-core diffutils quilt
{% endhighlight %}

Bien, supongamos que deseas colaborar con el [Proyecto Aguilas](http://huntingbears.com.ve/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap.html) para corregir un error presente en alguno de sus archivos. Lo primero que debemos hacer es bajar el código fuente de la aplicación. La forma de realizar esta tarea dependerá de la forma en que el autor distribuye el código fuente; es decir, podrías tener que descargar un archivo comprimido, clonarlo desde un repositorio de versionamiento o cualquier otra cosa. No te preocupes: un proyecto de código abierto siempre informa como se debe hacer para descargar el código fuente.

Para el caso de Aguilas, clonaremos el repositorio git con el siguiente comando en un Terminal de Usuario (Aplicaciones > Accesorios > Terminal):

{% highlight bash %}
git clone http://github.com/LuisAlejandro/aguilas.git
{% endhighlight %}

Normalmente, deberás descargar el código _una sola vez_. Sin embargo, siempre que desees volver a modificar algo, es buena idea "refrescar" (o "halar") el código para descargar y actualizar posibles cambios. Recuerda que estás trabajando directamente sobre el código que proviene de los desarrolladores. No "refrescar" cada cierto tiempo implicaría trabajar con código desactualizado y posiblemente los parches generados no le servirán a los desarrolladores de la aplicación.

Para "refrescar" el código con git puedes utilizar los comandos que se encuentran más abajo (dentro de la carpeta donde se encuentra el código). Si el autor no utiliza git, deberás preguntarle como hacer para mantener actualizado tu código.

{% highlight bash %}
git checkout development
git pull origin development
{% endhighlight %}

_development_ es la rama de desarrollo para el [Proyecto Aguilas](http://code.google.com/p/aguilas/) y contiene los cambios más recientes.

A continuación mostraremos _tres formas_ de hacer parches para que tu decidas cual se ajusta más a tus gustos/necesidades:

### Creando parches con git

Para crear parches con git, el código fuente debe estar versionado con git. Si te has clonado el código de Aguilas como te dijimos en la sección anterior, entonces tu código ya está versionado. En caso de que no esté versionado (por ejemplo si el código se distribuye a través de archivos comprimidos u otros sistemas de versionamiento), puedes versionarlo con los siguientes comandos:

{% highlight bash %}
git init
git add .
git commit -a -m "Commit inicial"
{% endhighlight %}

Bien, seguidamente crearemos una rama nueva para trabajar los cambios que deseamos hacer. Ejecuta los siguientes comandos:

{% highlight bash %}
git branch parche-ejemplo
git checkout parche-ejemplo
{% endhighlight %}

Ahora, haremos nuestras modificaciones en la rama que hemos creado. Las modificaciones dependerán mucho de lo que deseas hacer, normalmente uno revisa el sistema de tickets del proyecto para saber en cuales cosas puede ayudar. Para este ejemplo editaremos un solo archivo, pero podrías editar cuantos archivos necesites editar.

Supongamos que vamos a cambiar el autor del proyecto que se especifica en el archivo AUTHORS. Para ello ejecutamos nuestro editor de texto favorito y cambiamos el archivo para que en vez de mostrar esto:

{% highlight text %}
Developers:

 * Luis Alejandro Martínez Faneyth (aka HuntingBears)
    - E-Mail: luis@huntingbears.com.ve
    - Blog: http://huntingbears.com.ve
    - Twitter/identi.ca: @LuisAlejandro
{% endhighlight %}

Muestre lo siguiente:

{% highlight text %}
Developers:

 * El Chiguire Bipolar
{% endhighlight %}

Seguidamente, registramos los cambios en git:

{% highlight bash %}
git add .
git commit -a -m "[MENSAJE REPRESENTATIVO DE LOS CAMBIOS]"
{% endhighlight %}

Y estamos listos para generar el parche. El comando que se muestra a continuación, mostrará la diferencia entre la rama original (`development`) y la rama que hemos creado para los cambios (`parche-ejemplo`), eso lo escribiremos en un archivo `.patch` que finalmente es el que mandaremos a los desarrolladores.

{% highlight bash %}
git diff development parche-ejemplo > 01-cambiando-authors.patch
{% endhighlight %}

Si examinamos el archivo, veremos el contenido del parche.

{% highlight diff %}
diff --git a/AUTHORS b/AUTHORS
index 9c21371..6bc709c 100644
--- a/AUTHORS
+++ b/AUTHORS
@@ -1,6 +1,3 @@
 Developers:

- * Luis Alejandro Martínez Faneyth (aka HuntingBears)
-       - E-Mail: luis@huntingbears.com.ve
-       - Blog: http://huntingbears.com.ve
-       - Twitter/identi.ca: @LuisAlejandro
+ * El Chiguire Bipolar
{% endhighlight %}

### Creando parches con quilt

Si no deseas utilizar _git_, puedes usar _quilt_, una herramienta especialmente diseñada para manejar parches.

Para empezar a trabajar con quilt debemos indicarle una carpeta de trabajo, donde se irán guardando los parches que hagamos. Para este ejemplo le diremos a quilt que utilice una carpeta de nombre "parches", la cual será relativa a la carpeta del proyecto que estemos editando.

{% highlight bash %}
export QUILT_PATCHES="parches"
{% endhighlight %}

Seguidamente le diremos a quilt que deseamos crear un nuevo parche con la orden:

{% highlight bash %}
quilt new 01-cambiando-authors.patch
{% endhighlight %}

Ahora, editaremos el archivo `AUTHORS` de la misma forma que lo hicimos en la sección anterior, con la diferencia de que lo haremos con el siguiente comando:

{% highlight bash %}
quilt edit AUTHORS
{% endhighlight %}

Aparecerá un editor de texto que te permitirá cambiar el contenido del archivo. Cuando terminemos, guardamos y cerramos. Es posible editar más archivos con el mismo comando.

Finalmente, actualizamos la base de datos de parches y los "desaplicamos" para que aparezcan en la carpeta _parches_ que especificamos al principio.

{% highlight bash %}
quilt refresh
quilt pop -a
{% endhighlight %}

Si examinamos el archivo, veremos lo siguiente:

{% highlight diff %}
Index: aguilas/AUTHORS
===================================================================
--- aguilas.orig/AUTHORS        2012-02-15 17:23:19.586781243 -0430
+++ aguilas/AUTHORS     2012-02-15 17:26:38.407767118 -0430
@@ -1,6 +1,3 @@
Developers:

- * Luis Alejandro Martínez Faneyth (aka HuntingBears)
-       - E-Mail: luis@huntingbears.com.ve
-       - Blog: http://huntingbears.com.ve
-       - Twitter/identi.ca: @LuisAlejandro
+ * El Chiguire Bipolar
{% endhighlight %}

### Creando parches con diff

Si no deseas utilizar _git_ o _quilt_, puedes usar _diff_, que es la herramienta básica para mostrar diferencias entre archivos (o grupos de archivos).

Primeramente debes hacer una copia de toda la carpeta que contiene el código:

{% highlight bash %}
cp -r aguilas aguilas.miscambios
{% endhighlight %}

Luego ingresamos a la carpeta copiada `aguilas.miscambios` y editamos el archivo `AUTHORS` con nuestro editor de texto favorito tal cual lo hicimos en los dos casos anteriores.

Para crear el parche `01-cambiando-authors.patch`, ejecuta el siguiente comando en la carpeta donde se encuentra el proyecto original y el proyecto copia, es decir, el directorio superior:

{% highlight bash %}
diff -Naur aguilas aguilas.miscambios > 01-cambiando-authors.patch
{% endhighlight %}

Si examinamos el archivo, veremos lo siguiente:

{% highlight diff %}
diff -Naur aguilas/AUTHORS aguilas.miscambios/AUTHORS
--- aguilas/AUTHORS    2012-02-15 17:27:01.507881700 -0430
+++ aguilas.miscambios/AUTHORS    2012-02-15 17:35:27.830392408 -0430
@@ -1,6 +1,3 @@
Developers:

- * Luis Alejandro Martínez Faneyth (aka HuntingBears)
-    - E-Mail: luis@huntingbears.com.ve
-    - Blog: http://huntingbears.com.ve
-    - Twitter/identi.ca: @LuisAlejandro
+ * El Chiguire Bipolar
{% endhighlight %}

Espero que sea de utilidad!
