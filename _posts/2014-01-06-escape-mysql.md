---
layout: post
title: C++转义Mysql单引号
category: 博客
tags: 语法
description: 这个问题折腾了我好久啊……
---
##Mysql为什么需要转义
程序执行中未对敏感字符进行过滤,使得攻击者传入恶意字符串与结构化数据查询语句合并,并且执行恶意代码.也就是要防注入。
##常见转义
*   `\0`：ASCII 0(NUL)字符。
*   `\'`：单引号(‘'’)。
*   `\"`：双引号(‘"’)。
*   `\b`：退格符。
*   `\n`：换行符。
*   `\r`：回车符。
*   `\t`：tab字符。
*   `\Z`：ASCII 26(控制（Ctrl）-Z)。该字符可以编码为‘\Z’，以允许你解决在Windows中ASCII 26代表文件结尾这一问题。(如果你试图使用mysql db_name < file_name，ASCII 26会带来问题）。
*   `\\`：反斜线(‘\’)字符。
*   `\%`：‘%’字符。参见表后面的注解。
*   `\_`：‘_’字符。参见表后面的注解。

##C++转义半角单引号
话不多说，直接上代码了。这个问题折腾我好久了……

    void Conver(const char* iinput, char* output)
    {
        int i = -1;//记录上次匹配的位置
        int dOffset = 0;//目标字符串游标
        int nCopy = 0;//本次需要成 copy的字节数
        const char*p = input;
        while(*p)
        {
            if(*p == '\\' || *p == '\'' || *p== '"')
            {
                nCopy = p-input-i-1;
                memcpy(output + dOffset, input + i + 1, nCopy);
                dOffset += nCopy;
                *(output + Offset) = '\\';
                *(output + dOffset + 1) = *p;
                dOffset += 2;
                i = p - input;
            }
            p++;
        }
        if( dOffset>0 )//有匹配到，copy最后的字符串
            memcpy(output + dOffset, input + i + 1, p - input - i);
        return;
    }
    
    