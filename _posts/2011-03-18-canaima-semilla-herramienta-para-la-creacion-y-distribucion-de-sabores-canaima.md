---
author: martinezfaneyth
language: es
date: 2011-03-18 19:58:34-04:30
layout: post
slug: canaima-semilla-herramienta-para-la-creacion-y-distribucion-de-sabores-canaima
title: 'Canaima Semilla: Herramienta para la creación y distribución de Sabores Canaima'
wordpress_id: 814
categories:
- Canaima
- Desarrollo
- Software Libre
tags:
- canaima gnu linux
- canaima semilla
- creación distribución
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/814/3baf3a6c49e610d9677b68b20b1068e2.jpg
description: Canaima Semilla es una herramienta para generar distribuciones derivadas de Canaima.
---


### ESTE ARTÍCULO ESTÁ SIENDO REESCRITO

<!-- @TODO@ -->

Canaima Semilla es una aplicación diseñada para facilitar a individuales, colectivos e instituciones la creación de distribuciones GNU/Linux personalizadas y adaptadas a sus necesidades (también llamadas "sabores"), partiendo de la Metadistribución Canaima GNU/Linux. Actualmente existen varios sabores de Canaima:

* **Canaima Primera Base**: Sabor con aplicaciones básicas, desde el cuál se pueden instalar el resto de los sabores.
* **Canaima Popular**: Sabor ligero de fácil distribución, con aplicaciones de uso común.
* **Canaima Institucional**: Sabor utilizado en la Administración Pública Nacional venezolana para fortalecer la Soberanía Tecnológica dentro del estado.
* **Canaima Educativo**: Proyecto educativo liberador para los niños de la educación primaria.
* **Canaima Forense**: Sabor que facilita la investigación forense en sistemas informáticos.
* **Canaima Colibrí**: Sabor destinado a optimizar el rendimiento del sistema en computadoras de baja capacidad.

Mediante una serie de pasos, podrás crear una imagen instalable de los sabores antes mencionados, o si lo prefieres, crear tu propio Sabor Canaima.

<!-- more -->

### Instalación

Canaima Semilla se encuentra en los repositorios de las versiones 3.0, 3.1, 4.0 y 4.1 de Canaima. Si utilizas Canaima, puedes instalarlo de la siguiente manera:

{% highlight bash%}
aptitude update
aptitude install canaima-semilla
{% endhighlight %}

Si no utilizas Canaima, deberás incluir el repositorio de Canaima antes de ejecutar los comandos de instalación. Abre el archivo `/etc/apt/sources.list` con tu editor de textos preferido (con permisos de root) y modifícalo para agregar la siguiente línea:

{% highlight bash%}
deb http://paquetes.canaima.softwarelibre.gob.ve/ estable main aportes no-libres
{% endhighlight %}

### Configuración

En Canaima Semilla vienen incorporados algunos perfiles de configuración para algunos de los sabores de Canaima. Si se desean crear nuevos sabores, es necesario crear nuevos perfiles, y para ello, es necesario saber el método para crearlos.

Un perfil está compuesto de varios archivos con nombres específicos colocados dentro de una carpeta que lleva por nombre el nombre del sabor en minúsculas y sin caracteres especiales. Dentro de la carpeta deben estar los siguientes archivos y carpetas (algunos son opcionales):

1. (_Obligatorio_) Un archivo llamado `profile.conf`. Este archivo contiene variables de configuración para la construción del sabor, entre las que podemos mencionar:
    * `PROFILE_NAME`:
        * Funcionalidad: Es el nombre del sabor. Debe ser una sóla palabra en minúsculas y sin caracteres especiales.
        * Ejemplo: `PROFILE_NAME="popular"`
    * `PROFILE_ARCH`:
        * Funcionalidad: Listar las arquitecturas soportadas por el sabor. Se compone por una lista de arquitecturas separadas por espacios. Esto es útil cuando se sabe que un sabor no tiene paquetes compilados para una arquitectura en particular.
        * Ejemplo: `PROFILE_ARCH="i386 amd64"`
    * `AUTHOR_NAME`:
        * Funcionalidad: Indica el nombre del autor o grupo de autores. Puede tener caracteres especiales.
        * Ejemplo: `AUTHOR_NAME="Equipo de Desarrollo del Proyecto Canaima"`
    * `AUTHOR_EMAIL`:
        * Funcionalidad: Indica el correo de contacto del autor o grupo de autores.
        * Ejemplo: `AUTHOR_EMAIL="desarrolladores@canaima.softwarelibre.gob.ve"`
    * `AUTHOR_URL`:
        * Funcionalidad: Indica una página web del autor o grupo de autores.
        * Ejemplo: `AUTHOR_URL="http://canaima.softwarelibre.gob.ve/"`
    * `META_DISTRO`:
        * Funcionalidad: Nombre de la Metadistribución en la que se basa el sabor. Las Metadistribuciones soportadas son Canaima, Debian y Ubuntu.
        * Ejemplo: `META_DISTRO="canaima"`
    * `META_CODENAME`:
        * Funcionalidad: Nombre código de la versión de la Metadistribución en la que se basa el sabor.
        * Ejemplo: `META_CODENAME="auyantepui"`
    * `META_REPO`:
        * Funcionalidad: Indica el repositorio que utilizará para obtener los paquetes provenientes de la Metadistribución. Puede ser una dirección que apunte a un mirror o una dirección local (`file://`). Debe contener la versión apuntada en la variable `META_CODENAME`.
        * Ejemplo: `META_REPO="http://paquetes.canaima.softwarelibre.gob.ve/"`
    * `META_REPOSECTIONS`:
        * Funcionalidad: Indica las secciones del repositorio de la Medistribución que serán incluídas en el sabor.
        * Ejemplo: `META_REPOSECTIONS="main aportes no-libres"`
    * `OS_LOCALE`:
        * Funcionalidad: Indica el lenguaje en que será construída la imagen ISO. Debe ser un código de lenguaje
        * Ejemplo: `OS_LOCALE="es_VE.UTF-8"`
    * `OS_PACKAGES`:
        * Funcionalidad:
        * Ejemplo: `OS_PACKAGES="canaima-base canaima-escritorio-base canaima-escritorio-gnome"`
    * `OS_EXTRAREPOS`:
        * Funcionalidad:
        * Ejemplo: `OS_EXTRAREPOS="profile"`
    * `OS_INCLUDES`:
        * Funcionalidad:
        * Ejemplo: `OS_INCLUDES="profile"`
    * `OS_HOOKS`:
        * Funcionalidad:
        * Ejemplo: `OS_HOOKS="profile"`
    * `IMG_SYSLINUX_SPLASH`:
        * Funcionalidad:
        * Ejemplo: `IMG_SYSLINUX_SPLASH="profile"`
    * `IMG_POOL_PACKAGES`:
        * Funcionalidad:
        * Ejemplo: `IMG_POOL_PACKAGES="burg"`
    * `IMG_INCLUDES`:
        * Funcionalidad:
        * Ejemplo: `IMG_INCLUDES="profile"`
    * `IMG_HOOKS`:
        * Funcionalidad:
        * Ejemplo: `IMG_HOOKS="profile"`
    * `IMG_DEBIAN_INSTALLER`:
        * Funcionalidad:
        * Ejemplo: `IMG_DEBIAN_INSTALLER="true"`
    * `IMG_DEBIAN_INSTALLER_BANNER`:
        * Funcionalidad:
        * Ejemplo: `IMG_DEBIAN_INSTALLER_BANNER="profile"`
    * `IMG_DEBIAN_INSTALLER_PRESEED`:
        * Funcionalidad:
        * Ejemplo: `IMG_DEBIAN_INSTALLER_PRESEED="profile"`
    * `IMG_DEBIAN_INSTALLER_GTK`:
        * Funcionalidad:
        * Ejemplo: `IMG_DEBIAN_INSTALLER_GTK="profile"`
2. (_Opcional_) Una imagen PNG llamada "syslinux.png" de una dimensión no mayor a 1024x768 pixeles, la cuál servirá de fondo en el menú de inicio del Medio Vivo.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/wp-content/uploads/2011/03/syslinux-canaima-semilla.png" data-figure-href="http://huntingbears.com.ve/wp-content/uploads/2011/03/syslinux-canaima-semilla.png"></span>

3. (_Opcional_) Una imagen PNG llamada "banner-instalador.png" de una dimensión exacta de 800x75 pixeles, la cuál será el banner del dialogo del instalador del Medio Vivo.

<span class="figure figure-100" data-figure-src="http://huntingbears.com.ve/wp-content/uploads/2011/03/instalador-canaima-semilla-645x483.png" data-figure-href="http://huntingbears.com.ve/wp-content/uploads/2011/03/instalador-canaima-semilla-645x483.png"></span>

4. (_Opcional_) Un archivo de configuración GTKRC llamado "gtkrc-instalador", el cuál albergará los parámetros GTK para modificar la apariencia del instalador. Ver el sabor de ejemplo.

5. (_Opcional_) Un par de archivos para definir repositorios extra en la etapa de instalación de paquetes finales (BINARY):




  * Uno de extensión \*.binary (pudiendo tener cualquier nombre), que contenga una lista de repositorios extra necesarios para la instalación de paquetes no incluídos en MIRROR_DEBIAN y especificados en SABOR_PAQUETES.


Ejemplo: canaima.binary


    deb http://repositorio.canaima.softwarelibre.gob.ve/ pruebas usuarios
    deb http://seguridad.canaima.softwarelibre.gob.ve/ seguridad usuarios






  * Otro de extensión \*.binary.gpg, conteniendo la (o las) llave(s) GPG válida(s) correspondientes a los repositorios listados en el archivo \*.binary.


6. (_Opcional_) Un par de archivos para definir repositorios extra en la etapa de instalación del sistema base inicial (CHROOT):




  * Uno de extensión \*.chroot (pudiendo tener cualquier nombre), que contenga una lista de repositorios extra necesarios para la instalación de paquetes no incluídos en MIRROR_DEBIAN y especificados en SABOR_PAQUETES.


Ejemplo: canaima.chroot


    deb http://repositorio.canaima.softwarelibre.gob.ve/ pruebas usuarios
    deb http://seguridad.canaima.softwarelibre.gob.ve/ seguridad usuarios






  * Otro de extensión \*.chroot.gpg (con nombre igual al anterior), conteniendo la (o las) llave(s) GPG válida(s) correspondientes a los repositorios listados en el archivo \*.chroot.


7. (_Opcional_) Un archivo llamado "preseed-debconf.cfg" en donde se incluirán los parámetros debconf que se quieran modificar en el modo nVivo del medio instalable.

8. (_Opcional_) Un archivo llamado "preseed-instalador.cfg" en donde se incluirán los parámetros debconf a modificar en el instalador.

Se provee en la dirección de los perfiles (/usr/share/canaima-semilla/perfiles) un perfil de ejemplo, el cuál podrá ser utilizado como base para nuevos sabores. La ausencia de alguno de los archivos Opcionales causará que Canaima Semilla use los valores por defecto (Debian).

Los perfiles se definen en la carpeta "/usr/share/canaima-semilla/perfiles", para la cual debes tener permisos de superusuario si deseas editarla. La mejor forma de crear un nuevo sabor, es duplicar la carpeta de ejemplo y comenzar a editar sus archivos hasta obtener el resultado esperado.


Canaima Semilla puede crear imágenes instalables (ISO o IMG) basado en los perfiles de sabores existentes. Puede especificársele el tipo de Medio, la arquitectura a construir, y el sabor. Las imágenes resultantes del proceso de construcción se guardan en el directorio /usr/share/canaima-semilla/semillero/.

**USO**

c-s construir --medio="iso|usb" --arquitectura="i386|amd64" --sabor="institucional|popular|primera-base|sabor1|sabor2" [--ayuda]

**PARÁMETROS**

* `--medio`: Tipo de imagen que será generada. Coloca "iso" para una imagen ISO grabable en CD/DVD o "usb" para una imagen IMG grabable en dispositivos USB.
* `--arquitectura`: Arquitectura soportada por la imagen resultante. Canaima GNU/Linux soporta i386 y amd64.
* `--sabor`: Sabor Canaima contenido en la imagen instalable. Debe estar definida en el directorio de los perfiles para poder funcionar.
* `--ayuda`: Muestra la documentación para el ayudante.

Por ejemplo, para construir el sabor "popular", se utiliza la siguiente línea:

c-s construir --medio="iso" --arquitectura="i386" --sabor="popular"

### ¿Y cómo creo un Sabor Canaima?

Canaima Semilla facilita la creación de Sabores Canaima mediante el establecimiento de reglas o perfiles que definen los componentes que integran el sabor. Un perfil está compuesto de varios archivos con nombres específicos colocados dentro de una carpeta que lleve por nombre el nombre del sabor en minúsculas. La. La carpeta contendrá:


### Sugerencias

* Optimizar la estructura de paquetes del sabor a construir. Lo ideal es que los paquetes se encuentren organizados y agrupados en metapaquetes, de forma tal de que con incluir unos pocos paquetes en SABOR_PAQUETES, todo el árbol de dependencias sea incluído.
* No utilizar scripts de configuración. Toda configuración adcional que se desee realizar al medio vivo, debe ser incorporado en paquetes dentro de su respectivo postinst.
