---
layout: post
title: Leetcode-plus One
category: 代码
tags: Leetcode
description: 贪心，http://oj.leetcode.com/problems/plus-one/
---
###题目描述
*   Given a number represented as an array of digits, plus one to the number.

###AC代码

    #include <iostream>
    #include <cstdio>
    #include <vector>
    #include <string>
    
    using namespace std;
    class Solution
    {
    	public:
    		vector<int> plusOne(vector<int> &digits)
    		{
    			vector<int> ans;
    			//从尾部开始扫描，发现9
    			int i = digits.size() - 1;
    			while(i >= 0 && digits[i] == 9)
    				i--;
    			if(i < 0)	//9999的情况需要增加一位，置首位为1,即10000
    				ans.push_back(1);
    			else	//其他情况，直接在最后一位加1即可
    			{
    				for(int j = 0; j < i; j++)
    					ans.push_back(digits[j]);
    				ans.push_back(digits[i] + 1);
    			}
    
    			for(int j = 1; j < digits.size() - i; j++)
    				ans.push_back(0);//逢9进1,后面补0
    			return ans;
    		}
    };
    
    int main()
    {
        	Solution *a = new Solution();
        	vector<int> digits;
        	int time, num;
        	cin>>time;
        	while(time--)
        	{
        		cin>>num;
        		digits.push_back(num);
        	}
        	vector<int> ans;
        	ans = a->plusOne(digits);
        	vector<int> plusOne(digits);
        	int i = 0;
        	while(i != ans.size())
        	{
        		cout<<ans[i]<<" ";
        		i++;
        	}
        	cout<<endl;
        	return 0;
    
    }
