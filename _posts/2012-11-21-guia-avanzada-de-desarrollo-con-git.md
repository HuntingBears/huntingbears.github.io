---
author: martinezfaneyth
date: 2012-11-21 16:28:28-04:30
layout: post
slug: guia-avanzada-de-desarrollo-con-git
title: Guía avanzada de desarrollo con git
article_id: 1881
categories:
- Canaima
- Debian
- Desarrollo
- Software Libre
tags:
- código
- compartir
- desarrollo con git
image: /static/img/posts/1881/guia-avanzada-de-desarrollo-con-git__1.jpg
description: Git es un sistema de versionamiento distribuído utilizado en el desarrollo del Kernel Linux.
---

Este artículo asume que ya conoces el propósito y las funciones fundamentales de git y que estás preparado para entender tareas más complejas. Si lo deseas, puedes leer la [Guía básica de desarrollo con git]({{ site.url }}/guia-basica-de-desarrollo-con-git.html) antes de continuar.

Comenzar a trabajar en un proyecto de programación es relativamente fácil: simplemente comienza por donde más te guste y será suficiente.

Ahora, comenzar a versionar código depende realmente de cómo empezaste a programar. Si estás empezando desde cero, puedes hacer lo siguiente:

{% highlight bash %}
mkdir miproyecto
cd miproyecto
git init
git add .
git commit -a
{% endhighlight %}

`git init` inicializa el repositorio, `git add .` añade todos los archivos en el directorio actual al registro y `git commit -a` crea la importación inicial de los archivos.

Si por el contrario vas a descargar un proyecto git público (`[URL]`), debes hacer lo siguiente:

{% highlight bash %}
git clone [URL]
{% endhighlight %}

Por ejemplo:

{% highlight bash %}
git clone http://git.gitorious.org/canaima-gnu-linux/canaima-desarrollador.git
{% endhighlight %}

Cualquiera que sea el caso, ahora el árbol del proyecto está oficialmente versionado con git. Hay que notar que no importa cuántos subdirectorios tenga el proyecto, todo el sistema de versionamiento está guardado en una carpeta `.git` en el directorio raíz del proyecto (a diferencia de subversion, por ejemplo).

¡Ahora es tiempo de que hagamos algunas modificaciones! Edita algunos archivos dentro del proyecto canaima-desarrollador que acabas de clonar.

Cuando hayas terminado, lo siguiente que debes hacer es agregarlos al control de versiones con `git add .`. Pero antes, podemos obtener información interesante:

{% highlight bash %}
git diff
{% endhighlight %}

git diff te mostrará en formato de parche (diff) las modificaciones que acabas de hacer. Incluso, pudieras ver las diferencias entre el estado actual y un `[COMMIT]` anterior:

{% highlight bash %}
git diff [COMMIT]
{% endhighlight %}

O las diferencias entre un rango de commits:

{% highlight bash %}
git diff [COMMIT-A] [COMMIT-B]
{% endhighlight %}

También, puedes obtener una representación más concisa de los cambios:

{% highlight bash %}
git status
{% endhighlight %}

Esto te mostrará una lista de todos los archivos modificados, agregados, borrados o que no han sido agregados al sistema de versionamiento. Además mostrará la rama actual de trabajo.

Para los archivos sin versionar, debemos agregarlos así:

{% highlight bash %}
git add .
{% endhighlight %}

O eliminarlos (en el caso de que se trate de archivos no deseados de un proceso de compilación, por ejemplo):

**ADVERTENCIA: esto eliminará todos los archivos sin seguimiento para siempre.**

{% highlight bash %}
git clean -fd
{% endhighlight %}

También puedes especificar todos los archivos que deseas ignorar para siempre. Estos archivos nunca serán añadidos al control de versiones. Lo que hay que hacer es crear un archivo llamado .gitignore en el directorio raíz del proyecto, que contenga una lista de los archivos, línea por línea, especificando rutas relativas al directorio raíz.

Si realizaste un cambio en un archivo y todavía no has hecho commit, puedes restaurarlo desde el estado del último commit disponible con el siguiente comando:

{% highlight bash %}
git checkout [RUTA]
{% endhighlight %}

Finalmente es hora de guardar nuestros cambios:

{% highlight bash %}
git commit -a -m "[MENSAJE DESCRIPTIVO]"
{% endhighlight %}

Hay tres consideraciones a tener en cuenta:

En primer lugar, se debe especificar `-a` si se quiere hacer commit de todos los cambios versionados. En caso contrario, se debe usar `git commit [RUTA]` para hacer commit archivo por archivo.

En segundo lugar, los commits de git son privados por defecto, es decir, no son enviados a un servidor central a menos que se le especifique.

Y en tercer lugar, se acostumbra a colocar un `[MENSAJE DESCRIPTIVO]` que resuma en pocas palabras la modificación que se realizó en el código, así otros desarrolladores podrán entender fácilmente sin necesidad de revisar línea por línea los cambios realizados.

### Explorando el proyecto

Ahora que hemos hecho commit de algunas cosas, es posible que queramos ver un registro de lo hecho hasta ahora:

{% highlight bash %}
git log
git blame [RUTA]
{% endhighlight %}

`git log` es un comando muy potente. Muestra el registro completo de todos los commits hechos en el historial, además de información adicional como autor y fecha. `git blame` también es muy útil ya que identifica el autor de cada línea de cada archivo registrado por git.

Por otro lado, se puede ver el contenido de un archivo en estado en que estaba para un determinado `[COMMIT]` con `git show`:

{% highlight bash %}
git show [COMMIT]:[RUTA]
git show [COMMIT]:[RUTA]
git show -s [COMMIT]
git show [COMMIT]
{% endhighlight %}

### Ramas y Etiquetas

Las ramas y etiquetas en git son tratadas como marcas asociadas a commits dentro del historial de trabajo. Se puede crear una rama con los siguientes comandos:

{% highlight bash %}
git branch [NUEVA] [COMMIT]
git checkout [NUEVA]
{% endhighlight %}

El primer comando crea una nueva rama basada en la rama donde nos encontramos en el momento. El segundo comando cambia el árbol de archivos a la rama recién creada. Es posible pasar un argumento adicional en el primer comando para basar la rama en un commit específico. Ejecutar git branch sin argumentos mostrará la lista de ramas existentes.

Para mover el árbol de archivos hasta cierto commit anterior, hacemos así:

{% highlight bash %}
git checkout [COMMIT]
{% endhighlight %}

Las etiquetas en git son muy similares a las ramas, pero con algunas características adicionales. Una etiqueta puede tener una fecha, un autor y un mensaje tal como los commits. Pueden ser firmadas por una llave PGP, lo que es útil a la hora de garantizar que el código original no ha sido modificado por nadie más. Para hacerlo, solo basta con hacer lo siguiente:

{% highlight bash %}
git tag [ETIQUETA]
{% endhighlight %}

Para una lista de las etiquetas existentes y mostrar el mensaje de la etiqueta:

{% highlight bash %}
git tag -l
git show [ETIQUETA]
{% endhighlight %}

### Fusionando ramas

Supongamos que hemos estado trabajando en una nueva versión de nuestro software en una rama llamada "desarrollo" y que ya ha alcanzado un nivel de estabilidad tal que hemos decidido hacer un lanzamiento. Para ello, fusionaremos la rama "desarrollo" con la rama "estable" de la siguiente forma:

{% highlight bash %}
git checkout estable
git merge desarrollo
{% endhighlight %}

Si los cambios se hicieron sólo en la rama "desarrollo" desde la última fusión, simplemente se copia su contenido en la rama "estable" (llamado fast-forward merge). Si se hicieron cambios en ambas ramas, se combinan de forma inteligente (llamado three-way merge). Si la fusión three-way no tiene conflictos de combinación, se genera un commit con un mensaje descriptivo (la opción `--no-commit` desactiva este comportamiento). Si hay conflictos de combinación (cuando las líneas de uno o más archivos que se fusionarán tienen valores diferentes en el estado anterior), `git merge` notificará acerca de todos los archivos en conflicto.

Para resolver un conflicto, debemos abrir cada archivo en conflicto y buscar el siguiente patrón:

{% highlight bash %}
<<<<<<<
Los cambios realizados en mi rama
=======
Los cambios realizados en la rama que estoy fusionando
>>>>>>>
{% endhighlight %}

Debemos editar el archivo manualmente para dejar las líneas que consideremos apropiadas. Después de resolver todos los conflictos, se debe hacer commit:

{% highlight bash %}
git commit -a
{% endhighlight %}

### Trabajando con servidores remotos

Si hemos descargado el proyecto a través de git clone, git ha configurado automáticamente un repositorio remoto llamado origin. Si hemos creado el proyecto a partir de cero, tendremos que configurarlo.

Para mostrar los servidores remotos configurados actualmente, se puede ejecutar el comando git remote. En él se enumerarán los nombres cortos de cada servidor remoto configurado.

{% highlight bash %}
git remote -v
{% endhighlight %}

Para añadir un nuevo servidor remoto como un nombre corto al que se puede hacer referencia fácilmente, ejecuta:

{% highlight bash %}
git remote add [NOMBRE] [URL]
{% endhighlight %}

Si se ha clonado el repositorio, todas las ramas y etiquetas han sido descargadas. Sin embargo, las ramas no aparecerán en la lista a menos que antes se comiencen a utilizar con `git checkout [RAMA]`.

Ahora, ¿Cómo se descargan nuevos cambios desde un repositorio remoto? Se puede utilizar git fetch para descargar los cambios. Si lo que deseamos es descargar y combinar los cambios con nuestra rama, hacemos `git pull [NOMBRE] [RAMA]`.

Para subir cambios a un repositorio remoto, se utiliza el comando `git push [NOMBRE] [RAMA]`. Este comando sólo funciona si se ha clonado a partir de un servidor al que se tiene acceso de escritura y si nadie ha enviado cambios nuevos desde el momento en que se clonó. Si dos personas clonan el repositorio al mismo tiempo, uno sube cambios y luego el otro sube otros, el envío del último será rechazado. Se debe descargar los cambios del otro antes de subir los propios para que pueda funcionar.
