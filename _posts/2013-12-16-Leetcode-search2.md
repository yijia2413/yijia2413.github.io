---
date: 2013-12-16 16:54:12+00:00
layout: post
title: Leetcode-search2
thread: 221
categories: Leetcode
tags: Leetcode
---
嫦娥三号～致敬！
![images](http://media-cache-ec0.pinimg.com/736x/14/47/8e/14478eb12b05c3938a910023b04dcbfe.jpg)
## 题目描述

Follow up for `"Search in Rotated Sorted Array"`:
What if duplicates are allowed?

Would this affect the run-time complexity? How and why?

Write a function to determine if a given target is in the array.

## AC代码
<pre class="prettyprint linenums">

    #include <iostream>
    
    using namespace std;
    
    bool search(int A[], int n, int target)
    {
        	int left = 0;
        	int right = n - 1;
        	while(left <= right)
        	{
        		int mid = left + (right - left) / 2;
        		if(A[left] < target && target < A[mid])
        			right = mid - 1;
        		else if(A[mid] < target && target < A[right])
        			left = mid + 1;
        		else
        		{
        			if(A[left] != target)
        				left++;
        			else
        				return true;
        			if(A[right] != target)
        				right--;
        			else
        				return true;
        		}
        	}
        	return false;
    }
    
    int main()
    {
        	int n;
        	cin>>n;
        	int A[n];
        	for(int i = 0; i < n; i++)
        		cin>>A[i];
        	int target;
        	cin>>target;
        	
        	if(search(A,n,target))
        		cout<<"true"<<endl;
        	else
        		cout<<"false"<<endl;
        
        	return 0;
    }
</pre>