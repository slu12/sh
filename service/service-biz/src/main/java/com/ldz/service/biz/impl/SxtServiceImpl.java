package com.ldz.service.biz.impl;

import com.ldz.dao.biz.mapper.SxtMapper;
import com.ldz.dao.biz.model.Sxt;
import com.ldz.service.biz.interfaces.SxtService;
import com.ldz.sys.base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.common.Mapper;

@Service
public class SxtServiceImpl extends BaseServiceImpl<Sxt,String> implements SxtService {

    @Autowired
    private SxtMapper mapper;

    @Override
    protected Mapper<Sxt> getBaseMapper() {
        return mapper;
    }
}
