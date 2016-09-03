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
        final Instruction instruction = mListInstruction.get(i);
        switch (instruction.getCategoryName()) {
            case "开关":
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
                    aSwitch.setOnCheckedChangeListener(null);
                    //
                    if (instruction.getStatus()!=null && instruction.getStatus()!="") {
                        String[] readInstruction = instruction.getInstruction().split("@")[0].split(" ");
                        // 读几个线圈数据
                        int readNumber = Integer.parseInt(readInstruction[10]+readInstruction[11], 16);
                        String [] arrReturnedValue = instruction.getStatus().split(" ");
                        // 字节数
                        int dataNumber = Integer.parseInt(arrReturnedValue[0], 16);
                        if (dataNumber == (arrReturnedValue.length-1)) {
                            // 数据
                            String strReturnedValue = "";
                            for (int ii = 0; ii < dataNumber; ii++) {
                                strReturnedValue += arrReturnedValue[++ii];
                            }
                            int intReturnedValue = Integer.parseInt(strReturnedValue, 16);
                            Boolean bStatus = ((intReturnedValue >> (readNumber-1)) & 1) > 0;
                            aSwitch.setChecked(bStatus);
                        }
                    }
                    //aSwitch.setChecked(CommonUtil.equals(mInstruction.getStatus(), "01 01"));
                    aSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                        @Override
                        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                            mOnInstructionInteractionListener.onInstructionInteraction(instruction, isChecked);
                        }
                    });
                    aSwitch.setLayoutParams(layoutParams);
                    linearLayout.addView(aSwitch);

                    convertView = linearLayout;
                }
                break;
            default:
                convertView = null;
        }
        return convertView;

    }

    public interface OnInstructionInteractionListener {
        void onInstructionInteraction(Instruction instruction, Boolean isChecked);
    }

}
