package com.ldz.util.commonUtil;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ldz.util.bean.WebcamBean;
import com.ldz.util.exception.RuntimeCheck;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


/**
 * 摄像头操作api工具类
 */
@Log4j2
public class WebcamUtil {

    private static String IP = "http://139.196.253.185";

    private static String ZH = "ES4G870";
//    private static String ZH = "AHD30895";

    private static String PWD = "000000";

    /**
     * 用户登录  存储 jsession 到redis 里面
     */
    public static String login(StringRedisTemplate redis) {
        String webcamJsession = redis.boundValueOps("webcam_jsession").get();
        if (StringUtils.isNotBlank(webcamJsession)){
            return webcamJsession;
        }
        // 拼接登录地址
        String url = IP + "/StandardApiAction_login.action";
        Map<String, String> loginParams = new HashMap<>();
        loginParams.put("account", ZH);
        loginParams.put("password", PWD);
        loginParams.put("clientLogin", "2");
        String s = HttpUtil.get(url, loginParams);
        log.info("登录返回信息: " + s);
        JSONObject jsonObject = JSON.parseObject(s);
        Integer result = jsonObject.getInteger("result");
        RuntimeCheck.ifFalse(result == 0 , "操作失败,请稍后再试");
        String jsession = jsonObject.getString("jsession");
        // 存储jsession
        redis.boundValueOps("webcam_jsession").set(jsession);
        return jsession;
    }

    /**
     * 用户注销
     */
    public static int logout(StringRedisTemplate redis) {
        String jsession = redis.boundValueOps("webcam_jsession").get();
        if (StringUtils.isBlank(jsession)) {
            return 0;
        }
        // 拼接注销地址
        String url = IP + "/StandardApiAction_logout.action";
        Map<String, String> params = new HashMap<>();
        params.put("jsession", jsession);
        String res = HttpUtil.get(url, params);
        JSONObject jsonObject = JSON.parseObject(res);
        Integer result = jsonObject.getInteger("result");
        return result;
    }

    /**
     * 实时录像
     */
    public static int realVideo(StringRedisTemplate redis, String deviceNo, String chn, int sec, String label) {
        // 拼接视频录像地址
        String url = IP + "/StandardApiAction_realTimeVedio.action";
        Map<String, String> params = new HashMap<>();
        params.put("jsession", redis.boundValueOps("webcam_jsession").get());
        params.put("DevIDNO", deviceNo);
        params.put("Chn", chn);
        params.put("Sec", sec + "");
        params.put("Label", label);
        String res = HttpUtil.get(url, params);
        JSONObject jsonObject = JSON.parseObject(res);
        Integer result = jsonObject.getInteger("result");
        RuntimeCheck.ifFalse(result == 0, "操作失败, 请稍后再试");
        return result;
    }

    /**
     * 抓拍
     */
    public static String photo(StringRedisTemplate redis, String DevIDNO, String Chn) {
        String jsession = login(redis);
        // 拼接抓拍url
        String url = IP + "/StandardApiAction_capturePicture.action";
        Map<String, String> params = new HashMap<>();
        params.put("jsession",jsession );
        params.put("DevIDNO", DevIDNO);
        params.put("Chn", Chn);
        params.put("Type", "1");
        String res = HttpUtil.get(url, params);
        JSONObject object = JSON.parseObject(res);
        Integer result = object.getInteger("result");
        if(result == 5){
            redis.delete("webcam_jsession");
            jsession = login(redis);
            params.put("jsession",jsession);
            res = HttpUtil.get(url, params);
            object = JSON.parseObject(res);
            RuntimeCheck.ifFalse(StringUtils.equals(object.getString("result"), "0"), "请求异常 ， 请稍后再试");
        }
        RuntimeCheck.ifTrue(result == 32, "设备不在线 ,请稍后再试");
        RuntimeCheck.ifFalse(result == 0, "操作失败, 请稍后再试");

        String imgurl = IP + ":6611/3/5?Type=3";
        String flength = object.getString("FLENGTH");
        imgurl += "&FLENGTH=" + flength;
        String foffset = object.getString("FOFFSET");
        imgurl += "&FOFFSET=" + foffset;
        imgurl += "&MTYPE=1";
        String fpath = object.getString("FPATH");
        imgurl += "&FPATH=" + fpath;
        imgurl += "&SAVENAME=" + System.currentTimeMillis() + ".jpg";
        return imgurl;
    }

    /**
     * 设备添加
     *
     * @param devNo       设备编号
     * @param protocol    1:部标(2011) 2:部标(北斗) 3:部标1078(视频)
     * @param devType     设备类型
     *                    7表示视频设备，5表示GPS设备,8手持终端 9单兵设备、9执法终端 10 调度终端 11 PTT终端
     * @param companyName 公司名称
     *                    如果不存在则添加
     * @param account     主账号
     * @param factoryType 厂家类型
     *                    0 表示未知 ,17表示GM,20表示HD
     *                    21 表示FZE ,23表示HB,24表示BSJ
     *                    26表示HK ,28表示YX,29表示RM
     * @param channelNum  通道数目
     * @return
     */
    public static int addDev(StringRedisTemplate redis, String devNo, String protocol, String devType, String companyName, String account, String factoryType, String channelNum) {
         login(redis);
        // 拼接地址
        String url = IP + "/StandardApiAction_addDevice.action";
        Map<String, String> params = new HashMap<>();
        params.put("jsession", redis.boundValueOps("webcam_jsession").get());
        params.put("devIdno", devNo);
        if (StringUtils.isNotBlank(protocol)) {
            params.put("protocol", protocol);
        }
        params.put("devType", devType);
        params.put("companyName", companyName);
        if (StringUtils.isNotBlank(account)) {
            params.put("account", account);
        }
        params.put("factoryType", factoryType);
        if(StringUtils.isNotBlank(channelNum)){
            params.put("channelNum",channelNum);
        }
        String res = HttpUtil.get(url, params);
        JSONObject object = JSON.parseObject(res);
        Integer result = object.getInteger("result");
        RuntimeCheck.ifFalse(result == 0 , "操作失败, 请稍后再试");
        return result;
    }

    /**
     * 获取当前账户下所有的设备号
     */
    public static Map<String,String> getAllSbh(StringRedisTemplate redis){
        String jsession = login(redis);
        // 调用获取车辆信息接口
        String url =  IP + "/StandardApiAction_queryUserVehicle.action";

        Map<String,String> params = new HashMap<>();
        params.put("jsession",jsession);
        params.put("language","zh");

        String res = HttpUtil.get(url, params);
        JSONObject object = JSON.parseObject(res);

        if(StringUtils.equals(object.getString("result"), "5")){
            redis.delete("webcam_jsession");
            jsession = login(redis);
            params.put("jsession",jsession);
            res = HttpUtil.get(url, params);
            object = JSON.parseObject(res);
            RuntimeCheck.ifFalse(StringUtils.equals(object.getString("result"), "0"), "请求异常 ， 请稍后再试");
        }
        List<Map<String,String>> sbhs = new ArrayList<>();
        JSONArray array = object.getJSONArray("vehicles");
        RuntimeCheck.ifEmpty(array, "账户尚未绑定设备");
        for (int i = 0; i < array.size(); i++) {
            JSONObject arrayJSONObject = array.getJSONObject(i);
            JSONArray dl = arrayJSONObject.getJSONArray("dl");
            for (int i1 = 0; i1 < dl.size(); i1++) {
                Map<String,String> m = new HashMap<>();
                String sbh = dl.getJSONObject(i1).getString("id");
                String chn = dl.getJSONObject(i1).getString("cn");
                m.put("id", sbh);
                m.put("chn", chn);
                sbhs.add(m);
            }
        }
        Map<String, String> map = sbhs.stream().collect(Collectors.toMap(stringStringMap -> stringStringMap.get("id"), p -> p.get("chn")));
        return map;
    }

    /**
     * 获取设备当前GPS状态
     * @return
     */
    public static List<WebcamBean> getGps(String sbh , StringRedisTemplate redis){

        String url = IP + "/StandardApiAction_getDeviceStatus.action";
        Map<String,String> params = new HashMap<>();
        String jsession = login(redis);
        params.put("jsession",jsession);
        params.put("devIdno", sbh);
        String res = HttpUtil.get(url, params);
        JSONObject object = JSON.parseObject(res);
        if(StringUtils.equals(object.getString("result"), "5")){
            redis.delete("webcam_jsession");
            jsession = login(redis);
            params.put("jsession",jsession);
            res = HttpUtil.get(url,params);
            object= JSON.parseObject(res);
            RuntimeCheck.ifFalse(StringUtils.equals(object.getString("result"), "0"), "请求异常，请杀后再试");
        }
        JSONArray status = object.getJSONArray("status");
        if(CollectionUtils.isEmpty(status)){
            return new ArrayList<>();
        }
        List<WebcamBean> webcamBeans = status.toJavaList(WebcamBean.class);
        return webcamBeans;
    }


}
