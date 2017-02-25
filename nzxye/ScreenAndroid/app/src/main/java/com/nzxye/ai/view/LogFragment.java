package com.nzxye.ai.view;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.nzxye.ai.R;
import com.nzxye.ai.adapter.LogRecyclerViewAdapter;
import com.nzxye.ai.bean.Log;
import com.nzxye.ai.bean.User;
import com.nzxye.ai.model.GlobalData;
import com.nzxye.ai.service.LogService;
import com.nzxye.ai.service.ServiceGenerator;
import com.nzxye.ai.util.ResponseUtil;
import retrofit2.Call;
import retrofit2.Callback;

/**
 * A fragment representing a list of Items.
 */
public class LogFragment extends Fragment {

    private static final String ARG_CATEGORY_ID = "category-id";
    private int mCategoryId;
    private int mColumnCount = 1;
    private LogRecyclerViewAdapter mLogRecyclerViewAdapter;
    private List<Log> mListLog;
    private static final int PAGE_SIZE = 100;
    private static final int PAGE_SORT = -1;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public LogFragment() {
    }

    public static LogFragment newInstance(int categoryId) {
        LogFragment fragment = new LogFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_CATEGORY_ID, categoryId);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mCategoryId = getArguments().getInt(ARG_CATEGORY_ID);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_log, container, false);
        // set title
        switch(mCategoryId) {
            case 1:
                getActivity().setTitle(getString(R.string.fragment_navigationdrawer_log_login));
                break;
            case 2:
                getActivity().setTitle(getString(R.string.fragment_navigationdrawer_log_operation));
                break;
        }

        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            // Divider between Items in RecyclerView.
            // recyclerView.addItemDecoration(new DividerItemDecoration(getContext(), R.drawable.shape_divider));

            // set Adapter
            mListLog = new ArrayList<Log>();
            mLogRecyclerViewAdapter = new LogRecyclerViewAdapter(mListLog);
            recyclerView.setAdapter(mLogRecyclerViewAdapter);

            // request for log data. set dataset for RecyclerViewAdapater.
            User user = (User) GlobalData.getObjectForKey("user");
            LogService logService = ServiceGenerator.createService(LogService.class, user.getName(), user.getPassword());
            Call<JSONApiObject> call = logService.getLog(user.getId(), mCategoryId, PAGE_SIZE, PAGE_SORT);
            call.enqueue(new Callback<JSONApiObject>() {
                @Override
                public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                    List<Resource> resources = ResponseUtil.parseResponse(response, getContext());
                    if (resources != null) {
                        DateFormat dateParser = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                        DateFormat dateFormater = new SimpleDateFormat("yy-MM-dd HH:mm:ss");
                        for (Resource resource : resources) {
                            Log log = (Log) resource;
                            // date translate
                            try {
                                Date date = dateParser.parse(log.getCreated());
                                log.setCreated(dateFormater.format(date));
                            } catch(ParseException e) {
                                System.out.println(e);
                            }
                            mListLog.add(log);

                        }
                        mLogRecyclerViewAdapter.notifyDataSetChanged();
                    }
                }

                @Override
                public void onFailure(Call<JSONApiObject> call, Throwable t) {
                    Toast.makeText(getContext(), R.string.error_network, Toast.LENGTH_SHORT).show();
                    System.out.println(t.getMessage());
                }
            });
        }
        return view;
    }

}
