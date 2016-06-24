package cn.com.ehomeguru.service;

import cn.com.ehomeguru.bean.Answer;
import retrofit2.Call;
import retrofit2.http.GET;

/**
 * Created by xiaodongyu on 6/24/2016 AD.
 */
public interface HomeCardService {

    @GET("home")
    Call<Answer> getHomeCard();

}
