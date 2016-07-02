package cn.com.ehomeguru.view;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.IdRes;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import com.roughike.bottombar.BottomBar;
import com.roughike.bottombar.OnMenuTabClickListener;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.bean.Device;

public class MainActivity extends AppCompatActivity
        implements HomeFragment.OnFragmentInteractionListener, RegionFragment.OnFragmentInteractionListener,
                   DeviceFragment.OnListFragmentInteractionListener {

    private BottomBar bottomBar;
    private Toolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

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
            getSupportFragmentManager().beginTransaction()
                    .add(R.id.fragment_container, homeFragment, getResources().getString(R.string.fragment_home))
                    .commit();
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
                        // 根据Fragment的生命周期, 会把被替换的Fragment添加到BackStack堆栈
                        // 1. 堆栈计数值会加1 `getSupportFragmentManager().getBackStackEntryCount()`
                        // 2. Fragment会被添加到Fragment堆栈 `getSupportFragmentManager().getFragments()`
                        ft.addToBackStack(null);
                    }
                    ft.replace(R.id.fragment_container, regionFragment, getResources().getString(R.string.fragment_region));
                    ft.commit();
                } else if (menuItemId == R.id.bottomBarScene) {

                } else if (menuItemId == R.id.bottomBarMe) {

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

    // HomeFragment
    @Override
    public void onFragmentInteraction(Uri uri) {

    }

    // DeviceFragment


    @Override
    public void onListFragmentInteraction(Device device) {
        Intent intent = new Intent(MainActivity.this, ControllerActivity.class);
        intent.putExtra("deviceId", device.getId());
        intent.putExtra("name", device.getName());
        intent.putExtra("region", device.getRegionId());
        //intent.putExtra("category", device.getCategoryId());
        //intent.putExtra("status", device.getStatus());
        startActivity(intent);
    }

    /*
    @Override
    public void onBackPressed() {
        super.onBackPressed();
        //return;
    }
    */
}
