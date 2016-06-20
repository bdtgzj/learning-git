package cn.com.ehomeguru.view;

import android.support.annotation.IdRes;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.roughike.bottombar.BottomBar;
import com.roughike.bottombar.OnMenuTabClickListener;

import cn.com.ehomeguru.R;

public class MainActivity extends AppCompatActivity {

    private BottomBar bottomBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Add Default Fragment
        if (findViewById(R.id.fragment_container) != null) {
            if (savedInstanceState != null) {
                return;
            }

            // Create a new Fragment to be placed in the activity framelayout layout
            HomeFragment homeFragment = new HomeFragment();
            homeFragment.setArguments(getIntent().getExtras());

            // Add the fragment to the 'fragment_container' FrameLayout
            getFragmentManager().beginTransaction()
                    .add(R.id.fragment_container, homeFragment, getResources().getString(R.string.fragment_home))
                    .commit();
        }

        // BottomBar init
        bottomBar = BottomBar.attach(this, savedInstanceState);
        // Show all titles even when there's more than three tabs.
        bottomBar.useFixedMode();
        // Set the color for the active tab. Ignored on mobile when there are more than three tabs.
        //bottomBar.setActiveTabColor("#009688");
        // Set Item and action
        bottomBar.setItems(R.menu.bottombar_menu);
        bottomBar.setOnMenuTabClickListener(new OnMenuTabClickListener() {
            @Override
            public void onMenuTabSelected(@IdRes int menuItemId) {
                switch (menuItemId) {
                    case R.id.bottomBarHome:
                        break;
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

}
