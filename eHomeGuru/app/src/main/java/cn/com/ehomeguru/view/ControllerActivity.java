package cn.com.ehomeguru.view;

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

public class ControllerActivity extends AppCompatActivity implements InstructionListViewAdapter.OnInstructionInteractionListener {

    private Toolbar mToolbar;
    private TextView mTextView;
    private ImageView mImageView;
    private List<Instruction> mListInstruction;
    private Instruction mInstruction;
    private InstructionListViewAdapter instructionListViewAdapter;

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
        Bundle bundle = getIntent().getExtras();
        setTitle(bundle.getString("regionName") + "-" + bundle.getString("name"));
        String strStatus = "断电";

        // layout
        LinearLayout layout = (LinearLayout) findViewById(R.id.conroller_layout);

        // status
        LinearLayout.LayoutParams lpStatus = new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
        lpStatus.bottomMargin = 50;
        mTextView = new TextView(this);
        mTextView.setText(getResources().getString(R.string.label_current_status) + strStatus);
        layout.addView(mTextView, lpStatus);

        // icon
        // ContextCompat.getDrawable(this ,R.drawable.ic_menu_camera);
        LinearLayout.LayoutParams lpIcon = new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
        lpIcon.bottomMargin = 50;
        mImageView = new ImageView(this);
        mImageView.setImageResource(R.drawable.ic_menu_camera);
        layout.addView(mImageView, lpIcon);

        // ListView for instruction
        ListView listView = new ListView(this);
        listView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));
        mListInstruction = new ArrayList<>();
        instructionListViewAdapter = new InstructionListViewAdapter(mListInstruction, this);
        listView.setAdapter(instructionListViewAdapter);
        layout.addView(listView);

        // get instruction from server
        User user = (User) GlobalData.getObjectForKey("user");
        InstructionService instructionService = ServiceGenerator.createService(InstructionService.class, user.getName(), user.getPassword());
        Call<JSONApiObject> call = instructionService.getInstructionByDevice(bundle.getString("deviceId"));
        call.enqueue(new Callback<JSONApiObject>() {
            @Override
            public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                JSONApiObject jsonApiObject = response.body();
                if (jsonApiObject != null) {
                    if (jsonApiObject.hasErrors()) {
                        List<ErrorModel> errorList = jsonApiObject.getErrors();
                        Toast.makeText(getParent(), errorList.get(0).getDetail(), Toast.LENGTH_SHORT).show();
                    } else {
                        if (jsonApiObject.getData().size() > 0) {
                            List<Resource> resources = jsonApiObject.getData();
                            for (Resource resource : resources ) {
                                Instruction instruction = (Instruction) resource;
                                mListInstruction.add(instruction);
                            }
                            instructionListViewAdapter.notifyDataSetChanged();
                        } else {
                            // Toast.makeText(getContext(), R.string.error_homecard_nonexistent, Toast.LENGTH_SHORT).show();
                        }
                    }
                } else {
                    Toast.makeText(getParent(), R.string.error_network, Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<JSONApiObject> call, Throwable t) {
                Toast.makeText(getParent(), R.string.error_network, Toast.LENGTH_SHORT).show();
                System.out.println(t.getMessage());
            }
        });

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

    @Override
    public void onInstructionInteraction(Instruction instruction, Boolean isChecked) {
        // reference
        mInstruction = instruction;
        // original data
        final String originalData = mInstruction.getInstruction();
        // combine data
        String data = isChecked ? "255 0" : "0 0";
        mInstruction.setInstruction(mInstruction.getInstruction() + " " + data);
        // get instruction from server
        User user = (User) GlobalData.getObjectForKey("user");
        InstructionService instructionService = ServiceGenerator.createService(InstructionService.class, user.getName(), user.getPassword());
        Call<JSONApiObject> call = instructionService.setDeviceByInstruction(mInstruction);
        call.enqueue(new Callback<JSONApiObject>() {
            @Override
            public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                // i.e. 200
                if (response.isSuccessful()) {
                    JSONApiObject jsonApiObject = response.body();
                    if (jsonApiObject != null) {
                        if (jsonApiObject.hasErrors()) {
                            List<ErrorModel> errorList = jsonApiObject.getErrors();
                            Toast.makeText(getParent(), errorList.get(0).getDetail(), Toast.LENGTH_SHORT).show();
                        } else {
                            if (jsonApiObject.getData().size() > 0) {
                                List<Resource> resources = jsonApiObject.getData();
                                Instruction instructionRet = (Instruction) resources.get(0);
                                if (mInstruction.getInstruction() == instructionRet.getInstruction()) {
                                    mTextView.setText("东东");
                                } else {
                                    mTextView.setText("西西");
                                }
                            } else {
                                Toast.makeText(ControllerActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();
                            }
                        }
                    } else {
                        Toast.makeText(ControllerActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();
                    }
                // i.e. 500
                } else {
                    HttpError httpError = ErrorUtil.parseError(response);
                    if (httpError != null && httpError.getErrors().size() > 0) {
                        Toast.makeText(ControllerActivity.this, httpError.getErrors().get(0).getDetail(), Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(ControllerActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();
                    }
                }
                // restore data
                mInstruction.setInstruction(originalData);
            }

            @Override
            public void onFailure(Call<JSONApiObject> call, Throwable t) {
                // there is more than just a failing request (like: no internet connection)
                Toast.makeText(ControllerActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();

                // restore data
                mInstruction.setInstruction(originalData);
                System.out.println(t.getMessage());
            }
        });
    }
}
