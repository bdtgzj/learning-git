package cn.com.ehomeguru.service;

import com.gustavofao.jsonapi.Models.JSONApiObject;

import cn.com.ehomeguru.bean.Instruction;
import cn.com.ehomeguru.bean.Scene;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by xiaodongyu on 7/8/2016 AD.
 */
public interface SceneService {

    @GET("scene")
    Call<JSONApiObject> getSceneByRegion(@Query("region") String regionId);

    @GET("scene/{id}")
    Call<JSONApiObject> getSceneById(@Path("id") String sceneId);

    @POST("scene/exec")
    Call<JSONApiObject> setDeviceByScene(@Body Scene scene );

}
