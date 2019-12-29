package com.ldz.biz.controller;

import com.ldz.dao.biz.model.CbSb;
import com.ldz.service.biz.interfaces.CbSbService;
import com.ldz.sys.base.BaseController;
import com.ldz.sys.base.BaseService;
import com.ldz.util.bean.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cbsb")
public class CbSbCtrl extends BaseController<CbSb,String> {

    @Autowired
    private CbSbService service;

    @Override
    protected BaseService<CbSb, String> getBaseService() {
        return service;
    }

    @PostMapping("/save")
    public ApiResponse<String> save(CbSb entity){
        return service.saveEntity(entity);
    }

    @RequestMapping("/remove/{id}")
    public ApiResponse<String> remove(@PathVariable("id") String id){
        return service.removeEntity(id);
    }

}
