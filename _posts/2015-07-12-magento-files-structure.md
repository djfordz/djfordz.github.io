---
layout: post
title: Magento Module File Structure With Email Controller
categories: [Magento]
tags: [Magento, Modules, XML Email Controller]
---

##File Structure for Magento Module files.

####How Magento finds out about your module

_All Configuration files are merged into one file when parsed_

Magento parses all XML files in this directory
underscores when parsed by autoloader will be translated to slashes.
Thus the directory structure of the below code when parsed will point to `app/code/local/Dfordz/Module/`

Convention is to name config file in `app/etc/modules/` the namespace of the module thus this config file would be named `Enterprise_Banner.xml`

app/etc/modules/Dfordz_Module.xml

Instantiates the module.  Allows Magento to recognize it

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>

<config>
    <modules>
        <Dfordz_Module>                 <!--Module Name-->
            <active>true</active>       <!--instantiates the module-->
            <codePool>local</codePool>  <!--codepool module is located in, core, community, local-->
            <depends>                   <!--modules this module depends on-->
            </depends>
        </Dfordz_Module>
    </modules>
</config>
{% endhighlight %}

Files are loaded strictly in alphabetic order, except module dependencies.

{% highlight xml %}
<!--app/code/codePool/namespace/module/etc/config.xml-->

<?xml version="1.0" encoding="UTF-8"?>

<config>
    <modules>
        <!--Contains module declarations (names,statuses,dependencies)-->
    </modules>
    <global>
        <!--Contains definitions that should be shared between all scopes-->
    </global>
    <default>
        <!--Contains definitions that require only for frontend area-->
    </default>
    <frontend>
        <!--Contains definitions that require only for frontend area-->
    </frontend>
    <catalog>
        <!--Contains definitions that require only for Mage_Catalog-->
    </catalog>
    <!--...-->
</config>

#NOTE: definitions are XML files.

{% endhighlight %}

Declared in Global Node
  Main database settings, such as host, database name, user name, password, and some system values.
  Connections types (read/write)
  Database Adapter
  Core module class names

Declared in the Default node
  Directory structure real folder names.
  System locale
  Design and Theme configuration
  System Options

Declared in frontend node.
  layout XML files
  Routers
    Handle requests
    Dispatch controllers
  Translations files
  Observers declarations

Rest specific to a certain module
  Default configuration values

config file for our Enterprise Banner Module

{%highlight xml %}
<!-- app/code/local/Dfordz/Module/etc/config.xml-->

<?xml version="1.0" encoding="UTF-8"?>

<config>
    <modules>                           <!--required-->
        <Dfordz_Module>                 <!--namespace_moduleName-->
            <version>0.0.1</version>    <!--version-->
        <Dfordz_Module>
    </modules>

    <frontend>
        <routers>
            <dfzform>                   <!--can be anything, make it related to module, will connect the frontend files.-->
                <use>standard</use>
                <args>
                    <module>Dfordz_Module</module>  <!--namespace_moduleName-->
                    <frontName>module</frontName>   <!--what connects it to app/design/base/default/template/-->
                </args>
            </dfzform>
        </routers>
    </frontend>

</config>
{% endhighlight %}

###How to access to configuration value

To get part of config
`$store->getConfig($path);`

To get part of config
`Mage::getStoreConfig($path[, $store]);`

To check store flag
`Mage::getStoreConfigFlag($path {, $store});`

To access by absolute path
`Mage::getConfig()->getNode($path[, $scope]);`

Store === Storeview

The way Magento parses a module should be what you follow when writing the module.


###Making a controller for the module.

This controller will send an email from a form from the cms page and sending it to a store contact listed in admin panel.

{% highlight php %}
<?php

class Dfordz_Module_FormController extends Mage_Core_Controller_Front_Action
{
    public function emailAction()
    {
        $mail = Mage::getModel('core/email');

        // pull store info.
        $toName = Mage::getStoreConfig('contacts/name/recipient_name');
        $toEmail = Mage::getStoreConfig('contacts/email/recipient_email');

    $params = $this->getRequest();

        // _POST Params
        $customerName = $params->getParam('contact_name');
        $customerEmail = $params->getParam('email');
    $customerCompany = $params->getParam('company');
    $customerPhone = $params->getParam('phone');
    $product = $params->getParam('product');
    $quantity = $params->getParam('quantity');
    $subscription = $params->getParam('subscription');

    $subcription = null;
    $subscriptionAns = null;

    if($subscription === 'on') {
      $subscriptionAns = "yes";
    } else {
      $subscriptionAns = "no";
    }

    // email header
        $mail->setToName($toName);
        $mail->setToEmail($toEmail);
        $mail->setSubject("New Custom Quote from $customerCompany");
        $mail->setFromName($customerName);
        $mail->setFromEmail($customerEmail);
        $mail->setType('text');
        $mail->setBody("
            A new form has been submitted!\n

            Contact Name: $customerName\n
      Company: $customerCompany\n
      Phone Number: $customerPhone\n
      Email: $customerEmail\n
      Product: $product\n
      Quantity: $quantity\n
      Subscription: $subscriptionAns\n
        ");

        try {
            $mail->send();
        } catch(Exception $e) {
            Mage::logException($e);
            return false;
        }

        Mage::getSingleton('core/session')
            ->addSuccess(
                $this->__('Form was submitted. We will contact you shortly.')
            );

        $this->_redirect('/buy');
    }
}
{% endhighlight %}
