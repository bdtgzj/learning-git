package com.nzxye.ai.view;


import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.megvii.facepp.sdk.Facepp;
import com.megvii.licensemanager.sdk.LicenseManager;
import com.nzxye.ai.R;
import com.nzxye.ai.util.ConUtil;
import com.nzxye.ai.util.DialogUtil;
import com.nzxye.ai.util.Util;

public class LoadingActivity extends AppCompatActivity {

    private TextView WarrantyText;
    private ProgressBar WarrantyBar;
    private Button againWarrantyBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loading);

        init();
        initData();
        network();
        onClickListener();
    }

    private void init() {
        WarrantyText = (TextView) findViewById(R.id.loading_layout_WarrantyText);
        WarrantyBar = (ProgressBar) findViewById(R.id.loading_layout_WarrantyBar);
        againWarrantyBtn = (Button) findViewById(R.id.loading_layout_againWarrantyBtn);
        String authTime0 = ConUtil.getFormatterDate(Facepp.getApiExpirationMillis(this, ConUtil.getFileContent(this, R.raw.megviifacepp_0_4_1_model)));
    }

    private void initData() {
        if (Util.API_KEY == null || Util.API_SECRET == null) {
            if (!ConUtil.isReadKey(this)) {
                DialogUtil mDialogUtil = new DialogUtil(this);
                mDialogUtil.showDialog("请填写API_KEY和API_SECRET");
            }
        }
    }

    private void network() {
        if (Facepp.getSDKAuthType(ConUtil.getFileContent(this, R.raw.megviifacepp_0_4_1_model)) == 2) { // 非联网授权
            authState(true);
            return;
        }

        againWarrantyBtn.setVisibility(View.GONE);
        WarrantyText.setText("正在联网授权中...");
        WarrantyBar.setVisibility(View.VISIBLE);
        final LicenseManager licenseManager = new LicenseManager(this);
        licenseManager.setExpirationMillis(Facepp.getApiExpirationMillis(this, ConUtil.getFileContent(this, R.raw.megviifacepp_0_4_1_model)));

        String uuid = ConUtil.getUUIDString(LoadingActivity.this);
        long[] apiName = {Facepp.getApiName()};

        licenseManager.takeLicenseFromNetwork(uuid, Util.API_KEY, Util.API_SECRET, apiName,
            LicenseManager.DURATION_30DAYS, new LicenseManager.TakeLicenseCallback() {
                @Override
                public void onSuccess() {
                    authState(true);
                }

                @Override
                public void onFailed(int i, byte[] bytes) {
                    authState(false);
                }
            });
    }

    private void authState(boolean isSuccess) {
        if (isSuccess) {
            startActivity(new Intent(this, OpenglActivity.class));
            finish();
        } else {
            WarrantyBar.setVisibility(View.GONE);
            againWarrantyBtn.setVisibility(View.VISIBLE);
            WarrantyText.setText("联网授权失败！请检查网络或找服务商");
        }
    }

    private void onClickListener() {
        againWarrantyBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                network();
            }
        });
        findViewById(R.id.loading_layout_rootRel).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ConUtil.isGoneKeyBoard(LoadingActivity.this);
            }
        });
    }

}
