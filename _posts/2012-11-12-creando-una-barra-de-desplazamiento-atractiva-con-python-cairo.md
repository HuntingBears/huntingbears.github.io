---
author: martinezfaneyth
date: 2012-11-12 14:30:38-04:30
layout: post
slug: creando-una-barra-de-desplazamiento-atractiva-con-python-cairo
title: Creando una barra de desplazamiento atractiva con python-cairo
article_id: 2729
categories:
- Desarrollo
- Software Libre
- Tutoriales
tags:
- barra de desplazamiento
- cairo
- python
image: /static/img/posts/2729/creando-una-barra-de-desplazamiento-atractiva-con-python-cairo__1.jpg
description: Python Cairo es una librería que permite hacer dibujos en Python.
---

Otra de las investigaciones que realicé en el marco de las mejoras al instalador de Canaima Popular 3.1, estuvo relacionada con la elaboración de animaciones y gráficos dentro de ventanas GTK utilizando python-cairo.

Cairo es una librería de renderizado de vectores que permite la creación de gráficos a través de objetos python que luego pueden ser renderizados en ventanas, botones, tablas o casi cualquier otro widget GTK. Incluso, es posible renderizar los gráficos en archivos de imagen PNG.

En esta oportunidad explicaré como realizar una barra de desplazamiento animada que permita obtener la posición del cursor dentro de un rango de valores. Opcionalmente, la barra de desplazamiento puede estar dividida en varios sectores o partes. La explicación de la creación de este widget se hará por partes, comenzando desde los elementos básicos, hasta armar el script python completo al final del artículo. Es decir, si quieres ahorrarte la explicación, puedes adelantarte hasta el final.

### Instalación de herramientas

Para esta práctica necesitaremos python-gtk2 y python-cairo, los cuales instalaremos desde una Terminal de Root (Menú > Aplicaciones > Accesorios > Terminal de Root) con el siguiente comando:

{% highlight bash %}
aptitude install python-gtk2 python-cairo
{% endhighlight %}

### Lienzo de trabajo

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2729/creando-una-barra-de-desplazamiento-atractiva-con-python-cairo__2.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2729/creando-una-barra-de-desplazamiento-atractiva-con-python-cairo__2.jpg"></span>

Lo primero que haremos será construir nuestro lienzo de trabajo. El lienzo no es más que una ventana GTK que nos permitirá visualizar los dibujos que vamos realizando. Los comentarios dentro del código irán describiendo cada una de las líneas.

{% highlight python %}
# Declaramos una clase que hereda gtk.Window
# En otras palabras, la clase ahora se comporta como gtk.Window
class Ventana(gtk.Window):

    ancho = 500
    alto = 200
    presionado = False
    pos = []

    def __init__(self):
        # Inicializamos gtk.Window encima de las demás ventanas
        gtk.Window.__init__(self, gtk.WINDOW_TOPLEVEL)
        # Colocamos la ventana en el centro
        gtk.Window.set_position(self, gtk.WIN_POS_CENTER_ALWAYS)
        # Establecemos un título para la ventana
        self.set_title('Ventana')
        # Definimos el tamaño en pixeles de la ventana
        self.set_size_request(self.ancho, self.alto)
        # Deshabilitamos la redimensión de la ventana
        self.set_resizable(False)
        # Establecemos el margen interno a 5 pixeles
        self.set_border_width(5)
        # Conectamos los eventos de cerrado de la ventana a
        # la salida del loop principal de gtk
        self.connect("destroy", gtk.main_quit)
        self.connect("delete-event", gtk.main_quit)

        # Declaramos una Caja Vertical que nos permitirá incrustar objetos
        # dentro de la ventana secuencialmente
        self.contenedor = gtk.VBox()
        # Incrustamos la caja vertical en la ventana
        self.add(self.contenedor)

        # Declaramos un Área de Dibujo
        self.barra = gtk.DrawingArea()
        # Definimos el tamaño en pixeles del área
        # en donde se dibujará la barra de desplazamiento
        self.barra.set_size_request(self.ancho - 10, self.alto - 100)
        # Obtenemos el tamaño de la barra para utilizarlo después
        self.bancho = self.barra.get_size_request()[0]
        self.balto = self.barra.get_size_request()[1]
        # Definimos los eventos a los cuales reaccionará el área
        self.barra.set_events(
            gtk.gdk.POINTER_MOTION_MASK
            | gtk.gdk.POINTER_MOTION_HINT_MASK
            | gtk.gdk.BUTTON_PRESS_MASK
            | gtk.gdk.BUTTON_RELEASE_MASK
            )
        # Lo agregamos a la caja vertical
        self.contenedor.add(self.barra)

        # Declaramos una etiqueta de texto para mostrar información
        self.texto = gtk.Label('100%')
        # Definimos el tamaño
        self.texto.set_size_request(self.ancho - 10, self.alto - 110)
        # Lo agregamos a la caja vertical
        self.contenedor.add(self.texto)

        # Mostramos todo
        self.show_all()
{% endhighlight %}

Bloque N°1: Ventana de pruebas.

### Creando gradientes de colores

Comenzaremos haciendo un gradiente cairo que nos permitirá rellenar un rectángulo. Los colores en cairo se definen en un formato RGB particular que está compuesto de números decimales entre 0 y 1 en vez del modelo tradicional. Para evitar cálculos engorrosos, haremos una función que permita hacer gradientes basados en colores HTML (notación hexadecimal) porque son más fáciles de especificar. La siguiente función acepta un valor hexadecimal como `#000000` (negro) o `#FFFFFF` (blanco) y retorna una tupla con los tres componentes RGB estándar (números enteros del 0 al 255).

{% highlight python %}
def hex_to_rgb(hx):
    # Preparamos una lista vacía
    r = []
    # Removemos el caracter '#' de la notación HTML
    h = hx.lstrip('#')
    # Iteramos de dos en dos hasta la longitud de caracteres del color (6)
    for i in range(0, 6, 2):
        # Añadimos a la lista la conversión de cada par hexadecimal
        r.append(int(h[i:i + 2], 16))
    # Retornamos la tupla (R,G,B) (notación estándar)
    return tuple(r)
{% endhighlight %}

Bloque N°2: Conversión hexadecimal a RGB estándar.

La siguiente función permitirá generar un objeto de gradiente lineal en cairo. Un objeto de gradiente lineal necesita la longitud del gradiente (alto en pixeles), un color de inicio y un color de final (en formato RGB de cairo). Se utilizará la función `hex_to_rgb` (Bloque N°2) para convertir los colores de inicio y fin de notación HTML a formato RGB estándar.

{% highlight python %}
def gradiente(alto, start, end):
    # Declaramos el objeto de gradiente lineal
    grad = cairo.LinearGradient(0.0, 0.0, 0.0, alto)
    # Generamos la tupla de color de inicio (inicio, R, G, B)
    s = (0.0,) + hex_to_rgb(start)
    # Generamos la tupla de color final (fin, R, G, B)
    e = (1.0,) + hex_to_rgb(end)

    # Iteramos por el inicio y fin
    for i in s, e:
        # Convertimos RGB estándar a RGB de cairo
        rgb = float(i[0]), float(i[1] / 255.0), float(i[2] / 255.0), float(i[3] / 255.0)
        # Agregamos el punto de color al objeto de gradiente lineal
        grad.add_color_stop_rgb(*rgb)

    # Retornamos el objeto de gradiente
    return grad
{% endhighlight %}

Bloque N°3: Creación del gradiente.

Ahora, para hacernos la vida un poco más fácil, he creado la siguiente función que condensa una serie de colores conocidos. Permite crear un gradiente utilizando la función `gradiente` (Bloque N°3) y un conjunto de colores preseleccionados que generan un sutil gradiente para cada uno.

{% highlight python %}
def crear_color(clr, alto):
    if clr == 'naranja':
        grad = gradiente(alto, '#ff5d2e', '#ff912e')
    elif clr == 'azul-claro':
        grad = gradiente(alto, '#2460c8', '#2e7bff')
    elif clr == 'azul':
        grad = gradiente(alto, '#1b4794', '#2460c8')
    elif clr == 'azul-oscuro':
        grad = gradiente(alto, '#102b58', '#1b4794')
    elif clr == 'verde-claro':
        grad = gradiente(alto, '#00b900', '#00ff00')
    elif clr == 'verde':
        grad = gradiente(alto, '#008100', '#00b900')
    elif clr == 'verde-oscuro':
        grad = gradiente(alto, '#003800', '#008100')
    elif clr == 'marron-oscuro':
        grad = gradiente(alto, '#382720', '#895f4d')
    elif clr == 'marron':
        grad = gradiente(alto, '#895f4d', '#e49e80')
    elif clr == 'marron-claro':
        grad = gradiente(alto, '#e49e80', '#ffcfbb')
    elif clr == 'rojo':
        grad = gradiente(alto, '#650000', '#cc0000')
    elif clr == 'morado':
        grad = gradiente(alto, '#45374f', '#806794')
    elif clr == 'morado-claro':
        grad = gradiente(alto, '#806794', '#b994d5')
    elif clr == 'amarillo':
        grad = gradiente(alto, '#e89900', '#e8d000')
    elif clr == 'blanco':
        grad = gradiente(alto, '#ffffff', '#ffffff')
    elif clr == 'aguamarina':
        grad = gradiente(alto, '#7dfcfe', '#7dfcfe')
    elif clr == 'negro':
        grad = gradiente(alto, '#000000', '#000000')
    elif clr == 'gris':
        grad = gradiente(alto, '#b8b598', '#b8b598')

    return grad
{% endhighlight %}

Bloque N°4: Asignación del gradiente según nombre del color.

### Dibujando rectángulos de bordes redondeados

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2729/creando-una-barra-de-desplazamiento-atractiva-con-python-cairo__4.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2729/creando-una-barra-de-desplazamiento-atractiva-con-python-cairo__4.jpg"></span>

Los rectángulos de bordes redondeados nos ayudarán a dibujar nuestra barra de desplazamiento. `rectangulo_red` es una función que construye un rectángulo redondeado con un fondo en gradiente. Acepta los siguientes parámetros: `cr` corresponde a una sesión cairo abierta (lo explicaremos maś adelante), `area` son las coordenadas de las dimensiones del rectángulo, `r` es el radio de los arcos redondeados del rectángulo y `clr` es el nombre del color de fondo con el que colorearemos el rectángulo. Mayor explicación en los comentarios del código.

{% highlight python %}
def rectangulo_red(cr, area, r, clr):
    # area debe ser una lista de cuatro items:
    # x1, y1: coordenada en pixeles de la esquina superior izquierda del rectángulo
    # x2, y2: coordenada en pixeles de la esquina inferior derecha del rectángulo
    x1, y1, x2, y2 = area
    # clr es el nombre del color, por ejemplo, 'azul'
    # y2 - y1 es el cálculo del alto que se utilizará para el gradiente
    color = crear_color(clr, y2 - y1)
    # Las próximas cuatro líneas corresponden al dibujo de los cuatro arcos
    # de las esquinas del rectángulo. Los cuatro parámetros se explican así:
    # cr.arc(A, B, C, D)
    # A: Coordenada horizontal del centro del arco
    # B: Coordenada vertical del centro del arco
    # C: Coordenada cartesiana del ángulo de apertura del arco
    # D: Coordenada cartesiana del ángulo donde termina el arco.
    cr.arc(x1 + r, y1 + r, r, 2 * (math.pi / 2), 3 * (math.pi / 2))
    cr.arc(x2 - r, y1 + r, r, 3 * (math.pi / 2), 4 * (math.pi / 2))
    cr.arc(x2 - r, y2 - r, r, 0 * (math.pi / 2), 1 * (math.pi / 2))
    cr.arc(x1 + r, y2 - r, r, 1 * (math.pi / 2), 2 * (math.pi / 2))
    # Establecemos el color
    cr.set_source(color)
    # Cerramos los trazos de los arcos
    cr.close_path()
    # Rellenamos el rectángulo con el gradiente
    cr.fill()
{% endhighlight %}

Bloque N°5: Creación del rectángulo.

Al utilizar la función `rectángulo_red`, habremos creado un rectángulo dentro de una sesión cairo (cr).

### Interactividad y movimiento

La interactividad se obtiene a través del uso apropiado de los eventos dentro del área de dibujo. Es decir, si asociamos determinadas funciones con los eventos, lograremos que el usuario pueda interactuar con nuestra ventana GTK.

La asociación de eventos con funciones introduce un inmenso panorama de posibilidades, pero por ahora basta saber que las funciones necesitan recibir un parámetro widget (el que lo referencia) y un parámetro evento (que contiene información acerca del evento que la invocó).

La función dibujar es una función de asistencia que nos permitirá dibujar el estado inicial de nuestro dibujo, y además refrescar el lienzo cada vez que se invoque. La idea es conectar el evento de exposición (`expose-event`) con esta función para que el dibujo se mantenga refrescado. Dibujaremos varios cuadros que se describirán en una lista y al final dibujaremos un rectángulo vertical que podrá moverse de lado a lado, simulando un selector. Adicionalmente, le pasaremos información a la función acerca de la ventana donde se encuentra y los cuadros que debe dibujar.

{% highlight python %}
def dibujar(widget, evento, ventana):
    lista = []
    # La posición del selector se calcula restando el espacio libre después
    # del sector al espacio total
    selector = ventana.total - ventana.libre
    # Este factor es el factor de redimensión de cada uno de los cuadros segun
    # la posición del selector
    factor = selector / ventana.total

    # Refrescamos el lienzo del dibujo
    ventana.lienzo = ventana.barra.window.cairo_create()

    # Iteramos a través de cada uno de los cuadros
    # Cada cuadro debe venir en la forma [inicio, fin, color]
    for j in ventana.cuadros:
        # Recalculamos el tamaño de cada cuadro según el factor
        lista.append([j[0] * factor, j[1] * factor, j[2]])

    # Agregamos un cuadro gris que estará después del selector
    lista.append([selector, ventana.total, 'gris'])

    # Iteramos por cada uno de los cuadros
    for c in lista:
        # Radio de los cuadros
        r = 5
        # Los cuadros inician en el tope superior
        y1 = 0
        # Y terminan en el tope inferior
        y2 = ventana.balto
        # En c tenemos el punto inicial del cuadro, el punto final y el color
        a1, a2, clr = c
        # Recalculamos la posición de x1 y x2 según el factor de ancho de la
        # ventana con respecto al ancho "bancho" que es el ancho máximo de los cuadros
        x1 = a1 * ventana.bancho / ventana.total + 1
        x2 = a2 * ventana.bancho / ventana.total - 1

        # Si el ancho de un cuadro llega a ser menor a 12px, cambiamos el
        # espaciado y el radio para conservar estética
        if x2 - x1 < 12:
            x1 = x1 - 1
            x2 = x2 + 1
            r = 0

        # Componemos el área del cuadro
        area = [x1, y1, x2, y2]
        # Dibujamos el cuadro
        rectangulo_red(ventana.lienzo, area, r, clr)

    # Armamos el cuadro correspondiente al selector
    y1_sel = 10
    y2_sel = ventana.balto - 10
    x1_sel = (selector * ventana.bancho / ventana.total) - 5
    x2_sel = (selector * ventana.bancho / ventana.total) + 5

    # Dibujamos el selector
    ventana.sel = [x1_sel, y1_sel, x2_sel, y2_sel]
    rectangulo_red(ventana.lienzo, ventana.sel, 3, 'negro')
{% endhighlight %}

Bloque N°6: Creación del dibujo en el lienzo.

Necesitamos saber en qué momento se presiona y en qué momento se suelta el selector. Para ello utilizaremos una variable asociada a la ventana (`ventana.presionado`), la cuál se establecerá `True` o `False` convenientemente. La función `presionar` estará asociada al evento `button-press-event`, el cual se acciona cada vez que se hace click dentro del lienzo. Para este evento, la variable `evento.x` y `evento.y` van a contener el valor de las coordenadas del cursor dentro del lienzo de dibujo; esto nos permitirá saber el momento en que se haga click dentro del área asociada al selector (establecida en `ventana.sel`). Por otro lado, la función `soltar` estará asociada al evento `button-release-event`, que establecerá `ventana.presionado` a `False` cuando se suelte el click del ratón.

{% highlight python %}
def presionar(widget, evento, ventana):
    if evento.x >= ventana.sel[0] and \
       evento.x <= ventana.sel[2] and \
       evento.y >= ventana.sel[1] and \
       evento.y <= ventana.sel[3]:
        ventana.presionado = True

def soltar(widget, evento, ventana):
    ventana.presionado = False
{% endhighlight %}

Bloque N°7: Funciones para presionar y soltar.

Luego haremos una función que nos permita redibujar los cuadros de acuerdo al movimiento del selector, para ello la conectaremos al evento `motion-notify-event`. Para este evento, la variable `evento.x` y `evento.y` van a tener el valor de la posición del cursor dentro del lienzo de dibujo; esto nos permitirá saber el momento en que el cursor pase por encima del selector, en donde podremos cambiar el tipo de cursor que se muestra. Por otro lado, la variable `ventana.presionado` nos permitirá saber si el cursor se encuentra presionado, momento en el cuál procederemos a actualizar la posición y tamaño de los cuadros mediante la función `queue_draw()`, la cual invoca el evento `expose-event`, que ejecuta la función `dibujar()`.

{% highlight python %}
def redibujar(widget, evento, ventana):
    # Si el cursor está dentro del área del selector
    if evento.x >= ventana.sel[0] and \
       evento.x <= ventana.sel[2] and \
       evento.y >= ventana.sel[1] and \
       evento.y <= ventana.sel[3]:
        # Establecemos el cursor tipo mano
        cursor = gtk.gdk.Cursor(gtk.gdk.HAND2)
        ventana.barra.window.set_cursor(cursor)
    else:
        # De loc ontrario, establecemos el cursor tipo normal
        cursor = gtk.gdk.Cursor(gtk.gdk.LEFT_PTR)
        ventana.barra.window.set_cursor(cursor)

    # Si se ha presionado el selector ...
    if ventana.presionado == True:
        # ... y el cursor se encuentra dentro de los límites del lienzo
        if evento.x <= ventana.bancho and evento.x >= 0:
            # Calculamos la posición del selector de acuerdo a la proporción
            x = float(evento.x * ventana.total / ventana.bancho)
            # Calculamos el espacio a la derecha del selector
            ventana.libre = ventana.total - x
            # Establecemos el porcentaje
            ventana.texto.set_label(str(int(x))+'%')
            # Mandamos a redibujar
            ventana.barra.queue_draw()
{% endhighlight %}

Bloque N°8: Redibujar de acuerdo a la posición del selector.

Por último, declararemos nuestras variables, ventana y conectaremos cada evento con sus funciones.

{% highlight python %}
if __name__ == "__main__":
    # Instanciamos la ventana
    ventana = Ventana()
    # Esta variable define cuánto es la unidad máxima posible para los cuadros.
    # A partir de este valor se calculará el factor de tamaño de los cuadros.
    # Puede entenderse mejor si se interpreta como porcentaje (100%).
    ventana.total = 100.0
    # Esta variable define cuanto espacio libre habrá a la derecha del selector
    ventana.libre = 0.0
    # Construímos el arreglo de cuadros, tomando en cuenta el valor máximo
    ventana.cuadros = [
            [0.0, 20.0, 'verde'],
            [20.0, 60.0, 'rojo'],
            [60.0, 100.0, 'amarillo']
        ]

    # Conectamos las funciones a los eventos
    ventana.barra.connect("expose-event", dibujar, ventana)
    ventana.barra.connect("button-press-event", presionar, ventana)
    ventana.barra.connect("button-release-event", soltar, ventana)
    ventana.barra.connect("motion-notify-event", redibujar, ventana)

    # Iniciamos el loop principal de gtk
    gtk.main()
    # Salimos apropiadamente
    sys.exit()
{% endhighlight %}

Bloque N°7: Llamado de la ventana y conexión de eventos con funciones.

### Resultados

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2729/creando-una-barra-de-desplazamiento-atractiva-con-python-cairo__4.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2729/creando-una-barra-de-desplazamiento-atractiva-con-python-cairo__4.jpg"></span>

<span class="youtube" data-youtube-id="-2qPYvDH4yw"></span>

Bueno, finalmente toca juntar todos los bloques en un sólo archivo de texto. Lo guardamos como "barra.py" y lo ejecutamos en una Terminal de Usuario (Menú > Aplicaciones > Accesorios > Terminal de Usuario) de la siguiente manera:

{% highlight bash %}
cd /ruta/a/la/carpeta/
python barra.py
{% endhighlight %}

Y a continuación se muestra el script completo. Espero que les sea de utilidad.

{% highlight python %}
#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Importamos las librerías
import gtk, sys, cairo, math

# Declaramos una clase que hereda gtk.Window
# En otras palabras, la clase ahora se comporta como gtk.Window
class Ventana(gtk.Window):

    ancho = 500
    alto = 200
    presionado = False
    pos = []

    def __init__(self):
        # Inicializamos gtk.Window encima de las demás ventanas
        gtk.Window.__init__(self, gtk.WINDOW_TOPLEVEL)
        # Colocamos la ventana en el centro
        gtk.Window.set_position(self, gtk.WIN_POS_CENTER_ALWAYS)
        # Establecemos un título para la ventana
        self.set_title('Ventana')
        # Definimos el tamaño en pixeles de la ventana
        self.set_size_request(self.ancho, self.alto)
        # Deshabilitamos la redimensión de la ventana
        self.set_resizable(False)
        # Establecemos el margen interno a 5 pixeles
        self.set_border_width(5)
        # Conectamos los eventos de cerrado de la ventana a
        # la salida del loop principal de gtk
        self.connect("destroy", gtk.main_quit)
        self.connect("delete-event", gtk.main_quit)

        # Declaramos una Caja Vertical que nos permitirá incrustar objetos
        # dentro de la ventana secuencialmente
        self.contenedor = gtk.VBox()
        # Incrustamos la caja vertical en la ventana
        self.add(self.contenedor)

        # Declaramos un Área de Dibujo
        self.barra = gtk.DrawingArea()
        # Definimos el tamaño en pixeles del área
        # en donde se dibujará la barra de desplazamiento
        self.barra.set_size_request(self.ancho - 10, self.alto - 100)
        # Obtenemos el tamaño de la barra para utilizarlo después
        self.bancho = self.barra.get_size_request()[0]
        self.balto = self.barra.get_size_request()[1]
        # Definimos los eventos a los cuales reaccionará el área
        self.barra.set_events(
            gtk.gdk.POINTER_MOTION_MASK
            | gtk.gdk.POINTER_MOTION_HINT_MASK
            | gtk.gdk.BUTTON_PRESS_MASK
            | gtk.gdk.BUTTON_RELEASE_MASK
            )
        # Lo agregamos a la caja vertical
        self.contenedor.add(self.barra)

        # Declaramos una etiqueta de texto para mostrar información
        self.texto = gtk.Label('100%')
        # Definimos el tamaño
        self.texto.set_size_request(self.ancho - 10, self.alto - 110)
        # Lo agregamos a la caja vertical
        self.contenedor.add(self.texto)

        # Mostramos todo
        self.show_all()

def hex_to_rgb(hx):
    # Preparamos una lista vacía
    r = []
    # Removemos el caracter '#' de la notación HTML
    h = hx.lstrip('#')
    # Iteramos de dos en dos hasta la longitud de caracteres del color (6)
    for i in range(0, 6, 2):
        # Añadimos a la lista la conversión de cada par hexadecimal
        r.append(int(h[i:i + 2], 16))
    # Retornamos la lista [R,G,B] (notación estándar)
    return tuple(r)

def gradiente(alto, start, end):
    # Declaramos el objeto de gradiente lineal
    grad = cairo.LinearGradient(0.0, 0.0, 0.0, alto)
    # Generamos la tupla de color de inicio (inicio, R, G, B)
    s = (0.0,) + hex_to_rgb(start)
    # Generamos la tupla de color final (fin, R, G, B)
    e = (1.0,) + hex_to_rgb(end)

    # Iteramos por el inicio y fin
    for i in s, e:
        # Convertimos RGB estándar a RGB de cairo
        rgb = float(i[0]), float(i[1] / 255.0), float(i[2] / 255.0), float(i[3] / 255.0)
        # Agregamos el punto de color al objeto de gradiente lineal
        grad.add_color_stop_rgb(*rgb)

    # Retornamos el objeto de gradiente
    return grad

def crear_color(clr, alto):
    if clr == 'naranja':
        grad = gradiente(alto, '#ff5d2e', '#ff912e')
    elif clr == 'azul-claro':
        grad = gradiente(alto, '#2460c8', '#2e7bff')
    elif clr == 'azul':
        grad = gradiente(alto, '#1b4794', '#2460c8')
    elif clr == 'azul-oscuro':
        grad = gradiente(alto, '#102b58', '#1b4794')
    elif clr == 'verde-claro':
        grad = gradiente(alto, '#00b900', '#00ff00')
    elif clr == 'verde':
        grad = gradiente(alto, '#008100', '#00b900')
    elif clr == 'verde-oscuro':
        grad = gradiente(alto, '#003800', '#008100')
    elif clr == 'marron-oscuro':
        grad = gradiente(alto, '#382720', '#895f4d')
    elif clr == 'marron':
        grad = gradiente(alto, '#895f4d', '#e49e80')
    elif clr == 'marron-claro':
        grad = gradiente(alto, '#e49e80', '#ffcfbb')
    elif clr == 'rojo':
        grad = gradiente(alto, '#650000', '#cc0000')
    elif clr == 'morado':
        grad = gradiente(alto, '#45374f', '#806794')
    elif clr == 'morado-claro':
        grad = gradiente(alto, '#806794', '#b994d5')
    elif clr == 'amarillo':
        grad = gradiente(alto, '#e89900', '#e8d000')
    elif clr == 'blanco':
        grad = gradiente(alto, '#ffffff', '#ffffff')
    elif clr == 'aguamarina':
        grad = gradiente(alto, '#7dfcfe', '#7dfcfe')
    elif clr == 'negro':
        grad = gradiente(alto, '#000000', '#000000')
    elif clr == 'gris':
        grad = gradiente(alto, '#b8b598', '#b8b598')

    return grad

def rectangulo_red(cr, area, r, clr):
    # area debe ser una lista de cuatro items:
    # x1, y1: coordenada en pixeles de la esquina superior izquierda del rectángulo
    # x2, y2: coordenada en pixeles de la esquina inferior derecha del rectángulo
    x1, y1, x2, y2 = area
    # clr es el nombre del color, por ejemplo, 'azul'
    # y2 - y1 es el cálculo del alto que se utilizará para el gradiente
    color = crear_color(clr, y2 - y1)
    # Las próximas cuatro líneas corresponden al dibujo de los cuatro arcos
    # de las esquinas del rectángulo. Los cuatro parámetros se explican así:
    # cr.arc(A, B, C, D)
    # A: Coordenada horizontal del centro del arco
    # B: Coordenada vertical del centro del arco
    # C: Coordenada cartesiana del ángulo de apertura del arco
    # D: Coordenada cartesiana del ángulo donde termina el arco.
    cr.arc(x1 + r, y1 + r, r, 2 * (math.pi / 2), 3 * (math.pi / 2))
    cr.arc(x2 - r, y1 + r, r, 3 * (math.pi / 2), 4 * (math.pi / 2))
    cr.arc(x2 - r, y2 - r, r, 0 * (math.pi / 2), 1 * (math.pi / 2))
    cr.arc(x1 + r, y2 - r, r, 1 * (math.pi / 2), 2 * (math.pi / 2))
    # Establecemos el color
    cr.set_source(color)
    # Cerramos los trazos de los arcos
    cr.close_path()
    # Rellenamos el rectángulo con el gradiente
    cr.fill()

def dibujar(widget, evento, ventana):
    lista = []
    # La posición del selector se calcula restando el espacio libre después
    # del sector al espacio total
    selector = ventana.total - ventana.libre
    # Este factor es el factor de redimensión de cada uno de los cuadros segun
    # la posición del selector
    factor = selector / ventana.total

    # Refrescamos el lienzo del dibujo
    ventana.lienzo = ventana.barra.window.cairo_create()

    # Iteramos a través de cada uno de los cuadros
    # Cada cuadro debe venir en la forma [inicio, fin, color]
    for j in ventana.cuadros:
        # Recalculamos el tamaño de cada cuadro según el factor
        lista.append([j[0] * factor, j[1] * factor, j[2]])

    # Agregamos un cuadro gris que estará después del selector
    lista.append([selector, ventana.total, 'gris'])

    # Iteramos por cada uno de los cuadros
    for c in lista:
        # Radio de los cuadros
        r = 5
        # Los cuadros inician en el tope superior
        y1 = 0
        # Y terminan en el tope inferior
        y2 = ventana.balto
        # En c tenemos el punto inicial del cuadro, el punto final y el color
        a1, a2, clr = c
        # Recalculamos la posición de x1 y x2 según el factor de ancho de la
        # ventana con respecto al ancho "bancho" que es el ancho máximo de los cuadros
        x1 = a1 * ventana.bancho / ventana.total + 1
        x2 = a2 * ventana.bancho / ventana.total - 1

        # Si el ancho de un cuadro llega a ser menor a 12px, cambiamos el
        # espaciado y el radio para conservar estética
        if x2 - x1 < 12:
            x1 = x1 - 1
            x2 = x2 + 1
            r = 0

        # Componemos el área del cuadro
        area = [x1, y1, x2, y2]
        # Dibujamos el cuadro
        rectangulo_red(ventana.lienzo, area, r, clr)

    # Armamos el cuadro correspondiente al selector
    y1_sel = 10
    y2_sel = ventana.balto - 10
    x1_sel = (selector * ventana.bancho / ventana.total) - 5
    x2_sel = (selector * ventana.bancho / ventana.total) + 5

    # Dibujamos el selector
    ventana.sel = [x1_sel, y1_sel, x2_sel, y2_sel]
    rectangulo_red(ventana.lienzo, ventana.sel, 3, 'negro')

def presionar(widget, evento, ventana):
    if evento.x >= ventana.sel[0] and \
       evento.x <= ventana.sel[2] and \
       evento.y >= ventana.sel[1] and \
       evento.y <= ventana.sel[3]:
        ventana.presionado = True

def soltar(widget, evento, ventana):
    ventana.presionado = False

def redibujar(widget, evento, ventana):
    # Si el cursor está dentro del área del selector
    if evento.x >= ventana.sel[0] and \
       evento.x <= ventana.sel[2] and \
       evento.y >= ventana.sel[1] and \
       evento.y <= ventana.sel[3]:
        # Establecemos el cursor tipo mano
        cursor = gtk.gdk.Cursor(gtk.gdk.HAND2)
        ventana.barra.window.set_cursor(cursor)
    else:
        # De loc ontrario, establecemos el cursor tipo normal
        cursor = gtk.gdk.Cursor(gtk.gdk.LEFT_PTR)
        ventana.barra.window.set_cursor(cursor)

    # Si se ha presionado el selector ...
    if ventana.presionado == True:
        # ... y el cursor se encuentra dentro de los límites del lienzo
        if evento.x <= ventana.bancho and evento.x >= 0:
            # Calculamos la posición del selector de acuerdo a la proporción
            x = float(evento.x * ventana.total / ventana.bancho)
            # Calculamos el espacio a la derecha del selector
            ventana.libre = ventana.total - x
            # Establecemos el porcentaje
            ventana.texto.set_label(str(int(x))+'%')
            # Mandamos a redibujar
            ventana.barra.queue_draw()

if __name__ == "__main__":
    # Instanciamos la ventana
    ventana = Ventana()
    # Esta variable define cuánto es la unidad máxima posible para los cuadros.
    # A partir de este valor se calculará el factor de tamaño de los cuadros.
    # Puede entenderse mejor si se interpreta como porcentaje (100%).
    ventana.total = 100.0
    # Esta variable define cuanto espacio libre habrá a la derecha del selector
    ventana.libre = 0.0
    # Construímos el arreglo de cuadros, tomando en cuenta el valor máximo
    ventana.cuadros = [
            [0.0, 20.0, 'verde'],
            [20.0, 60.0, 'rojo'],
            [60.0, 100.0, 'amarillo']
        ]

    # Conectamos las funciones a los eventos
    ventana.barra.connect("expose-event", dibujar, ventana)
    ventana.barra.connect("button-press-event", presionar, ventana)
    ventana.barra.connect("button-release-event", soltar, ventana)
    ventana.barra.connect("motion-notify-event", redibujar, ventana)

    # Iniciamos el loop principal de gtk
    gtk.main()
    # Salimos apropiadamente
    sys.exit()
{% endhighlight %}
