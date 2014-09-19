---
layout: post
status: publish
published: true
title: Coding Notes
author: David Ford
categories: notes, coding
---
##The beginning of my Coding Notes--Sort of like Google Keep but not... >>

###Coding Notes
So first things first-- After setting up a local server to bust out my bad a** web apps and Wordpress templates...turns out when attempting to download plugins and templates from the interwebs an FTP Credentials page pops up and will not allow me to finish stealing all my stuff off the interwebs...thus I found the solution and am adding it as my first very important note:

####Note 1
found on  [Stack Exchange](http://wordpress.stackexchange.com/questions/57166/ftp-credentials-on-localhost" title="Localhost FTP Credential Error)
add the following to `wp-config.php`
~~~~
define('FS_METHOD','direct');
~~~~
