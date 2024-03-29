package com.ldz.service.biz.interfaces;

import com.alibaba.fastjson.JSONArray;
import com.github.pagehelper.PageInfo;
import com.ldz.dao.biz.model.Cb;
import com.ldz.dao.biz.model.ClGpsLs;
import com.ldz.sys.base.BaseService;
import com.ldz.util.bean.ApiResponse;
import com.ldz.util.bean.Point;

import java.io.IOException;
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

    ApiResponse<String> photo(String mmsi, String chn) throws IOException;

    ApiResponse<String> getHcByApi(String mmsi, String start, String end);

    ApiResponse<String> shipInfo(String mmsi);

    ApiResponse<String[]> getAllChn(String mmsi);

    ApiResponse<JSONArray> getHistoryVoyage(String mmsi, String start, String end);

    ApiResponse<JSONArray> getHistoryTrack(String mmsi, String start, String end);

    ApiResponse<Map<String, String>> getCurrentVoyage(String mmsi);

    ApiResponse<String[]> getAllChnH5(String mmsi);

    ApiResponse<String> unbindWebcam(String mmsi);

    ApiResponse<String[]> photos(String sbh) throws IOException;

    ApiResponse<List<Point>> newXc(String mmsi, String start, String end);

    ApiResponse<PageInfo<Map<String, String>>> getCbs(String mmsi, String shipname, String cond, int pageNum, int pageSize);

    ApiResponse<String> zp(String mmsi, String chn) throws IOException;

    ApiResponse<String> lx(String mmsi, String chn, int sec) throws IOException;

    ApiResponse<List<Map<String, String>>> getCbForDzwl();
}
