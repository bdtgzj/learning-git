package com.nzxye.ai.service;

import com.nzxye.ai.bean.AddFaceResponse;
import com.nzxye.ai.bean.DetectResponse;
import com.nzxye.ai.bean.ResponseBase;
import com.nzxye.ai.bean.SetUserIDResponse;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

/**
 * Created by yuxiaodong on 29/01/2017.
 */

public interface FaceService {

    @Multipart
    @POST("detect")
    Call<DetectResponse> detectByByte(@Part("api_key") RequestBody apiKey, @Part("api_secret") RequestBody apiSecret, @Part MultipartBody.Part imageFile);

    @Multipart
    @POST("faceset/addface")
    Call<AddFaceResponse> addFace(
            @Part("api_key") RequestBody apiKey,
            @Part("api_secret") RequestBody apiSecret,
            @Part("outer_id") RequestBody outerID,
            @Part("face_tokens") RequestBody faceTokens
    );

    @Multipart
    @POST("face/setuserid")
    Call<SetUserIDResponse> setUserID(
            @Part("api_key") RequestBody apiKey,
            @Part("api_secret") RequestBody apiSecret,
            @Part("face_token") RequestBody faceToken,
            @Part("user_id") RequestBody userID

    );

}
