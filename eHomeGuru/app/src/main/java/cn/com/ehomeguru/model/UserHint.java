package cn.com.ehomeguru.model;

import io.realm.RealmObject;

/**
 * Created by xiaodongyu on 6/15/2016 AD.
 */
public class UserHint extends RealmObject {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
