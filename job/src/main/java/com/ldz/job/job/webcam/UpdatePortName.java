package com.ldz.job.job.webcam;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ldz.dao.biz.mapper.ClClMapper;
import com.ldz.dao.biz.model.Cb;
import com.ldz.util.commonUtil.HttpUtil;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// 在成功执行了job类的execute方法后,更新JobDetail中JobDataMap的数据
@PersistJobDataAfterExecution
// 等待上一次任务执行完成，才会继续执行新的任务
@DisallowConcurrentExecution
@Log4j2
public class UpdatePortName implements Job {

    @Autowired
    private ClClMapper clMapper;


    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        List<Cb> cbs = clMapper.selectAll();
        if(CollectionUtils.isEmpty(cbs)){
            return;
        }
        String url = "http://223.240.68.90:8091/v1/GetCurrentVoyage";
        cbs.forEach(cb -> {
            Map<String,String> params = new HashMap<>();
            params.put("shipid", cb.getMmsi());
            String res = HttpUtil.get(url, params);
            JSONObject object = JSON.parseObject(res);
            if(StringUtils.equals(object.getString("Status"), "0")){
                JSONObject result = object.getJSONObject("Result");
                cb.setDepartportname(result.getString("departportname"));
                cb.setAnchorportname(result.getString("anchorportname"));
                cb.setArrivingportname(result.getString("arrivingportname"));
                clMapper.updateByPrimaryKeySelective(cb);
            }
        });





    }
}
