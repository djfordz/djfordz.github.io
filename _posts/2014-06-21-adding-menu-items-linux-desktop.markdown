---
layout: post
status: publish
published: true
title: Adding Menu Items in a Linux Desktop
author:
  display_name: David Ford
  login: djfordz
  email: djfordz@gmail.com
  url: http://www.dfwnerd.com
author_login: djfordz
author_email: djfordz@gmail.com
author_url: http://www.dfwnerd.com
wordpress_id: 150
wordpress_url: http://www.dfwnerd.com/?p=150
date: '2014-06-21 23:38:44 -0500'
date_gmt: '2014-06-22 04:38:44 -0500'
categories:
- Reference
- Linux
- Notes
tags:
- Linux
- Notes
- Desktop Files
- Gnome
comments: []
---
<p>[su_heading size="22" align="left"]Linux Desktop Files[&#47;su_heading]<br />
So, I know this is an easy one, however I am always fumbling around for the proper code, so I decided to add it here, well because you know...I am old and my memory isn't working so well. So here it is, adding menu items in a Gnome Desktop Environment. Easy-Peezy except when your memory fails you.</p>
<p>With your favorite text editor..umhrm...Sublime Text, create a file in <code>&#47;usr&#47;share&#47;applications&#47;name-of-file.desktop<&#47;code> obviously ensuring the directory and the file extension are correct as those are rather important.</p>
<p>Here is a basic example from the <a title="Desktop Entries" href="https:&#47;&#47;wiki.archlinux.org&#47;index.php&#47;Desktop_Entries">Arch Wiki<&#47;a> -- The Arch Wiki is my goto for just about anything linux, it is an amazing resource, I suggest you check it out...</p>
<pre><code>[Desktop Entry]<br />
Type=Application                          # Indicates the type as listed above<br />
Version=1.0                               # The version of the desktop entry specification to which this file complies<br />
Name=jMemorize                            # The name of the application<br />
Comment=Flash card based learning tool    # A comment which can&#47;will be used as a tooltip<br />
Exec=jmemorize                            # The executable of the application.<br />
Icon=jmemorize                            # The name of the icon that will be used to display this entry<br />
Terminal=false                            # Describes whether this application needs to be run in a terminal or not<br />
Categories=Education;Languages;Java;      # Describes the categories in which this entry should be shown<&#47;code><&#47;pre><br />
for good measure, here is a line-by-line breakdown,&nbsp; copied from <a title="Desktop Files" href="https:&#47;&#47;developer.gnome.org&#47;integration-guide&#47;stable&#47;desktop-files.html.en">GnomeDevelopers<&#47;a>:</p>
<dl>
<dt>[Desktop Entry]<&#47;dt>
<dd>The first line of every desktop file and the section header to identify the block of key value pairs associated with the desktop. Necessary for the desktop to recognize the file correctly.<&#47;dd>
<dt>Type=Application<&#47;dt>
<dd>Tells the desktop that this desktop file pertains to an application. Other valid values for this key are Link and Directory.<&#47;dd>
<dt>Encoding=UTF-8<&#47;dt>
<dd>Describes the encoding of the entries in this desktop file.<&#47;dd>
<dt>Name=Sample Application Name<&#47;dt>
<dd>Names of your application for the main menu and any launchers.<&#47;dd>
<dt>Comment=A sample application<&#47;dt>
<dd>Describes the application. Used as a tooltip.<&#47;dd>
<dt>Exec=application<&#47;dt>
<dd>The command that starts this application from a shell. It can have arguments.<&#47;dd>
<dt>Icon=application.png<&#47;dt>
<dd>The icon name associated with this application.<&#47;dd>
<dt>Terminal=false<&#47;dt>
<dd>Describes whether application should run in a terminal.<&#47;dd>
<dt>Categories=Education;Accessories;Office;Internet;<&#47;dt>
<dd>The submenu where the application will reside under in the menu.<&#47;dd><&#47;dl></p>
<p>While we are on the subject, we can edit the entire menu through the use of XML by following these instructuions. <strong>Caution<&#47;strong> this is only for Xfce4 and is referenced from <a title="Xfce" href="https:&#47;&#47;wiki.archlinux.org&#47;index.php&#47;xfce">Arch Wiki<&#47;a><br />
We start by creating a <code>~&#47;.config&#47;menus&#47;xfce-applications.menu<&#47;code> file and writing some XML as shown:</p>
<pre><!DOCTYPE Menu PUBLIC "-&#47;&#47;freedesktop&#47;&#47;DTD Menu 1.0&#47;&#47;EN"></p>
<menu>
 <name>Xfce<&#47;name><br />
 <mergefile type="parent">&#47;etc&#47;xdg&#47;menus&#47;xfce-applications.menu<&#47;mergefile><br />
<exclude><br />
 <filename>xfce4-run.desktop<&#47;filename><br />
<filename>exo-terminal-emulator.desktop<&#47;filename><br />
 <filename>exo-file-manager.desktop<&#47;filename><br />
 <filename>exo-mail-reader.desktop<&#47;filename><br />
 <filename>exo-web-browser.desktop<&#47;filename><br />
<filename>xfce4-about.desktop<&#47;filename><br />
 <filename>xfhelp4.desktop<&#47;filename><br />
 <&#47;exclude><br />
<layout><br />
 <merge type="all"><&#47;merge><br />
 <separator><&#47;separator></p>
<menuname>Settings<&#47;menuname><br />
 <separator><&#47;separator><br />
<filename>xfce4-session-logout.desktop<&#47;filename><br />
 <&#47;layout><br />
<&#47;menu><&#47;pre><br />
It is important to note the <mergefile> tag as this file appends the parent file located at &#47;etc&#47;xdg&#47;menus&#47;xfce-applications.menu.</p>
<p>You can also copy over your entire &#47;usr&#47;share&#47;applications&#47;*.desktop files to ~&#47;.local&#47;share&#47;applications&#47; before you go around emssing with them so you will have a local set of files which will only be available when you log in as that user, plus it preserves the global files to boot.</p>
<p>For added posterity, add any of these after you call your application on the command line for extra points (where Exec= is after you call your application).</p>
<ol>
<li>%f a single filename.<&#47;li>
<li>%F multiple filenames.<&#47;li>
<li>%u a single URL.<&#47;li>
<li>%U multiple URLs.<&#47;li>
<li>%d a single directory. Used in conjunction with %f to locate a file.<&#47;li>
<li>%D multiple directories. Used in conjunction with %F to locate files.<&#47;li>
<li>%n a single filename without a path.<&#47;li>
<li>%N multiple filenames without paths.<&#47;li>
<li>%k a URI or local filename of the location of the desktop file.<&#47;li>
<li>%v the name of the Device entry.<&#47;li><br />
<&#47;ol><br />
So now you know...and I have something I can refer back to if I ever forget again....</p>
