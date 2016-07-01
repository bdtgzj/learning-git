package cn.com.ehomeguru.adapter;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.bean.Device;
import cn.com.ehomeguru.view.DeviceFragment.OnListFragmentInteractionListener;

public class DeviceRecyclerViewAdapter extends RecyclerView.Adapter<DeviceRecyclerViewAdapter.ViewHolder> {

    private final List<Device> mListDevice;
    private final OnListFragmentInteractionListener mListener;

    public DeviceRecyclerViewAdapter(List<Device> listDevice, OnListFragmentInteractionListener listener) {
        mListDevice = listDevice;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_device, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mDevice = mListDevice.get(position);
        holder.mDeviceNameView.setText(mListDevice.get(position).getName());
        holder.mDeviceStatusView.setText(mListDevice.get(position).getStatus());

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != mListener) {
                    // Notify the active callbacks interface (the activity, if the
                    // fragment is attached to one) that an item has been selected.
                    mListener.onListFragmentInteraction(holder.mDevice);
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return mListDevice.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mDeviceNameView;
        public final TextView mDeviceStatusView;
        public Device mDevice;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mDeviceNameView = (TextView) view.findViewById(R.id.device_name);
            mDeviceStatusView = (TextView) view.findViewById(R.id.device_status);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + mDeviceNameView.getText() + "'";
        }
    }
}
