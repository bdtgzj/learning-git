package cn.com.ehomeguru;

import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.NavigationView;
import android.support.design.widget.Snackbar;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Array;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener, SettingFragment.OnFragmentInteractionListener,
                    HomeFragment.OnFragmentInteractionListener {

    // Fragment

    // socket
    public Socket socket;
    private String serverIP = "151070wv41.iok.la"; // 192.168.8.200 222.191.203.159 151070wv41.iok.la
    private int serverPort = 502;

    // used to update UI
    Handler uiThreadHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        // Navigation Menu
        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        // Add Default Fragment
        if (findViewById(R.id.fragment_container) != null) {
            if (savedInstanceState != null) {
                return;
            }

            // Create a new Fragment to be placed in the activity framelayout layout
            HomeFragment homeFragment = new HomeFragment();
            homeFragment.setArguments(getIntent().getExtras());

            // Add the fragment to the 'fragment_container' FrameLayout
            getSupportFragmentManager().beginTransaction()
                    .add(R.id.fragment_container, homeFragment, getResources().getString(R.string.fragment_home))
                    .commit();
        }

        // init ui handler
        uiThreadHandler = new Handler();

        // request socket
        new Thread(new SendSocketThread()).start();
        // check socket state
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                //tells activity to run on ui thread
                MainActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (socket != null && socket.isConnected()) {
                            //((TextView)getActivity().findViewById(R.id.textViewLog)).setText("Connection is OK.");
                            Toast.makeText(MainActivity.this, "连接成功", Toast.LENGTH_SHORT).show();
                        } else {
                            Toast.makeText(MainActivity.this, "网络连接超时!", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        }, 3000);
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_home) {
            HomeFragment homeFragment = (HomeFragment) getSupportFragmentManager().findFragmentByTag(getResources().getString(R.string.fragment_home));
            FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
            if (null == homeFragment) {
                homeFragment = new HomeFragment();
                // 根据Fragment的生命周期, 会把被替换的Fragment添加到BackStack堆栈
                // 1. 堆栈计数值会加1 `getSupportFragmentManager().getBackStackEntryCount()`
                // 2. Fragment会被添加到Fragment堆栈 `getSupportFragmentManager().getFragments()`
                ft.addToBackStack(null);
            }
            ft.replace(R.id.fragment_container, homeFragment, getResources().getString(R.string.fragment_home));
            ft.commit();
        } else if (id == R.id.nav_scene) {

        } else if (id == R.id.nav_region) {

        } else if (id == R.id.nav_device) {

        } else if (id == R.id.nav_setting) {
            SettingFragment settingFragment = (SettingFragment) getSupportFragmentManager().findFragmentByTag(getResources().getString(R.string.fragment_setting));
            FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
            if (null == settingFragment) {
                settingFragment = new SettingFragment();
                ft.addToBackStack(null);
            }
            ft.replace(R.id.fragment_container, settingFragment, getResources().getString(R.string.fragment_setting));
            ft.commit();
        } else if (id == R.id.nav_share) {

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    // HomeFragment
    @Override
    public void onFragmentInteraction(Boolean bool) {
        //Toast.makeText(MainActivity.this, "hh", Toast.LENGTH_SHORT).show();
        byte[] getcoil0 = {0, 0, 0, 0, 0, 6, 1, 1, 72, 0, 0, 6};
        byte[] setCoil0Open = {0, 0, 0, 0, 0, 6, 1, 5, 72, 0, -1, 0};
        byte[] setCoil0Close = {0, 0, 0, 0, 0, 6, 1, 5, 72, 0, 0, 0};

        try {
            OutputStream out = socket.getOutputStream();
            //PrintWriter out = new PrintWriter(new BufferedWriter(new OutputStreamWriter(socket.getOutputStream())), true);
            if (bool) {
                out.write(setCoil0Open);
            } else {
                out.write(setCoil0Close);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    // SettingFragment
    @Override
    public void onFragmentInteraction(Uri uri) {

    }

    // send socket thread, keep-alive, 因为会阻塞UI线程, 所以新建线程来建立连接
    class SendSocketThread implements Runnable {
        @Override
        public void run() {
            try {
                InetAddress serverAddr = InetAddress.getByName(serverIP);
                socket = new Socket(serverAddr, serverPort);
            } catch (UnknownHostException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }

            if (!Thread.currentThread().isInterrupted()) {
                new Thread(new ReceiveSocketThread()).start();
            }
        }
    }

    // receive socket thread
    class ReceiveSocketThread implements Runnable {

        private byte[] data = new byte[1024];
        private int dataLen = 0;

        @Override
        public void run() {
            try {
                InputStream in = socket.getInputStream();
                while ((dataLen = in.read(data)) != -1) {
                    //System.out.println(data.toString());
                    uiThreadHandler.post(new UpdateUIThread(Arrays.copyOfRange(data, 0, dataLen)));
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    // update ui thread
    class UpdateUIThread implements Runnable {

        private byte data[];

        public UpdateUIThread(byte data[]) {
            this.data = data;
        }

        @Override
        public void run() {
            System.out.printf("%s\n", byteToHex(data));
            HomeFragment homeFragment = (HomeFragment)getSupportFragmentManager().findFragmentByTag(getResources().getString(R.string.fragment_home));
            homeFragment.setState();
        }
    }

    public static String byteToHex(final byte[] hash) {
        java.util.Formatter formatter = new java.util.Formatter();
        for (byte b : hash) {
            formatter.format("%02x", b);
        }
        String result = formatter.toString();
        formatter.close();
        return result;
    }

}
