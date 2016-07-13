package cn.com.ehomeguru.service;

import com.gustavofao.jsonapi.Models.JSONApiObject;

import cn.com.ehomeguru.bean.User;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

/**
 * Created by xiaodongyu on 6/12/2016 AD.
 */
public interface UserService {
    @POST("user/signin")
    // Call<User> signIn();
    Call<JSONApiObject> signIn(@Body User user);

    @POST("user/{id}")
    Call<JSONApiObject> updateOne(@Path("id") String userId, @Body User user);

}