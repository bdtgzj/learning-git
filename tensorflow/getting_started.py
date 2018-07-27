import tensorflow as tf

''' 
build computational graph
'''
node_constant_1 = tf.constant(1.0, tf.float32)
node_constant_2 = tf.constant(2.0) # 数据类型推倒为 tf.float32，数据类型隐式（implicitly）声明
node_placeholder_1 = tf.placeholder(tf.float32) # param type is float32
node_placeholder_2 = tf.placeholder(tf.float32)
node_operation_constant = tf.add(node_constant_1, node_constant_2)
node_operation_placeholder = node_placeholder_1 + node_placeholder_2
node_operation_placeholder_and_triple = node_operation_placeholder * 3

''' 
session
'''
sess = tf.Session()

''' 
run computational graph
''' 
print(sess.run([node_constant_1, node_constant_2])) # [1.0, 2.0]
print(sess.run(node_placeholder_1, {node_placeholder_1: 3})) # 3.0
print(sess.run(node_operation_constant)) # 3.0
print(sess.run(node_operation_placeholder, {node_placeholder_1: [3, 4], node_placeholder_2: [3, 4]})) #[ 6.  8.]
print(sess.run(node_operation_placeholder_and_triple, {node_placeholder_1: [3, 4], node_placeholder_2: [3, 4]})) # [ 18.  24.]