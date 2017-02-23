package com.nzxye.ai.view;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.EditorInfo;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.ErrorModel;
import com.gustavofao.jsonapi.Models.JSONApiObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.nzxye.ai.R;
import com.nzxye.ai.bean.User;
import com.nzxye.ai.model.GlobalData;
import com.nzxye.ai.model.UserHint;
import com.nzxye.ai.model.UserKey;
import com.nzxye.ai.service.ServiceGenerator;
import com.nzxye.ai.service.UserService;
import com.nzxye.ai.util.CommonUtil;
import com.nzxye.ai.util.ResourceUtil;
import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmResults;
import retrofit2.Call;

/**
 * A login screen that offers login via name/password.
 */
public class LoginActivity extends AppCompatActivity {

    /**
     * Keep track of the login task to ensure we can cancel it if requested.
     */
    private UserLoginTask mAuthTask = null;

    // UI references.
    private AutoCompleteTextView nameView;
    private EditText passwordView;
    private CheckBox rememberMeView;
    private View progressView;
    private View loginFormView;
    // Realm
    private Realm realm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Realm
        realm = CommonUtil.getRealm();

        // auto login
        UserKey userKey = realm.where(UserKey.class).findFirst();
        if (userKey != null) {
            // save to global data
            User user = new User(userKey.getName(), userKey.getKey());
            user.setId(userKey.getId());
            user.setFid(userKey.getFid());
            // for user info
            user.setNickName(userKey.getNickName());
            user.setEmail(userKey.getEmail());
            user.setMphone(userKey.getMphone());
            GlobalData.addObjectForKey("user", user);
            // open Activity
            Intent intent=new Intent(LoginActivity.this, MainActivity.class);
            //intent.putExtra("user", new Gson().toJson(user));
            startActivity(intent);
            finish();
            return;
        }

        // Set up the login form.
        // name
        nameView = (AutoCompleteTextView) findViewById(R.id.name);
        nameView.setCompoundDrawablesWithIntrinsicBounds(ResourceUtil.getDrawableByIconColor(this, "ic_login_name", "#c4934e"), null, null, null);
        nameView.setCompoundDrawablePadding((int)getResources().getDimension(R.dimen.activity_login_drawable_padding));
        populateAutoComplete();
        // add keyboard action button event listener
        nameView.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_NEXT) {
                    passwordView.requestFocus();
                    return true;
                }
                return false;
            }
        });

        // password
        passwordView = (EditText) findViewById(R.id.password);
        passwordView.setCompoundDrawablesWithIntrinsicBounds(ResourceUtil.getDrawableByIconColor(this, "ic_login_pass", "#c4934e"), null, null, null);
        passwordView.setCompoundDrawablePadding((int)getResources().getDimension(R.dimen.activity_login_drawable_padding));
        // add keyboard action button event listener
        passwordView.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView textView, int actionId, KeyEvent keyEvent) {
                // fullscreen mode: R.id.login; normal mode: IME_NULL
                if (actionId == R.id.login || actionId == EditorInfo.IME_NULL) {
                    attemptLogin();
                    return true;
                }
                return false;
            }
        });

        // remember me
        rememberMeView = (CheckBox) findViewById(R.id.remember_me);

        //rememberMeView.s
        //
        Button signInButton = (Button) findViewById(R.id.sign_in_button);
        signInButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin();
            }
        });

        loginFormView = findViewById(R.id.login_form);
        progressView = findViewById(R.id.login_progress);
    }

    private void populateAutoComplete() {
        // Starting a Loader, LoaderManager manages one or more Loader instances
        // this: A LoaderManager.LoaderCallbacks implementation
        // LoaderManager.LoaderCallbacks is a callback interface that lets a client interact with the LoaderManager
        // LoaderManager.LoaderCallbacks has three methods below.
        // getLoaderManager().initLoader(0, null, this);
        List<String> names = new ArrayList<>();
        RealmResults<UserHint> userHints = realm.where(UserHint.class).findAll();
        for (UserHint userHint : userHints) {
            names.add(userHint.getName());
        }
        addNamesToAutoComplete(names);
    }

    private void addNamesToAutoComplete(List<String> namesCollection) {
        //Create adapter to tell the AutoCompleteTextView what to show in its dropdown list.
        ArrayAdapter<String> adapter =
                new ArrayAdapter<>(LoginActivity.this,
                        android.R.layout.simple_dropdown_item_1line, namesCollection);

        nameView.setAdapter(adapter);
    }

    /**
     * Attempts to sign in or register the account specified by the login form.
     * If there are form errors (invalid name, missing fields, etc.), the
     * errors are presented and no actual login attempt is made.
     */
    public void attemptLogin() {
        if (mAuthTask != null) {
            return;
        }

        // Reset errors.
        nameView.setError(null);
        passwordView.setError(null);

        // Store values at the time of the login attempt.
        String name = nameView.getText().toString();
        String password = passwordView.getText().toString();

        boolean cancel = false;
        View focusView = null;


        // Check for a valid password, if the user entered one.
        if (TextUtils.isEmpty(password)) {
            passwordView.setError(getString(R.string.error_password_field_required));
            focusView = passwordView;
            cancel = true;
        } else if (!isPasswordValid(password)) {
            passwordView.setError(getString(R.string.error_invalid_password));
            focusView = passwordView;
            cancel = true;
        }

        // Check for a valid name.
        if (TextUtils.isEmpty(name)) {
            nameView.setError(getString(R.string.error_name_field_required));
            focusView = nameView;
            cancel = true;
        } else if (!isNameValid(name)) {
            nameView.setError(getString(R.string.error_invalid_name));
            focusView = nameView;
            cancel = true;
        }

        if (cancel) {
            // There was an error; don't attempt login and focus the first
            // form field with an error.
            focusView.requestFocus();
        } else {
            // Show a progress spinner, and kick off a background task to
            // perform the user login attempt.
            showProgress(true);
            mAuthTask = new UserLoginTask(name, password);
            mAuthTask.execute((Void) null);
        }
    }

    private boolean isNameValid(String name) {
        return name.length() >= 6;
    }

    private boolean isPasswordValid(String password) {
        return password.length() >= 6;
    }

    /**
     * Shows the progress UI and hides the login form.
     */
    @TargetApi(Build.VERSION_CODES.HONEYCOMB_MR2)
    private void showProgress(final boolean show) {
        // On Honeycomb MR2 we have the ViewPropertyAnimator APIs, which allow
        // for very easy animations. If available, use these APIs to fade-in
        // the progress spinner.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR2) {
            int shortAnimTime = getResources().getInteger(android.R.integer.config_shortAnimTime);

            loginFormView.setVisibility(show ? View.GONE : View.VISIBLE);
            loginFormView.animate().setDuration(shortAnimTime).alpha(
                    show ? 0 : 1).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    loginFormView.setVisibility(show ? View.GONE : View.VISIBLE);
                }
            });

            progressView.setVisibility(show ? View.VISIBLE : View.GONE);
            progressView.animate().setDuration(shortAnimTime).alpha(
                    show ? 1 : 0).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    progressView.setVisibility(show ? View.VISIBLE : View.GONE);
                }
            });
        } else {
            // The ViewPropertyAnimator APIs are not available, so simply show
            // and hide the relevant UI components.
            progressView.setVisibility(show ? View.VISIBLE : View.GONE);
            loginFormView.setVisibility(show ? View.GONE : View.VISIBLE);
        }
    }

    /**
     * Represents an asynchronous login/registration task used to authenticate
     * the user.
     */
    public class UserLoginTask extends AsyncTask<Void, Void, JSONApiObject> {

        private final String name;
        private final String password;

        UserLoginTask(String name, String password) {
            this.name = name;
            this.password = password;
        }

        @Override
        protected JSONApiObject doInBackground(Void... params) {
            // attempt authentication against a network service.
            User user = new User(name, password);
            UserService userService = ServiceGenerator.createService(UserService.class);
            Call<JSONApiObject> call = userService.signIn(user);
            try {
                JSONApiObject jsonApiObject = call.execute().body();
                return jsonApiObject;
            } catch (IOException e) {
                // network error.
                System.out.println(e);
                return null;
            }
        }

        @Override
        protected void onPostExecute(final JSONApiObject jsonApiObject) {
            mAuthTask = null;
            showProgress(false);

            if (jsonApiObject != null) {
                if (jsonApiObject.hasErrors()) {
                    List<ErrorModel> errorList = jsonApiObject.getErrors();
                    Toast.makeText(getApplicationContext(), errorList.get(0).getStatus(), Toast.LENGTH_LONG).show();
                } else {
                    if (jsonApiObject.getData().size() > 0) {
                        // add to realm
                        RealmResults<UserHint> userHints =  realm.where(UserHint.class).equalTo("name", name).findAll();
                        if (userHints.size() < 1) {
                            realm.executeTransaction(new Realm.Transaction() {
                                @Override
                                public void execute(Realm realm) {
                                    UserHint userHint = realm.createObject(UserHint.class);
                                    userHint.setName(name);

                                }
                            });
                        }
                        // init User
                        final User user = (User) jsonApiObject.getData(0);
                        user.setPassword(user.getKey() + "us"); // us: user ad: admin
                        // save to global data
                        GlobalData.addObjectForKey("user", user);
                        // remember me
                        if (rememberMeView.isChecked()) {
                            // RealmResults<UserKey> userKeys =  realm.where(UserKey.class).equalTo("name", name).findAll();
                            // if (userKeys.size() < 1) {}
                            CommonUtil.updateRememberMe(getBaseContext(), user);
                        }
                        // open MainActivity
                        Intent intent=new Intent(LoginActivity.this, LoadingActivity.class);
                        //intent.putExtra("user", new Gson().toJson(user));
                        startActivity(intent);
                        finish();
                    } else {
                        //passwordView.setError(getString(R.string.error_incorrect_password));
                        //passwordView.requestFocus();
                        Toast.makeText(getApplicationContext(), R.string.error_user_nonexistent, Toast.LENGTH_SHORT).show();
                    }
                }
            } else {
                Toast.makeText(getApplicationContext(), R.string.error_network, Toast.LENGTH_LONG).show();
            }
        }

        @Override
        protected void onCancelled() {
            mAuthTask = null;
            showProgress(false);
        }
    }
}

