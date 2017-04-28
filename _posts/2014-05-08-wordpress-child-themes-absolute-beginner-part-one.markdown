---
layout: post
title: Wordpress Child Themes
author: David Ford
---

Since I started working with Wordpress, it wasn't long before it had become apparent that learning to make a child theme is pretty much a necessessity.  I have yet to invest the time and effort to make a theme of my own from scratch, however the more child themes I practice with, and the more tweaking I do, makes me believe I am almost ready to tackle a theme of my own from scratch.  One feature of Wordpress which makes the platform superbly awesome, yet unbelievably frustrating is the use of functions and hooks.  Yes, you can customize anything in Wordpress, however learning your way around functions and hooks can become nightmarish....especially because there is not much help outside of the Codex...and the Codex reads like Ancient Egyptian Sanscrit.

This article is by no means a professional nor most likely proper way of doing things, as I sort of rednecked my way through it many times over, but I can honestly say, Wordpress has become less of an anomaly and I can now make some sense of php and functions.  So get to work on your own child theme, keep adding to it-- and as your skill level progresses so will the evolution of your theme to the point of making an awesome purely custom theme from scratch.

### Without much more ado..let's get started

Obviously the very first thing you must do is pick a theme to rip off.  The initial theme can be as easy or as complicated as you want to take on.  My recommendation is start small.  Pick a theme without too much extravegance.  Picking something like [Hueman](http://alxmedia.se/themes/hueman/) as your first theme to dissect is probably not a good idea.  Pick something middle of the road with an easy `functions.php` and `theme_options.php` files is a best bet.  The themes which come with Wordpress itself are pretty good starters as the code is clean and they are simple enough to make sense of.  In fact, I will be using TwentyFourteen for this walk through.

We will use the [Wordpress Codex](http://codex.wordpress.org/Child_Themes) as our reference.

Plenty of others have written on this very subject, so one should not have any trouble finding extra instruction for any questions.  Although, hopefully I will be able to put it all together in one place.

What I like to do is make a folder in the themes folder for the child theme-- naming it after the parent theme is generally a best practice.  Thus, `/path/to/blog/wordpress/wp-content/themes/twentyfouteen-child` would be my first step.  I like adding a random screenshot image to the child theme folder at this point just so when I switch to the child theme in the administration menu there is an actual picture accompanying the child theme--this screenshot can be any picture aptly names `screenshot.png`.  I will change this later after the theme has been modified.

Then I will make my first file called style.css in the child theme folder. Of course I will add the obligatory header to my `style.css` file.  This commented header is <strong>not</strong> a suggestion, it is absolutely <strong>required</strong> and must be at the beginning of the `style.css` file.


```
/*
 Theme Name:   Twenty Fourteen Child
 Theme URI:    http://example.com/twenty-fourteen-child/
 Description:  Twenty Fourteen Child Theme
 Author:       John Doe
 Author URI:   http://example.com
 Template:     twentyfourteen
 Version:      1.0.0
 Tags:         light, dark, two-columns, right-sidebar, responsive-layout, accessibility-ready
 Text Domain:  twenty-fourteen-child
/*

@import url("../twentyfourteen/style.css");

/* =Theme customization starts here
-------------------------------------------------------------- */
```

The `@import` is obviously very important to get right as it tells this file to reference the parent stylesheet to style your theme.  Also `Template` must be filled out with the folder of the parent theme--*exactly*-- with correct capitalization and the like if it exists.

The CSS you add to the child theme `style.css` file will replace or add on to the CSS of the parent theme, thus it is not necessary to copy the entire .css file over, just replace or add on CSS as necessary.

I would be remiss here to not tell you to get a good code editor.  My absolute favorite is [Sublime Text](http://www.sublimetext.com) and a close second if not already usurped Sublime Text is [Brackets](http://brackets.io).  I do like [Notepad++](http://notepad-plus-plus.org/) for Windows for a backup but I normally always use Brackets or Sublime as a run an Arch Linux machine.  Sublime requires a license but is free to try indefinitely (I think that Sublime 3 now requires a license up front, but you can still use Sublime 2 indefinitely).  Brackets is under the GPL without restriction.  Brackets is awesome just fyi.

From here on out, you will simply create new files for the parent theme; files you want to change.  It gets a little tricky when we get to the functions.php file--the brains of your theme.  Let's concentrate on styling our theme for now.

This is where modifying the theme gets a bit tedious.  You have to find the correct id and class tags in the parent `style.css` and copy them over to your child file to change the styling.  or you can go through the header.php, index.php, page.php, footer.php, sidebar.php files and find the correct id's and class's to use in your child stylesheet.

Some tips for making a theme your own.

Change the font.  Add Google fonts capability to your theme.

you can do this by either adding an wp_enqueue_style remark in your functions.php file, which I will show you how to do in the next post, adding a `http://fonts.googleapis.com/css?family= rel='stylesheet' type='text/css'`

or using the `@import` in your .css file are all sufficient to add unique stylish fonts to your child theme.

Change colors and backgrounds.  Obviously this is easily done by changing the CSS where required.

Adding widgetized areas to the header or footer.  Again, this will be discussed in the next section when we tackle the `functions.php` file.

create your own header and footer.  This is done by creating a `header.php` and `footer.php` files in your child-theme directory and styling them as you like.  These will replace the header and footer files in your parent theme.

In the end, you are only limited by your imagination.  Creating a child theme is a great way to get started on learning the Wordpress Codex, some PHP and CSS, and get you well on your way to making your own Wordpress theme from scratch.  We will cover the most important functions.php and theme-options.php files in our next segment.  Once you learn how to successfully alter these files, the rest should be a breeze.
