---
article_id: 4343
author: martinezfaneyth
categories: []
date: 2016-02-07 12:26:28-0430
description: ''
image: ''
layout: post
slug: tip-uninstall-all-your-manually-installed-python-packages-with-this-script
tags: []
title: 'Tip: Uninstall all your manually installed python packages with this script'
---


for PYTHON in $( ls -1 /usr/local/lib/ ); do

    if [ "$( echo ${PYTHON} | cut -c -6 )" == "python" ]; then
        PYTHONVER="$( echo ${PYTHON} | cut -c 7 )"

        for PYTHONPKG in $( ls -1 /usr/local/lib/${PYTHON}/dist-packages/ | grep '[egg|dist]-info' ); do
            PYTHONPKGNAME="$( echo ${PYTHONPKG} | awk -F- '{print $1}' )"
            PYTHONLIST="${PYTHONPKGNAME} (python${PYTHONVER}) ${PYTHONLIST}"
            #pip${PYTHONVER} uninstall -y ${PYTHONPKGNAME}
            echo "pip${PYTHONVER} uninstall -y ${PYTHONPKGNAME}"
        done

    fi

done

echo "Uninstalled packages: ${PYTHONLIST}"