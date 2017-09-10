---
title: ASUS F555UA Mic Does not Work and Headphones do not Work
author: David Ford
layout: post
---

If you have an ASUS F555UA computer and are using Linux, you may realize you have issues with your audio setup.  Issues include the mic not working and also any headset that gets attached is not recognized. Not to worry, here is the fix.

Create a file in `/etc/modprobe.d` such as `/etc/modprobe.d/alsa-base.conf` add the following rules, restart your computer and you should now have working mic and any headset which gets plugged in will be recognized.

```
#/etc/modprobe.d/alsa-base.conf

options snd-hda-intel model=headset-dmic position_fix=3 ac97_quirk=alc_jack
```

This amazing little hack fixed a very annoying issue I was having, hope it helps someone else!
