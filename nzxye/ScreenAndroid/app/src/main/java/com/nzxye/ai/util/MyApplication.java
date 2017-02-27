package com.nzxye.ai.util;

import android.app.Application;
import android.content.Context;

/**
 * Created by xiaodongyu on 10/21/16.
 * Provider a global context.
 */

public class MyApplication extends Application {

    private static Context context;
    public static String LOG_TAG = "nzxye";

    public void onCreate() {
        super.onCreate();
        MyApplication.context = getApplicationContext();
    }

    public static Context getAppContext() {
        return MyApplication.context;
    }

}
