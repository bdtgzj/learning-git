package com.nzxye.ai.bean;

import java.util.ArrayList;

/**
 * Created by yuxiaodong on 03/03/2017.
 */

public class SearchResponse extends ResponseBase {

    private ArrayList<SearchResult> results;
    private Object thresholds;
    private String image_id;
    private ArrayList<Face> faces;

    public ArrayList<SearchResult> getResults() {
        return results;
    }

    public void setResults(ArrayList<SearchResult> results) {
        this.results = results;
    }

    public Object getThresholds() {
        return thresholds;
    }

    public void setThresholds(Object thresholds) {
        this.thresholds = thresholds;
    }

    public String getImageId() {
        return image_id;
    }

    public void setImageId(String image_id) {
        this.image_id = image_id;
    }

    public ArrayList<Face> getFaces() {
        return faces;
    }

    public void setFaces(ArrayList<Face> faces) {
        this.faces = faces;
    }
}
