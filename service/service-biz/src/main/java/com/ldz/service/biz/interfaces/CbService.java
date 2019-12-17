package com.ldz.service.biz.interfaces;

import com.ldz.dao.biz.model.Cb;
import com.ldz.dao.biz.model.ClGpsLs;
import com.ldz.sys.base.BaseService;
import com.ldz.util.bean.ApiResponse;
import com.ldz.util.gps.Gps;

import java.util.List;
import java.util.Map;

public interface CbService extends BaseService<Cb,String>{
    Cb findByOrgCode(String code);

    List<Cb> getOrgCarList(String orgCode);

    ApiResponse<String> saveEntity(Cb entity);

    ApiResponse<String> updateEntity(Cb entity);

    ApiResponse<List<Map<String,Object>>> getVehicleTypeStatistics(String zxzt);

	ApiResponse<List<Cb>> nianshen(Cb car);

    ApiResponse<Map<String,Object>> carAccStatistics(Integer days,String type);

	//获取当前登陆用户获取车辆年审饼图
	ApiResponse<Map<String, Integer>> getnianshen();

    ApiResponse<String> unbindDevice(String carId);

    ApiResponse<String> unbindDriver(String carId);

    ApiResponse<String> bindDriver(String carId, String driverId);

    ApiResponse<String> bindDevice(String carId, String devcieId);

    ApiResponse<String> bindWebcam(String mmsi, String sbh);

    ApiResponse<String> getXc(String mmsi, String start, String end, int pageNum, int pageSize);

    ApiResponse<List<ClGpsLs>> getXcGpsByMMSI(String mmsi, String start, String end);

}
