package cn.com.ehomeguru.service;

import com.gustavofao.jsonapi.Models.JSONApiObject;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

/**
 * Created by xiaodongyu on 6/29/2016 AD.
 */
public interface DeviceService {

    @GET("device")
    Call<JSONApiObject> getDeviceByRegion(@Query("filter") String regionId);

}
