package com.ldz.service.biz.interfaces;

import com.ldz.dao.biz.model.CbCd;
import com.ldz.sys.base.BaseService;
import com.ldz.util.bean.ApiResponse;

public interface CbCdService extends BaseService<CbCd,String> {
    ApiResponse<String> saveEntity(CbCd entity);
}
