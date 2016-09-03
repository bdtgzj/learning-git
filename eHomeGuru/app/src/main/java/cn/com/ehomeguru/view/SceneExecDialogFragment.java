package cn.com.ehomeguru.view;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.DialogFragment;
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

    private static final String ARG_SCENE_ID = "scene-id";
    private static final String ARG_SCENE_NAME = "scene-name";
    private static final String ARG_SCENE_REGION_NAME = "scene-region-name";
    private String mSceneId;
    private String mSceneName;
    private String mSceneRegionName;
    private Context mContext; // MainActivity

    public static SceneExecDialogFragment create(Scene scene) {
        SceneExecDialogFragment fragment = new SceneExecDialogFragment();
        Bundle args = new Bundle();
        args.putString(ARG_SCENE_ID, scene.getId());
        args.putString(ARG_SCENE_NAME, scene.getName());
        args.putString(ARG_SCENE_REGION_NAME, scene.getRegionName());
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
            mContext = getContext();
        }
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        // return super.onCreateDialog(savedInstanceState);
        // Use the Builder class for convenient dialog construction
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        // set title & button
        builder.setMessage(getString(R.string.fragment_sceneexecdialog_title) + mSceneRegionName + " > " + mSceneName)
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
                        Call<JSONApiObject> call = sceneService.execScene(scene);
                        call.enqueue(new Callback<JSONApiObject>() {
                            @Override
                            public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                                List<Resource> resources = ResponseUtil.parseResponse(response, mContext);
                                if (resources != null) {
                                    Scene sceneRet = (Scene) resources.get(0);
                                    if (CommonUtil.equals(sceneRet.getId(), scene.getId())) {
                                        Toast.makeText(mContext, R.string.toast_scene_exec_yes, Toast.LENGTH_SHORT).show();
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
