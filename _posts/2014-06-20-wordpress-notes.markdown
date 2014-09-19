---
layout: post
status: publish
published: true
title: More Wordpress Notes
author:
  display_name: David Ford
  login: djfordz
  email: djfordz@gmail.com
  url: http://www.dfwnerd.com
author_login: djfordz
author_email: djfordz@gmail.com
author_url: http://www.dfwnerd.com
wordpress_id: 147
wordpress_url: http://www.dfwnerd.com/?p=147
date: '2014-06-20 03:54:45 -0500'
date_gmt: '2014-06-20 08:54:45 -0500'
categories:
- Wordpress
- Notes
tags:
- Wordpress
- Notes
- moving directories
- changing URLs
comments: []
---
<p>[su_heading size="22" align="left"]A few intricacies of Wordpress[&#47;su_heading]</p>
<p>First, let's go ahead and make some instructions on moving the root files to another directory or sub directory.<br />
From the <a href="http:&#47;&#47;codex.wordpress.org&#47;Giving_WordPress_Its_Own_Directory" title="Giving Wordpress Its Own Directory">Wordpress Codex<&#47;a>:</p>
<p>In the <code>Settings->General<&#47;code> panel change the directory of the Wordpress file system where it says <em>Wordpress Address(URL)<&#47;em> to the directory or subdirectory you want the files to exist. Change the <em>Site Address(URL)<&#47;em> to the base URL or the URL you want associated with your install. <em>Copy<&#47;em>, <strong>not move<&#47;strong>, the <code>.htaccess<&#47;code> and <code>index.php<&#47;code> files to the base URL directory using CPanel, SSH, or FTP.  example of SSH <code>ssh name@example.com:22<&#47;code> then <code>cp ~&#47;path&#47;to&#47;working&#47;directory&#47;index.php ~&#47;site&#47;root&#47;directory&#47;<&#47;code> and <code>cp ~&#47;path&#47;to&#47;working&#47;directory&#47;.htaccess ~&#47;site&#47;root&#47;directory&#47;<&#47;code>.  Finally open up the <code>index.php<&#47;code> file residing in your site root directory in a text editor either using CPanel, <a href="https:&#47;&#47;codeanywhere.com" title="CodeAnywhere">CodeAnywhere<&#47;a>, or via FTP and change <code>require( dirname( __FILE__ ) . '&#47;wp-blog-header.php' );<&#47;code> to <code>require( dirname( __FILE__ ) . '*working&#47;directory*&#47;wp-blog-header.php' );<&#47;code> get it? got it. good.  Keep in mind when logging in as admin you still have to navigate to the working directory such as <code>http:&#47;&#47;example.com&#47;working-directory&#47;wp-admin<&#47;code> and <em>not<&#47;em> the base URL (<code>http:&#47;&#47;example.com<&#47;code>).</p>
<p>Now with all this done, if you have existing posts or page structure now would be a great time to update your existing permalinks either through <code>Settings->Permalinks<&#47;code> adding the working direcotry to a custom link type, or update the <code>.htaccess<&#47;code> to point to the working directory as such:<br />
You can manually redirect your visitors to the new location in the <code>.htaccess<&#47;code> file wit this code:</p>
<pre><code>RewriteEngine On<br />
RewriteCond %{HTTP_HOST} ^(www.)?YourDomain.com$<br />
RewriteRule ^(&#47;)?$ working-directory [L]<br />
<&#47;code><&#47;pre></p>
<p>Really the best way is to update your existing links in your database with the find and replace method to ensure everything points to the new location.  This involves opening up your database in something like phpMyAdmin and going through manually changing each link to the proper address. To avoid a serialization issue only do the find and replace on the wp_posts table.  You can use <a href="https:&#47;&#47;interconnectit.com&#47;products&#47;search-and-replace-for-wordpress-databases&#47;" title="search and replace script">this script<&#47;a>, or use <a href="http:&#47;&#47;pixelentity.com&#47;wordpress-search-replace-domain&#47;" title="search and replace online tool">this online tool<&#47;a>.  the choice is yours.  Again all this information can be found in the Wordpress COdex <a href="http:&#47;&#47;codex.wordpress.org&#47;Moving_WordPress#When_Your_Domain_Name_or_URLs_Change" title="changing your URLs">here<&#47;a>.</p>
<p>And just in case you really screw up -- here is some fix it instructions:<br />
Hard coding the URI's into the <code>wp-login.php<&#47;code> file -- <em>excerpt from<&#47;em> <a href="http:&#47;&#47;codex.wordpress.org&#47;Moving_WordPress#When_Your_Domain_Name_or_URLs_Change" title="URL changes">Wordpress Codex<&#47;a>.</p>
<pre><code>wp-login.php can be used to (re-)set the URIs. Find this line:</p>
<p>require( dirname(__FILE__) . &amp;#039;&#47;wp-load.php&amp;#039; );</p>
<p>and insert the following lines below:</p>
<p>&#47;&#47;FIXME: do comment&#47;remove these hack lines. (once the database is updated)<br />
update_option(&amp;#039;siteurl&amp;#039;, &amp;#039;http:&#47;&#47;your.domain.name&#47;the&#47;path&amp;#039; );<br />
update_option(&amp;#039;home&amp;#039;, &amp;#039;http:&#47;&#47;your.domain.name&#47;the&#47;path&amp;#039; );<br />
<&#47;code><&#47;pre></p>
<p>or</p>
<p><em>symlink<&#47;em> <code>ln -s &#47;path&#47;to&#47;new &#47;path&#47;to&#47;old<&#47;code> and then login, make the changes in the <code>Settings->General<&#47;code> tab and delete the symlink.</p>
<p>This is about it for now...peace...</p>
