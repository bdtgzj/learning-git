package com.nzxye.ai.bean;

/**
 * Created by yuxiaodong on 03/03/2017.
 */

public class Face {

    private String face_token;
    private Object face_rectangle;
    private Object landmark;
    private Object attributes;

    public String getFaceToken() {
        return face_token;
    }

    public void setFaceToken(String face_token) {
        this.face_token = face_token;
    }

    public Object getFaceRectangle() {
        return face_rectangle;
    }

    public void setFaceRectangle(Object face_rectangle) {
        this.face_rectangle = face_rectangle;
    }

    public Object getLandmark() {
        return landmark;
    }

    public void setLandmark(Object landmark) {
        this.landmark = landmark;
    }

    public Object getAttributes() {
        return attributes;
    }

    public void setAttributes(Object attributes) {
        this.attributes = attributes;
    }
}
