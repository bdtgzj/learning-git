package com.nzxye.ai.bean;

/**
 * Created by yuxiaodong on 29/01/2017.
 */

public class DetectRequest extends RequestBase {

    private String image_url;
    private byte[] image_file;
    private int return_landmark;
    private String return_attributes;

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public byte[] getImage_file() {
        return image_file;
    }

    public void setImage_file(byte[] image_file) {
        this.image_file = image_file;
    }

    public int getReturn_landmark() {
        return return_landmark;
    }

    public void setReturn_landmark(int return_landmark) {
        this.return_landmark = return_landmark;
    }

    public String getReturn_attributes() {
        return return_attributes;
    }

    public void setReturn_attributes(String return_attributes) {
        this.return_attributes = return_attributes;
    }
}
