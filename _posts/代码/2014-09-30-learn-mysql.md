---
layout: post
title: centos chrome
description: 分类
category: 代码
tags: 折腾
---
#合并多个字段

    update your_table set name=concat(firstname,'\n',lastname);//以换行作为间隔
1.增加一个字段

alter table user add COLUMN new1 VARCHAR(20) DEFAULT NULL; //增加一个字段，默认为空
alter table user add COLUMN new2 VARCHAR(20) NOT NULL; 　　 //增加一个字段，默认不能为空

2.删除一个字段
alter table user DROP COLUMN new2; 　　　　　　　　　　　　　　 //删除一个字段

3.修改一个字段
alter table user MODIFY new1 VARCHAR(10); 　　　　　　　　　　 //修改一个字段的类型
alter table user CHANGE new1 new4 int;　　　　　　　　　　　　　 //修改一个字段的名称，此时一定要重新指定该字段的类型


//重命名列549830479

   alter table t1 change a b integer;
   
修改原字段名称及类型：549830479

   mysql> ALTER TABLE table_name CHANGE old_field_name new_field_name field_type;
  
   
修改mysql字段顺序的方法：

ALTER TABLE `tb_area_collect_school_week` CHANGE `area` `area` VARCHAR(50) AFTER `city` ;  