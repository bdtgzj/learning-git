package com.nzxye.ai.util;

import android.os.Environment;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;

/**
 * Created by yuxiaodong on 30/01/2017.
 */

public class RetrofitUtil {

    public static RequestBody getPartFromString(String descriptionString) {
        return RequestBody.create(MultipartBody.FORM, descriptionString);
    }

    public static MultipartBody.Part getPartFromBytes(String partName, byte[] descriptionBytes) {
        // image/*
        RequestBody requestBody = RequestBody.create(MediaType.parse("image/jpeg"), descriptionBytes);
        MultipartBody.Part part = null;
        try {
            part = MultipartBody.Part.createFormData(partName, URLEncoder.encode(" ", "UTF-8"), requestBody);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return part;
    }

    public static MultipartBody.Part getPartFromFile(String partName, String fileName) {
        File file = new File(Environment.getExternalStorageDirectory() + "/" + fileName);
        RequestBody requestBody = RequestBody.create(MediaType.parse("image/jpeg"), file);
        MultipartBody.Part part = null;
        try {
            part = MultipartBody.Part.createFormData(partName, URLEncoder.encode(fileName, "UTF-8"), requestBody);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return part;
    }

}
