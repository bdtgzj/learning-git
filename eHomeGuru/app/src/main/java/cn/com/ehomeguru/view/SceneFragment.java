package cn.com.ehomeguru.view;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.gustavofao.jsonapi.Models.JSONApiObject;
import com.gustavofao.jsonapi.Models.Resource;

import java.util.ArrayList;
import java.util.List;

import cn.com.ehomeguru.R;
import cn.com.ehomeguru.adapter.RegionViewPagerAdapter;
import cn.com.ehomeguru.adapter.SceneViewPagerAdapter;
import cn.com.ehomeguru.bean.Region;
import cn.com.ehomeguru.bean.User;
import cn.com.ehomeguru.model.GlobalData;
import cn.com.ehomeguru.service.RegionService;
import cn.com.ehomeguru.service.ServiceGenerator;
import cn.com.ehomeguru.util.ResponseUtil;
import retrofit2.Call;
import retrofit2.Callback;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link SceneFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link SceneFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class SceneFragment extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private OnFragmentInteractionListener mListener;

    //
    private TabLayout tabLayout;
    private ViewPager viewPager;
    private SceneViewPagerAdapter viewPagerAdapter;
    private List<Region> regions; // dataset for ViewPagerAdapter

    public SceneFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment RegionFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static SceneFragment newInstance(String param1, String param2) {
        SceneFragment fragment = new SceneFragment();
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
        View v = inflater.inflate(R.layout.fragment_scene, container, false);
        //
        tabLayout = (TabLayout) v.findViewById(R.id.tab_scene);
        viewPager = (ViewPager) v.findViewById(R.id.viewpager_scene);

        // set ViewPager's Adapter.
        regions = new ArrayList<Region>();
        viewPagerAdapter = new SceneViewPagerAdapter(getChildFragmentManager(), regions);
        viewPager.setAdapter(viewPagerAdapter);

        // set tab
        tabLayout.setTabTextColors(ContextCompat.getColorStateList(v.getContext(), R.color.tab_selector));
        tabLayout.setSelectedTabIndicatorColor(ContextCompat.getColor(v.getContext(), R.color.indicator));

        // TabLayout integrate with ViewPager.  on click on TabLayout
        tabLayout.setupWithViewPager(viewPager);

        // on slide on viewPager
        //viewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));


        // request for region data. set for tab name, set dataset for ViewPagerAdapater.
        User user = (User) GlobalData.getObjectForKey("user");
        RegionService regionService = ServiceGenerator.createService(RegionService.class, user.getName(), user.getPassword());
        Call<JSONApiObject> call = regionService.getRegion(user.getId());
        call.enqueue(new Callback<JSONApiObject>() {
            @Override
            public void onResponse(Call<JSONApiObject> call, retrofit2.Response<JSONApiObject> response) {
                List<Resource> resources = ResponseUtil.parseResponse(response, getContext());
                if (resources != null) {
                    for (Resource resource : resources) {
                        Region region = (Region) resource;
                        tabLayout.addTab(tabLayout.newTab().setText(region.getName()));
                        regions.add(region);
                    }
                    viewPagerAdapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(Call<JSONApiObject> call, Throwable t) {
                Toast.makeText(getContext(), R.string.error_network, Toast.LENGTH_SHORT).show();
                // System.out.println(t.getMessage());
            }
        });

        return v;
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
}
