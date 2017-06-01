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
