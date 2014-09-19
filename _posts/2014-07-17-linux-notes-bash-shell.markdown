---
layout: post
title: Linux Notes (Bash Shell)
author: David Ford
categories: linux, bash, notes
---
Starting this thread off is an important one to remove duplicate entries in the PATH variable:
`export PATH="`echo "$PATH" |&#47;bin&#47;awk 'BEGIN{RS=":";}{sub(sprintf("%c$",10),"");if(A[$0]){}else{A[$0]=1;printf(((NR==1)?"":":")$0)}}'`";`

from: [StackOverflow](http://stackoverflow.com/questions/11650840/linux-remove-path-from-path-variable")

I will be adding to this post over the course of the next month so keep checking back
