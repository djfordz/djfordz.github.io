---
layout: post
title: Configuring your Linux system for Harvard's CS50 Course
Category: CS50, Tutorials, Programming
---

###Sometimes using the appliance isn't an option.

When I first started Harvard's CS50 course, I was using a very old system which didn't have support for hardware virtualization, which in turn caused any virtual environment to be sluggish and unresponsive.  So much so, that getting any type of work on it was near impossible.  This dilemma is what led me to install and configure my base linux system to mimic the appliance when compiling C code, entailing installing the CS50 library, configuring make to use clang with the proper flags, and also configuring check50 to ensure my programs would have passing marks when submitted.  In this article, I will be discussing how I configured my base system to mimic features of the CS50 Appliance.

####Downloading, compiling, and installing the CS50 Library

_credit sources_ [CS50 Stack Exchange](http://cs50.stackexchange.com/questions/1045/how-to-compile-the-cs50-library-on-another-linux-distro)

First, we need to get a copy of the library files which include cd50.h and cs50.c, luckily they have a github repository setup with the required files.  [CS50 Library](https://github.com/cs50/library50-c "CS50 Library").  

Or you can use wget to retrieve the library.

`wget http://mirror.cs50.net/library50/c/library50-c-5.zip`

Extract the files in any directory you like, for this example I extracted to `~/cs50library` next compile the source code using either clang or gcc 

`gcc -c -Wall -Werror -fpic cs50.c` 

this will create a new file with the object code or a file with a .o extension, we need in the next step, which in turn we will need to compile to a shared library, which we will call libcs50.so

`gcc -shared -o libcs50.so cs50.o`

After this you should see a libcs50.so file in your working directory, we then need to copy this file to your /usr/lib dir, you will need root priviledges for this.

`sudo cp libcs50.so /usr/lib/`

on some systems, like Ubuntu we will need to install to the usr/local/include dir.

`sudo cp libcs50.so /usr/local/include`

then we need to copy the .h file to the include directory

`sudo cp cs50.h /usr/include/` //note sometimes this directory will be /usr/local/include/ depending on the system.

lastly, for good measure, lets change the owner and permissions to ensure we can use these files.

`sudo chown root:root /usr/include/cs50.h && sudo chmod 0644 /usr/include/cs50.h`

or

`sudo chown root:root /usr/include/cs50.h && sudo chmod 0644 /usr/local/include/cs50.h`

and

`sudo chown root:root /usr/include/cs50.h && sudo chmod 0644 /usr/lib/libcs50.so`

or

`sudo chown root:root /usr/include/cs50.h && sudo chmod 0644 /usr/local/lib/libcs50.so`

depending on where you copied the files to.

and that is it.  You should now be able to use the cs50 library.

####Quick and easy for Ubuntu and Debian

become root
`su`

install gcc if not already installed.

`apt-get install gcc`

Download and install library library.

~~~~
wget http://mirror.cs50.net/library50/c/library50-c-5.zip
unzip library50-c-5.zip
rm -f library50-c-5.zip
cd library50-c-5
gcc -c -ggdb -std=c99 cs50.c -o cs50.o
ar rcs libcs50.a cs50.o
chmod 0644 cs50.h libcs50.a
mkdir -p /usr/local/include
chmod 0755 /usr/local/include
mv -f cs50.h /usr/local/include
mkdir -p /usr/local/lib
chmod 0755 /usr/local/lib
mv -f libcs50.a /usr/local/lib
cd ..
rm -rf library50-c-5
~~~~

####Configuring make to use clang

After installing the library, we will need some way of configuring make to use clang with the proper flags.  There are many wayd of doing this, however, I will show the easiest.  creating an alias in your .bashrc file.  Open your .bashrc file in an editor, .bashrc can be found at the root of your home directory ~/.bashrc, it is a hidden file, so to see it you will have to use `ls -a ~/`.  and simply create an alias.  I used make50 as the command to make to differentiate my system make and cs50 make

`# make for CS50
alias make50='make CC=clang CFLAGS="-ggdb3 -O0 -std=c99 -Wall -Werror" LDLIBS="-lcs50 -lm"'`

now source your bashrc file or re-login to your system

`source ~/.bashrc`

and you should be good to go.  Next up will be installing check50, until then have a great day!
