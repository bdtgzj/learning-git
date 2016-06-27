package cn.com.ehomeguru.bean;

import com.gustavofao.jsonapi.Annotations.Type;
import com.gustavofao.jsonapi.Models.Resource;

/**
 * Created by xiaodongyu on 6/23/2016 AD.
 */

@Type("homecard")
public class HomeCard extends Resource {

    private String icon;
    private String color;
    private String text;
    private int deviceId;

    public HomeCard() {

    }

    public HomeCard(String icon, String color, String text, int deviceID) {
        this.icon = icon;
        this.color = color;
        this.text = text;
        this.deviceId = deviceId;
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

    public int getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(int deviceId) {
        this.deviceId = deviceId;
    }
}
