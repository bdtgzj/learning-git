package com.nzxye.ai.util;

import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.ErrorModel;
import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;

import java.io.IOException;
import java.util.List;

import com.nzxye.ai.R;
import com.nzxye.ai.bean.HttpError;
import com.nzxye.ai.bean.Instruction;
import com.nzxye.ai.view.LoginActivity;
import com.nzxye.ai.view.MainActivity;

/**
 * Created by xiaodongyu on 7/8/2016 AD.
 */
public class ResponseUtil {

    public static List<Resource> parseResponse(retrofit2.Response<JSONApiObject> response, Context context) {
        // i.e. 200
        if (response.isSuccessful()) {
            JSONApiObject jsonApiObject = response.body();
            if (jsonApiObject != null) {
                // i.e.password error
                if (jsonApiObject.hasErrors()) {
                    List<ErrorModel> errorList = jsonApiObject.getErrors();
                    Toast.makeText(context, errorList.get(0).getDetail(), Toast.LENGTH_SHORT).show();
                } else {
                    if (jsonApiObject.getData().size() > 0) {
                        return jsonApiObject.getData();
                    } else {
                        // 数据为空的提示信息
                        // Toast.makeText(context, R.string.fragment_data_nonexistent, Toast.LENGTH_SHORT).show();
                    }
                }
            } else {
                Toast.makeText(context, R.string.fragment_data_nonexistent, Toast.LENGTH_SHORT).show();
            }
        // i.e. 401, 500 etc.
        } else {
            switch (response.code()) {
                case 401:
                    try {
                        Toast.makeText(context, response.errorBody().string(), Toast.LENGTH_LONG).show();
                    } catch (IOException e) {
                        System.out.println(e);
                    }
                    //
                    CommonUtil.deleteRememberMe(context);
                    //
                    CommonUtil.restartApp(context);
                    break;
                case 500:
                    HttpError httpError = ErrorUtil.parseError(response);
                    if (httpError != null && httpError.getErrors().size() > 0) {
                        Toast.makeText(context, httpError.getErrors().get(0).getDetail(), Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(context, R.string.error_network, Toast.LENGTH_SHORT).show();
                    }
                    break;
                default:
                    Toast.makeText(context, R.string.error_system, Toast.LENGTH_SHORT).show();
            }

        }

        return null;
    }

}