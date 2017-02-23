package com.nzxye.ai.util;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;

import com.nzxye.ai.bean.User;
import com.nzxye.ai.model.UserKey;

import io.realm.Realm;
import io.realm.RealmConfiguration;

/**
 * Created by xiaodongyu on 8/24/16.
 */
public class CommonUtil {

    public static boolean equals(Object a, Object b) {
        return (a == b) || (a != null && a.equals(b));
    }

    public static Realm getRealm() {
        // Initialize Realm
        Realm.init(MyApplication.getAppContext());
        // Configure Realm
        RealmConfiguration realmConfiguration = new RealmConfiguration.Builder()
                .deleteRealmIfMigrationNeeded()
                .build();
        // Get a Realm instance for this thread
        return Realm.getInstance(realmConfiguration);
    }

    public static void deleteRememberMe(Context context) {
        // clear remember me
        Realm realm = getRealm();
        realm.executeTransaction(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {
                realm.delete(UserKey.class);
            }
        });
    }

    public static void updateRememberMe(Context context, final User user) {
        Realm realm = getRealm();
        realm.executeTransaction(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {
                // remove all
                realm.delete(UserKey.class);
                // add one
                UserKey userKey = realm.createObject(UserKey.class);
                userKey.setId(user.getId());
                userKey.setFid(user.getFid());
                userKey.setName(user.getName());
                userKey.setKey(user.getPassword());
                // for user info
                userKey.setNickName(user.getNickName());
                userKey.setEmail(user.getEmail());
                userKey.setMphone(user.getMphone());
            }
        });
    }

    public static void restartApp(Context context) {
        Intent i = context.getPackageManager()
                .getLaunchIntentForPackage(context.getPackageName());
        i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        context.startActivity(i);
    }

    public static void hideKeyboard(Activity activity) {
        // Check if no view has focus:
        View view = activity.getCurrentFocus();
        if (view != null) {
            InputMethodManager imm = (InputMethodManager)activity.getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
        }
    }

    /*
    * 冒泡排序
    * 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
    * 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
    * 针对所有的元素重复以上的步骤，除了最后一个。
    * 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
    * @param numbers 需要排序的整型数组
    */
    public static void bubbleSort(int[] numbers)
    {
        int temp = 0;
        int size = numbers.length;
        for(int i = 0 ; i < size-1; i ++)
        {
            for(int j = 0 ;j < size-1-i ; j++)
            {
                if(numbers[j] > numbers[j+1])  //交换两数位置
                {
                    temp = numbers[j];
                    numbers[j] = numbers[j+1];
                    numbers[j+1] = temp;
                }
            }
        }
    }

}
