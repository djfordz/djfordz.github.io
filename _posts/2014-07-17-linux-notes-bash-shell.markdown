---
title: Linux Notes (Bash Shell)
author: David Ford
layout: post
---

Starting this thread off is an important one to remove duplicate entries in the PATH variable:

{% highlight bash %}
export PATH="`echo "$PATH" |/bin/awk 'BEGIN{RS=":";}{sub(sprintf("%c$",10),"");if(A[$0]){}else{A[$0]=1;printf(((NR==1)?"":":")$0)}}'`";
{% endhighlight %}

from: [StackOverflow](http://stackoverflow.com/questions/11650840/linux-remove-path-from-path-variable")

