---
author: martinezfaneyth
date: 2010-07-21 20:18:57-04:30
layout: post
slug: guia-basica-de-desarrollo-con-git
title: Guía básica de desarrollo con git
article_id: 196
categories:
- Desarrollo
- Software Libre
tags:
- desarrollo
- git
- versionamiento
image: /static/img/posts/196/guia-basica-de-desarrollo-con-git__1.jpg
description: Git es un sistema de versionamiento distribuído utilizado en el desarrollo del Kernel Linux.
---

Git es una herramienta de desarrollo muy útil. Con ella cualquier persona podrá manejar de una manera sencilla y práctica el versionamiento de su trabajo.

### ¿Por qué necesito versionamiento?

Muchas veces me ha pasado, -sobretodo a mi, una persona bastante torpe-, que quiero devolver uno o varios cambios en archivos que ya guardé y cerré y me he encontrado con que no tengo forma de hacerlo.

Con el control de versiones o versionamiento, tenemos la facilidad de gestionar los diferentes cambios que se hacen en el contenido, configuración y propiedades de los archivos de un determinado proyecto. Ésta característica nos permite devolver cambios hacia versiones anteriores, además de facilitar el acceso y distribución de código fuente mediante la utilización de repositorios locales o remotos.

### ¿Y por qué GIT?


GIT es una herramienta de versionamiento creada por Linus Torvalds, desarrollador del Kernel Linux. Entre sus beneficios con respecto a otros sistemas de versionamiento tenemos que es un sistema distribuido que permite el trabajo con repositorios locales que luegos pueden ser fusionados con el repositorio principal.

### ¿Cómo uso GIT?

Lo primero que se debe hacer es instalarlo. Es muy fácil, -como es de costumbre en Linux-, escribimos lo siguiente en una consola con permisos de superusuario:

{% highlight bash %}
aptitude install git-core
{% endhighlight %}

Para comenzar a trabajar, accedemos al directorio principal de nuestro proyecto y ejecutamos los siguientes comandos:

{% highlight bash %}
git init
{% endhighlight %}

Con ésto inicializamos el versionamiento en el directorio raíz del proyecto

{% highlight bash %}
git add .
{% endhighlight %}

Añadimos todos los archivos del proyecto a ser versionados a nuestro repositorio local

{% highlight bash %}
git commit -a -m "Mensaje descriptivo de los cambios"
{% endhighlight %}

Realizamos la carga de la primera versión de nuestro proyecto

### Uso de un repositorio en línea

Existen varios lugares en internet que brindan servicio gratuito para almacenar proyectos de Software Libre bajo la plataforma GIT. Éstos sitios proveen un repositorio dinámico que permite un versionamiento descentralizado, es decir, que varias personas podrían hacer carga y descarga de datos en nuestro proyecto mediante permisología definida y fusión inteligente, facilitando así el trabajo colaborativo entre diferentes personas.

Uno de éstos sitios es [Gitorious](http://gitorious.org) (también está [github](http://github.com)). Para poder hacer uso de los servicios de Gitorious (o github), es necesario que tanto el creador del Proyecto como sus colaboradores se registren. Además, cada cuenta creada debe asignarsele la (o las) llave(s) SSH de los equipos autorizados para publicar o descargar contenido. Para conocer nuestra llave SSH utilizamos el comando `ssh-keygen`; el resultado de ésta consulta debe ser ingresado en el apartado "**Manage SSH Keys**", de la página de tu perfil en gitorious.org.

### Comenzando a trabajar

Inicialmente, debemos agregar el repositorio remoto, que para el caso de gitorious, se indica en la página principal del proyecto. Para ello, creamos un alias o nombre para la dirección del repositorio, de la siguiente forma:

{% highlight bash %}
git remote add [REPOSITORIO]
{% endhighlight %}

Por ejemplo:

{% highlight bash %}
git remote add origin git@gitorious.org:miproyecto/mirepositorio.git
{% endhighlight %}

Seguidamente, el comando para ejecutar la carga de archivos versionados al servidor es el siguiente (recordar hacer `git commit -a` antes):

{% highlight bash %}
git push [REMOTE] [RAMA]
{% endhighlight %}

En donde `[RAMA]` indica la rama del ciclo de desarrollo al que pertenece esta carga de archivos. La principal es master. Por ejemplo:

{% highlight bash %}
git push origin master
{% endhighlight %}

### Programación Colaborativa

Otras personas pueden bajar los archivos fuente "clonando" tu repositorio. Para hacerlo creamos una carpeta, digamos "proyecto" y dentro de ella ejecutamos:

{% highlight bash %}
git clone [REPOSITORIO]
{% endhighlight %}

Por ejemplo:

{% highlight bash %}
git clone http://git.gitorious.org/miproyecto/mirepositorio.git
{% endhighlight %}

Esto descargará los archivos de la rama principal (**master**) a la carpeta donde nos encontremos. Una vez en poder de los archivos fuente, podremos realizar modificaciones y subirlos al repositorio en línea con el comando `git push`, descrito anteriormente (siempre y cuando tengamos la permisología necesaria del creador en gitorious.org). Ésta actividad podemos repetirla cuantas veces sea necesario.

Es recomendable actualizar los archivos fuente cada vez que se vayan a realizar cambios para evitar discordancias.

Espero que les haya sido útil. Si tienen alguna pregunta, no duden en hacerla.
