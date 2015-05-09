---
layout: post
title: Linux: adding a directory to the path
---

###Adding path variables

This one is an easy one, so I don't really know why I keep forgetting it when I need it.

Regardless, here it is.

to add to the beginning of the path, add to either .bashrc, or .bash_profile

````
export PATH="${path}:/path/to/dir/"
````

and to the end of path

````
export PATH="/path/to/dir/:{path}"
````

and that is it!