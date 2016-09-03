package cn.com.ehomeguru.service;

import com.gustavofao.jsonapi.Models.JSONApiObject;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

/**
 * Created by xiaodongyu on 6/28/2016 AD.
 */
public interface RegionService {

    @GET("region")
    Call<JSONApiObject> getRegion(@Query("uid") String uid);

}
