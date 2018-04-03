---
article_id: 4353
author: martinezfaneyth
categories: [Games, Free Software, Development]
date: 2016-07-22 23:52:00-0430
description: You can use this python script to know the exact coordinates of the
    pokemon around you.
image: /static/img/posts/4353/how-to-catch-pokemon-near-you-with-the-help-of-this-python-script__1.jpg
layout: post
slug: how-to-catch-pokemon-near-you-with-the-help-of-this-python-script
tags: [Pokemon Go, catching, Cheat]
title: How to catch pokemon near you with the help of this python script
---

Last time we were talking about [how to farm pokestops automatically](http://huntingbears.com.ve/learn-how-to-automatically-farm-pokestops-with-this-pokemon-go-bot-written-in-python.html), now i
want to help you find those rare pokemon near you without moving from your
house. Yeah, hate me, walkers.

I know this is raising up some really angry players who like to play properly and
hate cheaters, as they ruin the game experience for them. But hey, i'm a
software developer, not a gamer.

First we're going to need a Pokemon Trainer Club (PTC) account. If you don't have one,
go the the [PTC website](https://club.pokemon.com/us/pokemon-trainer-club/sign-up/) and register one.

Then we will need:

- A git client.
- A terminal/shell.
- The python package installer (pip).
- An internet connection.

Again, i'm going to explain the procedure for a Linux distribution as i don't use Windows, but the process should be fairly similar.
We're going to use a pokemon API script by [leegao](https://github.com/leegao) to know which pokemon are
near our location. Open a terminal and clone it with the following command:

    git clone https://github.com/leegao/pokemongo-api-demo

Then go into the newly created folder (`cd pokemongo-api-demo`) and change to the `simulation` branch like this:

    git checkout simulation

Now execute the script as follows:

    python2 main.py -u [USER] -p [PASSWORD] --location [LOCATION]

Where:

- `[USER]` is your PTC username.
- `[PASSWORD]` is yor PTC password.
- `[LOCATION]` is a string containing a real address in which to start searching
for pokemon.

This will generate an output like this:

    [!] Your given location: Glastonbury, England
    [!] lat/long/alt: XX.XXXX YY.YYYY ZZ.ZZZZ
    [!] login for: [USER]
    [+] RPC Session Token: XXXXYYYYYYZZZZZZZZZ ...
    Sleeping for 2 seconds to get around rate-limit.
    [+] Received API endpoint: https://pgorelease.nianticlabs.com/plfe/418/rpc
    Sleeping for 2 seconds to get around rate-limit.
    [+] Login successful
    [+] Username: [USER]
    [+] You are playing Pokemon Go since: xxxx-yy-zz
    [+] POKECOIN: 0
    [+] STARDUST: 0
    Sleeping for 2 seconds to get around rate-limit.
    Sleeping for 2 seconds to get around rate-limit.
    Sleeping for 2 seconds to get around rate-limit.
    Sleeping for 2 seconds to get around rate-limit.
    Sleeping for 2 seconds to get around rate-limit.

    Within one step of LatLng: 10.2178262025,-67.5872447788 (316m NE from you):
        (13) Weedle
        (84) Doduo
    Within one step of LatLng: 10.2180407692,-67.5902250144 (239m NW from you):
        (69) Bellsprout
    Within one step of LatLng: 10.2154127915,-67.5902250144 (105m SW from you):
        (10) Caterpie

    (16) Pidgey is visible at (10.2157907149, -67.5914823031) for 208 seconds (220m SW from you)
    (10) Caterpie is visible at (10.2149091561, -67.5906441105) for 643 seconds (177m SW from you)

    The next cell is located at LatLng: 10.2127848977,-67.5902250144. Keep scanning? [Y/n]

As you can see, you now have the exact coordinates of a `Pidgey` and a
`Caterpie`, with also the amount of time that they will be available there. If
you keep pressing `Y`, the script will be ciclying through the map, telling you
which other pokemon are near the location you specified.

Now, copy those coordinates and put them into [Google Maps](https://www.google.com/maps) and you will know
exactly where it is. To catch that pokemon you have two options: drive or take a
bus to that location and pray you make it in time, or use fake gps to
teletransport there.

You can read about how to teletransport [using Fake GPS](http://huntingbears.com.ve/how-to-use-fake-gps-to-teletransport-anywhere-in-pokemon-go.html)
in a post i wrote recently.
