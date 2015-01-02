---
author: martinezfaneyth
language: es
date: 2010-12-31 05:49:57-04:30
layout: post
slug: el-famoso-script-de-lennart-poettering-mejorado-en-hunting-bears
title: El famoso script de Lennart Poettering, mejorado en Hunting Bears
wordpress_id: 586
categories:
- Desarrollo
- Software Libre
tags:
- 200 lineas
- lennart script
- rendimiento
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/586/3b1e58941a008647bede01ade386a732.jpg
description: El script de Lennart Poettering permite mejorar el rendimiento del equipo.
---

Recientemente, Mike Galbraith hizo público en las listas de desarrolladores para el Kernel Linux, [una mejora](http://marc.info/?l=linux-kernel&m=128978361700898&w=2) a la forma en que se generan los grupos de tareas, aumentando significativamente el rendimiento del sistema al momento de realizar procesamientos paralelos. Tal mejora fué puesta a prueba inmediatamente por Linus Torvalds y recibió comentarios [muy positivos](http://marc.info/?l=linux-kernel&m=128979084506774&w=2).

Unos días más tarde y en la misma discusión a través de las listas, [Lennart Poettering](http://en.wikipedia.org/wiki/Lennart_Poettering) (desarrollador de RedHat) publicó una [alternativa](http://marc.info/?l=linux-kernel&m=128993140308849&w=2) a esa mejora, alegando que el parche de Mike estaba mal orientado: tal modificación debía hacerse a nivel de usuario y no a nivel de Kernel. Es así como la principal diferencia entre el parche de Mike y la implementación de Lennart, radica en el objetivo: el primero se aplica al kernel y el segundo al espacio de usuario (userspace). Lo que nos sugiere que, aunque actúan bajo el mismo principio (la agrupación de tareas), sus campos de acción son totalmente diferentes; significando esto la posibilidad de que ambas propuestas puedan coexistir, aumentando aún más el rendimiento del sistema. Por otra parte, es útil mencionar que el parche del kernel implica la alteración de ~200 líneas de código, mientras la otra no más de ~20.

En ese sentido, me dediqué a estudiar el contenido del [script publicado en Ubuntu Life](http://ubuntulife.wordpress.com/2010/11/22/el-parche-milagro-de-linux-ahora-con-script-de-instalacion/), que automatiza la aplicación de la propuesta de Lennart. En la primera inspección pude darme cuenta de un error fatal: el script sólo se activa para el usuario root; el usuario común no podrá aprovecharlo. El error anterior implica otro: el script no se aplica recursivamente a todos los usuarios de sistema. El script tampoco reestablece los permisos al usuario sobre el archivo .bashrc, por lo que nunca se ejecuta. Por último y no menos importante, el script no está muy documentado que digamos (cosa indispensable para promover el software libre y la libertad del conocimiento).

A continuación presento el script mejorado y disponible para su descarga. Puedes copiarlo y guardarlo en un archivo de texto o descargarlo directamente del link que está más abajo.

<!-- more -->

{% highlight bash %}
#!/bin/bash -e
#
# ==============================================================================
# SCRIPT: huntingbears-cgroups.sh
# DESCRIPCIÓN: Aplica el script de Lennart Poettering para aumentar el
#      rendimiento en sistemas basados en debian.
# COPYRIGHT:
#  (C) 2010 Luis Alejandro Martínez Faneyth <martinez.faneyth@gmail.com>
# LICENCIA: GPL3
# ==============================================================================
#
# Este programa es software libre. Puede redistribuirlo y/o modificarlo bajo los
# términos de la Licencia Pública General de GNU (versión 3).

VERDE="e[1;32m"
ROJO="e[0;31m"
FIN="e[0m"

case ${1} in

instalar)

echo -e ${VERDE}"===== Parcheando el sistema con el script de Lennart Poettering ====="${FIN}

# Para cada usuario en /home/ ...
for usuario in /home/*? ;
do

# Obtenemos sólo el nombre del usuario
usuario_min=$(basename ${usuario})

# Y en caso de que el usuario sea un usuario activo (existente en /etc/shadow) ...
case $(grep ${usuario_min} /etc/shadow) in

'')
# No hace nada si no se encuentra en /etc/shadow
;;

*)

# Especificamos cuál es el archivo .bashrc
BASHRC_F="/home/${usuario_min}/.bashrc"

# Si la línea "/dev/cgroup/cpu/user" no se encuentra en el archivo .bashrc,
# quiere decir que el script no ha sido implementado en éste sistema
if [ $( cat ${BASHRC_F} | grep "/dev/cgroup/cpu/user" | wc -l ) == "0" ];
then

# Respaldamos el archivo .bashrc anterior en .bashrc.respaldo
echo "Respaldando ${BASHRC_F} en ${BASHRC_F}.respaldo"
[ ! -e ${BASHRC_F}.respaldo ] && cp ${BASHRC_F} ${BASHRC_F}.respaldo

echo "Parcheando ${BASHRC_F}"

# Éste bloque de código se agrega al archivo .bashrc y es parte de lo propuesto por
# Lennart Poettering.
echo "if [ "$PS1" ] ; then" >> ${BASHRC_F}
echo "mkdir -p -m 0700 /dev/cgroup/cpu/user/$$ > /dev/null 2>&1" >> ${BASHRC_F}
echo "echo $$ > /dev/cgroup/cpu/user/$$/tasks" >> ${BASHRC_F}
echo "echo "1" > /dev/cgroup/cpu/user/$$/notify_on_release" >> ${BASHRC_F}
echo "fi" >> ${BASHRC_F}

chown ${usuario_min}:${usuario_min} ${BASHRC_F}

else

# Si la línea "/dev/cgroup/cpu/user" se encuentra presente en el archivo
# .bashrc quiere decir que ya se aplicó el script. Se ignora.
echo -e ${ROJO}"Parece que ya aplicaste el patch a ${BASHRC_F} con anterioridad. Ignorando."${FIN}

fi

;;

esac

done

# Especificando donde está el archivo rc.local
RCLOCAL_F="/etc/rc.local"

# Si la línea "/dev/cgroup/cpu/release_agent" no se encuentra en el archivo rc.local,
# quiere decir que el script no ha sido implementado en éste sistema
if [ $( cat ${RCLOCAL_F} | grep "/dev/cgroup/cpu/release_agent" | wc -l ) == "0" ];
then

# Determinemos cuál es el número de línea del último comando "exit 0" dentro del archivo rc.local
INSERTAR=$( cat ${RCLOCAL_F} | grep -n "exit 0" | sort -nr | head -n 1 | awk -F: '{print $1}' )

# Respaldamos el archivo rc.local en rc.local.respaldo
echo "Respaldando ${RCLOCAL_F} en ${RCLOCAL_F}.respaldo"
[ ! -e ${RCLOCAL_F}.respaldo ] && cp ${RCLOCAL_F} ${RCLOCAL_F}.respaldo

echo "Parcheando ${RCLOCAL_F}"

# Insertamos éste bloque de código justo antes del último "exit 0" en un archivo temporal rc.local.nuevo
sed "${INSERTAR}imkdir -p /dev/cgroup/cpunmount -t cgroup cgroup /dev/cgroup/cpu -o cpunmkdir -m 0777 /dev/cgroup/cpu/usernecho "/usr/local/sbin/cgroup_clean" > /dev/cgroup/cpu/release_agent" /etc/rc.local >> "${RCLOCAL_F}.nuevo"

# Movemos el archivo temporal a su ubicación permanente
mv ${RCLOCAL_F}.nuevo ${RCLOCAL_F}

echo "Otorgando permisos de ejecución a ${RCLOCAL_F}"
chmod +x ${RCLOCAL_F}

else

# Si la línea "/dev/cgroup/cpu/release_agent" se encuentra presente en el archivo
# rc.local quiere decir que ya se aplicó el script. Se ignora.
echo -e ${ROJO}"Parece que ya aplicaste el patch a ${RCLOCAL_F} con anterioridad. Ignorando."${FIN}

fi

# Especificando donde está el archivo cgroup_clean
CGROUP_F="/usr/local/sbin/cgroup_clean"

echo "Creando ${CGROUP_F}"

# Insertamos el siguiente bloque de código en cgroup_clean
echo "#!/bin/sh" > ${CGROUP_F}
echo "if [ "$*" != "/user" ]; then" >> ${CGROUP_F}
echo "rmdir /dev/cgroup/cpu/$*" >> ${CGROUP_F}
echo "fi" >> ${CGROUP_F}

echo "Otorgando permisos de ejecución a ${CGROUP_F}"
chmod +x ${CGROUP_F}

;;

desinstalar)

echo -e ${VERDE}"===== Revirtiendo script de Lennart Poettering ====="${FIN}

# Para cada usuario en /home/ ...
for usuario in /home/*? ;
do

# Obtenemos sólo el nombre del usuario
usuario_min=$(basename ${usuario})

# Y en caso de que el usuario sea un usuario activo (existente en /etc/shadow) ...
case $(grep ${usuario_min} /etc/shadow) in

'')
# No hace nada si no se encuentra en /etc/shadow
;;

*)

BASHRC_F="/home/${usuario_min}/.bashrc"

# Si existe un archivo de respaldo, lo restauramos
[ -e ${BASHRC_F}.respaldo ] && mv ${BASHRC_F}.respaldo ${BASHRC_F}
;;

esac
done

RCLOCAL_F="/etc/rc.local"

# Si existe un archivo de respaldo, lo restauramos
[ -e ${RCLOCAL_F}.respaldo ] && mv ${RCLOCAL_F}.respaldo ${RCLOCAL_F}

CGROUP_F="/usr/local/sbin/cgroup_clean"

# Si existe el archivo /usr/local/sbin/cgroup_clean, lo borramos
[ -e ${CGROUP_F} ] && rm -rf ${CGROUP_F}

;;

*)

echo "huntingbears-cgroups.sh no reconoce el argumento '"${1}"'" >&2
exit 1

;;

esac

exit 0
{% endhighlight %}

[Descargar huntingbears-cgroups.sh](http://blog-luisalejandro.rhcloud.com/static/files/huntingbears-cgroups.sh)

Una vez descargado el script, ejecutar con permisos de superusuario (root) los siguientes comandos:

{% highlight bash %}
cd carpeta-donde-esta-el-script
chmod +x huntingbears-cgroups.sh
{% endhighlight %}

Para instalar:

{% highlight bash %}
./huntingbears-cgroups.sh instalar
{% endhighlight %}

Para desinstalar:

{% highlight bash %}
./huntingbears-cgroups.sh desinstalar
{% endhighlight %}

Cualquier pregunta que se les venga a la mente, no duden en hacerla por ésta vía.

¡Happy Hacking!
