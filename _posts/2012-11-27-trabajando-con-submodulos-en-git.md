---
author: martinezfaneyth
date: 2012-11-27 01:08:32-04:30
layout: post
slug: trabajando-con-submodulos-en-git
title: Trabajando con submódulos en git
article_id: 1905
categories:
- Canaima
- Debian
- Desarrollo
- Software Libre
tags:
- desarrollo
- git
- submódulos
image: /static/img/posts/1905/trabajando-con-submodulos-en-git__1.jpg
description: Los submódulos en git permiten dividir o combinar un proyecto en varios repositorios separados.
---

Este artículo contiene información avanzada relacionada con el desarrollo bajo versionamiento git. Si deseas ampliar tus conocimientos antes de continuar, puedes leer los siguientes artículos:

* [Guía de desarrollo básico con git]({{ site.url }}/guia-basica-de-desarrollo-con-git.html).
* [Guía de desarrollo avanzado con git]({{ site.url }}/guia-avanzada-de-desarrollo-con-git.html).
* [El oráculo git del desarrollador]({{ site.url }}/el-oraculo-git-del-desarrollador.html).

Los submódulos en git permiten insertar uno o más repositorios externos dentro de otro repositorio. Es decir, permiten manejar uno o varios subproyectos dentro de un gran proyecto versionado con git. Esta característica puede ser útil, por ejemplo, para referenciar archivos que estén en proyectos complementarios, pero administrados por diferentes grupos o personas.

Por ejemplo, supongamos que tres personas se ponen de acuerdo para desarrollar una aplicación. La aplicación tiene una interfaz gráfica, un esquema de documentación y un esquema de generación de imágenes, por lo que se reparten el trabajo en partes iguales. El que escoja la interfaz principal, podría insertar los repositorios de desarrollo de sus otros dos compañeros en la ruta del proyecto correspondiente para realizar una integración de código. De esta forma, los tres proyectos siguen siendo independientes y pueden ser integrados y desintegrados en cualquier momento.

Para esta práctica, necesitaremos instalar git, lo cual podemos hacer introduciendo el siguiente comando desde una Terminal de Root (Menú > Aplicaciones > Accesorios > Terminal de Root):

{% highlight bash %}
aptitude install git
{% endhighlight %}

Luego, clonaremos el repositorio de Aguilas (sistema de autenticación del Proyecto Canaima) y entraremos en la carpeta con los siguientes comandos:

{% highlight bash %}
git clone git://github.com/HuntingBears/aguilas.git
cd aguilas
{% endhighlight %}

Aguilas contiene dos submódulos: el wiki para github y el wiki para google code. Estas características nos permitirán ilustrar mas adelante algunas funcionalidades de los submódulos.

### Agregar un submódulo

Agregar un submódulo dentro de un proyecto git es relativamente sencillo. Por ejemplo, supongamos que queremos añadir documentación adicional para Aguilas dentro de la carpeta `documentation/extradocs`, desde un repositorio git externo ubicado en `git://github.com/HuntingBears/fudcon-presentation.git`. Lo hacemos así:

{% highlight bash %}
git submodule add git://github.com/HuntingBears/fudcon-presentation.git documentation/extradocs
{% endhighlight %}

Podemos diferenciar tres partes principales en este comando:

* `git submodule add`: Esto simplemente le dice a git que se está agregando un submódulo.
* `[REPOSITORIO]`: Este es el repositorio externo que debe ser agregado como un submódulo. La sintaxis exacta de la dirección variará de acuerdo a la permisología que se posee sobre el repositorio. Siempre se debe verificar que se tienen permisos de lectura sobre el repositorio.
* `[CARPETA]`: Esta es la carpeta donde se insertará el repositorio dentro del repositorio principal o "anfitrión".

Si hacemos git status, se podrá evidenciar que la carpeta suministrada fué creada, y que también se ha creado un archivo `.gitmodules`. Este nuevo archivo contiene los datos relacionados con el nuevo submódulo y puede contener lo siguiente:

{% highlight ini %}
[submodule "documentation/extradocs"]
path = documentation/extradocs
url = git://github.com/HuntingBears/fudcon-presentation.git
{% endhighlight %}

Si nos fijamos dentro de la carpeta `documentation/extradocs`, veremos que está vacía. A fin de completar la operación, es necesario inicializar y actualizar los submódulos. Desde la carpeta raíz de Aguilas, introduciremos los siguientes comandos:

{% highlight bash %}
git submodule init
git submodule update
{% endhighlight %}

Al revisar la carpeta `documentation/extradocs`, encontraremos los archivos correspondientes al proyecto de documentación.

### Actualización de submódulos

Para actualizar el contenido de un submódulo, es decir, hacer un `git pull` del subproyecto más no del proyecto que lo alberga, debemos inicializar y actualizar los submódulos así:

{% highlight bash %}
git submodule init
git submodule update
{% endhighlight %}

Luego accedemos a la carpeta que contiene el submódulo:

{% highlight bash %}
cd documentation/extradocs
{% endhighlight %}

Cambiamos a la rama del subproyecto donde se encuentra la información:

{% highlight bash %}
git checkout master
{% endhighlight %}

Y hacemos la actualización del contenido:

{% highlight bash %}
git pull
{% endhighlight %}

### Quitar un submódulo

¿Qué pasa si tenemos que quitar un submódulo? Tal vez cometimos un error. También podría ser que el diseño del proyecto haya cambiado, y la ruta del submódulo ya no es la misma. Por desgracia, git no posee una forma automática para remover submódulos. Se debe hacer manualmente.

Siguiendo con el ejemplo, vamos a quitar el submódulo que agregamos en `documentation/extradocs`. Para ello debemos realizar los siguientes pasos:

* Eliminar la entrada del submódulo en el archivo `.gitmodules`. Lo abrimos con gedit, vim, o tu editor de texto favorito, y eliminamos las tres líneas pertenecientes al submódulo. Para este caso, removemos las siguientes líneas:

        [submodule "documentation/extradocs"]
        path = documentation/extradocs
        url = git://github.com/HuntingBears/fudcon-presentation.git

* Eliminar la entrada del submódulo en el archivo `.git/config`: Lo abrimos con gedit, vim, o tu editor de texto favorito, y eliminamos las dos líneas pertenecientes al submódulo. Para este caso, removemos las siguientes líneas:

        [submodule "documentation/extradocs"]
        url = git://github.com/HuntingBears/fudcon-presentation.git

* Eliminar del versionamiento la carpeta creada para el submódulo:

        rm -rf documentation/extradocs
        git rm --cached documentation/extradocs

Eso es todo lo que se debe saber para trabajar con submódulos en git. Espero que sea de utilidad.
