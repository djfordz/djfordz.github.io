---
layout: post
status: publish
published: true
title: Keeping a footer at the bottom of the page
author:
  display_name: David Ford
  login: djfordz
  email: djfordz@gmail.com
  url: http://www.dfwnerd.com
author_login: djfordz
author_email: djfordz@gmail.com
author_url: http://www.dfwnerd.com
wordpress_id: 188
wordpress_url: http://www.dfwnerd.com/?p=188
date: '2014-07-29 21:39:02 -0500'
date_gmt: '2014-07-30 02:39:02 -0500'
categories:
- Coding
- CSS
- Notes
tags:
- html
- footer
- CSS
comments: []
---
<p>So this is something I always have to google and seem to forget a little too frequently. So I am adding it to my notes. Here is a simple and easy way to keep a footer at the bottom of a apge regardless how much content is on the page from <a href="http:&#47;&#47;www.cssreset.com&#47;how-to-keep-footer-at-bottom-of-page-with-css&#47;">CSS Reset<&#47;a>.<br />
Those guys have a great tutorial and explain it in depth. All I'm going to do here is add the code so I have an easy place for me to refer back to in the future.</p>
<h3 class="com">The HTML<&#47;h3></p>
<pre class="com"><span class="tag"><body></p>
<div <&#47;span><span class="atn">id<&#47;span><span class="pun">=<&#47;span><span class="atv">"wrapper"<&#47;span><span class="tag">></p>
<div <&#47;span><span class="atn">id<&#47;span><span class="pun">=<&#47;span><span class="atv">"header"<&#47;span><span class="tag">><&#47;div></p>
<div <&#47;span><span class="atn">id<&#47;span><span class="pun">=<&#47;span><span class="atv">"content"<&#47;span><span class="tag">><&#47;div></p>
<div <&#47;span><span class="atn">id<&#47;span><span class="pun">=<&#47;span><span class="atv">"footer"<&#47;span><span class="tag">><&#47;div><br />
<&#47;div><br />
<&#47;body><&#47;span><&#47;pre></p>
<h3>The CSS<&#47;h3></p>
<pre>    html,<br />
    body {<br />
    margin:0;<br />
    padding:0;<br />
    height:100%;<br />
    }<br />
    #wrapper {<br />
    min-height:100%;<br />
    position:relative;<br />
    }<br />
    #header {<br />
    padding:10px;<br />
    background:#5ee;<br />
    }<br />
    #content {<br />
    padding:10px;<br />
    padding-bottom:80px; &#47;* Height of the footer element *&#47;<br />
    }<br />
    #footer {<br />
    width:100%;<br />
    height:80px;<br />
    position:absolute;<br />
    bottom:0;<br />
    left:0;<br />
    background:#ee5;<br />
    }<br />
<&#47;pre><br />
and for older IE browsers--a conditional statement</p>
<pre><!--[if lt IE 7]></p>
<style type="text&#47;css">
 #wrapper { height:100%; }<br />
 <&#47;style><br />
 <![endif]--><&#47;pre></p>
