package com.nzxye.ai.model;

import io.realm.RealmObject;

/**
 * Created by xiaodongyu on 6/15/2016 AD.
 */
public class UserKey extends RealmObject {
    private String id;
    private int fid;
    private String name;
    private String key;
    private String nickName;
    private String email;
    private String mphone;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getFid() {
        return fid;
    }

    public void setFid(int fid) {
        this.fid = fid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMphone() {
        return mphone;
    }

    public void setMphone(String mphone) {
        this.mphone = mphone;
    }
}
