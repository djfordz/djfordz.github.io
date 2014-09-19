---
layout: post
status: publish
published: true
title: Wordpress Notes on Headers for themes and plugins
author:
  display_name: David Ford
  login: djfordz
  email: djfordz@gmail.com
  url: http://www.dfwnerd.com
author_login: djfordz
author_email: djfordz@gmail.com
author_url: http://www.dfwnerd.com
wordpress_id: 142
wordpress_url: http://www.dfwnerd.com/?p=142
date: '2014-06-19 17:56:42 -0500'
date_gmt: '2014-06-19 22:56:42 -0500'
categories:
- Wordpress
- Notes
tags:
- coding
- Wordpress
- Notes
- Templates
- Headers
comments: []
---
<p>[su_heading size="22" align="left"]File Headers for Wordpress[&#47;su_heading]<br />
<em>from<&#47;em> <a title="Wordpress Codex - File Header" href="http:&#47;&#47;codex.wordpress.org&#47;File_Header">Wordpress Codex<&#47;a></p>
<p>Just a few reminders for the format of Wordpress file headers needed for Wordpress to call the proper themes and plugins.</p>
<h3>This header must go at the top of the plugin's .php file:<&#47;h3></p>
<pre><?php<br />
&#47;**<br />
 * Plugin Name: Name Of The Plugin<br />
 * Plugin URI: http:&#47;&#47;URI_Of_Page_Describing_Plugin_and_Updates<br />
 * Description: A brief description of the Plugin.<br />
 * Version: The Plugin's Version Number, e.g.: 1.0<br />
 * Author: Name Of The Plugin Author<br />
 * Author URI: http:&#47;&#47;URI_Of_The_Plugin_Author<br />
 * License: A "Slug" license name e.g. GPL2<br />
 *&#47;<br />
?><br />
<&#47;pre></p>
<h3>This is for the Theme's style.css:<&#47;h3></p>
<pre>&#47;*<br />
Theme Name: Twenty Thirteen<br />
Theme URI: http:&#47;&#47;wordpress.org&#47;themes&#47;twentythirteen<br />
Author: the WordPress team<br />
Author URI: http:&#47;&#47;wordpress.org&#47;<br />
Description: The 2013 theme for WordPress takes us back to the blog, featuring a full range of post formats, each displayed beautifully in their own unique way. Design details abound, starting with a vibrant color scheme and matching header images, beautiful typography and icons, and a flexible layout that looks great on any device, big or small.<br />
Version: 1.0<br />
License: GNU General Public License v2 or later<br />
License URI: http:&#47;&#47;www.gnu.org&#47;licenses&#47;gpl-2.0.html<br />
Tags: black, brown, orange, tan, white, yellow, light, one-column, two-columns, right-sidebar, flexible-width, custom-header, custom-menu, editor-style, featured-images, microformats, post-formats, rtl-language-support, sticky-post, translation-ready<br />
Text Domain: twentythirteen</p>
<p>This theme, like WordPress, is licensed under the GPL.<br />
Use it to make something cool, have fun, and share what you&amp;#039;ve learned with others.<br />
*&#47;<br />
<&#47;pre><br />
Codex</p>
<p>In WordPress Themes and Plugins consist of one or more files of which one has (Drop-Ins, Must-Use-Plugins: can have) so called File Headers containing meta-information (Name, Version, Author, ...) regarding the concrete Theme or Plugin.</p>
<p>File Headers are placed inside a block in the beginning of the file (not necessarily starting on the very first line), one header per line. A Header consists of a Name and a Value.<br />
File Header Examples</p>
<pre><code>Author (Plugin)<br />
Author URI (Plugin)<br />
Description (Plugin)<br />
Domain Path (Plugin)<br />
Network (Plugin)<br />
Plugin Name (Plugin)<br />
Plugin URI (Plugin)<br />
Site Wide Only (Plugin; deprecated in favor of Network)<br />
Text Domain (Plugin)<br />
Version (Plugin)<br />
<&#47;code><&#47;pre><br />
Theme</p>
<pre><code>Author (Theme)<br />
Author URI (Theme)<br />
Description (Theme)<br />
Domain Path (Theme)<br />
Status (Theme)<br />
Tags (Theme)<br />
Template (Theme)<br />
Text Domain (Theme)<br />
Theme Name (Theme)<br />
Theme URI (Theme)<br />
Version (Theme)<br />
<&#47;code><&#47;pre></p>
