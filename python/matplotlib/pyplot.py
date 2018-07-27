import matplotlib.pyplot as plt

# axis label
plt.xlabel('cm')
plt.ylabel('inch')

#
xs = [1, 2, 3, 4, 5]
ys = []
for x in xs:
    ys.append(x * 2.54)
plt.plot(xs, ys)

#
xs1 = [1, 2, 3, 4, 5]
ys1 = []
for x1 in xs1:
    ys1.append(9 * x1 / 5 + 32)
plt.plot(xs1, ys1)

#
plt.show()