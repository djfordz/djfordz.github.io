---
title: After Magento Install on local server, cannot log into backend
layout: post
---

### The issue -- Magento is funny about the way it stores and uses cookies

So after having no issues installing a magento test server, I went to login to the backend, and wouldn't you know it, page refresh...and that is it...no backend...try again....and again....well this isn't going to look good on my resume...after a quick google search, the answer wasn't the easiest to find, but worked, so I am copying from [Stack Overflow](http://stackoverflow.com/questions/2176195/cant-log-in-to-magento-admin). 

### The answer -- simplicity at its finest

```
In new Magento Installation, do the following ->

Open the file

`app/code/core/Mage/Core/Model/Session/Abstract/Varien.php`

and change the code at line 97 to this ->
```
    $cookieParams = array(
        'lifetime' => $cookie->getLifetime(),
        'path'     => $cookie->getPath(),
      //  'domain'   => $cookie->getConfigDomain(),
      //  'secure'   => $cookie->isSecure(),
      //  'httponly' => $cookie->getHttponly()
    );

```

Would I do this on a production server? hell no...

