package cn.com.ehomeguru.view;

import android.app.AlertDialog;
import android.app.Dialog;
import android.support.v4.app.DialogFragment;
import android.content.DialogInterface;
import android.os.Bundle;

import cn.com.ehomeguru.R;

/**
 * Created by xiaodongyu on 7/7/2016 AD.
 */
public class ExitDialogFragment extends DialogFragment{

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
                .setPositiveButton(R.string.fragment_exitdialog_ok, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        System.exit(0);
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
