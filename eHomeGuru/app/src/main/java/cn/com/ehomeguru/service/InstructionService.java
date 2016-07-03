package cn.com.ehomeguru.service;

import com.gustavofao.jsonapi.Models.JSONApiObject;

import cn.com.ehomeguru.bean.Instruction;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.GET;
import retrofit2.http.PUT;
import retrofit2.http.Query;

/**
 * Created by xiaodongyu on 7/2/2016 AD.
 */
public interface InstructionService {

    @GET("instruction")
    Call<JSONApiObject> getInstructionByDevice(@Query("filter") String deviceId);

    @PUT("instruction")
    Call<JSONApiObject> setDeviceByInstruction(@Body Instruction instruction );

}
