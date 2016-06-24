package cn.com.ehomeguru.view;

import android.content.Context;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;
import java.util.List;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.adapter.HomeAdapter;
import cn.com.ehomeguru.bean.HomeCard;
import cn.com.ehomeguru.bean.Answer;
import cn.com.ehomeguru.service.HomeCardService;
import cn.com.ehomeguru.service.ServiceGenerator;
import okhttp3.Response;
import retrofit2.Call;
import retrofit2.Callback;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link HomeFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link HomeFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class HomeFragment extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private OnFragmentInteractionListener mListener;

    //
    private RecyclerView mRecyclerView;
    private RecyclerView.LayoutManager mLayoutManager;
    private RecyclerView.Adapter mAdapter;

    public HomeFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment HomeFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static HomeFragment newInstance(String param1, String param2) {
        HomeFragment fragment = new HomeFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_home, container, false);
        // init RecyclerView
        mRecyclerView = (RecyclerView) v.findViewById(R.id.recycler_view_home);
        //
        SpacesItemDecoration spacesItemDecoration = new SpacesItemDecoration(16);
        mRecyclerView.addItemDecoration(spacesItemDecoration);
        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView
        // mRecyclerView.setHasFixedSize(true);
        // use a linear layout manager
        //mLayoutManager = new LinearLayoutManager(getContext());
        mLayoutManager = new StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL);
        mRecyclerView.setLayoutManager(mLayoutManager);
        // request for HomeCard data.
        HomeCardService homeCardService = ServiceGenerator.createService(HomeCardService.class, null, null);
        Call<Answer> call = homeCardService.getHomeCard();
        call.enqueue(new Callback<Answer>() {
            @Override
            public void onResponse(Call<Answer> call, retrofit2.Response<Answer> response) {
                if (response.isSuccessful()) {

                } else {

                }
                // get raw response
                //Response raw = response.raw();
            }

            @Override
            public void onFailure(Call<Answer> call, Throwable t) {
                System.out.println(t.getMessage());
            }
        });
        List<HomeCard> listHomeCard = new ArrayList<HomeCard>();
        listHomeCard.add(new HomeCard("ic_menu_home", "#FF0000", "Home", 1));
        listHomeCard.add(new HomeCard("ic_menu_region", "#00FF00", "Region", 2));
        listHomeCard.add(new HomeCard("ic_menu_scene", "#0000FF", "Secne", 3));
        // specify an adapter
        mAdapter = new HomeAdapter(listHomeCard);
        mRecyclerView.setAdapter(mAdapter);

        return v;

    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
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
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }

    // set spacing between items in RecyclerView.
    public static class SpacesItemDecoration extends RecyclerView.ItemDecoration {

        private final int mSpace;

        public SpacesItemDecoration(int space) {
            this.mSpace = space;
        }

        @Override
        public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
            super.getItemOffsets(outRect, view, parent, state);
            outRect.left = mSpace;
            outRect.right = mSpace;
            outRect.bottom = mSpace;
            // Add top margin only for the first item to avoid double space between items
            if (parent.getChildAdapterPosition(view) == 0 || parent.getChildAdapterPosition(view) == 1) {
                outRect.top = mSpace;
            }
        }
    }

}
