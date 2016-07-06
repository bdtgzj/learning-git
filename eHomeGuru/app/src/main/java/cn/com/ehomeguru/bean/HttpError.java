package cn.com.ehomeguru.bean;

import com.gustavofao.jsonapi.Models.ErrorModel;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by xiaodongyu on 7/6/2016 AD.
 */
public class HttpError {

    private ArrayList<ErrorModel> errors;

    public ArrayList<ErrorModel> getErrors() {
        return errors;
    }

    public void setErrors(ArrayList<ErrorModel> errors) {
        this.errors = errors;
    }
}
