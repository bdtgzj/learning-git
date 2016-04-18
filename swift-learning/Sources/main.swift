if Process.arguments.count != 2 {
  print("Usage: swift-learning NAME")
} else {
  let name = Process.arguments[1]
  sayHello(name)
}
