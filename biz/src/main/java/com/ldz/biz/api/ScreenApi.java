package com.ldz.biz.api;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ldz.dao.biz.model.Cb;
import com.ldz.service.biz.interfaces.CbService;
import com.ldz.util.bean.ApiResponse;
import com.ldz.util.bean.SimpleCondition;
import com.ldz.util.commonUtil.HttpUtil;
import com.ldz.util.commonUtil.WebcamUtil;
import com.ldz.util.exception.RuntimeCheck;
import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/pub")
public class ScreenApi {

    @Autowired
    private StringRedisTemplate reids;
    @Autowired
    private CbService service;
    @Value("${shipApi.ip}")
    private String shipip;

    /**
     * 抓拍接口
     */
    @PostMapping("/zp")
    public ApiResponse<String> zp(String sbh, String chn){
        RuntimeCheck.ifBlank(sbh, "请选择设备");
        String photo = WebcamUtil.photo(reids,  sbh, chn);
        return ApiResponse.success(photo);
    }

    @PostMapping("/zb")
    public ApiResponse<String[]> zb(String sbh){

        RuntimeCheck.ifBlank(sbh, "请选择设备");
        Map<String, String> map = WebcamUtil.getAllSbh(reids);

        RuntimeCheck.ifFalse(map.containsKey(sbh), "此设备未在平台添加");
        String s = map.get(sbh);
        String ch = s.replaceAll("CH", "");
        String [] urls = new String[9];
        List<String> split = Arrays.asList(ch.split(","));
        for (int i = 0; i < 9; i++) {
            if(split.contains((i+1) +"")){
                String url = "http://139.196.253.185/808gps/open/hls/index.html?lang=zh&devIdno="+sbh+"&jsession=" + WebcamUtil.login(reids) + "&channel=" + i;
                urls[i] = url;
            }else{
                urls[i] = "";
            }
        }
        return ApiResponse.success(urls);
    }
    @PostMapping("/zbH5")
    public ApiResponse<String[]> znH5(String sbh) {

        RuntimeCheck.ifBlank(sbh, "请选择设备");
        Map<String, String> map = WebcamUtil.getAllSbh(reids);

        RuntimeCheck.ifFalse(map.containsKey(sbh), "此设备未在平台添加");
        String s = map.get(sbh);
        String ch = s.replaceAll("CH", "");
        String [] urls = new String[9];
        List<String> split = Arrays.asList(ch.split(","));
        for (int i = 0; i < 9; i++) {
            if(split.contains((i+1) +"")){
                String url = "http://139.196.253.185:6604/hls/1_"+sbh  +"_" + i + "_1.m3u8?JSESSIONID=" + WebcamUtil.login(reids) ;
                urls[i] = url;
            }else{
                urls[i] = "";
            }
        }
        return ApiResponse.success(urls);
    }

    /**
     *
     * @return
     */
    @PostMapping("/getCbs")
    public ApiResponse<List<Cb>> getCbs(){
        SimpleCondition condition = new SimpleCondition(Cb.class);
        condition.setOrderByClause("cl_id desc");
        List<Cb> cbs = service.findByCondition(condition);
        return ApiResponse.success(cbs);
    }

    @PostMapping("/history")
    public ApiResponse<List<Map<String, String>>> history(String mmsi, String start, String end){
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        RuntimeCheck.ifBlank(start, "请选择轨迹时间");
        RuntimeCheck.ifBlank(end, "请选择轨迹时间");
        String url = shipip + "/v1/GetHistoryVoyage";
        Map<String,String> params = new HashMap<>();
        params.put("shipid", mmsi);
        params.put("startUtcTime", DateTime.parse(start, DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")).toDate().getTime()/1000 + "");
        params.put("endUtcTime", DateTime.parse(end, DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")).toDate().getTime()/1000 + "");
        String res = HttpUtil.get(url, params);
        JSONObject object = JSON.parseObject(res);
        RuntimeCheck.ifFalse(StringUtils.equals(object.getString("Status"), "0"), "请求异常， 请稍后再试");
        JSONArray array = object.getJSONArray("Result");
        List<Map<String,String>>  m = new ArrayList<>();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for (int i = 0; i < array.size(); i++) {
            Map<String,String> map = new HashMap<>();
            JSONObject jsonObject = array.getJSONObject(i);
            String departtime = jsonObject.getString("departtime");
            String ata = jsonObject.getString("ata");
            map.put("departtime", format.format(new Date(Long.parseLong(departtime)*1000)));
            map.put("ata",  format.format(new Date(Long.parseLong(ata)*1000)));
            map.put("departportname", jsonObject.getString("departportname"));
            map.put("arrivedportname", jsonObject.getString("arrivedportname"));
            map.put("totalvoyage", jsonObject.getString("totalvoyage"));
            m.add(map);
        }
        return ApiResponse.success(m);
    }

    @PostMapping("/historyTrack")
    public ApiResponse<JSONArray> getHistoryTrack(String mmsi, String start, String end) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        RuntimeCheck.ifBlank(start, "请选择轨迹时间");
        RuntimeCheck.ifBlank(end, "请选择轨迹时间");
        String url = shipip + "/v1/GetHistoryTrack";
        Map<String,String> params = new HashMap<>();
        params.put("shipid", mmsi);
        params.put("startUtcTime", DateTime.parse(start, DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")).toDate().getTime()/1000 + "");
        params.put("endUtcTime", DateTime.parse(end, DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")).toDate().getTime()/1000 + "");
        String res = HttpUtil.get(url, params);
        JSONObject object = JSON.parseObject(res);
        RuntimeCheck.ifFalse(StringUtils.equals(object.getString("Status"), "0"), "请求异常， 请稍后再试");
        JSONArray array = object.getJSONArray("Result");
        return ApiResponse.success(array);
    }








}
