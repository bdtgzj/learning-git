package cn.com.ehomeguru.bean;

import com.gustavofao.jsonapi.Annotations.Type;
import com.gustavofao.jsonapi.Models.Resource;

/**
 * Created by xiaodongyu on 7/2/2016 AD.
 */
@Type("instruction")
public class Instruction extends Resource {

    private String deviceId;
    private String type;
    private String instruction;
    private int order;

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    @Override
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
