---
author: martinezfaneyth
date: 2012-08-25 19:48:35-04:30
layout: post
slug: haciendo-presentaciones-dinamicas-con-inkscape-y-sozi
title: Haciendo presentaciones dinámicas con Inkscape y Sozi
article_id: 2223
categories:
- Diseño Gráfico
- Software Libre
- Tutoriales
tags:
- inkscape
- presentaciones
- sozi
image: /static/img/posts/2223/haciendo-presentaciones-dinamicas-con-inkscape-y-sozi__1.jpg
description: Sozi es una herramienta que permite realizar presentaciones basadas en el format SVG.
---

Este 24 de agosto [me tocó realizar la ponencia]({{ site.url }}/desarrollando-con-ayuda-de-git-fudcon-valencia.html) que propuse para el FUDCon Valencia. Decidí hacer algo diferente a mis tradicionales láminas de Impress/ODP, aprovechando la aparición de herramientas más versátiles y modernas.

_Sozi_ es un plugin hecho en python para el editor de gráficos vectoriales Inkscape. Posibilita la realización de transiciones dinámicas entre varios objetos dentro de un gráfico vectorial, lo que permite al diseñador a hacer presentaciones verdaderamente impresionantes, a través de casi cualquier conjunto de dibujos o formas.

La presentación resultante es un _SVG_ (_Scalable Vector Graphics_), que contiene JavaScript insertado para habilitar las transiciones a partir de los clicks del mouse y/o flechas de dirección del teclado. El archivo SVG puede ser leído por cualquier navegador web moderno (**léase todos menos Internet Explorer**).

### Instalando Inkscape y Sozi

En Canaima, Debian o Ubuntu, Inkscape se instala a través del gestor de paquetes. Accede a una Terminal de Root (Menú > Aplicaciones > Accesorios > Terminal de Root) y ejecuta el siguiente comando:

{% highlight bash %}
aptitude install inkscape
{% endhighlight %}

En Fedora, se puede instalar a través de un Terminal de Root ejecutando el siguiente comando:

{% highlight bash %}
yum install inkscape
{% endhighlight %}

Para instalar Sozi se debe descargar la [última versión desde el sitio oficial](http://github.com/senshu/Sozi/archive/12.09.zip). Una vez descargado, se debe descomprimir y su contenido colocado en `/usr/share/inkscape/extensions/`. Este directorio necesita permisos de superusuario para poder recibir archivos. En resumen, se puede instalar Sozi con los siguientes comandos (como superusuarios):

{% highlight bash %}
wget http://github.com/senshu/Sozi/archive/12.09.zip
unzip sozi-release-12.05-08120927.zip
cp sozi* /usr/share/inkscape/extensions/
{% endhighlight %}

### Comenzando a crear

Bien, ejecutemos Inkscape (Menú > Aplicaciones > Gráficos > Inkscape) y comencemos haciendo 5 formas genéricas que nos servirán como "láminas" para la presentación. En inkscape, podemos hacer diferentes formas por defecto como estrellas, círculos, cuadrados, o simplemente podemos hacer nuestra propia forma si tenemos un poco de experiencia modificando gráficos vectoriales. Por ahora, les dejo esta forma que se ve más abajo para que la puedan utilizar. Cada imagen tiene un enlace a su código fuente SVG, pero la idea es que ustedes lo hagan en sus casas a manera de práctica.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2223/haciendo-presentaciones-dinamicas-con-inkscape-y-sozi__2.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2223/haciendo-presentaciones-dinamicas-con-inkscape-y-sozi__2.jpg"></span>

[Código fuente SVG para ser abierto con inkscape (botón derecho, guardar como)](http://dl.dropboxusercontent.com/u/16329841/forma.svg).

Ahora, replicamos la forma otras 4 veces (seleccionar, CTRL+C, CTRL-V) y cambiamos colores (seleccionar, hacer click en la barra de colores inferior para cada forma). Debe quedar algo parecido a la imagen inferior.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2223/haciendo-presentaciones-dinamicas-con-inkscape-y-sozi__4.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2223/haciendo-presentaciones-dinamicas-con-inkscape-y-sozi__4.jpg"></span>.

[Código fuente SVG para ser abierto con inkscape (botón derecho, guardar como)](http://dl.dropboxusercontent.com/u/16329841/formavarios.svg)

Una vez que tenemos las "láminas" de nuestra presentación, procedemos a llenar cada una con el contenido (imágenes, texto, gráficos, etc.). Para este ejemplo simplemente las enumeraremos.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2223/haciendo-presentaciones-dinamicas-con-inkscape-y-sozi__6.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2223/haciendo-presentaciones-dinamicas-con-inkscape-y-sozi__6.jpg"></span>.

[Código fuente SVG para ser abierto con inkscape (botón derecho, guardar como)](http://dl.dropboxusercontent.com/u/16329841/formavariosnumeros.svg).

Aquí es donde entra en escena Sozi. Cada lámina debemos encerrarla en un cuadrado, para ello debemos seleccionar la herramienta de rectángulos (a la izquierda) y seleccionar el candado para que el tamaño cambie proporcionalmente. Además, cada cuadrado debe tener solamente el contorno sin el relleno. Los cuadrados establecerán los límites de cada lámina y serán los que Sozi utilizará para computar las transiciones.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2223/haciendo-presentaciones-dinamicas-con-inkscape-y-sozi__1.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2223/haciendo-presentaciones-dinamicas-con-inkscape-y-sozi__1.jpg"></span>

[Código fuente SVG para ser abierto con inkscape (botón derecho, guardar como)](http://dl.dropboxusercontent.com/u/16329841/formavariosnumeroscuadros.svg).

Seguidamente, seleccionamos el cuadrado que encierra la forma que utilizaremos como primera diapositiva y hacemos click en la opción "Sozi" del menú Extensiones. Aparecerá un cuadro como el que se refleja en la captura de pantalla inferior, en donde debemos presionar el boton que tiene forma de + para agregar una diapositiva asociada al cuadrado que seleccionamos.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2223/haciendo-presentaciones-dinamicas-con-inkscape-y-sozi__10.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2223/haciendo-presentaciones-dinamicas-con-inkscape-y-sozi__10.jpg"></span>

En el mismo cuadro, existen diversas opciones para configurar otros aspectos de la diapositiva y su transición hacia la siguiente:

* _**Título**_: el título del cuadro actual tal y como aparecerá en el menú de navegación.
* _**Ocultar**_: marca esta casilla para ocultar el cuadrado durante la presentación.
* _**Clip**_: marca esta casilla para recortar el área de visualización que esté por fuera de los límites del cuadrado.
* _**Habilitar tiempo de espera (s)**_: si esta casilla está marcada, la presentación pasará al siguiente fotograma de forma automática después del tiempo indicado. Si no está marcada, sólo las teclas de dirección o el click de mouse te permitirá ir al siguiente fotograma.
* _**Duración (s)**_: la duración de la transición entre la diapositiva anterior y la actual.
* _**Ampliación (%)**_: el porcentaje de ampliación que se aplicará a la siguiente diapositiva.
* _**Perfil**_: el tipo de animación que se realizará durante la transición (lineal, acelerar, desacelerar, luego acelerar desacelerar, entre otros).

Luego de aplicar los cambios, debemos realizar este procedimiento con cada diapositiva, seleccionando el cuadrado y menú Extensiones > Sozi.

Finalmente guardamos, abrimos la presentación con nuestro navegador preferido y deberíamos obtener algo parecido a lo que tenemos acá debajo.

<iframe class="svgviewer" src="http://dl.dropboxusercontent.com/u/16329841/formavariosnumeroscuadrosfinal.svg"></iframe>
