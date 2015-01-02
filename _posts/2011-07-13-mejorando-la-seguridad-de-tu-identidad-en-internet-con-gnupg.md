---
author: martinezfaneyth
language: es
date: 2011-07-13 12:30:58-04:30
layout: post
slug: mejorando-la-seguridad-de-tu-identidad-en-internet-con-gnupg
title: Mejorando la seguridad de tu identidad en internet con GnuPG
wordpress_id: 1595
categories:
- Canaima
- Educativo
- Software Libre
tags:
- canaima gnu linux
- seguridad
- Software Libre
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/7daf63d07da8828324c39d40976f955b.jpg
description: GnuPG permite resguardar tus datos e identidad en internet mediante técnicas de encriptado y firma electrónica.
---

En los últimos tiempos, con los avances tecnológicas en materia de transacciones electrónicas, se ha hecho cada vez más importante proteger la identidad de las personas en internet. Es impresionante la cantidad de casos de estafas, robos, y situaciones fraudulentas en general de las que han sido víctimas un sinnúmero de personas que no han sido precavidas en el cuidado de su "e-dentidad".

Una de las formas de mejorar la seguridad de tu identidad en internet es a través del uso de técnicas para la encriptación de los datos transmitidos en línea, entre las que podemos mencionar:

* Firmas digitales de mensajes.
* Cifrado y descifrado de datos.

El Software [GnuPG](http://www.gnupg.org/index.es.html) facilita al usuario común realizar éstas operaciones. A continuación explicaré su principio de funcionamiento y su uso a través de la línea de comandos. ¡No os desesperes! Si no te interesa saber todo ese gamelote, adelántate hasta donde dice "Usando GnuPG con tu cliente de correo electrónico".

<!-- more -->

### ¿Y cómo funciona?

El usuario de GnuPG, posee una llave pública y una privada asociadas a su identidad en internet (normalmente su nombre completo y uno o varios correos electrónicos). Con ayuda del par de llaves puede firmar, cifrar y descifrar los datos que comúnmente comparte en internet o en cualquier otro medio público.

El par de llaves es generado una sola vez. La llave pública debe ser expuesta para que todo el mundo conozca que la llave está asociada a una persona en particular, por lo que existen servidores públicos alrededor del mundo que guardan la información actualizada de todas las llaves GPG. Por otro lado, la llave privada es confidencial, protegida por contraseña y lógicamente encontrada en la computadora personal del dueño (aunque puede ser movida a otros computadores).

Por ejemplo, al firmar un documento, el usuario lo hace con su llave pública, pero sólo puede hacerlo si posee la privada y conoce su contraseña. Quien recibe el documento entonces puede estar seguro de que quien lo envía es quien dice ser.

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/a484857ee6d1fb94457694d14ffef595.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/0a92b5139203db8416005ba7ff764b93.jpg"></span>

La cosa es un poco más complicada en el cifrado y descifrado de documentos. Pensemos por un momento que una clave pública es como una caja fuerte de seguridad. Cuando un usuario cifra un documento, lo hace utilizando la llave pública perteneciente al destinatario, entonces ese documento se pone en la caja fuerte, la caja se cierra, y el bloqueo de la combinación de ésta se gira varias veces. La parte correspondiente a la clave privada, es decir, el destinatario, es la combinación que puede volver a abrir la caja y retirar el documento. Dicho de otro modo, sólo la persona que posee la clave privada puede recuperar un documento que ha sido cifrado utilizando la llave pública asociada a esa clave privada.

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/308f923770e3017c456b848d8292e3b6.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/f3bda75c3ac26f2acc4e259c16f279ed.jpg"></span>

Si sólo tienes tu clave privada y pública no puedes cifrar mensajes, sólo firmarlos, ya que necesitas la clave pública del usuario al que quieres enviar el mensaje o documento cifrado para poder hacerlo. Si el usuario al que quieres enviar mensajes cifrados ya tiene clave pública, pídele que te la proporcione para que puedas establecer comunicaciones cifradas con él.

### Empezando a usar GnuPG

La mayoría de las distribuciones Linux existentes hoy en día vienen con GnuPG preinstalado. Sin embargo puedes comprobar si lo tienes instalado con el siguiente comando en un terminal (Aplicaciones > Accesorios > Terminal):

{% highlight bash %}
dpkg-query -W -f='${Status}' gnupg
{% endhighlight %}

Si el resultado es "install ok installed", quiere decir que está instalado. De lo contrario podemos instalarlo con el siguiente comando en una terminal de Root (Aplicaciones > Accesorios > Terminal de Root):

{% highlight bash %}
aptitude install gnupg
{% endhighlight %}

Seguidamente, creemos nuestro primer par de llaves nuevas con el comando `gpg --gen-key` (recuerda no hacer esto como usuario administrador, o de lo contrario estarás haciendo las llaves para el usuario root y no para tu usuario).

El asistente te hará una serie de preguntas a las que tenemos que prestar especial atención. También te recomiendo que enciendas tu reproductor de música para mejorar la entropía, el proceso que permite la aleatorización en la creación de las llaves.

{% highlight bash %}
gpg --gen-key
{% endhighlight %}

{% highlight text %}
gpg (GnuPG) 1.4.10; Copyright (C) 2008 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Por favor seleccione tipo de clave deseado:
(1) RSA and RSA (default)
(2) DSA and Elgamal
(3) DSA (sólo firmar)
(4) RSA (sólo firmar)
Su elección: 1
{% endhighlight %}

Mi elección fué RSA (default), un algoritmo que te permite tener un encriptado de alto nivel y no está afectado por patentes (a excepción de Estados Unidos).

{% highlight text %}
las claves RSA pueden tener entre 1024 y 4096 bits de longitud.
¿De qué tamaño quiere la clave? (2048) 4096
El tamaño requerido es de 4096 bits
{% endhighlight %}

Mientras más alto sea el tamaño, más difícil de desencriptar es la clave y por lo tanto es más segura. Sin embargo, en algunos equipos de baja prestación, es mayor el tiempo que debe emplearse para descifrar un mensaje. También es bueno que sepas que, en algunas comunidades en donde es importante mantener la confianza de las personas que protagonizan las actividades (como por ejemplo los [Debian Developers](http://www.debian.org/devel/)), es recomendable utilizar una longitud de 4096bits.

{% highlight text %}
Por favor, especifique el período de validez de la clave.
0 = la clave nunca caduca
  = la clave caduca en n días
w = la clave caduca en n semanas
m = la clave caduca en n meses
y = la clave caduca en n años
¿Validez de la clave (0)? 0
La clave nunca caduca
¿Es correcto? (s/n) s
{% endhighlight %}

Podemos introducir una fecha de caducidad, para obligarnos a rotar siempre la contraseña de la llave, pero como yo soy muy olvidadizo, escojo que nunca caduque.

Lo siguiente es llenar nuestros datos personales (Nombres y Apellidos completos, Correo y un Comentario) y establecer una contraseña segura (compuesta por números, letras mayúsculas y minúsculas intercaladas preferiblemente).

Al final del proceso obtendremos algo así:

{% highlight text %}
pub   LONGITUD/LLAVE FECHA
Huella de clave = XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX
uid                  NOMBRE (COMENTARIO) CORREO
sub   LONGITUD/LLAVE FECHA
{% endhighlight %}

El par de llaves está creado y guardado en nuestro computador. Podrás localizar el identificador de la llave pública (UID) en la primera línea que comienza con la palabra "pub", compuesto de 8 dígitos hexadecimales.

### Exportando llaves

Al exportar la llave pública se amplía el número de personas que conocerán tu identidad GPG, y por tanto, el número de personas con las que podrás comunicarte de manera segura. La clave se puede distribuir poniéndola en una página web, por correo, subiéndola en un servidor de llaves públicas, o cualquier otro método.

La orden para exportar la llave es:

{% highlight bash %}
gpg --armor --output [ARCHIVO] --export [UID]
{% endhighlight %}

Si no designamos un identificador de usuario (`[UID]`) todas las claves presentes en el anillo de claves serán exportadas. El resultado es enviado por defecto a la línea de comandos de la terminal, pero con la opción `--output` podemos especificar que sea enviado a un archivo (`[ARCHIVO]`) en particular. Si no utilizamos la opción `--armor` exportaremos la llave en formato binario.

### Importando llaves

Cuando se recibe la llave pública de otra persona hay que añadirla a la base de datos (anillo de llaves) para poder hacer uso de ella. La orden para importarlas es la siguiente:

{% highlight bash %}
gpg --import [ARCHIVO]
{% endhighlight %}

El archivo puede contener una sola llave o varias a la vez, pertenecientes a diferentes personas o a la misma.

### Moviendo la llave secreta de un lugar a otro

Normalmente las llaves secretas deben permanecer en la computadora en la que fueron creadas. Sin embargo, existen excepciones en las que necesitamos estrictamente la llave secreta en otra computadora. En esos casos, lo que se hace es exportarla a un archivo (`[ARCHIVO]`) con el siguiente comando:

{% highlight bash %}
gpg --armor --output [ARCHIVO] --export-secret-keys [UID]
{% endhighlight %}

Tomamos el archivo y lo trasladamos **SEGURAMENTE** a la otra computadora, recuerda que quien tenga este archivo tendrá posesión de tu llave secreta, pudiendo utilizarla para  hacerse pasar por ti.

Estando en la otra computadora, ejecuta el siguiente comando:

{% highlight bash %}
gpg --import [ARCHIVO]
{% endhighlight %}

Siendo `[ARCHIVO]` la ruta al archivo que trasladaste desde la otra computadora. Borra el archivo luego de efectuada la operación.

### Enviar llaves a servidores públicos

Ahora que sabes como importar y exportar llaves, es buena idea enviarla a un servidor público de llaves que te ayude a distribuir tu llave. Existen un montón de servidores de llaves en el mundo y la mayoría de ellos intercambian y actualizan llaves entre ellos.

El comando para enviar llaves es:

{% highlight bash %}
gpg --keyserver [SERVIDOR] --send-key [UID]
{% endhighlight %}

En donde el `[UID]` es el identificador de la llave que deseamos enviar y `[Servidor]`, el servidor de llaves públicas a donde la enviaremos. Los servidores más comunes se listan a continuación:

* pgp.mit.edu
* keys.gnupg.net
* subkeys.pgp.net

### Obtener llaves desde los servidores públicos

Es posible buscar y descargar llaves en los servidores públicos de una manera bastante sencilla. La búsqueda se hace en toda la llave, por lo que puedes buscar por apellido, nombre, correo o comentario. Busquemos por ejemplo en el servidor `subkeys.pgp.net` las llaves que contengan la palabra "faneyth", luego de encontrados los resultados, seleccionamos el número de la que queremos importar a nuestro anillo de llaves.

{% highlight bash %}
gpg --keyserver subkeys.pgp.net --search-keys faneyth
{% endhighlight %}

{% highlight text %}
gpg: buscando "faneyth" de hkp servidor subkeys.pgp.net
(1)    Luis Alejandro Martí­nez Faneyth (Hunting Bears)
      4096 bit RSA key 5B849610, creado: 2010-02-22 (revocada)
(2)    Luis Alejandro Martínez Faneyth (Hunting Bears)
    Luis Alejandro Martí­nez Faneyth (Hunting Bears)
    Luis Alejandro Martínez Faneyth (Hunting Bears)
      4096 bit RSA key E78DAA2E, creado: 2010-01-20
(3)    Luis Alejandro Martínez Faneyth (Hunting Bears)
      1024 bit DSA key 6575420A, creado: 2009-12-18
Keys 1-3 of 3 for "faneyth".  Introduzca número(s), O)tro, o F)in >2
gpg: solicitando clave E78DAA2E de hkp servidor subkeys.pgp.net
gpg: /home/huntingbears/.gnupg/trustdb.gpg: se ha creado base de datos de confianza
gpg: clave E78DAA2E: clave pública "Luis Alejandro Martí­nez Faneyth (Hunting Bears) " importada
gpg: no se encuentran claves absolutamente fiables
gpg: Cantidad total procesada: 1
gpg:               importadas: 1  (RSA: 1)
{% endhighlight %}

### Firmando otras llaves

Cuando tenemos la certeza de que una clave es válida y pertenece a quien dice, podemos firmarla digitalmente, de modo que otros que confíen en nuestra firma la puedan dar por válida.

Usando el comando:

{% highlight bash %}
gpg --edit-key [UID]
{% endhighlight %}

para la clave que queremos firmar, nos llevará al subcomando:

{% highlight bash %}
Command> sign
{% endhighlight %}

Una vez firmada, debemos subir la llave a un servidor de llaves.

### Usando GnuPG con tu cliente de correo electrónico

Una de las aplicaciones de usuario más comunes en donde se puede utilizar GnuPG es el correo electrónico. Existe un plugin para Thunderbird (y sus derivados: Icedove en Debian y [Guácharo en Canaima](http://huntingbears.com.ve/cunaguaro-y-guacharo-nuevas-aplicaciones-para-canaima-gnulinux-3-0.html)) llamado [enigmail](http://www.enigmail.net/download/index.php), que permite integrar todas las funcionalidades de GnuPG a través de una interfaz gráfica bastante amigable.

Para instalarlo sólo debemos buscar en la [página de descargas del plugin](http://enigmail.mozdev.org/download/index.html) la versión necesaria según nuestro sistema operativo y versión de Thunderbird, para luego "guardar el enlace como" haciendo click derecho sobre el enlace de descarga. Finalmente en Thunderbird nos vamos a Herramientas > Complementos, y en la pestaña "Extensiones" hacemos click en el botón "Instalar...", lo cual nos llevará a un diálogo en donde debemos seleccionar el plugin (un archivo de extensión xpi).

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/36156535929b7d4c8ceb6b16e567bdd3.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/c0dcd35f375ffb0d2578e0af7c195fde.jpg"></span>

### Generación del par de llaves

Abre Thunderbird y verás una nueva opción en el menú superior a la izquierda de Herramientas titulado "OpenPGP". Selecciona OpenPGP > Administración de claves. Se abrirá una ventana; selecciona en el menú Generar > Nuevo par de claves.

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/8d077313052cbed1a9407c01a34a3a80.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/77835ad4da34bd5e5d0f08ab957778ae.jpg"></span>

En el diálogo que aparece puedes especificar varias preferencias de la clave:

* La cuenta/identificación que quieres usar para el par de claves.
* La contraseña o frase clave del par de claves.
* El tiempo de expiración de la clave.
* En la pestaña Avanzadas, el tamaño y el tipo de clave.

Haz clic en el botón "Generar clave". El proceso puede llegar a tardar varios minutos, como indica la nota al pie del diálogo.

### Configuración de las llaves

Puedes utilizar tu nueva clave para firmar los correos que envíes. Para ello, abre el diálogo de configuración de las cuentas (Editar > Configuración de las Cuentas) y en la sección "Seguridad OpenPGP" de la cuenta de correo para la que generaste la llave, selecciona "Activar el soporte OpenGPG (Enigmail) para esta identidad".

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/35ba915c3232e11cec7c7704a7fb0ef2.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/8ec279b61bb04e2e22a0e75f3b0a3bfc.jpg"></span>

Si sólo tienes la clave que acabas de generar, utiliza la opción "Usar la dirección de correo de esta identidad para identificar la clave OpenPGP", pero, si tienes más de una, puedes utilizar la opción "Usar un ID de clave OpenPGP específico" para elegir la que quieres usar.

Más abajo puedes activar el firmado y/o cifrado de los mensajes por defecto. Si no lo activas, siempre puedes hacerlo mientras estés redactando un correo a través del menú OpenPGP o los botones OpenPGP y S/MIME de la ventana de redacción, que se muestran por defecto tras instalar Enigmail.

### Subir la clave pública al servidor de claves

Para publicar tu clave en uno de estos servidores, no tienes más que hacer clic derecho en ella en la ventana de administración de claves de Enigmail (OpenPGP > Administración de Claves) y seleccionar la opción "Subir claves públicas al servidor de claves". En la lista de servidores que aparece, selecciona uno (por ejemplo pgp.mit.edu) y pulsa el botón Aceptar.

<span class="figure figure-100" data-figure-src="http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/e58f75c5449bc002b36c7f5befc3ce96.jpg" data-figure-href="http://blog-luisalejandro.rhcloud.com/static/img/posts/1595/a6faba34f85a563f1d2c44a65d1f6107.jpg"></span>

### Firmar y/o cifrar mensajes

Firmar y cifrar mensajes desde la ventana de redacción es muy sencillo.

Si quieres _firmar tu mensaje_, selecciona en el menú superior OpenPGP > Firmar mensaje, o pulsa el botón OpenPGP de la barra de herramientas y marca la opción. Al enviar el mensaje se te pedirá la contraseña o frase de paso de tu clave privada, si la protegiste de esta manera, y se generará un código a partir del contenido de tu mensaje que se adjuntará a éste y permitirá al destinatario verificar que el cuerpo del mensaje no ha sido alterado en su trayecto.

Si quieres _cifrar tu mensaje_, selecciona en el menú superior OpenPGP > Cifrar mensaje, o pulsa el botón OpenPGP de la barra de herramientas y marca la opción. Como ya se comentó, para enviar un mensaje cifrado a alguien necesitas su clave pública. Las claves de los destinatarios especificados en los campos «Para:» se buscarán en tu anillo de claves en función de su dirección de correo electrónico. Si al enviar el mensaje no se encuentra alguna clave o no es de confianza, se abrirá una ventana pidiéndote seleccionar las claves públicas que se usarán para cifrar, desde la que puedes también descargarte las claves que te falten desde los servidores de claves.

Ésto es más o menos lo que esencialmente se debe saber en cuanto a GnuPG, espero les haya sido de utilidad.
