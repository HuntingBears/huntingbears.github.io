---
author: martinezfaneyth
language: es
date: 2011-03-20 16:33:27-04:30
layout: post
slug: publicado-el-kernel-linux-2-6-38-con-el-parche-de-mike-galbraith-en-debian-sid
title: ¡Publicado el Kernel Linux 2.6.38 con el parche de Mike Galbraith en Debian Sid!
wordpress_id: 905
categories:
- Desarrollo
- Software Libre
tags:
- debian sid
- linux 2.6.38
- parche milagroso
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/905/61df5d9ed60c4421b3dbea9126bff8d6.jpg
description: Este nuevo kernel contiene varias mejoras de rendimiento.
---

Todo el mundo ha hablado del milagroso parche de Mike Galbraith en el mundo Linux. Incluso ha salido la alternativa (pero no equivalencia) en el userspace de [Lennart Poettering](http://huntingbears.com.ve/el-famoso-script-de-lennart-poettering-mejorado-en-hunting-bears.html).

El día de hoy, Debian GNU/Linux [ha incorporado](http://packages.qa.debian.org/l/linux-2.6/news/20110316T160359Z.html) en su rama experimental (Sid) el Kernel 2.6.38 con los impactantes beneficios del parche de Mike Galbraith, que ya fué [incorporado en el Upstream](http://git.kernel.org/?p=linux/kernel/git/torvalds/linux-2.6.git;a=commitdiff;h=5091faa449ee0b7d73bc296a93bca9540fc51d0a) por la gente del Kernel Team y adaptado por los mantenedores del [paquete linux-2.6](http://packages.debian.org/changelogs/pool/main/l/linux-2.6/current/changelog) en Debian. Otra interesante característica añadida a éste kernel es la remoción del [Big Kernel Lock](http://kernelnewbies.org/BigKernelLock), aumentando aún más el rendimiento del sistema en casos específicos.

### ¿Y cómo funciona eso del "agrupamiento por TTY"?

Bueno, para empezar... el nombre mediático que se le dió fué éste, **pero es erróneo**. Lo cierto del parche de Mike Galbraith es que [ya las tareas no se agrupan por TTY](http://lwn.net/Articles/418884/), y que se ha implementado un nuevo método que explico a continuación.

Está claro que lo más impactante de éste release es el llamado "Parche Milagroso", éste parche cambia sustancialmente la manera en que el Manejador de Procesos (el que determina el orden en que se van a ejecutar las tareas de sistema) asigna porcentajes de procesamiento de CPU a cada proceso. Con ésta mejora, el Manejador agrupará todos los procesos con la misma ID de Sesión para convertirlos en una misma entidad reconocible para el.

El ID de Sesión es una propiedad de los procesos en Sistemas UNIX que identifica cada "rama de procesos" dentro del árbol de procesos. Es decir, en UNIX existen procesos Líderes y procesos Hijos, todos los procesos hijos derivados de un proceso líder, comparten el mismo ID de Sesión.

<!-- more -->

Por ejemplo, listemos todos los procesos de sistema, listemos las columnas "ID de Sesión" (Procesos líderes), "ID de Proceso" (Procesos hijos) y el comando utilizado para iniciar el proceso; además, ordenemoslo por ID de Sesión:

{% highlight bash %}
ps -e --format session,pid,cmd --sort session
{% endhighlight %}

Obtendremos una salida variante, dependiendo de cada sistema, pero en el mío salió algo así (SESS=ID de Sesión; PID=ID de Proceso; CMD=Comando):

{% highlight text %}
 SESS   PID CMD
    0     2 [kthreadd]
    0     3 [ksoftirqd/0]
    0     6 [migration/0]
    0     7 [migration/1]
    0     9 [ksoftirqd/1]
    0    11 [cpuset]
    0    12 [khelper]
    0    13 [netns]
    0    14 [sync_supers]
    0    15 [bdi-default]
    0    16 [kintegrityd]
    0    17 [kblockd]
    0    18 [kacpid]
    0    19 [kacpi_notify]
    0    20 [kacpi_hotplug]
    0    21 [kseriod]
    0    22 [kworker/1:1]
    0    23 [kondemand]
    0    24 [khungtaskd]
    0    25 [kswapd0]
    0    26 [ksmd]
    0    27 [fsnotify_mark]
    0    28 [aio]
    0    29 [crypto]
    0   176 [khubd]
    0   177 [ata_sff]
    0   180 [scsi_eh_0]
    0   181 [scsi_eh_1]
    0   182 [scsi_eh_2]
    0   183 [scsi_eh_3]
    0   236 [jbd2/sda2-8]
    0   237 [ext4-dio-unwrit]
    0   505 [kpsmoused]
    0   527 [cfg80211]
    0   530 [hd-audio0]
    0   763 [xfs_mru_cache]
    0   764 [xfslogd]
    0   765 [xfsdatad]
    0   766 [xfsconvertd]
    0   767 [xfsbufd/sda3]
    0   768 [xfsaild/sda3]
    0   775 [xfssyncd/sda3]
    0  1112 [kconservative]
    0  1249 [flush-8:0]
    0  7081 [kauditd]
    0  8440 [kworker/0:0]
    0  8454 [kworker/1:2]
    0  8462 [kworker/u:0]
    0  8479 [kworker/u:2]
    0  8481 [kworker/0:1]
    0  8504 [kworker/u:1]
    1     1 init [2]
  322   322 udevd --daemon
  322   419 udevd --daemon
  322   420 udevd --daemon
  978  1001 /usr/sbin/rsyslogd -c4
 1056  1056 /usr/sbin/preload -s /var/lib/preload/preload.state
 1064  1064 /usr/sbin/lpd -s
 1073  1073 /usr/bin/dbus-daemon --system
 1073  1132 /usr/sbin/modem-manager
 1073  1160 /sbin/wpa_supplicant -u -s
 1073  1499 /usr/sbin/console-kit-daemon --no-daemon
 1073  1899 /usr/lib/policykit-1/polkitd
 1073  1901 /usr/lib/upower/upowerd
 1073  7470 /usr/lib/udisks/udisks-daemon
 1073  7471 udisks-daemon: not polling any devices
 1088  1088 /usr/sbin/cron
 1092  1092 /usr/sbin/sshd
 1116  1116 /usr/sbin/NetworkManager
 1116  1162 /sbin/dhclient -d -4 -sf /usr/lib/NetworkManager/nm-dhcp-client.action -pf /var/run/dhclient-eth0.pid -lf /var/lib
 1129  1129 /usr/sbin/cupsd -C /etc/cups/cupsd.conf
 1187  1189 /usr/sbin/gdm3
 1187  1194 /usr/lib/gdm3/gdm-simple-slave --display-id /org/gnome/DisplayManager/Display1
 1187  1902 /usr/lib/gdm3/gdm-session-worker
 1187  7079 /usr/bin/gnome-keyring-daemon --daemonize --login
 1213  1213 /usr/bin/Xorg :0 -br -verbose -audit 0 -novtswitch -auth /var/run/gdm3/auth-for-Debian-gdm-P3oV7M/database -nolist
 1245  1245 /sbin/getty 38400 tty1
 1246  1246 /sbin/getty 38400 tty2
 1786  1895 /usr/lib/policykit-1-gnome/polkit-gnome-authentication-agent-1
 7098  7098 x-session-manager
 7098  7446 /usr/bin/dbus-launch --exit-with-session x-session-manager
 7098  7451 gnome-power-manager
 7098  7464 /usr/bin/metacity
 7098  7466 gnome-panel
 7098  7477 nautilus
 7098  7485 bluetooth-applet
 7098  7486 python /usr/bin/system-config-printer-applet
 7098  7487 /usr/lib/policykit-1-gnome/polkit-gnome-authentication-agent-1
 7098  7489 nm-applet --sm-disable
 7098  7490 /usr/lib/evolution/2.30/evolution-alarm-notify
 7098  7491 /usr/lib/gnome-disk-utility/gdu-notification-daemon
 7098  7528 /usr/bin/python /usr/bin/turpial
 7098  7805 /usr/lib/cunaguaro/firefox-bin
 7098  7820 /bin/sh /usr/lib/guacharo/run-mozilla.sh /usr/lib/guacharo/guacharo-bin
 7098  7840 /usr/lib/guacharo/guacharo-bin
 7098  8157 /usr/lib/xulrunner-1.9.2/plugin-container /usr/lib/flashplugin-nonfree/libflashplayer.so 7805 plugin
 7098  8471 gnome-terminal
 7098  8472 gnome-pty-helper
 7443  7443 /usr/bin/ssh-agent /usr/bin/dbus-launch --exit-with-session x-session-manager
 7447  7447 /usr/bin/dbus-daemon --fork --print-pid 5 --print-address 7 --session
 7447  7450 /usr/lib/libgconf2-4/gconfd-2
 7447  7461 /usr/lib/gvfs/gvfsd
 7447  7468 /usr/lib/gvfs/gvfs-gdu-volume-monitor
 7447  7473 /usr/lib/gvfs/gvfs-afc-volume-monitor
 7447  7476 /usr/lib/gvfs/gvfs-gphoto2-volume-monitor
 7447  7506 /usr/lib/gvfs/gvfsd-trash --spawner :1.8 /org/gtk/gvfs/exec_spaw/0
 7447  7515 /usr/lib/gvfs/gvfsd-burn --spawner :1.8 /org/gtk/gvfs/exec_spaw/1
 7447  7526 /usr/lib/gvfs/gvfsd-metadata
 7447  8253 /usr/lib/gvfs/gvfsd-http --spawner :1.8 /org/gtk/gvfs/exec_spaw/2
 7459  7459 /usr/lib/gnome-settings-daemon/gnome-settings-daemon
 7479  7479 /usr/lib/bonobo-activation/bonobo-activation-server --ac-activate --ior-output-fd=18
 7479  7499 /usr/lib/gnome-applets/cpufreq-applet --oaf-activate-iid=OAFIID:GNOME_CPUFreqApplet_Factory --oaf-ior-fd=18
 7479  7501 /usr/lib/gnome-applets/mixer_applet2 --oaf-activate-iid=OAFIID:GNOME_MixerApplet_Factory --oaf-ior-fd=24
 7507  7507 gnome-screensaver
 8297  8297 [gnome-open]
 8473  8473 bash
 8473  8507 ps -e --format session,pid,cmd --sort session
{% endhighlight %}

Como ven, existen muchos procesos que comparten el mismo ID de sesión, y que con el kernel 2.6.38 ya no serán manejados como procesos independientes sino como procesos agrupados, mejorando aún más la latencia del sistema.

### ¿Cómo lo pongo en funcionamiento en mi pc?

Abre el archivo `/etc/apt/sources.list` con tu editor de textos preferido (con permisos de root) y modifícalo de forma tal que te asegures que sólo queden las fuentes binarias de Sid, listadas más abajo:

{% highlight bash %}
deb http://http.us.debian.org/debian sid main contrib non-free
{% endhighlight %}

Si estás en Venezuela, puedes usar el mirror Debian de Canaima GNU/Linux que es más rápido:

{% highlight bash %}
deb http://universo.canaima.softwarelibre.gob.ve/ sid main contrib non-free
{% endhighlight %}

Luego ejecuta los siguientes comandos:

{% highlight bash %}
aptitude update
aptitude install linux-image-2.6.38-1-686
{% endhighlight %}

Listo, con ésto quedará instalado.

Sin embargo, no hemos terminado. Revisando el [changelog del kernel](http://packages.debian.org/changelogs/pool/main/l/linux-2.6/current/changelog.html), me doy cuenta que el comportamiento no está activado por defecto debido a un [bug](http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=618486), hay que activarlo mediante la variable sysctl `kernel.sched_autogroup_enabled`. Para hacerlo sólo hay que agregar la siguiente línea al final del archivo `/etc/sysctl.conf` y reiniciar el sistema (ésto hay que hacerlo sólo una vez).

{% highlight bash %}
kernel.sched_autogroup_enabled=1
{% endhighlight %}

Recuerda reiniciar el sistema con el nuevo kernel para ver el agrupamiento por `SESSIONID` en acción.

Gracias a ésta nueva mejora, seguramente podrás ejecutar muchos más procesos simultáneamente sin experimentar un detrimento en el rendimiento del sistema... Te invito a que lo pruebes y me cuentes por acá como te fué!
