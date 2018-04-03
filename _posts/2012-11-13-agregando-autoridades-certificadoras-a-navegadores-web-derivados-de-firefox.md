---
author: martinezfaneyth
date: 2012-11-13 14:30:19-04:30
layout: post
slug: agregando-autoridades-certificadoras-a-navegadores-web-derivados-de-firefox
title: Agregando autoridades certificadoras a navegadores web derivados de Firefox
article_id: 2638
categories:
- Desarrollo
- Software Libre
- Tutoriales
tags:
- certificados
- firefox
- mozilla
image: /static/img/posts/2638/agregando-autoridades-certificadoras-a-navegadores-web-derivados-de-firefox__1.jpg
description: Este artículo explica como agregar autoridades certificadoras a navegadores web derivados de Firefox.
---

Una _Autoridad Certificadora Raíz_ (ACR) es una entidad de confianza, responsable de emitir y revocar los certificados digitales utilizados en la firma electrónica, para lo cual se emplea la criptografía de clave pública.

Todas las versiones de _Firefox_, _Iceweasel_ o _Cunaguaro_ vienen con un número determinado de ACR precargadas que pueden ser consultadas en sus preferencias (Menú > Editar > Preferencias > Avanzado > Cifrado > Ver certificados > Autoridades). Cada ACR pasa por un proceso de verificación riguroso de la Fundación Mozilla que permite comprobar la veracidad y confiabilidad de los datos proporcionados. Las ACR verificadas son recopiladas en una base de datos llamada NSS (Netscape Security) que se incluye dentro del código fuente de los navegadores. NSS no puede ser modificada luego de que ha sido compilada e incluida dentro del navegador y por esto resulta muy difícil alterar la lista predeterminada de ACR.

Sin embargo, agregar una ACR a un navegador derivado de Firefox deja de ser una tarea difícil una vez que se entienden todos los aspectos y términos involucrados. En este artículo pretendemos explicar como agregar un ACR de forma predeterminada para que cualquier navegador web basado en Firefox pueda reconocer las aplicaciones web cuyos certificados sean derivados de una ACR en partícular. Sin embargo, el procedimiento también puede ser replicado para agregar certificados individuales, provenientes de aplicaciones particulares (no es necesario que pertenezca a una ACR).

El procedimiento se realiza principalmente dentro del código fuente de **NSS**. Si utilizamos los paquetes que distribuye Debian, Canaima o Ubuntu para Iceweasel, Cunaguaro o Firefox, no es necesario compilar todo el navegador desde cero debido a que en las mencionadas distribuciones, **NSS** es una librería que viene en un paquete por separado. En pocas palabras, lo que haremos será modificar **NSS** a través de parches para reempaquetarlo.

### Preparando herramientas

Necesitaremos hacer algunos procedimientos previos antes de hacer la modificación como tal. Necesitarás el Certificado Raíz de la ACR en formato x509 PEM (ASCII), el cual puedes obtener directamente de la Autoridad Certificadora. Para este ejemplo utilizaremos el certificado de **PROCERT**, quien hace los certificados de **SUSCERTE**, una institución que se encarga de dictar las políticas en materia de seguridad informática para el estado venezolano.

Para obtener el certificado de **PROCERT**, lo podemos descargar usando un Terminal de Usuario (Menú > Aplicaciones > Accesorios > Terminal) con el siguiente comando (o simplemente copia el enlace y pégalo en el navegador):

{% highlight bash %}
wget http://acraiz.suscerte.gob.ve/sites/default/files/certificados/CERTIFICADO-RAIZ-SHA384.crt
{% endhighlight %}

**Tip:** Recuerda en cual carpeta descargaste el certificado con el comando `pwd`.

Necesitamos instalar `git` para generar el parche de modificación, `git-buildpackage` para empaquetar, `build-essential` para hacer las compilaciones y `quilt` para gestionar los parches. En una Terminal de Root (Menú > Aplicaciones > Accesorios > Terminal de Root) ejecuta el siguiente comando:

{% highlight bash %}
aptitude install git git-buildpackage build-essential quilt
{% endhighlight %}

### Descargando el código fuente de NSS

Seguidamente necesitarás el código fuente de **NSS** con algunos componentes de **NSPR**. Para ello insertarás una línea de repositorio fuente en tu archivo `/etc/apt/sources.list` utilizando tu editor de texto favorito (desde una Terminal de Root). Dependiendo de la distribución, la línea será:

Para Canaima, podemos utilizar nss de la versión 3.1 (auyantepui):

{% highlight bash %}
deb-src http://paquetes.canaima.softwarelibre.gob.ve/ auyantepui main aportes no-libres
{% endhighlight %}

Para Debian, podemos utilizar nss de la versión 6.0 (squeeze):

{% highlight bash %}
deb-src http://ftp.us.debian.org/debian squeeze main contrib non-free
{% endhighlight %}

Para Ubuntu, podemos utilizar nss de la versión 3.1 (auyantepui):

{% highlight bash %}
deb-src http://paquetes.canaima.softwarelibre.gob.ve/ auyantepui main aportes no-libres
{% endhighlight %}

Para la fecha de escritura de este artículo, las versiones indicadas para Canaima, Debian y Ubuntu correspondían a las versiones estables. Puede que no sean las versiones ni las distribuciones que utilizas, así que revisa bien antes. Lo importante es que tengas una línea de repositorio fuente correspondiente a la versión y distribución que utilizas.

Si tienes otras líneas de repositorios externos, coméntalas poniéndoles un # al principio de la línea para evitar descargar versiones inapropiadas. Si no estás seguro, coméntalas todas y deja sólo la linea que te indicamos mas arriba.

Luego actualizamos los repositorios desde un Terminal de Root con el siguiente comando:

{% highlight bash %}
aptitude update
{% endhighlight %}

Y descargamos el código con el siguiente comando desde una Terminal de Usuario:

{% highlight bash %}
apt-get source nss nspr
{% endhighlight %}

Se descargará automáticamente la versión apropiada de NSS y NSPR según tu distribución. Por ejemplo, para Canaima Popular 3.1, el resultado es el siguiente:

{% highlight bash %}
ls
nspr-4.8.8 nss-3.12.11
{% endhighlight %}

Accederemos a la carpeta del código fuente de NSS para desaplicar los parches que fueron aplicados automáticamente al final de la descarga:

{% highlight bash %}
cd nss-3.12.11
export QUILT_PATCHES=debian/patches
quilt pop -a
{% endhighlight %}

### Compilando la herramienta addbuiltin

Antes de compilar `addbuiltin`, versionaremos el código con git para facilitarnos un poco el proceso en los pasos posteriores. Accederemos a la carpeta de NSS recién creada y ejecutamos los siguientes comandos (en una Terminal de Usuario):

{% highlight bash %}
git init
git add .
git commit -a -m "Versión original del código fuente."
{% endhighlight %}

Esto nos permitirá devolvernos al estado inicial luego de que hayamos hecho las modificaciones correspondientes. Si deseas aprender más de git, puedes ampliar la información [acá]({{ site.url }}/guia-basica-de-desarrollo-con-git.html).

Bien, necesitaremos hacer un enlace simbólico al código fuente de NSPR dentro de la carpeta mozilla para que NSS pueda acceder a ciertos componentes durante la compilación. Lo hacemos así:

{% highlight bash %}
cd mozilla
ln -s ../../nspr-4.8.8/mozilla/nsprpub/ .
{% endhighlight %}

Luego accedemos a la carpeta que contiene el código de NSS y compilamos. Si nuestra arquitectura es i386, los comandos para compilar son los siguientes:

{% highlight bash %}
cd security/nss/
make nss_build_all BUILD_OPT=1
cd cmd/addbuiltin/
make BUILD_OPT=1
{% endhighlight %}

Si nuestra arquitectura es amd64, los comandos son los siguientes:

{% highlight bash %}
cd security/nss/
make nss_build_all BUILD_OPT=1 USE_64=1
cd cmd/addbuiltin/
make BUILD_OPT=1 USE_64=1
{% endhighlight %}

Esto generará el binario `addbuiltin` dentro de la carpeta `Linux3.2_x86_glibc_PTH_OPT.OBJ`, la cual tendrá un nombre diferente dependiendo de la arquitectura y el Kernel que estés ejecutando en ese momento. Para el ejemplo se muestra un Kernel 3.2 i386, pero si estás corriendo un Kernel 2.6 amd64, entonces el nombre será `Linux2.6_x86_64_glibc_PTH_64_OPT.OBJ` y así con el resto de los casos. Finalmente, en un Terminal de Root procedemos a copiar el binario de `addbuiltin` a la carpeta `/usr/bin/` para hacerlo disponible como comando de consola.

{% highlight bash %}
cp Linux3.2_x86_glibc_PTH_OPT.OBJ/addbuiltin /usr/bin/
{% endhighlight %}

### Convirtiendo el certificado con addbuiltin

Desde una Terminal de Usuario, accede a la carpeta donde descargaste el certificado de la ACR. Seguidamente convertiremos el certificado de formato PEM a formato DER con el siguiente comando:

{% highlight bash %}
cd /ruta/al/certificado/
openssl x509 -inform PEM -outform DER -in CERTIFICADO-RAIZ-SHA384.crt -out CERTIFICADO-RAIZ-SHA384.der
{% endhighlight %}

Luego obtendremos el nombre oficial de la ACR con el siguiente comando:

{% highlight bash %}
openssl x509 -inform PEM -text -in CERTIFICADO-RAIZ-SHA384.crt | grep "Subject"
{% endhighlight %}

Lo que arroja:

{% highlight text %}
Subject: emailAddress=contacto@procert.net.ve, L=Chacao, ST=Miranda, OU=Proveedor de Certificados PROCERT, O=Sistema Nacional de Certificacion Electronica, C=VE, CN=PSCProcert
{% endhighlight %}

Siendo el nombre el valor del campo "O" (Organization) o el "CN" (Common Name). En este caso, "Proveedor de Certificados PROCERT".

Finalmente podemos procesar el certificado para que NSS lo entienda con `addbuiltin`, indicando el nombre de la ACR de la siguiente manera:

{% highlight bash %}
cat CERTIFICADO-RAIZ-SHA384.der | addbuiltin -n "Proveedor de Certificados PROCERT" -t "C,C,C" > CERTIFICADO-RAIZ-SHA384.nss
{% endhighlight %}

### Parcheando y reempaquetando NSS

Ahora que finalmente tenemos los datos del certificado de la ACR en el archivo `CERTIFICADO-RAIZ-SHA384.nss`, entonces vamos a hacer el paquete con las modificaciones. Necesitamos limpiar todos los residuos de compilación y volver al estado original del código. Asegúrate de respaldar el archivo `CERTIFICADO-RAIZ-SHA384.nss` en un lugar seguro (fuera de la carpeta del código fuente de nss), porque lo que haremos a continuación borrará todo lo que hemos hecho hasta ahora. Ejecutamos los siguientes comandos desde la carpeta de NSS (desde una Terminal de Usuario):

{% highlight bash %}
git reset --hard
git clean -fd
{% endhighlight %}

Seguidamente debemos decirle a `git-buildpackage` el número de la última versión-revisión del paquete que aparece en el archivo `debian/changelog` mediante un tag (etiqueta). Para ello debemos ejecutar el siguiente comando:

{% highlight bash %}
dpkg-parsechangelog | grep "Version:" | awk '{print $2}'
{% endhighlight %}

Lo que en nuestro caso arroja:

{% highlight bash %}
3.12.11-4
{% endhighlight %}

Luego hacemos el tag así:

{% highlight bash %}
git tag debian/3.12.11-4
{% endhighlight %}

Bien, ahora debemos agregar el contenido del archivo `CERTIFICADO-RAIZ-SHA384.nss` al final del archivo `mozilla/security/nss/lib/ckfw/builtins/certdata.txt`, lo cual podemos hacer manualmente (CTRL-C + CTRL-V) o automáticamente con el siguiente comando:

{% highlight bash %}
cat /ruta/al/archivo/CERTIFICADO-RAIZ-SHA384.nss >> mozilla/security/nss/lib/ckfw/builtins/certdata.txt
{% endhighlight %}

Luego accedemos al directorio donde se encuentra el archivo certdata.txt y lo procesamos así:

{% highlight bash %}
cd mozilla/security/nss/lib/ckfw/builtins/
make generate
{% endhighlight %}

¡Listo! Las modificaciones necesarias están hechas para que al reempaquetar NSS, esté incluído el certificado de tu ACR. El próximo paso es realizar un parche de estas modificaciones para evitar ser intrusivos en el código original. Para ello ejecutaremos los siguientes comandos:

{% highlight bash %}
cd ../../../../../..
mkdir -p debian/patches
git diff > ../99_ACR-certificates.patch
git reset --hard
git clean -fd
mv ../99_ACR-certificates.patch debian/patches/
echo "99_ACR-certificates.patch" >> debian/patches/series
{% endhighlight %}

Luego, aplicamos y desaplicamos los parches para comprobar que no hay ningún problema:

{% highlight bash %}
export QUILT_PATCHES=debian/patches
quilt push -af
quilt refresh
rm -rf mozilla/security/nss/lib/ckfw/builtins/certdata.c.rej
quilt pop -a
{% endhighlight %}

Y reempaquetamos:

{% highlight bash %}
git add .
git commit -a -m "Agregando parche para el certificado ACR de SUSCERTE"
git-buildpackage -us -uc
{% endhighlight %}

Lo cual generará nuestros paquetes .deb que contienen los nuevos certificados. Es posible que en Canaima necesites instalar debhelper desde el repositorio de backports, ya que es una dependencia de construcción. Puedes descargarte el paquete [desde aquí](http://packages.debian.org/squeeze-backports/all/debhelper) y luego instalarlo con el siguiente comando (desde una Terminal de Root):

{% highlight bash %}
dpkg -i /ruta/al/paquete/.deb
{% endhighlight %}

Espero les sea de utilidad.
