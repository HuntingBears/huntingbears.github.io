---
author: martinezfaneyth
language: es
date: 2011-07-19 18:48:02-04:30
layout: post
slug: canaima-3-vs-windows-7-una-comparacion-detallada-de-ambos-sistemas-operativos
title: 'Canaima 3 vs Windows 7: Una comparación detallada de ambos Sistemas Operativos'
wordpress_id: 802
categories:
- Canaima
- Estudios
- Software Libre
tags:
- canaima gnu linux
- canaima vs windows
- Software Libre
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/802/c0a501db1ebe644a651b50ea0b45a152.jpg
description: Acá hacemos un estudio profundo acerca de las diferencias y similitudes de Windows y Canaima.
---

Con el reciente lanzamiento de Canaima 3.0, decidí finalmente hacer la muy esperada, pedida y buscada comparación Canaima vs Windows.

En esta oportunidad estaré haciendo una comparación lo más imparcial y objetiva posible, a pesar de ser yo un promotor del software libre y desarrollador de Canaima GNU/Linux. ¿Imagínense yo acá escribiendo mentiras, estudios poco serios y sesgados? Lo menos que van a hacer es confiar en mi, y por ende tampoco confiarán en lo que yo predico (el uso del Software Libre).

A lo largo del estudio, encontrarán enlaces a imágenes que ilustran la evolución del proceso, así como también enlaces a otros contenidos que ampliarán la información que les estoy proporcionando.

Dicho esto, empecemos!

### **Ambiente de Pruebas**

Usaré un mismo entorno de pruebas para ambos sistemas operativos, y empezaré desde la instalación, hasta llegar a hacer pruebas de stress específicas. Para éste caso utilizaré un equipo de hardware reciente con las siguientes características:

* **Marca:** HP Compaq dc7800p Convertible Minitower.
* **Procesador:** Intel Core2 Quad CPU Q6600 @ 2.40GHz (4 Procesadores a 2.4GHz c/u).
* **Memoria RAM:** DIMM DDR2 Synchronous @ 800 MHz 2GB x 2 (4GB).
* **Ethernet:** 82566DM-2 Gigabit Network Connection (1GB/s).
* **Gráficos:** GeForce 8500 GT 1GB.
* **Almacenamiento:** 3 Discos Duros SATAII 250GB c/u.
* **Otros dispositivos:** CA0106 Soundblaster (Tarjeta de Sonido PCI).
* **Otros dispositivos:** SAA7131/SAA7133/SAA7135 Video Broadcast Decoder (Tarjeta Receptora de TV PCI).

<!-- more -->

### **Instalación**

### Microsoft Windows 7

Acá empecé introduciendo un **DVD (~7GB)** de la última versión de Windows 7, que llegó a mis manos a través de una sucursal [Microsoft Pirateishon](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/ca8363cd77da1d748e5c8f3a0d4ee946.jpg) (no voy a pagar los [320$](http://www.microsoftstore.com/store/msstore/en_US/pd/productID.216647200/categoryID.50726100/list.true) para hacer ésta prueba, lo siento). Una vez dentro, me encontré con una interfaz bonita y agradable que sólo me permite Instalar Windows, y acceder a algunas opciones de restauración de datos y reparación para Sistemas Windows corruptos. Cabe destacar que en esa interfaz noté que había un procesamiento de video de muy bajo nivel, puesto que la GUI tardaba en responder al activar el menú desplegable de los idiomas disponibles, a pesar de que la PC tenía una tarjeta gráfica GeForce 8500 GT de 1GB.

El primer paso de la instalación es la aceptación de la licencia EULA (End User License Agreement), en donde se especifican una serie de [limitaciones al usuario](http://huntingbears.com.ve/has-leido-la-licencia-de-microsoft-windows-esa-que-todo-el-mundo-acepta-con-los-ojos-cerrados.html). Seguidamente, aparece la pantalla de selección de la partición donde deseamos instalar. Previamente había hecho una partición NTFS para no tener que utilizar el particionador que trae el instalador. Sin embargo, no reconoció la partición y tuve que formatearla desde allí. Después de eso tampoco funcionó, ni siquiera seleccionando y formateando el disco entero.

Investigando en internet, luego de hacer unas 3 o 4 cosas aleatorias que recomiendan en los foros de Windows, di con la solución: Desconecté los 2 discos duros SATA en donde NO iba a instalar y dejé conectado el tercero. [Windows 7 no reconoce](http://social.technet.microsoft.com/Forums/en-US/w7itproinstall/thread/8c26780a-78ba-4113-994b-a0ef2c117c76/) [arreglos de discos](http://social.technet.microsoft.com/Forums/en/w7itproinstall/thread/8c2c1ac9-dc18-40af-a2b1-88dfaf9c2e70) [duros SATA](http://www.google.com/search?q=Setup+couldn%27t+create+a+new+system+partition+or+couldn%27t+find+an+existing).

Finalmente, comenzó el proceso de instalación. En resumen, puedo decirles que el proceso **reinició la PC 3 veces** y duró aproximadamente **30minutos**.

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/802/40f13bc35ed89f99144f361508abcc83.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/802/9b3acde76be87f145f70e555ba3f4b00.jpg"></span>

### Canaima GNU/Linux 3.0

Ésta versión de Canaima cabe en un **CD (~700MB)**, lo descargué gratuitamente de la página oficial del proyecto y al parecer no tengo restricciones como las que establece la EULA, más bien me incitan a compartir el software.

La instalación comenzó preguntando la distribución de teclado a utilizar ([imagen](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/3d4102afa8136d7c50ccea534e1aa163.jpg)) y los datos del nuevo usuario (usuario, nombre y contraseña)([imagen](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/663066349563112cd0fae7f18ce500f6.jpg)), así como los datos del usuario administrador. Preguntó de qué forma quería particionar el disco, pero aunque existe la opción "Guiado" (que hace las cosas por ti), yo seleccioné manual para cambiar un poco las cosas que vienen por defecto ([imagen](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/220869794a8c073e8ed32c0ffe221b5a.jpg)).

La instalación duró **14 minutos** y **nunca reinició**, sino al final cuando pidió extraer el CD de instalación y pulsar ENTER para reiniciar.

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/802/b620cf3eb35db0b4e56a8452d8c2841d.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/802/c2454ce39c2984e12e4e378dc2315314.jpg"></span>

### **Primer booteo**

### Microsoft Windows 7

Lo primero que me di cuenta es que no me reconoció los otros sistemas operativos que tenía en las otras particiones del disco duro. Entró directamente en Windows sin mostrarme opciones para iniciar con los otros sistemas operativos. Luego medí el tiempo que tardaba en llegar a la pantalla de login y pude contar **27 segundos**.

Seguidamente, examiné aspectos básicos:

* Muy buen [fondo de escritorio](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/eb479cb9142ddf4f2e7a148fc22d0fa5.jpg), bastante agradable.
* Me di cuenta que el ícono de "Problemas" mostraba [2 problemas](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/775fca2c3de56bf915d91449a865df0e.jpg) relacionados con la falta de un antivirus y que no se ha configurado Windows Update, apenas inicia.
* La tarjeta de sonido [no fué reconocida](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/eb479cb9142ddf4f2e7a148fc22d0fa5.jpg).

Realizando mayores indagaciones, me di cuenta de que una serie de dispositivos no fueron reconocidos al inicio, como muestra la [captura de pantalla](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/9bbbfbaf63584fbcecd9857b34619914.jpg) del "Administrador de Dispositivos".

Sin ningún programa abierto, el consumo de memoria RAM es de unos **853MB** ([imagen](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/3b53b9af657760f621dc84700306a0a0.jpg)), y cuando abrí el Administrador de Recursos, dejó de responder por casi 1 minuto ([imagen](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/3771245476a1e41052ff2c4acfeaae12.jpg)).

Por otro lado, el sistema recién instalado ocupa **14,47GB** en disco ([imagen](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/aaca3b1054d336536fe66a9cc0655990.jpg)).

### Canaima GNU/Linux 3.0

Canaima GNU/Linux sí reconoció los otros sistemas operativos presentes en otras particiones (tenía Windows, Debian y Canaima) y me presentó un bonito menú en donde podía escoger entre ellos ([imagen](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/e0be12293d14ea3ba2705a550d2f7d26.jpg)). Canaima 3.0 inició en **14 segundos**.

Al iniciar me di cuenta que:

* También tenía un muy bonito [fondo de pantalla](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/4135fc44f9bf307bfb9690d8c437cf63.jpg).
* La tarjeta de sonido fué reconocida, pero entraba en conflictos con la salida de sonido de la tarjeta capturadora de video, lo que inhabilitaba la salida de sonido.

El sistema sin ningún programa abierto, consume **116,4MB** ([imagen](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/be374971a2702fe15c3177c178bbaf1e.jpg)) de memoria RAM y ocupa **4,21GB** ([imagen](http://blog-luisalejandro.rhcloud.com/static/img/posts/802/aaca3b1054d336536fe66a9cc0655990.jpg)).

### **Eficiencia**

Bueno, acá hice unas cuantas pruebas de rendimiento basándome en un benchmark multiplataforma bastante popular llamado [GeekBench](http://www.primatelabs.ca/geekbench/). Bastante sencillo de ejecutar, les muestro los resultados de ambos sistemas operativos, sin ninguna otra aplicación ejecutándose. Más abajo están los resultados (más es mejor).

|**Microsoft Windows 7**|**Canaima GNU/Linux 3.0**
|---|---|
|<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/802/7b4f7a95f9140d0a353a1af35fb3b594.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/802/0c893b1e436ba8da3ea29523f52be92b.jpg"></span>|
|Puntuación|Puntuación|
|3971|4811 (Mejor)|
|[Enlace a los resultados](http://browse.geekbench.ca/geekbench2/view/423602)|[Enlace a los resultados](http://browse.geekbench.ca/geekbench2/view/419480)|

### **Funcionalidad**

Ésto lo podemos comprobar más efectivamente si hacemos una lista de las funciones que pudiera tener un sistema operativo **recién instalado**, y simplemente especificar si la tiene o no la tiene. Por supuesto, esto no significa que después el usuario no pueda instalar algunas otras aplicaciones que brinden la funcionalidad requerida.

|**Funcionalidad**|**Windows**|**Canaima**|
|---|---|---|
|Permite escoger con cual SO se iniciará|No|Si|
|Permite publicar un tweet en Twitter|No|Si|
|Permite acceder a una página web|Si|Si|
|Permite recibir y enviar correo electrónico|No|Si|
|Permite comunicarse con mensajería instantánea|No|Si|
|Soporte a otros sistemas de archivos|4 Aprox. \[+\]|17 Aprox. \[++\]|
|Posee un asistente de bienvenida al sistema|Si|Si|
|Posee un editor de texto básico|Si|Si|
|Posee un manejador para archivos comprimidos|No|Si|
|Posee un visor de imágenes básico|Si|Si|
|Posee un editor de imágenes básico|Si|Si|
|Permite escuchar música|Si|Si|
|Permite ver videos|Si|Si|
|Posee un procesador de textos|No|Si|
|Posee un editor de hojas de cálculo|No|Si|
|Posee un editor de presentaciones|No|Si|
|Recibe actualizaciones periódicas|Si|Si|
|Permite restaurar el sistema a un punto anterior|Si|No|
|Permite modificar la barra/panel de tareas|No|Si|
|Incluye juegos|Si|No|
|Existen virus|Si|No|
|Permite instalar otros programas o aplicaciones|Si|Si|
|Existe una base de datos de aplicaciones|No|Si|
|Posee una aplicación para hacer DVD's|Si|No|
|Posee una calculadora|Si|Si|
|Incluye un grabador de sonidos básico|Si|Si|
|Incluye herramientas de accesibilidad|Si|No|
|Posee un Monitor de Recursos|Si|Si|
|Posee un Mapa de Caracteres|Si|No|
|Posee efectos de escritorio|Si|No|

\[+\] NTFS, FAT, ISO 9660 y UDF.

\[++\] ext2, ext3, ext4, ReiserFS, Reiser4, FAT16, FAT32, HFS, HFS+, UFS, BTRFS, ISO 9660, UDF, NFS, NTFS, JFS y XFS.

### Resumen

* Canaima consume **116,4MB** de Memoria RAM, mientras que Windows **853MB**, ambos sistemas recién instalados.
* Recién instalado, Canaima ocupa **4,21GB** de espacio en disco, mientras que Windows **14,47GB**.
* Canaima inicia en 14 segundos, mientras que Windows en 27 segundos.
* La instalación de Windows dura **30 minutos y reinicia la computadora 3 veces**. Canaima se instala en **14 minutos sin reinicios**.
* Canaima es más eficiente manejando los recursos del sistema (4811 puntos en el benchmark GeekBench).
* De las 30 funcionalidades en estudio, Canaima tiene **23** de ellas. Windows tiene **20**.
* Ambos sistemas operativos tuvieron problemas reconociendo la tarjeta capturadora de video de última generación.

### Conclusiones

En éste estudio hemos demostrado que Windows carece de muchas funcionalidades en las que Canaima sobresale, así como es más rápido, más seguro, más liviano y más versátil.

Aunque Canaima presentó algunos problemas para reconocer el hardware reciente (al igual que Windows), una rápida búsqueda en google me devolvió la solución.

Si bien Microsoft Windows 7 es un Sistema Operativo con mayor popularidad que Canaima GNU/Linux, y que además ha conseguido a través del marketing una gran porción del mercado de software, Canaima ha demostrado que en muy poco tiempo ha logrado convertirse en un gran competidor para Windows.

¿Y tú que opinas?
