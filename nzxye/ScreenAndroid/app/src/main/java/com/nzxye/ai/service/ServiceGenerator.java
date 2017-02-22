package com.nzxye.ai.service;

import android.app.Application;
import android.content.Context;
import android.util.Base64;

import com.gustavofao.jsonapi.Retrofit.JSONConverterFactory;

import java.io.IOException;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.SecureRandom;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManagerFactory;

import com.nzxye.ai.R;

import com.nzxye.ai.bean.User;
import com.nzxye.ai.util.MyApplication;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by xiaodongyu on 6/13/2016 AD.
 */
public class ServiceGenerator {

    public static final String API_BASE_URL = "https://api.ehomeguru.com.cn:9000";
    //public static final String API_BASE_URL = "http://192.168.1.46:9000";
    //public static final String API_BASE_URL = "http://192.168.8.46:3000";
    //public static final String API_BASE_URL = "http://151070wv41.iok.la:9000";

    private static OkHttpClient.Builder httpClient = new OkHttpClient.Builder();

    private static Retrofit.Builder builder = new Retrofit.Builder()
            .baseUrl(API_BASE_URL)
            //.addConverterFactory(GsonConverterFactory.create());
            .addConverterFactory(JSONConverterFactory.create(User.class));

    public static <S> S createService(Class<S> serviceClass) {
        return createService(serviceClass, null, null);
    }

    public static <S> S createService(Class<S> serviceClass, String name, String password) {
        // add basic authentication header fields to OkHttpClient.
        if (name != null && password != null) {
            String credentials = name + ":" + password;
            final String basic = "Basic " + Base64.encodeToString(credentials.getBytes(), Base64.NO_WRAP);

            httpClient.addInterceptor(new Interceptor() {
                @Override
                public Response intercept(Chain chain) throws IOException {
                    Request original = chain.request();

                    Request.Builder requestBuilder = original.newBuilder()
                            .header("Authorization", basic)
                            .header("Accept", "application/json")
                            .method(original.method(), original.body());
                    Request request = requestBuilder.build();
                    return chain.proceed(request);
                }
            });

        }

        // add https to OKHttpClient for unkonw or self-signed certificates.
        /*
        int[] certificates = new int[]{ R.raw.ehomeguru };
        httpClient.sslSocketFactory(getSSLSocketFactory(MyApplication.getAppContext(), certificates));
        String hosts[] = {"api.ehomeguru.com.cn"};
        httpClient.hostnameVerifier(getHostnameVerifier(hosts));
        */

        OkHttpClient client = httpClient.build();
        Retrofit retrofit = builder.client(client).build();
        return retrofit.create(serviceClass);
    }

    // produce a retrofit for convert http json body of http error(i.e. 500)
    public static Retrofit createRetrofit() {
        Retrofit.Builder builder = new Retrofit.Builder()
                .baseUrl(API_BASE_URL)
                .addConverterFactory(GsonConverterFactory.create());
        Retrofit retrofit = builder.build();
        return retrofit;
    }

    // Customize TrustManager for HTTPS
    protected static SSLSocketFactory getSSLSocketFactory(Context context, int[] certificates) {
        if (context == null) {
            throw new NullPointerException("context == null");
        }

        // CertificateFactory is used for generate certificate.
        CertificateFactory certificateFactory;
        try {
            certificateFactory = CertificateFactory.getInstance("X.509");

            //Create a KeyStore containing our trusted CAs
            KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
            keyStore.load(null, "bdtgzj".toCharArray());

            // Read certificate from raw/, and set to keystore
            for (int i = 0; i < certificates.length; i++) {
                InputStream inputStream = context.getResources().openRawResource(certificates[i]);
                // generate certificate
                Certificate certificate = certificateFactory.generateCertificate(inputStream);
                //System.out.println("CA=" + ((X509Certificate) certificate).getSubjectDN());
                keyStore.setCertificateEntry(String.valueOf(i), certificate);
                if (inputStream != null) {
                    inputStream.close();
                }
            }

            // Create a TrustManager that trusts the CAs in our keyStore
            TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            trustManagerFactory.init(keyStore);

            // Create an SSLContext that uses our TrustManager
            SSLContext sslContext = SSLContext.getInstance("TLS"); // use TLS 1.0 protocol
            sslContext.init(null, trustManagerFactory.getTrustManagers(), new SecureRandom());
            //
            //SSLSocketFactory noSSLv3SocketFactory = new NoSSLv3SocketFactory(sslContext.getSocketFactory());

            //return noSSLv3SocketFactory;
            return sslContext.getSocketFactory();

        } catch (Exception e) {
            System.out.println(e);
        }

        return null;
    }

    // Customize TrustManager for HTTPS
    protected static HostnameVerifier getHostnameVerifier(final String[] hosts) {
        HostnameVerifier TRUSTED_VERIFIER = new HostnameVerifier() {
            @Override
            public boolean verify(String hostname, SSLSession session) {
                boolean ret = false;
                for (String host : hosts) {
                    if (host.equalsIgnoreCase(hostname)) {
                        ret = true;
                    }
                }
                return ret;
            }
        };

        return TRUSTED_VERIFIER;
    }

}
