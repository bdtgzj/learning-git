package cn.com.ehomeguru.adapter;

import android.graphics.drawable.Drawable;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.List;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.bean.Device;
import cn.com.ehomeguru.bean.Scene;
import cn.com.ehomeguru.util.ResourceUtil;
import cn.com.ehomeguru.view.DeviceFragment.OnListFragmentInteractionListener;
import cn.com.ehomeguru.view.SceneListFragment;

public class SceneRecyclerViewAdapter extends RecyclerView.Adapter<SceneRecyclerViewAdapter.ViewHolder> {

    private final List<Scene> mListScene;
    private final SceneListFragment.OnSceneListFragmentInteractionListener mListener;

    public SceneRecyclerViewAdapter(List<Scene> listScene, SceneListFragment.OnSceneListFragmentInteractionListener listener) {
        mListScene = listScene;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_scene_list_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mScene = mListScene.get(position);
        // icon
        Drawable drawable = ResourceUtil.getDrawableByIconColor(
                holder.mSceneIconView.getContext(),
                mListScene.get(position).getIcon(),
                mListScene.get(position).getColor()
        );
        holder.mSceneIconView.setImageDrawable(drawable);

        holder.mSceneNameView.setText(mListScene.get(position).getName());
        holder.mSceneStatusView.setText("yx");

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != mListener) {
                    // Notify the active callbacks interface (the activity, if the
                    // fragment is attached to one) that an item has been selected.
                    mListener.onSceneListFragmentInteraction(holder.mScene);
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return mListScene.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final ImageView mSceneIconView;
        public final TextView mSceneNameView;
        public final TextView mSceneStatusView;
        public Scene mScene;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mSceneIconView = (ImageView) view.findViewById(R.id.scene_icon);
            mSceneNameView = (TextView) view.findViewById(R.id.scene_name);
            mSceneStatusView = (TextView) view.findViewById(R.id.scene_status);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + mSceneNameView.getText() + "'";
        }
    }
}
