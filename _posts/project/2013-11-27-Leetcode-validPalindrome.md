---
layout: post
title: Leetcode-Valid Palindrome
description:http://oj.leetcode.com/problems/valid-palindrome/
category: project
---
## 题目描述
Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

*   For example,
*   `"A man, a plan, a canal: Panama" `is a palindrome.
*   `"race a car"` is not a palindrome.

`Note:`
Have you consider that the string might be empty? This is a good question to ask during an interview.

For the purpose of this problem, we define empty string as valid palindrome.

## 思路
双指针，扫描。需要用到一些库函数。

## AC代码

    #include <iostream>
    #include <cstdio>
    #include <cstdlib>
    using namespace std;
    
    bool isPalindrome(string s)
    {
        	int n = s.length();
        	int left = 0, right = n - 1;
        	//tolower把字符转换成小写字母,非字母字符不做出处理
        	//isalnum(c) c为数字0-9或字母a-z及A-Z时，返回非零值，否则返回零。
        	while(left <= right)
        	{
        		while(left <= right && !isalnum(s[left]))
        			left++;
        		while(left <= right && !isalnum(s[right]))
        			right--;
        		if(left > right)
        			break;
        		if(isdigit(s[left]) && s[left] != s[right])
        			return false;
        		if(tolower(s[left]) != tolower(s[right]))
        			return false;
        		left++;
        		right--;
        	}
        	return true;
    }
    
    int main()
    {
        	string s;
        
        #ifndef ok
        	freopen("in1.in","r",stdin);
        	freopen("std1.out","w",stdout);
        #endif
        
        	while(getline(cin,s,'\n'))
        	{
        		if(isPalindrome(s))
        			cout<<"true"<<endl;
        		else
        			cout<<"false"<<endl;
        	}
        	
        #ifndef ok
        	fclose(stdin);
        	fclose(stdout);
        #endif
        
        	return 0;
    }
    