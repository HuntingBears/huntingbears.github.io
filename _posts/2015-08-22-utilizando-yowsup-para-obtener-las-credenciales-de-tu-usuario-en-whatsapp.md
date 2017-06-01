---
article_id: 4328
author: martinezfaneyth
categories: [Software Libre, Desarrollo, Aplicaciones]
date: 2015-08-22 21:22:45-0430
description: Para algunas actividades particulares, a veces es necesario husmear un
  poco en la base de datos de WhatsApp para obtener los datos de acceso de nuestro
  usuario en la plataforma. Aquí te mostramos como.
image: http://huntingbears.com.ve/static/img/posts/4328/utilizando-yowsup-para-obtener-las-credenciales-de-tu-usuario-en-whatsapp__1.jpg
layout: post
slug: utilizando-yowsup-para-obtener-las-credenciales-de-tu-usuario-en-whatsapp
tags: [whatsapp, yowsup, pidgin]
title: Utilizando Yowsup para obtener las credenciales de tu usuario en WhatsApp
---

Para [algunas actividades particulares](http://huntingbears.com.ve/usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin.html), a veces es necesario husmear un poco en la base de datos de WhatsApp para obtener los datos de acceso de nuestro usuario en la plataforma. Normalmente esto es un proceso transparente para el usuario común porque la aplicación oficial de tu teléfono inteligente se encarga de manejar la autenticación sin necesidad de que tu introduzcas un usuario o contraseña. Sin embargo, existen otras formas de conectarse a los servidores de WhatsApp sin necesidad de utilizar la aplicación oficial, y para esto necesitamos los datos de acceso de nuestro usuario.

Para obtener estos datos, utilizaremos una pequeña aplicación en Python llamada Yowsup.

### Yowsup

El protocolo de WhatsApp es una versión modificada del protocolo XMPP que es de código abierto. Aunque los autores de WhatsApp han hecho su versión de codigo cerrado, el autor de Yowsup ha sido lo suficiente hábil como para hacer ingeniería inversa al protocolo y escribir esta fantástica librería.

Yowsup funciona como un cliente de la API pública de whatsapp, permitiendo que registremos nuestro número de teléfono en la base de datos de WhatsApp, y así recibir la cadena de autenticación.

La librería es totalmente de código abierto y la tenemos [disponible en Github](https://github.com/tgalal/yowsup). Yowsup se puede instalar en cualquier distribución GNU/Linux (Ubuntu, Linux Mint, Elementary, Canaima, etc) a través del sistema de [versionamiento git](http://huntingbears.com.ve/guia-basica-de-desarrollo-con-git.html).

Primero, abriremos una terminal de usuario y clonaremos el repositorio con git de la siguiente forma:

```
git clone https://github.com/tgalal/yowsup
```

Para el siguiente comando, necesitaremos tener nuestro teléfono a mano, ya que recibiremos un mensaje de texto con el código de validación. Nos meteremos dentro de la carpeta y ejecutaremos:

```
./yowsup-cli registration --phone [PHONE] --cc [CC] --requestcode sms
```

`[PHONE]` debe sustituirse por el número de teléfono incluyendo el código de país y `[CC]` es el código de país. Seguidamente recibiremos un mensaje de texto en nuestro teléfono conteniendo el código de verificación para el registro, guardamos ese número. Luego ejecutaremos el siguiente comando:

```
./yowsup-cli registration --phone [PHONE] --cc [CC] --register [CODE]
```

`[CODE]` es el código que recibimos por mensaje de texto. Al ejecutar el comando, recibiremos un bloque de información como el que sigue:

```
status: ok
kind: free
pw: [PASSWORD]
price: US$0.99
price_expiration: 1443389834
currency: USD
cost: 0.99
expiration: 1472221910
login: [PHONE]
type: existing
```

El campo `pw` contiene la cadena de nuetra contraseña encriptada. Si quieres averiguar que aplicaciones pueden autenticarse usando estas credenciales, lee el artículo que habla sobre [usar WhatsApp en Pidgin](http://huntingbears.com.ve/usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin.html).
