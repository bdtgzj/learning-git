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
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;
import com.mobsandgeeks.saripaar.ValidationError;
import com.mobsandgeeks.saripaar.Validator;
import com.mobsandgeeks.saripaar.annotation.Length;
import com.mobsandgeeks.saripaar.annotation.Pattern;
import com.nzxye.ai.R;
import com.nzxye.ai.bean.AddFaceResponse;
import com.nzxye.ai.bean.Customer;
import com.nzxye.ai.bean.DetectResponse;
import com.nzxye.ai.bean.SetUserIDResponse;
import com.nzxye.ai.bean.User;
import com.nzxye.ai.model.GlobalData;
import com.nzxye.ai.service.CustomerService;
import com.nzxye.ai.service.FaceService;
import com.nzxye.ai.service.ServiceGenerator;
import com.nzxye.ai.service.ServiceGeneratorFace;
import com.nzxye.ai.util.CommonUtil;
import com.nzxye.ai.util.MyApplication;
import com.nzxye.ai.util.ResponseUtil;
import com.nzxye.ai.util.RetrofitUtil;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity implements Validator.ValidationListener {

    private Camera mCamera;
    private Camera.Parameters mCameraParameters;
    private CameraPreviewView mCameraPreviewView;
    private int mCameraId = 0;// 0 = 后置摄像头, 1 = 前置摄像头
    public int mCameraWidth;
    public int mCameraHeight;
    private Camera.PictureCallback mPic;
    private byte[] mJPEG;
    private static final String OUTER_ID  = "CustomerFaceSet";
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
    //
    private RadioGroup mSex;
    private RadioButton mSexMale;
    private RadioButton mSexFemale;
    //
    private User mUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        // Get User Info
        mUser = (User) GlobalData.getObjectForKey("user");
        //
        mName = (EditText) findViewById(R.id.activity_register_name);
        mMphone = (EditText) findViewById(R.id.activity_register_mphone);
        mIdCard = (EditText) findViewById(R.id.activity_register_idcard);
        mEmail = (EditText) findViewById(R.id.activity_register_email);
        mNickName = (EditText) findViewById(R.id.activity_register_nickname);
        mAddress = (EditText) findViewById(R.id.activity_register_address);
        mRemark = (EditText) findViewById(R.id.activity_register_remark);
        //
        mSex = (RadioGroup) findViewById(R.id.activity_register_sex);
        mSexMale = (RadioButton) findViewById(R.id.activity_register_sex_male);
        mSexFemale = (RadioButton) findViewById(R.id.activity_register_sex_female);

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
        mPic = new Camera.PictureCallback() {
            @Override
            public void onPictureTaken(byte[] bytes, Camera camera) {
                mJPEG = jpegRotateScale(bytes, mCameraId == 1);
                try {
                    FileOutputStream fos = new FileOutputStream(Environment.getExternalStorageDirectory() + "/d.jpeg");
                    fos.write(mJPEG);
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
        // Camera
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
        mCamera.takePicture(null, null, mPic);
        // Create Customer
        Customer customer = new Customer();
        customer.setName(mName.getText().toString());
        customer.setMphone(mMphone.getText().toString());
        if (!TextUtils.isEmpty(mIdCard.getText().toString()))
            customer.setIdCard(mIdCard.getText().toString());
        if (!TextUtils.isEmpty(mEmail.getText().toString()))
            customer.setEmail(mEmail.getText().toString());
        if (!TextUtils.isEmpty(mNickName.getText().toString()))
            customer.setNickName(mNickName.getText().toString());
        if (!TextUtils.isEmpty(mAddress.getText().toString()))
            customer.setAddress(mAddress.getText().toString());
        if (!TextUtils.isEmpty(mRemark.getText().toString()))
            customer.setRemark(mRemark.getText().toString());
        switch (mSex.getCheckedRadioButtonId()) {
            case R.id.activity_register_sex_male:
                customer.setSex(mSexMale.getText().toString());
            case R.id.activity_register_sex_female:
                customer.setSex(mSexFemale.getText().toString());
        }
        /**
         * Create Customer
         */
        CustomerService customerService = ServiceGenerator.createService(CustomerService.class, mUser.getName(), mUser.getPassword());
        Call<JSONApiObject> call = customerService.create(customer);
        call.enqueue(new Callback<JSONApiObject>() {
            @Override
            public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                List<Resource> resources = ResponseUtil.parseResponse(response, getBaseContext());
                if (resources != null) {
                    if (resources.size() > 0) {
                        Customer customerRet = (Customer) resources.get(0);
                        final String customerID = customerRet.getId();
                        /**
                         * Detect JPEG for face_token
                         */
                            final FaceService faceService = ServiceGeneratorFace.createService(FaceService.class);
                        Call<DetectResponse> callDetect = faceService.detectByByte(
                                RetrofitUtil.getPartFromString(ServiceGeneratorFace.API_KEY),
                                RetrofitUtil.getPartFromString(ServiceGeneratorFace.API_SECRET),
                                RetrofitUtil.getPartFromBytes("image_file", mJPEG)
                        );
                        callDetect.enqueue(new Callback<DetectResponse>() {
                            @Override
                            public void onResponse(Call<DetectResponse> call, Response<DetectResponse> response) {
                                DetectResponse detectResponse = ResponseUtil.parseResponseFaceDetect(response, getBaseContext());
                                if (detectResponse != null) {
                                    final String faceToken = detectResponse.getFaces().get(0).getFaceToken();
                                    /**
                                     * Add face_token to FaceSet
                                     */
                                    Call<AddFaceResponse> callAddFace = faceService.addFace(
                                            RetrofitUtil.getPartFromString(ServiceGeneratorFace.API_KEY),
                                            RetrofitUtil.getPartFromString(ServiceGeneratorFace.API_SECRET),
                                            RetrofitUtil.getPartFromString(OUTER_ID),
                                            RetrofitUtil.getPartFromString(faceToken)
                                    );
                                    callAddFace.enqueue(new Callback<AddFaceResponse>() {
                                        @Override
                                        public void onResponse(Call<AddFaceResponse> call, Response<AddFaceResponse> response) {
                                            AddFaceResponse addFaceResponse = ResponseUtil.parseResponseFaceAddFace(response, getBaseContext());
                                            if (addFaceResponse != null) {
                                                if (addFaceResponse.getFaceAdded() > 0) {
                                                    /**
                                                     * Set User ID on FaceToken.
                                                     */
                                                    Call<SetUserIDResponse> callSetUserID = faceService.setUserID(
                                                            RetrofitUtil.getPartFromString(ServiceGeneratorFace.API_KEY),
                                                            RetrofitUtil.getPartFromString(ServiceGeneratorFace.API_SECRET),
                                                            RetrofitUtil.getPartFromString(faceToken),
                                                            RetrofitUtil.getPartFromString(customerID)
                                                    );
                                                    callSetUserID.enqueue(new Callback<SetUserIDResponse>() {
                                                        @Override
                                                        public void onResponse(Call<SetUserIDResponse> call, Response<SetUserIDResponse> response) {
                                                            SetUserIDResponse setUserIDResponse = ResponseUtil.parseResponseFaceSetUserID(response, getBaseContext());
                                                            if (setUserIDResponse != null) {
                                                                if (CommonUtil.equals(setUserIDResponse.getFaceToken(), faceToken)) {
                                                                    Toast.makeText(getBaseContext(), R.string.register_activity_success_register, Toast.LENGTH_SHORT).show();
                                                                }
                                                            }

                                                        }

                                                        @Override
                                                        public void onFailure(Call<SetUserIDResponse> call, Throwable t) {
                                                            Toast.makeText(getBaseContext(), R.string.error_network, Toast.LENGTH_SHORT).show();
                                                            Log.d(MyApplication.LOG_TAG, t.getMessage());
                                                        }
                                                    });
                                                }
                                            }

                                        }

                                        @Override
                                        public void onFailure(Call<AddFaceResponse> call, Throwable t) {
                                            Toast.makeText(getBaseContext(), R.string.error_network, Toast.LENGTH_SHORT).show();
                                            Log.d(MyApplication.LOG_TAG, t.getMessage());
                                        }
                                    });
                                }

                            }

                            @Override
                            public void onFailure(Call<DetectResponse> call, Throwable t) {
                                Toast.makeText(getBaseContext(), R.string.error_network, Toast.LENGTH_SHORT).show();
                                Log.d(MyApplication.LOG_TAG, t.getMessage());
                            }
                        });

                    }
                }
            }

            @Override
            public void onFailure(Call<JSONApiObject> call, Throwable t) {
                Toast.makeText(getBaseContext(), R.string.error_network, Toast.LENGTH_SHORT).show();
                System.out.println(t.getMessage());
            }
        });
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

