---
article_id: 4349
author: martinezfaneyth
categories: [Games, Free Software, Development]
date: 2016-07-21 23:45:01-0430
description: This script helps you to farm objects from pokestops very easily.
image: http://huntingbears.com.ve/static/img/posts/4349/learn-how-to-automatically-farm-pokestops-with-this-pokemon-go-bot-written-in-python__1.jpg
layout: post
slug: learn-how-to-automatically-farm-pokestops-with-this-pokemon-go-bot-written-in-python
tags: [Pokemon Go, pokestop, Cheat]
title: Learn how to automatically farm pokestops with this Pokemon Go bot written
  in Python
---

Repeat after me: you cheat, i cheat, they cheat, we all cheat.

After all, what's the purpose of technology? Make our lives easier by simplifying
and automatizing our daily work. I know, Pokemon Go isn't work, but what the
heck.

What you will need:

- A git client.
- A terminal/shell.
- The python package installer (pip).
- An internet connection.

So basically if you have any Linux distribution installed, you already have
these tools. I will make the explanation for Linux, as it is my primary
operative system, but you should be able to understand how to do it in Windows
or Mac, as the process is very similar.


First, open a terminal or shell and install git and pip. In Debian/Ubuntu
you can do it like this:

    sudo apt-get install git python-pip

Then we will be using a Bot written by [Mila432](https://github.com/Mila432) (you can drop a comment in his [twitter](https://twitter.com/mila432)),
which we will be downloading with git. So, in the terminal, go to your folder of
preference and put the following command:

    git clone https://github.com/Mila432/Pokemon_Go_API

Next, we have to install the python dependencies. Go to the newly downloaded
folder (`cd Pokemon_Go_API`) and put with the following command:

    sudo pip2 install -r requirements.txt

Now, its time to run the bot with the following command:

    python2 main.py -u [USER] -p [PASSWORD] --location [LOCATION] -t [METHOD]

Where:

- `[USER]` is your username in Pokemon Trainer Club or your Google email,
depending on which method you use to login.
- `[PASSWORD]` is yor PTC password or Google password.
- `[LOCATION]` is a string containing a real address in which to start searching
for pokestops.
- `[METHOD]` is the method you use to login (Google or PTC).

What you will see next is the bot teletransporting to the closest pokestops to start farming
items and 50XP points.

    [!] Using google as login..
    [!] Your given location: Sydney, Australia
    [+] Token: XXXXYYYYYYZZZZZZZZZ...
    [+] found: 123 Pokestops near
    [+] starting show
    [!] +50 (50)
    [!] +50 (100)
    [!] charging
    [!] +50 (150)
    [!] teleport..

If you have any problems, leave them below and i'll try to help you.

Enjoy!
