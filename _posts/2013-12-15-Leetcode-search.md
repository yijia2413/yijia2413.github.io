---
date: 2013-12-15 16:54:12+00:00
layout: post
title: Leetcode-search
thread: 215
categories: Leetcode
tags: Leetcode
---
`“生命中最伟大的光辉不在于永不坠落，而是坠落后总能再度升起。”`——曼德拉，《漫漫自由路》
![images](http://media-cache-ec0.pinimg.com/736x/08/66/20/086620c35695e1cf861fcc7582899955.jpg)
## 题目描述

Suppose a sorted array is rotated at some pivot unknown to you beforehand.

(i.e., `0 1 2 4 5 6 7` might become `4 5 6 7 0 1 2`).

You are given a target value to search. If found in the array return its `index`, otherwise return `-1`.

You may assume `no duplicate exists` in the array.


##思路
在有序数组中查询一个值，`二分法`是一个通用解法。本题虽然在某一个地方，将数组分段了，依旧可以沿用这种方法。

假设现在我们要在A[l] ... A[r]中查询target。

*   1.A[l] < A[r]，说明A[l] < A[l + 1] < A[l + 2] < ... < A[r]是一个部分有序数组，可以直接采用二分查询；
*   2.A[l] > A[r]，说明存在一个k，使得A[l]到A[k]，A[k+1]到A[r]为两个有序数组，此时我们还是用二分处理：

__[参考代码](http://blog.csdn.net/pickless/article/details/9191075)__


## AC代码
<pre class="prettyprint linenums">

    #include <iostream>
    
    using namespace std;
    
    int search(int A[], int n, int target)
    {
        	int left = 0;
        	int right = n - 1;
        	while(left < right)
        	{
        		int mid = left + (right - left) / 2;  //bin sort
        		if(A[mid] >= A[left] ) //if left side sorted
        		{
        			if(A[left] <= target && target <= A[mid])
        				right = mid;
        			else
        				left = mid + 1;
        		}
        		else //if right side sorted
        		{
        			if(A[mid] <= target && target <= A[right])
        				left = mid;
        			else
        				right = mid - 1;
        		}
        	}
        	if(right >= 0 && right < n && A[right] == target)
        		return right;
        	else
        		return -1;
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
        	
        	cout<<search(A, n, target)<<endl;
        	return 0;
    }
    
</pre>