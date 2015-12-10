---
layout: post
title: Creating A Magento Observer
category: Magento
tags: Magento, Observers, Modules
---

Observers are a very powerful feature of Magento, and one, when used properly,
will make your life a whole lot easier.  The gist of the entire Event /
Observer relationship in Magento is like this:

Magento has hundreds of events that fire when predetermined events are met.

This is done with the use of `Mage::dispatchEvent('event_to_be_dispatched')`

If one would look in `app/Mage.php` one would see a function called
`dispatchEvent()` this function fires all the events during that specific page
load.  So one easy way of seeing all the events fired is logging the events in
this function using `Mage::log($name, null, 'events.log') which will output the
list in var/log/events.log. You can also find lists all over the internet by
searching for them, one such list being [Event Observer
List](https://huztechbuzz.wordpress.com/2014/09/03/magento-event-observer-list/).

So now that we have that out of the way. Let's build our own observer.

First we ceate the shell of our module.  Normally I start at the beginning,
creating each file in the order Magento reads them.  First up is our
intialization file at `app/etc/modules/`.

{%highlight xml %}

<!-- app/etc/modules/MageForce_MyModule.xml -->

<?xml version="1.0"?>
<config> <!-- always start with this -->
    <modules> <!-- always has this -->
        <MageForce_MyModule> <!-- name of module -->
            <active>true</active> <!-- true/false activates your module in Magento--> 
            <codePool>local</codePool> <!-- where your module is located: core/community/local -->
        </MageForce_MyModule>
    </modules>
</config>
{% endhighlight %}

then we create our module directory structure under `app/code/local` as
specified in the initialization xml file under `codePool`.

So I will create:

~~~
app/code/local/MageForce/
                       |
                       MyModule/
                               |
                               etc/
                               |  |
                               |  config.xml
                               |
                               Model/
                                    |
                                    Observer.php
                                    |
                                    Filename.php
~~~

{% highlight xml%}
<!-- app/code/local/MageForce/MyModule/etc/config.xml -->

<config>
    <modules>
        <MageForce_MyModule> 
            <version>0.0.1</version>
        </MageForce_MyModule>
    </modules>
    <global> <!--this tag depends on where you want your code to affect frontend/default/global/catalog -->
        <models>
            <mfmodule> <!-- shortname of module -->
            <class>MageForce_MyModule_Model</class>
            </mfmodule>
        </models>

        <events>
            <catalog_category_load_after> <!--event which we are going to intervene this is called with Mage::dispatchEvent() which we discussed above -->
                <observers>
                    <mfmodule> <!--this is why I add the model class above, if I didn't this would have to be the full name of your module path -->
                    <class>mfmodule/observer</class>
                        <type>model</type> <!-- model/singleton not necessary defaults to model I believe, just putting it in here for posterities sake-->
                        <method>callObserver</method <!-- the function you create in Observer.php -->
                    </mfmodule>
                </observers>
            </catalog_category_load_after>
        </events>
    </global>
</config>

{% endhighlight %}


{% highlight php %}
<?php
// app/etc/code/local/MageForce/MyModule/Model/Filename.php

class MageForce_MyModule_Model_Filename extends Mage_Core_Model_Abstract
{
}
{% endhighlight %}

{% highlight php %}
<?php
// app/etc/code/local/MageForce/MyModule/Model/Observer.php

class MageForce_MyModule_Model_Observer
{
    public function callObserver(Varien_Event_Observer $observer)
    {
        $event = $observer->getEvent();
        // write your code.
    }
}

{% endhighlight %}

well, that is about it for writing an observer. Again, these blog posts are
more for me to find the information I need in one place instead of spending
time searching the web for what I need.  there are a ton of tutorials that do
it better than me, I just want mine in one place.
