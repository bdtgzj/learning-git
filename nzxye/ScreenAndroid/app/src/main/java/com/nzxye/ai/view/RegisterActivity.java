package com.nzxye.ai.view;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.hardware.Camera;
import android.os.Bundle;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.AppCompatButton;
import android.text.TextUtils;
import android.util.Log;
import android.view.Surface;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.Toast;

import com.gustavofao.jsonapi.Annotations.Id;
import com.mobsandgeeks.saripaar.ValidationError;
import com.mobsandgeeks.saripaar.Validator;
import com.mobsandgeeks.saripaar.annotation.AssertTrue;
import com.mobsandgeeks.saripaar.annotation.DecimalMin;
import com.mobsandgeeks.saripaar.annotation.Digits;
import com.mobsandgeeks.saripaar.annotation.Email;
import com.mobsandgeeks.saripaar.annotation.Length;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;
import com.mobsandgeeks.saripaar.annotation.Optional;
import com.mobsandgeeks.saripaar.annotation.Pattern;
import com.nzxye.ai.R;
import com.nzxye.ai.util.MyApplication;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import static android.text.TextUtils.isEmpty;

public class RegisterActivity extends AppCompatActivity implements Validator.ValidationListener {

    private Camera mCamera;
    private Camera.Parameters mCameraParameters;
    private CameraPreviewView mCameraPreviewView;
    private int mCameraId = 0;// 0 = 后置摄像头, 1 = 前置摄像头
    public int mCameraWidth;
    public int mCameraHeight;
    private Camera.PictureCallback mJPEG;
    //
    private Validator mValidator;
    @Length(min = 2, max = 20, messageResId = R.string.register_activity_error_name)
    private EditText mName;
    @Pattern(regex = "\\d{11,13}", messageResId = R.string.register_activity_error_mphone)
    private EditText mMphone;
    @Pattern(regex = "^$|\\w{18}", messageResId = R.string.register_activity_error_idcard)
    private EditText mIdCard;
    @Pattern(regex = "^$|^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$", messageResId = R.string.register_activity_error_email)
    private EditText mEmail;
    @Pattern(regex = "^$|.{1,18}", messageResId = R.string.register_activity_error_nickname)
    private EditText mNickName;
    @Pattern(regex = "^$|.{2,50}", messageResId = R.string.register_activity_error_address)
    private EditText mAddress;
    @Pattern(regex = "^$|.{1,50}", messageResId = R.string.register_activity_error_remark)
    private EditText mRemark;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        //
        mName = (EditText) findViewById(R.id.activity_register_name);
        mMphone = (EditText) findViewById(R.id.activity_register_mphone);
        mIdCard = (EditText) findViewById(R.id.activity_register_idcard);
        mEmail = (EditText) findViewById(R.id.activity_register_email);
        mNickName = (EditText) findViewById(R.id.activity_register_nickname);
        mAddress = (EditText) findViewById(R.id.activity_register_address);
        mRemark = (EditText) findViewById(R.id.activity_register_remark);

        // validator
        mValidator = new Validator(this);
        mValidator.setValidationListener(this);

        // Create an instance of Camera
        mCamera = getCameraInstance();
        // set orientation
        setCameraDisplayOrientation(this, mCameraId, mCamera);
        // mCamera.setDisplayOrientation(90);

        // Set Parameters of Camera, PreviewSize & PictureSize.
        int defaultWidth = 640;
        int defaultHeight = 480;
        mCameraParameters = mCamera.getParameters();
        Camera.Size bestPreviewSize = getBestPreviewSize(mCameraParameters, defaultWidth, defaultHeight);
        mCameraWidth = bestPreviewSize.width;
        mCameraHeight = bestPreviewSize.height;
        mCameraParameters.setPreviewSize(mCameraWidth, mCameraHeight);
        mCameraParameters.setPictureSize(mCameraWidth, mCameraHeight);
        mCamera.setParameters(mCameraParameters);
        // Get Infos of Camera Hardware
        /*
        Camera.CameraInfo mCameraInfo = new Camera.CameraInfo();
        Camera.getCameraInfo(0, mCameraInfo);
        int rotation = getWindowManager().getDefaultDisplay().getRotation();
        */

        // Create our Preview view and set it as the content of our activity.
        mCameraPreviewView = new CameraPreviewView(this, mCamera);
        FrameLayout frameLayout = (FrameLayout) findViewById(R.id.framelayout_camera_preview);
        frameLayout.addView(mCameraPreviewView);

        // Capture
        AppCompatButton buttonCapture = (AppCompatButton) findViewById(R.id.button_capture);
        buttonCapture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // validate
                mValidator.validate();
            }
        });

        // Capture JPEG
        mJPEG = new Camera.PictureCallback() {
            @Override
            public void onPictureTaken(byte[] bytes, Camera camera) {
                bytes = jpegRotateScale(bytes, mCameraId == 1);
                try {
                    FileOutputStream fos = new FileOutputStream(Environment.getExternalStorageDirectory() + "/d.jpeg");
                    fos.write(bytes);
                    fos.close();
                } catch (FileNotFoundException e) {
                    Log.d(MyApplication.LOG_TAG, "File not found: " + e.getMessage());
                } catch (IOException e) {
                    Log.d(MyApplication.LOG_TAG, "Error accessing file: " + e.getMessage());
                }
                // restart Preview
                mCamera.startPreview();
            }
        };
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        closeCamera();
    }

    /**
     * get camera
     */
    public static Camera getCameraInstance(){
        Camera c = null;
        try {
            c = Camera.open(); // attempt to get a Camera instance
        }
        catch (Exception e){
            // Camera is not available (in use or does not exist)
            Log.d(MyApplication.LOG_TAG, "Error open camera: " + e.getMessage());
        }
        return c; // returns null if camera is unavailable
    }

    /**
     * If you want to make the camera image show in the same orientation as the display, you can use the following code.
     */
    public static void setCameraDisplayOrientation(AppCompatActivity activity, int cameraId, Camera camera) {
        //
        Camera.CameraInfo cameraInfo = new Camera.CameraInfo();
        Camera.getCameraInfo(cameraId, cameraInfo);
        //
        int rotation = activity.getWindowManager().getDefaultDisplay().getRotation();
        //
        int degrees = 0;
        //
        switch (rotation) {
            case Surface.ROTATION_0: degrees = 0; break;
            case Surface.ROTATION_90: degrees = 90; break;
            case Surface.ROTATION_180: degrees = 180; break;
            case Surface.ROTATION_270: degrees = 270; break;
        }
        //
        int result;
        if (cameraInfo.facing == Camera.CameraInfo.CAMERA_FACING_FRONT) {
            result = (cameraInfo.orientation + degrees) % 360;
            // compensate the mirror
            result = (360 - result) % 360;
        } else {
            result = (cameraInfo.orientation - degrees + 360) % 360;
        }
        camera.setDisplayOrientation(result);
    }

    /**
     * 通过传入的宽高算出最接近于宽高值的相机大小，比较像素多少。
     */
    public Camera.Size getBestPreviewSize(Camera.Parameters camPara, final int width, final int height) {
        List<Camera.Size> allSupportedSize = camPara.getSupportedPreviewSizes();
        ArrayList<Camera.Size> widthLargerSize = new ArrayList<Camera.Size>();
        for (Camera.Size tmpSize : allSupportedSize) {
            Log.w(MyApplication.LOG_TAG, "tmpSize.width===" + tmpSize.width + ", tmpSize.height===" + tmpSize.height);
            if (tmpSize.width > tmpSize.height) {
                widthLargerSize.add(tmpSize);
            }
        }

        Collections.sort(widthLargerSize, new Comparator<Camera.Size>() {
            @Override
            public int compare(Camera.Size lhs, Camera.Size rhs) {
                int off_one = Math.abs(lhs.width * lhs.height - width * height);
                int off_two = Math.abs(rhs.width * rhs.height - width * height);
                return off_one - off_two;
            }
        });

        return widthLargerSize.get(0);
    }

    /**
     *
     */
    public byte[] jpegRotateScale(byte[] bytesJPEG, boolean isFrontCamera) {
        Bitmap tmpBitmap = BitmapFactory.decodeByteArray(bytesJPEG, 0, bytesJPEG.length);
        Matrix matrix = new Matrix();
        matrix.reset();
        // rotate pic
        if (isFrontCamera) {
            matrix.setRotate(-90);
        } else {
            matrix.setRotate(90);
        }
        tmpBitmap = Bitmap.createBitmap(tmpBitmap, 0, 0, tmpBitmap.getWidth(), tmpBitmap.getHeight(), matrix, true);
        tmpBitmap = tmpBitmap.copy(Bitmap.Config.ARGB_8888, true);
        // scale to 800
        int hight = tmpBitmap.getHeight() > tmpBitmap.getWidth() ? tmpBitmap.getHeight() : tmpBitmap.getWidth();
        float scale = hight / 800.0f;
        if (scale > 1) {
            tmpBitmap = Bitmap.createScaledBitmap(
                    tmpBitmap,
                    (int) (tmpBitmap.getWidth() / scale),
                    (int) (tmpBitmap.getHeight() / scale), false
            );
        }
        // bitmap to jpeg
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        tmpBitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        return baos.toByteArray();
    }

    public void closeCamera() {
        if (mCamera != null) {
            mCamera.stopPreview();
            mCamera.setPreviewCallback(null);
            mCamera.release();
            mCamera = null;
        }
    }

    // a view for display camera data
    public class CameraPreviewView extends SurfaceView implements SurfaceHolder.Callback {

        private SurfaceHolder mSurfaceHolder;
        private Camera mCamera;

        public CameraPreviewView(Context context, Camera camera) {
            super(context);
            mCamera = camera;
            // Install a SurfaceHolder.Callback,
            // so we get notified when the underlying surface is created and destroyed.
            mSurfaceHolder = getHolder();
            mSurfaceHolder.addCallback(this);
            // set size of SurfaceHolder
            mSurfaceHolder.setFixedSize(mCameraHeight, mCameraWidth);
            // deprecated setting, but required on Android versions prior to 3.0
            mSurfaceHolder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
        }

        /*
         * implement SurfaceHolder.Callback
         *
         */
        @Override
        public void surfaceCreated(SurfaceHolder surfaceHolder) {
            // The Surface has been created, now tell the camera where to draw the preview.
            try {
                mCamera.setPreviewDisplay(surfaceHolder);
                mCamera.startPreview();
            } catch (IOException e) {
                Log.d(MyApplication.LOG_TAG, "Error setting camera preview: " + e.getMessage());
            }

        }

        @Override
        public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {
            // If your preview can change or rotate, take care of those events here.
            // Make sure to stop the preview before resizing or reformatting it.

            if (mSurfaceHolder.getSurface() == null){
                // preview surface does not exist
                return;
            }

            // stop preview before making changes
            try {
                mCamera.stopPreview();
            } catch (Exception e) {
                // ignore: tried to stop a non-existent preview
                Log.d(MyApplication.LOG_TAG, "Error stop camera preview: " + e.getMessage());
            }

            // set preview size and make any resize, rotate or reformatting changes here



            // start preview with new settings
            try {
                mCamera.setPreviewDisplay(mSurfaceHolder);
                mCamera.startPreview();
            } catch (Exception e){
                Log.d(MyApplication.LOG_TAG, "Error starting camera preview: " + e.getMessage());
            }

        }

        @Override
        public void surfaceDestroyed(SurfaceHolder surfaceHolder) {

        }
    }

    @Override
    public void onValidationSucceeded() {
        // get an image from the camera
        mCamera.takePicture(null, null, mJPEG);
    }

    @Override
    public void onValidationFailed(List<ValidationError> errors) {
        for (ValidationError error : errors) {
            View view = error.getView();
            String message = error.getCollatedErrorMessage(this);
            // Display error message
            if (view instanceof EditText) {
                ((EditText) view).setError(message);
                view.requestFocus();
            } else {
                Toast.makeText(this, message, Toast.LENGTH_LONG).show();
            }
        }
    }
}

