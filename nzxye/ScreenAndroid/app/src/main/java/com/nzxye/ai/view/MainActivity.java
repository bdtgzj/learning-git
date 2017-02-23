package com.nzxye.ai.view;

import android.content.Intent;
import android.content.res.Configuration;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.IdRes;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.widget.TextView;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;
import com.roughike.bottombar.BottomBar;
import com.roughike.bottombar.OnTabReselectListener;
import com.roughike.bottombar.OnTabSelectListener;

import java.util.List;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.bean.Device;
import cn.com.ehomeguru.bean.HomeCard;
import cn.com.ehomeguru.bean.Scene;
import cn.com.ehomeguru.bean.User;
import cn.com.ehomeguru.model.GlobalData;
import cn.com.ehomeguru.service.DeviceService;
import cn.com.ehomeguru.service.SceneService;
import cn.com.ehomeguru.service.ServiceGenerator;
import cn.com.ehomeguru.util.ResponseUtil;
import retrofit2.Call;
import retrofit2.Callback;

public class MainActivity extends AppCompatActivity
        implements HomeFragment.OnHomeFragmentInteractionListener, RegionFragment.OnFragmentInteractionListener,
                   DeviceFragment.OnListFragmentInteractionListener, SceneFragment.OnFragmentInteractionListener,
                   SceneListFragment.OnSceneListFragmentInteractionListener, MeFragment.OnFragmentInteractionListener {

    private BottomBar bottomBar;
    private Toolbar toolbar;
    // can't getSupportFragmentManager().getFragments() when the first, async api?
    private int firstClick;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        /*
        // tmp data for test
        User user = new User("tester", "admin6");
        user.setId("2");
        user.setNickName("tester_nickname");
        user.setMphone("13222881155");
        user.setEmail("tester@ehomeguru.com.cn");
        user.setFid(1);
        GlobalData.addObjectForKey("user", user);
        */
        //
        firstClick = 0;

        // Add ToolBar
        toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // Add Default Fragment
        if (findViewById(R.id.fragment_container) != null) {
            if (savedInstanceState != null) {
                return;
            }

            // Create a new Fragment to be placed in the activity framelayout layout
            HomeFragment homeFragment = new HomeFragment();
            homeFragment.setArguments(getIntent().getExtras());

            // Add the fragment to the 'fragment_container' FrameLayout
            FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
            // let fragment add to backstack, for reserve status.
            //ft.addToBackStack(null);
            ft.add(R.id.fragment_container, homeFragment, getResources().getString(R.string.fragment_home));
            ft.commit();
        }

        // BottomBar
        bottomBar = (BottomBar) findViewById(R.id.bottomBar);
        // Set the color for the active tab. Ignored on mobile when there are more than three tabs.
        // bottomBar.setActiveTabColor("#009688");
        bottomBar.setOnTabSelectListener(new OnTabSelectListener() {
            @Override
            public void onTabSelected(@IdRes int tabId) {
                if (firstClick == 0) {
                    firstClick++;
                    return;
                }
                if (tabId == R.id.bottomBarHome) {
                    // app bar
                    getSupportActionBar().show();
                    // fragment
                    HomeFragment homeFragment = (HomeFragment) getSupportFragmentManager().findFragmentByTag(getResources().getString(R.string.fragment_home));
                    FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
                    if (null == homeFragment) {
                        homeFragment = new HomeFragment();
                        // 根据Fragment的生命周期, 会把被替换的Fragment添加到BackStack堆栈
                        // 1. 堆栈计数值会加1 `getSupportFragmentManager().getBackStackEntryCount()`
                        // 2. Fragment会被添加到Fragment堆栈 `getSupportFragmentManager().getFragments()`
                        ft.addToBackStack(null);
                    }
                    ft.replace(R.id.fragment_container, homeFragment, getResources().getString(R.string.fragment_home));
                    ft.commit();
                } else if (tabId == R.id.bottomBarRegion) {
                    // app bar
                    hideAppBar();
                    // fragment
                    RegionFragment regionFragment = (RegionFragment) getSupportFragmentManager().findFragmentByTag(getResources().getString(R.string.fragment_region));
                    FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
                    if (null == regionFragment) {
                        regionFragment = new RegionFragment();
                        ft.addToBackStack(null);
                    }
                    ft.replace(R.id.fragment_container, regionFragment, getResources().getString(R.string.fragment_region));
                    ft.commit();
                } else if (tabId == R.id.bottomBarScene) {
                    // app bar
                    hideAppBar();
                    // fragment
                    SceneFragment sceneFragment = (SceneFragment) getSupportFragmentManager().findFragmentByTag(getResources().getString(R.string.fragment_scene));
                    FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
                    if (null == sceneFragment) {
                        sceneFragment = new SceneFragment();
                        ft.addToBackStack(null);
                    }
                    ft.replace(R.id.fragment_container, sceneFragment, getResources().getString(R.string.fragment_scene));
                    ft.commit();
                } else if (tabId == R.id.bottomBarMe) {
                    // app bar
                    getSupportActionBar().show();
                    // fragment
                    MeFragment meFragment = (MeFragment) getSupportFragmentManager().findFragmentByTag(getResources().getString(R.string.fragment_me));
                    FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
                    if (null == meFragment) {
                        meFragment = new MeFragment();
                        ft.addToBackStack(null);
                    }
                    ft.replace(R.id.fragment_container, meFragment, getResources().getString(R.string.fragment_me));
                    ft.commit();
                }
            }
        });

        bottomBar.setOnTabReselectListener(new OnTabReselectListener() {
            @Override
            public void onTabReSelected(@IdRes int tabId) {
                if (tabId == R.id.bottomBarHome) {
                    // The tab with id R.id.tab_favorites was reselected,
                    // change your content accordingly.
                }
            }
        });

    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        // Necessary to restore the BottomBar's state, otherwise we would
        // lose the current tab on orientation change.
        // bottomBar.onSaveInstanceState(outState);
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }

    // HomeFragment
    @Override
    public void onHomeFragmentInteraction(final HomeCard homeCard) {
        // get instruction from server
        User user = (User) GlobalData.getObjectForKey("user");

        if (homeCard.getDeviceId() != null && homeCard.getDeviceId() != "") {
            DeviceService deviceService = ServiceGenerator.createService(DeviceService.class, user.getName(), user.getPassword());
            Call<JSONApiObject> call = deviceService.getDeviceById(homeCard.getDeviceId(), user.getId());
            call.enqueue(new Callback<JSONApiObject>() {
                @Override
                public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                    List<Resource> resources = ResponseUtil.parseResponse(response, MainActivity.this);
                    if (resources != null) {
                        Device device = (Device) resources.get(0);
                        Intent intent = new Intent(MainActivity.this, ControllerActivity.class);
                        intent.putExtra("id", device.getId());
                        intent.putExtra("name", device.getName());
                        intent.putExtra("icon", device.getIcon());
                        intent.putExtra("color", device.getColor());
                        intent.putExtra("regionName", device.getRegionName());
                        startActivity(intent);
                    }
                }

                @Override
                public void onFailure(Call<JSONApiObject> call, Throwable t) {
                    Toast.makeText(MainActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();
                    System.out.println(t.getMessage());
                }
            });
        } else if (homeCard.getSceneId() != null && homeCard.getSceneId() != "") {
            // get scene details from server
            SceneService sceneService = ServiceGenerator.createService(SceneService.class, user.getName(), user.getPassword());
            Call<JSONApiObject> call = sceneService.getSceneById(homeCard.getSceneId(), user.getId());
            call.enqueue(new Callback<JSONApiObject>() {
                @Override
                public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                    List<Resource> resources = ResponseUtil.parseResponse(response, MainActivity.this);
                    Scene sceneRet = (Scene) resources.get(0);
                    sceneRet.setStatus(homeCard.getStatus());
                    if (resources != null) {
                        SceneExecDialogFragment
                            .create(sceneRet, null, homeCard)
                            .show(getSupportFragmentManager(), getString(R.string.fragment_sceneexecdialog_name));
                    }
                }

                @Override
                public void onFailure(Call<JSONApiObject> call, Throwable t) {
                    Toast.makeText(MainActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();
                    System.out.println(t.getMessage());
                }
            });
        } else {
            Toast.makeText(this, R.string.error_homecard_no_data, Toast.LENGTH_SHORT).show();
        }
    }

    // DeviceFragment
    @Override
    public void onListFragmentInteraction(Device device) {
        Intent intent = new Intent(MainActivity.this, ControllerActivity.class);
        intent.putExtra("id", device.getId());
        intent.putExtra("name", device.getName());
        intent.putExtra("icon", device.getIcon());
        intent.putExtra("color", device.getColor());
        intent.putExtra("regionName", device.getRegionName());
        startActivity(intent);
    }

    // SceneListFragment
    @Override
    public void onSceneListFragmentInteraction(Scene scene, TextView sceneStatus) {
        SceneExecDialogFragment
                .create(scene, sceneStatus, null)
                .show(getSupportFragmentManager(), getString(R.string.fragment_sceneexecdialog_name));
        /*
        // get instruction from server
        User user = (User) GlobalData.getObjectForKey("user");
        SceneService sceneService = ServiceGenerator.createService(SceneService.class, user.getName(), user.getPassword());
        scene.setUid(Integer.parseInt(user.getId()));
        scene.setFid(user.getFid());
        Call<JSONApiObject> call = sceneService.execScene(scene);
        call.enqueue(new Callback<JSONApiObject>() {
            @Override
            public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                List<Resource> resources = ResponseUtil.parseResponse(response, MainActivity.this);
                if (resources != null) {
                    Scene sceneRet = (Scene) resources.get(0);
                    if (CommonUtil.equals(sceneRet.getId(), scene.getId())) {
                        Toast.makeText(MainActivity.this, R.string.toast_scene_exec_yes, Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(MainActivity.this, R.string.toast_scene_exec_no, Toast.LENGTH_SHORT).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<JSONApiObject> call, Throwable t) {
                Toast.makeText(MainActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();
                System.out.println(t.getMessage());
            }
        });
        */
    }

    // MeFragment
    @Override
    public void onMeFragmentUserInfoClick() {
        Intent intent = new Intent(MainActivity.this, MeActivity.class);
        intent.putExtra("fragmentName", "cn.com.ehomeguru.view.UserInfoFragment");
        startActivity(intent);
    }

    @Override
    public void onMeFragmentLoginLogClick() {
        Intent intent = new Intent(MainActivity.this, MeActivity.class);
        intent.putExtra("fragmentName", "cn.com.ehomeguru.view.LogFragment");
        intent.putExtra("category", 1);
        startActivity(intent);
    }

    @Override
    public void onMeFragmentOperationLogClick() {
        Intent intent = new Intent(MainActivity.this, MeActivity.class);
        intent.putExtra("fragmentName", "cn.com.ehomeguru.view.LogFragment");
        intent.putExtra("category", 2);
        startActivity(intent);
    }

    @Override
    public void onMeFragmentAboutUsClick() {
        Intent intent = new Intent(MainActivity.this, MeActivity.class);
        intent.putExtra("fragmentName", "cn.com.ehomeguru.view.AboutUsFragment");
        startActivity(intent);
    }

    @Override
    public void onMeFragmentExitSystemClick() {
        ExitDialogFragment.create().show(getSupportFragmentManager(), getString(R.string.fragment_exitdialog_name));
    }

    @Override
    public void onBackPressed() {
        //super.onBackPressed();
        HomeFragment homeFragment = (HomeFragment) getSupportFragmentManager().findFragmentByTag(getResources().getString(R.string.fragment_home));
        if (homeFragment != null && homeFragment.isVisible()) {
            ExitDialogFragment.create().show(getSupportFragmentManager(), getString(R.string.fragment_exitdialog_name));
            // System.exit(0);
            // finish();
        }
    }

    private void hideAppBar() {
        // app bar
        switch (getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) {
            case Configuration.SCREENLAYOUT_SIZE_SMALL:
                getSupportActionBar().show();
                break;
            case Configuration.SCREENLAYOUT_SIZE_XLARGE:
            case Configuration.SCREENLAYOUT_SIZE_LARGE:
            case Configuration.SCREENLAYOUT_SIZE_NORMAL:
            default:
                getSupportActionBar().hide();
        }
    }

}
