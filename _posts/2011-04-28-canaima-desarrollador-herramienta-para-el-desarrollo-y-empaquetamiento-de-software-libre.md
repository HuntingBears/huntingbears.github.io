---
author: martinezfaneyth
date: 2011-04-28 20:54:01-04:30
layout: post
slug: canaima-desarrollador-herramienta-para-el-desarrollo-y-empaquetamiento-de-software-libre
title: 'Canaima Desarrollador: Herramienta para el desarrollo y empaquetamiento de Software Libre'
article_id: 676
categories:
- Canaima
- Desarrollo
- Software Libre
tags:
- canaima desarrollador
- empaquetar
- Software Libre
image: http://huntingbears.com.ve/static/img/posts/676/canaima-desarrollador-herramienta-para-el-desarrollo-y-empaquetamiento-de-software-libre__1.jpg
description: Canaima Desarrollador es un asistente de empaquetamiento y desarrollo.
---

Desde un tiempo para acá, en el equipo de desarrollo de Canaima GNU/Linux nos hemos propuesto como meta la creación de cada vez más herramientas liberadoras que le faciliten a la gente la apropiación del conocimiento, que es al final de cuentas, el propósito del Software Libre.

En ese sentido, podemos decirles que hemos venido trabajando en **Canaima Desarrollador**, un conjunto de herramientas destinadas a facilitar la creación de software para Canaima.

### ¿De qué se trata Canaima Desarrollador?

Canaima Desarrollador (C-D) es un compendio de herramientas y ayudantes que facilitan el proceso de desarrollo de software para Canaima GNU/Linux. Está diseñado para **facilitar el trabajo** a aquellas personas que participan en dicho proceso con regularidad, como también para **iniciar a los que deseen aprender** de una manera rápida y práctica.

C-D sigue dos líneas de acción principales para lograr éste cometido: **la práctica** y **la formativa**. La práctica permite:

* Agilizar los procesos para la creación de paquetes binarios canaima a partir de paquetes fuentes correctamente estructurados; es decir, facilita el empaquetamiento.
* Automatización personalizada de la creación de Paquetes Fuentes acordes a las Políticas de Canaima GNU/Linux.
* Creación de un depósito personal, por usuario, donde se guardan automáticamente y en carpetas separadas los siguientes tipos de archivo:

    * Proyectos en proceso de empaquetamiento
    * Paquetes Binarios (\*.deb)
    * Paquetes Fuente (\*.tar.gz, \*.dsc, \*.changes, \*.diff)
    * Registros provenientes de la creación de paquetes binarios (\*.build)

* Versionamiento asistido (basado en git) en los proyectos, brindando herramientas para realizar las siguientes operaciones, con un alto nivel de automatización y detección de posibles errores:

    * git clone
    * git commit
    * git push
    * git pull

* Ejecución de tareas en masa (empaquetar, hacer pull, push, commit, entre otros), para agilizar procesos repetitivos.

En el otro aspecto, el formativo, C-D incluye:

* El [Manual del Desarrollador](http://wiki.canaima.softwarelibre.gob.ve/wiki/Manual_del_Desarrollador), resumen técnico-práctico de las herramientas cognitivas necesarias para desarrollar paquetes funcionales para Canaima GNU/Linux.
* La [Guía de Referencia para el Desarrollador](http://wiki.canaima.softwarelibre.gob.ve/wiki/Gu%C3%ADa_de_Referencia_para_el_Desarrollador), compendio extenso y detallado que extiende y complementa el contenido del Manual del Desarrollador.
* Un Manual de Uso para la herramienta Canaima Desarrollador.

### Configurando Canaima Desarrollador

Una vez leída la documentación, lo primero que hay que hacer antes de poder usar canaima-desarrollador es hacer la configuración inicial de la aplicación, editando un archivo de texto como el que se muestra más abajo para llenar los datos del usuario. El archivo en cuestión se encuentra en la carpeta del usuario **/home/\[USUARIO\]/.config/canaima-desarrollador/usuario.conf** y se puede editar con cualquier editor de texto simple como vim, nano o gedit.

{% highlight bash %}
# Fichero de configuración personal para Canaima Desarrollador

# Datos del repositorio remoto donde se alojan todos tus proyectos
# Dominio del servidor
REPO="gitorious.org"

# Usuario SSH para acceder al servidor
REPO_USER="git"

# Directorio del servidor donde se encuentran alojados todos los proyectos
REPO_DIR="canaima-gnu-linux"

# Directorio local donde guardas todos tus proyectos git
DEV_DIR="/home/dev/"

# Nombre con el que identificarás tus proyectos.
# Debe coincidir con los datos de tu llave GPG.
DEV_NAME="Luis Alejandro Martínez Faneyth"

# Correo con el que identificarás tus proyectos.
# Debe coincidir con los datos de tu llave GPG.
DEV_MAIL="martinez.faneyth@gmail.com"

# Tu llave pública GPG
DEV_GPG="E78DAA2E"

# Lugar donde se moverán los .tar.gz .changes .diff y .dsc
# cuando se termine de empaquetar un proyecto
DEPOSITO_SOURCES="/home/dev/SOURCES"

# Lugar donde se moverán los .deb cuando se
# termine de empaquetar un proyecto
DEPOSITO_DEBS="/home/dev/DEBS"

# Lugar donde se moverán los .build cuando se
# termine de empaquetar un proyecto
DEPOSITO_LOGS="/home/dev/LOGS"
{% endhighlight %}

Un poco de explicación extra acerca de los campos:

* `REPO`, `REPO_USER` Y `REPO_DIR`: estos campos se utilizan para construir la dirección SSH del servidor donde se encuentra alojado el repositorio git de código fuente. Se construye de la forma `REPO_USER@REPO:REPO_DIR/[PROYECTO].git`
* `DEV_NAME`, `DEV_MAIL` Y `DEV_GPG`: Corresponden a los datos personales del desarrollador, con los cuales se identificarán todos los proyectos que se hagan con Canaima Desarrollador. Los campos `DEV_NAME` y `DEV_MAIL` sirven para identificar el campo Maintainer del archivo control, mientras que `DEV_GPG` es un campo opcional (si es ingresado, canaima-desarrollador firmará todos los paquetes con esa llave GPG, si no, se obvia la firma de los paquetes).
* `DEV_DIR`, `DEPOSITO_LOGS`, `DEPOSITO_SOURCES` y `DEPOSITO_DEBS` son directorios para la organización del proceso de empaquetamiento. El directorio especificado en DEV_DIR debe existir, mientras que los `DEPOSITO_*`, si no exiten, canaima-desarrollador los creará por ti.

### ¿Y como empiezo a usar Canaima Desarrollador?

Bueno, todo depende de cuáles sean nuestros objetivos. Supongamos que queremos solucionar un ticket de error en la página de Reporte de Bugs de la Plataforma Colaborativa (TRAC), por ejemplo, el [152](http://trac.canaima.softwarelibre.gob.ve/canaima/ticket/152) (ya resuelto) habla de sustituir una cadena de texto que dice "OpenOffice" por otra que diga "LibreOffice" en la aplicación canaima-acerca. Analizando el problema, podemos identificar una serie de pasos que debemos realizar para lograr este objetivo:

1. Descargar el código fuente del paquete canaima-acerca.
2. Hacer una búsqueda recursiva en el directorio base para encontrar en cuáles archivos se encuentra la cadena de texto "OpenOffice".
3. Realizar la sustitución de las cadenas encontradas por la cadena "LibreOffice".
4. Versionar los cambios.
5. Empaquetar la nueva versión del paquete canaima-acerca.
6. Subir los cambios al repositorio de código fuente.

El paso 1 está cubierto por el ayudante** c-d descargar** y los pasos del 4 al 6 por el ayudante **c-d empaquetar**, mientras que los pasos 2 y 3 requieren la intervención manual del desarrollador.

Comencemos:

1. Descarguemos el código fuente:

        c-d descargar --proyecto="canaima-acerca"

    Finalizado el procedimiento, tendremos una carpeta con el nombre del paquete (canaima-acerca) en al carpeta de desarrollador (la variable `DEV_DIR` que llenamos en el archivo de configuración). Ésta carpeta debe estar nombrada de la forma `nombre-paquete-X.Y+Z`, en donde `X.Y+Z` es la versión actual del paquete. Sin embargo, no te preocupes, en el proceso de empaquetamiento canaima-desarrollador se encargará de renombrarla por ti.

2. Busquemos dentro del paquete, la palabra "OpenOffice":

        cd /ruta-carpeta-desarrollador/canaima-acerca
        grep -R "OpenOffice" .

    Resultados:

        ./gnome-version.xml:- Se encuentra equipado con herramientas ofimáticas como OpenOffice, (procesador de palabras, hojas de cálculo, presentaciones), diseño gráfico, planificación de proyectos y bases de datos.

3. Reemplacemos "OpenOffice" por "LibreOffice" en el archivo gnome-version.xml:

        sed -i 's/OpenOffice/LibreOffice/g' gnome-version.xml

4. Reempaquetemos la aplicación:

        c-d empaquetar --mensaje="Corrigiendo la aparición de la aplicación OpenOffice por LibreOffice. Ticket #152."

Listo, deberíamos tener el paquete .deb en la carpeta que especificamos como `DEPOSITO_DEBS` en la configuración.

Te invito a leer en profundidad el Manual del Desarrollador para que descubras el resto de las interesantes funcionalidades de Canaima Desarrollador.

### Los ayudantes de Canaima Desarrollador

* `c-d crear-proyecto`: Crea un proyecto de empaquetamiento al estilo Canaima.
* `c-d debianizar`:Alista un proyecto de software existente para ser empaquetado.
* `c-d crear-fuente`:Crea un paquete fuente a partir de un proyecto de software.
* `c-d empaquetar`:Crea un paquete binario a partir de un proyecto de software.
* `c-d descargar`:Descarga un proyecto existente en el repositorio de código y lo ubica en la carpeta del desarrollador.
* `c-d registrar`:Registra los cambios hechos localmente para un proyecto específico.
* `c-d enviar`:Envía los cambios al repositorio de código de un proyecto específico.
* `c-d actualizar`:Actualiza tu código local con el del repositorio de código para un proyecto en específico.
* `c-d descargar-todo`:Descarga todo lo existente en el repositorio de código y lo coloca en la carpeta del desarrollador.
* `c-d registrar-todo`:Registra todo lo existente en la carpeta del desarrollador al repositorio de código.
* `c-d enviar-todo`:Envía todo lo existente en la carpeta del desarrollador al repositorio de código.
* `c-d actualizar-todo`:Actualiza todo lo existente en la carpeta del desarrollador con lo encontrado en el repositorio de código.
* `c-d empaquetar-varios`:Crea los paquetes binarios de los proyectos especificados.
* `c-d empaquetar-todo`:Empaqueta todo lo existente en la carpeta del desarrollador.
* `c-d listar-remotos`:Lista los proyectos existentes en el repositorio de código.
* `c-d listar-locales`:Lista los proyectos existentes en la carpeta del desarrollador.
