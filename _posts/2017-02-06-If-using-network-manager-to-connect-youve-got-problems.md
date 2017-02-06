---
layout: post
title: If using Network Manager to connect you've got problems with security
author: David Ford
---

# Setting up Network Manager not to leak is a nightmare

After running [Etherape](https://en.wikipedia.org/wiki/EtherApe) and [Wireshark](https://en.wikipedia.org/wiki/Wireshark) I noticed that even after hardening all my leak points, I was still having issues with my network leaking benign information.

I tracked these leaks down to [Network Manager](https://en.wikipedia.org/wiki/NetworkManager), which is [Gnome's](https://en.wikipedia.org/wiki/GNOME) goto network manager.

You must spend time ensuring Network Manager is set up properly.

First and foremost, I do not want Network Manager to use dhclient as the dhcp client, however, it seems Network Manager prefers to use dhclient if installed.

To force Network Manager to use its internal DHCP server, I have added the below to my `/etc/NetworkManager/NetworkManager.conf` to ensure it does exactly what I want it to do when booting.

```
[main]
dhcp=internal
plugins=keyfile
dns=none

[device]
wifi.scan-rand-mac-address=yes

[connection]
wifi.cloned-mac-address=random
ethernet.cloned-mac-address=random
```

ensuring `resolv.conf` isn't changed I first add `dns=none` as I have [Unbound](https://unbound.net/) and [DNSCrypt-proxy](https://www.dnscrypt.org/) set up for my dns.  I also use chattr +i on resolv.conf to ensure no other programs can change it. See [My Article on settinging up Unbound and Dnscrypt](http://djfordz.com/2017/02/05/DNSCrypt-proxy-getting-it-working-on-your-system.html).

I ensure my MAC address is randomized on connection with the `wifi.cloned-mac-address=random`.

Thomas Haller's has a good blog on the subject [here.](https://blogs.gnome.org/thaller/2016/08/26/mac-address-spoofing-in-networkmanager-1-4-0/)

Use this wiki to setup macchanger [Arch Wiki](https://wiki.archlinux.org/index.php/MAC_address_spoofing)

So now you know how to reign in Network Manager.
