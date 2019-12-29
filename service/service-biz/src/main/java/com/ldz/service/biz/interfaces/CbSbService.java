package com.ldz.service.biz.interfaces;

import com.ldz.dao.biz.model.CbSb;
import com.ldz.sys.base.BaseService;
import com.ldz.util.bean.ApiResponse;

public interface CbSbService extends BaseService<CbSb,String> {
    ApiResponse<String> saveEntity(CbSb entity);

    ApiResponse<String> removeEntity(String id);
}
