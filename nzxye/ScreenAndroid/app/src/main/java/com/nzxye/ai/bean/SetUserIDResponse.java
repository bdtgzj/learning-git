package com.nzxye.ai.bean;

/**
 * Created by yuxiaodong on 03/03/2017.
 */

public class SetUserIDResponse extends ResponseBase {

    private String face_token;
    private String user_id;

    public String getFaceToken() {
        return face_token;
    }

    public void setFaceToken(String face_token) {
        this.face_token = face_token;
    }

    public String getUserID() {
        return user_id;
    }

    public void setUserID(String user_id) {
        this.user_id = user_id;
    }
}
