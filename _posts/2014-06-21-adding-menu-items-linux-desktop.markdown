---
layout: post
title: Adding Menu Items in a Linux Desktop
author: David Ford
categories: linux, notes, xfce4
---

##Linux Desktop Files
So, I know this is an easy one, however I am always fumbling around for the proper code, so I decided to add it here, well because you know...
I am old and my memory isn't working so well. So here it is, adding menu items in a Gnome Desktop Environment. Easy-Peezy except when 
your memory fails you.

With your favorite text editor..umhrm...Sublime Text, create a file in `/usr/share/applications/name-of-file.desktop` obviously ensuring the directory and the file extension are correct as those are rather important.

Here is a basic example from the [Arch Wiki](https://wiki.archlinux.org/index.php/Desktop_Entries) -- The Arch Wiki is my goto for just about anything linux, it is an amazing resource, I suggest you check it out...

~~~~
[Desktop Entry]
Type=Application                          # Indicates the type as listed above
Version=1.0                               # The version of the desktop entry specification to which this file complies
Name=jMemorize                            # The name of the application
Comment=Flash card based learning tool    # A comment which can/will be used as a tooltip
Exec=jmemorize                            # The executable of the application.
Icon=jmemorize                            # The name of the icon that will be used to display this entry
Terminal=false                            # Describes whether this application needs to be run in a terminal or not
Categories=Education;Languages;Java;      # Describes the categories in which this entry should be shown
~~~~

for good measure, here is a line-by-line breakdown,copied from [GnomeDevelopers](https://developer.gnome.org/integration-guide/stable/desktop-files.html.en)
~~~~
[Desktop Entry]
The first line of every desktop file and the section header to identify the block of key value pairs associated with the desktop. Necessary for the desktop to recognize the file correctly.
Type=Application
Tells the desktop that this desktop file pertains to an application. Other valid values for this key are Link and Directory.
Encoding=UTF-8
Describes the encoding of the entries in this desktop file.
Name=Sample Application Name
Names of your application for the main menu and any launchers.
Comment=A sample application
Describes the application. Used as a tooltip.
Exec=application
The command that starts this application from a shell. It can have arguments.
Icon=application.png
The icon name associated with this application.
Terminal=false
Describes whether application should run in a terminal.
Categories=Education;Accessories;Office;Internet;
The submenu where the application will reside under in the menu.
~~~~

So now you know...and I have something I can refer back to if I ever forget again....
