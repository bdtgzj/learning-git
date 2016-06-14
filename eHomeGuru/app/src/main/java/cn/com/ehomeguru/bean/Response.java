package cn.com.ehomeguru.bean;

/**
 * Created by yuxiaodong on 6/15/16.
 */
public class Response {
    private String desc;
    private Boolean valid;
    private Object data;

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
