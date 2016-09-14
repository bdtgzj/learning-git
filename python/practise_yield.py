# no block scope
def createGenerator():
    n = 1
    print('hello generator')
    if True:
        n = n + 1
        yield print(1)
    print(n)
    mylist = range(3)
    for i in mylist:
        print(i)
        yield i*i

mygenerator = createGenerator()
# <generator object createGenerator at 0x101210e60>
print(mygenerator)

for g in mygenerator:
    print(g)

for g in mygenerator:
    print(g)