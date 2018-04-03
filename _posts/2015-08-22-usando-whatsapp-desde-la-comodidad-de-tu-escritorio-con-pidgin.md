---
article_id: 4329
author: martinezfaneyth
categories: [Software Libre, Aplicaciones]
date: 2015-08-22 21:48:07-0430
description: Podemos utilizar WhatsApp a través de pidgin utilizando un plugin de código abierto. Aquí te explicamos.
image: /static/img/posts/4329/usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin__1.jpg
layout: post
slug: usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin
tags: [mensajería, im, pidgin]
title: Usando WhatsApp desde la comodidad de tu escritorio con Pidgin
---

Últimamente estoy muy paranóico. La última de las paranoias que adquirí es tratar de utilizar una sóla aplicación de mensajería instantánea para todos los servicios que utilizo regularmente. Facebook, Google Hangouts, WhatsApp, IRC, Y ahora Telegram, son algunas de las redes sociales con las que me comunico. Me resulta realmente molesto tener que iniciar y revisar una aplicación por cada una, y además tener que ocupar memoria RAM adicional.

Es por ello que decidí centralizar las aplicaciones a través de Pidgin. Si bien Pidgin ofrece soporte nativo a una gran cantidad de redes, aún le falta compatibilidad con Whatsapp. Sin embargo, a través de plugins, otras personas han podido adaptar los protocolos de comunicación para hacerlos funcionar con Pidgin.

### WhatsApp, Yowsup y Pidgin

[WhatsApp](https://www.whatsapp.com/?l=es) es una aplicación de mensajería desarrollada exclusivamente para teléfonos inteligentes. Permite el envío de mensajes de texto, imágenes, video a través de sus usuarios. La identificación de cada usuario es su número de teléfono móvil. Basta con saber el número de alguien para tenerlo en la lista de contactos.

El procedimiento que voy a describir acá requiere que poseas una cuenta en WhatsApp. Oficialmente la única forma de abrir una cuenta en WhatsApp es a través de la aplicación en tu teléfono inteligente; sin embargo, existen alternativas que permiten hacerlo desde tu computadora, utilizando una conexión a internet.

Lo primero que debes hacer es seguir la [guía para obtener tus credenciales de whatsapp](http://huntingbears.com.ve/utilizando-yowsup-para-obtener-las-credenciales-de-tu-usuario-en-whatsapp.html), que son tu número de teléfono con código de país y la cadena de autenticación (password). Dicha guía utiliza [Yowsup](https://github.com/tgalal/yowsup), una aplicación hecha en python diseñada para comunicarse directamente con los servidores de WhatsApp.

Una vez obtenidas las credenciales, debemos compilar e instalar el plugin para pidgin llamado [whatsapp-purple](https://github.com/davidgfnet/whatsapp-purple). Para ello vamos a instalar las dependencias de compilación. En una distribución derivada de debian podemos hacer así (con permisos de root):

{% highlight bash %}
sudo apt-get install git make g++ sudo pidgin python-dateutil python-argparse libglib2.0-0 libglib2.0-dev libpurple-dev libfreeimage-dev libprotobuf-dev
{% endhighlight %}

Luego debemos clonar el repositorio del plugin con el siguiente comando (sin permisos de root):

{% highlight bash %}
git clone https://github.com/davidgfnet/whatsapp-purple
{% endhighlight %}

Seguidamente, entramos en la carpeta recién clonada y compilamos el plugin (sin permisos de root):

{% highlight bash %}
make
{% endhighlight %}

Y luego (con permisos de root), instalamos el plugin:

{% highlight bash %}
sudo make install
{% endhighlight %}

El plugin está instalado, ahora debemos configurarlo. Abrimos pidgin y vamos al menú `Cuentas > Gestionar cuentas`; pulsamos sobre el botón "Añadir". Allí rellenaremos los siguientes datos:

* **Protocolo**: WhatsApp.
* **Nombre de Usuario**: Número de teléfono con código de país.
* **Contraseña**: Contraseña obtenida con [Yowsup](http://huntingbears.com.ve/utilizando-yowsup-para-obtener-las-credenciales-de-tu-usuario-en-whatsapp.html).

Listo, ya tenemos nuestro plugin configurado. Ahora podemos agregar contactos introduciendo sus números de teléfono en el cuadro de diálogo `Buddies > Añadir un amigo ...`.

<div class="picasa">
    <ul class="picasa-album">
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/4329/usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin__2.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/4329/usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin__2.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/4329/usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin__4.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/4329/usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin__4.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/4329/usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin__6.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/4329/usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin__6.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/4329/usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin__7.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/4329/usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin__7.jpg" />
            </a>
        </li>
    </ul>
</div>

Tus grupos existentes se sincronizarán con tu lista de contactos, más no lo harán tus contactos individuales, debes agregarlos manualmente. Puedes enviar fotos y archivos a través del menú `Conversación > Enviar archivo ...` de la ventana de conversación.

Si deseas visualizar los emojis nativos de WhatsApp, debes instalar un tema de íconos con emojis unicode como [Twitter for pidgin](http://huntingbears.com.ve/ahora-puedes-utilizar-los-smileys-de-twitter-en-pidgin-con-este-nuevo-pack-de-iconos.html).

Algunas personas reportan problemas para recibir mensajes, por lo que recomiendo realizar el siguiente paso adicional:

Se debe cambiar la configuración para que el campo "Resource" diga como aparezca en la imagen. Debes ir a Cuentas > Gestionar Cuentas > (Seleccionar la cuenta de WhatsApp) > Modificar, y en la pestaña "Avanzadas", poner `S 40-2.12.11` en el campo "Resource". Cierra y vuelve a abrir Pidgin.
