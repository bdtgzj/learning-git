package com.nzxye.ai.bean;

/**
 * Created by yuxiaodong on 03/03/2017.
 */

public class SearchResult {

    private String face_token;
    private float confidence;
    private String user_id;

    public String getFaceToken() {
        return face_token;
    }

    public void setFaceToken(String face_token) {
        this.face_token = face_token;
    }

    public float getConfidence() {
        return confidence;
    }

    public void setConfidence(float confidence) {
        this.confidence = confidence;
    }

    public String getUserId() {
        return user_id;
    }

    public void setUserId(String user_id) {
        this.user_id = user_id;
    }
}
