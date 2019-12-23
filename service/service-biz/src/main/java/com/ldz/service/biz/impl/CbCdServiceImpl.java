package com.ldz.service.biz.impl;

import com.ldz.dao.biz.mapper.CbCdMapper;
import com.ldz.dao.biz.model.CbCd;
import com.ldz.service.biz.interfaces.CbCdService;
import com.ldz.sys.base.BaseServiceImpl;
import com.ldz.sys.base.LimitedCondition;
import com.ldz.sys.model.SysYh;
import com.ldz.util.bean.ApiResponse;
import com.ldz.util.commonUtil.DateUtils;
import com.ldz.util.exception.RuntimeCheck;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.common.Mapper;

@Service
public class CbCdServiceImpl extends BaseServiceImpl<CbCd,String> implements CbCdService {

    @Autowired
    private CbCdMapper mapper;

    @Override
    protected Mapper<CbCd> getBaseMapper() {
        return mapper;
    }

    @Override
    public ApiResponse<String> saveEntity(CbCd entity) {
        SysYh user = getCurrentUser();
        RuntimeCheck.ifBlank(entity.getJson(), "请选择条件集");
        RuntimeCheck.ifBlank(entity.getType(), "请选择属性");
        entity.setCjr(user.getZh() + "-" + user.getXm());
        entity.setCjsj(DateUtils.getNowTime());
        entity.setId(genId());
        if(StringUtils.equals(entity.getType(), "1")){
            entity.setYhId(user.getYhid());
        }
        save(entity);
        return ApiResponse.success();
    }

    @Override
    public boolean fillPagerCondition(LimitedCondition condition) {
        SysYh user = getCurrentUser();
        condition.and().andCondition(" (yh_id =  '" + user.getYhid() + "' and type = '1') or type = '0' ");
        return true;
    }
}
