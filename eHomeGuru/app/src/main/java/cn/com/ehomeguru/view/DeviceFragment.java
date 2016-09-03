package cn.com.ehomeguru.view;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.ErrorModel;
import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;

import java.util.ArrayList;
import java.util.List;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.adapter.DeviceRecyclerViewAdapter;
import cn.com.ehomeguru.bean.Device;
import cn.com.ehomeguru.bean.User;
import cn.com.ehomeguru.model.GlobalData;
import cn.com.ehomeguru.service.DeviceService;
import cn.com.ehomeguru.service.ServiceGenerator;
import cn.com.ehomeguru.util.DividerItemDecoration;
import cn.com.ehomeguru.util.ResponseUtil;
import retrofit2.Call;
import retrofit2.Callback;

/**
 * A fragment representing a list of Items.
 * <p/>
 * Activities containing this fragment MUST implement the {@link OnListFragmentInteractionListener}
 * interface.
 */
public class DeviceFragment extends Fragment {

    private static final String ARG_REGION_ID = "region-id";
    private String regionId;
    private int mColumnCount = 1;
    private OnListFragmentInteractionListener mListener;
    private DeviceRecyclerViewAdapter mDeviceRecyclerViewAdapter;
    private List<Device> mListDevice;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public DeviceFragment() {
    }

    @SuppressWarnings("unused")
    public static DeviceFragment newInstance(String regionId) {
        DeviceFragment fragment = new DeviceFragment();
        Bundle args = new Bundle();
        args.putString(ARG_REGION_ID, regionId);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            regionId = getArguments().getString(ARG_REGION_ID);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_device_list, container, false);

        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            // Divider between Items in RecyclerView.
            recyclerView.addItemDecoration(new DividerItemDecoration(getContext(), R.drawable.shape_divider));

            // set Adapter
            mListDevice = new ArrayList<Device>();
            mDeviceRecyclerViewAdapter = new DeviceRecyclerViewAdapter(mListDevice, mListener);
            recyclerView.setAdapter(mDeviceRecyclerViewAdapter);

            // request for device data. set dataset for RecyclerViewAdapater.
            User user = (User) GlobalData.getObjectForKey("user");
            DeviceService deviceService = ServiceGenerator.createService(DeviceService.class, user.getName(), user.getPassword());
            Call<JSONApiObject> call = deviceService.getDeviceByRegion(user.getId(), regionId);
            call.enqueue(new Callback<JSONApiObject>() {
                @Override
                public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                    List<Resource> resources = ResponseUtil.parseResponse(response, getContext());
                    if (resources != null) {
                        for (Resource resource : resources) {
                            Device device = (Device) resource;
                            mListDevice.add(device);
                        }
                        mDeviceRecyclerViewAdapter.notifyDataSetChanged();
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


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnListFragmentInteractionListener) {
            mListener = (OnListFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnListFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p/>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnListFragmentInteractionListener {
        // TODO: Update argument type and name
        void onListFragmentInteraction(Device device);
    }

}
