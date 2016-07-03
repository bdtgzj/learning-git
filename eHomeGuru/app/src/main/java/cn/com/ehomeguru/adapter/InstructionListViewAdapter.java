package cn.com.ehomeguru.adapter;

import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.BaseAdapter;
import android.widget.CompoundButton;
import android.widget.LinearLayout;
import android.widget.Switch;

import java.util.List;

import cn.com.ehomeguru.bean.Instruction;

/**
 * Created by yuxiaodong on 7/3/16.
 */
public class InstructionListViewAdapter extends BaseAdapter{

    private List<Instruction> mListInstruction;
    private Instruction mInstruction;
    private OnInstructionInteractionListener mOnInstructionInteractionListener;

    public InstructionListViewAdapter(List<Instruction> listInstruction, OnInstructionInteractionListener onInstructionInteractionListener) {
        mListInstruction = listInstruction;
        mOnInstructionInteractionListener = onInstructionInteractionListener;
    }

    @Override
    public int getCount() {
        return mListInstruction.size();
    }

    @Override
    public Object getItem(int i) {
        return mListInstruction.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View convertView, ViewGroup parent) { // parent == ListView
        mInstruction = mListInstruction.get(i);
        switch (mInstruction.getCategory()) {
            case "switch":
                if (convertView == null) {
                    // set LayoutParams for LinearLayout in ListView, so use android.widget.AbsListView.LayoutParams
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setGravity(Gravity.CENTER_HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));
                    // set LayoutParams for Switch in LinearLayout, so use android.widget.LinearLayout.LayoutParams;
                    LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    layoutParams.bottomMargin = 50;
                    Switch aSwitch = new Switch(linearLayout.getContext());
                    aSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                        @Override
                        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                            mOnInstructionInteractionListener.onInstructionInteraction(mInstruction, isChecked);
                        }
                    });
                    aSwitch.setLayoutParams(layoutParams);
                    linearLayout.addView(aSwitch);
                    convertView = linearLayout;
                }
                break;
            default:
                convertView =  null;
        }
        return convertView;

    }

    public interface OnInstructionInteractionListener {
        void onInstructionInteraction(Instruction instruction, Boolean isChecked);
    }

}
