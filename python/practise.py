# no block scope
def no_block_scope():
    a = 'a'
    for i in range(2):
        a = i
    print(a) # 1

no_block_scope()

# class
class C:
    def __init__(self, i):
        self.i = i

    def fn(self):
        print('Hello fn.', self)

    # 对象函数
    def t(self):
        print('Hello t.', C.t1())

    # 类函数
    def t1():
        return 'haha'
c = C(1)
print(c.i)

C.fn(1) # Hello fn. 1
c.fn()  # Hello fn. <__main__.C object at 0x1014069b0>
c.t()

