package com.nzxye.ai.bean;

import java.util.ArrayList;

/**
 * Created by yuxiaodong on 03/03/2017.
 */

public class AddFaceResponse extends ResponseBase {

    private String faceset_token;
    private String outer_id;
    private int face_added;
    private int face_count;
    private ArrayList<String> failure_detail;

    public String getFacesetToken() {
        return faceset_token;
    }

    public void setFacesetToken(String faceset_token) {
        this.faceset_token = faceset_token;
    }

    public String getOuterID() {
        return outer_id;
    }

    public void setOuterID(String outer_id) {
        this.outer_id = outer_id;
    }

    public int getFaceAdded() {
        return face_added;
    }

    public void setFaceAdded(int face_added) {
        this.face_added = face_added;
    }

    public int getFaceCount() {
        return face_count;
    }

    public void setFaceCount(int face_count) {
        this.face_count = face_count;
    }

    public ArrayList<String> getFailureDetail() {
        return failure_detail;
    }

    public void setFailureDetail(ArrayList<String> failure_detail) {
        this.failure_detail = failure_detail;
    }
}
