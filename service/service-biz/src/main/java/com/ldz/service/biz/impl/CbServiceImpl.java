package com.ldz.service.biz.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ldz.dao.biz.bean.ClClModel;
import com.ldz.dao.biz.bean.SafedrivingModel;
import com.ldz.dao.biz.mapper.ClClMapper;
import com.ldz.dao.biz.model.*;
import com.ldz.service.biz.interfaces.*;
import com.ldz.sys.base.BaseServiceImpl;
import com.ldz.sys.base.LimitedCondition;
import com.ldz.sys.model.SysJg;
import com.ldz.sys.model.SysYh;
import com.ldz.sys.service.JgService;
import com.ldz.util.bean.ApiResponse;
import com.ldz.util.bean.Point;
import com.ldz.util.bean.SimpleCondition;
import com.ldz.util.commonUtil.HttpUtil;
import com.ldz.util.commonUtil.WebcamUtil;
import com.ldz.util.exception.RuntimeCheck;
import com.ldz.util.gps.Gps;
import com.ldz.util.gps.PositionUtil;
import com.ldz.util.redis.RedisTemplateUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.openxmlformats.schemas.presentationml.x2006.main.CTTLByHslColorTransform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.common.Mapper;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;


@Service
public class CbServiceImpl extends BaseServiceImpl<Cb, String> implements CbService {
    @Autowired
    private ClClMapper entityMapper;
    @Autowired
    private JgService jgService;
    @Autowired
    private CbService clService;
    @Autowired
    private JsyService jsyService;
    @Autowired
    private ZdglService zdglService;
    @Autowired
    private ClyxjlService clyxjlService;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private StringRedisTemplate reids;
    @Autowired
    private XcService xcService;
    @Autowired
    private GpsLsService gpsLsService;
    @Autowired
    private GpsService gpsService;
    @Value("${staticPath}")
    private String filePath;
    @Autowired
    private SpkService spkService;
    @Autowired
    private RedisTemplateUtil reidsUtil;



    private ExecutorService excutor = Executors.newSingleThreadExecutor();


    @Value("${shipApi.ip}")
    private String shipip;
    @Value("${filePath}")
    private String path;

    @Override
    protected Mapper<Cb> getBaseMapper() {
        return entityMapper;
    }

    @Override
    public boolean fillPagerCondition(LimitedCondition condition) {
        String nav = getRequestParamterAsString("nav");
        if(StringUtils.isNotBlank(nav)){
            if(StringUtils.equals(nav,"0")){
                condition.eq(Cb.InnerColumn.navStatus, "0");
            }else if(StringUtils.equals("1",nav)) {
                condition.and().andNotEqualTo(Cb.InnerColumn.navStatus.name(), "0");
            }else{
                return false;
            }
        }
        String portname = getRequestParamterAsString("portname");
        if(StringUtils.isNotBlank(portname)){
            condition.and().andCondition(" departportname = '" + portname + "' or anchorportname = '" + portname + "' or arrivingportname = '" + portname + "'");
        }
        String con = getRequestParamterAsString("con");
        if (StringUtils.isNotBlank(con)) {
            condition.and().andCondition(" shipname like '%" + con + "%' or mmsi like '%" + con + "%'");
        }
        return true;
    }

    @Override
    protected void afterPager(PageInfo<Cb> resultPage) {
        List<Cb> cbList = resultPage.getList();
        if (CollectionUtils.isEmpty(cbList)) {
            return;
        }
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        // 更新定位坐标
        List<String> collect = cbList.stream().map(Cb::getSbh).filter(StringUtils::isNotBlank).collect(Collectors.toList());
        List<String> list = cbList.stream().map(Cb::getMmsi).filter(StringUtils::isNotBlank).collect(Collectors.toList());
        collect.addAll(list);
        List<ClGps> gpses = gpsService.findIn(ClGps.InnerColumn.zdbh, collect);
        Map<String, ClGps> map = gpses.stream().collect(Collectors.toMap(ClGps::getZdbh, p -> p));
        cbList.forEach(cb -> {
            if(StringUtils.isBlank(cb.getZdbh()) && StringUtils.isNotBlank(cb.getSbh())){
                ClGps clGps = map.get(cb.getSbh());
                if(clGps == null){
                   clGps =  map.get(cb.getMmsi());
                }
                if(clGps != null){
                    Gps gps84_to_gcj02 = PositionUtil.gps84_To_Gcj02( clGps.getWd().doubleValue(),clGps.getJd().doubleValue() );
                    if(gps84_to_gcj02 != null ){
                        Gps gps = PositionUtil.gcj02_To_Bd09(gps84_to_gcj02.getWgLat(), gps84_to_gcj02.getWgLon());
                        cb.setDwsj(format.format(clGps.getCjsj()));
                        cb.setDwzb(gps.getWgLon() + "," + gps.getWgLat());
                        cb.setDwsj(format.format(clGps.getCjsj()));
                        cb.setHx(clGps.getFxj().doubleValue()+"");
                        cb.setHs(clGps.getYxsd());
                    }
                }
            }else if(StringUtils.isBlank(cb.getZdbh()) && StringUtils.isBlank(cb.getSbh())){
                ClGps clGps = map.get(cb.getMmsi());
                if(clGps != null){
                    Gps gps84_to_gcj02 = PositionUtil.gps84_To_Gcj02( clGps.getWd().doubleValue(),clGps.getJd().doubleValue() );
                    if(gps84_to_gcj02 != null ){
                        Gps gps = PositionUtil.gcj02_To_Bd09(gps84_to_gcj02.getWgLat(), gps84_to_gcj02.getWgLon());
                        cb.setDwsj(format.format(clGps.getCjsj()));
                        cb.setDwzb(gps.getWgLon() + "," + gps.getWgLat());
                        cb.setDwsj(format.format(clGps.getCjsj()));
                        cb.setHx(clGps.getFxj().doubleValue()+"");
                        cb.setHs(clGps.getYxsd());
                    }
                }
            }
        });
    }

    @Override
    protected void afterQuery(List<Cb> cblist) {

        if (CollectionUtils.isEmpty(cblist)) {
            return;
        }

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        // 更新定位坐标
        List<String> collect = cblist.stream().map(Cb::getSbh).filter(StringUtils::isNotBlank).collect(Collectors.toList());
        List<String> list = cblist.stream().map(Cb::getMmsi).filter(StringUtils::isNotBlank).collect(Collectors.toList());
        collect.addAll(list);
        List<ClGps> gpses = gpsService.findIn(ClGps.InnerColumn.zdbh, collect);
        Map<String, ClGps> map = gpses.stream().collect(Collectors.toMap(ClGps::getZdbh, p -> p));
        cblist.forEach(cb -> {
            if(StringUtils.isBlank(cb.getZdbh()) && StringUtils.isNotBlank(cb.getSbh())){
                ClGps clGps = map.get(cb.getSbh());
                if(clGps == null){
                    clGps =  map.get(cb.getMmsi());
                }
                if(clGps != null){
                    Gps gps84_to_gcj02 = PositionUtil.gps84_To_Gcj02( clGps.getWd().doubleValue(),clGps.getJd().doubleValue() );
                    if(gps84_to_gcj02 != null ){
                        Gps gps = PositionUtil.gcj02_To_Bd09(gps84_to_gcj02.getWgLat(), gps84_to_gcj02.getWgLon());
                        cb.setDwsj(format.format(clGps.getCjsj()));
                        cb.setDwzb(gps.getWgLon() + "," + gps.getWgLat());
                        cb.setDwsj(format.format(clGps.getCjsj()));
                        cb.setHx(clGps.getFxj().doubleValue()+"");
                        cb.setHs(clGps.getYxsd());
                    }
                }
            }else if(StringUtils.isBlank(cb.getZdbh()) && StringUtils.isBlank(cb.getSbh())){
                ClGps clGps = map.get(cb.getMmsi());
                if(clGps != null){
                    Gps gps84_to_gcj02 = PositionUtil.gps84_To_Gcj02( clGps.getWd().doubleValue(),clGps.getJd().doubleValue() );
                    if(gps84_to_gcj02 != null ){
                        Gps gps = PositionUtil.gcj02_To_Bd09(gps84_to_gcj02.getWgLat(), gps84_to_gcj02.getWgLon());
                        cb.setDwsj(format.format(clGps.getCjsj()));
                        cb.setDwzb(gps.getWgLon() + "," + gps.getWgLat());
                        cb.setDwsj(format.format(clGps.getCjsj()));
                        cb.setHx(clGps.getFxj().doubleValue()+"");
                        cb.setHs(clGps.getYxsd());
                    }
                }
            }
        });
    }

    @Override
    public boolean fillQueryCondition(LimitedCondition condition) {
        String nav = getRequestParamterAsString("nav");
        if(StringUtils.isNotBlank(nav)){
            if(StringUtils.equals(nav,"0")){
                condition.eq(Cb.InnerColumn.navStatus, "0");
            }else if(StringUtils.equals("1",nav)) {
                condition.and().andNotEqualTo(Cb.InnerColumn.navStatus.name(), "0");
            }else{
                return false;
            }
        }
        String portname = getRequestParamterAsString("portname");
        if(StringUtils.isNotBlank(portname)){
            condition.and().andCondition(" departportname = '" + portname + "' or anchorportname = '" + portname + "' or arrivingportname = '" + portname + "'");
        }
        String con = getRequestParamterAsString("con");
        if (StringUtils.isNotBlank(con)) {
            condition.and().andCondition(" shipname like '%" + con + "%' or mmsi like '%" + con + "%'");
        }
        return true;
    }

    @Override
    protected Class<?> getEntityCls() {
        return Cb.class;
    }

    //车辆删除后，同步移除
    @Override
    public void remove(String id) {
        int i = getBaseMapper().deleteByPrimaryKey(id);
        if (i == 1) {
//			移除 车辆运行记录表中的记录
            ClClyxjl clClyxjl = new ClClyxjl();
            clClyxjl.setClId(id);//车辆ID
            clyxjlService.remove(clClyxjl);
        }
    }

    @Override
    public void remove(Cb entity) {
        int i = getBaseMapper().delete(entity);
        if (i == 1) {
//			移除 CL_CLYXJL
            ClClyxjl clClyxjl = new ClClyxjl();
            clClyxjl.setClId(entity.getClId());//车辆ID
            clyxjlService.remove(clClyxjl);
        }
    }

    @Override
    public ApiResponse<String> removeIds(String[] ids) {
        for (String id : ids) {
            int i = getBaseMapper().deleteByPrimaryKey(id);
            if (i == 1) {
//			移除 CL_CLYXJL
                ClClyxjl clClyxjl = new ClClyxjl();
                clClyxjl.setClId(id);//车辆ID
                clyxjlService.remove(clClyxjl);
            }
        }
        return ApiResponse.deleteSuccess();
    }

    @Override
    public Cb findByOrgCode(String code) {
        List<Cb> jgs = findEq(Cb.InnerColumn.clId, code);
        if (jgs.size() == 0)
            return null;
        return jgs.get(0);
    }

    @Override
    public List<Cb> getOrgCarList(String orgCode) {
        List<Cb> carList = clService.findEq(Cb.InnerColumn.jgdm, orgCode);
        return carList;
    }

    @Override
    public ApiResponse<String> saveEntity(Cb entity) {
        SysYh user = getCurrentUser();
        SysJg org = jgService.findByOrgCode(user.getJgdm());
        Date now = new Date();
        entity.setCjr(getOperateUser());
        entity.setClId(genId());
        entity.setCjsj(now);
        entity.setJgdm(user.getJgdm());
        entity.setJgmc(org.getJgmc());
        entity.setZxzt("20");
        save(entity);
        return ApiResponse.saveSuccess();
    }

    @Override
    public ApiResponse<String> updateEntity(Cb entity) {
        Cb findById = findById(entity.getClId());
        RuntimeCheck.ifNull(findById, "未找到记录");
        entity.setXgr(getOperateUser());
        entity.setXgsj(new Date());
        update(entity);
        return ApiResponse.success();
    }

    @Override
    public ApiResponse<List<Map<String, Object>>> getVehicleTypeStatistics(String zxzt) {
        // 1、定义初始变量
        ApiResponse<List<Map<String, Object>>> result = new ApiResponse<>();
        List<Map<String, Object>> carGroup = new ArrayList<>();
        SysYh user = getCurrentUser();
        String jgdm = user.getJgdm();// 机构ID
        zxzt = StringUtils.trim(zxzt);
        // 2、查询车辆信息
        List<ClClModel> carList = null;
        if (StringUtils.isNotEmpty(zxzt)) {
            carList = entityMapper.getVehicleTypeZxztStatistics(jgdm, zxzt);
        } else {
            carList = entityMapper.getVehicleTypeStatistics(jgdm);
        }

        if (carList.size() == 0) {
            return result;
        }

        Map<String, List<ClClModel>> carMap = new HashMap<>();
        for (ClClModel model : carList) {
            String cx = model.getCxZtMc();
            if (!carMap.containsKey(cx)) {
                List<ClClModel> modelList = new ArrayList<>();
                modelList.add(model);
                carMap.put(cx, modelList);
            } else {
                carMap.get(cx).add(model);
            }
        }

        for (Map.Entry<String, List<ClClModel>> entry : carMap.entrySet()) {
            String cx = entry.getKey();
            List<ClClModel> modelList = entry.getValue();
            Map<String, Object> group = new HashMap<>();
            List<Map<String, Object>> children = new ArrayList<>();
            group.put("title", cx);
            group.put("expand", true);
            group.put("children", children);
            carGroup.add(group);
            for (ClClModel model : modelList) {
                Map<String, Object> map = parseCarModel(model);
                children.add(map);
            }
        }
        result.setResult(carGroup);
        return result;
    }

    private Map<String, Object> parseCarModel(ClClModel model) {
        Map<String, Object> map = new HashMap<>();
        map.put("title", model.getCph());
        map.put("clid", model.getClId());
        map.put("cx", model.getCx());
        Map<String, Object> point = new HashMap<>();
        point.put("lng", model.getBdWd());
        point.put("lat", model.getBdJd());
        map.put("mapCen", point);
        return map;
    }

    @Override
    public ApiResponse<List<Cb>> nianshen(Cb car) {
        ApiResponse<List<Cb>> apiResponse = new ApiResponse<>();
        long now = new Date().getTime();

        LimitedCondition condition = new LimitedCondition(Cb.class);
        if (StringUtils.isNotEmpty(car.getCph())) {
            condition.like(Cb.InnerColumn.cph, car.getCph());
        }
        List<Cb> cllist = entityMapper.selectByExample(condition);
        List<Cb> cls = new ArrayList<>();
        /*cllist.stream().filter(s -> s.getNssj() != null).filter(s -> (now-s.getNssj().getTime()) < a);*/
        // 年审时间正序
        cllist = cllist.stream().filter(p -> p.getNssj() != null).collect(Collectors.toList());
        cllist.sort(Comparator.comparing(Cb::getNssj));
        for (Cb clCl : cllist) {
            if (clCl.getNssj() != null) {
                long nianshen = clCl.getNssj().getTime();
                long time = (nianshen - now) / (24 * 60 * 60 * 1000);
                if (time < 90) {
                    cls.add(clCl);
                }
            }
        }
        apiResponse.setResult(cls);
        return apiResponse;
    }

    @Override
    public ApiResponse<Map<String, Object>> carAccStatistics(Integer days, String type) {
        SysYh user = getCurrentUser();
        String jgdm = user.getJgdm();
        Calendar now = Calendar.getInstance();
        if (days == null) days = -3;
        if (days > 0) days = -(days - 1);
        now.add(Calendar.DATE, days);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 设置时间格式
        String weekStart = sdf.format(now.getTime());
        String dateRange = " and cjsj> to_date('" + weekStart + "','yyyy-mm-dd') ";
        String sql = "SELECT T1.sjxm,T1.cph,T2.speedupCount,t3.speedownCount,t4.wheelCount,t5.overspeedCount  FROM CL_CL t1 \n" +
                "  LEFT JOIN (select ZDBH ,count(SJLX) as speedupCount FROM CL_SBYXSJJL  t WHERE t.SJLX='10' " + dateRange + " GROUP BY zdbh) t2 on T1.ZDBH=T2.ZDBH\n" +
                "  LEFT JOIN (select ZDBH ,count(SJLX) as speedownCount FROM CL_SBYXSJJL  t WHERE t.SJLX='20' " + dateRange + "  GROUP BY zdbh) t3 on T1.ZDBH=T3.ZDBH\n" +
                "  LEFT JOIN (select ZDBH ,count(SJLX) as wheelCount FROM CL_SBYXSJJL  t WHERE t.SJLX='30' " + dateRange + "  GROUP BY zdbh) t4 on T1.ZDBH=T4.ZDBH\n" +
                "  LEFT JOIN (select ZDBH ,count(SJLX) as overspeedCount FROM CL_SBYXSJJL  t WHERE t.SJLX='40' " + dateRange + "  GROUP BY zdbh) t5 on T1.ZDBH=T5.ZDBH " +
                "  where t1.jgdm like '" + jgdm + "%' ";
        List result = jdbcTemplate.queryForList(sql);
        List<SafedrivingModel> list = new ArrayList<>(result.size());
        for (Object o : result) {
            Map<String, Object> map = (Map<String, Object>) o;
            SafedrivingModel model = new SafedrivingModel();
            model.setCph((String) map.get("cph"));
            model.setOverspeedCount(map.get("overspeedCount") == null ? 0 : Integer.parseInt(map.get("overspeedCount").toString()));
            model.setSpeedownCount(map.get("speedownCount") == null ? 0 : Integer.parseInt(map.get("speedownCount").toString()));
            model.setSpeedupCount(map.get("speedupCount") == null ? 0 : Integer.parseInt(map.get("speedupCount").toString()));
            model.setWheelCount(map.get("wheelCount") == null ? 0 : Integer.parseInt(map.get("wheelCount").toString()));
            model.setSjxm((String) map.get("sjxm"));

            if ("aqjs".equals(type)) {
                int total = model.getSpeedupCount() +
                        model.getSpeedupCount() +
                        model.getWheelCount() +
                        model.getOverspeedCount();
                model.setTotal(total);
            }
            list.add(model);
        }

        if ("aqjs".equals(type)) {
            list.sort(Comparator.comparingInt(SafedrivingModel::getTotal).reversed());
            if (list.size() > 10) {
                list = list.subList(0, 10);
            }
        } else if ("cstj".equals(type)) {
            list.sort(Comparator.comparingInt(SafedrivingModel::getOverspeedCount).reversed());
            if (list.size() > 10) {
                list = list.subList(0, 10);
            }
        }

        List<String> carNumberList = new ArrayList<>(list.size());
        List<Object> speedUpCountList = new ArrayList<>(list.size());
        List<Object> speedDownCountList = new ArrayList<>(list.size());
        List<Object> wheelCountList = new ArrayList<>(list.size());
        List<Object> overSpeedCountList = new ArrayList<>(list.size());
        List<String> driverNames = new ArrayList<>(list.size());
        for (SafedrivingModel model : list) {
            String carNumber = model.getCph();
            String driverName = model.getSjxm();
            carNumberList.add(carNumber);
            driverNames.add(driverName);

            speedUpCountList.add(model.getSpeedupCount());
            speedDownCountList.add(model.getSpeedownCount());
            wheelCountList.add(model.getWheelCount());
            overSpeedCountList.add(model.getOverspeedCount());
        }

        Map<String, Object> map = new HashMap<>();

        Map<String, Object> speedUpMap = new HashMap<>();
        speedUpMap.put("name", "急加速");
        speedUpMap.put("yAxis", speedUpCountList);

        Map<String, Object> wheelMap = new HashMap<>();
        wheelMap.put("name", "急转弯");
        wheelMap.put("yAxis", wheelCountList);


        Map<String, Object> breakMap = new HashMap<>();
        breakMap.put("name", "急刹车");
        breakMap.put("yAxis", speedDownCountList);


        Map<String, Object> overSpeedMap = new HashMap<>();
        overSpeedMap.put("name", "超速");
        overSpeedMap.put("yAxis", overSpeedCountList);

        map.put("driverNames", driverNames);
        map.put("carNumbers", carNumberList);
        map.put("xAxis", carNumberList);
        map.put("speedUpMap", speedUpMap);
        map.put("wheelMap", wheelMap);
        map.put("breakMap", breakMap);
        map.put("overSpeedMap", overSpeedMap);
        return ApiResponse.success(map);
    }


    private static String convertWeekDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);

        // 判断要计算的日期是否是周日，如果是则减一天计算周六的，否则会出问题，计算到下一周去了

        int dayWeek = cal.get(Calendar.DAY_OF_WEEK);// 获得当前日期是一个星期的第几天

        if (1 == dayWeek) {

            cal.add(Calendar.DAY_OF_MONTH, -1);

        }

        cal.setFirstDayOfWeek(Calendar.MONDAY);// 设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一

        int day = cal.get(Calendar.DAY_OF_WEEK);// 获得当前日期是一个星期的第几天

        cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - day);// 根据日历的规则，给当前日期减去星期几与一个星期第一天的差值

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 设置时间格式
        return sdf.format(cal.getTime()); // 周一时间

    }

    public static void main(String[] args) {

    }

    @Override
    public ApiResponse<Map<String, Integer>> getnianshen() {
        //获取当前登陆用户
        SysYh user = getCurrentUser();
        Cb clCl = new Cb();
        clCl.setJgdm(user.getJgdm());

        List<Cb> cllist = entityMapper.select(clCl);


        int thirty = 0;
        int sixty = 0;
        int ninety = 0;
        Date now = new Date();
        for (Cb cl : cllist) {
            if (cl.getNssj() == null) {
                continue;
            }
            Date nssj = cl.getNssj();
            int cha = differentDaysByMillisecond(now, nssj);
            if (cha <= 30) {
                thirty++;
            }
            if (cha > 30 && cha <= 60) {
                sixty++;
            }
            if (cha > 60 && cha <= 90) {
                ninety++;
            }

        }
        ApiResponse<Map<String, Integer>> apiResponse = new ApiResponse<>();
        Map<String, Integer> map = new HashMap<>();
        map.put("30", thirty);
        map.put("60", sixty);
        map.put("90", ninety);
        apiResponse.setResult(map);
        return apiResponse;
    }

    @Override
    public ApiResponse<String> unbindDevice(String carId) {
        RuntimeCheck.ifBlank(carId, "请选择船舶");
        Cb car = entityMapper.selectByPrimaryKey(carId);
        RuntimeCheck.ifNull(car, "未找到船舶信息");
        car.setZdbh(null);
        entityMapper.updateByPrimaryKey(car);
        return ApiResponse.success();
    }

    @Override
    public ApiResponse<String> unbindDriver(String carId) {
        RuntimeCheck.ifBlank(carId, "请选择车辆");
        Cb car = entityMapper.selectByPrimaryKey(carId);
        RuntimeCheck.ifNull(car, "未找到车辆");
        car.setSjxm(null);
        car.setSjId(null);
        entityMapper.updateByPrimaryKey(car);
        return ApiResponse.success();
    }

    @Override
    public ApiResponse<String> bindDriver(String carId, String driverId) {
        RuntimeCheck.ifBlank(carId, "请选择车辆");
        RuntimeCheck.ifBlank(driverId, "请选择驾驶员");
        Cb car = entityMapper.selectByPrimaryKey(carId);
        RuntimeCheck.ifNull(car, "未找到车辆");
        ClJsy driver = jsyService.findById(driverId);
        RuntimeCheck.ifNull(driver, "未找到驾驶员");

        car.setSjxm(driver.getXm());
        car.setSjId(driverId);
        entityMapper.updateByPrimaryKeySelective(car);
        return ApiResponse.success();
    }

    @Override
    public ApiResponse<String> bindDevice(String carId, String devcieId) {
        RuntimeCheck.ifBlank(carId, "请选择船舶");
        RuntimeCheck.ifBlank(devcieId, "请选择终端");
        Cb car = entityMapper.selectByPrimaryKey(carId);
        RuntimeCheck.ifNull(car, "未找到船舶信息");
        ClZdgl device = zdglService.findById(devcieId);
        RuntimeCheck.ifNull(device, "未找到终端信息");

        List<Cb> clCls = clService.findEq(Cb.InnerColumn.zdbh, devcieId);
        RuntimeCheck.ifTrue(CollectionUtils.isNotEmpty(clCls), "此终端已经绑定其他船舶, 请勿重复绑定");
        car.setZdbh(devcieId);
        entityMapper.updateByPrimaryKeySelective(car);
        return ApiResponse.success();
    }

    @Override
    public ApiResponse<String> bindWebcam(String mmsi, String sbh) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        RuntimeCheck.ifBlank(sbh, "请填写绑定设备");
        List<Cb> cbs = clService.findEq(Cb.InnerColumn.mmsi, mmsi);
        RuntimeCheck.ifEmpty(cbs, "未找到船舶信息");
        Cb cb = cbs.get(0);
        RuntimeCheck.ifTrue(StringUtils.isNotBlank(cb.getSbh()), "当前船舶已绑定设备");
        Map<String, String> allSbh = WebcamUtil.getAllSbh(reids);
        RuntimeCheck.ifFalse(allSbh.containsKey(sbh), "当前设备号没有添加 , 请先添加当前设备号");

        cb.setSbh(sbh);
//		SysYh user = getCurrentUser();
//		Sxt sxt = new Sxt();
//		sxt.setChn(allSbh.get(sbh));
//		sxt.setCjsj(DateUtils.getNowTime());
//		sxt.setCjr(user.getZh() + "-" + user.getXm());
//		sxt.setId(genId());
//		sxt.setMmsi(mmsi);
//		sxt.setSbh(sbh);
//		sxtService.save(sxt);
        update(cb);
        return ApiResponse.success();
    }

    @Override
    public ApiResponse<String> getXc(String mmsi, String start, String end, int pageNum, int pageSize) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        if (StringUtils.isBlank(start)) {
            start = DateTime.now().toString("yyyy-MM-dd") + " 00:00:00";
        } else {
            start += " 00:00:00";
        }
        if (StringUtils.isBlank(end)) {
            end = DateTime.now().toString("yyyy-MM-dd") + " 23:59:59";
        } else {
            end += " 23:59:59";
        }
        // 查询船舶在这个时间段的航次
        SimpleCondition condition = new SimpleCondition(ClXc.class);
        condition.eq(ClXc.InnerColumn.clZdbh, mmsi);
        condition.gte(ClXc.InnerColumn.xcKssj, start);
        condition.lte(ClXc.InnerColumn.xcJssj, end);
        PageInfo<ClXc> info = PageHelper.startPage(pageNum, pageSize).doSelectPageInfo(() -> xcService.findByCondition(condition));
        ApiResponse<String> res = new ApiResponse<>();
        res.setPage(info);

        return ApiResponse.success();
    }

    @Override
    public ApiResponse<List<ClGpsLs>> getXcGpsByMMSI(String mmsi, String start, String end) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        RuntimeCheck.ifBlank(start, "请选择行程开始时间");
        RuntimeCheck.ifBlank(end, "请选择行程结束时间");
        SimpleCondition condition = new SimpleCondition(ClGpsLs.class);
        DateTimeFormatter pattern = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");
        DateTime startTime = DateTime.parse(start, pattern);
        DateTime endTime = DateTime.parse(end, pattern);
        condition.eq(ClGpsLs.InnerColumn.zdbh, mmsi);
        condition.gte(ClGpsLs.InnerColumn.cjsj, startTime);
        condition.lte(ClGpsLs.InnerColumn.cjsj, endTime);
        condition.setOrderByClause(" id asc");
        List<ClGpsLs> gpsLs = gpsLsService.findByCondition(condition);
        return ApiResponse.success(gpsLs);
    }

    @Override
    public ApiResponse<String> photo(String mmsi, String chn) throws IOException {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        RuntimeCheck.ifBlank(chn, "请选择拍摄通道");
        List<Cb> cbs = findEq(Cb.InnerColumn.mmsi, mmsi);
//		List<Sxt> sxts = sxtService.findEq(Sxt.InnerColumn.mmsi, mmsi);
        RuntimeCheck.ifEmpty(cbs, "未找船舶信息");
        Cb cb = cbs.get(0);
        String photo = WebcamUtil.photo(reids, cb.getSbh(), chn);
        if(StringUtils.isBlank(photo)){
            return ApiResponse.success(photo);
        }
        URL url = new URL(photo);
        String filePath = "/zp/" + DateTime.now().toString("yyyy-MM-dd") + "/" + mmsi + "-" + chn + ".jpg";
        FileUtils.copyURLToFile(url, new File("/data/wwwroot/file" + filePath));
        String file = path + filePath;
        return ApiResponse.success(file);
    }

    @Override
    public ApiResponse<String> getHcByApi(String mmsi, String start, String end) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        if (StringUtils.isBlank(start)) {
            start = DateTime.now().toString("yyyy-MM-dd") + " 00:00:00";
        } else {
            start += " 00:00:00";
        }


        return null;
    }

    @Override
    public ApiResponse<String> shipInfo(String mmsi) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        String url = shipip + "/v1/GetShipInfo";
        Map<String, String> params = new HashMap<>();
        params.put("shipid", mmsi);
        String res = HttpUtil.get(url, params);
        JSONObject object = JSON.parseObject(res);
        RuntimeCheck.ifFalse(StringUtils.equals(object.getString("Status"), "0"), "查询异常，请稍后再试");
        return ApiResponse.success(object.getString("Result"));
    }

    @Override
    public ApiResponse<String[]> getAllChn(String mmsi) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        List<Cb> cbs = findEq(Cb.InnerColumn.mmsi, mmsi);
        RuntimeCheck.ifEmpty(cbs, "未找到船舶信息");
        Cb cb = cbs.get(0);
//		List<Sxt> sxts = sxtService.findEq(Sxt.InnerColumn.mmsi, mmsi);
//		RuntimeCheck.ifEmpty(sxts, "此船舶尚未绑定设备");
//		Sxt sxt = sxts.get(0);
        String[] urls = new String[9];
        Map<String, String> sbh = WebcamUtil.getAllSbh(reids);
        if(!sbh.containsKey(cb.getSbh())){
            return ApiResponse.success(urls);
        }
        String s = sbh.get(cb.getSbh());
        String ch = s.replaceAll("CH", "");

        List<String> split = Arrays.asList(ch.split(","));
        for (int i = 0; i < 9; i++) {
            if (split.contains((i + 1) + "")) {
                String url = "http://139.196.253.185/808gps/open/hls/index.html?lang=zh&devIdno=" + cb.getSbh() + "&jsession=" + WebcamUtil.login(reids) + "&channel=" + i;
                urls[i] = url;
            } else {
                urls[i] = "";
            }
        }
        return ApiResponse.success(urls);
    }

    @Override
    public ApiResponse<JSONArray> getHistoryVoyage(String mmsi, String start, String end) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        RuntimeCheck.ifBlank(start, "请选择轨迹时间");
        RuntimeCheck.ifBlank(end, "请选择轨迹时间");
        String url = shipip + "/v1/GetHistoryVoyage";
        Map<String, String> params = new HashMap<>();
        params.put("shipid", mmsi);
        params.put("startUtcTime", DateTime.parse(start, DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")).toDate().getTime() / 1000 + "");
        params.put("endUtcTime", DateTime.parse(end, DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")).toDate().getTime() / 1000 + "");
        String res = HttpUtil.get(url, params);
        JSONObject object = JSON.parseObject(res);
        RuntimeCheck.ifFalse(StringUtils.equals(object.getString("Status"), "0"), "请求异常， 请稍后再试");
        JSONArray array = object.getJSONArray("Result");
        return ApiResponse.success(array);
    }

    @Override
    public ApiResponse<JSONArray> getHistoryTrack(String mmsi, String start, String end) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        RuntimeCheck.ifBlank(start, "请选择轨迹时间");
        RuntimeCheck.ifBlank(end, "请选择轨迹时间");
        String url = shipip + "/v1/GetHistoryTrack";
        Map<String, String> params = new HashMap<>();
        params.put("shipid", mmsi);
        params.put("startUtcTime", DateTime.parse(start, DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")).toDate().getTime() / 1000 + "");
        params.put("endUtcTime", DateTime.parse(end, DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")).toDate().getTime() / 1000 + "");
        String res = HttpUtil.get(url, params);
        JSONObject object = JSON.parseObject(res);
        RuntimeCheck.ifFalse(StringUtils.equals(object.getString("Status"), "0"), "请求异常， 请稍后再试");
        JSONArray array = object.getJSONArray("Result");
        return ApiResponse.success(array);
    }

    @Override
    public ApiResponse<Map<String, String>> getCurrentVoyage(String mmsi) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        String url = shipip + "/v1/GetCurrentVoyage";
        Map<String, String> params = new HashMap<>();
        params.put("shipid", mmsi);
        String res = null;
        try {
            res = HttpUtil.get(url, params);
        } catch (Exception e) {
            e.printStackTrace();
            RuntimeCheck.ifTrue(true, "请求异常 ， 请稍后再试");
        }
        JSONObject object = JSON.parseObject(res);
        Map<String, String> map = new HashMap<>();
        if (StringUtils.equals(object.getString("Status"), "7")) {
            return ApiResponse.success(map);
        }
        RuntimeCheck.ifFalse(StringUtils.equals(object.getString("Status"), "0"), "请求异常， 请稍后再试");
        JSONObject result = object.getJSONObject("Result");
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String departtime = result.getString("departtime");
        String eta = result.getString("eta");
        String anchortime = result.getString("anchortime");
        map.put("departtime", format.format(new Date(Long.parseLong(departtime) * 1000)));
        map.put("eta", format.format(new Date(Long.parseLong(eta) * 1000)));
        map.put("departportname", result.getString("departportname"));
        map.put("arrivingportname", result.getString("arrivingportname"));
        map.put("anchorportname", result.getString("anchorportname"));
        map.put("anchortime", format.format(new Date(Long.parseLong(anchortime) * 1000)));

        return ApiResponse.success(map);
    }

    @Override
    public ApiResponse<String[]> getAllChnH5(String mmsi) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        List<Cb> cbs = findEq(Cb.InnerColumn.mmsi, mmsi);
        RuntimeCheck.ifEmpty(cbs, "未找到船舶信息");
        Cb cb = cbs.get(0);
        if(StringUtils.isBlank(cb.getSbh())){
            return ApiResponse.success(new String[9]);
        }
//		List<Sxt> sxts = sxtService.findEq(Sxt.InnerColumn.mmsi, mmsi);
//		RuntimeCheck.ifEmpty(sxts, "此船舶尚未绑定设备");
        Map<String, String> sbh = WebcamUtil.getAllSbh(reids);
        String[] urls = new String[9];
        if(!sbh.containsKey(cb.getSbh())){
            return ApiResponse.success(urls);
        }
        String s = sbh.get(cb.getSbh());
        String ch = s.replaceAll("CH", "");
        List<String> split = Arrays.asList(ch.split(","));
        for (int i = 0; i < 9; i++) {
            if (split.contains((i + 1) + "")) {
                String url = "http://139.196.253.185:6604/hls/1_" + cb.getSbh() + "_" + i + "_1.m3u8?JSESSIONID=" + WebcamUtil.login(reids);
                urls[i] = url;
            } else {
                urls[i] = "";
            }
        }
        ApiResponse<String[]> res = new ApiResponse<>();
        res.setResult(urls);
        res.setMessage(cb.getSbh());
        return res;
    }

    @Override
    public ApiResponse<String> unbindWebcam(String mmsi) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        List<Cb> cbs = findEq(Cb.InnerColumn.mmsi, mmsi);
        RuntimeCheck.ifEmpty(cbs, "未找到船舶信息");
        entityMapper.unbindWebcam(mmsi);
        return ApiResponse.success();
    }

    @Override
    public ApiResponse<String[]> photos(String sbh) throws IOException {
        Map<String, String> sbhs = WebcamUtil.getAllSbh(reids);
        if (!sbhs.containsKey(sbh)) {
            return ApiResponse.success(new String[9]);
        }
        String s = sbhs.get(sbh);
        String ch = s.replaceAll("CH", "");
        List<String> split = Arrays.asList(ch.split(","));
        String[] urls = new String[9];
        for (int i = 0; i < 9; i++) {
            if (split.contains((i + 1) + "")) {
                String filePath = "/zp/" + sbh + "-" + i + ".jpg";
                String file = path + filePath;
                urls[i] = file;
                int finalI = i;
                excutor.submit(() -> {
                    try {
                        String photo = WebcamUtil.photo(reids, sbh, finalI + "");
                        if(StringUtils.isBlank(photo)){
                            return;
                        }
                        URL url = new URL(photo);
                        FileUtils.copyURLToFile(url, new File("/data/wwwroot/file" + filePath), 100000, 100000);
                    } catch (IOException e) {
                    }
                });
                //String url = "http://139.196.253.185:6604/hls/1_"+ cb.getSbh()  +"_" + i + "_1.m3u8?JSESSIONID=" + WebcamUtil.login(reids) ;

            } else {
                urls[i] = "";
            }
        }
        return ApiResponse.success(urls);
    }

    @Override
    public ApiResponse<List<Point>> newXc(String mmsi, String start, String end) {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        RuntimeCheck.ifBlank(start, "请选择时间");
        RuntimeCheck.ifBlank(end, "请选择时间");

        List<Cb> cbs = findEq(Cb.InnerColumn.mmsi, mmsi);
        RuntimeCheck.ifEmpty(cbs, "未找到船舶信息");
        Cb cb = cbs.get(0);
        //  gps 点获取顺序  定位器 > 设备  >  mmsi
        DateTimeFormatter pattern = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");
        DateTime starttime = pattern.parseDateTime(start);
        DateTime endtime = pattern.parseDateTime(end);
      /*  DateTime minusHours = endtime.minusHours(12);
        long millis = minusHours.getMillis();
        long starttimeMillis = starttime.getMillis();
        RuntimeCheck.ifTrue(millis > starttimeMillis, "轨迹时间间隔不能超过12小时");*/
        SimpleCondition condition = new SimpleCondition(ClGpsLs.class);
        List<ClGpsLs> list;
        if(StringUtils.isNotBlank(cb.getZdbh())){
            condition.eq(ClGpsLs.InnerColumn.zdbh, cb.getZdbh());
        }else if(StringUtils.isNotBlank(cb.getSbh())){
            condition.eq(ClGpsLs.InnerColumn.zdbh, cb.getSbh());
        }else {
            condition.eq(ClGpsLs.InnerColumn.zdbh, mmsi);
        }
        condition.gte(ClGpsLs.InnerColumn.cjsj, starttime.toDate());
        condition.lte(ClGpsLs.InnerColumn.cjsj, endtime.toDate());
        condition.setOrderByClause(" cjsj asc , id asc");
       list = gpsLsService.findByCondition(condition);

       List<Point> points = new ArrayList<>();
       list.forEach(clGpsLs -> {
           Point point = new Point();
           Gps gps84_to_gcj02 = PositionUtil.gps84_To_Gcj02( clGpsLs.getWd().doubleValue(),clGpsLs.getJd().doubleValue() );
           Gps gps = PositionUtil.gcj02_To_Bd09(gps84_to_gcj02.getWgLat(), gps84_to_gcj02.getWgLon());
           point.setDirection(clGpsLs.getFxj().doubleValue());
           point.setLatitude(gps.getWgLat());
           point.setLoc_time(clGpsLs.getCjsj().getTime()/1000);
           point.setLongitude(gps.getWgLon());
           double v = Double.parseDouble(clGpsLs.getYxsd());
           point.setSpeed(v);
           points.add(point);
       });
        return ApiResponse.success(points);
    }

    @Override
    public ApiResponse<List<Map<String, String>>> getCbs() {
        List<Map<String, String>> maps = entityMapper.getCbs();
        return ApiResponse.success(maps);
    }

    @Override
    public ApiResponse<String> zp(String mmsi, String chn) throws IOException {
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        List<Cb> cbs = findEq(Cb.InnerColumn.mmsi, mmsi);
        RuntimeCheck.ifEmpty(cbs, "未找到船舶信息");
        Cb cb = cbs.get(0);
        if(StringUtils.isBlank(chn)){
            chn = "0";
        }
        RuntimeCheck.ifBlank(cb.getSbh(), "船舶未绑定设备, 不能进行拍照");
        String photo = WebcamUtil.photo(reids, cb.getSbh(), chn);
        RuntimeCheck.ifBlank(photo, "设备不在线,请稍后再试");
        String now ="/zp/" +  DateTime.now().toString("yyyy-MM-dd");
        String fileName = "F" + mmsi + "_" + System.currentTimeMillis() + ".jpg";
        String s = now + "/" +fileName ;
        File f = new File(filePath + s);
        URL u = new URL(photo);
        try {
            FileUtils.copyURLToFile(u, f);
        }catch (Exception e){
            RuntimeCheck.ifTrue(true, "请求异常 , 请稍后再试");
        }

        String file = this.path + s;
        ClSpk spk = new ClSpk();
        spk.setId(genId());
        spk.setWjm(fileName);
        spk.setDz(s);
        spk.setZdbh(mmsi);
        spk.setUrl(file);
        spk.setCjsj(new Date());
        spk.setSplx("50");
        spk.setJgdm(cb.getJgdm());
        spk.setJgmc(cb.getJgmc());
        spk.setCph(cb.getShipname());
        spk.setClId(cb.getClId());
        spkService.save(spk);
        return ApiResponse.success(spk.getUrl());
    }

    @Override
    public ApiResponse<String> lx(String mmsi, String chn, int sec) throws IOException {
        if(sec <= 0){
            sec = 30;
        }
        RuntimeCheck.ifBlank(mmsi, "请选择船舶");
        List<Cb> cbs = findEq(Cb.InnerColumn.mmsi, mmsi);
        RuntimeCheck.ifEmpty(cbs, "未找到船舶信息");
        Cb cb = cbs.get(0);
        if(StringUtils.isBlank(chn)){
            chn = "0";
        }
        RuntimeCheck.ifBlank(cb.getSbh(), "船舶未绑定设备,请先绑定设备");
        int second = DateTime.now().secondOfDay().get();
        int test = WebcamUtil.realVideo(reids, cb.getSbh(), chn, sec, "sh");
        RuntimeCheck.ifFalse(test == 0 , "请求异常 , 请稍后再试");
        String filename = cb.getSbh() + "-" + chn + "-" + System.currentTimeMillis() + ".mp4";
        // 记录当前时间
        reidsUtil.boundValueOps("video_" +mmsi + "_" + cb.getSbh() + "_" + DateTime.now().toString("yyyy-MM-dd") + "_" + chn + "_" + second + "_" + filename).set("1", (sec + 60) , TimeUnit.SECONDS);
        return ApiResponse.success("http://223.240.68.90:9092/video/" + DateTime.now().toString("yyyy-MM-dd" )+ "/"  + filename);
    }

    public static int differentDaysByMillisecond(Date date1, Date date2) {
        int days = (int) ((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
        return days;
    }

}
