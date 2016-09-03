package cn.com.ehomeguru.service;

import com.gustavofao.jsonapi.Models.JSONApiObject;

import cn.com.ehomeguru.bean.Instruction;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

/**
 * Created by xiaodongyu on 7/2/2016 AD.
 */
public interface InstructionService {

    @GET("instruction")
    Call<JSONApiObject> getInstructionByDevice(@Query("uid") String uid, @Query("deviceId") String deviceId);

    @GET("instruction")
    Call<JSONApiObject> getInstructionByScene(@Query("uid") String uid, @Query("scene") String sceneId);

    @POST("instruction/exec")
    Call<JSONApiObject> execInstruction(@Body Instruction instruction );

}
