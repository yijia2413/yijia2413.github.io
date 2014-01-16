---
layout: post
title: Leetcode-Container With Most Water
description: http://oj.leetcode.com/problems/container-with-most-water/
category: 代码
tags: Leetcode
---
![images](http://media-cache-ec0.pinimg.com/736x/c1/17/1b/c1171b108268388435d6315b0d147d12.jpg)
## 题目描述
Given n non-negative integers `a1, a2, ..., an`, where each represents a point at coordinate `(i, ai)`. n vertical lines are drawn such that the two endpoints of line i is at `(i, ai)` and `(i, 0)`. Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container.

## AC代码

    #include <iostream>
    #include <cstdio>
    #include <cstdlib>
    #include <vector>
    
    using namespace std;
    
    int maxArea(vector<int> &height)
    {
        	if(height.size() < 2)
        		return 0;
        	int i = 0, j = height.size() - 1;
        	int maxarea = 0;
        	while(i < j)
        	{
        		int area = 0;
        		if(height[i] < height[j])
        		{
        			area = height[i] * (j - i);
        			++i;
        		}
        		else
        		{
        			area = height[j] * (j - i);
        			--j;
        		}
        		if(maxarea < area)
        			maxarea = area;
        	}
        	return maxarea;
    }
    
    int main()
    {
        
        #ifndef ok
        	freopen("in5.in", "r", stdin);
        	freopen("std5.out", "w", stdout);
        #endif
        
        	vector<int> height;
        	int time, c;
        	cin>>time;
        	while(time--)
        	{
        		cin>>c;
        		height.push_back(c);
        	}
        	cout<<maxArea(height)<<endl;
        
        #ifndef ok
        	fclose(stdin);
        	fclose(stdout);
        #endif
        
        	return 0;
        
    }
    