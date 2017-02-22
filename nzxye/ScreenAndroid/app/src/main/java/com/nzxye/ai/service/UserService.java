package com.nzxye.ai.service;

import com.gustavofao.jsonapi.Models.JSONApiObject;

import com.nzxye.ai.bean.User;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by xiaodongyu on 6/12/2016 AD.
 */
public interface UserService {
    @POST("user/signin")
    // Call<User> signIn();
    Call<JSONApiObject> signIn(@Body User user);

    @POST("user/{id}")
    Call<JSONApiObject> updateOne(@Path("id") String userId, @Body User user);

    @GET("user")
    Call<JSONApiObject> retrieve(@Query("id") String id);

}