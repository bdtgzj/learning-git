package cn.com.ehomeguru.view;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.app.NavUtils;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.ViewGroup.LayoutParams;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.ErrorModel;
import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.adapter.InstructionListViewAdapter;
import cn.com.ehomeguru.bean.HttpError;
import cn.com.ehomeguru.bean.Instruction;
import cn.com.ehomeguru.bean.User;
import cn.com.ehomeguru.model.GlobalData;
import cn.com.ehomeguru.service.InstructionService;
import cn.com.ehomeguru.service.ServiceGenerator;
import cn.com.ehomeguru.util.ErrorUtil;
import retrofit2.Call;
import retrofit2.Callback;

public class MeActivity extends AppCompatActivity implements UserInfoFragment.OnFragmentInteractionListener {

    private Toolbar mToolbar;
    private Instruction mInstruction;
    private InstructionListViewAdapter instructionListViewAdapter;
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

        // get data from intent
        String fragmentName = getIntent().getExtras().getString("fragmentName");

        // Add Fragment
        if (findViewById(R.id.fragment_container_me) != null) {
            if (savedInstanceState != null) {
                return;
            }

            // Create a new Fragment to be placed in the activity framelayout layout
            try {
                Class<?> c = Class.forName(fragmentName);
                Method method = c.getDeclaredMethod(NEW_METHOD_NAME, null);
                o = method.invoke(null, null);
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
            ft.add(R.id.fragment_container_me, (UserInfoFragment) o);
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

    // UserInfoFragment
    @Override
    public void onUserInfoFragmentModify(User user) {

    }
}
