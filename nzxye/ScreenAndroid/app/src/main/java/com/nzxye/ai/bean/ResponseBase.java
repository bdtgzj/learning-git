package com.nzxye.ai.bean;

/**
 * Created by yuxiaodong on 29/01/2017.
 */

public class ResponseBase {

    private String request_id;
    private int time_used;
    private String error_message;

    public String getRequestID() {
        return request_id;
    }

    public void setRequestID(String request_id) {
        this.request_id = request_id;
    }

    public int getTimeUsed() {
        return time_used;
    }

    public void setTimeUsed(int time_used) {
        this.time_used = time_used;
    }

    public String getErrorMessage() {
        return error_message;
    }

    public void setErrorMessage(String error_message) {
        this.error_message = error_message;
    }

}
