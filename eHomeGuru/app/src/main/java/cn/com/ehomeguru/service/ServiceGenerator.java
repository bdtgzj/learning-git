package cn.com.ehomeguru.service;

import android.util.Base64;

import com.gustavofao.jsonapi.Retrofit.JSONConverterFactory;

import java.io.IOException;

import cn.com.ehomeguru.bean.Device;
import cn.com.ehomeguru.bean.HomeCard;
import cn.com.ehomeguru.bean.Instruction;
import cn.com.ehomeguru.bean.Log;
import cn.com.ehomeguru.bean.Region;
import cn.com.ehomeguru.bean.Scene;
import cn.com.ehomeguru.bean.User;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by xiaodongyu on 6/13/2016 AD.
 */
public class ServiceGenerator {

    public static final String API_BASE_URL = "http://192.168.8.66:3000";

    private static OkHttpClient.Builder httpClient = new OkHttpClient.Builder();

    private static Retrofit.Builder builder = new Retrofit.Builder()
            .baseUrl(API_BASE_URL)
            //.addConverterFactory(GsonConverterFactory.create());
            .addConverterFactory(JSONConverterFactory.create(User.class, HomeCard.class, Region.class, Device.class, Instruction.class, Scene.class, Log.class));

    public static <S> S createService(Class<S> serviceClass) {
        return createService(serviceClass, null, null);
    }

    public static <S> S createService(Class<S> serviceClass, String name, String password) {
        // add basic authentication header fields to OkHttpClient.
        if (name != null && password != null) {
            String credentials = name + ":" + password;
            final String basic = "Basic " + Base64.encodeToString(credentials.getBytes(), Base64.NO_WRAP);

            httpClient.addInterceptor(new Interceptor() {
                @Override
                public Response intercept(Chain chain) throws IOException {
                    Request original = chain.request();

                    Request.Builder requestBuilder = original.newBuilder()
                            .header("Authorization", basic)
                            .header("Accept", "application/json")
                            .method(original.method(), original.body());
                    Request request = requestBuilder.build();
                    return chain.proceed(request);
                }
            });
        }

        OkHttpClient client = httpClient.build();
        Retrofit retrofit = builder.client(client).build();
        return retrofit.create(serviceClass);
    }

    // produce a retrofit for convert http json body of http error(i.e. 500)
    public static Retrofit createRetrofit() {
        Retrofit.Builder builder = new Retrofit.Builder()
                .baseUrl(API_BASE_URL)
                .addConverterFactory(GsonConverterFactory.create());
        Retrofit retrofit = builder.build();
        return retrofit;
    }

}
