package com.ldz.service.biz.impl;

import com.github.pagehelper.PageInfo;
import com.ldz.dao.biz.mapper.ClDzwlClMapper;
import com.ldz.dao.biz.mapper.ClDzwlMapper;
import com.ldz.dao.biz.mapper.ZdYhMapper;
import com.ldz.dao.biz.model.*;
import com.ldz.service.biz.interfaces.CbService;
import com.ldz.service.biz.interfaces.ClYhService;
import com.ldz.service.biz.interfaces.DzwlClService;
import com.ldz.service.biz.interfaces.DzwlService;
import com.ldz.sys.base.BaseServiceImpl;
import com.ldz.sys.base.LimitedCondition;
import com.ldz.sys.constant.Dict;
import com.ldz.util.exception.RuntimeCheck;
import com.ldz.sys.model.SysJg;
import com.ldz.sys.model.SysYh;
import com.ldz.sys.service.JgService;
import com.ldz.util.bean.ApiResponse;
import com.ldz.util.bean.SimpleCondition;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.common.Mapper;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DzwlServiceImpl extends BaseServiceImpl<ClDzwl, String> implements DzwlService {
	@Autowired
	private ClDzwlMapper entityMapper;
	@Autowired
	private JgService jgService;
	@Autowired
	private CbService clService;
	@Autowired
	private ClDzwlClMapper dzwlClMapper;
	@Autowired
	private ClYhService yhService;
	@Autowired
    private ZdYhMapper zdYhMapper;
	@Autowired
	private DzwlClService dzwlClService;
	@Autowired
	private DzwlService dzwlService;

	@Override
	protected Mapper<ClDzwl> getBaseMapper() {
		return entityMapper;
	}

	@Override
	protected Class<?> getEntityCls() {
		return ClDzwl.class;
	}

	@Override
	public ApiResponse<String> saveEntity(ClDzwl entity) {
		SysYh user = getCurrentUser();
		SysJg org = jgService.findByOrgCode(user.getJgdm());
		Date now = new Date();
		// String wlmc = entity.getWlmc();
		// RuntimeCheck.ifTrue(ifExists("wlmc",wlmc),"围栏名称已存在");
		entity.setCjr(getOperateUser());
		entity.setCjsj(now);
		entity.setId(genId());
		entity.setJgdm(user.getJgdm());
		entity.setJgmc(org.getJgmc());
		entity.setZt(Dict.CommonStatus.VALID.getCode());
				save(entity);
		return ApiResponse.success(entity.getId());
	}

	@Override
	public ApiResponse<String> updateEntity(ClDzwl entity) {
		ClDzwl oldRecord = findById(entity.getId());
		RuntimeCheck.ifNull(oldRecord, "记录不存在");
		String wlmc = entity.getWlmc();
		if (oldRecord.getWlmc() != null && !oldRecord.getWlmc().equals(entity.getWlmc())) {
			RuntimeCheck.ifTrue(ifExists("wlmc", wlmc), "围栏名称已存在");
		}
		entity.setXgr(getOperateUser());
		entity.setXgsj(new Date());
		update(entity);
		return ApiResponse.success();
	}

	/**
	 * 设置车辆电子围栏
	 *
	 * @param clId
	 * @param wlIds
	 * @return
	 */
	@Override
	public ApiResponse<String> setCarDzwl(String clId, List<String> wlIds) {
		RuntimeCheck.ifBlank(clId, "车辆id不能为空");
		Cb car = clService.findById(clId);
		RuntimeCheck.ifNull(car, "未找到车辆");

		SimpleCondition condition = new SimpleCondition(ClDzwlCl.class);
		condition.eq(ClDzwlCl.InnerColumn.clId, clId);
		dzwlClMapper.deleteByExample(condition);

		for (String wlId : wlIds) {
			ClDzwlCl dzwlCl = new ClDzwlCl();
			dzwlCl.setClId(clId);
			dzwlCl.setWlId(wlId);
			dzwlClMapper.insertSelective(dzwlCl);
		}
		return ApiResponse.success();
	}

	@Override
	public ApiResponse<String> setCarsDzwl(String carIds, String wlid, String mmsi) {
		if (StringUtils.isBlank(carIds) && StringUtils.isBlank(mmsi)) {
			dzwlService.remove(wlid);
			return ApiResponse.fail("请选择船舶");
		}
		RuntimeCheck.ifBlank(wlid, "请选择围栏");
		List<Cb> carList;
		Date now = new Date();
		String creator = getOperateUser();
		if(StringUtils.isNotBlank(carIds)){
			List<String> carIdList = Arrays.asList(carIds.split(","));

			carList = clService.findIn(Cb.InnerColumn.clId,carIdList);
			Map<String, Cb> carMap = carList.stream().collect(Collectors.toMap(Cb::getClId, p->p));
			for (String s : carIdList) {
				ClDzwlCl dzwlCl = new ClDzwlCl();
				dzwlCl.setCjr(creator);
				dzwlCl.setCjsj(now);
				dzwlCl.setClId(s);
				dzwlCl.setWlId(wlid);
				dzwlCl.setId(genId());
				Cb car = carMap.get(s);
				if (car != null){
					dzwlCl.setCph(car.getShipname());
				}
				dzwlClMapper.insertSelective(dzwlCl);
			}
		}else {

			carList = clService.findEq(Cb.InnerColumn.mmsi,mmsi);
			RuntimeCheck.ifEmpty(carList, "未找到船舶信息");
			Cb cb = carList.get(0);
			ClDzwlCl dzwlCl = new ClDzwlCl();
			dzwlCl.setCjr(creator);
			dzwlCl.setCjsj(now);
			dzwlCl.setClId(cb.getClId());
			dzwlCl.setWlId(wlid);
			dzwlCl.setId(genId());
			dzwlCl.setCph(cb.getShipname());
			dzwlClMapper.insertSelective(dzwlCl);
		}

		// 删除旧数据
		/*SimpleCondition condition = new SimpleCondition(ClDzwlCl.class);
		condition.in(ClDzwlCl.InnerColumn.clId,carIdList);
		dzwlClMapper.deleteByExample(condition);*/


		return ApiResponse.success();
	}

	@Override
    public boolean fillPagerCondition(LimitedCondition condition){
        HttpServletRequest requset = getRequset();
		String userId = requset.getHeader("user_id");
        if (userId != null){
            SimpleCondition simpleCondition = new SimpleCondition(ClZdYh.class);
            simpleCondition.eq(ClZdYh.InnerColumn.userId,userId);
            List<ClZdYh> clZdYhs = zdYhMapper.selectByExample(simpleCondition);
            if(CollectionUtils.isNotEmpty(clZdYhs)){
                List<String> collect = clZdYhs.stream().map(ClZdYh::getDeviceId).collect(Collectors.toList());
                SimpleCondition clCondition = new SimpleCondition(Cb.class);
                clCondition.in(Cb.InnerColumn.zdbh,collect);
                List<Cb> cls = clService.findByCondition(clCondition);
                if(CollectionUtils.isNotEmpty(cls)){
                    List<String> list = cls.stream().map(Cb::getClId).collect(Collectors.toList());
                    SimpleCondition dzwlCon = new SimpleCondition(ClDzwlCl.class);
                    dzwlCon.in(ClDzwlCl.InnerColumn.clId,list);
                    List<ClDzwlCl> dzwlCls = dzwlClMapper.selectByExample(dzwlCon);
                    if(CollectionUtils.isNotEmpty(dzwlCls)){
                        List<String> wlIds = dzwlCls.stream().map(ClDzwlCl::getWlId).collect(Collectors.toList());
                        if(CollectionUtils.isNotEmpty(wlIds)){
                            condition.in(ClDzwl.InnerColumn.id,wlIds);
                        }else {
                        	return false;
						}
                    }else {
                    	return false;
					}

                }else {
                	return false;
				}

            }else {
            	return false;
			}

        }
		String mmsi = getRequestParamterAsString("mmsi");
        if(StringUtils.isNotBlank(mmsi)){
			List<Cb> cbs = clService.findLike(Cb.InnerColumn.mmsi, mmsi);
			if(CollectionUtils.isEmpty(cbs)){
				return false;
			}
			List<String> collect = cbs.stream().map(Cb::getClId).collect(Collectors.toList());
			if(CollectionUtils.isEmpty(collect)){
				return false;
			}
			List<ClDzwlCl> cls = dzwlClService.findIn(ClDzwlCl.InnerColumn.clId, collect);
			if(CollectionUtils.isEmpty(cls)){
				return false;
			}
			List<String> list = cls.stream().map(ClDzwlCl::getWlId).collect(Collectors.toList());
			if(CollectionUtils.isEmpty(list)){
				return false;
			}
			condition.in(ClDzwl.InnerColumn.id, list);
		}
		return true;
    }

	@Override
	public ApiResponse<ClDzwl> getByCarId(String clId) {
		RuntimeCheck.ifBlank(clId,"请选择车辆");
		SimpleCondition condition = new SimpleCondition(ClDzwlCl.class);
		condition.eq(ClDzwlCl.InnerColumn.clId,clId);
		List<ClDzwlCl> dzwlClList = dzwlClMapper.selectByExample(condition);
		if (dzwlClList.size() == 0)return new ApiResponse<>();
		ClDzwl dzwl = findById(dzwlClList.get(0).getWlId());
		return ApiResponse.success(dzwl);
	}

	@Override
	public ApiResponse<String> saveAppEntity(ClDzwl entity, String clIds) {

		Date now = new Date();
		HttpServletRequest requset = getRequset();
		String userId = requset.getHeader("user_id");
		ClYh yh = yhService.findById(userId);
		if(StringUtils.isNotBlank(yh.getJgdm())){
			entity.setJgdm(yh.getJgdm());
			SysJg sysJg = jgService.findByOrgCode(yh.getJgdm());
			if(sysJg != null){
				entity.setJgmc(sysJg.getJgmc());
			}
		}else {
			entity.setJgdm("100");
		}
		entity.setCjr(yh.getUsername());
		entity.setCjsj(now);
		entity.setId(genId());
		entity.setYhId(yh.getId());
		entity.setZt(Dict.CommonStatus.VALID.getCode());
//		entityMapper.insertSelective(entity);
		save(entity);
		if(org.apache.commons.lang3.StringUtils.isNotBlank(clIds)){
			setCarsDzwl(clIds,entity.getId(),"");
		}
		return ApiResponse.success(entity.getId());
	}

	@Override
	public void afterPager(PageInfo<ClDzwl> pageInfo){
		if(CollectionUtils.isEmpty(pageInfo.getList())){
			return;
		}
		List<ClDzwl> dzwls = pageInfo.getList();
		dzwls.forEach(clDzwl -> {
			SimpleCondition simpleCondition = new SimpleCondition(ClDzwlCl.class);
			simpleCondition.eq(ClDzwlCl.InnerColumn.wlId,clDzwl.getId());
			List<ClDzwlCl> cls = dzwlClMapper.selectByExample(simpleCondition);
			if(CollectionUtils.isNotEmpty(cls)){
				List<String> ids = cls.stream().map(ClDzwlCl::getClId).collect(Collectors.toList());
				SimpleCondition clCondition = new SimpleCondition(Cb.class);
				clCondition.in(Cb.InnerColumn.clId,ids);
				List<Cb> clCls = clService.findByCondition(clCondition);
				clDzwl.setCls(clCls);
			}
		});
	}

	@Override
	public List<ClDzwl> queryApp(ClDzwl entity) {
		getQueryCondition();
		HttpServletRequest requset = getRequset();
		String userId = requset.getHeader("user_id");
		LimitedCondition condition = getQueryCondition();
		condition.eq(ClDzwl.InnerColumn.yhId,userId);
		List<ClDzwl> dzwls = findByCondition(condition);
		if(CollectionUtils.isNotEmpty(dzwls)){
			dzwls.forEach(clDzwl -> {
				SimpleCondition simpleCondition = new SimpleCondition(ClDzwlCl.class);
				simpleCondition.eq(ClDzwlCl.InnerColumn.wlId,clDzwl.getId());
				List<ClDzwlCl> cls = dzwlClMapper.selectByExample(simpleCondition);
				if(CollectionUtils.isNotEmpty(cls)){
					List<String> ids = cls.stream().map(ClDzwlCl::getClId).collect(Collectors.toList());
					SimpleCondition clCondition = new SimpleCondition(Cb.class);
					clCondition.in(Cb.InnerColumn.clId,ids);
					List<Cb> clCls = clService.findByCondition(clCondition);
					clDzwl.setCls(clCls);
				}
			});
		}

		return dzwls;
	}

	@Override
	public void removeEntity(String id) {
		remove(id);
		SimpleCondition condition = new SimpleCondition(ClDzwlCl.class);
		condition.eq(ClDzwlCl.InnerColumn.wlId,id);
		dzwlClMapper.deleteByExample(condition);
	}
}
