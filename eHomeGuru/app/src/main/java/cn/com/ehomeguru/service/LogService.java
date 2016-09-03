package cn.com.ehomeguru.service;

import com.gustavofao.jsonapi.Models.JSONApiObject;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

/**
 * Created by xiaodongyu on 6/28/2016 AD.
 */
public interface LogService {

    @GET("log")
    Call<JSONApiObject> getLog(@Query("uid") String uid, @Query("category") int category);

}
