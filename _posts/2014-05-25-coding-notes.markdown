---
layout: post
status: publish
published: true
title: Coding Notes
author:
  display_name: David Ford
  login: djfordz
  email: djfordz@gmail.com
  url: http://www.dfwnerd.com
author_login: djfordz
author_email: djfordz@gmail.com
author_url: http://www.dfwnerd.com
wordpress_id: 114
wordpress_url: http://www.dfwnerd.com/?p=114
date: '2014-05-25 16:31:27 -0500'
date_gmt: '2014-05-25 21:31:27 -0500'
categories:
- Coding
- Reference
- Wordpress
- Personal
tags:
- Coding Notes
- Personal Notes
- Coding Help
comments: []
---
<p>[su_heading size="22" align="left"]The beginning of my Coding Notes--Sort of like Google Keep but not... >>[&#47;su_heading]</p>
<h2>Coding Notes<&#47;h2></p>
<p>So first things first-- After setting up a local server to bust out my bad a** web apps and Wordpress templates...turns out when attempting to download plugins and templates from the interwebs an FTP Credentials page pops up and will not allow me to finish stealing all my stuff off the interwebs...thus I found the solution and am adding it as my first very important note:</p>
<h4>Note 1<&#47;h4></p>
<p>found on  <a href="http:&#47;&#47;wordpress.stackexchange.com&#47;questions&#47;57166&#47;ftp-credentials-on-localhost" title="Localhost FTP Credential Error">Stack Exchange<&#47;a></p>
<p>add the following to <code>wp-config.php<&#47;code></p>
<pre><code>define('FS_METHOD','direct');<br />
<&#47;code><&#47;pre></p>
