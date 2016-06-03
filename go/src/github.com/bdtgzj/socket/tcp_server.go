package main

import (
  "fmt"
  "net"
  "os"
  "time"
  "bytes"
  "github.com/kr/beanstalk"
)

const (
  // CONN_HOST = "localhost"
  CONN_HOST = ""
  CONN_PORT = "502"
  CONN_TYPE = "tcp"
)

// key=SN val=net.conn
var mSNConn map[string]net.Conn = make(map[string]net.Conn)

func main() {
  // Listen for incoming connections
  listener, err := net.Listen(CONN_TYPE, CONN_HOST + ":" + CONN_PORT)
  if err != nil {
    fmt.Println("Error listening:", err.Error())
    os.Exit(1)
  }
  // Close the listener when the application exit.
  defer listener.Close()

  fmt.Println("Listening on " + CONN_HOST + ":" + CONN_PORT)

  //connID := 0

  go manageSNConn()

  go consumer()

  for {
    // Listening for an incoming connection.
    // blocking api, the thead is blocked, the code after this api will not be executed immediately.
    conn, err := listener.Accept()

    if err != nil {
      fmt.Println("Error accepting: ", err.Error())
      os.Exit(1)
    }
    //connID++;
    //fmt.Println("a new connection: %v; remote client is: %v", connID, conn.RemoteAddr().String())
    // Handle connections in a new goroutine.
    go handleRequest(conn)
  }
}

// Handles incoming requests.
func handleRequest(conn net.Conn) {
  // Make a buffer to hold incoming data
  buf := make([]byte, 1024)
  // hold SN
  sn := ""
  // producer connection
  var c *beanstalk.Conn = nil

  // request for SN
  conn.Write([]byte("SN"))

  // Read the incoming connection into the buffer
  for {
    // get a connection, prepare for produce
    if c == nil {
      var err error = nil
      c, err = beanstalk.Dial("tcp", "127.0.0.1:11300")
      if err != nil {
        fmt.Println("Error connect to beanstalkd:", err.Error())
      } else {
        fmt.Println("Producer connect to beanstalkd successfully.")
      }
    }
    // blocking api, the thead is blocked, the code after this api will not be executed immediately.
    dataLen, err := conn.Read(buf)
    if err != nil {
      fmt.Println("Error reading:", err.Error())
      os.Exit(1)
    }

    // SN packet
    if bytes.Contains([]byte("SN"), buf[0:2]) {
      // get SN
      sn = string(buf[2:dataLen-1])
      // add SN-Conn to map
      _, ok := mSNConn[sn]
      if !ok {
        mSNConn[sn] = conn
        fmt.Printf("SN added\n")
      }
    // Non-SN packet
    } else {
      if len(sn) > 0 {
        tube := &beanstalk.Tube{c, sn}
        id, err := tube.Put([]byte(sn + string(buf[:dataLen])), 1, 0, 120*time.Second)
        if err != nil {
          fmt.Println("Error produce beanstalk:", err.Error())
          continue
        }
        fmt.Printf("Job id %d inserted\n", id)
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

func manageSNConn() {
  for {
    time.Sleep(20000 * time.Millisecond)
    fmt.Println(len(mSNConn))
  }
}

func consumer() {
  var c *beanstalk.Conn = nil
  for {
    // connect to beanstalkd, infinite loop, 
    if c == nil {
      var err error = nil
      c, err = beanstalk.Dial("tcp", "127.0.0.1:11300")
      if err != nil {
        fmt.Println("Error connect to beanstalkd:", err.Error())
      } else {
        fmt.Println("Consumer connect to beanstalkd successfully.")
      }
    }

    /*
    keys := make([]string, 0, len(mSNConn))
    for k := range mSNConn {
      keys = append(keys, k)
    }
    tubeSet := beanstalk.NewTubeSet(c, keys...)
    id, body, err := tubeSet.Reserve(5*time.Second)
    */
    // blocking api
    id, body, err := c.Reserve(5*time.Second)
    if err != nil {
      // this err indicate the job queue is empty
      //fmt.Println("Error comsume beanstalk:", err.Error())
    } else {
      // 
      val, ok := mSNConn[string(body[:3])]
      if ok {
        val.Write(body)
      }
      // delete job
      c.Delete(id)
      fmt.Printf("task id is: 【%d】; task content is 【%s】\n", id, string(body))
    }
  }
}
