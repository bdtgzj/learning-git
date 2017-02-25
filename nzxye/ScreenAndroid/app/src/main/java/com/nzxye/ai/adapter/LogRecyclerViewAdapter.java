package com.nzxye.ai.adapter;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import com.nzxye.ai.R;
import com.nzxye.ai.bean.Log;

public class LogRecyclerViewAdapter extends RecyclerView.Adapter<LogRecyclerViewAdapter.ViewHolder> {

    private final List<Log> mListLog;

    public LogRecyclerViewAdapter(List<Log> listLog) {
        mListLog = listLog;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_log_list_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mLog = mListLog.get(position);

        holder.mLogLogView.setText(mListLog.get(position).getLog());
        holder.mLogCreatedView.setText(mListLog.get(position).getCreated());
    }

    @Override
    public int getItemCount() {
        return mListLog.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mLogLogView;
        public final TextView mLogCreatedView;
        public Log mLog;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mLogLogView = (TextView) view.findViewById(R.id.log_log);
            mLogCreatedView = (TextView) view.findViewById(R.id.log_created);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + mLogLogView.getText() + "'";
        }
    }
}
