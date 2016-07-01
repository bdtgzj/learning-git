package cn.com.ehomeguru.view;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import cn.com.ehomeguru.R;

/**
 * A placeholder fragment containing a simple view.
 */
public class ControllerActivityFragment extends Fragment {

    public ControllerActivityFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_controller, container, false);
    }
}
