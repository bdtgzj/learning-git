package com.nzxye.ai.service;

import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.nzxye.ai.bean.Customer;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by xiaodongyu on 6/28/2016 AD.
 */
public interface CustomerService {

    @POST("customer")
    Call<JSONApiObject> create(@Body Customer customer);

    @GET("customer/{id}")
    Call<JSONApiObject> retrieveByID(@Path("id") String customerID);

}
