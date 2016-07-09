package cn.com.ehomeguru.util;

import android.content.Context;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.ErrorModel;
import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;

import java.util.List;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.bean.HttpError;
import cn.com.ehomeguru.bean.Instruction;

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
                        Toast.makeText(context, R.string.fragment_data_nonexistent, Toast.LENGTH_SHORT).show();

                    }
                }
            } else {
                Toast.makeText(context, R.string.fragment_data_nonexistent, Toast.LENGTH_SHORT).show();
            }
            // i.e. 500
        } else {
            HttpError httpError = ErrorUtil.parseError(response);
            if (httpError != null && httpError.getErrors().size() > 0) {
                Toast.makeText(context, httpError.getErrors().get(0).getDetail(), Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(context, R.string.error_network, Toast.LENGTH_SHORT).show();
            }
        }

        return null;
    }

}