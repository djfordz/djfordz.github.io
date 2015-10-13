---
layout: post
title: Creating an entire Magento Module From Scratch
category: Magento
tags: Magento, Module, Extension
---

##A Magento 1.0 Module from beginning to end

When starting a module I like to start the same way Magento reads the module. From the `app/etc/modules/<file>.xml`, to the `app/etc/code/local/Namespace/Module/etc/config.xml` and so on.  This is obviously preference, but it will be how this post will be written.

####Note: Since this is mainly notes to myself, in depth explainations of the myriad intricacies of Magento will be at a minimum and only the necessary code to create the module will be included.  There are plenty of other blog posts and tutorials which break down each section and give deep explainations, however I need a reference that has the entirety of the module in one place so I am not spending hours looking for each section I need.

{% highlight xml %}

<!-- app/etc/modules/Namespace_Module.xml -->
<?xml version="1.0"?>
<config>
    <modules>
        <Namespace_Module>
            <active>true</active>
            <codePool>local</codePool>
            <depends>
                <!-- only needed if module is depending on another module which in turn would need to load first, thus this would ensure the module loads first -->
            </depends>
        </Namespace_Module>
    </modules>
</config>
{% endhighlight %}

Here are some blogs with a better explaination of the config.xml input values [Magento Wiki](https://wiki.magento.com/display/m1wiki/config.xml+Reference)
another one [econdev](http://www.ecomdev.org/2010/08/31/magento-module-configuration-file-reference.html)
and here [Tuts Tutorial](http://code.tutsplus.com/tutorials/custom-back-end-configuration-in-magento--cms-23265)

{% highlight xml %}

<!-- app/code/local/Namespace/Module/etc/config.xml -->
<?xml version="1.0"?>
<config>
    <modules>
        <Namespace_Module>
            <version>0.1.0</version>
        </Namespace_Module>
    </modules>
    
    <frontend>
        <routers>
            <shortname>
                <use>standard</use>
                <args>
                    <module>Namespace_Module</module>
                    <frontName>shortname</frontName>
                </args>
            </shortname>
        </routers>

        <layout>
            <updates>
                <shortname>
                    <file>shortname.xml</file> <!-- layout file name goes in app/design/frontend/namespace/theme/layouts/ -->
                </shortname>
            </updates>
        </layout>
    </frontend>

    <global>
        <blocks>
            <shortname> <!-- can be Namespace_Module or create a shortname of module -->
                <class>Namespace_Module_Block</class>
            </shortname>
        <blocks>

        <models>
            <shortname>
                <class>Namespace_Module_Model</class>
                <resourceModel>shortname_resource</resourceModel> <!-- needed if install or update script is going to be used -->
            </shortname>
            <shortname_resource>
                <class>Namespace_Module_Model_Resource</class> <!-- maps to app/code/local/Namespace/Module/Model/Resource/ -->
                <entities>
                    <anyname> <!--can be any name usually descriptive of action it is doing to table -->
                        <table>sales/order</table> <!-- can be existing as shown or a table which will be created during install -->
                    </anyname>
                    <!-- make as meany entries as tables needed to be modified -->
                <entities>
            </shortname_resource>
        </models>
        <resources>
            <shortname_setup>
                <setup>
                    <module>Namespace_Module</module>
                    <class>Mage_Core_Model_Resource_Setup</class>
                    <class>Namespace_Module_Entity_Setup</class>
                </setup>
            </shortname_setup>
        </resources>

        <events>
            <observer_event_intercepted> <!-- name of the Mage::dispatchEvent('this_name'); to intercept -->
                <observers>
                    <shortname>
                        <class>shortname/observer</class>
                        <method>nameofFunction</method>
                        <type>singleton</type> <!-- model/singleton -->
                    </shortname>
                </observer>
            </observer_event_intercepted>
        </events>

        <helpers>
            <shortname>
                <class>Namespace_Module_Helper</class>
            </shortname>
        </helpers>
    </global>
    
    <default>
        <sectionName> <!--mapped to system.xml section -->
            <groupName> <!--mapped to system.xml group -->
                <systemxmlAttributeNames>[default_value]</systemxmlAttributeNames> <!-- mapped to system.xml attributes -->
            </groupName>
        </sectionName>
    </default>
</config>
                
{% endhighlight %}                

We will now create a system.xml file.  This file will contain all the options which will be selectable in the backend configuration i.e. `system->configuration`
For more information and explaination: [Alan Storm's system configuration in depth](http://alanstorm.com/magento_system_configuration_in_depth_tutorial) 
or My favorite Magento Blog [Excellence Magento Blog](http://excellencemagentoblog.com/blog/2011/09/22/magento-part8-series-systemxml/)
and this one will help explain the frontend_model if you so choose to use one [Atwix Blog](http://www.atwix.com/magento/frontend-backend-source/)
more advanced system.xml blog [Excellence Magento Blog](http://excellencemagentoblog.com/blog/2011/09/22/magento-part9-series-systemxml-advanced/)

{% highlight xml %}

<!-- app/etc/code/local/Namespace/Module/etc/system.xml -->

<config>
    <sections>
        <sectionName> <!-- if default value maps to config.xml sectioName -->
            <groups>
                <groupName translate="label"> <!-- for default values maps to config.xml translates languages with translate tag-->
        <!-- For more information http://alanstorm.com/magento_system_configuration_in_depth_tutorial -->
                    <label>labelName</label <!-- will be the group in backend -->
                    <frontend_model>adminhtml/system_config_form_field_heading</frontend_model> <!-- maps to model in /app/code/core/Mage/Adminhtml/Block/System/Config/Form/Field/Heading.php -->
                    <frontend_type>text</frontend_type>
                    <sort_order>10</sort_order>
                    <show_in_default>1</show_in_default>
                    <show_in_website>1</show_in_website>
                    <show_in_store>1</show_in_store>
                    <comment>add comment</comment> <!-- area where text wil be input in backend -->

                    <fields>
                        <enabled translate="label">
                        <label>Enabled</label>
                        <frontend_type>select</frontend_type>
                        <source_model>adminhtml/system_config_source_yesno</source_model>
                        <backend_model>Namespace_Module/system_config_backend_enabled</backend_model> <!-- maps to model which controls enable/disable methods -->
                        <comment><model>Namespace_Module/system_config_backend_enabled</model></comment>
                        <sort_order>20</sort_order>
                        <show_in_default>1</show_in_default>
                        <show_in_website>1</show_in_website>
                        <show_in_store>1</show_in_store>

                        <!-- make as many backend options as needed -->
                    </fields>
                </grouName>
            </groups>
        </sectionName>
    </sections>
</config>

{% endhighlight %}

If you need your own separate section in the backend configuration menu, then add an `adminhtml.xml`
Again, a few blogs with better explainations:
[Alan Storm Magento Admin](http://alanstorm.com/magento_admin_hello_world_revisited)
[eye imagine](http://www.eyemaginetech.com/blog/magento/magento-custom-development-adminhtml-xml-reports)
[NWD Themes](http://nwdthemes.com/2014/09/25/adminhtml-xml-details/)
[Ecom Devs](http://www.ecomdev.org/2010/10/28/defining-acl-resources-custom-and-admin-menu-in-magento.html)

{% highlight xml %}

<!-- app/code/local/Namespace/Module/etc/adminhtml.xml -->
<config>
    <acl>
        <resources>
            <all>
                <title>Allow Everything</title>
            </all>
            <admin>
                <children>
                    <system>
                        <children>
                            <config>
                                <children>
                                    <namespace_module translate="title">
                                        <title>Configuration Title</title>
                                        <sort_order>100</sort_order>
                                    </namespace_module>
                                </children>
                            </config>
                        </children>
                    </system>
                </children>
            </admin>
        </resources>
    </acl>
</config>

{% endhighlight %}

###Now for the logic

{% highlight php%}

<?php

// app/code/local/Namespace/Module/Model/Filename.php

class Namespace_Module_Model_Filename extends Mage_Core_Model_Abstract
{
    public function getData()
    {
        // call data from database.
    }
}
{% endhighlight %}

{% highlight php %}

<?php

// app/code/local/Namespace/Module/controllers/FilenameController.php

class Namespace_Module_FilenameController extends Mage_Core_Controller_Front_Action
{
    public function goAction()
    {
        // go somewhere.
    }
}

{% endhighlight %}

{% highlight php %}
<?php

// app/code/local/Namespace_Module_Model_Resource_Filename.php

class Namespace_Module_Model_Resource_Filename extends Mage_Core_Model_Resource_Abstract
{
    public function changeDatabase()
    {
        //update/write to database.
    }
}
{% endhighlight %}
##This is just the beginning, not the end...I'll be adding the template (.phtml) and logic (.php) files here shortly... I just wanted to get this published so I don't have to go to 6 different sites to get this information.
