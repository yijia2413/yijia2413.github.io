---
layout: post
title: Python实现树的操作
category: 代码
tags: 
  - 算法
  - 数据结构
  - Python
imagefeature: null
mathjax: false
chart: false
comments: true
featured: false
published: true
---


```python
#coding: utf8

class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

    def level_order(self, root):
        if root is None:
            return root
        queue = [root]
        while queue:
            node = queue.pop(0)
            print node.val,
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    def pre_order(self, root):
        if root is None:
            return
        print self.val,
        if self.left:
            self.left.pre_order(root)
        if self.right:
            self.right.pre_order(root)

    def pre_order1(self, root):
        if root is None:
            return
        stack = []
        node = root
        while node or stack:
            while node:
                print node.val,
                stack.append(node)
                node = node.left
            node = stack.pop()
            node = node.right

    def mid_order(self, root):
        if root is None:
            return
        if self.left:
            self.left.mid_order(root)
        print self.val,
        if self.right:
            self.right.mid_order(root)

    def last_order(self, root):
        if root is None:
            return
        stack1 = []
        stack2 = []
        node = root
        stack1.append(node)
        while stack1:
            node = stack1.pop()
            if node.left:
                stack1.append(node.left)
            if node.right:
                stack1.append(node.right)
            stack2.append(node)

        while stack2:
            print stack2.pop().val

    def children_count(self, root):
        if root is None:
            return 0
        if root.left is None and root.right is None:
            return 1
        num_left = self.children_count(root.left)
        num_right = self.children_count(root.right)
        return num_left + num_right

    def all_count(self, root):
        if root is None:
            return 0
        return self.all_count(root.left) + self.all_count(root.right) + 1

    def k_level_node(self, root, k):
        if root is None:
            return 0
        if k == 1:
            return 1
        k_left = self.k_level_node(root.left, k-1)
        k_right = self.k_level_node(root.right, k-1)
        return k_left + k_right

    def depth(self, root):
        if root is None:
            return 0
        left_depth = self.depth(root.left)
        right_depth = self.depth(root.right)

        return left_depth + 1 if left_depth > right_depth else right_depth + 1

    def is_avl(self, root):
        if root is None:
            return True
        left, right = 0, 0
        if not self.is_avl(root.left):
            return False
        if not self.is_avl(root.right):
            return False
        left = self.depth(root.left)
        right = self.depth(root.right)

        if abs(left-right) > 1:
            return False

        return True

    def check(self, a, b):
        if a is None and b is None:
            return True
        if a and b and a.val == b.val:
            return self.check(a.left, b.right) and self.check(a.right, b.left)
        return False

    def is_mirror(self, root):
        if root is None:
            return True
        return self.check(root.left, root.right)

    def is_mirror1(self, root):
        if root is None:
            return True
        stack = [[root.left, root.right]]
        while stack:
            pair = stack.pop()
            left = pair[0]
            right = pair[1]
            if left is None and right is None:
                continue
            if left.val == right.val:
                stack.append([left.left, right.right])
                stack.append([left.right, right.left])
            else:
                return False
            return True

    def get_lca_of_bin_search_tree(self, root, a, b):
        # 二叉查找树 和 一般二叉树均适合
        if root is None:
            return root
        if root is a or root is b:
            return root
        # 如果分别在根节点的左右两侧，返回根节点
        # 如果都在左(右)子树，则递归处理
        left = self.get_lca_of_bin_search_tree(root.left, a, b)
        right = self.get_lca_of_bin_search_tree(root.right, a, b)

        if left is not None and right is not None:
            return root
        if left:
            return left
        if right:
            return right
        return None

    def max_distance(self, root):
        if root is None:
            return 0
        elif root.left is None and root.right is None:
            return 0
        dis = max(
                (self.depth(root.left)+self.depth(root.right)),
                self.max_distance(root.left),
                self.max_distance(root.right)
                )

        return dis

    def lookup(self, val, parent=None):
        if val < self.val:
            if self.left is None:
                return None, None
            return self.left.lookup(val, self)
        elif val > self.val:
            if self.right is None:
                return None, None
            return self.right.lookup(val, self)
        else:
            return self, parent

    def get_lca_of_bin_search_tree1(self, root, a, b):
        # 适合二叉查找树求最近公共祖先
        while True:
            if root.val > max(a.val, b.val):
                root = root.left
            elif root.val < min(a.val, b.val):
                root = root.right
            else:
                break
        return root


def main():
    node = TreeNode(8,TreeNode(3, TreeNode(4), TreeNode(5)),TreeNode(3, TreeNode(5), TreeNode(4)))
    node1 = TreeNode(8,TreeNode(3, TreeNode(4), TreeNode(5)),TreeNode(3, TreeNode(5)))
    not_avl = TreeNode(1, TreeNode(2, TreeNode(4, TreeNode(5))), TreeNode(3))

    node2 = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6, TreeNode(4), TreeNode(7))), TreeNode(10, right=TreeNode(14, TreeNode(13))))

    node.level_order(node)
    print
    node.pre_order(node)
    print
    node.pre_order1(node)
    print
    node.mid_order(node)
    print
    print node.k_level_node(node, 2)
    print node1.children_count(node1)
    print node1.all_count(node1)
    print node.depth(node)
    print
    print not_avl.is_avl(not_avl)
    print node.is_avl(node)
    print node.is_mirror(node)
    print node.is_mirror1(node)

    # lcs
    node2.level_order(node2)
    print
    res = node2.get_lca_of_bin_search_tree(node, node.left.right, node.left.right.right)
    if res:
        print res.val

    dis = node2.max_distance(node2)
    print dis

    child, parent = node2.lookup(14)
    if child is not None and parent is not None:
        print child.val, parent.val


if __name__ == '__main__':
    main()

```