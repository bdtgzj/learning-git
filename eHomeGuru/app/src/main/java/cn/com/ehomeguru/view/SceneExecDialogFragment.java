package cn.com.ehomeguru.view;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.DialogFragment;
import android.widget.TextView;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;

import java.util.List;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.bean.Scene;
import cn.com.ehomeguru.bean.User;
import cn.com.ehomeguru.model.GlobalData;
import cn.com.ehomeguru.service.SceneService;
import cn.com.ehomeguru.service.ServiceGenerator;
import cn.com.ehomeguru.util.CommonUtil;
import cn.com.ehomeguru.util.ResponseUtil;
import retrofit2.Call;
import retrofit2.Callback;

/**
 * Created by xiaodongyu on 7/7/2016 AD.
 */
public class SceneExecDialogFragment extends DialogFragment{

    private static Scene sceneOriginal;
    private static TextView sceneTextView;
    private static final String ARG_SCENE_ID = "scene-id";
    private static final String ARG_SCENE_NAME = "scene-name";
    private static final String ARG_SCENE_REGION_NAME = "scene-region-name";
    private static final String ARG_SCENE_ACTION = "scene-action";
    private String mSceneId;
    private String mSceneName;
    private String mSceneRegionName;
    private int mSceneAction;
    private Context mContext; // MainActivity

    public static SceneExecDialogFragment create(Scene scene, TextView textView) {
        sceneOriginal = scene;
        sceneTextView = textView;
        SceneExecDialogFragment fragment = new SceneExecDialogFragment();
        Bundle args = new Bundle();
        args.putString(ARG_SCENE_ID, scene.getId());
        args.putString(ARG_SCENE_NAME, scene.getName());
        args.putString(ARG_SCENE_REGION_NAME, scene.getRegionName());
        // 0 = off, 1 = on.
        int iStatus = sceneOriginal.getStatus();
        int iAction = -1;
        switch (iStatus) {
            case 0:
            case 1:
                iAction = (iStatus == 0) ? 1 : 0;
                break;
            // send 1 every time.
            // 正反停
            case -1:
                iAction = 1;
                break;
            // 档位
            case -2:
                iAction = 1;
                break;
        }
        args.putInt(ARG_SCENE_ACTION, iAction);
        fragment.setArguments(args);
        return fragment;
    }

    public SceneExecDialogFragment() {

    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mSceneId = getArguments().getString(ARG_SCENE_ID);
            mSceneName = getArguments().getString(ARG_SCENE_NAME);
            mSceneRegionName = getArguments().getString(ARG_SCENE_REGION_NAME);
            mSceneAction = getArguments().getInt(ARG_SCENE_ACTION);
            mContext = getContext();
        }
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        // return super.onCreateDialog(savedInstanceState);
        // Use the Builder class for convenient dialog construction
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        // set title & button
        int iStatus = sceneOriginal.getStatus();
        String strTitle = "";
        switch (iStatus) {
            case 0:
            case 1:
                strTitle = (iStatus == 0) ? "关闭" : "开启";
                break;
            case -1:
                strTitle = "开启";
                break;
            case -2:
                strTitle = "开启";
                break;
        }
        String strAction = "确定" + strTitle + "场景:";
        // getString(R.string.fragment_sceneexecdialog_title)
        builder.setMessage(strAction + mSceneRegionName + " > " + mSceneName)
                .setPositiveButton(R.string.fragment_exitdialog_ok, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        User user = (User) GlobalData.getObjectForKey("user");
                        SceneService sceneService = ServiceGenerator.createService(SceneService.class, user.getName(), user.getPassword());
                        final Scene scene = new Scene();
                        scene.setUid(Integer.parseInt(user.getId()));
                        scene.setFid(user.getFid());
                        scene.setId(mSceneId);
                        scene.setName(mSceneName);
                        scene.setRegionName(mSceneRegionName);
                        scene.setAction(mSceneAction);
                        Call<JSONApiObject> call = sceneService.execScene(scene);
                        call.enqueue(new Callback<JSONApiObject>() {
                            @Override
                            public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                                List<Resource> resources = ResponseUtil.parseResponse(response, mContext);
                                if (resources != null) {
                                    Scene sceneRet = (Scene) resources.get(0);
                                    if (CommonUtil.equals(sceneRet.getId(), scene.getId())) {
                                        Toast.makeText(mContext, R.string.toast_scene_exec_yes, Toast.LENGTH_SHORT).show();
                                        if (sceneOriginal.getStatus() == 0 || sceneOriginal.getStatus() == 1) {
                                            // change scene status ui
                                            if (sceneTextView != null) {
                                                sceneTextView.setText(sceneOriginal.getStatus() == 0 ? "开" : "关");
                                            }
                                            // change scene status
                                            if (sceneOriginal.getStatus() == 0) {
                                                sceneOriginal.setStatus(1);
                                            } else {
                                                sceneOriginal.setStatus(0);
                                            }
                                        }
                                    } else {
                                        Toast.makeText(mContext, R.string.toast_scene_exec_no, Toast.LENGTH_SHORT).show();
                                    }
                                }
                            }

                            @Override
                            public void onFailure(Call<JSONApiObject> call, Throwable t) {
                                Toast.makeText(mContext, R.string.error_network, Toast.LENGTH_SHORT).show();
                                // System.out.println(t.getMessage());
                            }
                        });
                    }
                })
                .setNegativeButton(R.string.fragment_exitdialog_cancel, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
        // return dialog
        return builder.create();
    }
}
