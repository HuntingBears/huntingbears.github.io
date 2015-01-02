---
author: martinezfaneyth
language: es
date: 2012-08-19 02:38:29-04:30
layout: post
slug: buscar-archivos-en-la-base-de-datos-general-de-paquetes-con-apt-file
title: Buscar archivos en la base de datos general de paquetes con apt-file
wordpress_id: 2186
categories:
- Canaima
- Debian
- Software Libre
- Tutoriales
tags:
- apt-file
- archivos
- paquetes
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/2186/2feeffbcb82704fff0bf9127572e7e4d.jpg
description: apt-file permite realizar búsquedas dentro de los archivos contenidos en el sistema de paquetes de Debian.
---

Muchas veces ocurre en las distribuciones derivadas de Debian que encontramos errores en diversos archivos importantes, o por alguna razón debemos prestar especial atención a un archivo en particular. El ejemplo más recurrente se presenta cuando dañamos un archivo y deseamos restaurarlo a su estado original (siempre guarden una copia antes de hacer cambios). Lo ideal sería reinstalar el paquete que coloca ese archivo para poder restaurar el original y asegurarse de la ejecución de cualquier otro procedimiento necesario para el correcto funcionamiento.

Pero, ¿Cómo sabemos a cuál paquete pertenece el archivo en cuestión?. _apt-file_ es una herramienta que permite buscar dentro del índice de archivos de cada paquete existente en los repositorios configurados para tu sistema operativo, es decir, los que se encuentran en el archivo `/etc/apt/sources.list`. Su comportamiento es muy parecido al de `dpkg -S [PATRÓN]`, con la diferencia de que este último busca solamente dentro de los paquetes instalados en el sistema.

<!-- more -->

### Instalación y configuración

Si te encuentras en Canaima, Debian o Ubuntu, puedes instalar apt-file accediendo a una Terminal de Root (Menú > Accesorios > Terminal de Root) y tecleando el comando:

{% highlight bash %}
aptitude install apt-file
{% endhighlight %}

Seguidamente, es necesario actualizar la base de datos de apt-file. En este procedimiento se descargarán todos los índices de archivos contenidos en cada paquete del repositorio (archivos Contents). Mientras más repositorios se encuentren configurados en el archivo `/etc/apt/sources.list`, más grande será el volumen de la descarga. Normalmente la descarga se encuentra alrededor de los `~19MB`.

Para actualizar la base de datos utilizamos el comando:

{% highlight bash %}
apt-file update
{% endhighlight %}

Para buscar un archivo, utilizamos la sintaxis:

{% highlight bash %}
apt-file search [PATRÓN]
{% endhighlight %}

En donde `[PATRÓN]` es el patrón de búsqueda correspondiente al archivo que estamos buscando. El patrón de búsqueda puede incluir la ruta completa al archivo que se desea buscar, así como también acepta expresiones regulares.

### Casos de uso

Por ejemplo, supongamos que a nuestra computadora le hace falta la instalación de un firmware. Normalmente, cuando instalamos un kernel nuevo, se dispara automáticamente la regeneración del initramfs (`update-initramfs -u`), dicho proceso genera mensajes que advierten la ausencia de determinados archivos binarios correspondientes al firmware. Por ejemplo:

{% highlight text %}
update-initramfs: Generating /boot/initrd.img-2.6.32-5-amd64
W: Possible missing firmware /lib/firmware/e100/d102e_ucode.bin for module e100
W: Possible missing firmware /lib/firmware/e100/d101s_ucode.bin for module e100
W: Possible missing firmware /lib/firmware/e100/d101m_ucode.bin for module e100
{% endhighlight %}

Probablemente no sabremos que hacer con esta información, pero para apt-file esto es información muy valiosa. Si hacemos:

{% highlight bash %}
apt-file search d102e_ucode.bin
{% endhighlight %}

Tendremos la siguiente información:

{% highlight text %}
firmware-linux-nonfree: /lib/firmware/e100/d102e_ucode.bin
{% endhighlight %}

Lo que nos dirá que debemos instalar el paquete `firmware-linux-nonfree` para hacer disponible el archivo faltante y poner a funcionar nuestro dispositivo.

Otro importante uso se presenta en varias ocasiones, normalmente en los errores de la forma "_no se pudo encontrar el archivo perolito.conf_", "_archivo.conf: línea 45 malformada_" o "_script.sh: Error de sintaxis_". Basta con identificar el nombre del archivo (y quizás la ruta) para buscarlo con apt-file y reinstalar el paquete correspondiente.

Por ejemplo, es bien sabido que en LaTeX, para poder utilizar determinadas funcionalidades o aplicar ciertas características, es necesario la inclusión de paquetes de LaTeX. Sin embargo, dichos paquetes LaTeX se encuentran distribuidos en varios paquetes de las distribuciones derivadas de Debian. Es muy probable que la primera vez que convertamos un documento a PDF con pdflatex, ocurra un error parecido a este:

{% highlight text %}
! LaTeX Error: File `currvita.sty' not found.

Type X to quit or  to proceed,
or enter new name. (Default extension: sty)

Enter file name:
{% endhighlight %}

Indicando la ausencia de el archivo `currvita.sty`. Realizando una búsqueda con apt-file:

{% highlight bash %}
apt-file search currvita.sty
{% endhighlight %}

Encontramos que el paquete que necesitamos instalar es `texlive-latex-extra`:

{% highlight text %}
texlive-latex-extra: /usr/share/texmf-texlive/tex/latex/currvita/currvita.sty
{% endhighlight %}

Bueno, suficientes ejemplos, existen muchos más, pero es cuestión de aprender a identificar donde apt-file puede sernos de utilidad. Apt-file puede ser incluso más rápido que buscar en Google ;-)
