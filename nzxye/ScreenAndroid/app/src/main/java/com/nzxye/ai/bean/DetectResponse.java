package com.nzxye.ai.bean;

import java.lang.reflect.Array;
import java.util.ArrayList;

/**
 * Created by yuxiaodong on 29/01/2017.
 */

public class DetectResponse extends ResponseBase {

    private ArrayList<Object> faces;
    private String image_id;

    public ArrayList<Object> getFaces() {
        return faces;
    }

    public void setFaces(ArrayList<Object> faces) {
        this.faces = faces;
    }

    public String getImage_id() {
        return image_id;
    }

    public void setImage_id(String image_id) {
        this.image_id = image_id;
    }
}
