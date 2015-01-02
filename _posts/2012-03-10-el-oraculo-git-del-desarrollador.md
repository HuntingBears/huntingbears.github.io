---
author: martinezfaneyth
language: es
date: 2012-03-10 15:18:08-04:30
layout: post
slug: el-oraculo-git-del-desarrollador
title: El oráculo git del desarrollador
wordpress_id: 1865
categories:
- Canaima
- Debian
- Desarrollo
- Software Libre
tags:
- comandos
- git
- glosario
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/1865/be3bf5f84de7cc5da1b44d070fd7c15e.jpg
description: Presentamos una lista de comandos de git que pueden ser útiles en diversos casos.
---

El oráculo del desarrollador git es un glosario de comandos básicos que comprenden actividades desde las más sencillas hasta las más complejas. Guárdalo en tus favoritos para que lo tengas a mano cuando necesites consultar un comando git.

### Configuración

{% highlight bash %}
# Abre la configuración global ~/.gitconfig en el editor predeterminado
# para modificar las opciones
git config -e --global

# Establece el nombre y correo electrónico para los mensajes de commit
git config --global user.name "John Doe"
git config --global user.email "johndoe@example.com"

# Muestra todas las opciones de configuración.
git config --list

# Muestra la salida de los comandos con colores
git config --global color.diff auto
git config --global color.status auto
git config --global color.branch auto
{% endhighlight %}

`GIT_AUTHOR_NAME`, `GIT_COMMITTER_NAME`: Variables de entorno para modificar el nombre completo del committer (sobreescribe la configuración especificada a través de `git config`).

`GIT_AUTHOR_EMAIL`, `GIT_COMMITTER_EMAIL`: Variables de entorno para modificar el correo del committer (sobreescribe la configuración especificada a través de `git config`).

<!-- more -->

### Inicializar repositorio

{% highlight bash %}
# Inicializa el repositorio git en la carpeta actual
git init
{% endhighlight %}

{% highlight bash %}
# Inicializa el repositorio para ser utilizado como servidor
git init --bare
{% endhighlight %}

### Añadir/Eliminar archivos

{% highlight bash %}
# Agrega archivos al área de versionamiento para ser incluidos
# en el próximo commit
git add [ARCHIVO1] [ARCHIVO2] [ARCHIVO3] ...
git stage [ARCHIVO1] [ARCHIVO2] [ARCHIVO3] ...
# Ejemplos:
# git add archivo.php
# git add *.py
{% endhighlight %}

{% highlight bash %}
# Agrega carpetas al área de versionamiento para ser incluidos
# en el próximo commit
git add [CARPETA]
git stage [CARPETA]
# Ejemplos:
# git add .
# git add documentos/
{% endhighlight %}

{% highlight bash %}
# Muestra un modo interactivo para seleccionar las líneas de código
# que se deben agregar al área de versionamiento
git add -p
git stage --patch
{% endhighlight %}

{% highlight bash %}
# Muestra un modo interactivo para selecionar los archivos
# a incluir en el área de versionamiento
git add -i
git stage --interactive
{% endhighlight %}

{% highlight bash %}
# Remueve archivos del sistema de archivos y de la base de datos
git rm [ARCHIVO1] [ARCHIVO2] [ARCHIVO3] ...
{% endhighlight %}

{% highlight bash %}
# Remueve archivos sólo de la base de datos
git rm --cached [ARCHIVO1] [ARCHIVO2] [ARCHIVO3] ...
{% endhighlight %}

{% highlight bash %}
# Remueve archivos de la base de datos que hayan sido removidos del
# sistema de archivos (con rm, por ejemplo)
git rm $( git ls-files --deleted )
{% endhighlight %}

### Registrar cambios

{% highlight bash %}
# Registra los cambios del área de versionamiento de los archivos
# -m especifica el mensaje descriptivo de los cambios
git commit [ARCHIVO1] [ARCHIVO2] [ARCHIVO3] ... [-m "MENSAJE"]
{% endhighlight %}

{% highlight bash %}
# Regista todos los cambios en el área de versionamiento
git commit -a
{% endhighlight %}

{% highlight bash %}
# Registra los cambios en modo verbose
git commit -v
{% endhighlight %}

{% highlight bash %}
# Permite corregir el mensaje del último commit
git commit --amend

# Permite corregir el mensaje del último commit incluyendo los cambios hechos a los archivos
git commit --amend [ARCHIVO1] [ARCHIVO2] [ARCHIVO3] ...
{% endhighlight %}

### Información

{% highlight bash %}
# Muestra un resumen de todos los cambios realizados desde
# el último commit
git diff

# Muestra un resumen de los cambios realizados a un [ARCHIVO]
# en particular desde el último commit
git diff -- [ARCHIVO]

# Muestra los cambios versionados pero que no se les ha hecho commit
# (staging area)
git diff --cached
{% endhighlight %}

{% highlight bash %}
# Muestra el estado del versionamiento: archivos añadidos al área de
# versionamiento, archivos versionados con cambios y archivos sin versionar.
git status

# Muestra el registro de los commits hechos hasta el momento
git log

# Muestra el registro con los diffs completos en cada commit
git log -p

# Muestra el registro con colores
git log --color

# Muestra el registro en forma de gráfico
git log --graph

# Muestra el registro con la información de los tags
git log --decorate

# Muestra el registro con un resumen de los cambios hechos
# en cada commit
git log --stat

# Muestra los commits hechos por un autor en específico
git log --author=name@mail.com

# Muestra los commits hechos después de la fecha MM DD YYYY
git log --after="MM DD YYYY"

# Muestra los commits hechos antes de la fecha MM DD YYYY
git log --before="MM DD YYYY"

# Muestra los commits que han sido fusiones de ramas
git log --merges

# Muestra los commits en formato de una línea
git log --pretty=oneline

# Muestra los commits en formato:
git log --pretty=format:"%an %ad %h %s"

# Muestra los commits entre un rango de commits
git log [COMMIT]..[COMMIT]
{% endhighlight %}

{% highlight bash %}
# Muestra los commits que afectaron un [ARCHIVO], los más recientes primero
git whatchanged [ARCHIVO]
{% endhighlight %}

{% highlight bash %}
# Muestra los cambios (diff) introducidos en un commit específico
git show [COMMIT]
{% endhighlight %}

{% highlight bash %}
# Muestra los autores de cada línea en un archivo
git blame [ARCHIVO]

# Muestra los autores de cada línea en un archivo para un [COMMIT] específico
git blame [ARCHIVO] [COMMIT]
{% endhighlight %}

{% highlight bash %}
# Muestra una interfaz gráfica para git blame
# (necesita la instalación del paquete git-gui)
git gui blame [ARCHIVO]
{% endhighlight %}

{% highlight bash %}
# Muestra todos los archivos versionados
git ls-files
{% endhighlight %}

{% highlight bash %}
# Muestra todos los tags existentes en el repositorio remoto
git ls-remote [REMOTE]
{% endhighlight %}

### Ramas, Fusiones y Etiquetas

{% highlight bash %}
# Muestra las ramas locales
git branch

# Muestra las ramas remotas
git branch -r

# Muestra las ramas locales y remotas
git branch -a
{% endhighlight %}

{% highlight bash %}
# Crea una [RAMA-NUEVA] a partir de la rama actual
git branch [RAMA-NUEVA]

# Crea una [RAMA-NUEVA] a partir de una [RAMA-EXISTENTE]
git branch [RAMA-NUEVA] [RAMA-EXISTENTE]
{% endhighlight %}

{% highlight bash %}
# Crea una [RAMA-NUEVA] en el [REPOSITORIO] a partir de una [RAMA-EXISTENTE]
git push [REPOSITORIO] [RAMA-EXISTENTE]:refs/heads/[RAMA-NUEVA]
{% endhighlight %}

{% highlight bash %}
# Crea una [RAMA-NUEVA] configurada para seguir una [RAMA-REMOTA]
git branch --track [RAMA-NUEVA] [RAMA-REMOTA]
# Ejemplo:
# git branch --track development origin/development
{% endhighlight %}

{% highlight bash %}
# Configura una [RAMA-EXISTENTE] para seguir una [RAMA-REMOTA]
git branch --set-upstream [RAMA-EXISTENTE] [RAMA-REMOTA]
{% endhighlight %}

{% highlight bash %}
# Elimina una [RAMA]
git branch -d [RAMA]

# Elimina una [RAMA] incluso si tiene datos no versionados
git branch -D [RAMA]

# Elimina una [RAMA] que fue creada para seguir una [RAMA-REMOTA]
git branch -r -d [RAMA]
{% endhighlight %}

{% highlight bash %}
# Cambia a la rama [RAMA]
git checkout [RAMA]
{% endhighlight %}

{% highlight bash %}
# Crea una [RAMA-NUEVA] a partir de una [RAMA-EXISTENTE] y luego se cambia a [RAMA-NUEVA]
git checkout -b [RAMA-NUEVA] [RAMA-EXISTENTE]
{% endhighlight %}

{% highlight bash %}
# Elimina una [RAMA] del [REPOSITORIO]
git push [REPOSITORIO] :[RAMA]
{% endhighlight %}

{% highlight bash %}
# Incluye un [ARCHIVO] desde una [RAMA] en la rama actual
git co [RAMA] [ARCHIVO]
{% endhighlight %}

{% highlight bash %}
# Muestra el contenido de un [ARCHIVO] de una [RAMA] diferente a la actual
git show [RAMA] -- [ARCHIVO]
{% endhighlight %}

{% highlight bash %}
# Muestra el contenido de un [ARCHIVO] en un [COMMIT] específico
git show [COMMIT]:[ARCHIVO]
{% endhighlight %}

{% highlight bash %}
# Fusiona una [RAMA] con la rama actual
git merge [RAMA]
{% endhighlight %}

{% highlight bash %}
# Fusiona una [RAMA] pero no hace commit
git merge [RAMA] --no-commit
{% endhighlight %}

{% highlight bash %}
# Fusiona una [RAMA] y en caso de haber conflictos, resolverlos dejando los
# cambios de la rama actual
git merge [RAMA] -X recursive -s ours

# Fusiona una [RAMA] y en caso de haber conflictos, resolverlos dejando los
# cambios de [RAMA]
git merge [RAMA] -X recursive -s theirs
{% endhighlight %}

{% highlight bash %}
# Abre un solucionador de conflictos interactivo en caso de una fusión fallida
git mergetool
{% endhighlight %}

{% highlight bash %}
# Muestra una lista de todas las etiquetas definidas en el repositorio.
git tag -l
{% endhighlight %}

{% highlight bash %}
# Crea una etiqueta [TAG] en el último commit
git tag [TAG]
{% endhighlight %}

{% highlight bash %}
# Elimina una etiqueta [TAG]
git tag -d [TAG]
{% endhighlight %}

### Compartir

{% highlight bash %}
# Clona un repositorio git presente en [URL]
git clone [URL]
{% endhighlight %}

{% highlight bash %}
# Trae los cambios existentes en el [REPOSITORIO] sin fusionar los cambios
git fetch [REPOSITORIO]
{% endhighlight %}

{% highlight bash %}
# Fusiona los cambios existentes en el [REPOSITORIO] de la [RAMA]
git pull [REPOSITORIO] [RAMA]
{% endhighlight %}

{% highlight bash %}
# Envía los cambios de una [RAMA] al [REPOSITORIO]
git push [REPOSITORIO] [RAMA]
{% endhighlight %}

{% highlight bash %}
# Agrega un repositorio remoto [URL] bajo el pseudónimo [REPOSITORIO]
git remote add [REPOSITORIO] [URL]
{% endhighlight %}

{% highlight bash %}
# Muestra la información referente a un [REPOSITORIO]
git remote show [REPOSITORIO]
{% endhighlight %}

{% highlight bash %}
# Elimina un [REPOSITORIO] de la lista de repositorios disponibles
git remote rm [REPOSITORIO]
{% endhighlight %}

{% highlight bash %}
# Elimina una [RAMA] en el [REPOSITORIO]
git push [REPOSITORIO] :ref/heads/[RAMA]
{% endhighlight %}

{% highlight bash %}
# Crea una [RAMA] en el [REPOSITORIO]
git push [REPOSITORIO] [REPOSITORIO]:ref/heads/[RAMA]
{% endhighlight %}

{% highlight bash %}
# Reemplaza [RAMA] con [NUEVARAMA] en el [REPOSITORIO]
git push [REPOSITORIO] +[RAMA]:[NUEVARAMA]
{% endhighlight %}

### Corrigiendo errores y manipulando historial

{% highlight bash %}
# Revierte un [COMMIT]
git revert [COMMIT]
{% endhighlight %}

{% highlight bash %}
# Trae el [ARCHIVO] desde un [COMMIT] previo al sistema de archivos actual
git checkout [COMMIT] [ARCHIVO]
{% endhighlight %}

{% highlight bash %}
# Remueve los archivos del area de versionamiento para el próximo commit
git reset HEAD [ARCHIVO1] [ARCHIVO2] [ARCHIVO3] ...
{% endhighlight %}

{% highlight bash %}
# Devuelve el estado del sistema de archivos hasta el último commit
git reset --hard
{% endhighlight %}

{% highlight bash %}
# Devuelve hasta el último commit, pero deja los archivos en el área de versionamiento
git reset --soft
{% endhighlight %}

{% highlight bash %}
# Trae el código de un [TAG] al área de versionamiento
git co [TAG]
{% endhighlight %}

{% highlight bash %}
# Obtiene los cambios introducidos por [COMMIT] y hace un nuevo commit
git cherry-pick [COMMIT]
{% endhighlight %}

{% highlight bash %}
# Permite fusionar los N últimos commits en uno solo
git rebase --interactive HEAD~N
{% endhighlight %}

### Guardado temporal

{% highlight bash %}
# Guarda las modificaciones sin registrar en una base de datos temporal
# Permite realizar otras operaciones (git pull, git checkout, etc.) sin
# necesidad de hacer commit de los cambios
git stash
git stash save
{% endhighlight %}

{% highlight bash %}
# Restaura los cambios guardados en el último stash
git stash apply
{% endhighlight %}

{% highlight bash %}
# Restaura los cambios guardados en el último stash y lo remueve de la lista
git stash pop
{% endhighlight %}

{% highlight bash %}
# Muestra una lista de todos los stashes
git stash list
{% endhighlight %}

{% highlight bash %}
# Muestra el contenido de los cambios guardados en un [STASH]
git stash show [STASH] -p
{% endhighlight %}

{% highlight bash %}
# Elimina un [STASH]
git stash drop [STASH]
{% endhighlight %}

{% highlight bash %}
# Elimina todos los stashes
git stash clear
{% endhighlight %}

### Submódulos

{% highlight bash %}
# Agrega el repositorio [URL] como submódulo en la [RUTA] dentro de
# un repositorio git existente
git add submodule [URL] [RUTA]
{% endhighlight %}

{% highlight bash %}
# Actualiza [e inicializa] el estado de los submódulos de un super-repo
git submodule update [--init]
{% endhighlight %}

{% highlight bash %}
# Ejecuta un [COMANDO] en cada uno de los submódulos
git submodulo foreach [COMANDO]
{% endhighlight %}

Eliminación de submódulos

1. Eliminar la línea correspondiente del archivo `.gitmodules`.
2. Eliminar la sección pertinente de `.git/config`.
3. Ejecutar `git rm --cached [RUTA-AL-SUBMÓDULO]` (sin barra al final).
4. Hacer commit y eliminar los archivos del submódulo.

Actualización de submódulos

{% highlight bash %}
cd [RUTA-AL-SUBMODULO]
git pull [REPOSITORIO] [RAMA]
cd [RUTA-AL-SUPER-REPO]
git commit -a
{% endhighlight %}

### Trabajando con parches

{% highlight bash %}
# Genera un parche a partir del último commit
git format-patch HEAD^
{% endhighlight %}

{% highlight bash %}
# Genera un parche a partir de un rango de commits
git format-patch [COMMIT]̣̣^..[COMMIT]
{% endhighlight %}

{% highlight bash %}
# Aplica un [PARCHE] generado por git format-patch
git am [PARCHE]
{% endhighlight %}

{% highlight bash %}
# Genera un [PARCHE] a partir de las diferencias entre el último commit
# y el estado actual (con formato compatible con la herramienta patch)
git diff --no-prefix > [PARCHE]
{% endhighlight %}

### Archivos comprimidos

{% highlight bash %}
# Genera un archivo tar en [RUTA]
git archive master | tar -x -C [RUTA]
{% endhighlight %}

{% highlight bash %}
# Genera un archivo source.tar.bz2
git archive master | bzip2 > source.tar.bz2
{% endhighlight %}

{% highlight bash %}
# Genera un archivo source.zip del último commit
git archive -o source.zip HEAD
{% endhighlight %}

{% highlight bash %}
# Genera un archivo source.tar.gz a partir del tag [TAG]
git archive -o source.tar.gz [TAG]
{% endhighlight %}

### Hacks

{% highlight bash %}
# Optimizar el repositorio para disminuir el tamaño
git gc --aggressive
{% endhighlight %}

{% highlight bash %}
# Comprime al máximo el repositorio
git repack -a -d --window=50 --depth=50 --window-memory=1024m
{% endhighlight %}

{% highlight bash %}
# Ignora [ARCHIVO] del versionamiento
echo "[ARCHIVO]" >> .gitignore
{% endhighlight %}

¡Espero que les sirva!
