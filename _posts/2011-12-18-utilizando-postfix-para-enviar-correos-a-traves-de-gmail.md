---
author: martinezfaneyth
language: es
date: 2011-12-18 23:10:15-04:30
layout: post
slug: utilizando-postfix-para-enviar-correos-a-traves-de-gmail
title: Utilizando postfix para enviar correos a través de GMail
wordpress_id: 1900
categories:
- Canaima
- Debian
- Software Libre
- Tutoriales
tags:
- gmail
- postfix
- relayhost
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/1900/611c240cfadeb522fe977748214ef4fd.jpg
description: Si no tienes un servicio privado de envío de correos, puedes utilizar postfix y GMail para lograr el mismo cometido.
---

Normalmente es posible instalar un Mail Transport Agent (MTA) como postfix o exim para que sirva como servidor de correo en cualquier computadora conectada a internet con una dirección IP pública asignada. Sin embargo, debido al problema del SPAM, muchos de los servidores de correo de Internet bloquean el correo no autenticado proveniente de direcciones IP dinámicas, que son las habituales en las conexiones domésticas.

Una de las soluciones existentes es instalar un servidor de correo que no envíe directamente el correo al servidor destino, sino que utilice Google Mail (GMail) para que retrasmita los mensajes.

Para poder enviar correo utilizando el servidor SMTP de GMail (`smtp.gmail.com`) la conexión tiene que estar cifrada con TLS. Para ello necesitaremos tres elementos:

1. Un certificado autenticado por una autoridad certificadora válida para GMail.
2. Una cuenta de correo GMail.
3. Un MTA local.

<!-- more -->

### Instalación

Primeramente instalamos Postfix, un MTA bastante completo y configurable. Abrimos una terminal de root (Aplicaciones > Accesorios > Terminal de Root) y escribimos el siguiente comando:

{% highlight bash %}
aptitude install postfix
{% endhighlight %}

Nota: Postfix tiene conflictos con Exim, pero es seguro remover exim en favor de postfix.

La instalación nos hará algunas preguntas:

1. Tipo de configuración: acá responderemos "Sitio de Internet".
2. Nombre del sistema de correo: acá pondremos el nombre de dominio de nuestro servidor de correo local. Para nuestro caso, podemos poner el mismo nombre de dominio de nuestra PC. e.g. "micasa".

Listo, la instalación debe haber finalizado existosamente.

### Configuración

Luego tenemos que editar el fichero `/etc/postfix/main.cf` y añadir las siguientes líneas al final del archivo:

{% highlight text %}
relayhost = [smtp.gmail.com]:587
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl/passwd
smtp_sasl_security_options = noanonymous
smtp_use_tls = yes
smtp_tls_CAfile = /etc/postfix/cacert.pem
{% endhighlight %}

En resumen, acá le estamos diciendo a `postfix` que utilice `relayhost` para conectarse al servidor de Gmail, que utilice `smtp_sasl_password_maps` para extraer los datos de conexión SASL y que utilice `smtp_tls_CAfile` como certificado para la conexión segura.

### Autenticación

Debemos crear el archivo `/etc/postfix/sasl/passwd` con el siguiente contenido:

{% highlight text %}
[smtp.gmail.com]:587    [CUENTA]@gmail.com:[CONTRASEÑA]
{% endhighlight %}

Por ejemplo:

{% highlight text %}
echo "[smtp.gmail.com]:587    luis@gmail.com:123456" > /etc/postfix/sasl/passwd
{% endhighlight %}

Y lo protegemos adecuadamente con:

{% highlight text %}
chmod 600 /etc/postfix/sasl/passwd
{% endhighlight %}

Seguidamente, hay que transformar el archivo a un fichero indexado de tipo hash mediante la instrucción:

{% highlight text %}
postmap /etc/postfix/sasl/passwd
{% endhighlight %}

Lo que creará el fichero `/etc/postfix/sasl/passwd.db`

### Certificación

Debemos tener instalados los certificados SSL de las autoridades certificadoras para poder realizar éste paso. Los podemos instalar así:

{% highlight bash %}
aptitude install ca-certificates
{% endhighlight %}

Para añadir la autoridad certificadora _Equifax_ (la que certifica correos de Gmail) al fichero de certificados que utilizará postfix, ejecutamos el siguiente comando en una consola de root:

{% highlight bash %}
cat /etc/ssl/certs/Equifax_Secure_CA.pem > /etc/postfix/cacert.pem
{% endhighlight %}

### Puesta en funcionamiento

Finalmente, reiniciamos postfix para aplicar los cambios, así:

{% highlight bash %}
/etc/init.d/postfix restart
{% endhighlight %}

Podemos comprobar el funcionamiento abriendo dos consolas. En una ejecutaremos el siguiente comando para monitorear el comportamiento del correo (como root):

{% highlight bash %}
tail -f /var/log/mail.log
{% endhighlight %}

Y en la otra enviaremos un correo:

{% highlight bash %}
echo "Éste es un correo de prueba" | mail prueba@gmail.com
{% endhighlight %}

Si hicimos las cosas bien, en la otra consola deberíamos ver algo como ésto:

{% highlight text %}
Dec 18 18:33:40 OKComputer postfix/pickup[10945]: 75D4A243BD: uid=0 from=
Dec 18 18:33:40 OKComputer postfix/cleanup[10951]: 75D4A243BD: message-id=
Dec 18 18:33:40 OKComputer postfix/qmgr[10946]: 75D4A243BD: from=, size=403, nrcpt=1 (queue active)
Dec 18 18:33:44 OKComputer postfix/smtp[10953]: 75D4A243BD: to=prueba@gmail.com, relay=smtp.gmail.com[74.125.93.109]:587, delay=3.7, delays=0.15/0.14/1.8/1.6, dsn=2.0.0, status=sent (250 2.0.0 OK 1324249500 eb5sm36008464qab.10)
Dec 18 18:33:44 OKComputer postfix/qmgr[10946]: 75D4A243BD: removed
{% endhighlight %}

Espero que les sea de utilidad :)
