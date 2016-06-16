package cn.com.ehomeguru;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.annotation.NonNull;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.app.LoaderManager.LoaderCallbacks;

import android.content.CursorLoader;
import android.content.Loader;
import android.database.Cursor;
import android.net.Uri;
import android.os.AsyncTask;

import android.os.Build;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.EditorInfo;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import cn.com.ehomeguru.bean.Response;
import cn.com.ehomeguru.bean.User;
import cn.com.ehomeguru.model.UserHint;
import cn.com.ehomeguru.service.ServiceGenerator;
import cn.com.ehomeguru.service.UserService;
import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmResults;
import retrofit2.Call;

import static android.Manifest.permission.READ_CONTACTS;

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
    private View progressView;
    private View loginFormView;
    // realm
    private Realm realm;
    private RealmConfiguration realmConfiguration;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        // init realm
        realmConfiguration = new RealmConfiguration.Builder(this).build();
        realm = Realm.getInstance(realmConfiguration);
        // Set up the login form.
        nameView = (AutoCompleteTextView) findViewById(R.id.name);
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
        //
        passwordView = (EditText) findViewById(R.id.password);
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
    private void attemptLogin() {
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
        if (!TextUtils.isEmpty(password) && !isPasswordValid(password)) {
            passwordView.setError(getString(R.string.error_invalid_password));
            focusView = passwordView;
            cancel = true;
        }

        // Check for a valid name.
        if (TextUtils.isEmpty(name)) {
            nameView.setError(getString(R.string.error_field_required));
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
        return name.length() > 4;
    }

    private boolean isPasswordValid(String password) {
        return password.length() > 4;
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
    public class UserLoginTask extends AsyncTask<Void, Void, Boolean> {

        private final String name;
        private final String password;

        UserLoginTask(String name, String password) {
            this.name = name;
            this.password = password;
        }

        @Override
        protected Boolean doInBackground(Void... params) {
            // attempt authentication against a network service.
            User user = new User(name, password);
            UserService userService = ServiceGenerator.createService(UserService.class);
            Call<Response> call = userService.signIn(user);
            Response res;
            try {
                res = call.execute().body();
                System.out.println(res);
                System.out.println(res.isValid());
                System.out.println(res.getDesc());
                System.out.println(res.getData());
            } catch (IOException e) {
                System.out.println(e);
                return false;
            }

            if (res.isValid()) {
                return true;
            } else {
                return false;
            }

        }

        @Override
        protected void onPostExecute(final Boolean success) {
            mAuthTask = null;
            showProgress(false);

            if (success) {
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
                // open MainActivity
                Intent i=new Intent(LoginActivity.this, MainActivity.class);
                startActivity(i);
                finish();
            } else {
                passwordView.setError(getString(R.string.error_incorrect_password));
                passwordView.requestFocus();
            }
        }

        @Override
        protected void onCancelled() {
            mAuthTask = null;
            showProgress(false);
        }
    }
}

