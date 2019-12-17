package com.ldz.job.service;

import com.ldz.dao.biz.model.Cb;
import com.ldz.sys.base.BaseService;
import com.ldz.util.bean.ApiResponse;

public interface ClService extends BaseService<Cb, String> {
   
	ApiResponse<String> updateNianshen();
}
