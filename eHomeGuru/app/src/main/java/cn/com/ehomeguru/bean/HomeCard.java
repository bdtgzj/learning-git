package cn.com.ehomeguru.bean;

/**
 * Created by xiaodongyu on 6/23/2016 AD.
 */
public class HomeCard {

    private String icon;
    private String color;
    private String text;
    private int deviceID;

    public HomeCard() {

    }

    public HomeCard(String icon, String color, String text, int deviceID) {
        this.icon = icon;
        this.color = color;
        this.text = text;
        this.deviceID = deviceID;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getDeviceID() {
        return deviceID;
    }

    public void setDeviceID(int deviceID) {
        this.deviceID = deviceID;
    }
}
