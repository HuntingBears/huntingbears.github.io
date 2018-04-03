---
author: martinezfaneyth
date: 2012-08-19 17:24:17-04:30
layout: post
slug: haciendo-resumenes-curriculares-profesionales-con-latex
title: Haciendo resúmenes curriculares profesionales con LaTeX
article_id: 2222
categories:
- Software Libre
- Tutoriales
tags:
- curriculum
- latex
- vitae
image: /static/img/posts/2222/haciendo-resumenes-curriculares-profesionales-con-latex__1.jpg
description: Aprende a hacer resúmenes curriculares únicos con LaTeX.
---

Escribir mi currículo en LaTeX era una tarea que había estado en mi lista de _cosas por hacer_ por un buen rato. Me gustaba mi viejo currículo escrito en el tradicional procesador de textos, pero siempre me había llamado la atención el toque que le da LaTeX a las tipografías y lo sencillo que se diagraman las cosas una vez entendido el asunto; además, ya me estaba aburriendo de las tablas. Pensé que me costaría mucho aprender, pero un día me senté, leí unos cuantos artículos y entendí.

En el siguiente artículo les enseñaré como elaborar su propio currículo en LaTeX, explicando bloque por bloque.

### Herramientas

Necesitaremos instalar varias herramientas para poder realizar el currículo, especialmente el software que permite convertir de LaTeX a PDF. Si estás utilizando Canaima, Debian o Ubuntu, puedes instalar las herramientas abriendo un Terminal de Root (Menú > Accesorios > Terminal de Root) y ejecutando el siguiente comando:

{% highlight bash %}
aptitude install texlive-latex-base texlive-latex-extra latex-xcolor texlive-fonts-recommended
{% endhighlight %}

Necesitamos un editor de texto como vim, nano o gedit para editar nuestro archivo. Crea el archivo `curriculumvitae.tex` con el editor de tu preferencia.

Por otro lado, una herramienta que puede resultar útil es esta [hoja de trucos o _cheat sheet_](http://dl.dropboxusercontent.com/u/16329841/latexsheet.pdf) que permite hacer consultas rápidas acerca de comandos específicos, sacándonos de dudas cuando estemos estancados.

También es útil leer [este artículo]({{ site.url }}/buscar-archivos-en-la-base-de-datos-general-de-paquetes-con-apt-file.html) acerca de la herramienta `apt-file`, que nos permitirá buscar paquetes LaTeX dentro de los repositorios de paquetes.

### Nociones básicas

Primero debemos entender que LaTeX es en esencia un lenguaje de diagramación, así como _HTML_, _XML_, o _RST_. En ese sentido, nos encontraremos con _sentencias_ o _etiquetas_ que definen bloques de elementos usualmente utilizados en la redacción de documentos; entre los que podemos mencionar: párrafos, títulos, subtítulos, listas numeradas, listas con viñetas, figuras, tablas, índices, entre otros. Sin embargo, existen algunas **etiquetas condicionales** para utilizar en casos especiales.

Las etiquetas usualmente vienen en la forma `etiqueta{contenido}`, siendo `etiqueta` la propiedad que se quiere aplicar sobre `contenido`, en la mayoría de los casos. Lo que se coloca en `contenido` puede contener otras etiquetas anidadas. Opcionalmente, algunas etiquetas aceptan parámetros de configuración en la forma `etiqueta[param1][param2][...]{contenido}` o `etiqueta[param1,param2,...]{contenido}`. Algunas etiquetas aceptan más de un campo de contenidos, en la forma `etiqueta{contenido1}{contenido2}{...}`. Los comentarios dentro del código se indican iniciando la línea con el caracter `%`.

A medida que vayamos avanzando se mostrarán algunos ejemplos de uso para diferentes etiquetas.

### Encabezado

Todos los documentos en LaTeX deben declarar un encabezado, por muy simple que sea. El encabezado podemos dividirlo en tres partes:

**Clase de documento:** Define el conjunto de etiquetas disponibles según el tipo de documento. Entre las clases de documento más populares tenemos: book, letter, book y article, siendo esta última la más popular y la que utilizaremos para nuestro ejemplo. Se declara una sola vez al comienzo del documento de la forma `documentclass[param1,param2,...]{clase}`. Existen otras clases de documento para referenciar.

**Inclusión de Paquetes:** Se permite la inclusión de paquetes de LaTeX que amplian las funcionalidades de la clase de documento inicial. Se declara seguido de la clase de documento de la forma `usepackage{paquete1,paquete2,paquete3,...}` o si se desea cargar con parámetros especiales debe hacerse de la forma `usepackage[param1,param2,param3,...]{paquete}` (paquete por paquete). Existen muchos paquetes para hacer muchas cosas de muchas maneras, por lo que es recomendable buscar en la [base de datos](http://www.ctan.org/tex-archive), especialmente si estamos "inventando algo nuevo".

**Configuración de Paquetes:** Permite cambiar el comportamiento de los paquetes incluídos. La forma de declarar las configuraciones es muy amplia, dependiendo del grupo de comandos pertenecientes a un paquete en específico.

Para nuestro ejemplo el encabezado lo presentamos así:

{% highlight latex %}
documentclass[11pt,letterpaper]{article}

usepackage[NoDate]{currvita}
usepackage{fullpage,mathpazo,hyperref,xcolor,graphicx}

renewcommand{cvheadingfont}{bfseriesitshapeHuge}
renewcommand{cvlistheadingfont}{bfseriesitshapeLarge}
hypersetup{colorlinks,breaklinks,urlcolor=cyan,linkcolor=cyan}
{% endhighlight %}

Utilizamos la clase de documento `article`, configurada para una hoja tamaño carta con tamaño de fuente 11pt.

Seguidamente implementamos el paquete `currvita`, que es un paquete especialmente diseñado para currículos, con la opción `NoDate` para que no incluya la fecha de creación al final del documento. El paquete currvita contiene algunas funciones que nos facilitarán la creación de listas con fechas, entre otros beneficios.

También incluímos otros paquetes que nos ayudarán a:

* `fullpage`: Configurar automáticamente márgenes simétricos de 1 pulgada.
* `mathpazo`: Cambiar instantáneamente la fuente del documento. Existen gran cantidad de [fuentes disponibles](http://www.tug.dk/FontCatalogue/alphfonts.html) para todos los gustos.
* `hyperref`: Agregar hipervículos.
* `xcolor`: Cambiar los colores de las tipografías.
* `graphicx`: Insertar imágenes.

Por último, configuramos el encabezado del currículo (`cvheadingfont`) para que esté en negrita (`bfseries`), cursiva (`itshape`) y muy grande (`Huge`), así como también aplicamos una configuración similar a los encabezados de listas (`cvlistheadingfont`). También aplicamos una configuración a los hipervínculos para mostrarlos color _cyan_.

### Cuerpo del documento

El documento comienza formalmente con la declaración `begin{document}` y termina con `end{document}`, todo lo que esté dentro de estas etiquetas será renderizado dentro del PDF.

Para nuestro ejemplo, que estamos utilizando el paquete `currvita`, debemos especificar donde comienza el currículo y donde termina con `begin{cv}` y `end{cv}` respectivamente. El encabezado del currículo es generalmente el nombre de la persona, que se especifica junto con la etiqueta inicial, es decir, `begin{cv}{nombre}`. De forma tal que quede estructurado así:

{% highlight latex %}
begin{document}
begin{cv}{Luis Alejandro Mart'inez Faneyth}
...
...
item1
item2
item3
...
...
end{cv}
end{document}
{% endhighlight %}

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2222/haciendo-resumenes-curriculares-profesionales-con-latex__2.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2222/haciendo-resumenes-curriculares-profesionales-con-latex__2.jpg"></span>

Como se nota, los caracteres especiales tienen un tratamiento particular en LaTeX. Estaremos usando por ejemplo: á (`'a`), é (`'e`), í (`'i`), ó (`'o`), ú (`'u`), ñ (`~n`) y ~ (`$sim$`).

### Datos personales

Bien, el primer bloque de texto de un currículo acostumbra a ser diferente del resto. Comúnmente veremos los datos personales asociados a una fotografía de la persona. Para nuestro ejemplo utilizaremos dos bloques para construir una columna que ocupe el 70% del espacio horizontal, donde colocaremos la información personal; y otra columna que ocupe el 30% del espacio horizontal en donde colocaremos la fotografía. Para ello utilizaremos el bloque `minipage`.

El bloque `minipage` se declara junto con la longitud que deseamos que ocupe, de la siguiente forma:

{% highlight latex %}
begin{minipage}{.7linewidth}
...
contenido
...
end{minipage}
{% endhighlight %}

Acá la expresión `.7linewidth` significa "_70% del ancho de línea_", en donde `.7` puede ser variado a conveniencia entre cualquier número entre `0` y `1`.

Para generar la lista de datos personales utilizaremos el bloque `cvlist`, perteneciente al paquete `currvita`. El comienzo del bloque se declara con la etiqueta `begin{cvlist}{título}`, siendo `título` el título descriptivo de la lista; y finalizando con `end{cvlist}`.

En los currículos de informáticos se estila a colocar los enlaces a sitios públicos de almacenamiento de código o trabajos gráficos como [github](http://github.com), [gitorious](http://gitorious.org) o [deviantart](http://deviantart.com). Cada elemento de la lista lo insertaremos de la forma `item[título]{descripción}`, quedando de la siguiente manera:

{% highlight latex %}
begin{cvlist}{}
item[textit{large{nacimiento}}]{Caracas, Venezuela --- 26 de Julio de 1986}
item[textit{large{email}}]{href{mailto:luis@huntingbears.com.ve}{luis@huntingbears.com.ve}}
item[textit{large{blog}}]{href{http://huntingbears.com.ve/}{huntingbears.com.ve}}
item[textit{large{github}}]{href{http://github.com/HuntingBears}{github.com/HuntingBears}}
item[textit{large{gitorious}}]{href{http://gitorious.org/~huntingbears}{gitorious.org/$sim$huntingbears}}
item[textit{large{deviantart}}]{href{http://martinezfaneyth.deviantart.com/}{martinezfaneyth.deviantart.com}}
end{cvlist}
{% endhighlight %}

Acá podemos notar varias cosas:

1. Modifiqué el contenido del título de los ítems para colocarlos en cursiva (`textit{}`) y más grandes (`large{}`).
2. No coloqué título al bloque `cvlist` (está sobreentendido que son los datos personales).
3. Utilicé la etiqueta `href{enlace}{texto del enlace}` del paquete `hyperref` para declarar hipervínculos.
4. Utilicé la notación `$sim$` para mostrar el caracter especial `~`.
5. Utilicé `---` para especificar un guión largo.

Bien, finalmente insertamos una fotografía pertinente con la etiqueta `includegraphics{curriculumvitae.jpg}`, en donde `curriculumvitae.jpg` es la ruta relativa a la foto. Por supuesto, dentro de un bloque `minipage` al 30% del ancho de línea como dijimos antes, quedando esta sección completa de la siguiente forma:

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2222/haciendo-resumenes-curriculares-profesionales-con-latex__4.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2222/haciendo-resumenes-curriculares-profesionales-con-latex__4.jpg"></span>

{% highlight latex %}
begin{minipage}{.7linewidth}
begin{cvlist}{}
item[textit{large{nacimiento}}]{Caracas, Venezuela --- 26 de Julio de 1986}
item[textit{large{email}}]{href{mailto:luis@huntingbears.com.ve}{luis@huntingbears.com.ve}}
item[textit{large{blog}}]{href{http://huntingbears.com.ve/}{huntingbears.com.ve}}
item[textit{large{github}}]{href{http://github.com/HuntingBears}{github.com/HuntingBears}}
item[textit{large{gitorious}}]{href{http://gitorious.org/~huntingbears}{gitorious.org/$sim$huntingbears}}
item[textit{large{deviantart}}]{href{http://martinezfaneyth.deviantart.com/}{martinezfaneyth.deviantart.com}}
end{cvlist}
end{minipage}
begin{minipage}{.3linewidth}
includegraphics{curriculumvitae.jpg}
end{minipage}
{% endhighlight %}

El archivo `curriculumvitae.jpg` debe existir en el mismo directorio donde se encuentra `curriculumvitae.tex`, o de lo contrario la conversión a PDF fallará.

### Estudios, experiencia y habilidades

El resto de las listas depende mucho del autor y de las cualidades que se quieran mostrar al empleador. Sin embargo, lo más común es mostrar la formación académica, la experiencia profesional y las habilidades o destrezas. Para el ejemplo mostraré cómo se hace la experiencia profesional, ya que las demás listas se hacen de la misma forma.

Para este caso, tenemos una situación particular: los títulos dentro de la etiqueta `item` no aceptan más de una línea. Para saltarnos este impedimento utilizaremos el bloque `parbox` para colocar un pequeño cuadro dentro del `item`, tanto del lado del título como de la descripción. El bloque `parbox` se declara de la forma `parbox[alineación]{ancho}{contenido}`, en donde `alineación` se refiere a t (arriba), c (centro), b (abajo) o s (distribuído), `ancho` al ancho relativo o fijo del bloque y `contenido` al contenido como tal.

Por ejemplo:

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2222/haciendo-resumenes-curriculares-profesionales-con-latex__6.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2222/haciendo-resumenes-curriculares-profesionales-con-latex__6.jpg"></span>

{% highlight latex %}
begin{cvlist}{Experiencia laboral}
item[{parbox[t]{6em}{textit{large{Nov 2009\Actual}}}}]{
        parbox[t]{linewidth}{
                textbf{Centro Nacional de Tecnolog'ias de Informaci'on} --- Caracas, Venezuela\
                textit{Administrador de Plataforma Tecnol'ogica}\
                footnotesize{Desarrollo del Sistema Operativo Canaima GNU/Linux. Dise~no e implementaci'on de soluciones inform'aticas en Software Libre. Administraci'on de Servicios. Soporte de alto nivel.}
        }
}
end{cvlist}
{% endhighlight %}

Acá podemos notar:

1. Utilicé la etiqueta `\` para especificar un salto de línea.
2. Utilicé `---` para especificar un guión largo.
3. Utilicé `footnotesize{}` para poner la letra más pequeña, `large{}` para agrandarla, `textit{}` para cursiva y `textbf{}` para negrita.

### Conversión a PDF

Bien, con todos estos insumos, podemos realizar nuestro currículo de forma práctica y sencilla pero también elegante y profesional. Construyendo los bloques y listas que necesitemos para describir nuestra carrera, llegaremos a un resultado satisfactorio.

La conversión a PDF se realiza mediante el comando:

{% highlight bash %}
pdflatex curriculumvitae.tex
{% endhighlight %}

Este comando generará varios archivos durante su ejecución, entre ellos, el archivo `curriculumvitae.pdf`.

Puedes descargar el [resultado](http://dl.dropboxusercontent.com/u/16329841/curriculumvitae.pdf) de este ejemplo y su [código fuente](http://dl.dropboxusercontent.com/u/16329841/curriculumvitae.tex).

Espero que les haya sido de utilidad. No duden en comentar cualquier problema.
