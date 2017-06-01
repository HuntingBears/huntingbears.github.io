---
article_id: 4330
author: martinezfaneyth
categories:
- Software Libre
- Aplicaciones
date: 2015-08-22 23:35:52-0430
description: ''
image: http://www.adslzone.net/app/uploads/2015/05/APERTURA-CIERRE-TELEGRAM1.jpg
layout: post
slug: utilizando-telegram-a-traves-de-pidgin-con-telegram-purple
tags:
- telegram
- pidgin
- plugin
title: Utilizando Telegram a través de pidgin con telegram-purple
---

Siguiendo con el artículo anterior sobre [cómo usar WhatsApp a través de pidgin](http://huntingbears.com.ve/usando-whatsapp-desde-la-comodidad-de-tu-escritorio-con-pidgin.html), esta vez explico como hacerlo con Telegram.

A través del plugin [telegram-purple](https://github.com/majn/telegram-purple), podemos activar la mayoría de las funcionalidades de Telegram, entre las que podemos mencionar:

* Enviar y recibir mensajes.
* Mostrar contactos y chats.
* Ver la información de los contactos.
* Descargar y usar fotos de perfil.
* Chats secretos.
* Envío de imágenes.
* Visualización de stickers.

Primeramente, debemos instalar las dependencias de compilación, ya que vamos a compilar el plugin. En una terminal con permisos de root, ejecutamos el siguiente comando:

sudo apt-get install python2.7 libssl-dev libglib2.0-dev libpurple-dev libwebp-dev git make g++

Luego, clonaremos el repositorio y accederemos a la carpeta, con el siguiente comando (sin permisos de root):

git clone --recursive https://github.com/majn/telegram-purple
cd telegram-purple

Compilamos el plugin (sin permisos de root):


./configure
make


Luego lo instalamos así (con permisos de root):

sudo make install

