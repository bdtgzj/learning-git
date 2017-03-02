package com.nzxye.ai.service;

import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.nzxye.ai.bean.Checkin;
import com.nzxye.ai.bean.Customer;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

/**
 * Created by xiaodongyu on 6/28/2016 AD.
 */
public interface CheckinService {

    @POST("checkin")
    Call<JSONApiObject> create(@Body Checkin checkin);

}
