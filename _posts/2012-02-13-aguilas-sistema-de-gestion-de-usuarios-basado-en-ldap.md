---
author: martinezfaneyth
date: 2012-02-13 19:41:57-04:30
layout: post
slug: aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap
title: 'AGUILAS: Sistema de gestión de usuarios basado en LDAP'
article_id: 2069
categories:
- Canaima
- Desarrollo
- Software Libre
tags:
- autenticacion
- LDAP
- usuarios
image: /static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__1.jpg
description: Águilas es un sistema de gestión de usuariows basado en LDAP y desarrollado en PHP.
---

Los Administradores de Plataforma tienen un problema recurrente cada vez que les toca elegir cómo manejarán la gestión de sus usuarios en sus entornos de trabajo. El problema usualmente se hace mayor cuando varias aplicaciones forman parte de un mismo proyecto, y se necesita unificar la autenticación de los usuarios para mejorar la experiencia de uso.

Para solventar este problema se han desarrollado extensiones y plugins para las principales aplicaciones web como MediaWiki, Plone, Wordpress, Drupal, TRAC, entre otros, que permiten sustituir su propio sistema de autenticación por uno externo basado en LDAP o <del>Active Directory</del>. Lamentablemente, la mayoría de estas extensiones adolecen de la flexibilidad y funcionalidad que un Administrador de Plataforma necesita para gestionar eficientemente los usuarios de sus aplicaciones. Incluso, la mayoría tiene graves problemas con los formatos de lectura y escritura de entradas, sin mencionar que no existe un esquema común entre las mencionadas extensiones, requiriendo un trabajo adicional de adecuación para que todas las aplicaciones hablen el mismo idioma. No existe, hasta ahora, una solución integral y directa al problema.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__2.jpg" data-figure-href="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__3.jpg"></span>

Es por eso que hoy quiero presentarles la primera versión estable de **Aguilas** (1.0.1), una aplicación en la que [he venido trabajando](http://registro.canaima.softwarelibre.gob.ve) para solventar el problema de gestión de usuarios en la Plataforma Tecnológica del [Proyecto Canaima](http://canaima.softwarelibre.gob.ve). **Aguilas** es una "_Aplicación para la Gestión de Usuarios con Interfaz para LDAP Amigable y_ Segura" que está escrita en PHP, basada en los principios de simplicidad, usabilidad, y elegancia.

Como Administrador de Plataforma, podrás tener una base de datos centralizada con todos los usuarios de tu plataforma, a la cual podrás conectar todos los servicios que necesiten leer la lista de usuarios, teniendo la tranquilidad de que sólo Aguilas estará escribiendo tus usuarios, de forma semánticamente correcta y compatible con la mayoría de las aplicaciones que tienen autenticación con LDAP.

Con Aguilas tus usuarios serán capaces de:

* Crear cuentas de usuario en un servidor LDAP.
* Ver o modificar los atributos de usuario de una cuenta.
* Cambiar o reestablecer la contraseña de una cuenta
* Recordar el nombre de usuario en caso de olvido.
* Eliminar una cuenta de usuario.
* Listar todos los usuarios registrados.
* Buscar usuarios dentro de la base de datos.

¿Te interesa? ¡Sigue leyendo!

Aguilas está desarrollado bajo los principios y valores éticos del Software Libre. El código fuente está licenciado bajo GPL-3, es decir, es público para que lo uses, distribuyas, estudies y modifiques. El Proyecto Aguilas está disponible desde [Gitorious](http://gitorious.org/huntingbears/aguilas), [Github](http://github.com/HuntingBears/aguilas) y [Google Code](http://code.google.com/p/aguilas), desde donde puedes encontrar aún más información.

Aguilas posee una [amplia documentación](http://code.google.com/p/aguilas/wiki/index?tm=6) (por ahora sólo en inglés), enfocada en fomentar la formación de una comunidad de desarrolladores que puedan mejorarla con sus aportes. Es una aplicación que pretende desarrollarse bajo un esquema colaborativo internacional, y distribuirse en la mayoría de las principales distribuciones GNU/Linux.

### Características

En términos técnicos, podemos decir que Aguilas posee las siguientes características:

* Interfaz web agradable y moderna.
* Configuración asistida.
* Seguridad reforzada contra ataques de inyección SQL.
* Bloqueo de robots y spam mediante el uso de captchas.
* Permite el uso de servidores MYSQL/LDAP locales o remotos.
* Permite la adaptación y creación de nuevos temas visuales. Por defecto se incluye un tema al estilo Canaima y otro al estilo Debian.
* Soporte para encriptación de contraseña con algoritmos MD5, SHA y CRYPT.
* Soporte para conexiones TLS durante la autenticación con LDAP.

### Instalación de dependencias

Aguilas requiere la instalación previa de ciertas aplicaciones para su correcto funcionamiento. Dependiendo de la configuración que más se adapte a tus necesidades, es posible que necesites instalar aplicaciones adicionales. Por ejemplo, Aguilas necesita un _Servidor MYSQL_, un _Servidor LDAP_ y un _Agente de Transporte de Correo_ (MTA). Deberás instalarlos junto con Aguilas **sólo** si planeas utilizar la misma computadora como servidor local. Es decir, si planeas utilizar servidores remotos, no es necesario instalarlos.

Si estás utilizando Debian o alguna distribución derivada como Canaima o Ubuntu, puedes instalar las dependencias a través de una terminal de root con el siguiente comando:

{% highlight bash %}
aptitude install apache2 php5 php5-gd php5-ldap php5-mcrypt php5-mysql php5-suhosin php5-cli que bash gettext python-sphinx icoutils python-docutils libmagickcore-extra imagemagick apache2 mysql-server postfix slapd
{% endhighlight %}

Si deseas encontrar mayor información acerca de como configurar Postfix (MTA), puedes echar un vistazo [aquí]({{ site.url }}/utilizando-postfix-para-enviar-correos-a-traves-de-gmail.html).

Una vez satisfechas las dependencias, Aguilas se puede instalar de varias formas.

### Instalar a través de un paquete debian

* Descarga el paquete debian desde el [sitio de descargas del Proyecto Aguilas](http://code.google.com/p/aguilas/downloads/list).
* Ejecuta el siguiente comando en una Terminal de Root:

        dpkg -i /RUTA/AL/PAQUETE.DEB

* Responde las preguntas que se realizan con respecto a la ubicación de los servidores y las contraseñas de las cuentas administrativas.

### Instalar desde el código fuente

*  Descarga el código fuente desde el[ sitio de descargas del Proyecto Aguilas](http://code.google.com/p/aguilas/downloads/list). El código fuente se distribuye como un archivo comprimido con extensión orig.tar.gz.
* Descomprime el archivo con tu programa favorito. Para este ejemplo utilizaremos la aplicación "tar" desde un terminal de usuario:

        tar -xvf /RUTA/AL/PAQUETE.ORIG.TAR.GZ

* En un terminal de usuario, accede a la carpeta recién descomprimida:

        cd /RUTA/A/LA/CARPETA

* Luego, debemos configurar las fuentes con el siguiente comando:

        make

* A continuación se harán las siguientes preguntas para configurar automáticamente:
    1. Nombre de la aplicación, por ejemplo: `Gestión de Usuarios de la Plataforma Tecnológica`.
    2. La persona o grupo responsable de la gestión de la aplicación, por ejemplo: `Administradores de Canaima`.
    3. La dirección de correo electrónico que aparecerá como remitente en todas las operaciones de e-mails a usuarios registrados, por ejemplo: `aguilas@debian.org`.
    4. La dirección de correo electrónico que desea utilizar para enviar informes de errores, por ejemplo: `admins@debian.org`.
    5. El idioma que desea ver en su solicitud (debe estar disponible en la carpeta "locale/"), por ejemplo: `es_ES`.
    6. El tema se aplica a la solicitud (debe estar disponible en la carpeta de temas), por ejemplo: `debian`.
    7. La dirección pública de la aplicación, por ejemplo: `aguilas.debian.org`.
    8. IP o el dominio del servidor donde se encuentra la base de datos MySQL, por ejemplo: `localhost`.
    9. Nombre de la base de datos MySQL (se creará si no existe), por ejemplo: `aguilas`.
    10. El usuario con permisos para leer y crear tablas en la base de datos, por ejemplo: `root`.
    11. Contraseña para el usuario de MySQL, por ejemplo: `123456`.
    12. IP o el dominio del servidor donde se encuentra el servicio LDAP, por ejemplo: `localhost`.
    13. DN con privilegios de lectura y escritura en el servidor LDAP, por ejemplo: `cn=admin,dc=nodomain`.
    14. Contraseña para el DN escritor, por ejemplo: `123456`.
    15. DN base para realizar búsquedas e incluir nuevos usuarios, por ejemplo: `dc=nodomain`.

    Si necesitas modificar alguno de estos parámetros en el futuro, puedes editar el archivo `/usr/share/aguilas/setup/config.php` en cualquier momento.

* Finalmente, obtenemos privilegios de superusuario, e instalamos Aguilas:

        sudo make install

### Contribuir

Nos apasiona ayudar a los usuarios de Aguilas a dar el salto para convertirse en miembros activos de la comunidad, así que hay muchas maneras en que puedes ayudar al desarrollo de Aguilas:

* Informa de los errores y solicita funcionalidades en nuestro [sistema de tickets](http://github.com/HuntingBears/aguilas/issues).
* Envia parches o pull requests.
* Únete a la [lista de correo](http://groups.google.com/group/aguilas-list) de Aguilas y comparte tus ideas sobre cómo mejorar Águilas. Estamos siempre abiertos a sugerencias.
* Mejora la [documentación](http://code.google.com/p/aguilas/wiki/index?tm=6) mediante la redacción de artículos nuevos o corrección los existentes.
* Traduce Aguilas a tu idioma local, al unirse a nuestro [equipo de traducción](http://www.transifex.net/projects/p/aguilas/).

Eso es todo lo que necesitas saber si te gustaría unirse a la comunidad el desarrollo de Águilas. El resto de la información la puedes leer en la [documentación](http://code.google.com/p/aguilas/wiki/index?tm=6).

### Soporte

Si necesitas ayuda, puedes recurrir a alguno de los siguientes medios:

* [Documentación](http://code.google.com/p/aguilas/wiki/index?tm=6).
* [Lista de Correo de Aguilas](http://groups.google.com/group/aguilas-list).
* [Canal IRC de Aguilas](irc://irc.freenode.net/#aguilas).

### Capturas de Pantalla

<div class="picasa">
    <ul class="picasa-album">
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__4.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__5.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__6.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__7.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__8.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__9.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__10.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__11.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__1.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__13.jpg" />
            </a>
        </li>
        <li class="picasa-image">
            <a class="picasa-image-large" href="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__3.jpg">
                <img class="picasa-image-thumb" src="http://huntingbears.com.ve/static/img/posts/2069/aguilas-sistema-de-gestion-de-usuarios-basado-en-ldap__15.jpg" />
            </a>
        </li>
    </ul>
</div>
