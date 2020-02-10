package com.ldz.dao.biz.mapper;

import com.ldz.dao.biz.model.GpsBd;
import com.ldz.util.mapperprovider.InsertListMapper;
import tk.mybatis.mapper.common.Mapper;

public interface GpsBdMapper extends Mapper<GpsBd> , InsertListMapper<GpsBd> {
}
