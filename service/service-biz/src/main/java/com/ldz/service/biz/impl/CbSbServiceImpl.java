package com.ldz.service.biz.impl;

import com.ldz.dao.biz.mapper.CbSbMapper;
import com.ldz.dao.biz.model.Cb;
import com.ldz.dao.biz.model.CbSb;
import com.ldz.service.biz.interfaces.CbSbService;
import com.ldz.service.biz.interfaces.CbService;
import com.ldz.sys.base.BaseServiceImpl;
import com.ldz.util.bean.ApiResponse;
import com.ldz.util.commonUtil.WebcamUtil;
import com.ldz.util.exception.RuntimeCheck;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scripting.bsh.BshScriptEvaluator;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.common.Mapper;

import javax.xml.ws.Action;
import java.util.List;
import java.util.Map;

@Service
public class CbSbServiceImpl extends BaseServiceImpl<CbSb,String> implements CbSbService {

    @Autowired
    private CbSbMapper mapper;
    @Autowired
    private StringRedisTemplate reids;
    @Autowired
    private CbService cbService;


    @Override
    protected Mapper<CbSb> getBaseMapper() {
        return mapper;
    }

    @Override
    public ApiResponse<String> saveEntity(CbSb entity) {
        RuntimeCheck.ifBlank(entity.getSbh(), "请输入设备号");
        CbSb sb = findById(entity.getSbh());
        RuntimeCheck.ifTrue(sb != null, "此设备已经添加， 请勿重复添加");
        Map<String, String> allSbh = WebcamUtil.getAllSbh(reids);
        RuntimeCheck.ifFalse(allSbh.containsKey(entity.getSbh()), "当前设备号没有添加 , 请先添加当前设备号");
        String chns = allSbh.get(entity.getSbh());
        String ch = chns.replaceAll("CH", "");
        entity.setChns(ch);
        save(entity);
        return ApiResponse.saveSuccess();
    }

    @Override
    public ApiResponse<String> removeEntity(String id) {
        RuntimeCheck.ifBlank(id, "请选择要删除的设备");
        List<Cb> cbs = cbService.findEq(Cb.InnerColumn.sbh, id);
        if(CollectionUtils.isNotEmpty(cbs)){
            Cb cb = cbs.get(0);
            RuntimeCheck.ifTrue(CollectionUtils.isNotEmpty(cbs), "此设备已经绑定了船舶" + cb.getShipname() + ", 请先解除绑定");
        }
        remove(id);
        return ApiResponse.deleteSuccess();
    }
}
