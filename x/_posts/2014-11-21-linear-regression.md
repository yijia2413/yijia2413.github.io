---
layout: post
title: Linear Regression
description: 回归,正则
category: 代码
tags: maching_learning
---
##Data Comes From
Download the data here : [ex5Data.zip](http://openclassroom.stanford.edu/MainFolder/DocumentPage.php?course=MachineLearning&doc=exercises/ex5/ex5.html)

And also, you can see the the description.

##原理分析
线性回归就是要找到 一条直线去拟合训练数据.

模型可能会有些权重很大，有些权重很小，导致过拟合，就是过分拟合了训练数据，使得模型的复杂度提高，泛化能力较差，泛化能力就是对未知数据的预测能力。为了防止过拟合，通常会加入权重惩罚项，就是模型的正则项。正则项可以取不同的形式，在回归问题中取平方损失，就是参数的L2范数，也可以取L1范数。

###主要步骤

*   寻找h函数（即hypothesis)
*   构造J函数（损失函数)
*   想办法是的J函数最小并求得回归参数（θ）

###估计函数
h函数,也就是估计函数如下:<第一次用latex不容易啊~>

<img src="http://latex.codecogs.com/gif.latex?h(x)=h_{\theta}(x)=\theta_{0}&plus;\theta_{1}x_{1}&plus;...&plus;\theta_{n}x_{n}" title="h(x)=h_{\theta}(x)=\theta_{0}+\theta_{1}x_{1}+...+\theta_{n}x_{n}" />

写成总体就是:

<img src="http://latex.codecogs.com/gif.latex?h(x)=h_{\theta}(x)={\theta_{}}^{T}X" title="h(x)=h_{\theta}(x)={\theta_{}}^{T}X" />

###损失函数
程序也需要一个机制去评估我们 θ 是否比较好,所以说需要对我们做出的 h 函数进行评估,一般这个函数称为损失函数(loss function).损失函数如下所示:

<img src="http://latex.codecogs.com/gif.latex?J(\theta)=\frac{1}{2m}\sum&space;(h_{\theta}(x^{i})&-y^{i})^{2}" title="J(\theta)=\frac{1}{2m}\sum (h_{\theta}(x^{i})-y^{i})^{2}" />

###梯度下降法求J(θ)的最小值

然而 θ 需要在 J(θ)最小的情况下才能确定。因此问题归结为求极小值问题,使用梯度下降法。梯度下降法最大的问题是求得有可能是全局极小值,这与初始点的选取有关。

梯度方向由 J(θ)对 θ 的偏导数确定,由于求的是极小值,因此梯度方向是偏导数的反方向.

采用如下公式进行迭代计算:

<img src="http://latex.codecogs.com/gif.latex?\theta_{j}:=\theta_{j}&space;-&space;\alpha&space;\frac{\partial&space;J(\theta)}{\partial&space;\theta}" title="\theta_{j}:=\theta_{j} - \alpha \frac{\partial J(\theta)}{\partial \theta}" />

最后得到如下:

<img src="http://latex.codecogs.com/gif.latex?\theta_{j}:=\theta_{j}&space;-&space;\alpha&space;\frac{1}{m}&space;\sum_{i=1}^{m}&space;(h_{\theta}(x^{i})-y^{i})x_{j}^i" title="\theta_{j}:=\theta_{j} - \alpha \frac{1}{m} \sum_{i=1}^{m} (h_{\theta}(x^{i})-y^{i})x_{j}^i" />


###最小二乘法
有很多的给定点，这时候我们需要找出一条线去拟合它，那么我先假设这个线的方程，然后把数据点代入假设的方程得到观测值，求使得实际值与观测值相减的平方和最小的参数。对变量求偏导联立便可求。

将训练特征表示为 X 矩阵,结果表示成 y 向量,仍然是线性回归模型,误差函数不变。那么θ 可以直接由下面公式得出.

<img src="http://latex.codecogs.com/gif.latex?\theta=(X^{T}X)^{-1}X^{T}\overrightarrow{y}" title="\theta=(X^{T}X)^{-1}X^{T}\overrightarrow{y}" />


##其他问题
###学习率α
α的选取对于梯度下降法是非常关键的，选取合适的话J(θ)能顺利下降并最终收敛，如果选取不合适的话J(θ)可能下降非常缓慢，也有可能最终发散。

选择合适的α值，太大太小都不合适。一般在训练样本时，多次尝试不同的α值，对比结果（可以绘制出J(θ)迭代的图形）后进行选择。

α尝试的方法：先选择一个较小的α值，收敛太慢的话以3倍来增加α值。

至此,可以开始实现线性回归分类器的代码了~


##Matlab Code

    x = load('ex5Linx.dat');
    y = load('ex5Liny.dat');
    
    figure;
    
    plot(x, y, 'o', 'MarkerFacecolor', 'r', 'MarkerSize', 8);  %plot带几个参数
    m = length(x);
    x = [ones(m,1), x, x.^2, x.^3, x.^4, x.^5]; %生成一个矩阵,7行6列
    n = size(x,2); %获取列数,size的作用的获取矩阵的行数和列数
    
    lambda = [0 1 10];
    plotstyle = {'b', 'r', 'g'};
    for i = 1:3
        L = lambda(i).*eye(n);%对角阵,eys生成单位对角矩阵
        L(1,1) = 0;%设置第一行第一列数字为0,为了求theta
        theta = (x'*x+L)\x'*y;  % '的作用是将矩阵旋转
        theta;
        %J的公式,纯粹是为了写出公式,没意义
        %J = (0.5/m) * (sum((x*theta-y).^2) + lambda(i)*sum(theta.^2));
        theta_norm = norm(theta);
        hold on
        x_vals = (-1:0.05:1)';%多行1列的矩阵,不加'就是多列1行的矩阵,以.0.05作为数字间隔
        features = [ones(size(x_vals)), x_vals, x_vals.^2, x_vals.^3, x_vals.^4, x_vals.^5];
        %41*6的矩阵
        plot(x_vals, features*theta, char(plotstyle(i)),'LineWidth', 2);
        legend(['lambda=', num2str(i)]);%添加标注信息
    end
    legend('Traing data','\lambda=0','\lambda=1','\lambda=10');
    title('5th order fit')
    hold off

##补充说明
最小二乘和极大似然是目标函数，梯度下降是优化算法。

机器学习的核心是一个model，一个loss fuction，再加上一个优化的算法。一个目标函数可以用不同的优化算法，不同的目标函数也可以用相同的优化算法。所以最小二乘和极大似然根本不是算法，和梯度下降毫无可比性。

交叉熵和最小二乘都是通过极大似然估计推断出来的，区别在于logistic回归predict的结果是在于分类的概率，而线性回归predict的结果是output, 结果的物理意义不同，所以求似然概率时他们似然概率的形式也就不同，log一下，就会发现他们的损失函数不同。

最小二乘法只能解决线性最小二乘问题，而logistic回归的损失函数不是线性最小二乘问题.


参考文章:

[http://blog.csdn.net/dongtingzhizi/article/details/16884215](http://blog.csdn.net/dongtingzhizi/article/details/16884215)

[http://www.cnblogs.com/fxjwind/p/3626173.html](http://www.cnblogs.com/fxjwind/p/3626173.html)

[http://studentdeng.github.io/blog/2014/07/28/machine-learning-tutorial/](http://studentdeng.github.io/blog/2014/07/28/machine-learning-tutorial/)