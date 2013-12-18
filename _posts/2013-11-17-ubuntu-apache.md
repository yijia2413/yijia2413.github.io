---
date: 2013-11-17 16:54:12+00:00
layout: post
title: Ubuntu-apache配置
thread: 188
categories: Blog
tags: linux
---
![images](http://media-cache-ec0.pinimg.com/236x/ca/10/23/ca10233d5772a20890cf8ba2924ef43b.jpg)
为了能够配置好，花费了好大的劲啊，mark一下：

安装啥的就不说了，直接上重点～主要是修改根目录。

`/etc/apache2/sites-enabled/000-default.conf` 是首要修改的。
 
记得修改`DocumentRoot`为自己想要的目录，然后记得在最后加上一段：
<pre class="prettyprint linenums"> 
	<Directory /var/www/XXX>
	 Options +Indexes +Multiviews
	AllowOverride All
	Order allow,deny
	Allow from all
	</Directory>
</pre>
然后`service apache2 restart`就好了，终于搞定了。
 
其他应该是暂时不需要管的。
 
参考位置：`http://blog.csdn.net/ichuzhen/article/details/8217577`

	<Directory "/var/www/html">       设置目录权限（<Directory "目录路径">此次写设置目录权限的语句</Directory>）
	      Options FollowSymLinks      page:116
	      AllowOverride None
	</Directory>
