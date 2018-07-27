import tensorflow as tf

'''
Build computational graph
'''
W = tf.Variable([.3], dtype = tf.float32) # model param: weight
b = tf.Variable([-.3], dtype = tf.float32) # model param: bias
x = tf.placeholder(tf.float32) # model input
linear_model = W * x + b # learning algorithm, model, model output

y = tf.placeholder(tf.float32) # desired output
squared_deltas = tf.square(linear_model - y) # 平方(训练误差)，平方(模型输出值 - 样本标记值)
loss = tf.reduce_sum(squared_deltas) # 累加(训练误差)

'''
session
'''
sess = tf.Session()

'''
init variables node
'''
init = tf.global_variables_initializer()
sess.run(init)

''' 
run computational graph
'''
print(sess.run(linear_model, {x: [1, 2, 3, 4]})) # model output
print(sess.run(loss, {x: [1, 2, 3, 4], y: [0, -1, -2 ,-3]})) # loss value

''' 
adjust model param
「训练误差」趋零则可做「泛化误差」，「泛化误差」趋零模型才可用。
'''
loss_value = sess.run(loss, {x: [1, 2, 3, 4], y: [0, -1, -2 ,-3]})
if loss_value > 0:
    fixW = tf.assign(W, [-1.])
    fixb = tf.assign(b, [1.])
    sess.run([fixW, fixb])
    print(sess.run(loss, {x: [1, 2, 3, 4], y: [0, -1, -2 ,-3]}))