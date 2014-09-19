---
layout: post
status: publish
published: true
title: Linux Notes (Bash Shell)
author:
  display_name: David Ford
  login: djfordz
  email: djfordz@gmail.com
  url: http://www.dfwnerd.com
author_login: djfordz
author_email: djfordz@gmail.com
author_url: http://www.dfwnerd.com
wordpress_id: 184
wordpress_url: http://www.dfwnerd.com/?p=184
date: '2014-07-17 23:08:23 -0500'
date_gmt: '2014-07-18 04:08:23 -0500'
categories:
- Reference
- Linux
- Notes
tags:
- Linux
- Notes
- bash
- ".bashrc"
- PATH
comments: []
---
<p>Starting this thread off is an important one to remove duplicate entries in the PATH variable:<br />
<code>export PATH="`echo "$PATH" |&#47;bin&#47;awk 'BEGIN{RS=":";}{sub(sprintf("%c$",10),"");if(A[$0]){}else{A[$0]=1;printf(((NR==1)?"":":")$0)}}'`";<&#47;code><br />
from: <a href="http:&#47;&#47;stackoverflow.com&#47;questions&#47;11650840&#47;linux-remove-path-from-path-variable" title="Stackoverflow" alt="stackoverflow">StackOverflow<&#47;a><br />
I will be adding to this post over the course of the next month so keep checking back</p>
