package cn.com.ehomeguru.util;

import com.gustavofao.jsonapi.Models.ErrorModel;

import java.io.IOException;
import java.lang.annotation.Annotation;

import cn.com.ehomeguru.bean.HttpError;
import cn.com.ehomeguru.service.ServiceGenerator;
import okhttp3.ResponseBody;
import retrofit2.Converter;
import retrofit2.Response;

/**
 * Created by xiaodongyu on 7/6/2016 AD.
 */
public class ErrorUtil {

    public static HttpError parseError(Response<?> response) {
        Converter<ResponseBody, HttpError> converter =
                ServiceGenerator.createRetrofit().responseBodyConverter(HttpError.class, new Annotation[0]);
        HttpError httpError;
        try {
            httpError = converter.convert(response.errorBody());
        } catch (IOException e) {
            return new HttpError();
        }

        return httpError;
    }

}
