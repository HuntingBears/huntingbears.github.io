---
author: martinezfaneyth
language: es
date: 2013-09-11 16:00:28-04:30
layout: post
slug: una-pequena-rutina-para-relacionar-locales-con-paquetes-de-idiomas
title: Una pequeña rutina para relacionar locales con paquetes de idiomas
wordpress_id: 4088
categories:
- Canaima
- Desarrollo
- Software Libre
tags:
- i18n
- internationalization
- locales
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/4088/3882d947af2674811118c1ed32578224.jpg
description: La idea de este script es generar una base de datos que asocie los códigos de locales con los paquetes de traducciones.
---

Hace algún tiempo, con un poco de insomnio, hice un script para ayudar al compañero [Erick](http://erickcion.wordpress.com/) en la tarea de la internacionalización de Canaima. Escribo este artículo a manera de reseña y documentación de este script, el cuál posiblemente sea de utilidad para alguna otra distribución que esté comenzando sus tareas de internacionalización.

La internacionalización de una distribución es diferente del concepto tradicional que aplica en el desarrollo de aplicaciones, aquí lo importante es:

1. Permitir al usuario escoger el idioma en el cuál se va a instalar su sistema operativo, por lo que predeterminar un idioma en específico está fuera de lugar. Este procedimiento generalmente va en el instalador de la distribución.
2. Generar el procedimiento pertinente para poder habilitar el idioma seleccionado, durante (o posterior) a la instalación del sistema operativo.

La idea de este script es generar una _base de datos_ (en forma de diccionario de python) que asocie los códigos de _locales_ (lenguajes), con los paquetes de traducciones de una serie de aplicaciones conocidas y presentes en Canaima.

Algunos se preguntarán, ¿Por qué no se utilizan los paquetes de internacionalización de Debian?, la respuesta es que **están incompletos**. Si bien existen los paquetes de tareas que traducen al español y otros lenguajes comunes, los cuales agrupan los paquetes de traducciones para páginas de manual, diccionarios, entre otros, existen casos en los cuales no existen paquetes de tareas para un lenguaje poco común.

<!-- more -->

### ¿Cómo funciona?

Este script utiliza la base de datos de locales (lenguajes) soportados, el cuál se encuentra en `/usr/share/i18n/SUPPORTED` y es colocado allí por el paquete `locales`. Es utilizado para determinar la lista de los códigos de localización existentes en la forma `xy-zw`, como por ejemplo: `es-es`, `en-us`, `en-gb`, entre otros. Estos códigos son utilizados luego para ciclar a través de una serie de paquetes de localización comunes, y determinar si existen en los repositorios o no.

Por ejemplo, si el paquete `myspell-es-es` existe, se incluye bajo el ítem `'es-es'` del diccionario, y así para todos los paquetes de traducción conocidos (la lista puede ampliarse). Obtendremos algo así:

{% highlight python %}
{
    ...
    'es-ve': ['manpages-es', 'myspell-es', 'aspell-es', 'cunaguaro-l10n-es-es', 'libreoffice-l10n-es', 'libreoffice-help-es'],
    'et-ee': ['myspell-et', 'aspell-et', 'cunaguaro-l10n-et', 'libreoffice-l10n-et', 'libreoffice-help-et'],
    'eu-es': ['hunspell-eu-es', 'aspell-eu-es', 'cunaguaro-l10n-eu', 'libreoffice-l10n-eu', 'libreoffice-help-eu'],
    'eu-fr': ['cunaguaro-l10n-eu', 'libreoffice-l10n-eu', 'libreoffice-help-eu'],
    'fa-ir': ['myspell-fa', 'aspell-fa', 'cunaguaro-l10n-fa', 'libreoffice-l10n-fa'],
    ...
}
{% endhighlight %}

Se deben aclarar varias cosas:

* El script debe ejecutarse como root, de la siguiente forma:

        bash /ruta/al/archivo.sh

* El script utiliza los repositorios existentes en el archivo `/etc/apt/sources.list`, por lo que el diccionario se calculará con la base de datos de paquetes resultante. Esto significa que si se quiere, por ejemplo, hacer una base de datos de paquetes de traducción para Debian Sid, deben introducirse sólo los repositorios de Debian Sid en el archivo `/etc/apt/sources.list` antes de ejecutar el script.
* El resultado de este script se guarda en un archivo de nombre `locales.dict` dentro de la misma carpeta donde se encuentre el script. Este archivo por sí mismo no hace nada, puesto que es simplemente un diccionario de python. La lógica para instalar los paquetes según el código de lenguaje utilizado, debe implementarse en una aplicación aparte.

Sin más preámbulo, acá dejo el script con algunos comentarios para explicar.

{% highlight bash %}
#!/bin/bash -e

# Actualizamos la base de datos apt
apt-get update

SIZE=0
LIST=""

# Obtenemos la lista de códigos de locales soportados por el sistema
LOCALES="$( cat /usr/share/i18n/SUPPORTED | tr '[:upper:]' '[:lower:]' | sed 's/_/-/;s/[.@ ].*//' | sort -u )"

# Construímos estructura de datos inicial en el arcivo 'locales.dict'
echo "" > locales.dict
echo "{" | tee -a locales.dict

# Recorremos la lista de locales
for L in ${LOCALES}; do

    # Determinamos el lenguaje raíz
    ROOTLC="${L%-*}"

    # Inicializamos el buffer con el primer corchete de la lista
    # Esta será la lista de paquetes que se imprimirá en el ítem
    # del diccionario
    BUFFER="["

    # Recorremos los paquetes comunes
    for P in manpages hunspell myspell ispell aspell guacharo-l10n cunaguaro-l10n libreoffice-l10n libreoffice-help; do

        # Si existe un paquete en el repositorio que se llame "NOMBRE_PAQUETE-CÓDIGO_LENGUAJE" ...
        if apt-get --print-uris download "$P-$L" 1>/dev/null 2>&1; then

            # Lo metemos en el buffer
            BUFFER="${BUFFER}'$P-$L', "

            # Lo metemos en la lista de paquetes
            LIST="${LIST} $P-$L"

            # Obtenemos su tamaño
            SIZE="$( apt-cache show "$P-$L" | grep "Installed-Size: " | awk '{print $2}' )+${SIZE}"

        # Si no existe un paquete que coincida con el código de lenguaje, pero si existe
        # su lenguaje raíz ...
        elif apt-get --print-uris download "$P-$ROOTLC" 1>/dev/null 2>&1; then

            # Lo metemos en el buffer
            BUFFER="${BUFFER}'$P-$ROOTLC', "

            # Lo metemos en la lista de paquetes
            LIST="${LIST} $P-$ROOTLC"

            # Obtenemos su tamaño
            SIZE="$( apt-cache show "$P-$ROOTLC" | grep "Installed-Size: " | awk '{print $2}' )+${SIZE}"
        fi

    done

    # Imprimimos el ítem de diccionario, más el contenido del buffer
    # el cuál contiene la lista de paquetes de traducción y luego lo
    # introducimos en el archivo locales.dict
    echo "'$L': ${BUFFER}]," | tee -a locales.dict

done

# Cerramos el diccionario
echo "}" | tee -a locales.dict

# Esta es la lista de paquetes completa
echo "La lista de paquetes a incluir en el pool de la ISO:"
echo "${LIST}" | sort -u

# Este es el tamaño total de todos los paquetes
echo "EL tamaño sin comprimir de todos los paquetes:"
echo "${SIZE}" | bc
{% endhighlight %}
