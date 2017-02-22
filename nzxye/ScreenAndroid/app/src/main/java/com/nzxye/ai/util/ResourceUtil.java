package com.nzxye.ai.util;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.res.ResourcesCompat;
import android.util.DisplayMetrics;

import com.nzxye.ai.R;

/**
 * Created by xiaodongyu on 7/9/2016 AD.
 */
public class ResourceUtil {

    public static Drawable getDrawableByIconColor(Context context, String icon, String color) {
        Resources resources = context.getResources();
        String packageName = context.getPackageName();
        // Resources.Theme theme = context.getTheme();
        // get resource id according resource name
        int drawID = resources.getIdentifier(icon, "drawable", packageName);
        // get resource according resource id, and set color.
        Drawable drawable = ContextCompat.getDrawable(context, drawID);
        drawable.setColorFilter(Color.parseColor(color), PorterDuff.Mode.SRC_ATOP);
        return drawable;
    }

    public static Drawable getDrawableByIconColorDensity(Context context, String icon, String color, int density) {
        Resources resources = context.getResources();
        String packageName = context.getPackageName();
        int drawID = resources.getIdentifier(icon, "mipmap", packageName);
        Drawable drawable = ResourcesCompat.getDrawableForDensity(
                resources,
                drawID,
                density, // DisplayMetrics.DENSITY_XXXHIGH
                null
        );
        drawable.setColorFilter(Color.parseColor(color), PorterDuff.Mode.SRC_ATOP);
        return drawable;
    }

}
