package com.ldz.job.job.webcam;

import com.alibaba.fastjson.JSON;
import com.ldz.dao.biz.mapper.CbCdMapper;
import com.ldz.dao.biz.mapper.ClClMapper;
import com.ldz.dao.biz.mapper.ClGpsLsMapper;
import com.ldz.dao.biz.mapper.ClGpsMapper;
import com.ldz.dao.biz.model.Cb;
import com.ldz.dao.biz.model.ClGps;
import com.ldz.dao.biz.model.ClGpsLs;
import com.ldz.util.bean.SimpleCondition;
import com.ldz.util.bean.WebcamBean;
import com.ldz.util.commonUtil.SnowflakeIdWorker;
import com.ldz.util.commonUtil.WebcamUtil;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// 在成功执行了job类的execute方法后,更新JobDetail中JobDataMap的数据
@PersistJobDataAfterExecution
// 等待上一次任务执行完成，才会继续执行新的任务
@DisallowConcurrentExecution
@Log4j2
public class UpdateGps implements Job {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private ClClMapper clMapper;
    @Autowired
    private ClGpsMapper gpsMapper;
    @Autowired
    private SnowflakeIdWorker idWorker;
    @Autowired
    private ClGpsLsMapper gpsLsMapper;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {

        SimpleCondition condition = new SimpleCondition(Cb.class);
        condition.and().andCondition(" sbh is not null or sbh != null ");
        List<Cb> cbs = clMapper.selectByExample(condition);
        log.info("cbs-->" + JSON.toJSONString(cbs));
        if(CollectionUtils.isEmpty(cbs)){
            return;
        }
        List<String> sbhs = cbs.stream().map(Cb::getSbh).collect(Collectors.toList());
        String list = cbs.stream().map(Cb::getSbh).collect(Collectors.joining(","));
        List<WebcamBean> beans = WebcamUtil.getGps(list, redisTemplate);
        log.info("beans --> " + JSON.toJSONString(beans));
        if(CollectionUtils.isEmpty(beans)){
            return;
        }
        condition = new SimpleCondition(ClGps.class);
        condition.in(ClGps.InnerColumn.zdbh, sbhs);
        List<ClGps> gps = gpsMapper.selectByExample(condition);
        log.info("gps --> " + JSON.toJSONString(gps));
        Map<String, ClGps> collect = gps.stream().collect(Collectors.toMap(ClGps::getZdbh, p -> p));
        for (WebcamBean webcamBean : beans) {
            String ps = webcamBean.getPs();
            String[] split = ps.split(",");
            if(StringUtils.equals(split[0], "0")){
                continue;
            }
            String sbh = webcamBean.getId();
            if (collect.containsKey(sbh)) {
                ClGps clGps = collect.get(sbh);
                clGps.setJd(new BigDecimal(split[1]));
                clGps.setWd(new BigDecimal(split[0]));
                clGps.setCjsj(new Date());
                clGps.setYxsd(webcamBean.getSp() + "");
                clGps.setFxj(new BigDecimal(webcamBean.getHx()));
                gpsMapper.updateByPrimaryKeySelective(clGps);
                ClGpsLs clGpsLs = new ClGpsLs();
                clGpsLs.setCjsj(new Date());
                clGpsLs.setFxj(new BigDecimal(webcamBean.getHx()));
                clGpsLs.setId(idWorker.nextId() + "");
                clGpsLs.setJd(new BigDecimal(split[1]));
                clGpsLs.setWd(new BigDecimal(split[0]));
                clGpsLs.setYxsd(clGps.getYxsd());
                gpsLsMapper.insert(clGpsLs);
            }else{
                ClGps clGps = new ClGps();
                clGps.setZdbh(webcamBean.getId());
                clGps.setJd(new BigDecimal(split[1]));
                clGps.setWd(new BigDecimal(split[0]));
                clGps.setYxsd(webcamBean.getSp() + "");
                clGps.setFxj(new BigDecimal(webcamBean.getHx()));
                clGps.setCjsj(new Date());
                gpsMapper.insert(clGps);
                ClGpsLs clGpsLs = new ClGpsLs();
                clGpsLs.setCjsj(new Date());
                clGpsLs.setFxj(new BigDecimal(webcamBean.getHx()));
                clGpsLs.setId(idWorker.nextId() + "");
                clGpsLs.setJd(new BigDecimal(split[1]));
                clGpsLs.setWd(new BigDecimal(split[0]));
                clGpsLs.setYxsd(clGps.getYxsd());
                gpsLsMapper.insert(clGpsLs);
            }
        }
    }
}
