package cn.com.ehomeguru.model;

import java.util.Hashtable;
import java.util.zip.GZIPOutputStream;

/**
 * Created by xiaodongyu on 6/27/2016 AD.
 */
public class GlobalData {

    private static GlobalData _instance;
    private Hashtable<String, Object> _hash;

    private GlobalData() {
        this._hash = new Hashtable<String, Object>();
    }

    private static GlobalData getInstance() {
        if (_instance == null) {
            _instance = new GlobalData();
        }
        return _instance;
    }

    public static void addObjectForKey(String key, Object obj) {
        getInstance()._hash.put(key, obj);
    }

    public static Object getObjectForKey(String key) {
        return getInstance()._hash.get(key);
    }

    public static void updateObjectForKey(String key, Object obj) {
        getInstance()._hash.put(key, obj);
    }

    public static void removeObjectForKey(String key) {
        getInstance()._hash.remove(key);
    }

}
