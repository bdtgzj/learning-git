package cn.com.ehomeguru.service;

import cn.com.ehomeguru.bean.Answer;
import cn.com.ehomeguru.bean.User;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

/**
 * Created by xiaodongyu on 6/12/2016 AD.
 */
public interface UserService {
    @POST("user/signin")
    // Call<User> signIn();
    Call<Answer> signIn(@Body User user);

    /*
    public static final Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("http://192.168.8.105:3000")
        .addConverterFactory(GsonConverterFactory.create())
        .build();
    */
}