package cn.com.ehomeguru.service;

import com.gustavofao.jsonapi.Models.JSONApiObject;

import retrofit2.Call;
import retrofit2.http.GET;

/**
 * Created by xiaodongyu on 6/24/2016 AD.
 */
public interface HomeCardService {

    @GET("homecard")
    Call<JSONApiObject> getHomeCard();

}
