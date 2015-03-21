---
layout: post
title: Leetcode-Median of Two Sorted Arrays
description: http://oj.leetcode.com/problems/median-of-two-sorted-arrays/
category: 代码
tags: Leetcode
---
## 题目描述

There are two sorted arrays A and B of size m and n respectively. Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

## AC代码

    #include <iostream>
    #include <stdio.h>
    #include <stdlib.h>
    #include <cstdio>
    
    
    using namespace std;
    
    double findKth(int A[], int m, int B[], int n, int k)
    {
        	if(m > n)
        		return findKth(B,n,A,m,k);
        	if(m == 0)
        		return B[k - 1];
        	if(k <= 1)
        		return min(A[0], B[0]);
        
        	int pa = min(k / 2, m), pb = k - pa;
        	if(A[pa - 1] < B[pb - 1])
        		return findKth(A + pa, m - pa, B, n, k - pa);
        	else if(A[pa - 1] > B[pb - 1])
        		return findKth(A, m, B + pb, n - pb, k - pb);
        	else
        		return A[pa - 1];
        }
        
        double findMedianSortedArrays(int A[], int m, int B[], int n)
        {
        	int k = m + n;
        	if(k & 0x1)
        		return findKth(A, m, B, n, k / 2 + 1);
        	else
        		return (findKth(A, m, B, n, k / 2) + findKth(A, m, B, n, k / 2 + 1)) / 2;
    }
    
    int main()
    {
        #ifndef ok
        	freopen("in4.in", "r", stdin);
        	freopen("std4.out", "w", stdout);
        #endif
        
        	int m;
        	cin>>m;
        	int A[m];
        	for(int i = 0; i < m; i++)
        		cin>>A[i];
        	int n;
        	cin>>n;
        	int B[n];
        	for(int j = 0; j < n; j++)
        		cin>>B[j];
        //	cout<<(float)findMedianSortedArrays(A, m, B, n)<<endl;
        
        	printf("%.5f\n", findMedianSortedArrays(A, m, B, n));
        #ifndef ok
        	fclose(stdin);
        	fclose(stdout);
        #endif
        
        	return 0;
    }
    