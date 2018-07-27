import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class WakeOnLan {

    public static void main(String args[]) {
        // javac WakeOnLan.java
        // java WakeOnLan
        // eHG win7 notebook 00:E0:80:01:A2:88
        // eHG zhou's notebook 3C:97:0E:E5:44:44
        // 一楼主卧00:E0:B4:54:81:6B
        // 客厅 00:E0:B4:53:94:5F
        String result = wake("DestinationName", "192.168.8.255", "00:E0:B4:53:94:5F", 9);
        System.out.println(result);
    }

    /*
     * name:
     * host: Destination IP
     * mac:  Destination Mac
     * port: Destination Port
     */
    private static String wake(String name, String host, String mac, int port) {
        try {
            byte[] macBytes = getMacBytes(mac); //转成字节类型
            byte[] bytes = new byte[6 + 16 * macBytes.length];
            for (int i = 0; i < 6; i++) {
                bytes[i] = (byte) 0xff;
            }
            for (int i = 6; i < bytes.length; i += macBytes.length) {
                System.arraycopy(macBytes, 0, bytes, i, macBytes.length); //放入16个MAC地址
            }
            InetAddress address = InetAddress.getByName(host);

            DatagramPacket packet = new DatagramPacket(bytes, bytes.length, address, port);
            DatagramSocket socket = new DatagramSocket();
            socket.send(packet);
            socket.close();
            return "WOL package sent success.";
        } catch (Exception e) {
            return "WOL package sent fail.";
        }
    }

    private static byte[] getMacBytes(String mac) throws IllegalArgumentException {
        byte[] bytes = new byte[6];
        String[] hex = mac.split("(\\:|\\-)");

        if (hex.length != 6) {
            throw new IllegalArgumentException("Invalid MAC address.");
        }
        try {
            for (int i = 0; i < 6; i++) {
                bytes[i] = (byte) Integer.parseInt(hex[i], 16);
            }
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid hex digit in MAC address.");
        }
        return bytes;
    }

}
