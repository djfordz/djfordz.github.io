---
title: Bitwise tidbits (addition and multiplication)
author: David Ford
layout: post
---

Bitwise operations in languages such as C allow a user to manipulate data bit by bit.  Thus, since we are manipulating data at the lowest of low levels, a decent knowledge of binary is a must, along with a rather adept expertise in adding, subtracting, multiplying, and dividing in binary as well.  However, once you get the hang of it, it becomes an extremely powerful asset to one's programming prowess.  It allows a developer access to the most basic data structure willing the one's and zero's to do his bidding.  It is awesome...

#### Here are a few methods to add and multiply using only bitwise operations

``` C

#include <stdio.h>

// add arbitrary numbers through bit manipulation.
int bitAdd(int x, int y)
{
    if (y == 0)
        return x;
    else
        return bitAdd( x ^ y, (x & y) << 1);
}

// multiply arbitrary numbers using bit manipulation.
int bitMultiply( int x, int n)
{
     // Initialize variables for bitwise operations.
    int result = 0;

    while(n != 0)
    {
        if(n & 01)
        {
            result = bitAdd(result, x);
        }

        x <<= 1;

        n >>= 1;
    }

    return result;
}

```
