package main

import (
  "fmt"
  "net"
  "os"
  "time"
  "bytes"
)

const (
  SERVER_FAMILY_HOST = ""
  SERVER_FAMILY_PORT = "502"
  SERVER_FAMILY_TYPE = "tcp"

  SERVER_SCREEN_HOST = ""
  SERVER_SCREEN_PORT = "11502"
  SERVER_SCREEN_TYPE = "tcp"
)

// [0]:family socket [1]:screen socket
var (
  mapSocket map[string][]net.Conn = make(map[string][]net.Conn)
)

func main() {
  // registe socket in os core
  lFamily, err := net.Listen(SERVER_FAMILY_TYPE, SERVER_FAMILY_HOST + ":" + SERVER_FAMILY_PORT)
  if err != nil {
    fmt.Println("Error listening for family:", err.Error())
    os.Exit(1)
  }
  lScreen, err := net.Listen(SERVER_SCREEN_TYPE, SERVER_SCREEN_HOST + ":" + SERVER_SCREEN_PORT)
  if err != nil {
    fmt.Println("Error listening for screen:", err.Error())
    os.Exit(1)
  }

  // unregiste socket in os core when the application exit.
  defer lFamily.Close()
  defer lScreen.Close()

  fmt.Println("Listening on " + SERVER_FAMILY_HOST + ":" + SERVER_FAMILY_PORT)
  fmt.Println("Listening on " + SERVER_SCREEN_HOST + ":" + SERVER_SCREEN_PORT)

  go manageMapSocket()

  go listenerScreen(lScreen)

  for {
    // Listening for an incoming connection.
    // blocking api, the thead is blocked, the code after this api will not be executed immediately.
    conn, err := lFamily.Accept()
    if err != nil {
      fmt.Println("Error accepting for family: ", err.Error())
      os.Exit(1)
    }
    //fmt.Println("a new connection: %v; remote client is: %v", connID, conn.RemoteAddr().String())
    // create & manage connections in a new goroutine.
    go createFamilyConn(conn)
  }
}

func listenerScreen(lScreen net.Listener) {
  for {
    // Listening for an incoming connection.
    // blocking api, the thead is blocked, the code after this api will not be executed immediately.
    conn, err := lScreen.Accept()
    if err != nil {
      fmt.Println("Error accepting for screen: ", err.Error())
      os.Exit(1)
    }
    // create & manage connections in a new goroutine.
    go createScreenConn(conn)
  }
}

func createFamilyConn(conn net.Conn) {
  // Make a buffer to hold incoming data
  buf := make([]byte, 1024)
  // hold SN
  sn := ""

  // request for SN
  conn.Write([]byte("SN"))

  // Read the incoming connection into the buffer
  for {
    // blocking api, the thead is blocked, the code after this api will not be executed immediately.
    dataLen, err := conn.Read(buf)
    if err != nil {
      fmt.Println("Error reading for family:", err.Error())
      continue
      //os.Exit(1)
    }

    // SN packet
    if bytes.Contains([]byte("SN"), buf[0:2]) {
      // get SN
      sn = string(buf[2:dataLen-1])
      // add to map
      _, ok := mapSocket[sn]
      if !ok {
        mapSocket[sn] = []net.Conn{conn, nil}
        fmt.Println("family socket have added to map by family: ", sn)
      }
    // Non-SN packet
    } else {
      if len(sn) > 0 {
        val, ok := mapSocket[sn]
        if ok {
          fmt.Println("1")
          if val[1] != nil {
            fmt.Println("2")
            connScreen, ok := val[1].(net.Conn)
            if ok {
              fmt.Println("3")
              connScreen.Write(buf[:dataLen-1])
            }
          }
        }
      } else {
        // request for SN
        conn.Write([]byte("SN"))
      }
      
    }
    // Send a response back to person contacting us.
    //conn.Write([]byte("Message received." + string(dataLen) + string(buf) + "\n"))
  }
  // Close the connection when you're done with it.
  // conn.Close()
}

func createScreenConn(conn net.Conn) {
  // Make a buffer to hold incoming data
  buf := make([]byte, 1024)
  // hold SN
  sn := ""

  // Read the incoming connection into the buffer
  for {
    // blocking api, the thead is blocked, the code after this api will not be executed immediately.
    dataLen, err := conn.Read(buf)
    if err != nil {
      fmt.Println("Error reading for screen:", err.Error())
      //continue
      os.Exit(1)
    }

    // get SN
    sn = string(buf[:3])
    // add to map
    _, ok := mapSocket[sn]
    if !ok {
      // mapSocket[sn] = [2]net.Conn{conn}
      // fmt.Println("SN have added to map by screen:", sn)
      fmt.Println("family not exist: ", sn)
      conn.Write([]byte("family not exist."))
      continue
    }
    // add screen socket
    if mapSocket[sn][1] == nil {
      mapSocket[sn][1] = conn
      fmt.Println("screen socket have added to map by screen: ", sn)
    }
    // send to family
    if mapSocket[sn][0] != nil {
      connFamily, ok := mapSocket[sn][0].(net.Conn)
      if ok {
        connFamily.Write((buf[:dataLen-1]))
      }
    }

  }
  // Close the connection when you're done with it.
  // conn.Close()
}

func manageMapSocket() {
  for {
    time.Sleep(30000 * time.Millisecond)
    fmt.Println(len(mapSocket))
  }
}
