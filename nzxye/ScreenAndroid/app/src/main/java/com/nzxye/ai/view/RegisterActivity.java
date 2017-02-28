package com.nzxye.ai.view;

import android.content.Context;
import android.hardware.Camera;
import android.os.Bundle;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.AppCompatButton;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.widget.FrameLayout;

import com.nzxye.ai.R;
import com.nzxye.ai.util.MyApplication;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class RegisterActivity extends AppCompatActivity {

    private Camera mCamera;
    private Camera.Parameters mCameraParameters;
    private Camera.CameraInfo mCameraInfo;
    private CameraPreviewView mCameraPreviewView;
    private Camera.PictureCallback mJPEG;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        // Create an instance of Camera
        mCamera = getCameraInstance();
        mCamera.setDisplayOrientation(90);

        // Get Parameters of Camera
        mCameraParameters = mCamera.getParameters();
        // mCameraParameters.setPreviewSize(640, 480);
        // mCamera.setParameters(mCameraParameters);
        mCameraInfo = new Camera.CameraInfo();
        Camera.getCameraInfo(0, mCameraInfo);
        int rotation = getWindowManager().getDefaultDisplay().getRotation();

        // Create our Preview view and set it as the content of our activity.
        mCameraPreviewView = new CameraPreviewView(this, mCamera);
        FrameLayout frameLayout = (FrameLayout) findViewById(R.id.framelayout_camera_preview);
        frameLayout.addView(mCameraPreviewView);

        // Capture
        AppCompatButton buttonCapture = (AppCompatButton) findViewById(R.id.button_capture);
        buttonCapture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // get an image from the camera
                mCamera.takePicture(null, null, mJPEG);
            }
        });

        // Capture JPEG
        mJPEG = new Camera.PictureCallback() {
            @Override
            public void onPictureTaken(byte[] bytes, Camera camera) {
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
            mSurfaceHolder.setFixedSize(480, 640);
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

}

