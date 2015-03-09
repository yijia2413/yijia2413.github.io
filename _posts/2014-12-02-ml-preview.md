---
layout: post
title: 机器学习预习(一)
description: 概要,学习
category: 代码
tags: maching_learning
---
##三要素
机器学习三要素-模型(model)、策略(strategy)、算法(algorithm)；

*   `模型`就是所要学习条件概率分布或决策函数，我们常见的一些方法，像隐马模型(HMM)、SVM模型、决策树模型等等都归于此类；
*   `策略`是指按照什么样的准则来学习或者挑选模型，像课上讲的J(Θ)、损失函数属于此类；
*   `算法`是指学习模型的具体计算方法，即用什么样的方法来求得最优解，像课上讲的梯度下降法，其他如牛顿法、拟牛顿法属于此类；

`训练误差`对判断给定的问题是否容易学习是有意义的，但本质上不重要；

`测试误差`反映了学习方法对未知数据的预测能力，比较两种学习方法的好坏，不考虑计算速度、空间等因素，测试误差小的方法显然更好；

##回归
一般来说,回归不用在分类问题上,因为回归是连续型模型,而且受噪声影响比较大。如果非要应用进入,可以使用对数回归。

##Logistic Regression
1.`找一个合适的预测函数`，一般表示为h函数，该函数就是我们需要找的分类函数，它用来预测输入数据的判断结果。这个过程时非常关键的，需要对数据有一定的了解或分析，知道或者猜测预测函数的“大概”形式，比如是线性函数还是非线性函数。

2.`构造一个Cost函数（损失函数）`，该函数表示预测的输出（h）与训练数据类别（y）之间的偏差，可以是二者之间的差（h-y）或者是其他的形式。综合考虑所有训练数据的“损失”，将Cost求和或者求平均，记为J(θ)函数，表示所有训练数据预测值与实际类别的偏差。

3.J(θ)函数的值越小表示预测函数越准确（即h函数越准确），所以这一步需要做的是找到J(θ)函数的最小值。找函数的最小值有不同的方法，Logistic Regression实现时有的是梯度下降法.

##过程
###预测函数

Logistic Regression虽然名字里带“回归”，但是它实际上是一种分类方法，用于两分类问题（即输出只有两种）.

利用了Logistic函数（或称为Sigmoid函数），该函数的输出必须是两个值（分别代表两个类别）,函数形式为：

<img src="http://latex.codecogs.com/gif.latex?\inline&space;\dpi{120}&space;g(z)=\frac{1}{1&plus;e^{-z}}" title="g(z)=\frac{1}{1+e^{-z}}" />

接下来需要确定数据划分的边界类型,讨论线性边界.

对于`线性边界`的情况，边界形式如下：

<img src="http://latex.codecogs.com/gif.latex?\inline&space;\dpi{120}&space;\theta_{0}&plus;\theta_{1}x_{1}&plus;...&plus;\theta_{n}x_{n}=\theta^Tx" title="\theta_{0}+\theta_{1}x_{1}+...+\theta_{n}x_{n}=\theta^Tx" />

所以,得到预测函数为:

<img src="http://latex.codecogs.com/gif.latex?\inline&space;\dpi{120}&space;g(z)=\frac{1}{1&plus;e^{-\theta^Tx}}" title="g(z)=\frac{1}{1+e^{-\theta^Tx}}" />

hθ(x)函数的值有特殊的含义，它表示结果取1的概率，因此对于输入x分类结果为类别1和类别0的概率分别为：

<img src="http://latex.codecogs.com/gif.latex?\inline&space;\dpi{120}&space;P(y=1|x;\theta)=h_{\theta}(x)" title="P(y=1|x;\theta)=h_{\theta}(x)" />

<img src="http://latex.codecogs.com/gif.latex?\inline&space;\dpi{120}&space;P(y=0|x;\theta)=1-h_{\theta}(x)" title="P(y=0|x;\theta)=1-h_{\theta}(x)" />

###构造损失函数
Cost函数和J(θ)函数是基于最大似然估计推导得到的.
<img src="http://latex.codecogs.com/gif.latex?\inline&space;\dpi{120}&space;if(y&space;=&space;1),&space;Cost(h_{\theta}(x),y)=-log(h_{\theta}(x))" title="if(y = 1), Cost(h_{\theta}(x),y)=-log(h_{\theta}(x))" />

<img src="http://latex.codecogs.com/gif.latex?\inline&space;\dpi{120}&space;if(y&space;=&space;0),&space;Cost(h_{\theta}(x),y)=-log(1-h_{\theta}(x))" title="if(y = 0), Cost(h_{\theta}(x),y)=-log(1-h_{\theta}(x))" />

`损失函数是对预测函数的求和或者平均`

实际上Cost函数和J(θ)函数可以基于最大似然估计推导得到。

预测函数可以综合写成:

<img src="http://latex.codecogs.com/gif.latex?\inline&space;\dpi{120}&space;P(y|x;\theta)=(h_{\theta}(x))^y(1-h_{\theta}(x))^y" title="P(y|x;\theta)=(h_{\theta}(x))^y(1-h_{\theta}(x))^y" />

求log似然,可以得到J(θ)表达公式:

<img src="http://latex.codecogs.com/gif.latex?\inline&space;\dpi{120}&space;J(\theta)=-\frac{1}{m}\left&space;[&space;\sum_{i=1}^{m}y^ilog(h_{\theta}(x^i))&space;&plus;&space;(1-y)^ilog(1-h_{\theta}(x^i))&space;\right&space;]" title="J(\theta)=-\frac{1}{m}\left [ \sum_{i=1}^{m}y^ilog(h_{\theta}(x^i)) + (1-y)^ilog(1-h_{\theta}(x^i)) \right ]" />

因为乘了一个负的系数-1/m，所以J(θ)取最小值时的θ为要求的最佳参数。

###梯度下降法求J(θ)的最小值

<img src="http://latex.codecogs.com/gif.latex?\inline&space;\dpi{120}&space;\theta_{j}:=\theta_{j}-\alpha&space;\sum_{i=1}^{m}(h_{\theta}(x^i)-y^i)x_{j}^i" title="\theta_{j}:=\theta_{j}-\alpha \sum_{i=1}^{m}(h_{\theta}(x^i)-y^i)x_{j}^i" />

###梯度下降过程向量化

矢量化(vectorization)后θ更新的步骤如下：

*   （1）求A=x.θ；
*   （2）求E=g(A)-y；
*   （3）求θ:=θ-α.x'.E,x'表示矩阵x的转置。

综合可以写成:

<img src="http://latex.codecogs.com/gif.latex?\inline&space;\dpi{120}&space;\theta:=\theta-\alpha&space;\frac{1}{m}x^Tg((x\theta)-y)" title="\theta:=\theta-\alpha \frac{1}{m}x^Tg((x\theta)-y)" />

##代码实现







