---
layout: post
title: After Magento Install on local server, cannot log into backend
categories: []
tags: []
published: True

---

###The issue -- Magento is funny about the way it stores and uses cookies

So after having no issues installing a magento test server, I went to login to the backend, and wouldn't you know it, page refresh...and that is it...no backend...try again....and again....well this isn't going to look good on my resume...after a quick google search, the answer wasn't the easiest to find, but worked, so I am copying from [Stack Overflow](http://stackoverflow.com/questions/2176195/cant-log-in-to-magento-admin). 

###The answer -- simplicity at its finest

```

In new Magento Installation, do the following ->

Open the file

app/code/core/Mage/Core/Model/Session/Abstract/Varien.php.

and change the code at line 87 to this ->

    $cookieParams = array(
        'lifetime' => $cookie->getLifetime(),
        'path'     => $cookie->getPath(),
      //  'domain'   => $cookie->getConfigDomain(),
      //  'secure'   => $cookie->isSecure(),
      //  'httponly' => $cookie->getHttponly()
    );

```

Would I do this on a production server? hell no...
so what do we do for a permanent fix?

Well, technically this shouldn't happen on a production server, however if it does, it is because you have magneto installed in a subdirectory of root (this seems to be root cause).

So what we do? Comment out the lines of code as described above, login to the admin panel, goto system->configuration, Down to ->Advanced->Admin on the left-hand side of screen (at the bottom so scroll down), click 'Admin Base URL' and change Use Custom Admin URL -> Yes (enter your base URL including subdirectory) Select 'Use Custom Admin Path' -> yes, (Enter how you would like to get to admin panel..e.g. admin, backend, hireME, etc...).

Go back to `app/code/core/Mage/Core/Model/Session/Abstract/Varien.php.` and uncomment lines previously commented..and viola...you can now login to admin... 

#####This has been a test and only a test we now return you to your regular scheduled program: Dev-Test -- Yikes!