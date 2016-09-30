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
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.ErrorModel;
import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;

import java.util.ArrayList;
import java.util.List;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.adapter.HomeRecyclerViewAdapter;
import cn.com.ehomeguru.bean.HomeCard;
import cn.com.ehomeguru.bean.HttpError;
import cn.com.ehomeguru.bean.Scene;
import cn.com.ehomeguru.bean.User;
import cn.com.ehomeguru.model.GlobalData;
import cn.com.ehomeguru.service.HomeCardService;
import cn.com.ehomeguru.service.SceneService;
import cn.com.ehomeguru.service.ServiceGenerator;
import cn.com.ehomeguru.util.CommonUtil;
import cn.com.ehomeguru.util.ErrorUtil;
import cn.com.ehomeguru.util.ResponseUtil;
import retrofit2.Call;
import retrofit2.Callback;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link HomeFragment.OnHomeFragmentInteractionListener} interface
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

    private OnHomeFragmentInteractionListener mListener;

    //
    private RecyclerView mRecyclerView;
    private RecyclerView.LayoutManager mLayoutManager;
    private RecyclerView.Adapter mAdapter;
    private List<HomeCard> mListHomeCard;

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
        // spacings between Items.
        SpacesItemDecoration spacesItemDecoration = new SpacesItemDecoration(16);
        mRecyclerView.addItemDecoration(spacesItemDecoration);
        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView
        // mRecyclerView.setHasFixedSize(true);

        // use a layout manager
        //mLayoutManager = new LinearLayoutManager(getContext());
        mLayoutManager = new StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL);
        // mLayoutManager.generateLayoutParams(new StaggeredGridLayoutManager.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        mRecyclerView.setLayoutManager(mLayoutManager);

        // data for adapter
        mListHomeCard = new ArrayList<>();

        // specify an adapter
        mAdapter = new HomeRecyclerViewAdapter(mListHomeCard, mListener);
        mRecyclerView.setAdapter(mAdapter);

        // request for HomeCard data.
        User user = (User) GlobalData.getObjectForKey("user");
        HomeCardService homeCardService = ServiceGenerator.createService(HomeCardService.class, user.getName(), user.getPassword());
        Call<JSONApiObject> call = homeCardService.getHomeCard(user.getId());
        call.enqueue(new Callback<JSONApiObject>() {
            @Override
            public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                List<Resource> resources = ResponseUtil.parseResponse(response, getContext());
                if (resources != null) {
                    for (Resource resource : resources) {
                        mListHomeCard.add((HomeCard) resource);
                    }
                    // init ui
                    mAdapter.notifyDataSetChanged();
                    // refresh ui
                    getSceneStateRefreshUI();
                }
            }

            @Override
            public void onFailure(Call<JSONApiObject> call, Throwable t) {
                Toast.makeText(getActivity(), R.string.error_network, Toast.LENGTH_SHORT).show();
                System.out.println(t.getMessage());
            }
        });

        return v;

    }

    // get scene state and refresh ui
    public void getSceneStateRefreshUI() {
        User user = (User) GlobalData.getObjectForKey("user");
        final Scene scene = new Scene();
        scene.setUid(Integer.parseInt(user.getId()));
        scene.setFid(user.getFid());
        // read status
        scene.setAction(2);
        //
        SceneService sceneService = ServiceGenerator.createService(SceneService.class, user.getName(), user.getPassword());
        for (final HomeCard homeCardOriginal : mListHomeCard) {
            if (homeCardOriginal.getSceneId() == null || homeCardOriginal.getSceneId() == "") {
                continue;
            }
            scene.setId(homeCardOriginal.getSceneId());
            scene.setName(homeCardOriginal.getName());
            scene.setRegionName("");
            Call<JSONApiObject> call = sceneService.execScene(scene);
            call.enqueue(new Callback<JSONApiObject>() {
                @Override
                public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                    List<Resource> resources = ResponseUtil.parseResponse(response, getContext());
                    if (resources != null) {
                        Scene sceneRet = (Scene) resources.get(0);
                        if (CommonUtil.equals(sceneRet.getId(), scene.getId())) {
                            homeCardOriginal.setStatus(sceneRet.getStatus());
                            //Toast.makeText(getContext(), R.string.toast_scene_exec_yes, Toast.LENGTH_SHORT).show();
                        } else {
                            //Toast.makeText(getContext(), R.string.toast_scene_exec_no, Toast.LENGTH_SHORT).show();
                        }
                        // refresh ui
                        // recyclerView.setAdapter(mSceneRecyclerViewAdapter);
                        mAdapter.notifyDataSetChanged();
                    }
                }

                @Override
                public void onFailure(Call<JSONApiObject> call, Throwable t) {
                    Toast.makeText(getContext(), R.string.error_network, Toast.LENGTH_SHORT).show();
                    // System.out.println(t.getMessage());
                }
            });
        }

    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnHomeFragmentInteractionListener) {
            mListener = (OnHomeFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnHomeFragmentInteractionListener");
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
    public interface OnHomeFragmentInteractionListener {
        // TODO: Update argument type and name
        void onHomeFragmentInteraction(HomeCard homeCard);
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
