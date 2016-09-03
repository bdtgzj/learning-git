package cn.com.ehomeguru.adapter;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.ErrorModel;
import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;

import java.util.List;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.bean.HomeCard;
import cn.com.ehomeguru.bean.HttpError;
import cn.com.ehomeguru.bean.Instruction;
import cn.com.ehomeguru.bean.Region;
import cn.com.ehomeguru.bean.User;
import cn.com.ehomeguru.model.GlobalData;
import cn.com.ehomeguru.service.DeviceService;
import cn.com.ehomeguru.service.InstructionService;
import cn.com.ehomeguru.service.RegionService;
import cn.com.ehomeguru.service.ServiceGenerator;
import cn.com.ehomeguru.util.ErrorUtil;
import cn.com.ehomeguru.util.ResourceUtil;
import cn.com.ehomeguru.util.ResponseUtil;
import cn.com.ehomeguru.view.HomeFragment;
import retrofit2.Call;
import retrofit2.Callback;

/**
 * Created by xiaodongyu on 6/23/2016 AD.
 */
public class HomeRecyclerViewAdapter extends RecyclerView.Adapter<HomeRecyclerViewAdapter.ViewHolder> {

    private List<HomeCard> listHomeCard;
    private HomeFragment.OnHomeFragmentInteractionListener mListener;

    public HomeRecyclerViewAdapter(List<HomeCard> listHomeCard, HomeFragment.OnHomeFragmentInteractionListener mListener) {
        this.listHomeCard = listHomeCard;
        this.mListener = mListener;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public HomeRecyclerViewAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        // create a new view
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.cardview_home, parent, false);
        // set the view's size, margins, paddings and layout parameters
        ViewHolder vh = new ViewHolder((CardView)v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ViewHolder holder, final int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        // set ImageView
        Drawable drawable = ResourceUtil.getDrawableByIconColor(
                holder.mImageView.getContext(),
                listHomeCard.get(position).getIcon(),
                listHomeCard.get(position).getColor()
        );
        holder.mImageView.setImageDrawable(drawable);

        // set TextView
        String strName = listHomeCard.get(position).getName();
        if (strName.length() > 8) strName = strName.substring(0, 7).concat("..");
        holder.mTextView.setText(strName);

        // set CardView
        holder.mCardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mListener.onHomeFragmentInteraction(listHomeCard.get(position));
            }
        });
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return listHomeCard.size();
    }

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public CardView mCardView;
        public ImageView mImageView;
        public TextView mTextView;

        public ViewHolder(CardView v) {
            super(v);
            mCardView = v;
            mImageView = (ImageView) v.findViewById(R.id.home_card_image);
            mTextView = (TextView) v.findViewById(R.id.home_card_text);
        }
    }

}
