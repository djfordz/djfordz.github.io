---
categories:
  - 'chrome apps'
comment: 
date: 2016/01/02
info: 
layout: post
published: true
sha: 77bda1d8442c841d3faf339191176f0beb773a9c
slug: the-post-2935
tags:
  - chrome
  - ' app'
  - ' javascript'
  - ' jekyll'
title: 'For Mom, With Love.'
type: post

---
I wrote my first chrome app today.  After fumbling around for a few days, trying to figure out how chrome reads and writes to itself, I was quite amazed I was able to get this far.  Understanding Google documentation, I am finding, is a bit difficult for a beginner.  However, I was determined to put together an app which would enable my mother to write and publish to her Jekyll Blog.  Luckily for me, an amazing chinese developer whom goes by shinemoon on github already had a jekyll app for chrome written and the source code published, which made my life much simpler since all I had to do was modify his code.  He put together a pretty simple editor, the major problem being was it was a markdown editor, and well, my mother is a traditional writer without the knowledge, nor the ambition to learn Markdown however great it actually is. My primary objective was to find a decent non-markdown editor which would be capable of simple blogging and a platform which would upload the written article to a Jekyll blog hosted on Github.  A simple Google search led me to an entire laundry list of editors which were open sourced and ready to go.  However, one in particular caught my eye.Medium-Editor by yabwe.   Guys, this tiny editor is awesome! Seriously!  It isn't associated with Medium, however it is built by fans.  I would recommend this awesome WYSIWYG editor-like drop-in to anyone who needs an awesome-looking comment box, any type of review writing, article, or blogging.  It is super simple to implement, and is feature rich with great documentation.  Kudos to the team who brought us Medium-Editor.Keep it simple stupidSo with an easy to use simple editor in my toolbox, an already created chrome app in there as well, it was dead simple to combine the two.  All the code which communicated with github was already written, so all I had to do was remove the editor in the chrome app and replace it with the Medium Editor.  Easy right? I thought so too, However, the way chrome is designed, getting things to work properly inside the app environment takes a lot of reading and practice.  Try writing one line of Javacript inside a script tag in index.html; it doesn't let you as it is against Chrome's security policy.  Everything has to be injected through content scripts.  So did I really write an app? No, I modified an exiting one, but in doing so I learned quite a bit and am now ready to tackle an entire app from the beginning.Here is my app.  It still needs some work, like a scrollbar and a way to delete images, but for the most part, it works pretty well. +