---
date: 2013-11-19 16:54:12+00:00
layout: post
title: Leetcode-valid-num
thread: 191
categories: Leetcode
tags: Leetcode
---
### 题目描述
*   Validate if a given string is numeric.
*   Some examples:
*   `"0" => true`
*   `" 0.1 " => true`
*   `"abc" => false`
*   `"1 a" => false`
*   `"2e10" => true`
*   Note: It is intended for the problem statement to be ambiguous. You should gather all requirements up front before implementing one.

### 思路
>说实话，这题目不难，很难受的是要考虑的情况太多了……AC的代码我用它的case去跑。感觉还有错的，还有就是引号转义的问题。恩，需要mark一下。
>读取整行，可以有空格，遇到回车停止。fgets(s,100,fp)当然，case不会超过100个字符，第二个参数随意设定的。
>用while(cin>>s)不能遇到空格，用gets会报警。

### AC代码

    #include <iostream>
    #include <cstdio>
    #include <string>
    #include <cstring>
    
    using namespace std;
    
    bool isNumber(const char *s) 
    {
    
            int len=strlen(s);
            if(len<=0) return false;
            
            int space_nums=0;
            int num_nums=0;
            int dot_nums=0;
            int e_nums=0;
            int sign_nums=0;
            int e_sign_nums=0;
            
            int after_e_nums=0;
            
            
            int new_len=len-1;
            for(;new_len>=0;new_len--)
            {
                if(s[new_len]!=' ')break;
            }
            
            for(int i=0;i<=new_len;i++)
            {
                if(s[i]=='.')
                {
                    if(dot_nums>0) 
                    	return false;
                    else if(e_nums>0) 
                    	return false;
                    else 
                    	dot_nums=1;
                }
                else if(e_nums==1 && after_e_nums==0 &&(s[i]=='+' || s[i]=='-'))
                {
                    if(e_sign_nums>0) 
                    	return false;
                    else 
                    	e_sign_nums=1;
                }
                else if(s[i]=='+' || s[i]=='-')
                {
                    if(sign_nums>0 || dot_nums>0) 
                    	return false;
                    else if(num_nums>0) 
                    	return false;
                    else 
                    	sign_nums=1;
                }
                else if(s[i]=='e')
                {
                    if(num_nums==0)
                    	return false;
                    else if(e_nums>0) 
                    	return false;
                    else 
                    	e_nums=1;
                }
                else if(s[i]>='a' && s[i]<='z')
                {
                    return false;
                }
                else if(s[i]>='A' && s[i]<='Z')
                {
                    return false;
                }
                else if(s[i]==' ')
                {
                    if(num_nums>0 || sign_nums>0 || dot_nums>0)
                    	return false;
                    else if(num_nums==0)
                    	continue;
                    else if(space_nums>0) 
                    	return false;
                    else 
                    	space_nums++;
                }
                else
                {
                    num_nums++;
                    if(e_nums>0) 
                    	after_e_nums++;
                }
            }
            if(num_nums==0) 
            	return false;
            else if(e_nums>0 && after_e_nums==0) 
            	return false;
            
            return true;
    }
    
    int main()
    {
        	char *s;
        	/*cin>>s;
        	if(isNumber(s))
        		cout<<"true"<<endl;
        	else
        		cout<<"false"<<endl;*/
        
        FILE *fp;
        #ifndef isnumber
        	fp = freopen("in1.in","r",stdin);
        	freopen("std1.out","w",stdout);
        #endif
        
        	while(fgets(s,100,fp))
        	{
        		if(isNumber(s))
        			cout<<"true"<<endl;
        		else
        			cout<<"false"<<endl;
        	}
        
        #ifndef isnumber
        	fclose(stdin);
        	fclose(stdout);
        #endif
        
        	return 0;
    }
    