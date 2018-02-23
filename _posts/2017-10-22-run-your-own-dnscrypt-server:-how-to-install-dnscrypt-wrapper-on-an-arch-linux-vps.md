---
layout: post
title: "Run your own dnscrypt server: How to install dnscrypt-wrapper on an Arch Linux VPS"
date: 2017-10-22 11:39:25
image: '/assets/img/dnscrypt.png'
description: 'Run your own dnscrypt server'
tags:
- dnscrypt-wrapper
- dnscrypt-proxy
- Arch Linux
- dnscrypt server
categories:
- Quickies
---

![dnscrypt](http://www.djfordz.com/assets/img/dnscrypt.png)
> DNSCrypt is a network protocol designed by Frank Denis and Yecheng Fu, which authenticates Domain Name System traffic between the user's computer and recursive name servers.

Running your own dnscrypt server isn't too difficult to setup and is one sure way logs of your activities are indeed not kept.

This is a step-by-step instruction guide to setup your own dnscrypt server with dnscrypt-wrapper. I have installed mine on Arch Linux VPS, but with a little alteration these instructions can be followed most anywhere.

Install the  package from the AUR, so you can install it with Yaourt or Packer

```
yaourt -S dnscrypt-wrapper
```

Once installed, you will need to create the keys and setup the init script.

#### For reference please follow instructions on [cofyc/dnscrypt-wrapper](https://github.com/Cofyc/dnscrypt-wrapper)

*Note: You will need run these commands as root. I create and store these keys in `/etc/dnscrypt-wrapper/` this directory will be where I point the init script. Also, you will need to sve the output from the first command `dnscrypt-wrapper --gen-provider-keypair` this is your public key which you will need to connect. If you forget to save it, you can view it again with `dnscrypt-wrapper --show-provider-publickey --provider-publickey-file publicc.key`*

```
dnscrypt-wrapper --gen-provider-keypair

dnscrypt-wrapper --gen-crypt-keypair --crypt-secretkey-file=1.keys
dnscrypt-wrapper --gen-cert-file --crypt-secretkey-file=1.key --provider-cert-file=1.cert --provider-publickey-file=public.key --provider-secretkey-file=secret.key
```

Create an init script in `/etc/systemd/system/dnscrypt-wrapper.service` this will override the default init script.

*replace fbot.is in the example with the name you decide for your own service. You must start `--provider-name` with `2.dnscrypt-cert.`. change `--resolver-address=` to your preferred dns provider you want to pull dns from, such as Google `--resolver-address=8.8.8.8:53` I use `127.0.0.1` because I have unbound setup as my dns server on same vps.*

```
[Unit]
Description=dnscrypt-wrapper
After=network.target

[Service]
Type=simple
Environment="WD=/etc/dnscrypt-wrapper"
User=dnscrypt-wrapper
ExecStart=/usr/bin/dnscrypt-wrapper --resolver-address=127.0.0.1:53 --listen-address=0.0.0.0:5357 --provider-name=2.dnscrypt-cert.fbot.is --crypt-secretkey-file=${WD}/1.key --provider-cert-file=${WD}/1.cert
ExecStop=
Restart=always

[Install]
WantedBy=multi-user.target
```

`Environment` wil point to the directory that holds the keys.

*Note: you must use a port above 1000 if you are not running as User root.  Standard users cannot bind to lower ports, in my example I use port 5357.  Since I have unbound setup, I pull from resolver-address=127.0.0.1:53, if you are not using unbound or any other DNS server, you can substitute the `--resolver-address=` with your preferred DNS provider, like Google `--resolver-address=8.8.8.8:53`. `--provider-name` must start with `2.dnscrypt-cert.<name>`*

Enable and Start the service.
```
systemctl daemon-reload
systemctl enable dnscrypt-wrapper@fbot.is.service
systenctl start dnscrypt-wrapper@fbot.is.service
```

*replace fbot.is with your own unique name*

## Setup dnscrypt-proxy on your localhost to connect with your server

Install dnscrypt-proxy

```
sudo pacman -S dnscrypt-proxy
```

Open `/usr/share/dnscrypt-proxy/dnscrypt-resolvers.csv` in Vim and add your server info to the bottom of the file

Mine would look like this:

```
fbot.is,Primary Transgress Anycast DNS Resolver,Transgress Inc public primary Anycast DNS Resolver,Anycast,,http://transgress.io,1,yes,yes,yes,93.95.227.210:5357,2.dnscrypt-cert.fbot.is,0A5A:7E03:EFA5:102F:14BC:B28F:8B1D:1B98:212F:677E:8006:A120:2279:1799:567B:F009,
```

create a socket and init script in `/etc/systemd/system/`

```
# /etc/systemd/system/dnscrypt-proxy@fbot.is.socket

[Unit]
Description=dnscrypt-proxy listening socket

[Socket]
ListenStream=
ListenDatagram=
ListenStream=127.0.0.1:5352
ListenDatagram=127.0.0.1:5352

[Install]
WantedBy=sockets.target
```

Create init script:

```
# /etc/systemd/system/dnscrypt-proxy@.service

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
#Restart=always
```

Enable the socket and start the service

```
systemctl daemon-reload
systemctl enable dnscrypt-proxy@fbot.is.socket
systemctl start dnscrypt-proxy@fbot.is.socket
systemctl start dnscrypt-proxy@fbot.is.service
```

It should now be able to connect to your dnscrypt server.

If there are issues, check the logs and ensure iptables isn't blocking.
