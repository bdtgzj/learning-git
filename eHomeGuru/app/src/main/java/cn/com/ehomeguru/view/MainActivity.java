package cn.com.ehomeguru.view;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.IdRes;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;
import com.roughike.bottombar.BottomBar;
import com.roughike.bottombar.OnMenuTabClickListener;

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

        // Add BottomBar
        bottomBar = BottomBar.attach(this, savedInstanceState);
        // Show all titles even when there's more than three tabs.
        bottomBar.useFixedMode();
        // Set the color for the active tab. Ignored on mobile when there are more than three tabs.
        // bottomBar.setActiveTabColor("#009688");
        // Set Item and action
        bottomBar.setItems(R.menu.bottombar_menu);
        bottomBar.setOnMenuTabClickListener(new OnMenuTabClickListener() {
            @Override
            public void onMenuTabSelected(@IdRes int menuItemId) {
                if (firstClick == 0) {
                    firstClick++;
                    return;
                }
                if (menuItemId == R.id.bottomBarHome) {
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
                } else if (menuItemId == R.id.bottomBarRegion) {
                    RegionFragment regionFragment = (RegionFragment) getSupportFragmentManager().findFragmentByTag(getResources().getString(R.string.fragment_region));
                    FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
                    if (null == regionFragment) {
                        regionFragment = new RegionFragment();
                        ft.addToBackStack(null);
                    }
                    ft.replace(R.id.fragment_container, regionFragment, getResources().getString(R.string.fragment_region));
                    ft.commit();
                } else if (menuItemId == R.id.bottomBarScene) {
                    SceneFragment sceneFragment = (SceneFragment) getSupportFragmentManager().findFragmentByTag(getResources().getString(R.string.fragment_scene));
                    FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
                    if (null == sceneFragment) {
                        sceneFragment = new SceneFragment();
                        ft.addToBackStack(null);
                    }
                    ft.replace(R.id.fragment_container, sceneFragment, getResources().getString(R.string.fragment_scene));
                    ft.commit();
                } else if (menuItemId == R.id.bottomBarMe) {
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

            @Override
            public void onMenuTabReSelected(@IdRes int menuItemId) {
                // The user reselected item number one, scroll your content to top.
                switch (menuItemId) {
                    case R.id.bottomBarHome:
                        break;
                }
            }
        });
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        // Necessary to restore the BottomBar's state, otherwise we would
        // lose the current tab on orientation change.
        bottomBar.onSaveInstanceState(outState);
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }

    // HomeFragment
    @Override
    public void onHomeFragmentInteraction(HomeCard homeCard) {
        // get instruction from server
        User user = (User) GlobalData.getObjectForKey("user");

        if (homeCard.getDeviceId() != null && homeCard.getDeviceId() != "") {
            DeviceService deviceService = ServiceGenerator.createService(DeviceService.class, user.getName(), user.getPassword());
            Call<JSONApiObject> call = deviceService.getDeviceById(homeCard.getDeviceId());
            call.enqueue(new Callback<JSONApiObject>() {
                @Override
                public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                    List<Resource> resources = ResponseUtil.parseResponse(response, MainActivity.this);
                    if (resources != null) {
                        Device device = (Device) resources.get(0);
                        Intent intent = new Intent(MainActivity.this, ControllerActivity.class);
                        intent.putExtra("deviceId", device.getId());
                        intent.putExtra("name", device.getName());
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
            SceneService sceneService = ServiceGenerator.createService(SceneService.class, user.getName(), user.getPassword());
            final Scene scene = new Scene();
            scene.setId(homeCard.getSceneId());
            Call<JSONApiObject> call = sceneService.setDeviceByScene(scene);
            call.enqueue(new Callback<JSONApiObject>() {
                @Override
                public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                    List<Resource> resources = ResponseUtil.parseResponse(response, MainActivity.this);
                    if (resources != null) {
                        Scene sceneRet = (Scene) resources.get(0);
                        if (sceneRet == scene) {
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
        } else {
            Toast.makeText(this, R.string.error_homecard_no_data, Toast.LENGTH_SHORT).show();
        }
    }

    // DeviceFragment
    @Override
    public void onListFragmentInteraction(Device device) {
        Intent intent = new Intent(MainActivity.this, ControllerActivity.class);
        intent.putExtra("deviceId", device.getId());
        intent.putExtra("name", device.getName());
        intent.putExtra("regionName", device.getRegionName());
        //intent.putExtra("category", device.getCategoryId());
        //intent.putExtra("status", device.getStatus());
        startActivity(intent);
    }

    // SceneListFragment
    @Override
    public void onSceneListFragmentInteraction(final Scene scene) {
        // get instruction from server
        User user = (User) GlobalData.getObjectForKey("user");
        SceneService sceneService = ServiceGenerator.createService(SceneService.class, user.getName(), user.getPassword());
        Call<JSONApiObject> call = sceneService.setDeviceByScene(scene);
        call.enqueue(new Callback<JSONApiObject>() {
            @Override
            public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                List<Resource> resources = ResponseUtil.parseResponse(response, MainActivity.this);
                if (resources != null) {
                    Scene sceneRet = (Scene) resources.get(0);
                    if (sceneRet == scene) {
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

    }

    @Override
    public void onMeFragmentOperationLogClick() {

    }

    @Override
    public void onMeFragmentAboutUsClick() {

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

}
