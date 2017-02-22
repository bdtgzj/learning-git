package com.nzxye.ai.view;

import android.app.AlertDialog;
import android.app.Dialog;
import android.support.v4.app.DialogFragment;
import android.content.DialogInterface;
import android.os.Bundle;

import com.nzxye.ai.R;
import com.nzxye.ai.model.UserKey;
import com.nzxye.ai.util.CommonUtil;
import io.realm.Realm;
import io.realm.RealmConfiguration;

/**
 * Created by xiaodongyu on 7/7/2016 AD.
 */
public class ExitDialogFragment extends DialogFragment implements DialogInterface.OnClickListener{

    public static ExitDialogFragment create() {
        return new ExitDialogFragment();
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        // return super.onCreateDialog(savedInstanceState);

        // Use the Builder class for convenient dialog construction
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        // set title & button
        builder.setMessage(R.string.fragment_exitdialog_title)
                .setPositiveButton(R.string.fragment_exitdialog_ok, this)
                .setNegativeButton(R.string.fragment_exitdialog_cancel, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
        // return dialog
        return builder.create();
    }

    @Override
    public void onClick(DialogInterface dialog, int which) {
        CommonUtil.deleteRememberMe(getContext()); // getActivity()
        System.exit(0);
    }
}
