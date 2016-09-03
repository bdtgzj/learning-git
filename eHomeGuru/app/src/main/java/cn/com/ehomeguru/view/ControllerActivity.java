package cn.com.ehomeguru.view;

import android.graphics.drawable.Drawable;
import android.os.Bundle;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.adapter.InstructionListViewAdapter;
import cn.com.ehomeguru.bean.HttpError;
import cn.com.ehomeguru.bean.Instruction;
import cn.com.ehomeguru.bean.Region;
import cn.com.ehomeguru.bean.User;
import cn.com.ehomeguru.model.GlobalData;
import cn.com.ehomeguru.service.InstructionService;
import cn.com.ehomeguru.service.ServiceGenerator;
import cn.com.ehomeguru.util.ErrorUtil;
import cn.com.ehomeguru.util.ResourceUtil;
import cn.com.ehomeguru.util.ResponseUtil;
import retrofit2.Call;
import retrofit2.Callback;

public class ControllerActivity extends AppCompatActivity implements InstructionListViewAdapter.OnInstructionInteractionListener {

    private Bundle mBundle;
    private Toolbar mToolbar;
    private TextView mTextView;
    private ImageView mImageView;
    private ListView listView;
    private List<Instruction> mListInstruction;
    private InstructionListViewAdapter instructionListViewAdapter;
    private Timer timer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_controller);

        // Add ToolBar
        mToolbar = (Toolbar) findViewById(R.id.toolbar_conroller);
        setSupportActionBar(mToolbar);
        // Display back button
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        // get data from intent
        // Title
        mBundle = getIntent().getExtras();
        setTitle(mBundle.getString("regionName") + "-" + mBundle.getString("name"));
        // Icon
        Drawable drawableDevice = ResourceUtil.getDrawableByIconColor(this, mBundle.getString("icon"), mBundle.getString("color"));
        //String strStatus = "断电";

        // layout
        LinearLayout layout = (LinearLayout) findViewById(R.id.conroller_layout);

        // status
        /*
        LinearLayout.LayoutParams lpStatus = new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
        lpStatus.bottomMargin = 50;
        mTextView = new TextView(this);
        mTextView.setText(getResources().getString(R.string.label_current_status) + strStatus);
        layout.addView(mTextView, lpStatus);
        */

        // Icon
        // ContextCompat.getDrawable(this ,R.drawable.ic_menu_camera);
        //LinearLayout.LayoutParams lpIcon = new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
        LinearLayout.LayoutParams lpIcon = new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
        lpIcon.topMargin = 20;
        lpIcon.bottomMargin = 50;
        mImageView = new ImageView(this);
        mImageView.setImageDrawable(drawableDevice);
        layout.addView(mImageView, lpIcon);

        // ListView for instruction
        listView = new ListView(this);
        listView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));
        listView.setDivider(null);
        mListInstruction = new ArrayList<>();
        instructionListViewAdapter = new InstructionListViewAdapter(mListInstruction, this);
        listView.setAdapter(instructionListViewAdapter);
        layout.addView(listView);

        // get instruction from server
        User user = (User) GlobalData.getObjectForKey("user");
        InstructionService instructionService = ServiceGenerator.createService(InstructionService.class, user.getName(), user.getPassword());
        Call<JSONApiObject> call = instructionService.getInstructionByDevice(user.getId(), mBundle.getString("id")); // device id
        call.enqueue(new Callback<JSONApiObject>() {
            @Override
            public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                List<Resource> resources = ResponseUtil.parseResponse(response, getBaseContext());
                if (resources != null) {
                    for (Resource resource : resources) {
                        Instruction instruction = (Instruction) resource;
                        mListInstruction.add(instruction);
                    }
                    instructionListViewAdapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(Call<JSONApiObject> call, Throwable t) {
                Toast.makeText(getParent(), R.string.error_network, Toast.LENGTH_SHORT).show();
                System.out.println(t.getMessage());
            }
        });

        // get device state and refresh ui
        timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                // get device state
                User user = (User) GlobalData.getObjectForKey("user");
                InstructionService instructionService = ServiceGenerator.createService(InstructionService.class, user.getName(), user.getPassword());
                for (final Instruction instruction : mListInstruction) {
                    // construct read state instruction
                    Instruction instructionTmp = new Instruction();
                    instructionTmp.setUid(Integer.parseInt(user.getId()));
                    instructionTmp.setFid(user.getFid());
                    instructionTmp.setInstruction(instruction.getInstruction().split("@")[0]);
                    Call<JSONApiObject> call = instructionService.execInstruction(instructionTmp);
                    call.enqueue(new Callback<JSONApiObject>() {
                        @Override
                        public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                            List<Resource> resources = ResponseUtil.parseResponse(response, getBaseContext());
                            if (resources != null) {
                                Instruction instructionRet = (Instruction) resources.get(0);
                                String strInstructionRet = instructionRet.getInstruction().substring(36);
                                // 00 00 00 01 00 01 00 00 00 04 01 01 01 00 after 36 are data.
                                // uid(4) + tcp modbus header(6) + host(1) + function(1) + data
                                instruction.setStatus(strInstructionRet);
                                // refresh ui
                                listView.setAdapter(instructionListViewAdapter);
                                instructionListViewAdapter.notifyDataSetChanged();
                            }
                        }

                        @Override
                        public void onFailure(Call<JSONApiObject> call, Throwable t) {
                            // there is more than just a failing request (like: no internet connection)
                            Toast.makeText(ControllerActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();
                        }
                    });
                    /*
                    try {
                        Thread.sleep(1000);
                    } catch(InterruptedException e) {
                        System.out.println(e);
                    }
                    */
                }
            }
        }, 0, 1000);

    }

    @Override
    public void onInstructionInteraction(Instruction instruction, Boolean isChecked) {
        final Instruction instructionTmp = new Instruction();
        // original data
        // format: read_instruction@set_instruction[data]
        //final String originalInstruction = instruction.getInstruction();
        // combine data
        String data = isChecked ? "FF 00" : "00 00";
        String log = isChecked ? "开" : "关";
        String strInstruction = instruction.getInstruction().split("@")[1].replaceAll("\\[.*\\]", data);
        instructionTmp.setInstruction(strInstruction);
        // exec instruction
        User user = (User) GlobalData.getObjectForKey("user");
        InstructionService instructionService = ServiceGenerator.createService(InstructionService.class, user.getName(), user.getPassword());
        instructionTmp.setUid(Integer.parseInt(user.getId()));
        instructionTmp.setFid(user.getFid());
        // 区域 > 设备 > 指令
        instructionTmp.setLog(
            mBundle.getString("regionName") +
            " > " +
            mBundle.getString("name") +
            " > " +
            log
        );
        Call<JSONApiObject> call = instructionService.execInstruction(instructionTmp);
        call.enqueue(new Callback<JSONApiObject>() {
            @Override
            public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                List<Resource> resources = ResponseUtil.parseResponse(response, getBaseContext());
                if (resources != null) {
                    Instruction instructionRet = (Instruction) resources.get(0);
                    String strInstructionRet = instructionRet.getInstruction().substring(16);
                    // 0 1 0 0 0 4 1 1 1 0 after 16 are data.
                    //instruction.setStatus(strInstructionRet);
                    // refresh ui
                    //listView.setAdapter(instructionListViewAdapter);
                    //instructionListViewAdapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(Call<JSONApiObject> call, Throwable t) {
                // there is more than just a failing request (like: no internet connection)
                Toast.makeText(ControllerActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();
            }
        });
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        switch (item.getItemId()) {
            // Respond to the action bar's Up/Home button
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(this);
                timer.cancel(); //Terminates this timer,discarding any currently scheduled tasks.
                //timer.purge(); // Removes all cancelled tasks from this timer's task queue.
                return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        timer.cancel();
    }
}
