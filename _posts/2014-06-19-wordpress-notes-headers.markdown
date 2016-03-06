---
layout: post
title: Wordpress Notes on Headers for themes and plugins
author: David Ford
---

###File Headers for Wordpress

from [Wordpress Codex](http://codex.wordpress.org/File_Header)

Just a few reminders for the format of Wordpress file headers needed for Wordpress to call the proper themes and plugins.

This header must go at the top of the plugin's .php file:

{% highlight php %}
<?php
/*
* Plugin Name: Name Of The Plugin
* Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
* Description: A brief description of the Plugin.
* Version: The Plugin's Version Number, e.g.: 1.0
* Author: Name Of The Plugin Author<br />
* Author URI: http://URI_Of_The_Plugin_Author
* License: A "Slug" license name e.g. GPL2
*/
?>
{% endhighlight %}

###This is for the Theme's style.css:

{% highlight css %}
/*
Theme Name: Twenty Thirteen
Theme URI: http://wordpress.org/themes/twentythirteen
Author: the WordPress team
Author URI: http://wordpress.org/
Description: The 2013 theme for WordPress takes us back to the blog, featuring a full range of post formats, each displayed beautifully in their own unique way. Design details abound, starting with a vibrant color scheme and matching header images, beautiful typography and icons, and a flexible layout that looks great on any device, big or small.<
Version: 1.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tags: black, brown, orange, tan, white, yellow, light, one-column, two-columns, right-sidebar, flexible-width, custom-header, custom-menu, editor-style, featured-images, microformats, post-formats, rtl-language-support, sticky-post, translation-ready<br />
Text Domain: twentythirteen
This theme, like WordPress, is licensed under the GPL.
Use it to make something cool, have fun, and share what you've learned with others.
*/

{% endhighlight %}

####Codex

In WordPress Themes and Plugins consist of one or more files of which one has (Drop-Ins, Must-Use-Plugins: can have) so called File Headers containing meta-information (Name, Version, Author, ...) regarding the concrete Theme or Plugin.

File Headers are placed inside a block in the beginning of the file (not necessarily starting on the very first line), one header per line. A Header consists of a Name and a Value.

#####File Header Examples

~~~~
Author (Plugin)
Author URI (Plugin)
Description (Plugin)
Domain Path (Plugin)
Network (Plugin)
Plugin Name (Plugin)
Plugin URI (Plugin)
Site Wide Only (Plugin; deprecated in favor of Network)
Text Domain (Plugin)
Version (Plugin)
~~~~

#####Theme
~~~~
Author (Theme)
Author URI (Theme)
Description (Theme)
Domain Path (Theme)
Status (Theme)
Tags (Theme)
Template (Theme)
Text Domain (Theme)
Theme Name (Theme)
Theme URI (Theme)
Version (Theme)
~~~~
