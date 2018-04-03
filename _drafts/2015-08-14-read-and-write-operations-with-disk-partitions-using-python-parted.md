---
article_id: 4316
author: martinezfaneyth
categories:
- Free Software
- Development
- Python
date: 2015-08-14 21:04:55-0430
description: ''
image: /static/img/posts/2727/operaciones-de-lectura-y-escritura-de-particiones-con-python-parted__1.jpg
layout: post
slug: read-and-write-operations-with-disk-partitions-using-python-parted
tags:
- parted
- pyparted
- python
title: Read and write operations with disk partitions using python-parted
---

During the improvement sessions of the official installer of Canaima GNU/Linux 3.1, I had to investigate a lot about managing devices, drives and partitions in GNU/Linux operating systems. I was lucky enough to find the python bindings for the Parted library (_python-parted_ or _pyparted_), which is used in several recognized installers.

Today I will be writing about basic reading and writing operations with disk partitions using python-parted, where I'll be explaining some of the theoretical aspects that will be helpful in understanding the use cases to be presented.

A major limitation I found was the documentation, because it simply does not exist. My further guidance for the use of python-parted were the comments within the code of the library and a few trial and error testing. I hope this article can contribute to improving the existing documentation on python-parted.

### Installation of tools

If you're in Canaima, Debian or Ubuntu, you can install the tools we need with the following command in a root terminal (Menu > Applications > Accessories > Root terminal):

{% highlight bash %}
aptitude install python-parted reiserfsprogs btrfs-tools e2fsprogs dosfstools mtools hfsutils hfsprogs jfsutils util-linux ntfsprogs reiser4progs xfsprogs fatresize
{% endhighlight %}

Within these tools (in addition to python-parted) are several applications that provide operations support for various file systems (FAT16, NTFS, ext4, xfs, etc.).

### Basic concepts

Let's start by saying that python-parted consists of a series of modules that provide an interface with Parted. Parted is a program that lets you create, resize, move, copy and remove disk partitions.

Pyparted is divided into several classes that provide avenues for direct application to certain aspects related to disk partition. That is, according pyparted:

* There is a fundamental unit which is the **Device**, represented by the `Device` class. This class provides access to the low-level functions related to all physical storage devices.
* A type of device is the **Disk**, represented by the `Disk` class. Through a disc you can change the partitions as well as obtain other information related to the geometry, type of partition and file system type.
* The partitions are represented by the `Partition` class. Each partition has an associated geometry (`Geometry` class), a condition (`Constraint` class) and a file system type (`FileSystem` class), which can describe the details related to a partition.

Well, understood the theory, let's see some use cases. We use a python superuser mode for practical console. So we opened a root terminal and run the command `python`. It is important to pay attention to the notation used in the commands presented as sometimes python commands (preceded by a '`` >>>') and sometimes shell commands are present (no symbol at the beginning).

### Disk list

List the disks on the system is a relatively simple task. Parted has a feature called `getAllDevices()` which returns a list of `Device` instances. For example, for my minilaptop which has a single disc, the output would be:

{% highlight python %}
>>> import parted
>>> print parted.getAllDevices()
[<parted.device.Device object at 0xb70f64ec>]
{% endhighlight %}

Each `Device` instance has several useful functions and properties to obtain interesting information. For example, among the most important data that can be obtained, we have:

{% highlight python %}
>>> import parted
>>> d = parted.getAllDevices()      # Obtain the disk list
>>> for i in d:                     # Iterate through the list
...     print i.path                # Disk path
...     print i.sectorSize          # Size in bytes of each sector
...     print i.length              # Number of sectors
...     print i.busy                # Indicate if the disk is in use
...     print i.model               # Disk model
...     print i.getSize(unit='GB')  # Disk size in GB
...
/dev/sda
512
312581808
True
ATA TOSHIBA MK1652GS
149.050621033
{% endhighlight %}

There are other functions that should be used with **extreme caution**. For example, `clobber()` removes the partition table of the disk, leaving it completely blank.

### List disk partitions

Another way to reference a device is directly by its system path; eg "/dev/sda". Then, through the instance we can access disk partitions with the `partitions` property, resulting in a list of `Partition` instances. In my minilaptop I have a disk divided into three partitions, as shown below:

{% highlight python %}
>>> import parted
>>> dev = parted.Device('/dev/sda')
>>> disk = parted.Disk(dev)
>>> print disk.partitions
[<parted.partition.Partition object at 0xb70915cc>, <parted.partition.Partition object at 0xb70916ac>, <parted.partition.Partition object at 0xb70917ac>]
{% endhighlight %}

Each instance contains interesting data about the partition. Recalling that each partition has an associated instance of its geometry and filesystem, consider the following example:

{% highlight python %}
>>> import parted
>>> dev = parted.Device('/dev/sda')
>>> disk = parted.Disk(dev)
>>> for i in disk.partitions:
...     print i.type
...     print i.number
...     print i.path
...     print i.geometry.start
...     print i.geometry.end
...     print i.geometry.length
...     print i.getFlagsAsString()
...     print i.fileSystem.type
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

This data allow us to do several operations to be shown later.

Before continuing, we must consider some details. For example, the spectrum is the measurement unit based on a disc, that is, the amount of areas determines the disc capacity. Commonly an area equivalent to 512 bytes, but this can vary depending on model disk. A device instance contains the information regarding the sector size and can be obtained as follows:

{% highlight python %}
>>> import parted
>>> dev = parted.Device('/dev/sda')
>>> print dev.sectorSize
512
{% endhighlight %}

Moreover, the `partitions` an instance returns only existing disk partitions. The free spaces are interpreted by parted as partitions, and therefore can be described in the same way. For the "free partitions" we do so:

{% highlight python %}
>>> import parted
>>> dev = parted.Device('/dev/sda')
>>> disk = parted.Disk(dev)
>>> print disk.getFreeSpacePartitions()
[<parted.partition.Partition object at 0xb7091e2c>, <parted.partition.Partition object at 0xb7091e8c>]
{% endhighlight %}

Finally, as evidenced in the above example, the `type` of partition throws an instance of integers that correspond to a particular type of partition. Each number corresponds to a constant low level module parted (`_ped`), and we can see a reference of related constants partition types in the following table (Table No. 1):

|**Número**|**Constante _ped**|**Significado**|
|---|---|---|
|0|`_ped.PARTITION_NORMAL`|Partición primaria|
|1|`_ped.PARTITION_LOGICAL`|Partición lógica|
|2|`_ped.PARTITION_EXTENDED`|Partición extendida|

Table No. 1: Constants `_ped` partition types.

### New Partition Table

A new partition is necessary when we have a new disc factory or when the disk has been completely erased with `clobber()`. It must be very careful, because when making a new partition table also all existing partitions on the disk will be erased. That said, the way is as follows:

{% highlight python %}
>>> import parted
>>> dev = parted.Device('/dev/sdb')
>>> new = parted.freshDisk(dev, 'msdos')
>>> new.commit()
True
{% endhighlight %}

Notice that I placed "`msdos`" in the second argument of the `freshDisk` function. Although there are other types of tables, which are implemented in more specialized architectures, '`msdos`' is the most common due to its widespread use.

### Assign and remove flags

The flags (or flags) are used to define special options on the partitions. For example, the flag '' boot` 'is used by some BIOS implementations to determine which partitions contain system startup. Each flag corresponds to a constant `_ped` reflected in the following table (Table No. 2):

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

Table No. 2: `_ped` Constants for the flags.

To assign a flag, we do this:

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

And to remove:

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

### Create a partition

Creating a new partition is divided in creating the logical container (managed by Parted) and the creation of the file system by type (ext4, xfs, jfs, ...).

That said, we need the start and end (in sectors) of a free partition space that we can get through getFreeSpacePartitions `() 'function and iterating through the list as in previous examples. In addition, we provide information about the type of partition you want to generate. The process is to form each of the parts that describe a partition and then write data on the disk. Thus:

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

From here there are several details that you should be especially careful:

* The start and end arguments parted.Geometry` `class must be given in sectors.
* You can make a partition where one already exists. Those fields must belong to a free space.
* A partition can not begin exactly where the other ends. It must be added a section at least at the beginning of the next.
* The type argument `parted.Partition` class should be the number or for the type of partition constant according to Table No.1.

But the task is not over. With this we have created the container of the partition, but now we must create the file system. For this we assist with the program for the type of file system you want to create, as shown in the following table (Table No. 3):

|**Type**|**Crear/Formatear**|**Redimensionar**|
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

Table No. 3: Programs for creating and resizing file systems

As you can see, each program requires that you pass as a parameter the path of newly created container (`[PART] '). If we opened `` fdisk -l` or gparted`, we can identify which route the new partition. However, there is a programming trick that allows us to obtain the name of the partition only provide a sector that is within it. The above procedure have the start and end partition sectors, so just simply calculate a sector that is in that range, so:

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

Known route partition, for xfs file system (as shown in Table No. 3), we do a new root terminal (not the terminal python) as follows:

{% highlight bash %}
mkfs.xfs -q -f /dev/sdb1
{% endhighlight %}

If you want to continue using the Python console, you can use the library to make a subprocess call a shell command. For example, for ext4 file system:

{% highlight python %}
>>> import subprocess
>>> subprocess.Popen(
... 'mkfs.ext4 -q -F -F /dev/sdb1',
... shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT
... ).communicate()[0].split()
[]
{% endhighlight %}

And so for each case according to our needs.

### Formatting a partition

Format a partition (or formatting) is just delete the file system and do it again. To format a partition, then simply use the program of your choice (according to Table No. 3) in the corresponding partition. For example, to format a reiserfs partition (in a root terminal):

{% highlight bash %}
mkfs.reiserfs -q -f -f /dev/sda1
{% endhighlight %}

To format a partition as ntfs jfs:

{% highlight bash %}
mkfs.ntfs -q -F /dev/sda1
{% endhighlight %}

### Removing a partition

To remove a partition simply remove the container as follows:

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

From here an interesting theory that follows is relevant to analyze. When a container is deleted, the file system that is inside is not cleared, the mere logical expression of the partition is deleted. That is, if we return to create a partition in the same place where the previous was, our data will find "magically" in the same place where we left them. This is because the logical expression of the partition is independent of the file system, and is in the latter where the read-write operations are performed.

On the other hand, a file system is just a way of organizing data. Each file system has its particular form of organization and is what differentiates them from each other. However, the basic way we are organized is almost always the same: there is an index file that indicates where begins and ends each so then the binary data to be written to the physical disk sectors.

When you delete a file using the operating system, what actually happens is that the file is deleted from the index, but the binary contents of the file remains on disk. When a file from one location to another move, what is done is to update the index to reflect the new location on disk, but again the data is intact. When new files are created or when copied, are the only cases where the data is physically written to disk. Now you know why move and delete files in mass is considerably faster than copying them from one place to another.

Another interesting aspect is when you format a partition. One of the operations performed is erasing the index files, but again, binary data files remain on disk. Based on this principle they are working applications forensics as photorec: a sector analysis disk sector is seeking parties "appear" as a start or end of file (each file type starts and ends the same form) and then reconstructed with the data found between start and end. When a partition is formatted, empty file index is built. The moment you start losing the previous system information files, occurs when new information is written to the same disk sectors where a file existed previously.

The only way to ensure that the data is actually deleted (of index files on the partition and physically from the disc) is doing a low level format, which involves filling every sector of the partition with random data or that by yes no consistent data representing (for example ones or zeros). One way to do this is with the tool dd (in a root terminal):

{% highlight bash %}
dd if=/dev/zero of=/dev/sdb1
{% endhighlight %}

Well, enough theory for now (one is thrilled with this xD).

### Resizing a Partition

Resizing a partition is a somewhat complicated task and we will need all the knowledge and principles that we have studied so far. In short, the procedure should take the following considerations:

* If the new size is less than the above, we first must shrink the file system and then the logical container.
* If the new size is greater than the last, first must enlarge the logical container and then the file system.
* To resize a logical container, simply delete it and create the new size.
* To resize a file system must use the appropriate program (see Table No. 3). We must also keep in mind that not all file systems can be resized (marked in Table No. 3 as "N / A").
* This only allows you to enlarge or shrink the partition by moving the sector where it ends. That is, you can not modify the sector where the partition begins. Doing this involves another series of operations, including moving from place all the data in the file system and will not cover here because it is very extensive.

That said, let's see an example of enlarged primary partition containing an ext4 file system, indicating the end of the partition in the industry 40000 (formerly began in 100 and ended in 20000):

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

### Other resources

Other resources are available for more examples, as is the case of the [Installer Canaima](http://www.gitorious.org/canaima-gnu-linux/canaima-instalador/trees/master) code (folder canaimainstalador) and [Fedora Installer](http://git.fedorahosted.org/cgit/anaconda.git/tree/) (pyanaconda folder).

And so, I hope I have contributed with all those who in the future intend to use this wonderful tool poorly documented.

Any questions, do not hesitate to make them in the comments section.
