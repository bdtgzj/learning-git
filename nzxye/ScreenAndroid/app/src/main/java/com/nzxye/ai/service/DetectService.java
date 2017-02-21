package com.nzxye.ai.service;

import com.nzxye.ai.bean.DetectResponse;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

/**
 * Created by yuxiaodong on 29/01/2017.
 */

public interface DetectService {

    @Multipart
    @POST("detect")
    Call<DetectResponse> detectByte(@Part("api_key") RequestBody apiKey, @Part("api_secret") RequestBody apiSecret, @Part MultipartBody.Part imageFile);

}
