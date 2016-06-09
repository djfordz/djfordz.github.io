---
layout: post
title: Installing check50 onto your linux box (finally)
author: David Ford
---

So, I've been promising for a while now how to get check50 natively on your linux box, but just haven't published the instructions...until now.

If you are using Arch linux, check50 is actually published in the AUR, so all you need is yaourt and build it.

for those who don't use Arch Linux, I recommend switching to Arch as it is by far the best Linux Distro ever.

For those unwilling to switch, this is how to install check50 onto your linux system.

###First and foremost
check50 relies on nodejs, thus you must have nodejs and npm installed, check with your distros documentation and install nodejs accordingly, for debian it is `apt-get install nodejs`, for fedora, `yum install nodejs`

###Because I am so nice
I have created a bash script to take care of the rest, so make sure you have nodejs installed and then run the script, so all you have to do is clone my [check50 repo](https://github.com/djfordz/check50/) and then run the script `./install.sh`;

if you have any issues, please email me at djfordz@gmail.com thanks!
