---
author: martinezfaneyth
date: 2012-10-22 16:28:46-04:30
layout: post
slug: operaciones-de-lectura-y-escritura-de-particiones-con-python-parted
title: Operaciones de lectura y escritura de particiones con python-parted
article_id: 2727
categories:
- Desarrollo
- Estudios
- Software Libre
tags:
- parted
- pyparted
- python
image: http://huntingbears.com.ve/static/img/posts/2727/operaciones-de-lectura-y-escritura-de-particiones-con-python-parted__1.jpg
description: Parted es una librería que permite editar las particiones de un disco. Aquí te enseñamos como hacerlo en python.
---

Durante varias sesiones de mejoras para el instalador de Canaima Popular 3.1, me tocó investigar bastante acerca del manejo de dispositivos, discos y particiones en los sistemas operativos GNU/Linux. Tuve la suerte de toparme con las conexiones de Python para Parted (_python-parted_ o _pyparted_), el cual es utilizado en varios instaladores reconocidos.

Hoy estaré desarrollando el tema de operaciones básicas de lectura y escritura de particiones con python-parted, en donde se profundizará en algunos aspectos teóricos que serán útiles para entender los casos de uso que se presentarán.

Una de las principales limitaciones que encontré fue la documentación, ya que simplemente no existe. Mi mayor guía durante el uso de python-parted fueron los comentarios dentro del código de la librería y unas cuantas pruebas de ensayo-error. Espero que con este artículo pueda contribuir a la mejora de la documentación existente acerca de python-parted.

### Instalación de herramientas

Si estás en Canaima, Debian o Ubuntu, puedes instalar las herramientas que necesitaremos con el siguiente comando en una Terminal de Root (Menú > Aplicaciones > Accesorios > Terminal de Root):

{% highlight bash %}
aptitude install python-parted reiserfsprogs btrfs-tools e2fsprogs dosfstools mtools hfsutils hfsprogs jfsutils util-linux ntfsprogs reiser4progs xfsprogs fatresize
{% endhighlight %}

Dentro de estas herramientas (además de python-parted) se encuentran varias aplicaciones que proveen soporte para las operaciones con diversos sistemas de archivos (fat16, ntfs, ext4, xfs, entre otros).

### Conceptos básicos

Empecemos por decir que python-parted está conformado por una serie de módulos que proveen una interfaz con Parted. Parted es un programa que permite crear, redimensionar, mover, copiar y remover particiones en disco.

Pyparted está dividido en varias clases que proporcionan vías de aplicación directa con determinados aspectos relacionados con una partición en disco. Es decir, según pyparted:

* Existe una unidad fundamental que es el **Dispositivo**, representado por la clase `Device`. Esta clase provee acceso a funcionalidades de bajo nivel relacionadas con todos los dispositivos de almacenamiento físico.
* Un tipo de dispositivo es el **Disco**, representado por la clase `Disk`. A través de un disco se pueden modificar las particiones, así como obtener otro tipo de información relacionada con la geometría, tipo de partición y tipo de sistema de archivos.
* Las particiones están representadas por la clase `Partition`. Cada partición tiene asociada una geometría (clase `Geometry`), una condición (clase `Constraint`) y un tipo de sistema de archivos (clase `FileSystem`), los cuales permiten describir los detalles relacionados con una partición.
Bien, entendida la teoría, vamos a mostrar algunos casos de uso. Utilizaremos una consola python en modo de superusuario para las prácticas. Para ello abrimos una Terminal de Root y ejecutamos el comando `python`. Es importante prestar atención a la notación utilizada en los comandos presentados ya que algunas veces se presentarán comandos de python (antecedidos por un '`>>>`') y otras veces comandos de shell (sin ningún símbolo al comienzo).

<!--more-->

### Listar discos

Listar los discos en sistema es una tarea relativamente sencilla. Parted tiene una función llamada `getAllDevices()` que retorna una lista de instancias de dispositivo. Por ejemplo, para mi minilaptop que tiene un sólo disco, la salida sería:

{% highlight python %}
>>> import parted
>>> print parted.getAllDevices()
[<parted.device.Device object at 0xb70f64ec>]
{% endhighlight %}

Cada instancia de dispositivo tiene varias funciones y propiedades útiles para obtener información interesante. Por ejemplo, entre los datos más importantes que se pueden obtener tenemos:

{% highlight python %}
>>> import parted
>>> d = parted.getAllDevices()      # Obtenemos la lista de discos
>>> for i in d:                     # Iteramos a través de la lista
...     print i.path                # La ruta del disco
...     print i.sectorSize          # El tamaño en bytes de cada sector
...     print i.length              # El número de sectores
...     print i.busy                # Indica si el disco está en uso
...     print i.model               # Modelo del disco
...     print i.getSize(unit='GB')  # El tamaño del disco en GB
...
/dev/sda
512
312581808
True
ATA TOSHIBA MK1652GS
149.050621033
{% endhighlight %}

Existen otras funciones para instancias de dispositivos un poco más "peligrosas" y deben ser utilizadas con **extrema cautela**. Por ejemplo, `clobber()` remueve la tabla de particiones del disco, dejándolo completamente en blanco.

### Listar particiones en disco

Otra forma de referenciar un dispositivo es instanciándolo directamente según su ruta de acceso; por ejemplo, "/dev/sda". Luego, a través de la instancia del disco podremos acceder a sus particiones con la propiedad `partitions`, obteniendo como resultado una lista de instancias de particiones. En mi minilaptop tengo un disco dividido en tres particiones, como se ve a continuación:

{% highlight python %}
>>> import parted
>>> dev = parted.Device('/dev/sda')
>>> disk = parted.Disk(dev)
>>> print disk.partitions
[<parted.partition.Partition object at 0xb70915cc>, <parted.partition.Partition object at 0xb70916ac>, <parted.partition.Partition object at 0xb70917ac>]
{% endhighlight %}

Cada instancia contiene datos interesantes acerca de la partición. Recordando que cada partición tiene asociada una instancia de geometría y otra de sistema de archivos, veamos el siguiente ejemplo:

{% highlight python %}
>>> import parted
>>> dev = parted.Device('/dev/sda')
>>> disk = parted.Disk(dev)
>>> for i in disk.partitions:
...     print i.type                # Tipo de partición
...     print i.number              # Número de partición
...     print i.path                # Ruta de la partición
...     print i.geometry.start      # Inicio de la partición en sectores
...     print i.geometry.end        # Fin de la partición en sectores
...     print i.geometry.length     # Tamaño de la partición en sectores
...     print i.getFlagsAsString()  # Banderas de la partición
...     print i.fileSystem.type     # Tipo de sistema de archivos
...
0
1
/dev/sda1
63
1044224
1044162

linux-swap(v1)
0
2
/dev/sda2
1044480
21028863
19984384
boot
ext4
0
3
/dev/sda3
21029085
312576704
291547620

xfs
{% endhighlight %}

Estos datos nos permiten hacer varias operaciones que veremos más adelante.

Antes de continuar, debemos tener en cuenta algunos detalles. Por ejemplo, los sectores son la unidad de medición base de un disco, es decir, la cantidad de sectores determina la capacidad del disco. Comúnmente un sector equivale a 512 bytes, sin embargo, esto puede variar según el modelo de disco. Una instancia de dispositivo contiene la información respecto al tamaño de sector y puede ser obtenida de la siguiente manera:

{% highlight python %}
>>> import parted
>>> dev = parted.Device('/dev/sda')
>>> print dev.sectorSize
512
{% endhighlight %}

Por otra parte, la propiedad `partitions` de una instancia de disco sólo retorna particiones existentes. Los espacios libres son interpretados por Parted como particiones, y por lo tanto pueden ser descritos de la misma forma. Para obtener las "particiones libres" hacemos así:

{% highlight python %}
>>> import parted
>>> dev = parted.Device('/dev/sda')
>>> disk = parted.Disk(dev)
>>> print disk.getFreeSpacePartitions()
[<parted.partition.Partition object at 0xb7091e2c>, <parted.partition.Partition object at 0xb7091e8c>]
{% endhighlight %}

Por último, como se evidenció en el ejemplo anterior, la propiedad `type` de una instancia de partición arroja números enteros que corresponden a un tipo de partición en particular. Cada número corresponde a una constante del módulo de bajo nivel de parted (`_ped`), y podemos ver una referencia de las constantes relacionadas con tipos de particiones en la siguiente tabla (Tabla N°1):

|**Número**|**Constante _ped**|**Significado**|
|---|---|---|
|0|`_ped.PARTITION_NORMAL`|Partición primaria|
|1|`_ped.PARTITION_LOGICAL`|Partición lógica|
|2|`_ped.PARTITION_EXTENDED`|Partición extendida|

Tabla N°1: Constantes `_ped` para tipos de partición.

### Nueva tabla de particiones

Una nueva tabla de particiones es necesaria cuando tenemos un disco nuevo de fábrica o cuando el disco ha sido borrado completamente con `clobber()`. Se debe tener mucho cuidado, porque al hacer una nueva tabla de particiones también se borrarán todas las particiones existentes en el disco. Dicho esto, la forma de hacerlo es la siguiente:

{% highlight python %}
>>> import parted
>>> dev = parted.Device('/dev/sdb')
>>> new = parted.freshDisk(dev, 'msdos')
>>> new.commit()
True
{% endhighlight %}

Nótese que he colocado '`msdos`' en el segundo argumento de la función `freshDisk`. Aunque existen otros tipos de tablas, que se implementan en arquitecturas más especializadas, '`msdos`' es la más común debido a su extendido uso.

### Asignar y remover banderas

Las banderas (o flags) se utilizan para definir opciones especiales en las particiones. Por ejemplo, el flag '`boot`' es usado por algunas implementaciones de BIOS para determinar cuales son las particiones que contienen un sistema de arranque. A cada bandera le corresponde una constante `_ped` que se refleja en la siguiente tabla (Tabla N°2):

|**Número**|**Constante _ped**|**Significado**|
|---|---|---|
|1|`_ped.PARTITION_BOOT`|Bandera de arranque|
|14|`_ped.PARTITION_DIAG`|Bandera de diagnóstico|
|4|`_ped.PARTITION_HIDDEN`|Bandera de escondido|
|7|`_ped.PARTITION_LBA`|Bandera para sistemas lineales MSDOS|
|6|`_ped.PARTITION_LVM`|Bandera para arreglos LVM|
|9|`_ped.PARTITION_PALO`|Bandera de arranque para PALO|
|10|`_ped.PARTITION_PREP`|Bandera de arranque para PowerPC PReP|
|5|`_ped.PARTITION_RAID`|Bandera para arreglo RAID|

Tabla N°2: Constantes `_ped` para las banderas.

Para asignar una bandera, hacemos así:

{% highlight python %}
>>> import parted, _ped
>>> flag = _ped.PARTITION_BOOT
>>> dev = parted.Device('/dev/sdb')
>>> disk = parted.Disk(dev)
>>> partition = disk.getPartitionByPath('/dev/sdb1')
>>> partition.setFlag(flag)
True
>>> disk.commit()
True
{% endhighlight %}

Y para removerla:

{% highlight python %}
>>> import parted, _ped
>>> flag = _ped.PARTITION_BOOT
>>> dev = parted.Device('/dev/sda')
>>> disk = parted.Disk(dev)
>>> partition = disk.getPartitionByPath('/dev/sda1')
>>> partition.unsetFlag(flag)
True
>>> disk.commit()
True
{% endhighlight %}

### Crear una partición

La creación de una nueva partición está dividida en la creación del contenedor lógico (manejado por Parted) y la creación del sistema de archivos según su tipo (ext4, xfs, jfs, ...).

Dicho esto, necesitaremos el inicio y fin (en sectores) de un espacio de partición libre que podemos obtener a través de la función `getFreeSpacePartitions()` e iterando por la lista como se hizo en ejemplos anteriores. Además, deberemos suministrar información acerca del tipo de partición que queremos generar. El proceso consiste en conformar cada una de las partes que describen una partición para luego escribir los datos del disco. Así:

{% highlight python %}
>>> import parted, _ped
>>> start = 100
>>> end = 20000
>>> ptype = _ped.PARTITION_NORMAL
>>> dev = parted.Device('/dev/sdb')
>>> disk = parted.Disk(dev)
>>> geometry = parted.Geometry(device=dev, start=start, end=end)
>>> constraint = parted.Constraint(exactGeom=geometry)
>>> partition = parted.Partition(disk=disk, type=ptype, geometry=geometry)
>>> disk.addPartition(partition=partition, constraint=constraint)
True
>>> disk.commit()
True
{% endhighlight %}

De acá hay varios detalles de los que se debe ser especialmente cuidadoso:

* Los argumentos start y end de la clase `parted.Geometry` deben estar indicados en sectores.
* No se puede hacer una partición donde ya existe una. Los sectores indicados deben pertenecer a un espacio libre.
* Una partición no puede empezar exactamente donde termina otra. Debe sumársele un sector como mínimo al comienzo de la siguiente.
* El argumento type de la clase `parted.Partition` debe ser el número o la constante correspondiente al tipo de partición según la Tabla N°1.

Bien, la tarea no ha terminado. Con esto hemos creado el contenedor de la partición, pero ahora debemos crear el sistema de archivos. Para ello nos asistiremos con el programa que corresponda al tipo de sistema de archivos que queremos crear, según se muestra en la siguiente tabla (Tabla N°3):

|**Tipo**|**Crear/Formatear**|**Redimensionar**|
|---|---|---|
|btrfs|`mkfs.btrfs [PART]`|`btrfs filesystem resize [TAM] [PART]`|
|ext2|`mkfs.ext2 -q -F -F [PART]`|`resize2fs -f [PART] [TAM]`|
|ext3|`mkfs.ext3 -q -F -F [PART]`|`resize2fs -f [PART] [TAM]`|
|ext4|`mkfs.ext4 -q -F -F [PART]`|`resize2fs -f [PART] [TAM]`|
|fat16|`mkfs.vfat [PART]`|`fatresize -q -s [TAM] [PART]`|
|fat32|`mkfs.vfat [PART]`|`fatresize -q -s [TAM] [PART]`|
|ntfs|`mkfs.ntfs -q -F [PART]`|`ntfsresize -f -P -b -s [TAM] [PART]`|
|hfs|`hformat -f [PART]`|`N/A`|
|hfs+|`mkfs.hfsplus [PART]`|`N/A`|
|jfs|`mkfs.jfs -q [PART]`|`N/A`|
|swap|`mkswap -f [PART]`|`N/A`|
|reiser4|`mkfs.reiser4 -y -f [PART]`|`N/A`|
|reiserfs|`mkfs.reiserfs -q -f -f [PART]`|`resize_reiserfs -q -f -s [TAM] [PART]`|
|xfs|`mkfs.xfs -q -f [PART]`|`N/A`|

Tabla N°3: Programas para creación y redimensión de sistemas de archivos

Como se puede notar, cada programa requiere que se le pase como parámetro la ruta del contenedor recién creado (`[PART]`). Si hacemos `fdisk -l` o abrimos `gparted`, podremos identificar cuál es la ruta de la nueva partición. Sin embargo, existe un truco programático que nos permite obtener el nombre de la partición con tan sólo proveer un sector que se encuentre dentro de ella. Del procedimiento anterior tenemos el inicio y fin de la partición en sectores, así que sólo basta calcular un sector que se encuentre en ese rango, así:

{% highlight python %}
>>> import parted
>>> dev = parted.Device('/dev/sdb')
>>> disk = parted.Disk(dev)
>>> start = 100
>>> end = 20000
>>> sector = ((end - start) / 2) + start           # sector en el medio
>>> print disk.getPartitionBySector(sector).path
/dev/sdb1
{% endhighlight %}

Conocida la ruta de la partición, para hacer un sistema de archivos xfs (según la Tabla N°3), hacemos en una Terminal de Root nueva (no en la terminal de python) así:

{% highlight bash %}
mkfs.xfs -q -f /dev/sdb1
{% endhighlight %}

Si se quiere seguir utilizando la consola de python, se puede utilizar la librería subprocess para hacer una llamada de un comando de shell. Por ejemplo, para un sistema de archivos ext4:

{% highlight python %}
>>> import subprocess
>>> subprocess.Popen(
... 'mkfs.ext4 -q -F -F /dev/sdb1',
... shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT
... ).communicate()[0].split()
[]
{% endhighlight %}

Y así para cada caso según nuestras necesidades.

### Formatear una partición

Formatear una partición (o darle formato) no es más que borrar el sistema de archivos y volverlo a hacer. Para formatear una partición entonces basta con utilizar el programa de tu preferencia (según la Tabla N°3) en la partición correspondiente. Por ejemplo, para formatear una partición reiserfs (en una Terminal de Root):

{% highlight bash %}
mkfs.reiserfs -q -f -f /dev/sda1
{% endhighlight %}

Para formatear una partición jfs como ntfs:

{% highlight bash %}
mkfs.ntfs -q -F /dev/sda1
{% endhighlight %}

### Remover una partición

Para remover una partición basta con remover el contenedor de la siguiente forma:

{% highlight python %}
>>> import parted
>>> dev = parted.Device('/dev/sdb')
>>> disk = parted.Disk(dev)
>>> partition = disk.getPartitionByPath('/dev/sdb1')
>>> disk.deletePartition(partition=partition)
True
>>> disk.commit()
True
{% endhighlight %}

De acá se desprende una teoría interesante que es pertinente analizar. Cuando se borra un contenedor, no se borra el sistema de archivos que se encuentra dentro, se borra la mera expresión lógica de la partición. Es decir, si nosotros volvemos a crear una partición en el mismo lugar donde se encontraba la previa, nuestros datos se encontrarán "mágicamente" en el mismo lugar donde los dejamos. Esto es porque la expresión lógica de la partición es independiente del sistema de archivos, y es en este último donde se realizan las operaciones de lectura-escritura.

Por otro lado, un sistema de archivos no es más que una forma de organizar los datos. Cada sistema de archivos tiene su forma particular de organización y es esto lo que los diferencia entre sí. Sin embargo, la forma básica en que se organizan es casi siempre la misma: existe un índice de archivos que indica donde empieza y donde termina cada uno para que luego los datos binarios sean escritos en los sectores físicos del disco.

Cuando uno borra un archivo mediante el sistema operativo, lo que ocurre en realidad es que el archivo es borrado del índice, pero el contenido binario del archivo sigue estando en disco. Cuando se mueve un archivo de un lugar a otro, lo que se hace es actualizar el índice para reflejar la nueva locación en disco, pero de nuevo los datos quedan intactos. Cuando se crean nuevos archivos o cuando se copian, son los únicos casos en donde los datos son escritos físicamente en disco. Ahora ya sabes porqué mover y borrar archivos en masa es considerablemente más rápido que copiarlos de un lugar a otro.

Otro aspecto interesante ocurre cuando se da formato a una partición. Una de las operaciones que se realiza es el borrado del índice de archivos, pero de nuevo, los datos binarios de los archivos permanecen en disco. En base a este principio es que trabajan las aplicaciones de estudios forenses como photorec: se hace un análisis sector por sector de disco, buscando partes que "parezcan" como un inicio o fin de archivo (cada tipo de archivo comienza y termina de una misma forma) y luego se reconstruye con los datos que se encuentran entre inicio y fin. Cuando se formatea una partición, se construye un índice de archivos vacío. El momento en que se comienza a perder la información del sistema de archivos previo, ocurre cuando la nueva información se escribe en los mismos sectores de disco donde existía un archivo previamente.

La única forma de asegurarse de que los datos sean realmente borrados (del índice de archivos de la partición y físicamente del disco) es haciendo un formateo de bajo nivel, el cual consiste en llenar cada sector de la partición con datos aleatorios o que de por sí no representen datos coherentes (por ejemplo unos o ceros). Una forma de hacer esto es con la herramienta dd (en una Terminal de Root):

{% highlight bash %}
dd if=/dev/zero of=/dev/sdb1
{% endhighlight %}

Bien, suficiente teoría por ahora (uno se emociona con esto xD).

### Redimensionar una partición

Redimensionar una partición es una tarea un tanto complicada y necesitaremos todos los conocimientos y principios que hemos estudiado hasta ahora. En resumen, el procedimiento debe tener las siguientes consideraciones:

* Si el nuevo tamaño es menor al anterior, primero se deberá encoger el sistema de archivos y luego el contenedor lógico.
* Si el nuevo tamaño es mayor que el anterior, primero se deberá agrandar el contenedor lógico y luego el sistema de archivos.
* Para redimensionar un contenedor lógico, simplemente lo borramos y creamos con el nuevo tamaño.
* Para redimensionar un sistema de archivos debemos utilizar el programa adecuado (ver Tabla N°3). También hay que tomar en cuenta que no todos los sistemas de archivos se pueden redimensionar (marcados en la Tabla N°3 como "N/A").
* Esta operación sólo permite agrandar o reducir la partición moviendo el sector donde finaliza. Es decir, no se puede modificar el sector donde comienza la partición. Hacer esto implica otra serie de operaciones, que incluyen mover de lugar todos los datos contenidos en el sistema de archivos y que no cubriremos acá porque es muy extenso.

Dicho esto, vamos a ver un ejemplo de aumento de tamaño de una partición primaria que contiene un sistema de archivos ext4, indicando el fin de la partición en el sector 40000 (antes comenzaba en 100 y terminaba en 20000):

{% highlight python %}
>>> import parted, _ped, subprocess
>>> dev = parted.Device('/dev/sda')
>>> disk = parted.Disk(dev)
>>> partition = disk.getPartitionByPath('/dev/sda1')                        # Obtenemos la instancia de partición
>>> disk.deletePartition(partition=partition)                               # Removemos la instancia del disco
True
>>> disk.commit()                                                           # Escribimos los cambios
True
>>> start = 100                                                             # Inicio
>>> end = 40000                                                             # Nuevo fin
>>> ptype = _ped.PARTITION_NORMAL                                           # Tipo de partición
>>> geometry = parted.Geometry(device=dev, start=start, end=end)            # Definimos la geometría
>>> constraint = parted.Constraint(exactGeom=geometry)                      # Establecemos la condición
>>> partition = parted.Partition(disk=disk, type=ptype, geometry=geometry)  # Definimos la partición
>>> disk.addPartition(partition=partition, constraint=constraint)           # Agregamos la partición a la instancia de disco
True
>>> disk.commit()                                                           # Escribimos los cambios
True
>>> sector = ((end - start) / 2) + start                                    # Calculamos un sector en el medio de la nueva partición
>>> path = disk.getPartitionBySector(sector).path                           # Obtenemos la ruta de la partición recién creada
>>> start_kb = start * dev.sectorSize / 1024.0                              # Sectores a KB
>>> end_kb = end * dev.sectorSize / 1024.0                                  # Sectores a KB
>>> newsize = str(int((end_kb - start_kb))) + 'K'                           # Calculamos tamaño nuevo
>>> subprocess.Popen(                                                       # Ejecutamos el comando de redimensión
... 'resize2fs -f {0} {1}'.format(path, newsize),
... shell=True, stdout=subprocess.PIPE,
... stderr=subprocess.STDOUT
... ).communicate()[0].split()
[]
{% endhighlight %}

### Otros recursos

Se pueden consultar otros recursos para mayores ejemplos, como es el caso del código del [Instalador de Canaima](http://www.gitorious.org/canaima-gnu-linux/canaima-instalador/trees/master) (carpeta canaimainstalador) y el [Instalador de Fedora](http://git.fedorahosted.org/cgit/anaconda.git/tree/) (carpeta pyanaconda).

Y así, espero haber contribuído con todas aquellas personas que en un futuro pretendan utilizar esta maravillosa herramienta muy mal documentada.

Cualquier consulta, no duden en hacerla en los comentarios.
