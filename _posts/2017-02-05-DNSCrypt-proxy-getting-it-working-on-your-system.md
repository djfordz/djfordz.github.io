---
layout: post
title: Setting up Personal Resolving DNS with Unbound and DNSCrypt-proxy
author: David Ford
---

It is very important to setup dnscrypt-proxy correctly and unbound correctly to ensure you are getting the highest security without leaks.

Arch Linux Wiki is the best wiki out there to reference for setting up just about any type of Linux Software and I use the expertise of the Arch Linux Community to ensure I understand how things work.
<br />
[Arch Linux Unbound Wiki](https://wiki.archlinux.org/index.php/unbound)

[Arch Linux DNSCrypt-proxy Wiki](https://wiki.archlinux.org/index.php/DNSCrypt)

[Arch Linux Resolv.conf Wiki](https://wiki.archlinux.org/index.php/Resolv.conf)

Please reference my unbound and dnscrypt conf files for an example of how to set these up.

[My Github](https://github.com/djfordz/unbound_dns)


## Important things to note.

*In `unbound.conf` any ip under `forward-zone` is used to resolv your DNS queries*

Please ensure only your dnscrypt-proxy ip and port you have setup are listed under the forward-zone in unbound:

```
#/etc/unbound/unbound.conf

forward-zone:
    name: "."
    forward-addr: 127.0.0.1@5353 # dnscrypt-proxy dnscrypt.eu-dk
    forward-addr: 127.0.0.1#5354 # dnscrypt-proxy dnscrypt.eu-nl
```

Follow the [Arch Linux DNSCrypt-Proxy Wiki](https://wiki.archlinux.org/index.php/DNSCrypt)

Make the systemd files as required, using `/usr/share/dnscrypt-proxy/dnscrypt-resolvers.csv` as reference.

I have the files created in `/etc/systemd/system/` for your reference on [My Github](https://github.com/djfordz/unbound_dns)

Create the socket files for your dnscrypt resolvers, the names will come from the `dnscrypt-resolvers.csv` for example, to use dnscrypt.eu-nl you would create the file `dnscrypt-proxy@dnscrypt.eu-nl.socket` in your `/etc/systemd/system/` directory.

These socket files will contain the following:
 
*If setting up fallback dnscrpyt resolver, ensure to change the ports for each socket, as each needs to bind to its own port, so say you want to have a primary and secondary, you would create two socket files with names to each dnscrypt resolve from dnscrypt-resolvers.csv like dnscrypt-proxy@dnscrypt.eu-dk.socket and dnscrypt-proxy@dnscrypt.eu-nl.socket each would need its own unique port to bind to like below*

```
#dnscrypt-proxy@dnscrypt.eu-nl.socket

[Unit]
Description=dnscrypt-proxy listening socket

[Socket]
ListenStream=
ListenDatagram=
ListenStream=127.0.0.1:5353
ListenDatagram=127.0.0.1:5353

[Install]
WantedBy=sockets.target
```

For the secondary file if you want to create a fallback

```
#dnscrypt-proxy@dnscrypt.eu-dk.socket

[Unit]
Description=dnscrypt-proxy listening socket

[Socket]
ListenStream=
ListenDatagram=
ListenStream=127.0.0.1:5354
ListenDatagram=127.0.0.1:5354

[Install]
WantedBy=sockets.target
```

*Note: we use ports larger than 1000 so the system does not need root to bind and dnscrypt can be started as user, in this case user dnscrypt*

You will then create `dnscrypt-proxy@.service` file in `/etc/systemd/system/` which overrides the orginal in `/usr/lib/systemd/system/`.

This file is rather simple and just contains the start information

```
[Unit]
Description=DNSCrypt client proxy
Documentation=man:dnscrypt-proxy(8)
Requires=dnscrypt-proxy@%i.socket

[Service]
User=dnscrypt
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
Type=notify
NonBlocking=true
ExecStart=/usr/bin/dnscrypt-proxy --ephemeral-keys --resolver-name=%i
Restart=always
```

Once complete just enable and start. On bootup the sockets will start the services automatically.

```
systemctl enable dnscrypt-proxy@dnscrypt.eu-dk.socket
systemctl enable dnscrypt-proxy@dnscrypt.eu-nl.socket
systemctl enable unbound
systemctl start dnscrypt-proxy@dnscrypt.eu-dk
systemctl start dnscrypt-proxy@dnscrypt.eu-nl
systemctl start unbound
```

Finally, to ensure NetworkManager does not try to change your `resolv.conf` file, change the line `dns=default` in `/etc/NetworkManager/NetworkManager.conf` to `dns=none` and add `nohook resolv.conf` to `/etc/dhcpcd.conf`. For good measure to ensure no system process overwrites or adds to resolv.conf I use chattr `sudo chattr +i /etc/resolv.conf`. 

Finally ensure you configure your iptables correctly to only allow certain connections.

My iptables rules are included as well.

[https://github.com/djfordz/unbound_dns](https://github.com/djfordz/unbound_dns)


