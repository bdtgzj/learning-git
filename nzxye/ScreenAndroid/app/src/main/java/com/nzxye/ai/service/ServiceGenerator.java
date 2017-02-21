package com.nzxye.ai.service;

import android.provider.MediaStore;

import java.io.IOException;
import java.util.Random;

import okhttp3.Interceptor;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class ServiceGenerator {

    public static final String API_BASE_URL = "https://api-cn.faceplusplus.com/facepp/v3/";
    // Trial API Key
    public static final String API_KEY = "3MFQsFtElFW-lkygRE9q9GACWaj72FLi";
    public static final String API_SECRET = "pgdbEKWuxrCL-gEUcNtQtBxcZo9yNJqb";

    private static OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
    private static String boundaryString = getBoundary();

    private static Retrofit.Builder builder = new Retrofit.Builder()
            .baseUrl(API_BASE_URL)
            .addConverterFactory(GsonConverterFactory.create());
            //.addConverterFactory(JSONConverterFactory.create(User.class, HomeCard.class, Region.class, Device.class, Instruction.class, Scene.class, Log.class));

    public static <S> S createService(Class<S> serviceClass) {
        httpClient.addInterceptor(new Interceptor() {
            @Override
            public Response intercept(Chain chain) throws IOException {
                Request original = chain.request();

                Request.Builder requestBuilder = original.newBuilder()
                        // .header("Content-Type", "multipart/form-data; boundary=" + boundaryString)
                        .header("Accept", "application/json")
                        // .header("connection", "Keep-Alive")
                        .method(original.method(), original.body());
                Request request = requestBuilder.build();
                return chain.proceed(request);
            }
        });

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

    private static String getBoundary() {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();

        for(int i = 0; i < 32; ++i) {
            sb.append("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-".charAt(random.nextInt("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_".length())));
        }

        return sb.toString();
    }

}
