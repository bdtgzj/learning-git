package cn.com.ehomeguru.bean;

import com.gustavofao.jsonapi.Annotations.Type;
import com.gustavofao.jsonapi.Models.Resource;

/**
 * Created by xiaodongyu on 6/23/2016 AD.
 */

@Type("homecard")
public class HomeCard extends Resource {

    private String name;
    private String icon;
    private String color;
    private String deviceId;
    private String sceneId;
    // 0 = off, 1 = on
    private int status;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getSceneId() {
        return sceneId;
    }

    public void setSceneId(String sceneId) {
        this.sceneId = sceneId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
