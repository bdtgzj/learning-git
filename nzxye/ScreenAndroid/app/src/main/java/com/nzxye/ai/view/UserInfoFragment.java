package com.nzxye.ai.view;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;

import java.util.List;

import com.nzxye.ai.R;
import com.nzxye.ai.bean.HomeCard;
import com.nzxye.ai.bean.User;
import com.nzxye.ai.model.GlobalData;
import com.nzxye.ai.service.HomeCardService;
import com.nzxye.ai.service.ServiceGenerator;
import com.nzxye.ai.service.UserService;
import com.nzxye.ai.util.CommonUtil;
import com.nzxye.ai.util.ResponseUtil;
import retrofit2.Call;
import retrofit2.Callback;

public class UserInfoFragment extends Fragment {

    private User mUser;
    private EditText mNickName;
    private EditText mMphone;
    private EditText mEmail;
    private EditText mOldPass;
    private EditText mNewPass;
    private Button mSubmit;
    private Button mReset;

    public UserInfoFragment() {
        // Required empty public constructor
    }

    public static UserInfoFragment newInstance() {
        UserInfoFragment fragment = new UserInfoFragment();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_user_info, container, false);
        // set parent activity's title.
        getActivity().setTitle(getString(R.string.fragment_me_user_info));
        // get User info
        mUser = (User) GlobalData.getObjectForKey("user");
        //
        mNickName = (EditText) view.findViewById(R.id.fragment_userinfo_nickname);
        mNickName.setText(mUser.getNickName());
        mNickName.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_NEXT) {
                    mOldPass.requestFocus();
                    return true;
                }
                return false;
            }
        });

        //
        mMphone = (EditText) view.findViewById(R.id.fragment_userinfo_mphone);
        mMphone.setText(mUser.getMphone());
        mMphone.setEnabled(false);
        //
        mEmail = (EditText) view.findViewById(R.id.fragment_userinfo_email);
        mEmail.setText(mUser.getEmail());
        mEmail.setEnabled(false);
        //
        mOldPass = (EditText) view.findViewById(R.id.fragment_userinfo_oldpass);
        mOldPass.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_NEXT) {
                    mNewPass.requestFocus();
                    return true;
                }
                return false;
            }
        });
        //
        mNewPass = (EditText) view.findViewById(R.id.fragment_userinfo_newpass);
        //
        mSubmit = (Button) view.findViewById(R.id.fragment_userinfo_submit);
        mSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // post user data
                User user = new User();
                user.setId(mUser.getId());

                // nick name
                if (TextUtils.isEmpty(mNickName.getText().toString())) {
                    mNickName.setError(getString(R.string.fragment_userinfo_error_nickname_empty));
                    mNickName.requestFocus();
                    return;
                }
                if (mNickName.getText().length() < 2 || mNickName.getText().length() > 18) {
                    mNickName.setError(getString(R.string.fragment_userinfo_error_nickname_length));
                    mNickName.requestFocus();
                    return;
                }
                user.setNickName(mNickName.getText().toString());

                // pass
                if (!TextUtils.isEmpty(mOldPass.getText().toString())) {
                    if (mOldPass.getText().length() < 6 || mOldPass.getText().length() > 18) {
                        mOldPass.setError(getString(R.string.fragment_userinfo_error_oldpass_length));
                        mOldPass.requestFocus();
                        return;
                    }
                    if (TextUtils.isEmpty(mNewPass.getText().toString())) {
                        mNewPass.setError(getString(R.string.fragment_userinfo_error_newpass_empty));
                        mNewPass.requestFocus();
                        return;
                    }
                    user.setOldPass(mOldPass.getText().toString());
                }
                if (!TextUtils.isEmpty(mNewPass.getText().toString())) {
                    if (mNewPass.getText().length() < 6 || mNewPass.getText().length() > 18) {
                        mNewPass.setError(getString(R.string.fragment_userinfo_error_newpass_length));
                        mNewPass.requestFocus();
                        return;
                    }
                    if (TextUtils.isEmpty(mOldPass.getText().toString())) {
                        mOldPass.setError(getString(R.string.fragment_userinfo_error_oldpass_empty));
                        mOldPass.requestFocus();
                        return;
                    }
                    user.setNewPass(mNewPass.getText().toString());
                }

                // no data changed.
                if ( user.getNickName().equals(mUser.getNickName()) && TextUtils.isEmpty(user.getOldPass())) {
                    Toast.makeText(getContext(), R.string.fragment_userinfo_toast_submit_no, Toast.LENGTH_SHORT).show();
                    return;
                }

                //
                UserService userService = ServiceGenerator.createService(UserService.class, mUser.getName(), mUser.getPassword());


                Call<JSONApiObject> call = userService.updateOne(user.getId(), user);
                call.enqueue(new Callback<JSONApiObject>() {
                    @Override
                    public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                        List<Resource> resources = ResponseUtil.parseResponse(response, getContext());
                        if (resources != null) {
                            if (resources.size() > 0) {
                                Toast.makeText(getContext(), R.string.fragment_userinfo_toast_submit_ok, Toast.LENGTH_SHORT).show();
                                //
                                User user = (User) resources.get(0);
                                user.setPassword(user.getKey() + "us"); // us: user ad: admin
                                // update to global data
                                GlobalData.updateObjectForKey("user", user);
                                // update to realm database
                                CommonUtil.updateRememberMe(getContext(), user);
                            }
                        }
                    }

                    @Override
                    public void onFailure(Call<JSONApiObject> call, Throwable t) {
                        Toast.makeText(getActivity(), R.string.error_network, Toast.LENGTH_SHORT).show();
                        System.out.println(t.getMessage());
                    }
                });
            }
        });
        //
        mReset = (Button) view.findViewById(R.id.fragment_userinfo_reset);
        mReset.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mNickName.setText(mUser.getNickName());
                mOldPass.setText(null);
                mNewPass.setText(null);
                mNickName.requestFocus();
            }
        });

        return view;
    }

}
