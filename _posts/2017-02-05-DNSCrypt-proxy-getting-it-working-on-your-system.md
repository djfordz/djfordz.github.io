# How to setup a Personal Resolving DNS Server with Unbound and DNSCrypt-proxy on Arch Linux.

## Note: If you find serious flaws in this configuration, please write an issue so I can research/fix it. I am still a noob when it comes to network configuration and I take security and privacy seriously, I would like to know if my configuration is flawed.

On my quest for knowledge of Network Administration and Security I thought it would be fun to setup a local DNS Server to better control how I connect to the internet.

Included is my local network setup.  I want to point out a few important issues to ensure privacy and security are upheld.

First /etc/resolv.conf is super important.  Anything in this file can and will give you away and will be used for your nameserver connection.  It is important to ensure this file does not get randomly changed, which any dhscp server will do, including using openresolv.  TO ensure this file is never changed, I user the command:
`chattr +i /etc/resolv.conf`

In `/etc/resolv.conf` the only nameserver that should be in it is your localhost when using Unbound.

```
# /etc/resolve.conf

nameserver 127.0.0.1
```

Secondly, it is very important to setup dnscrypt-proxy correctly and unbound correctly to ensure you are getting the highest security without leaks.

Arch Linux Wiki is the best wiki out there to reference for setting up just about any type of Linux Software and I use the expertise of the Arch Linux Community to ensure I understand how things work.
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

This is also very important, if you use anything else in forward-zone, it can bypass your dnscrypt setup and that is not good.

DNSCrypt-proxy is where I had the most trouble setting up.

Follow the [Arch Linux DNSCrypt-proxy wiki](https://wiki.archlinux.org/index.php/DNSCrypt)

Make the systemd files as required, using `/usr/share/dnscrypt-proxy/dnscrypt-resolvers.csv` as reference.

I have the files created in `etc/systemd/system/` for your reference.

```
systemctl enable dnscrypt-proxy@dnscrypt.eu-dk
systemctl enable dnscrypt-proxy@dnscrypt.eu-nl
systemctl enable unbound
systemctl start dnscrypt-proxy@dnscrypt.eu-dk
systemctl start dnscrypt-proxy@dnscrypt.eu-nl
systemctl start unbound
```

Finally, to ensure NetworkManager does not try to change your `resolv.conf` file, change the line `dns=default` in `/etc/NetworkManager/NetworkManager.conf` to `dns=none`. Even though we use chattr +i to ensure no other program can change the resolv.conf file, it is good to change the conf files in the other programs to ensure they don't even try to.

In `/etc/dhcpcd.conf` ensure you also add:
`nohook resolv.conf`

Lastly, I use Private Internet Access VPN to connect as well, so I have a bit more configuration, but ultimately this will ensure dnscrypt-proxy is always used with your local dns server.

Finally ensure you configure your iptables correctly to only allow certain connections.

My iptables rules are included as well.


