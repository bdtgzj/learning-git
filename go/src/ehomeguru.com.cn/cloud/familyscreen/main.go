package main

import (
  "fmt"
  "net"
  "os"
  "time"
  "bytes"
  "io"
  "encoding/binary"
)

const (
  SERVER_FAMILY_HOST = ""
  SERVER_FAMILY_PORT = "502"
  SERVER_FAMILY_TYPE = "tcp"

  SERVER_SCREEN_HOST = ""
  SERVER_SCREEN_PORT = "11502"
  SERVER_SCREEN_TYPE = "tcp"
)

var (
  IS_SET_SN = []byte{ 0x00, 0x00, 0x00, 0x00, 0x00, 0x0B,
                      0x01, 0x10, 0x00, 0x00, 0x00, 0x02, 0x04, 0x00, 0x00, 0x00, 0x01 }
  T_GET_SN = []byte{ 0x00, 0x00, 0x00, 0x00, 0x00, 0x06,
                      0x01, 0x03, 0x00, 0x00, 0x00, 0x02 }
  R_GET_SN = []byte{ 0x00, 0x01, 0x00, 0x00, 0x00, 0x07,
                      0x01, 0x03, 0x04 }
)

type FamilyScreen struct {
  Family net.Conn
  // uint32: user id string: screen device id;
  Screen map[uint32]map[string]net.Conn
}

func (fs FamilyScreen) getScreens() {
  for k, _ := range fs.Screen {
    //fmt.Printf("", k, v)
    fmt.Println(k)
  }
}

// uint32 == family SN
var (
  familyScreen map[uint32]FamilyScreen = make(map[uint32]FamilyScreen)
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
  sn := uint32(0)

  // request for SN
  //conn.Write([]byte("SN"))
  conn.Write(T_GET_SN)

  // Read the incoming connection into the buffer
  for {
    // blocking api, the thead is blocked, the code after this api will not be executed immediately.
    dataLen, err := conn.Read(buf)
    if err != nil {
      // received a FIN packet from family client.
      if err == io.EOF {
        fmt.Println("Close connection by family client: ", err.Error())
      } else {
        fmt.Println("Error reading for family:", err.Error())
      }
      // send FIN packet
      conn.Close()
      conn = nil
      // remove conn from familyScreen
      if sn > 0 {
        tmp := familyScreen[sn]
        tmp.Family = nil
        familyScreen[sn] = tmp
        // delete(familyScreen, sn)
      }
      // exit thread
      return
    }

    // SN packet
    //if bytes.Contains([]byte("SN"), buf[0:2]) {
    if bytes.Contains(R_GET_SN, buf[0:9]) {
      // get SN, buf[] must 4 bytes, otherwise return err
      err := binary.Read(bytes.NewReader(buf[9:13]), binary.BigEndian, &sn)
      if err != nil {
        fmt.Println("binary.Read failed by family:", err)
      }
      // add to map
      _, ok := familyScreen[sn]
      if !ok {
        familyScreen[sn] = FamilyScreen{conn, make(map[uint32]map[string]net.Conn)} //
        fmt.Println("FamilyScreen is created & family socket have added to map by family: ", sn)
      } else {
        tmp := familyScreen[sn]
        tmp.Family = conn
        familyScreen[sn] = tmp
        fmt.Println("family socket have added to map by family: ", sn)
      }
    // Non-SN packet, Forward to Screen
    } else {
      if sn > 0 {
        _, ok := familyScreen[sn]
        if ok {
          if len(familyScreen[sn].Screen) > 0 {
            if string(buf[:2]) != "@@" {
              // for single user mode
              familyScreen[sn].Screen[0]["default"].Write(buf[:dataLen])
            } else {
              // for multi user mode
            }
          } else {
            fmt.Println("Screen is not exist.")
          }
        }
      } else {
        // request for SN
        //conn.Write([]byte("SN"))
        conn.Write(T_GET_SN)
      }
      
    }
  }
  // Close the connection when you're done with it.
  // conn.Close()
}

func createScreenConn(conn net.Conn) {
  // Make a buffer to hold incoming data
  buf := make([]byte, 1024)
  // hold SN
  sn := uint32(0)
  // hold userid
  uid := uint32(0)
  // hold screenid
  //sid := ""

  // Read the incoming connection into the buffer
  for {
    // blocking api, the thead is blocked, the code after this api will not be executed immediately.
    dataLen, err := conn.Read(buf)
    if err != nil {
      // received a FIN packet from screen client.
      if err == io.EOF {
        fmt.Println("Close connection by screen client: ", err.Error())
        // send FIN packet
        conn.Close()
        conn = nil
      } else {
        fmt.Println("Error reading for screen:", err.Error())
      }
      
      // remove conn from FamilyScreen
      if sn > 0 {
        val, ok := familyScreen[sn]
        if ok {
          // delete(mapSocket, sn)
          // not create mapSocket[sn], neither delete mapSocket, just set.
          val.Screen[uid] = nil
          familyScreen[sn] = val
        }
      }
      // exit thread
      return
    }

    // get SN
    err = binary.Read(bytes.NewReader(buf[:4]), binary.BigEndian, &sn)
    if err != nil {
      fmt.Println("binary.Read SN failed by screen:", err)
    }
    // get uid
    err = binary.Read(bytes.NewReader(buf[4:8]), binary.BigEndian, &uid)
    if err != nil {
      fmt.Println("binary.Read UID failed by screen:", err)
    }
    // add to map
    _, ok := familyScreen[sn]
    if !ok {
      // mapSocket[sn] = [2]net.Conn{conn}
      // fmt.Println("SN have added to map by screen:", sn)
      fmt.Println("family not exist: ", sn)
      conn.Write([]byte("family not exist."))
      continue
    }
    // add screen socket
    _, ok = familyScreen[sn].Screen[uid]["default"]
    if !ok {
      tmp := familyScreen[sn]
      // kick off the former & remove
      val, ok := tmp.Screen[0]["default"]
      if ok {
        val.Close()
        for k, _ := range tmp.Screen {
          if k == 0 {
            continue
          }
          delete(tmp.Screen, k)
        }
        fmt.Println("the former have been kicked off")
      }
      //
      tmp.Screen[uid] = map[string]net.Conn{ "default": conn }
      // default screen socket
      tmp.Screen[0] = tmp.Screen[uid]
      familyScreen[sn] = tmp
      fmt.Println("screen socket have added to map by screen: ", sn)
    }
    // send to family
    if familyScreen[sn].Family != nil {
      familyScreen[sn].Family.Write(buf[:dataLen])
    }

  }
  // Close the connection when you're done with it.
  // conn.Close()
}

func manageMapSocket() {
  for {
    time.Sleep(30000 * time.Millisecond)
    fmt.Println(len(familyScreen))
  }
}
