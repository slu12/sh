package com.ldz.service.biz.impl;

import com.ldz.dao.biz.mapper.CbCdMapper;
import com.ldz.dao.biz.model.CbCd;
import com.ldz.service.biz.interfaces.CbCdService;
import com.ldz.sys.base.BaseServiceImpl;
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
}
