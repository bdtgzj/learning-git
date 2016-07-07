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
import cn.com.ehomeguru.bean.User;
import cn.com.ehomeguru.model.GlobalData;
import cn.com.ehomeguru.service.InstructionService;
import cn.com.ehomeguru.service.ServiceGenerator;
import cn.com.ehomeguru.util.ErrorUtil;
import retrofit2.Call;
import retrofit2.Callback;

/**
 * Created by xiaodongyu on 6/23/2016 AD.
 */
public class HomeRecyclerViewAdapter extends RecyclerView.Adapter<HomeRecyclerViewAdapter.ViewHolder> {

    private List<HomeCard> listHomeCard;

    public HomeRecyclerViewAdapter(List<HomeCard> listHomeCard) {
        this.listHomeCard = listHomeCard;
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
    public void onBindViewHolder(ViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        Context context = holder.mImageView.getContext();
        Resources resources = holder.mImageView.getResources();
        String packageName = holder.mImageView.getContext().getPackageName();
        Resources.Theme theme = context.getTheme();
        // get resource id according resource name
        int drawID = resources.getIdentifier(listHomeCard.get(position).getIcon(), "drawable", packageName);
        // get resource according resource id, and set color.
        Drawable drawable = ContextCompat.getDrawable(context, drawID);
        drawable.setColorFilter(Color.parseColor(listHomeCard.get(position).getColor()), PorterDuff.Mode.SRC_ATOP);
        // set ImageView
        holder.mImageView.setImageDrawable(drawable);

        // set TextView
        holder.mTextView.setText(listHomeCard.get(position).getText());

        // set CardView
        holder.mCardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // get instruction from server
                User user = (User) GlobalData.getObjectForKey("user");
                InstructionService instructionService = ServiceGenerator.createService(InstructionService.class, user.getName(), user.getPassword());
                Call<JSONApiObject> call = instructionService.setDeviceByInstruction(mInstruction);
                call.enqueue(new Callback<JSONApiObject>() {
                    @Override
                    public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                        // i.e. 200
                        if (response.isSuccessful()) {
                            JSONApiObject jsonApiObject = response.body();
                            if (jsonApiObject != null) {
                                if (jsonApiObject.hasErrors()) {
                                    List<ErrorModel> errorList = jsonApiObject.getErrors();
                                    Toast.makeText(getParent(), errorList.get(0).getDetail(), Toast.LENGTH_SHORT).show();
                                } else {
                                    if (jsonApiObject.getData().size() > 0) {
                                        List<Resource> resources = jsonApiObject.getData();
                                        Instruction instructionRet = (Instruction) resources.get(0);
                                        if (mInstruction.getInstruction() == instructionRet.getInstruction()) {
                                            mTextView.setText("东东");
                                        } else {
                                            mTextView.setText("西西");
                                        }
                                    } else {
                                        Toast.makeText(ControllerActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();
                                    }
                                }
                            } else {
                                Toast.makeText(ControllerActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();
                            }
                            // i.e. 500
                        } else {
                            HttpError httpError = ErrorUtil.parseError(response);
                            if (httpError != null && httpError.getErrors().size() > 0) {
                                Toast.makeText(ControllerActivity.this, httpError.getErrors().get(0).getDetail(), Toast.LENGTH_SHORT).show();
                            } else {
                                Toast.makeText(ControllerActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();
                            }
                        }
                        // restore data
                        mInstruction.setInstruction(originalData);
                    }

                    @Override
                    public void onFailure(Call<JSONApiObject> call, Throwable t) {
                        // there is more than just a failing request (like: no internet connection)
                        Toast.makeText(ControllerActivity.this, R.string.error_network, Toast.LENGTH_SHORT).show();

                        // restore data
                        mInstruction.setInstruction(originalData);
                        System.out.println(t.getMessage());
                    }
                });
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
