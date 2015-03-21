---
layout: post
title: Leetcode-Minimum Window Substring
description: http://oj.leetcode.com/problems/minimum-window-substring/
category: 代码
tags: Leetcode
---
## 题目描述
Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity `O(n)`.

For example,

*   `S = "ADOBECODEBANC"`
*   `T = "ABC"`
*   Minimum window is `"BANC"`.

Note:
If there is no such window in S that covers all characters in T, return the emtpy string "".

If there are multiple such windows, you are guaranteed that there will always be only one unique minimum window in S.

## AC代码

    #include <iostream>
    #include <string>
    #include <vector>
    #include <cstring>
    #include <limits.h>
    #include <string.h>
    #include <cstdio>
    #include <cstdlib>
    
    using namespace std;
    
    bool is_all_non_neg(const vector<int> &v) 
    {
        for (int i=0; i<v.size(); ++i)
            if (v[i]<0)
                return false;
        return true;
    }
    
    string minWindow(string S, string T) {
            if (S.size()==0 || T.size()==0) return "";
            int slow=0, fast=0;
    
            vector<bool> is_in_T(256,false);       
            for (int i=0; i<T.size(); ++i)  is_in_T[T[i]]=true;
            
            vector<int> dist(256, 0);
            for (int i=0; i<T.size(); ++i)  dist[T[i]]--;
            if (is_in_T[S[0]]) dist[S[0]]++;
    
            string min_w;   // the minimum window found so far
            int min_w_size = INT_MAX;   // the size of the minimum window
            bool have_found = false;    // if a window has been found
            while (slow<S.size() && fast<S.size()) {
                if (!is_in_T[S[slow]]) {    
                    ++slow;
                    continue;
                }
                if (dist[S[slow]]>0) {
                    --dist[S[slow]];
                    ++slow;
                } else {
                    if (!have_found)
                        have_found = is_all_non_neg(dist);  
                    if (have_found && min_w_size>fast-slow+1) { // once we have found a window, the window is always good.
                        min_w_size = fast-slow+1;
                        min_w = S.substr(slow, min_w_size);
                    }
                    ++fast;     // the window must be extended given slow cannot move
                    if (fast<S.size() && is_in_T[S[fast]]) ++dist[S[fast]];
                }
    
            }
            return min_w;
        }
    
    int main()
    {
        	string s, t;
        	while(cin>>s>>t)
        		cout<<minWindow(s, t)<<endl;
        	return 0;
    }
    