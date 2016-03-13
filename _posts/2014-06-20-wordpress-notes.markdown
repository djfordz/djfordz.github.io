---
title: More Wordpress Notes
author: David Ford
layout: post
---

### A few intricacies of Wordpress

First, let's go ahead and make some instructions on moving the root files to another directory or sub directory.

From the [Wordpress Codex](http://codex.wordpress.org/Giving_WordPress_Its_Own_Directory)

In the `Settings->General` panel change the directory of the Wordpress file system where it says _Wordpress Address(URL)_ to the directory or subdirectory you want the files to exist. Change the _Site Address(URL)_ to the base URL or the URL you want associated with your install. _Copy_, *not move*, the `.htaccess` and `index.php` files to the base URL directory using CPanel, SSH, or FTP.  example of SSH `ssh name@example.com:22` then `cp ~/path/to/working/directory/index.php ~/site/root/directory/` and `cp ~/path/to/working/directory/.htaccess ~/site/root/directory/`.  Finally open up the `index.php` file residing in your site root directory in a text editor either using CPanel, [CodeAnywhere](https://codeanywhere.com), or via FTP and change `require( dirname( __FILE__ ) . '/wp-blog-header.php' );` to `require( dirname( __FILE__ ) . '*working/directory*/wp-blog-header.php' )` get it? got it. good.  

Keep in mind when logging in as admin you still have to navigate to the working directory such as http://example.com/working-directory/wp-admin` and *not* the base URL http://example.com/.

Now with all this done, if you have existing posts or page structure now would be a great time to update your existing permalinks either 
through `Settings->Permalinks` adding the working direcotry to a custom link type, or update the `.htaccess` to point to the working 
directory as such:

You can manually redirect your visitors to the new location in the `.htaccess` file wit this code:
```
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www.)?YourDomain.com$
RewriteRule ^(/)?$ working-directory [L]
```

Really the best way is to update your existing links in your database with the find and replace method to ensure everything points to the new location.  This involves opening up your database in something like phpMyAdmin and going through manually changing each link to the 
proper address. To avoid a serialization issue only do the find and replace on the wp_posts table.  You can use [this script](https://
interconnectit.com/products/search-and-replace-for-wordpress-databases/), or use [this online tool](http://pixelentity.com/wordpress-search-
replace-domain/).  the choice is yours.  Again all this information can be found in the Wordpress Codex [here](http://codex.wordpress.org/
Moving_WordPress#When_Your_Domain_Name_or_URLs_Change).

And just in case you really screw up -- here is some fix it instructions:
Hard coding the URI's into the `wp-login.php` file -- *excerpt from* [Wordpress Codex](http:/codex.wordpress.org/Moving_WordPress#When_Your_Domain_Name_or_URLs_Change)

