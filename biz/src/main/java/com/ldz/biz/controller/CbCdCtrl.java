package com.ldz.biz.controller;

import com.ldz.dao.biz.model.CbCd;
import com.ldz.service.biz.interfaces.CbCdService;
import com.ldz.sys.base.BaseController;
import com.ldz.sys.base.BaseService;
import com.ldz.util.bean.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cbcd")
public class CbCdCtrl extends BaseController<CbCd,String> {

    @Autowired
    private CbCdService service;

    @Override
    protected BaseService<CbCd, String> getBaseService() {
        return service;
    }

    @PostMapping("/save")
    public ApiResponse<String> save(CbCd entity){
        return service.saveEntity(entity);
    }

}
