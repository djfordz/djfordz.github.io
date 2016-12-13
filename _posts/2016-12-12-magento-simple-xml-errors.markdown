---
layout: post
title: Debug Magento Simple XML Errors
author: David Ford
---

This error indicates a parsing problem with one of the module XML files. 

However, by default the error messages donsn't help very much in pinpointing what file is the trouble-maker. Here is a tip to help.

Open up Config.php `located at /lib/Varien/Simplexml/Config.php` and go to line 510:


`$xml = simplexml_load_string($string, $this->_elementClass);`

Below this line, add the following:

`if(!$xml){ Mage::log($string); }`

This snippet will add the offending line and the full text of the offending XML file to your system.xml file so you can fix the error.Â  After correcting the problem, be sure to refresh the Magento cache.Â  Also, remove the troubleshooting line once the problem is fixed. 
