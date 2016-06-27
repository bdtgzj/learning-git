package cn.com.ehomeguru.adapter;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.VectorDrawable;
import android.os.Build;
import android.support.graphics.drawable.VectorDrawableCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.bean.HomeCard;

/**
 * Created by xiaodongyu on 6/23/2016 AD.
 */
public class HomeAdapter extends RecyclerView.Adapter<HomeAdapter.ViewHolder> {

    private List<HomeCard> listHomeCard;
    private Resources resources;
    private String packageName;

    public HomeAdapter(List<HomeCard> listHomeCard) {
        this.listHomeCard = listHomeCard;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public HomeAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        // create a new view
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.cardview_home, parent, false);
        // set the view's size, margins, paddings and layout parameters
        ViewHolder vh = new ViewHolder((CardView)v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        Context context = holder.mImageView.getContext();
        Resources resources = holder.mImageView.getResources();
        String packageName = holder.mImageView.getContext().getPackageName();
        Resources.Theme theme = context.getTheme();
        // get resource id according resource name
        int drawID = resources.getIdentifier(listHomeCard.get(position).getIcon(), "drawable", packageName);
        // get resource according resource, and set color.
        Drawable drawable = ContextCompat.getDrawable(context, drawID);
        drawable.setColorFilter(Color.parseColor(listHomeCard.get(position).getColor()), PorterDuff.Mode.SRC_ATOP);
        //
        holder.mImageView.setImageDrawable(drawable);
        holder.mTextView.setText(listHomeCard.get(position).getText());
        /*
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            VectorDrawable vectorDrawable = (VectorDrawable) drawable;
            vectorDrawable.setTint(Color.RED);
            //VectorDrawableCompat vectorDrawableCompat = VectorDrawableCompat.create(resources, drawID, theme);
            //vectorDrawableCompat.setTint(Color.RED);
        } else {
            BitmapDrawable bitmapDrawable = (BitmapDrawable) drawable;
        }
        */
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return listHomeCard.size();
    }

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        // each data item is just a string in this case
        public CardView mCardView;
        public ImageView mImageView;
        public TextView mTextView;

        public ViewHolder(CardView v) {
            super(v);
            v.setOnClickListener(this);
            mCardView = v;
            mImageView = (ImageView) v.findViewById(R.id.home_card_image);
            mTextView = (TextView) v.findViewById(R.id.home_card_text);
        }

        @Override
        public void onClick(View v) {
            Toast.makeText(v.getContext(), "Clicked Position = " + getAdapterPosition(), Toast.LENGTH_SHORT).show();
        }
    }

}