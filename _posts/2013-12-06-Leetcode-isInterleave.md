---
layout: post
title: Leetcode-Interleaving String
description: http://oj.leetcode.com/problems/interleaving-string/
category: 代码
tags: Leetcode
---
![images](http://media-cache-ec0.pinimg.com/736x/16/a2/5e/16a25ec12fed836e821f3dbe715507c4.jpg)
## 题目描述
Given s1, s2, s3, find whether s3 is formed by the interleaving of s1 and s2.

For example,
Given:

`s1 = "aabcc"`,
`s2 = "dbbca"`,

When `s3 = "aadbbcbcac"`, return `true`.

When `s3 = "aadbbbaccc"`, return `false`.

## 思路
设`f[k][i][j]`表示`s1[0..i-1]`加`s2[0..j-1]`能否拼成`s3[0..k-1]`，满足：`i + j = k`

[好方法介绍](http://blog.csdn.net/sunbaigui/article/details/8980830)

## AC代码

    #include <iostream>
    #include <string>
    #include <cstring>
    #include <cstdio>
    
    using namespace std;
    
    //设f[k][i][j]表示s1[0..i-1]加s2[0..j-1]能否拼成s3[0..k-1]，满足：i + j = k
    bool isInterleave(string s1, string s2, string s3)
    {
        	int l1 = s1.length(), l2 = s2.length(), l3 = s3.length();
        	if(l1 + l2 != l3)
        		return false;
        
        	bool f[l3 + 1][l1 + 1][l2 + 1];
        	memset(f, false, sizeof(bool) * (l3+1) * (l1+1) * (l2+1));
        	f[0][0][0] = true;
        	
        	for(int k = 1; k <= l3; k++)
        	{
        		for(int i = 0;i <= k && i <= l1; i++)
        		{
        			int j = k - i;
        			if(j > l2)
        				continue;
        			if(i != 0 && f[k-1][i-1][j] && s1[i-1] == s3[k-1])  //第一种情形
        				f[k][i][j] = true;
        			if(j != 0 && f[k-1][i][j-1] && s2[j-1] == s3[k-1])//第二种
        				f[k][i][j] = true;
        		}
        	}
        
        	return f[l3][l1][l2];
    }
    
    int main()
    {
        	string s1, s2, s3;
        
        #ifndef ok
        	freopen("in1.in", "r", stdin);
        	freopen("std1.out", "w", stdout);
        #endif
        
        	while(cin>>s1>>s2>>s3)
        	{
        		if(isInterleave(s1, s2, s3))
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
    
## 关于读取包含空格的string
可以用`getline`，示例如下：

    #include <iostream>
    #include <cstdio>
    #include <cstring>
    #include <string>
    
    using namespace std;
    
    int main()
    {
        	string s1, s2, s3;
        	getline(cin,s1);
        	getline(cin,s2);
        	getline(cin,s3);
        	cout<<endl<<s1<<endl<<s2<<endl<<s3<<endl;
        	return 0;
    }
        