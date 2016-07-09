package cn.com.ehomeguru.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import java.util.List;

import cn.com.ehomeguru.bean.Region;
import cn.com.ehomeguru.view.DeviceFragment;
import cn.com.ehomeguru.view.SceneListFragment;

/**
 * Created by xiaodongyu on 6/21/2016 AD.
 */
public class SceneViewPagerAdapter extends FragmentStatePagerAdapter {

    private List<Region> regions;

    public SceneViewPagerAdapter(FragmentManager fm, List<Region> regions) {
        super(fm);
        this.regions = regions;
    }

    @Override
    public Fragment getItem(int position) {
        return SceneListFragment.newInstance(regions.get(position).getId());
    }

    @Override
    public int getCount() {
        return regions.size();
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return regions.get(position).getName();
    }
}
