---
article_id: 4334
author: martinezfaneyth
categories: []
date: 2015-08-30 01:15:46-0430
description: ''
image: ''
layout: post
slug: documentando-el-script-de-fusion-de-repositorios-de-canaima-gnulinux
tags: []
title: Documentando el script de fusión de repositorios de Canaima GNU/Linux
---

#!/bin/sh

SOURCES="/srv/repositorios/debian /srv/repositorios/archivo"
BASE="/srv/repositorios/paquetes"

DISTFILE="${BASE}/conf/distributions"
UPDATESFILE="${BASE}/conf/updates"
DISTROSFILE="${BASE}/distributions"
DATE="$( date +%Y%m%d )"
TIME="$( date +%H%M%S )"
LOGDIR="/var/log/repositorios/paquetes/${DATE}"
LOGFILE="/var/log/repositorios/paquetes/${DATE}/${TIME}.log"
PYTHONLOGFILE="/var/log/repositorios/paquetes/pythonerror.log"
DISTS="$( cat ${DISTFILE} | grep "Codename:" | awk -F: '{print $2}' )"
UPDATES="$( cat ${UPDATESFILE} | grep "Name:" | awk '{print $2}' | grep -v "multimedia" | grep "-" )"
CMPNTS="$( cat ${UPDATESFILE} | grep "^Components:" | grep "contrib" | awk -F: '{print $2}' | head -1 )"
ERRORKEY="is already registered with different checksums"

if [ -e "${BASE}/db/lockfile" ]; then
    exit 1
fi

cd ${BASE}
mkdir -p "${LOGDIR}"
touch "${LOGFILE}"
rm -rf "${DISTROSFILE}"

echo "HORA: ${TIME} FECHA: ${DATE} " >> "${PYTHONLOGFILE}"
echo "-------------" >> "${PYTHONLOGFILE}"

for DIST in ${DISTS}; do
    echo "Haciendo fusion en ${DISTS} " >> "${PYTHONLOGFILE}"
    echo "${DIST} dists/${DIST}/Release" >> "${DISTROSFILE}"
    CONTINUE="TRUE"
    echo "Distribución: ${DIST}"
    if [ -d "${BASE}/dists/${DIST}" ]; then
        while [ "${CONTINUE}" = "TRUE" ]; do
            if reprepro --noskipold -VVV update ${DIST} 1>>"${LOGFILE}" 2>&1; then
                echo "SE DETUVO EJECUTANDO EL UPDATE DE REPREPRO PARA ${DIST} " >> "${PYTHONLOGFILE}"
                CONTINUE="FALSE"
            else
                BADCHECKSUMPKG="$( cat "${LOGFILE}" | grep "${ERRORKEY}" | awk -F'"' '{print $2}' | awk -F'/' '{print $4}' )"
                echo "ESTE PAQUETE GENERA ERRORES ${BADCHECKSUMPKG} " >> "${PYTHONLOGFILE}"
                if [ -n "${BADCHECKSUMPKG}" ]; then
                    for DISTRO in ${DISTS}; do
                        echo "VOY A ELIMINAR ESTE PAQUETE: ${BADCHECKSUMPKG} EN LA DISTRO:  ${DISTRO} ${DIST}" >> "${PYTHONLOGFILE}"
                        reprepro removesrc ${DISTRO} ${BADCHECKSUMPKG} 1>>"${LOGFILE}" 2>&1
                        reprepro remove ${DISTRO} ${BADCHECKSUMPKG} 1>>"${LOGFILE}" 2>&1
                    done
                else
                    CONTINUE="FALSE"
                fi
            fi
        done
    fi
    reprepro -VVV --delete createsymlinks 1>>"${LOGFILE}" 2>&1
done

echo "Exportando cambios ..."
reprepro -VVV export 1>>"${LOGFILE}" 2>&1
gzip "${LOGFILE}"

for UPDT in ${UPDATES}; do
    ORIGIN="$( echo ${UPDT} | awk -F- '{print $1}' )"
    DEST="$( echo ${UPDT} | awk -F- '{print $2}' )"
    ARCHS="$( ls -1 "${BASE}/dists/${DEST}/main/" | grep "binary-" | sed 's/binary-//g' )"
    for SRC in ${SOURCES}; do
        for ARCH in ${ARCHS}; do
            if [ -e "${SRC}/dists/${ORIGIN}/" ]; then
                for CMP in ${CMPNTS}; do
                    OCMP="$( echo ${CMP} | awk -F'>' '{print $1}' )"
                    DCMP="$( echo ${CMP} | awk -F'>' '{print $2}' )"
                    rm -rf "${BASE}/dists/${DEST}/${DCMP}/i18n"
                    ln -s "${SRC}/dists/${ORIGIN}/${OCMP}/i18n" "${BASE}/dists/${DEST}/${DCMP}/i18n"
                done
            fi
            if [ -e "${SRC}/dists/${ORIGIN}/main/installer-${ARCH}" ]; then
                rm -rf "${BASE}/dists/${DEST}/main/installer-${ARCH}"
                ln -s "${SRC}/dists/${ORIGIN}/main/installer-${ARCH}" "${BASE}/dists/${DEST}/main/installer-${ARCH}"
            fi

        done
    done
done

exit 0













Origin: Canaima
Codename: aponwao
Suite: soporte-largo-antiguo
Label: soporte-largo-antiguo
Version: 2.1
Description: Metadistribución Canaima GNU/Linux 2.1 (aponwao)
Architectures: source i386 amd64
Components: main aportes no-libres
Update: - lenny-aponwao aponwao
UDebComponents: main
DebIndices: Packages Release . .gz .bz2
DscIndices: Sources Release . .gz .bz2
Contents: . .gz .bz2 allcomponents
SignWith: paquetes@canaima.softwarelibre.gob.ve

Origin: Canaima
Codename: roraima
Suite: soporte-largo
Label: soporte-largo
Version: 3.0
Description: Metadistribución Canaima GNU/Linux 3.0 (roraima)
Architectures: source i386 amd64
Components: main aportes no-libres
Update: - squeeze-roraima multimedia-roraima roraima
UDebComponents: main
DebIndices: Packages Release . .gz .bz2
DscIndices: Sources Release . .gz .bz2
Contents: . .gz .bz2 allcomponents
SignWith: paquetes@canaima.softwarelibre.gob.ve

Origin: Canaima
Codename: auyantepui
Suite: antiguo
Label: antiguo
Version: 3.1
Description: Metadistribución Canaima GNU/Linux 3.1 (auyantepui)
Architectures: source i386 amd64
Components: main aportes no-libres
Update: - squeeze-auyantepui multimedia-auyantepui auyantepui
UDebComponents: main
DebIndices: Packages Release . .gz .bz2
DscIndices: Sources Release . .gz .bz2
Contents: . .gz .bz2 allcomponents
SignWith: paquetes@canaima.softwarelibre.gob.ve

Origin: Canaima
Codename: kerepakupai
Suite: estable
Label: estable
Version: 4.0
Description: Metadistribución Canaima GNU/Linux 4.0 (kerepakupai)
Architectures: source i386 amd64
Components: main aportes no-libres
Update: - wheezy-kerepakupai multimedia-kerepakupai kerepakupai
UDebComponents: main
DebIndices: Packages Release . .gz .bz2
DscIndices: Sources Release . .gz .bz2
Contents: . .gz .bz2 allcomponents
SignWith: paquetes@canaima.softwarelibre.gob.ve

Origin: Canaima
Codename: kukenan
Suite: pruebas
Label: pruebas
Version: 4.1
Description: Metadistribución Canaima GNU/Linux 4.1 (kukenan)
Architectures: source i386 amd64
Components: main aportes no-libres
Update: - wheezy-kukenan multimedia-kukenan kukenan
UDebComponents: main
DebIndices: Packages Release . .gz .bz2
DscIndices: Sources Release . .gz .bz2
Contents: . .gz .bz2 allcomponents
SignWith: paquetes@canaima.softwarelibre.gob.ve



















Name: aponwao
Method: file:///srv/repositorios/canaima
Suite: aponwao
Architectures: source i386 amd64
Components: usuarios>main aportes>aportes no-libres>no-libres
FilterList: install excludes/canaima
VerifyRelease: blindtrust
UDebComponents:

Name: lenny-aponwao
Method: file:///srv/repositorios/archivo
Suite: lenny
Architectures: source i386 amd64
Components: main>main contrib>no-libres non-free>no-libres
FilterList: install excludes/debian
VerifyRelease: blindtrust

Name: roraima
Method: file:///srv/repositorios/canaima
Suite: roraima
Architectures: source i386 amd64
Components: usuarios>main aportes>aportes no-libres>no-libres
FilterList: install excludes/canaima
VerifyRelease: blindtrust
UDebComponents:

Name: squeeze-roraima
Method: file:///srv/repositorios/debian
Suite: squeeze
Architectures: source i386 amd64
Components: main>main contrib>no-libres non-free>no-libres
FilterList: install excludes/debian
VerifyRelease: blindtrust

Name: multimedia-roraima
Method: file:///srv/repositorios/multimedia
Suite: squeeze
Architectures: source i386 amd64
Components: main>aportes non-free>no-libres
FilterList: install excludes/multimedia
VerifyRelease: blindtrust
UDebComponents:

Name: auyantepui
Method: file:///srv/repositorios/canaima
Suite: auyantepui
Architectures: source i386 amd64
Components: usuarios>main aportes>aportes no-libres>no-libres
FilterList: install excludes/canaima
VerifyRelease: blindtrust
UDebComponents:

Name: squeeze-auyantepui
Method: file:///srv/repositorios/debian
Suite: squeeze
Architectures: source i386 amd64
Components: main>main contrib>no-libres non-free>no-libres
FilterList: install excludes/debian
VerifyRelease: blindtrust

Name: multimedia-auyantepui
Method: file:///srv/repositorios/multimedia
Suite: squeeze
Architectures: source i386 amd64
Components: main>aportes non-free>no-libres
FilterList: install excludes/multimedia
VerifyRelease: blindtrust
UDebComponents:

Name: kerepakupai
Method: file:///srv/repositorios/canaima
Suite: kerepakupai
Architectures: source i386 amd64
Components: usuarios>main aportes>aportes no-libres>no-libres
FilterList: install excludes/canaima
VerifyRelease: blindtrust
UDebComponents:

Name: wheezy-kerepakupai
Method: file:///srv/repositorios/debian
Suite: wheezy
Architectures: source i386 amd64
Components: main>main contrib>no-libres non-free>no-libres
FilterList: install excludes/debian
VerifyRelease: blindtrust

Name: multimedia-kerepakupai
Method: file:///srv/repositorios/multimedia
Suite: wheezy
Architectures: source i386 amd64
Components: main>aportes non-free>no-libres
FilterList: install excludes/multimedia
VerifyRelease: blindtrust
UDebComponents:

Name: kukenan
Method: file:///srv/repositorios/canaima
Suite: kukenan
Architectures: source i386 amd64
Components: usuarios>main aportes>aportes no-libres>no-libres
FilterList: install excludes/canaima
VerifyRelease: blindtrust
UDebComponents:

Name: wheezy-kukenan
Method: file:///srv/repositorios/debian
Suite: wheezy
Architectures: source i386 amd64
Components: main>main contrib>no-libres non-free>no-libres
FilterList: install excludes/debian
VerifyRelease: blindtrust

Name: multimedia-kukenan
Method: file:///srv/repositorios/multimedia
Suite: wheezy
Architectures: source i386 amd64
Components: main>aportes non-free>no-libres
FilterList: install excludes/multimedia
VerifyRelease: blindtrust
UDebComponents:
















#
# Proyecto Canaima GNU/Linux                  Descripción de archivo de sistema
#
# Nombre    distributions
# Ubicación /srv/www/repositorios/canaima/conf/distributions
# Descripción   Definición de repositorios de Canaima
# Criticidad    Alta
#
# Fecha     Usuario     Descripción
# ============  ==============  ===============================================
# 21/11/2008    jparrella       versión inicial
# 17/10/2008    cmarrero    -desarrollo -pruebas +estable -->Actualizar en limpio 2.0.4
# 01/04/2009    guerrerocarlos  - futuro + consolidacion
# 04/10/2010    daguilera   Rediseño del repositorio
# 08/02/2011    daguilera       Creación de Repositorio Antiguo

#
# Repositorio Soporte Largo Antiguo
#

Origin: Canaima
Label: Canaima
Suite: soporte-largo-antiguo
Codename: aponwao
Version: 2.1
Architectures: i386 amd64 source
Components: usuarios aportes no-libres
Description: Canaima GNU/Linux
SignWith: repositorios@canaima.softwarelibre.gob.ve
DebIndices: Packages Release . .gz .bz2
DscIndices: Sources Release . .gz .bz2
Log: /var/log/repositorios/canaima.log

#
# Repositorio Soporte Largo
#

Origin: Canaima
Label: Canaima
Suite: soporte-largo
Codename: roraima
Version: 3.0
Architectures: i386 amd64 source
Components: usuarios aportes no-libres
Description: Canaima GNU/Linux
SignWith: repositorios@canaima.softwarelibre.gob.ve
DebIndices: Packages Release . .gz .bz2
DscIndices: Sources Release . .gz .bz2
Log: /var/log/repositorios/canaima.log


#
# Repositorio Antiguo
#

Origin: Canaima
Label: Canaima
Suite: antiguo
Codename: auyantepui
Version: 3.1
Architectures: i386 amd64 source
Components: usuarios aportes no-libres
Description: Canaima GNU/Linux
SignWith: repositorios@canaima.softwarelibre.gob.ve
DebIndices: Packages Release . .gz .bz2
DscIndices: Sources Release . .gz .bz2
Log: /var/log/repositorios/canaima.log

#
# Repositorio Estable
#

Origin: Canaima
Label: Canaima
Suite: estable
Codename: kerepakupai
Version: 4.0
Architectures: i386 amd64 source
Components: usuarios aportes no-libres
description: Canaima GNU/Linux
SignWith: repositorios@canaima.softwarelibre.gob.ve
DebIndices: Packages Release . .gz .bz2
DscIndices: Sources Release . .gz .bz2
Log: /var/log/repositorios/canaima.log

#
# Repositorio Desarrollo
#

Origin: Canaima
Label: Canaima
Suite: pruebas
Codename: kukenan
Version: 4.1
Architectures: i386 amd64 source
Components: usuarios aportes no-libres
description: Canaima GNU/Linux
SignWith: repositorios@canaima.softwarelibre.gob.ve
DebIndices: Packages Release . .gz .bz2
DscIndices: Sources Release . .gz .bz2
Log: /var/log/repositorios/canaima.log


