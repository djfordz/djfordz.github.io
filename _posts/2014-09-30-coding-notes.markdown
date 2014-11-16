---
layout: post
title: Notes for Coding (Learned from CS50)
author: David Ford
---

##Notes

1. Here is a nice little mathematical algorithm to find if something is divisible by 3 without using modulo, division, or multiplication:

>An integer is divisible if the sum of its digits is divisible by 3. So you could keep adding the digits of a number together until you get a number less than 10. If that sum number is 3, 6 or 9 then your original number is divisible by 3.

For large integers, this method is likely to get you a result quicker than just iteratively subtracting 3.

~~~~
123456
Sum of digits is 21
Sum is greater than 9 so add digits again
2+1 = 3
3 is equal to {3 or 6 or 9}
Therefore original number 123456 is divisible by 3
~~~~

A few functions for working with bitwise operators and using bit manipulation methods in C that I really like :)

~~~~~
#include <stdio>

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

~~~~~
