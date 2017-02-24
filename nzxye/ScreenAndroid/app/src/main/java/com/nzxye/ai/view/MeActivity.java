package com.nzxye.ai.view;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.app.NavUtils;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;

import com.nzxye.ai.R;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;


public class MeActivity extends AppCompatActivity {

    private Toolbar mToolbar;
    private final String NEW_METHOD_NAME = "newInstance";
    private Object o;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_me);

        // Add ToolBar
        mToolbar = (Toolbar) findViewById(R.id.toolbar_me);
        setSupportActionBar(mToolbar);
        // Display back button
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setHomeAsUpIndicator(R.drawable.ic_navigate_before);

        // get data from intent
        String fragmentName = getIntent().getExtras().getString("fragmentName");
        int categoryId = getIntent().getExtras().getInt("category");

        // Add Fragment
        if (findViewById(R.id.fragment_container_me) != null) {
            if (savedInstanceState != null) {
                return;
            }

            // Create a new Fragment to be placed in the activity framelayout layout
            try {
                Class<?> c = Class.forName(fragmentName);
                if (categoryId > 0) {
                    Method method = c.getDeclaredMethod(NEW_METHOD_NAME, int.class);
                    o = method.invoke(null, categoryId);
                } else {
                    Method method = c.getDeclaredMethod(NEW_METHOD_NAME, null);
                    o = method.invoke(null, null);
                }
            } catch (ClassNotFoundException e) {
                System.out.println(e.getMessage());
            } catch (NoSuchMethodException e) {
                System.out.println(e.getMessage());
            } catch (IllegalAccessException e) {
                System.out.println(e.getMessage());
            } catch (InvocationTargetException e) {
                System.out.println(e.getMessage());
            }

            // Add the fragment to the 'fragment_container' FrameLayout
            FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
            // let fragment add to backstack, for reserve status.
            //ft.addToBackStack(null);
            ft.add(R.id.fragment_container_me, (Fragment) o);
            ft.commit();
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        switch (item.getItemId()) {
            // Respond to the action bar's Up/Home button
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(this);
                return true;
        }

        return super.onOptionsItemSelected(item);
    }

}
