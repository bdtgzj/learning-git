package com.nzxye.ai.view;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.SurfaceTexture;
import android.hardware.Camera;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.opengl.Matrix;
import android.os.Bundle;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Message;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.megvii.facepp.sdk.Facepp;
import com.nzxye.ai.R;
import com.nzxye.ai.bean.DetectResponse;
import com.nzxye.ai.service.FaceService;
import com.nzxye.ai.service.ServiceGeneratorFace;
import com.nzxye.ai.util.CameraMatrix;
import com.nzxye.ai.util.ConUtil;
import com.nzxye.ai.util.DialogUtil;
import com.nzxye.ai.util.ICamera;
import com.nzxye.ai.util.MediaRecorderUtil;
import com.nzxye.ai.util.OpenGLDrawRect;
import com.nzxye.ai.util.OpenGLUtil;
import com.nzxye.ai.util.PointsMatrix;
import com.nzxye.ai.util.RetrofitUtil;
import com.nzxye.ai.util.Screen;
import com.nzxye.ai.util.SensorEventUtil;

import java.io.ByteArrayOutputStream;
import java.nio.FloatBuffer;
import java.util.ArrayList;
import java.util.HashMap;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class OpenglActivity extends AppCompatActivity implements
        Camera.PreviewCallback,
        GLSurfaceView.Renderer,
        SurfaceTexture.OnFrameAvailableListener,
        NavigationDrawerFragment.NavigationDrawerCallbacks {

    // params
    private boolean isStartRecorder, is3DPose, isDebug, isROIDetect, is106Points, isBackCamera, isFaceProperty, isSmooth;
    private int min_face_size = 200;
    private int detection_interval = 100;
    private HashMap<String, Integer> resolutionMap;
    private int printTime = 31;
    // UI
    private GLSurfaceView mGlSurfaceView;
    private Camera mCamera;
    private ICamera mICamera;
    private TextView debugInfoText, debugPrinttext, attributetext;
    private DialogUtil mDialogUtil;
    //
    private Facepp facepp;

    private SensorEventUtil sensorUtil;

    private Handler mHandler;
    private HandlerThread mHandlerThread = new HandlerThread("facepp");

    private MediaRecorderUtil mediaRecorderUtil;

    private int Angle;

    // Navigation Drawer
    private NavigationDrawerFragment mNavigationDrawerFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_opengl);
        //
        Screen.initialize(this);
        //
        init();
        //
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                startRecorder();
            }
        }, 2000);

        // Setup Navigation Drawer
        mNavigationDrawerFragment = (NavigationDrawerFragment)
                getFragmentManager().findFragmentById(R.id.navigation_drawer_fragment);
        mNavigationDrawerFragment.setUp(
                R.id.navigation_drawer_fragment,
                (DrawerLayout) findViewById(R.id.drawer_layout));
    }

    @Override
    protected void onResume() {
        super.onResume();
        ConUtil.acquireWakeLock(this);
        startTime = System.currentTimeMillis();
        mCamera = mICamera.openCamera(isBackCamera, this, resolutionMap);
        if (mCamera != null) {
            Angle = 360 - mICamera.Angle;
            if (isBackCamera)
                Angle = mICamera.Angle;

            RelativeLayout.LayoutParams layout_params = mICamera.getLayoutParam();
            mGlSurfaceView.setLayoutParams(layout_params);

            int width = mICamera.cameraWidth;
            int height = mICamera.cameraHeight;

            int left = 0;
            int top = 0;
            int right = width;
            int bottom = height;
            if (isROIDetect) {
                float line = height * roi_ratio;
                left = (int) ((width - line) / 2.0f);
                top = (int) ((height - line) / 2.0f);
                right = width - left;
                bottom = height - top;
            }

            String errorCode = facepp.init(this, ConUtil.getFileContent(this, R.raw.megviifacepp_0_4_1_model));
            Facepp.FaceppConfig faceppConfig = facepp.getFaceppConfig();
            faceppConfig.interval = detection_interval;
            faceppConfig.minFaceSize = min_face_size;
            faceppConfig.roi_left = left;
            faceppConfig.roi_top = top;
            faceppConfig.roi_right = right;
            faceppConfig.roi_bottom = bottom;
            if (isSmooth)
                faceppConfig.detectionMode = Facepp.FaceppConfig.DETECTION_MODE_TRACKING_SMOOTH;
            else
                faceppConfig.detectionMode = Facepp.FaceppConfig.DETECTION_MODE_TRACKING;
            facepp.setFaceppConfig(faceppConfig);
        } else {
            mDialogUtil.showDialog("打开相机失败");
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        ConUtil.releaseWakeLock();
        if (mediaRecorderUtil != null) {
            mediaRecorderUtil.releaseMediaRecorder();
        }
        mICamera.closeCamera();
        mCamera = null;

        timeHandle.removeMessages(0);

        finish();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        facepp.release();
    }

    private void init() {
        if (android.os.Build.MODEL.equals("PLK-AL10"))
            printTime = 50;

        // 录像，录像 mp4 文件被自动存放到 megvii81point_video 目录中。
        isStartRecorder = getIntent().getBooleanExtra("isStartRecorder", false);
        // 3D 模型
        is3DPose = getIntent().getBooleanExtra("is3DPose", false);
        // 调试信息
        isDebug = getIntent().getBooleanExtra("isdebug", false);
        // 区域选择
        isROIDetect = getIntent().getBooleanExtra("ROIDetect", true);
        // 关键点数，81/106
        is106Points = getIntent().getBooleanExtra("is106Points", false);
        // 前置摄像头
        isBackCamera = getIntent().getBooleanExtra("isBackCamera", true);
        //
        isFaceProperty = getIntent().getBooleanExtra("isFaceProperty", false);
        //
        isSmooth = getIntent().getBooleanExtra("isSmooth", false);
        // 最小人脸，默认 200，范围 33 ~ 2147483647
        min_face_size = getIntent().getIntExtra("faceSize", min_face_size);
        // 检测间隔，默认 100，范围 1 ~ 2147483647
        detection_interval = getIntent().getIntExtra("interval", detection_interval);
        // 相机分辨率，默认 640*480
        resolutionMap = (HashMap<String, Integer>) getIntent().getSerializableExtra("resolution");
        // 手动强制指定相机分辨率，需根据相机支持的最佳分辨率来设置。
        if (resolutionMap == null) {
            resolutionMap = new HashMap<>();
            resolutionMap.put("width", 800);
            resolutionMap.put("height", 480);
        }

        facepp = new Facepp();

        sensorUtil = new SensorEventUtil(this);

        mHandlerThread.start();
        mHandler = new Handler(mHandlerThread.getLooper());

        // OpenGL
        mGlSurfaceView = (GLSurfaceView) findViewById(R.id.opengl_layout_surfaceview);
        mGlSurfaceView.setEGLContextClientVersion(2);// 创建一个OpenGL ES 2.0
        // context
        mGlSurfaceView.setRenderer(this);// 设置渲染器进入gl
        // RENDERMODE_CONTINUOUSLY不停渲染
        // RENDERMODE_WHEN_DIRTY懒惰渲染，需要手动调用 glSurfaceView.requestRender() 才会进行更新
        mGlSurfaceView.setRenderMode(mGlSurfaceView.RENDERMODE_WHEN_DIRTY);// 设置渲染器模式
        mGlSurfaceView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                autoFocus();
            }
        });

        // Camera
        mICamera = new ICamera();
        //
        mDialogUtil = new DialogUtil(this);
        debugInfoText = (TextView) findViewById(R.id.opengl_layout_debugInfotext);
        attributetext = (TextView) findViewById(R.id.opengl_layout_attributetext);
        debugPrinttext = (TextView) findViewById(R.id.opengl_layout_debugPrinttext);
        if (isDebug)
            debugInfoText.setVisibility(View.VISIBLE);
        else
            debugInfoText.setVisibility(View.INVISIBLE);
    }

    private void autoFocus() {
        if (mCamera != null && isBackCamera) {
            mCamera.cancelAutoFocus();
            Camera.Parameters parameters = mCamera.getParameters();
            parameters.setFocusMode(Camera.Parameters.FOCUS_MODE_AUTO);
            mCamera.setParameters(parameters);
            mCamera.autoFocus(null);
        }
    }

    /**
     * 开始录像
     */
    private void startRecorder() {
        if (isStartRecorder) {
            int Angle = 360 - mICamera.Angle;
            if (isBackCamera)
                Angle = mICamera.Angle;
            mediaRecorderUtil = new MediaRecorderUtil(this, mCamera, mICamera.cameraWidth, mICamera.cameraHeight);
            isStartRecorder = mediaRecorderUtil.prepareVideoRecorder(Angle);
            if (isStartRecorder) {
                boolean isRecordSucess = mediaRecorderUtil.start();
                if (isRecordSucess)
                    mICamera.actionDetect(this);
                else
                    mDialogUtil.showDialog("该分辨率不能录制视频");
            }
        }
    }

    /**
     * 画绿色框
     */
    private PointsMatrix mPointsMatrix;
    private float roi_ratio = 0.8f;

    private void drawShowRect() {
        mPointsMatrix.vertexBuffers = OpenGLDrawRect.drawCenterShowRect(isBackCamera, mICamera.cameraWidth,
                mICamera.cameraHeight, roi_ratio);
    }

    /**
     * implement interface Camera.PreviewCallback
     */
    boolean isSuccess = false;
    float confidence;
    float pitch, yaw, roll;
    long startTime;
    long time_AgeGender_end = 0;
    String AttriButeStr = "";
    int rotation = Angle;
    private CameraMatrix mCameraMatrix;
    private boolean isTiming = true; // 是否是定时去刷新界面;
    private Handler timeHandle = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case 0:
                    mGlSurfaceView.requestRender();// 发送去绘制照相机不断去回调
                    timeHandle.sendEmptyMessageDelayed(0, printTime);
                    break;
                case 1:
                    mGlSurfaceView.requestRender();// 发送去绘制照相机不断去回调
                    break;
            }
        }
    };

    // prevent duplicate
    int track_id = -1;
    @Override
    public void onPreviewFrame(final byte[] imgData, final Camera camera) {
        if (isSuccess)
            return;
        isSuccess = true;

        mHandler.post(new Runnable() {
            @Override
            public void run() {
                int width = mICamera.cameraWidth;
                int height = mICamera.cameraHeight;

                long faceDetectTime_action = System.currentTimeMillis();
                int orientation = sensorUtil.orientation;
                if (orientation == 0)
                    rotation = Angle;
                else if (orientation == 1)
                    rotation = 0;
                else if (orientation == 2)
                    rotation = 180;
                else if (orientation == 3)
                    rotation = 360 - Angle;

                setConfig(rotation);

                final Facepp.Face[] faces = facepp.detect(imgData, width, height, Facepp.IMAGEMODE_NV21);
                final long algorithmTime = System.currentTimeMillis() - faceDetectTime_action;

                if (faces != null) {
                    long actionMaticsTime = System.currentTimeMillis();
                    ArrayList<ArrayList> pointsOpengl = new ArrayList<ArrayList>();
                    confidence = 0.0f;

                    if (faces.length >= 0) {
                        for (int c = 0; c < faces.length; c++) {
                            if (is106Points)
                                facepp.getLandmark(faces[c], Facepp.FPP_GET_LANDMARK106);
                            else
                                facepp.getLandmark(faces[c], Facepp.FPP_GET_LANDMARK81);

                            if (is3DPose) {
                                facepp.get3DPose(faces[c]);
                            }

                            final Facepp.Face face = faces[c];

                            if (isFaceProperty) {
                                long time_AgeGender_action = System.currentTimeMillis();
                                facepp.getAgeGender(faces[c]);
                                time_AgeGender_end = System.currentTimeMillis() - time_AgeGender_action;
                                String gender = "man";
                                if (face.female > face.male)
                                    gender = "woman";
                                AttriButeStr = "\nage: " + (int) Math.max(face.age, 1) + "\ngender: " + gender;
                            }

                            pitch = faces[c].pitch;
                            yaw = faces[c].yaw;
                            roll = faces[c].roll;
                            confidence = faces[c].confidence;

                            if (orientation == 1 || orientation == 2) {
                                width = mICamera.cameraHeight;
                                height = mICamera.cameraWidth;
                            }

                            ArrayList<FloatBuffer> triangleVBList = new ArrayList<FloatBuffer>();
                            for (int i = 0; i < faces[c].points.length; i++) {
                                float x = (faces[c].points[i].x / height) * 2 - 1;
                                if (isBackCamera)
                                    x = -x;
                                float y = 1 - (faces[c].points[i].y / width) * 2;
                                float[] pointf = new float[] { x, y, 0.0f };
                                if (orientation == 1)
                                    pointf = new float[] { -y, x, 0.0f };
                                if (orientation == 2)
                                    pointf = new float[] { y, -x, 0.0f };
                                if (orientation == 3)
                                    pointf = new float[] { -x, -y, 0.0f };

                                FloatBuffer fb = mCameraMatrix.floatBufferUtil(pointf);
                                triangleVBList.add(fb);
                            }

                            pointsOpengl.add(triangleVBList);

                            //
                            if (confidence > 0.9) {
                                if (track_id != face.trackID) {
                                    track_id = face.trackID;
                                    /*
                                    try {
                                        FileOutputStream fos = null;
                                        fos = new FileOutputStream(Environment.getExternalStorageDirectory() + "/dd.jpeg");
                                        YuvImage yuvImage = new YuvImage(imgData, ImageFormat.NV21, width, height, null);
                                        yuvImage.compressToJpeg(new Rect(0, 0, width, height), 100, fos);
                                        fos.close();
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                    */
                                    /*
                                    try {
                                        FileOutputStream fos = null;
                                        fos = new FileOutputStream(Environment.getExternalStorageDirectory() + "/dd.jpeg");
                                        Bitmap bitmap = mICamera.getBitMap(imgData, camera, !isBackCamera);
                                        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos);
                                        fos.close();
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                    */
                                    /*
                                    // NV21 to JPEG
                                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                                    YuvImage yuvImage = new YuvImage(imgData, ImageFormat.NV21, width, height, null);
                                    yuvImage.compressToJpeg(new Rect(0, 0, width, height), 100, baos);
                                    byte[] byteJPEG = baos.toByteArray();
                                    */

                                    Bitmap bitmap = mICamera.getBitMap(imgData, camera, !isBackCamera);
                                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                                    bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
                                    byte[] byteJPEG = baos.toByteArray();
                                    //
                                    // DetectRequest detectRequest = new DetectRequest();
                                    // detectRequest.setImage_file(imgData);

                                }

                            }

                        }
                    } else {
                        pitch = 0.0f;
                        yaw = 0.0f;
                        roll = 0.0f;
                    }
                    if (faces.length > 0 && is3DPose)
                        mPointsMatrix.bottomVertexBuffer = OpenGLDrawRect.drawBottomShowRect(0.15f, 0, -0.7f, pitch, -yaw, roll, rotation);
                    else
                        mPointsMatrix.bottomVertexBuffer = null;
                    synchronized (mPointsMatrix) {
                        mPointsMatrix.points = pointsOpengl;
                    }

                    final long matrixTime = System.currentTimeMillis() - actionMaticsTime;
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            String logStr = "\ncameraWidth: " + mICamera.cameraWidth + "\ncameraHeight: "
                                    + mICamera.cameraHeight + "\nalgorithmTime: " + algorithmTime + "ms"
                                    + "\nmatrixTime: " + matrixTime + "\nconfidence:" + confidence;
                            debugInfoText.setText(logStr);
                            if (faces.length > 0 && isFaceProperty && AttriButeStr != null && AttriButeStr.length() > 0)
                                attributetext.setText(AttriButeStr + "\nAgeGenderTime:" + time_AgeGender_end);
                            else
                                attributetext.setText("");
                        }
                    });
                }
                isSuccess = false;
                if (!isTiming) {
                    timeHandle.sendEmptyMessage(1);
                }
            }
        });
    }

    private void setConfig(int rotation) {
        Facepp.FaceppConfig faceppConfig = facepp.getFaceppConfig();
        if (faceppConfig.rotation != rotation) {
            faceppConfig.rotation = rotation;
            facepp.setFaceppConfig(faceppConfig);
        }
    }

    /**
     * implement interface GLSurfaceView.Renderer
     */
    private int mTextureID = -1;
    private SurfaceTexture mSurface;

    @Override
    public void onSurfaceCreated(GL10 gl, EGLConfig config) {
        // 黑色背景
        GLES20.glClearColor(0.0f, 0.0f, 0.0f, 1.0f);

        mTextureID = OpenGLUtil.createTextureID();
        mSurface = new SurfaceTexture(mTextureID);
        // 这个接口就干了这么一件事，当有数据上来后会进到onFrameAvailable方法
        mSurface.setOnFrameAvailableListener(this);// 设置照相机有数据时进入
        mCameraMatrix = new CameraMatrix(mTextureID);
        mPointsMatrix = new PointsMatrix();
        mICamera.startPreview(mSurface);// 设置预览容器
        mICamera.actionDetect(this);
        if (isTiming) {
            timeHandle.sendEmptyMessageDelayed(0, printTime);
        }
        if (isROIDetect)
            drawShowRect();
    }

    @Override
    public void onSurfaceChanged(GL10 gl, int width, int height) {
        // 设置画面的大小
        GLES20.glViewport(0, 0, width, height);

        float ratio = (float) width / height;
        ratio = 1; // 这样OpenGL就可以按照屏幕框来画了，不是一个正方形了

        // this projection matrix is applied to object coordinates
        // in the onDrawFrame() method
        Matrix.frustumM(mProjMatrix, 0, -ratio, ratio, -1, 1, 3, 7);
        // Matrix.perspectiveM(mProjMatrix, 0, 0.382f, ratio, 3, 700);
    }

    private final float[] mMVPMatrix = new float[16];
    private final float[] mProjMatrix = new float[16];
    private final float[] mVMatrix = new float[16];
    // private final float[] mRotationMatrix = new float[16];

    @Override
    public void onDrawFrame(GL10 gl) {
        final long actionTime = System.currentTimeMillis();
        // Log.w("ceshi", "onDrawFrame===");
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);// 清除屏幕和深度缓存
        float[] mtx = new float[16];
        mSurface.getTransformMatrix(mtx);
        mCameraMatrix.draw(mtx);
        // Set the camera position (View matrix)
        Matrix.setLookAtM(mVMatrix, 0, 0, 0, -3, 0f, 0f, 0f, 0f, 1f, 0f);

        // Calculate the projection and view transformation
        Matrix.multiplyMM(mMVPMatrix, 0, mProjMatrix, 0, mVMatrix, 0);

        mPointsMatrix.draw(mMVPMatrix);

        if (isDebug) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    final long endTime = System.currentTimeMillis() - actionTime;
                    debugPrinttext.setText("printTime: " + endTime);
                }
            });
        }
        mSurface.updateTexImage();// 更新image，会调用onFrameAvailable方法
    }

    /**
     * implement interface SurfaceTexture.OnFrameAvailableListener
     */
    @Override
    public void onFrameAvailable(SurfaceTexture surfaceTexture) {
        // TODO Auto-generated method stub
        // Log.d("dd", "onFrameAvailable.\n");
    }

    @Override
    public void onNavigationDrawerItemSelected(int position) {
        Intent intent;
        switch (position) {
            // face
            case 0:
                intent = new Intent(OpenglActivity.this, RegisterActivity.class);
                startActivity(intent);
                break;
            // stats
            case 1:
                break;
            // user info
            case 2:
                intent = new Intent(OpenglActivity.this, MeActivity.class);
                intent.putExtra("fragmentName", "com.nzxye.ai.view.UserInfoFragment");
                startActivity(intent);
                break;
            // log login
            case 3:
                intent = new Intent(OpenglActivity.this, MeActivity.class);
                intent.putExtra("fragmentName", "com.nzxye.ai.view.LogFragment");
                intent.putExtra("category", 1);
                startActivity(intent);
                break;
            // log operation
            case 4:
                intent = new Intent(OpenglActivity.this, MeActivity.class);
                intent.putExtra("fragmentName", "com.nzxye.ai.view.LogFragment");
                intent.putExtra("category", 2);
                startActivity(intent);
                break;
            // exit
            case 5:
                ExitDialogFragment.create().show(getSupportFragmentManager(), getString(R.string.fragment_exitdialog_name));
                break;
        }
    }
}
