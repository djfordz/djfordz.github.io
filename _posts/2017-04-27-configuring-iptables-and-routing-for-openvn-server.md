---
layout: post
title: "Configure Iptables and Routing for Openvpn Server"
author: "David Ford"
tags:
- Openvpn
- Linux
- Iptables
- Routing
categories:
- Linux
- Openvpn
introduction: "Configuring Iptables and Set Route for OpenVpn Server"
---

Instead of rewriting post, I am just linking to Arash Milani's post. [How to configure iptables for openvpn](https://arashmilani.com/post?id=53).


```
iptables -A INPUT -i eth0 -m state --state NEW -p udp --dport 1194 -j ACCEPT
iptables -A INPUT -i tun+ -j ACCEPT
iptables -A FORWARD -i tun+ -j ACCEPT
iptables -A FORWARD -i tun+ -o eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i eth0 -o tun+ -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE
iptables -A OUTPUT -o tun+ -j ACCEPT
```

For routing, add this to your server.conf file:

```
client-config-dir ccd
route 172.16.1.0 255.255.255.0
```

Obvious change the route to suite your needs

Create the ccd/<user.conf> file.

```
# /etc/openvpn/ccd/<user>
# Arch linux /etc/openvpn/server/ccd/<user>

iroute 172.16.1.0 255.255.255.0
```

