---
layout: post
title: centos chrome
description: 分类
category: 代码
tags: 语法
---
#相当痛苦多经历
Centos由于很多库多问题，很久不更新，安装chrome是一个挺难的事情。

虽说chromium是一个不错的替代品，但是会缺少很多比如flash等插件。

#添加repo
	vim /etc/yum.repos.d/CentOS-Base.repo

添加如下信息：

	name=google-chrome
	baseurl=http://dl.google.com/linux/chrome/rpm/stable/$basearch
	enabled=1
	gpgcheck=1
	gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub

此时，发现yum install 其实是不行的，还要进行以下工作。

	wget http://chrome.richardlloyd.org.uk/install_chrome.sh
然后添加权限并执行。

之后就发现可以运行chrome了。
