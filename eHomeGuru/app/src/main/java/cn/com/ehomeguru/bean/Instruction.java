package cn.com.ehomeguru.bean;

import com.gustavofao.jsonapi.Annotations.Type;
import com.gustavofao.jsonapi.Models.Resource;

/**
 * Created by xiaodongyu on 7/2/2016 AD.
 */
@Type("instruction")
public class Instruction extends Resource {

    private int uid;
    private int fid;
    private String name;
    private String instruction;
    private String categoryId;
    private String categoryName;
    private String deviceId;
    private String deviceName;
    private String sceneId;
    private String sceneName;
    private int order;
    private String log;

    // control instruction
    private int switcher;

    private int airSwitcher;
    private int airTemperature;
    private int airTemperatureControl;
    private int airSpeed;
    private int airMode;

    private int tvSwitcher;
    private int tvVolume;
    private int tvChannel;
    private int tvMode;

    private int[] positiveReverseStop;
    private int shift;
    private int checkValue;
    private int setValue;
    private int checkAlarm;

    public Instruction() {
        positiveReverseStop = new int[]{0, 0, 0};
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public int getFid() {
        return fid;
    }

    public void setFid(int fid) {
        this.fid = fid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getSceneId() {
        return sceneId;
    }

    public void setSceneId(String sceneId) {
        this.sceneId = sceneId;
    }

    public String getSceneName() {
        return sceneName;
    }

    public void setSceneName(String sceneName) {
        this.sceneName = sceneName;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getLog() {
        return log;
    }

    public void setLog(String log) {
        this.log = log;
    }

    public int getSwitcher() {
        return switcher;
    }

    public void setSwitcher(int switcher) {
        this.switcher = switcher;
    }

    public int getAirSwitcher() {
        return airSwitcher;
    }

    public void setAirSwitcher(int airSwitcher) {
        this.airSwitcher = airSwitcher;
    }

    public int getAirTemperature() {
        return airTemperature;
    }

    public void setAirTemperature(int airTemperature) {
        this.airTemperature = airTemperature;
    }

    public int getAirTemperatureControl() {
        return airTemperatureControl;
    }

    public void setAirTemperatureControl(int airTemperatureControl) {
        this.airTemperatureControl = airTemperatureControl;
    }

    public int getAirSpeed() {
        return airSpeed;
    }

    public void setAirSpeed(int airSpeed) {
        this.airSpeed = airSpeed;
    }

    public int getAirMode() {
        return airMode;
    }

    public void setAirMode(int airMode) {
        this.airMode = airMode;
    }

    public int getTvSwitcher() {
        return tvSwitcher;
    }

    public void setTvSwitcher(int tvSwitcher) {
        this.tvSwitcher = tvSwitcher;
    }

    public int getTvVolume() {
        return tvVolume;
    }

    public void setTvVolume(int tvVolume) {
        this.tvVolume = tvVolume;
    }

    public int getTvChannel() {
        return tvChannel;
    }

    public void setTvChannel(int tvChannel) {
        this.tvChannel = tvChannel;
    }

    public int getTvMode() {
        return tvMode;
    }

    public void setTvMode(int tvMode) {
        this.tvMode = tvMode;
    }

    public int[] getPositiveReverseStop() {
        return positiveReverseStop;
    }

    public void setPositiveReverseStop(int[] positiveReverseStop) {
        this.positiveReverseStop = positiveReverseStop;
    }

    public int getShift() {
        return shift;
    }

    public void setShift(int shift) {
        this.shift = shift;
    }

    public int getCheckValue() {
        return checkValue;
    }

    public void setCheckValue(int checkValue) {
        this.checkValue = checkValue;
    }

    public int getSetValue() {
        return setValue;
    }

    public void setSetValue(int setValue) {
        this.setValue = setValue;
    }

    public int getCheckAlarm() {
        return checkAlarm;
    }

    public void setCheckAlarm(int checkAlarm) {
        this.checkAlarm = checkAlarm;
    }
}
