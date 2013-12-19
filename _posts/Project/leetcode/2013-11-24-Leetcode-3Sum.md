---
layout: post
title: Leetcode-3Sum
description: http://oj.leetcode.com/problems/3sum/
category: Project
tags: Leetcode
---
## 题目描述
*   Given an array S of n integers, are there elements a, b, c in S such that `a + b + c = 0?` Find all unique triplets in the array which gives the sum of zero.
*   __Note:__
*   Elements in a triplet (a,b,c) must be in non-descending order. (ie, `a ≤ b ≤ c`)
*   The solution set must not contain duplicate triplets.
*   For example, given array `S = {-1 0 1 2 -1 -4}`,
*    A solution set is:
    `(-1, 0, 1)`
    `(-1, -1, 2)`

## 思路
*   将数组排序，
*   a遍历数组a[0]....a[n-1];         
*   当 `a=a[i]`时后面的问题就是:`a[i+1]`到`a[n-1]`中`b+c =-a`,记 `b=a[j]=a[i-1]`,`c=a[k]=a[n-1]`.
>若 b+c<-a,j++; 
>b+c>-a，j--;    
>b+c=-a 记录下来，并j++;
*   还有一个问题就是`unique triplet`,所以`a=a[i]`要判断是否和`a[i-1]`相等,若相等子问题已经解答。也要判断b和c是否和之前的相同，若相同，就已经判断过了。

## AC代码

    #include <iostream>
    #include <cstdio>
    #include <vector>
    #include <algorithm>  
    #include <map>
    
    using namespace std;
    
    class Solution {
    public:
        vector<vector<int> > threeSum(vector<int> &num) {
            // IMPORTANT: Please reset any member data you declared, as
            // the same Solution instance will be reused for each test case.
         sort(num.begin(), num.end());  
            vector<vector<int> > ans;  
            vector<int> temp;  
            for (int i = 0; i < num.size(); i++) {  
                if (i > 0 && num[i] == num[i - 1]) {  
                    continue;  
                }  
                for (int j = i + 1; j < num.size(); j++) {  
                    if (num[j] == num[j - 1] && j - 1 > i) {  
                        continue;  
                    }  
                                      
                    int k = - num[i] - num[j];  
                    int left = j + 1, right = num.size() - 1, mid = 0;  
                    while (left <= right) {  
                        mid = (left + right) >> 1;  
                        if (num[mid] > k) {  
                            right = mid - 1;  
                        }   
                        else if (num[mid] == k) {  
                            temp.push_back(num[i]);  
                            temp.push_back(num[j]);  
                            temp.push_back(num[mid]);  
                            ans.push_back(temp);  
                            temp.clear();  
                            break;  
                        }  
                        else {  
                            left = mid + 1;  
                        }  
                    }  
                }  
            }  
            return ans;  
        }
    
    	void print(vector< vector<int> > &result)
    	{
    		cout<<result.size()<<endl;
    		for(int i = 0; i < result.size();i++)
    		{
    			for(int j = 0; j < result[i].size(); j++)
    			{
    				cout<<result[i][j]<<" ";
    			}
    			cout<<endl;
    		}
    	}
    };
    
    int main()
    {
        	Solution * mysolution = new Solution();
        	vector<int> numbers;
        	int time,c;
        	cin>>time;
        	while(time--)
        	{
        		cin>>c;
        		numbers.push_back(c);
        	}
        	//vector<int> ans;
        	vector<vector<int> > result;
        	result = mysolution->threeSum(numbers);
        	for(int i = 0; i < result.size();i++)
        		{
        			for(int j = 0; j < result[i].size(); j++)
        			{
        				cout<<result[i][j]<<" ";
        			}
        			cout<<endl;
        		}
        	return 0;
    }
    
    