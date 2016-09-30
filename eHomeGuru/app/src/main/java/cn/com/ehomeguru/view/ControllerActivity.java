package cn.com.ehomeguru.view;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.v4.app.NavUtils;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.widget.AbsListView;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.ErrorModel;
import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
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
import cn.com.ehomeguru.util.CommonUtil;
import cn.com.ehomeguru.util.ErrorUtil;
import cn.com.ehomeguru.util.ResourceUtil;
import cn.com.ehomeguru.util.ResponseUtil;
import retrofit2.Call;
import retrofit2.Callback;

public class ControllerActivity extends AppCompatActivity implements InstructionListViewAdapter.OnInstructionInteractionListener {

    private Bundle mBundle;
    private Toolbar mToolbar;
    private ImageView mImageView;
    private ListView listView;
    private List<Instruction> mListInstruction;
    private InstructionListViewAdapter instructionListViewAdapter;
    //private Timer timer;
    private Instruction instructionPSR; // PositiveReverseStop

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

        // Icon
        // ContextCompat.getDrawable(this ,R.drawable.ic_menu_camera);
        //LinearLayout.LayoutParams lpIcon = new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
        LinearLayout.LayoutParams lpIcon = new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
        lpIcon.topMargin = getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_margin_top);
        lpIcon.bottomMargin = getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_margin_bottom);
        mImageView = new ImageView(this);
        mImageView.setImageDrawable(drawableDevice);
        layout.addView(mImageView, lpIcon);

        // ListView for instruction
        listView = new ListView(this);
        listView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
        //listView.setDivider(null);
        // set row gap
        listView.setDivider(new ColorDrawable(Color.TRANSPARENT));
        listView.setDividerHeight(getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_margin_bottom));
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
                        switch (instruction.getCategoryName()) {
                            // for multi instruction, combine instruction.
                            case "正反停":
                                if (instructionPSR == null) {
                                    instructionPSR = new Instruction();
                                    instructionPSR.setName(instruction.getName());
                                    instructionPSR.setInstruction(instruction.getInstruction());
                                    instructionPSR.setCategoryName(instruction.getCategoryName());
                                    //instructionPSR.setPositiveReverseStop(new int[]{0, 0, 0});
                                    mListInstruction.add(instructionPSR);
                                } else {
                                    instructionPSR.setName(instructionPSR.getName() + "@" + instruction.getName());
                                    instructionPSR.setInstruction(instructionPSR.getInstruction() + "|" + instruction.getInstruction());
                                }
                                break;
                            // for single instruction
                            default:
                                mListInstruction.add(instruction);
                        }
                    }
                    // init ui
                    instructionListViewAdapter.notifyDataSetChanged();
                    // refresh ui
                    getDeviceStateRefreshUI();
                }
            }

            @Override
            public void onFailure(Call<JSONApiObject> call, Throwable t) {
                Toast.makeText(getParent(), R.string.error_network, Toast.LENGTH_SHORT).show();
                System.out.println(t.getMessage());
            }
        });

        /*
        timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                getDeviceStateRefreshUI();
            }
        }, 0, 1000);
        */

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // inflate Action Button
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_controller, menu);
        return super.onCreateOptionsMenu(menu);
    }

    // get device state and refresh ui
    public void getDeviceStateRefreshUI() {
        // get device state
        User user = (User) GlobalData.getObjectForKey("user");
        Instruction instructionRead = new Instruction();
        instructionRead.setUid(Integer.parseInt(user.getId()));
        instructionRead.setFid(user.getFid());
        for (final Instruction instructionOriginal : mListInstruction) {
            // construct read state instruction
            switch (instructionOriginal.getCategoryName()) {
                case "正反停":
                    // split combined instruction.
                    String[] instructions = instructionOriginal.getInstruction().split("\\|");
                    for (int i = 0, len = instructions.length; i < len; i++) {
                        instructionRead.setInstruction(instructions[i].split("@")[0]);
                        getDeviceStateRefreshUIHelper(instructionOriginal, instructionRead);
                    }
                    break;
                default:
                    instructionRead.setInstruction(instructionOriginal.getInstruction().split("@")[0]);
                    getDeviceStateRefreshUIHelper(instructionOriginal, instructionRead);
            }
        }
    }

    private void getDeviceStateRefreshUIHelper(final Instruction instructionOriginal, final Instruction instructionRead) {
        User user = (User) GlobalData.getObjectForKey("user");
        InstructionService instructionService = ServiceGenerator.createService(InstructionService.class, user.getName(), user.getPassword());
        Call<JSONApiObject> call = instructionService.execInstruction(instructionRead);
        // because async, so save instruction.
        final String instructionReadPSR = instructionRead.getInstruction();
        call.enqueue(new Callback<JSONApiObject>() {
            @Override
            public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                List<Resource> resources = ResponseUtil.parseResponse(response, getBaseContext());
                if (resources != null) {
                    Instruction instructionRet = (Instruction) resources.get(0);
                    String strInstructionRet = instructionRet.getInstruction().substring(39).replace(" ", "");
                    // 00 00 00 01 00 01 00 00 00 04 01 01 01 00 after 36 are data, and data = address/number(normal 1byte) + actual data
                    // uid(4) + tcp modbus header(6) + host(1) + function(1) + data
                    // filter data, i.e. two response are combined one response.
                    if (strInstructionRet.length() > 8) {
                        return;
                    }
                    switch (instructionOriginal.getCategoryName()) {
                        case "开关":
                            instructionOriginal.setSwitcher(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "空调开关":
                            instructionOriginal.setAirSwitcher(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "当前温度":
                            instructionOriginal.setAirTemperature(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "温度设置":
                            instructionOriginal.setAirTemperatureControl(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "空调风速":
                            instructionOriginal.setAirSpeed(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "空调模式":
                            instructionOriginal.setAirMode(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "电视开关":
                            instructionOriginal.setTvSwitcher(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "电视音量":
                            instructionOriginal.setTvVolume(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "电视频道":
                            instructionOriginal.setTvChannel(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "电视模式":
                            instructionOriginal.setTvMode(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "正反停":
                            // split combined instruction.
                            String[] instructions = instructionOriginal.getInstruction().split("\\|");
                            for (int i = 0, len = instructions.length; i < len; i++) {
                                if (CommonUtil.equals(instructions[i].split("@")[0], instructionReadPSR)) {
                                    int[] tmp = instructionOriginal.getPositiveReverseStop();
                                    tmp[i] = Integer.parseInt(strInstructionRet, 16);
                                    instructionOriginal.setPositiveReverseStop(tmp);
                                }
                            }
                            break;
                        case "档位":
                            instructionOriginal.setShift(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "检测值":
                            instructionOriginal.setCheckValue(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "设置值":
                            instructionOriginal.setSetValue(Integer.parseInt(strInstructionRet, 16));
                            break;
                        case "报警检测":
                            instructionOriginal.setCheckAlarm(Integer.parseInt(strInstructionRet, 16));
                            break;
                    }

                    // 00 00 00 02 00 01 00 00 00 05 01 03 02 00 00
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
        //
        try {
            // prevent the request data is combined by server , and register multiple times on data event.
            Thread.sleep(100);
        } catch(InterruptedException e) {
            System.out.println(e);
        }
    }

    // set device
    @Override
    public void onSwitchInteraction(Instruction instruction, Boolean isChecked) {
        final Instruction instructionTmp = new Instruction();
        // original data
        // format: read_instruction@set_instruction[data]
        // final String originalInstruction = instruction.getInstruction();
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
    public void onAirTemperatureInteraction(Instruction instruction, int progress) {
        String data = String.format("%04x", progress).replaceAll("(^\\d{2})", "$0 ");
        String log = "温度设置:" + progress;
        execInstruction(instruction, data, log);
    }

    @Override
    public void onAirSpeedInteraction(Instruction instruction, View view) {
        String data = "";
        if (((RadioButton)view).getText() == getResources().getString(R.string.text_raido_air_speed_1)) {
            data = String.format("%04x", 1).replaceAll("(^\\d{2})", "$0 ");
        } else if (((RadioButton)view).getText() == getResources().getString(R.string.text_raido_air_speed_2)) {
            data = String.format("%04x", 2).replaceAll("(^\\d{2})", "$0 ");
        } else if (((RadioButton)view).getText() == getResources().getString(R.string.text_raido_air_speed_3)) {
            data = String.format("%04x", 3).replaceAll("(^\\d{2})", "$0 ");
        }
        String log = "空调风速:" + ((RadioButton)view).getText();
        execInstruction(instruction, data, log);
    }

    @Override
    public void onAirModeInteraction(Instruction instruction, View view) {
        String data = "";
        if (((RadioButton)view).getText() == getResources().getString(R.string.text_raido_air_mode_cold)) {
            data = String.format("%04x", 1).replaceAll("(^\\d{2})", "$0 ");
        } else if (((RadioButton)view).getText() == getResources().getString(R.string.text_raido_air_mode_heat)) {
            data = String.format("%04x", 2).replaceAll("(^\\d{2})", "$0 ");
        } else if (((RadioButton)view).getText() == getResources().getString(R.string.text_raido_air_mode_wind)) {
            data = String.format("%04x", 3).replaceAll("(^\\d{2})", "$0 ");
        }
        String log = "空调模式:" + ((RadioButton)view).getText();
        execInstruction(instruction, data, log);
    }

    @Override
    public void onTvVolumeInteraction(Instruction instruction, int progress) {
        String data = String.format("%04x", progress).replaceAll("(^\\d{2})", "$0 ");
        String log = "电视音量:" + progress;
        execInstruction(instruction, data, log);
    }

    @Override
    public void onTvChannelInteraction(Instruction instruction, int channel) {
        String data = String.format("%04x", channel).replaceAll("(^\\d{2})", "$0 ");
        String log = "电视频道:" + channel;
        execInstruction(instruction, data, log);
    }

    @Override
    public void onTvModeInteraction(Instruction instruction, View view) {
        String data = "";
        if (((RadioButton)view).getText() == getResources().getString(R.string.text_raido_tv_mode_tv)) {
            data = String.format("%04x", 1).replaceAll("(^\\d{2})", "$0 ");
        } else if (((RadioButton)view).getText() == getResources().getString(R.string.text_raido_tv_mode_dvd)) {
            data = String.format("%04x", 2).replaceAll("(^\\d{2})", "$0 ");
        } else if (((RadioButton)view).getText() == getResources().getString(R.string.text_raido_tv_mode_hdmi)) {
            data = String.format("%04x", 3).replaceAll("(^\\d{2})", "$0 ");
        }
        String log = "电视模式:" + ((RadioButton)view).getText();
        execInstruction(instruction, data, log);
    }

    @Override
    public void onPositiveReverseStopInteraction(String name, Map<String, Instruction> mapInstruction, Map<String, Button> mapButton) {
        for (Map.Entry<String, Instruction> entry : mapInstruction.entrySet()) {
            String data = (entry.getKey()==name) ? "FF 00" : "00 00";
            String log = entry.getKey();
            /*
            try {
                // prevent the request data is combined by server, and register multiple times on data event.
                Thread.sleep(100);
            } catch(InterruptedException e) {
                System.out.println(e);
            }
            */
            execInstruction(entry.getValue(), data, log);
        }
        for (Map.Entry<String, Button> entry : mapButton.entrySet()) {
            for (Map.Entry<String, Button> entryButton : mapButton.entrySet()) {
                entryButton.getValue().setEnabled(!CommonUtil.equals(entryButton.getKey(), name));
            }
        }
    }

    @Override
    public void onShiftInteraction(Instruction instruction, View v) {
        String[] buttonText = instruction.getName().split("#")[1].split("@");
        Button btn = ((Button) v);
        String data = "FF 00";
        String log = instruction.getName().split("#")[0] + ":" + btn.getText();
        execInstruction(instruction, data, log);
        // shift button text
        int nextIndex = 0;
        for (int i = 0, len = buttonText.length; i < len; i++) {
            if (CommonUtil.equals(buttonText[i], btn.getText())) {
                nextIndex = i + 1;
            }
            if (nextIndex >= len ) {
                nextIndex = 0;
            }
        }
        btn.setText(buttonText[nextIndex]);
    }

    @Override
    public void onSetValueInteraction(Instruction instruction, String value) {
        if (value.isEmpty()) return;
        String data = String.format("%04x", Integer.parseInt(value)).replaceAll("(^\\d{2})", "$0 ");
        String log = instruction.getName() + ":" + value;
        execInstruction(instruction, data, log);
    }

    // common operation: read instruction@set instruction [scene value]
    private void execInstruction(Instruction instruction, String data, String log) {
        final Instruction instructionTmp = new Instruction();
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
            // Respond to the action bar's Up/Home button, and Action Buttons.
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(this);
                //timer.cancel(); //Terminates this timer,discarding any currently scheduled tasks.
                //timer.purge(); // Removes all cancelled tasks from this timer's task queue.
                return true;
            case R.id.action_refresh:
                getDeviceStateRefreshUI();
                return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        // timer.cancel();
    }
}
