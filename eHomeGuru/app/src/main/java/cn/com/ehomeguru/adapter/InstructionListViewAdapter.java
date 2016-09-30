package cn.com.ehomeguru.adapter;

import android.content.Context;
import android.content.res.Resources;
import android.text.InputType;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.widget.AbsListView;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.support.v7.widget.AppCompatRadioButton;
import android.widget.NumberPicker;
import android.widget.RadioGroup;
import android.support.v7.widget.AppCompatSeekBar;
import android.widget.SeekBar;
import android.widget.Switch;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.bean.Instruction;

/**
 * Created by yuxiaodong on 7/3/16.
 */
public class InstructionListViewAdapter extends BaseAdapter{

    private List<Instruction> mListInstruction;
    private OnInstructionInteractionListener mOnInstructionInteractionListener;
    // for 电视频道
    private boolean mIsScrolling = true;

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

                    // text
                    LinearLayout.LayoutParams lpTextView = new LinearLayout.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT);
                    lpTextView.leftMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_left);
                    lpTextView.width = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_label_size);
                    TextView textView = new TextView(linearLayout.getContext());
                    // parent.getResources().getString(R.string.label_switch)
                    textView.setText(instruction.getName());
                    linearLayout.addView(textView, lpTextView);

                    // switch
                    // set LayoutParams for Switch in LinearLayout, so use android.widget.LinearLayout.LayoutParams;
                    LinearLayout.LayoutParams lpSwitch = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    Switch aSwitch = new Switch(linearLayout.getContext());
                    aSwitch.setOnCheckedChangeListener(null);
                    //
                    aSwitch.setChecked(instruction.getSwitcher() != 0);
                    /*
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
                    */
                    //aSwitch.setChecked(CommonUtil.equals(mInstruction.getStatus(), "01 01"));
                    aSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                        @Override
                        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                            mOnInstructionInteractionListener.onSwitchInteraction(instruction, isChecked);
                        }
                    });
                    aSwitch.setLayoutParams(lpSwitch);
                    linearLayout.addView(aSwitch);

                    convertView = linearLayout;
                }
                break;
            case "空调开关":
                if (convertView == null) {
                    // set LayoutParams for LinearLayout in ListView, so use android.widget.AbsListView.LayoutParams
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    TextView textView = getLabel(linearLayout.getResources().getString(R.string.label_air_switch), linearLayout);
                    linearLayout.addView(textView);

                    // switch
                    // set LayoutParams for Switch in LinearLayout, so use android.widget.LinearLayout.LayoutParams;
                    LinearLayout.LayoutParams lpSwitch = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    Switch aSwitch = new Switch(linearLayout.getContext());
                    aSwitch.setOnCheckedChangeListener(null);
                    aSwitch.setChecked(instruction.getSwitcher() != 0);
                    aSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                        @Override
                        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                            mOnInstructionInteractionListener.onSwitchInteraction(instruction, isChecked);
                        }
                    });
                    aSwitch.setLayoutParams(lpSwitch);
                    linearLayout.addView(aSwitch);
                    //
                    convertView = linearLayout;
                }
                break;
            case "当前温度":
                if (convertView == null) {
                    // set LayoutParams for LinearLayout in ListView, so use android.widget.AbsListView.LayoutParams
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    TextView textView = getLabel(linearLayout.getResources().getString(R.string.label_air_temperature), linearLayout);
                    linearLayout.addView(textView);

                    // text
                    // set LayoutParams for Switch in LinearLayout, so use android.widget.LinearLayout.LayoutParams;
                    LinearLayout.LayoutParams lpTemperature = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    TextView tvTemperature = new TextView(linearLayout.getContext());
                    tvTemperature.setText(String.valueOf(instruction.getAirTemperature()));
                    tvTemperature.setLayoutParams(lpTemperature);
                    tvTemperature.setTextColor(parent.getResources().getColor(R.color.colorBlack));
                    linearLayout.addView(tvTemperature);
                    //
                    convertView = linearLayout;
                }
                break;
            case "温度设置":
                if (convertView == null) {
                    // set LayoutParams for LinearLayout in ListView, so use android.widget.AbsListView.LayoutParams
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    // linearLayout.setGravity(Gravity.CENTER_HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    LinearLayout.LayoutParams lpTextView = new LinearLayout.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT);
                    lpTextView.leftMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_left);
                    lpTextView.topMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_text_margin_top);
                    lpTextView.width = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_label_size);
                    TextView textView = new TextView(linearLayout.getContext());
                    textView.setText(parent.getResources().getString(R.string.label_air_temperature_control));
                    linearLayout.addView(textView, lpTextView);

                    // text
                    LinearLayout.LayoutParams lpTemperature = new LinearLayout.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT);
                    // lpTemperature.leftMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_left);
                    lpTemperature.topMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_text_margin_top);
                    lpTemperature.rightMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_temperature_margin_right);
                    //lpTemperature.width = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_label_size);
                    final TextView tvTemperature = new TextView(linearLayout.getContext());
                    tvTemperature.setText(String.valueOf(instruction.getAirTemperature()));
                    tvTemperature.setTextColor(parent.getResources().getColor(R.color.colorBlack));
                    linearLayout.addView(tvTemperature, lpTemperature);

                    // seekbar
                    // set LayoutParams for Switch in LinearLayout, so use android.widget.LinearLayout.LayoutParams;
                    LinearLayout.LayoutParams lpSeekBar = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    AppCompatSeekBar seekBar = new AppCompatSeekBar(linearLayout.getContext());
                    seekBar.setMax(100);
                    seekBar.setProgress(instruction.getAirTemperature());
                    seekBar.setOnSeekBarChangeListener(null);
                    seekBar.setOnSeekBarChangeListener(new AppCompatSeekBar.OnSeekBarChangeListener() {
                        @Override
                        public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                            tvTemperature.setText(String.valueOf(progress));
                        }

                        @Override
                        public void onStartTrackingTouch(SeekBar seekBar) {

                        }

                        @Override
                        public void onStopTrackingTouch(SeekBar seekBar) {
                            mOnInstructionInteractionListener.onAirTemperatureInteraction(instruction, seekBar.getProgress());
                        }
                    });
                    seekBar.setLayoutParams(lpSeekBar);
                    linearLayout.addView(seekBar);

                    convertView = linearLayout;
                }
                break;
            case "空调风速":
                if (convertView == null) {
                    // set LayoutParams for LinearLayout in ListView, so use android.widget.AbsListView.LayoutParams
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    LinearLayout.LayoutParams lpTextView = new LinearLayout.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT);
                    lpTextView.leftMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_left);
                    lpTextView.topMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_text_margin_top);
                    lpTextView.width = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_label_size);
                    TextView textView = new TextView(linearLayout.getContext());
                    textView.setText(parent.getResources().getString(R.string.label_air_speed));
                    linearLayout.addView(textView, lpTextView);

                    // RadioGroup
                    RadioGroup radioGroup = new RadioGroup(parent.getContext());
                    radioGroup.setOrientation(RadioGroup.HORIZONTAL);

                    // RadioButton
                    AppCompatRadioButton radioButton1 = new AppCompatRadioButton(radioGroup.getContext(), null, R.attr.radioButtonStyle);
                    radioButton1.setText(parent.getResources().getString(R.string.text_raido_air_speed_1));
                    radioButton1.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            mOnInstructionInteractionListener.onAirSpeedInteraction(instruction, v);
                        }
                    });
                    AppCompatRadioButton radioButton2 = new AppCompatRadioButton(radioGroup.getContext(), null, R.attr.radioButtonStyle);
                    radioButton2.setText(parent.getResources().getString(R.string.text_raido_air_speed_2));
                    radioButton2.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            mOnInstructionInteractionListener.onAirSpeedInteraction(instruction, v);
                        }
                    });
                    AppCompatRadioButton radioButton3 = new AppCompatRadioButton(radioGroup.getContext(), null, R.attr.radioButtonStyle);
                    radioButton3.setText(parent.getResources().getString(R.string.text_raido_air_speed_3));
                    radioButton3.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            mOnInstructionInteractionListener.onAirSpeedInteraction(instruction, v);
                        }
                    });

                    radioGroup.addView(radioButton1);
                    radioGroup.addView(radioButton2);
                    radioGroup.addView(radioButton3);

                    switch(instruction.getAirSpeed()) {
                        case 1:
                            radioGroup.check(radioButton1.getId());
                            break;
                        case 2:
                            radioGroup.check(radioButton2.getId());
                            break;
                        case 3:
                            radioGroup.check(radioButton3.getId());
                            break;
                    }

                    linearLayout.addView(radioGroup);

                    convertView = linearLayout;
                }
                break;
            case "空调模式":
                if (convertView == null) {
                    // set LayoutParams for LinearLayout in ListView, so use android.widget.AbsListView.LayoutParams
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    LinearLayout.LayoutParams lpTextView = new LinearLayout.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT);
                    lpTextView.leftMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_left);
                    lpTextView.topMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_text_margin_top);
                    lpTextView.width = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_label_size);
                    TextView textView = new TextView(linearLayout.getContext());
                    textView.setText(parent.getResources().getString(R.string.label_air_mode));
                    linearLayout.addView(textView, lpTextView);

                    // RadioGroup
                    RadioGroup radioGroup = new RadioGroup(parent.getContext());
                    radioGroup.setOrientation(RadioGroup.HORIZONTAL);

                    // RadioButton
                    AppCompatRadioButton radioButtonCold = new AppCompatRadioButton(radioGroup.getContext());
                    radioButtonCold.setText(parent.getResources().getString(R.string.text_raido_air_mode_cold));
                    radioButtonCold.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            mOnInstructionInteractionListener.onAirModeInteraction(instruction, v);
                        }
                    });
                    AppCompatRadioButton radioButtonHeat = new AppCompatRadioButton(radioGroup.getContext());
                    radioButtonHeat.setText(parent.getResources().getString(R.string.text_raido_air_mode_heat));
                    radioButtonHeat.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            mOnInstructionInteractionListener.onAirModeInteraction(instruction, v);
                        }
                    });
                    AppCompatRadioButton radioButtonWind = new AppCompatRadioButton(radioGroup.getContext());
                    radioButtonWind.setText(parent.getResources().getString(R.string.text_raido_air_mode_wind));
                    radioButtonWind.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            mOnInstructionInteractionListener.onAirModeInteraction(instruction, v);
                        }
                    });

                    radioGroup.addView(radioButtonCold);
                    radioGroup.addView(radioButtonHeat);
                    radioGroup.addView(radioButtonWind);

                    switch(instruction.getAirSpeed()) {
                        case 1:
                            radioGroup.check(radioButtonCold.getId());
                            break;
                        case 2:
                            radioGroup.check(radioButtonHeat.getId());
                            break;
                        case 3:
                            radioGroup.check(radioButtonWind.getId());
                            break;
                    }

                    linearLayout.addView(radioGroup);

                    convertView = linearLayout;
                }
                break;
            case "电视开关":
                if (convertView == null) {
                    // set LayoutParams for LinearLayout in ListView, so use android.widget.AbsListView.LayoutParams
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    TextView textView = getLabel(linearLayout.getResources().getString(R.string.label_tv_switch), linearLayout);
                    linearLayout.addView(textView);

                    // switch
                    // set LayoutParams for Switch in LinearLayout, so use android.widget.LinearLayout.LayoutParams;
                    LinearLayout.LayoutParams lpSwitch = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    Switch aSwitch = new Switch(linearLayout.getContext());
                    aSwitch.setOnCheckedChangeListener(null);
                    aSwitch.setChecked(instruction.getSwitcher() != 0);
                    aSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                        @Override
                        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                            mOnInstructionInteractionListener.onSwitchInteraction(instruction, isChecked);
                        }
                    });
                    aSwitch.setLayoutParams(lpSwitch);
                    linearLayout.addView(aSwitch);
                    //
                    convertView = linearLayout;
                }
                break;
            case "电视音量":
                if (convertView == null) {
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    LinearLayout.LayoutParams lpTextView = new LinearLayout.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT);
                    lpTextView.leftMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_left);
                    lpTextView.topMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_text_margin_top);
                    lpTextView.width = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_label_size);
                    TextView textView = new TextView(linearLayout.getContext());
                    textView.setText(parent.getResources().getString(R.string.label_tv_volume));
                    linearLayout.addView(textView, lpTextView);

                    // text
                    LinearLayout.LayoutParams lpVolume = new LinearLayout.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT);
                    // lpTemperature.leftMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_left);
                    lpVolume.topMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_text_margin_top);
                    lpVolume.rightMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_temperature_margin_right);
                    //lpTemperature.width = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_label_size);
                    final TextView tvVolume = new TextView(linearLayout.getContext());
                    tvVolume.setText(String.valueOf(instruction.getTvVolume()));
                    tvVolume.setTextColor(parent.getResources().getColor(R.color.colorBlack));
                    linearLayout.addView(tvVolume, lpVolume);

                    // seekbar
                    // set LayoutParams for Switch in LinearLayout, so use android.widget.LinearLayout.LayoutParams;
                    LinearLayout.LayoutParams lpSeekBar = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    AppCompatSeekBar seekBar = new AppCompatSeekBar(linearLayout.getContext());
                    seekBar.setMax(100);
                    seekBar.setProgress(instruction.getTvVolume());
                    seekBar.setOnSeekBarChangeListener(null);
                    //aSwitch.setChecked(CommonUtil.equals(mInstruction.getStatus(), "01 01"));
                    seekBar.setOnSeekBarChangeListener(new AppCompatSeekBar.OnSeekBarChangeListener() {
                        @Override
                        public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                            tvVolume.setText(String.valueOf(progress));
                        }

                        @Override
                        public void onStartTrackingTouch(SeekBar seekBar) {

                        }

                        @Override
                        public void onStopTrackingTouch(SeekBar seekBar) {
                            mOnInstructionInteractionListener.onTvVolumeInteraction(instruction, seekBar.getProgress());
                        }
                    });
                    seekBar.setLayoutParams(lpSeekBar);
                    linearLayout.addView(seekBar);

                    convertView = linearLayout;
                }
                break;
            case "电视频道":
                if (convertView == null) {
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    LinearLayout.LayoutParams lpTextView = new LinearLayout.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT);
                    lpTextView.leftMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_left);
                    lpTextView.topMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_tvchannel_margin_top);
                    lpTextView.width = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_label_size);
                    TextView textView = new TextView(linearLayout.getContext());
                    textView.setText(parent.getResources().getString(R.string.label_tv_channel));
                    linearLayout.addView(textView, lpTextView);

                    // NumberPicker
                    LinearLayout.LayoutParams lpNumberPicker = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    lpNumberPicker.rightMargin = linearLayout.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_right);
                    NumberPicker numberPicker = new NumberPicker(linearLayout.getContext());
                    numberPicker.setMinValue(0);
                    numberPicker.setMaxValue(100);
                    numberPicker.setValue(instruction.getTvChannel());
                    numberPicker.setWrapSelectorWheel(true);
                    numberPicker.setOnValueChangedListener(null);
                    //aSwitch.setChecked(CommonUtil.equals(mInstruction.getStatus(), "01 01"));

                    numberPicker.setOnScrollListener(new NumberPicker.OnScrollListener() {
                        @Override
                        public void onScrollStateChange(NumberPicker view, int scrollState) {
                            mIsScrolling = (scrollState == NumberPicker.OnScrollListener.SCROLL_STATE_IDLE) ? false : true;
                            if (!mIsScrolling) {
                                mOnInstructionInteractionListener.onTvChannelInteraction(instruction, view.getValue());
                            }
                        }
                    });

                    numberPicker.setOnValueChangedListener(new NumberPicker.OnValueChangeListener() {
                        @Override
                        public void onValueChange(NumberPicker picker, int oldVal, int newVal) {
                            if (!mIsScrolling) {
                                mOnInstructionInteractionListener.onTvChannelInteraction(instruction, newVal);
                            }
                        }
                    });

                    numberPicker.setLayoutParams(lpNumberPicker);
                    linearLayout.addView(numberPicker);

                    convertView = linearLayout;
                }
                break;
            case "电视模式":
                if (convertView == null) {
                    // set LayoutParams for LinearLayout in ListView, so use android.widget.AbsListView.LayoutParams
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    LinearLayout.LayoutParams lpTextView = new LinearLayout.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT);
                    lpTextView.leftMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_left);
                    lpTextView.topMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_text_margin_top);
                    lpTextView.width = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_label_size);
                    TextView textView = new TextView(linearLayout.getContext());
                    textView.setText(parent.getResources().getString(R.string.label_tv_mode));
                    linearLayout.addView(textView, lpTextView);

                    // RadioGroup
                    RadioGroup radioGroup = new RadioGroup(parent.getContext());
                    radioGroup.setOrientation(RadioGroup.HORIZONTAL);

                    // RadioButton
                    AppCompatRadioButton radioButton1 = new AppCompatRadioButton(radioGroup.getContext());
                    radioButton1.setText(parent.getResources().getString(R.string.text_raido_tv_mode_tv));
                    radioButton1.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            mOnInstructionInteractionListener.onTvModeInteraction(instruction, v);
                        }
                    });
                    AppCompatRadioButton radioButton2 = new AppCompatRadioButton(radioGroup.getContext());
                    radioButton2.setText(parent.getResources().getString(R.string.text_raido_tv_mode_dvd));
                    radioButton2.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            mOnInstructionInteractionListener.onTvModeInteraction(instruction, v);
                        }
                    });
                    AppCompatRadioButton radioButton3 = new AppCompatRadioButton(radioGroup.getContext());
                    radioButton3.setText(parent.getResources().getString(R.string.text_raido_tv_mode_hdmi));
                    radioButton3.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            mOnInstructionInteractionListener.onTvModeInteraction(instruction, v);
                        }
                    });

                    radioGroup.addView(radioButton1);
                    radioGroup.addView(radioButton2);
                    radioGroup.addView(radioButton3);

                    switch(instruction.getAirMode()) {
                        case 1:
                            radioGroup.check(radioButton1.getId());
                            break;
                        case 2:
                            radioGroup.check(radioButton2.getId());
                            break;
                        case 3:
                            radioGroup.check(radioButton3.getId());
                            break;
                    }

                    linearLayout.addView(radioGroup);

                    convertView = linearLayout;
                }
                break;
            case "正反停":
                if (convertView == null) {
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setGravity(Gravity.CENTER_HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // data split
                    final Map<String, Instruction> mapInstruction = new HashMap<String, Instruction>();
                    final Map<String, Button> mapButton = new HashMap<String, Button>();
                    String[] names = instruction.getName().split("@");
                    String[] instructions = instruction.getInstruction().split("\\|");
                    int len = names.length;
                    for (int j = 0; j < len; j++) {
                        // Instruction
                        Instruction ins = new Instruction();
                        ins.setName(names[j]);
                        ins.setInstruction(instructions[j]);
                        ins.setCategoryName(instruction.getCategoryName());
                        mapInstruction.put(names[j], ins);
                        // Button
                        LinearLayout.LayoutParams lpButton = new LinearLayout.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT);
                        lpButton.rightMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_right);
                        //lpButton.topMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_tvchannel_margin_top);
                        //lpButton.width = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_label_size);
                        Button button = new Button(linearLayout.getContext());
                        button.setText(names[j]);
                        button.setLayoutParams(lpButton);
                        button.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                mOnInstructionInteractionListener.onPositiveReverseStopInteraction(((Button)v).getText().toString(), mapInstruction, mapButton);
                            }
                        });
                        button.setEnabled(instruction.getPositiveReverseStop()[j] == 0);
                        mapButton.put(names[j], button);
                        linearLayout.addView(button);
                    }
                    convertView = linearLayout;
                }
                break;
            case "档位":
                if (convertView == null) {
                    // data
                    String buttonLabel = instruction.getName().split("#")[0];
                    final String[] buttonText = instruction.getName().split("#")[1].split("@");

                    // set LayoutParams for LinearLayout in ListView, so use android.widget.AbsListView.LayoutParams
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    TextView textView = getLabel(buttonLabel, linearLayout);
                    linearLayout.addView(textView);

                    // Button
                    LinearLayout.LayoutParams lpButton = new LinearLayout.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT);
                    //lpButton.rightMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_right);
                    //lpButton.topMargin = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_tvchannel_margin_top);
                    //lpButton.width = parent.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_label_size);
                    Button button = new Button(linearLayout.getContext());
                    button.setText(buttonText[0]);
                    button.setLayoutParams(lpButton);
                    button.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            mOnInstructionInteractionListener.onShiftInteraction(instruction, v);
                        }
                    });
                    linearLayout.addView(button);
                    //
                    convertView = linearLayout;
                }
                break;
            case "检测值":
                if (true) {
                    // set LayoutParams for LinearLayout in ListView, so use android.widget.AbsListView.LayoutParams
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    TextView textView = getLabel(instruction.getName(), linearLayout);
                    linearLayout.addView(textView);

                    // text
                    // set LayoutParams for Switch in LinearLayout, so use android.widget.LinearLayout.LayoutParams;
                    LinearLayout.LayoutParams lpValue = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    TextView tvValue = new TextView(linearLayout.getContext());
                    tvValue.setText(String.valueOf(instruction.getCheckValue()));
                    tvValue.setLayoutParams(lpValue);
                    tvValue.setTextColor(parent.getResources().getColor(R.color.colorBlack));
                    linearLayout.addView(tvValue);
                    //
                    convertView = linearLayout;
                }
                break;
            case "设置值":
                if (true) {
                    // set LayoutParams for LinearLayout in ListView, so use android.widget.AbsListView.LayoutParams
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    TextView textView = getLabel(instruction.getName(), linearLayout);
                    linearLayout.addView(textView);

                    // text
                    // set LayoutParams for Switch in LinearLayout, so use android.widget.LinearLayout.LayoutParams;
                    LinearLayout.LayoutParams lpValue = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    lpValue.rightMargin = linearLayout.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_right);
                    lpValue.weight = 1;
                    EditText etValue = new EditText(linearLayout.getContext());
                    etValue.setInputType(InputType.TYPE_NUMBER_FLAG_DECIMAL);
                    etValue.setText(String.valueOf(instruction.getSetValue()));
                    etValue.setLayoutParams(lpValue);
                    etValue.setTextColor(parent.getResources().getColor(R.color.colorBlack));
                    etValue.setImeOptions(EditorInfo.IME_ACTION_DONE);
                    etValue.setOnEditorActionListener(new TextView.OnEditorActionListener() {
                        @Override
                        public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                            boolean handled = false;
                            if (actionId == EditorInfo.IME_ACTION_DONE) {
                                mOnInstructionInteractionListener.onSetValueInteraction(instruction, ((EditText)v).getText().toString());
                                handled = true;
                            }
                            return handled;
                        }
                    });
                    linearLayout.addView(etValue);
                    //
                    convertView = linearLayout;
                }
                break;
            case "报警检测":
                if (true) {
                    // set LayoutParams for LinearLayout in ListView, so use android.widget.AbsListView.LayoutParams
                    LinearLayout linearLayout = new LinearLayout(parent.getContext());
                    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
                    linearLayout.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH_PARENT, AbsListView.LayoutParams.MATCH_PARENT));

                    // text
                    TextView textView = getLabel(instruction.getName(), linearLayout);
                    linearLayout.addView(textView);

                    // text
                    // set LayoutParams for Switch in LinearLayout, so use android.widget.LinearLayout.LayoutParams;
                    LinearLayout.LayoutParams lpAlarm = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                    TextView tvAlarm = new TextView(linearLayout.getContext());
                    tvAlarm.setText(String.valueOf(instruction.getCheckAlarm()));
                    tvAlarm.setLayoutParams(lpAlarm);
                    tvAlarm.setTextColor(parent.getResources().getColor(R.color.colorBlack));
                    linearLayout.addView(tvAlarm);
                    //
                    convertView = linearLayout;
                }
                break;
            default:
                // can't return null, else raise NullPointerException
                // convertView = null;
        }
        return convertView;

    }

    private TextView getLabel(String txt, LinearLayout linearLayout) {
        LinearLayout.LayoutParams lpTextView = new LinearLayout.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT);
        lpTextView.leftMargin = linearLayout.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_padding_left);
        lpTextView.width = linearLayout.getResources().getDimensionPixelSize(R.dimen.activity_controller_instruction_label_size);
        TextView textView = new TextView(linearLayout.getContext());
        textView.setText(txt);
        textView.setLayoutParams(lpTextView);
        return textView;
    }

    public interface OnInstructionInteractionListener {
        void onSwitchInteraction(Instruction instruction, Boolean isChecked);
        void onAirTemperatureInteraction(Instruction instruction, int progress);
        void onAirSpeedInteraction(Instruction instruction, View view);
        void onAirModeInteraction(Instruction instruction, View view);
        void onTvVolumeInteraction(Instruction instruction, int progress);
        void onTvChannelInteraction(Instruction instruction, int channel);
        void onTvModeInteraction(Instruction instruction, View view);
        void onPositiveReverseStopInteraction(String name, Map<String, Instruction> mapInstruction, Map<String, Button> mapButton);
        void onShiftInteraction(Instruction instruction, View v);
        void onSetValueInteraction(Instruction instruction, String value);
    }

}
