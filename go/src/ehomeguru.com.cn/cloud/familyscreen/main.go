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
  // formator of Modbus RTU TCP HEADER, the end number is the nunber of data.
  T_HEADER = []byte{ 0x00, 0x00, 0x00, 0x00, 0x00, 0x02}
  R_HEADER = []byte{ 0x00, 0x01, 0x00, 0x00, 0x00, 0x02}
  // get the family id/sn of host1 according Modbus RTU
  T_GET_SN = []byte{ 0x00, 0x00, 0x00, 0x00, 0x00, 0x06,
                      0x01, 0x03, 0x00, 0x00, 0x00, 0x02 }            
  R_GET_SN = []byte{ 0x00, 0x01, 0x00, 0x00, 0x00, 0x07,
                     0x01, 0x03, 0x04 }
)

// Screen {1: {"android": conn, "ios": conn}, 2: {"android": conn, "ios": conn}}
type FamilyScreen struct {
  // Family: family socket
  Family net.Conn
  // uint32: user id 
  // string: screen device id
  // Screen: screen socket
  Screen map[uint32]map[string]net.Conn
}

func (fs FamilyScreen) getScreens() {
  for k, _ := range fs.Screen {
    //fmt.Printf("", k, v)
    fmt.Println(k)
  }
}

// uint32 == family SN
// familyScreen: map of FamilyScreen
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
    // fmt.Printf("a new Family connection: %v; remote client is: %v", conn, conn.RemoteAddr().String())
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
    // fmt.Printf("a new Screen connection: %v; remote client is: %v", conn, conn.RemoteAddr().String())
    // create & manage connections in a new goroutine.
    go createScreenConn(conn)
  }
}

func createFamilyConn(conn net.Conn) {
  // Make a buffer to hold incoming data
  buf := make([]byte, 1024)
  // hold familyid
  sn := uint32(0)
  // hold userid
  uid := uint32(0)
  // hold screenid
  sid := "default"

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
      // binary.LittleEndian
      var bufSN = []byte{buf[11], buf[12], buf[9], buf[10]}
      err := binary.Read(bytes.NewReader(bufSN), binary.BigEndian, &sn)
      if err != nil {
        fmt.Println("binary.Read failed by family:", err)
      }
      // add to map
      _, ok := familyScreen[sn]
      if !ok {
        familyScreen[sn] = FamilyScreen{conn, make(map[uint32]map[string]net.Conn)} 
        // FamilyScreen is created & family socket have added to map by family
        fmt.Println("【家端上线】", sn)
      } else {
        tmp := familyScreen[sn]
        tmp.Family = conn
        familyScreen[sn] = tmp
        // family socket have added to map by family: 
        fmt.Println("【家端更新上线】", sn)
      }
    // Non-SN packet, Forward to Screen
    } else {
      if sn >= 0 {
        _, ok := familyScreen[sn]
        if ok {
          if len(familyScreen[sn].Screen) > 0 {
            // get uid from packet
            uid = 0
            // get sid from packet
            sid = "default"
            // add sn to packet
            byteSN := make([]byte, 4)
            binary.BigEndian.PutUint32(byteSN, sn)
            var res []byte
            res = append(byteSN, buf...)
            // 
            fmt.Println("【Res】", res[:dataLen+4])
            familyScreen[sn].Screen[uid][sid].Write(res[:dataLen+4])
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
  // hold familyid
  sn := uint32(0)
  // hold userid
  uid := uint32(0)
  // hold screenid
  sid := "default"

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
      if sn >= 0 {
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
    // sigle user mode
    uid = 0
    // get screen id
    sid = "default"

    // add to map
    _, ok := familyScreen[sn]
    if !ok {
      // mapSocket[sn] = [2]net.Conn{conn}
      // fmt.Println("SN have added to map by screen:", sn)
      fmt.Println("ERROR:family not exist: ", sn)
      conn.Write([]byte("ERROR:抱歉，家端不在线。"))
      continue
    }
    // add screen socket
    screenSocket, ok := familyScreen[sn].Screen[uid][sid]
    if !ok {
      tmp := familyScreen[sn]
      tmp.Screen[uid] = map[string]net.Conn{ sid: conn }
      // default screen socket
      // tmp.Screen[0] = tmp.Screen[uid]
      familyScreen[sn] = tmp
      // screen socket have added to map by screen
      fmt.Println("【屏端上线】 ", sn)
    } else {
      if (screenSocket != conn) {
        /*
        // kick off the former & remove
        val, ok := tmp.Screen[uid][sid]
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
        */
        tmp := familyScreen[sn]
        tmp.Screen[uid] = map[string]net.Conn{ sid: conn }
        familyScreen[sn] = tmp
        fmt.Println("【屏端更新上线】 ", sn)
      }
    }
    // send to family
    if familyScreen[sn].Family != nil {
      fmt.Println("【Req】", buf[8:dataLen])
      familyScreen[sn].Family.Write(buf[8:dataLen])
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
