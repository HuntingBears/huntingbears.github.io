---
author: martinezfaneyth
language: es
date: 2011-08-14 00:09:58-04:30
layout: post
slug: tip-como-identificar-si-un-procesador-soporta-64bits
title: 'Tip: Cómo identificar si un procesador soporta 64Bits'
wordpress_id: 1797
categories:
- Minipost
- Software Libre
- Tips
tags:
- /proc/cpuinfo
- identificar
- procesador 64bits
image: http://blog-luisalejandro.rhcloud.com/static/img/posts/1797/46f816348e0c36a2bf57e9e8fd289406.jpg
description: Los procesadores modernos soportan un ancho de palabra de 64Bits. Averigua si tu procesador lo soporta.
---

Si deseas saber rápidamente cuál es la arquitectura que soporta el procesador de tu computadora, ejecuta éste comando en consola:

{% highlight bash %}
cat /proc/cpuinfo | grep flags
{% endhighlight %}

En mi caso, que tengo un procesador Intel Atom doble núcleo, la salida fué la siguiente:

{% highlight text %}
flags        : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe constant_tsc arch_perfmon pebs bts aperfmperf pni dtes64 monitor ds_cpl est tm2 ssse3 xtpr pdcm movbe lahf_lm dts
flags        : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe constant_tsc arch_perfmon pebs bts aperfmperf pni dtes64 monitor ds_cpl est tm2 ssse3 xtpr pdcm movbe lahf_lm dts
{% endhighlight %}

Busca la palabra "lm" (sola) dentro de la salida; si la encuentras, tu procesador soporta 64Bits, de lo contrario, es 32Bits. Comúnmente a las computadoras que funcionan a 64Bits se les llama "amd64" y a las de 32Bits "i386".
