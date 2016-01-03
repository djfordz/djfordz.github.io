---
layout: post
title: Keeping a footer at the bottom of the page
author: DAvid Ford
categories: notes, html
---
So this is something I always have to google and seem to forget a little too frequently. So I am adding it to my notes. Here is a simple and easy way to keep a footer at the bottom of a apge regardless how much content is on the page from [CSS Reset](http://www.cssreset.com/how-to-keep-footer-at-bottom-of-page-with-css)

Those guys have a great tutorial and explain it in depth. All I'm going to do here is add the code so I have an easy place for me to refer back to in the future.

####The HTML

{% highlight html %}

<body>
<div id="wrapper">
<div id="header">
<div id="content">
<div id="footer">
</body>

{% endhighlight %}

####The CSS

{% highlight css %}

html, body {
    margin:0;
    padding:0;
    height:100%;
    }
#wrapper {
    min-height:100%;
    position:relative;
    }
#header {
    padding:10px;
    background:#5ee;
    }
#content {
    padding:10px;
    padding-bottom:80px; /* Height of the footer element */
    }
#footer {
    width:100%;
    height:80px;
    position:absolute;
    bottom:0;
    left:0;
    background:#ee5;
    }

{% endhighlight %}

