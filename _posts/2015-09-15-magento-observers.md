---
layout: post
title: Creating A Magento Observer
---

Observers are a very powerful feature of Magento, and one, when used properly,
will make your life a whole lot easier.  The gist of the entire Event /
Observer relationship in Magento is like this:

Magento has hundreds of events that fire when predetermined events are met.

This is done with the use of `Mage::dispatchEvent('event_to_be_dispatched')`

If one would look in `app/Mage.php` one would see a function called
`dispatchEvent()` this function fires all the events during that specific page
load.  So one easy way of seeing all the events fired is logging the events in
this function using `Mage::log($name)` if you want it displayed in the system log file 
before the return statement or you can use `Zend_debug::dump()` to send the result to the browser, just be sure to `die()`
the loading of the page somewhere along the lines so you can just get the
results.  There are also a few blogs around with an entire list of observers
Magento uses one such list being [Event Observer
List](https://huztechbuzz.wordpress.com/2014/09/03/magento-event-observer-list/).

So now that we have that out of the way. Let's build our own observer.

First we ceate the shell of our module.  Normally I start at the beginning,
creating each file in the order Magento reads them.  First up is our
intialization file at `app/etc/modules/`.

~~~
<!-- app/etc/modules/Dfordz_AwesomeModule.xml -->
<?xml version="1.0"?>
<config> <!-- always start with this -->
    <modules> <!-- always has this -->
        <Dfordz_AwesomeModule> <!-- name of module -->
            <active>true</active> <!-- true/false activates your module in Magento--> 
            <codePool>local</codePool> <!-- where your module is located
            core/community/local -->
        </Dfordz_AwesomeModule>
    </modules>
</config>
~~~

then we create our module directory structure under `app/code/local` as
specified in the initialization xml file under `codePool`.

So I will create:

~~~
app/code/local/Dfordz/
                    |
                    AwesomeModule/
                                |
                                etc/
                                |  |
                                |  config.xml
                                |
                                Model/
                                    |
                                    Observer.php
                                    |
                                    Awesome.php //Model file not necessary just
                                    for an Observer but I like using it so I
                                    include it in my config.
~~~

~~~
<!-- app/code/local/Dfordz/etc/config.xml -->

<config>
    <modules>
        <dfzmodule> <!-- doesn't specifically have to be your modules name, I
        usually shorten the name of my module and set up a standard which
        starts with dfz. -->
            <version>0.0.1</version>
        </dfzmodule>
    </modules>
    <global> <!--this tag depends on where you want your code to affect
    frontend/default/global/catalog -->
        <models>
            <dfzmodule> <!-- shortname of module -->
                <class>Dfordz_AwesomeModule_Model</class>
            </dfzmoudle>
        </models>

        <events>
            <catalog_category_load_after> <!--event which we are going to
            intervene this is called with Mage::dispatchEvent() which we
            discussed above -->
                <observers>
                    <dfzmodule> <!--this is why I add the model class above, if
                    I didn't this would have to be the full name of your module
                    path -->
                        <class>dfzmodule/observer</class> <!-- if you add the
                        model section above you can call your observer this
                        way...there are two different ways of doing this, I am
                        just doing it the way I do it -->
                        <type>model</type> <!-- model/singleton not necessary
                        defaults to model I believe, just putting it in here
                        for posterities sake-->
                        <method>callObserver</method <!-- the function you
                        create in Observer.php -->
                    </dfzmodule>
                </observers>
            </catalog_category_load_after>
        </events>
    </global>
</config>

~~~


~~~
<?php
// app/etc/code/local/Djfordz/AwesomeModule/Awesome.php

class Djfordz_AwesomeModule_Model_Awesome extends Mage_Core_Model_Abstract
{
}
~~~

~~~
<?php
// app/etc/code/local/Djfordz/AwesomeModule/Observer.php

class Djfordz_AwesomeModule_Model_Observer
{
    public function callObserver(Varien_Event_Observer $observer)
    {
        $event = $observer->getEvent();
        // write your code.
    }
}

~~~

well, that is about it for writing an observer. Again, these blog posts are
more for me to find the information I need in one place instead of spending
time searching the web for what I need.  there are a ton of tutorials that do
it better than me, I just want mine in one place.
