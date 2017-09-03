---
title: Adding Menu Items in a Linux Desktop
author: David Ford
layout: post
---

## Linux Desktop Files

Basic example from the [Arch Wiki](https://wiki.archlinux.org/index.php/Desktop_Entries) 

```
[Desktop Entry]
Type=Application                          # Indicates the type as listed above
Version=1.0                               # The version of the desktop entry specification to which this file complies
Name=jMemorize                            # The name of the application
Comment=Flash card based learning tool    # A comment which can/will be used as a tooltip
Exec=jmemorize                            # The executable of the application.
Icon=jmemorize                            # The name of the icon that will be used to display this entry
Terminal=false                            # Describes whether this application needs to be run in a terminal or not
Categories=Education;Languages;Java;      # Describes the categories in which this entry should be shown
```

There are quite some keys that have become deprecated over time as the standard has matured. The best/simplest way is to use the tool desktop-file-validate which is part of the package desktop-file-utils. To validate, run

`$ desktop-file-validate <your desktop file>`

This will give you very verbose and useful warnings and error messages.
