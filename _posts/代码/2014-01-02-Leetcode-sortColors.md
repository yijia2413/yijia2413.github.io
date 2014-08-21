---
layout: post
title: Leetcode-Sort Colors 
description: http://oj.leetcode.com/problems/sort-colors/
category: 代码
tags: Leetcode
---
![images](http://media-cache-ak0.pinimg.com/736x/5b/d1/bb/5bd1bb07917bde2632eb3901dec0941f.jpg)
## 题目描述

Given an array with n objects colored red, white or blue, sort them so that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

__Note:__
You are not suppose to use the library's sort function for this problem.

## AC代码

    #include <iostream>
    #include <cstdio>
    #include <string>
    
    using namespace std;
    
    void sortColors(int A[],int n)
    {
        	int red = 0, blue = n - 1;
        	for(int i = 0; i < blue + 1;)
        	{
        		if(A[i] == 0)
        			swap(A[i++], A[red++]);
        		else if(A[i] == 2)
        			swap(A[i], A[blue--]);
        		else
        			i++;
        	}
    }
    
    int main()
    {
        	int n;
        	cin>>n;
        	int A[n];
        	for(int i = 0; i < n; i++)
        		cin>>A[i];
        	sortColors(A, n);
        	for(int j = 0; j < n; j++)
        		cout<<A[j]<<" ";
        	cout<<endl;
        	return 0;
    }
    