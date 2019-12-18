package com.ldz.biz.controller;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ldz.dao.biz.bean.WebsocketInfo;
import com.ldz.dao.biz.model.Cb;
import com.ldz.dao.biz.model.ClGpsLs;
import com.ldz.service.biz.interfaces.CbService;
import com.ldz.service.biz.interfaces.GpsService;
import com.ldz.sys.base.BaseController;
import com.ldz.sys.base.BaseService;
import com.ldz.sys.model.SysYh;
import com.ldz.util.bean.ApiResponse;
import com.ldz.util.commonUtil.WebcamUtil;
import com.ldz.util.gps.Gps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * 船舶设定
 */
@RestController
@RequestMapping("api/cl")
public class CbCtrl extends BaseController<Cb, String> {
	@Autowired
	private CbService clservice;
	@Autowired
	private GpsService gpsservice;
	@Autowired
	private StringRedisTemplate redis;

	@RequestMapping("getOrgCarList")
	public ApiResponse<List<Cb>> getOrgCarList() {
		SysYh yh = getCurrentUser();
		List<Cb> carList = clservice.getOrgCarList(yh.getJgdm());
		return ApiResponse.success(carList);
	}

	@RequestMapping("bindDriver")
	public ApiResponse<String> bindDriver(String carId,String driverId){
		return clservice.bindDriver(carId,driverId);
	}
	@RequestMapping("bindDevice")
	public ApiResponse<String> bindDevice(String carId,String devcieId){
		return clservice.bindDevice(carId,devcieId);
	}


	@RequestMapping("unbindDevice")
	public ApiResponse<String> unbindDevice(String carId){
		return clservice.unbindDevice(carId);
	}
	@RequestMapping("unbindDriver")
	public ApiResponse<String> unbindDriver(String carId){
		return clservice.unbindDriver(carId);
	}
	@Override
	protected BaseService<Cb, String> getBaseService() {
		return clservice;
	}

	@RequestMapping(value = "/update", method = { RequestMethod.POST })
	public ApiResponse<String> update(@Valid Cb entity) {
		return clservice.updateEntity(entity);
	}

	@RequestMapping(value = "/save", method = { RequestMethod.POST })
	public ApiResponse<String> save(@Valid Cb entity) {
		return clservice.saveEntity(entity);
	}

	@GetMapping("/InitClGps")
	public ApiResponse<List<WebsocketInfo>> inintGps() {
		return gpsservice.inintGps();
	}

	/**
	 * 车辆类型统计
	 * 电子围栏，返回左边目录树 车辆类型统计
	 *[{"children":[{"mapCen":{"lat":30.554572,"lng":114.378443},"title":"鄂A123456"},{"mapCen":{"lat":30.564572,"lng":114.278443},"title":"鄂A123457"}],"expand":true,"title":"公务车"},{"children":[{"mapCen":{"lat":30.554562,"lng":114.378553},"title":"鄂B655552"},{"mapCen":{"lat":30.554372,"lng":114.378233},"title":"鄂A129957"}],"expand":true,"title":"校巴"}]
	 * 车辆类别(大车、小车)
	 * --车牌号
	 * -------车辆GPS坐标
	 * @param zxzt 在线状态 00:查询在线车辆，00点火 10 熄火 20离线
	 * @return
	 */

	@GetMapping("/getcltj")
	public ApiResponse<List<Map<String,Object>>> getVehicleTypeStatistics(String zxzt) {
		return clservice.getVehicleTypeStatistics(zxzt);
	}

	@GetMapping("/nianshen")
	public ApiResponse<List<Cb>> nianshen(Cb car){

		return clservice.nianshen(car);

	}

	/**
	 *安全驾驶统计（返回图表所需的数据结构）
	 * @param days
	 * @return
	 */
	@RequestMapping("carAccStatistics")
	public ApiResponse<Map<String,Object>> carAccStatistics(Integer days,String type){
		return clservice.carAccStatistics(days,type);
	}

    /*
     * 获取年审饼图 30/60/90天
     */
	@GetMapping("/nianshenbt")
	public ApiResponse<Map<String, Integer>> getnianshen(){

		return clservice.getnianshen();
	}

	/**
	 * 绑定摄像头设备
	 */
	@PostMapping("/bindWebcam")
	public ApiResponse<String> bindWebcam(String mmsi, String sbh){
		 return clservice.bindWebcam(mmsi, sbh);
	}

	/**
	 * 获取船的航次信息
	 */
	@PostMapping("/getXc")
	public ApiResponse<String> getXc(String mmsi, String start, String end, @RequestParam(defaultValue = "1") int pageNum, @RequestParam(defaultValue = "8") int pageSize){
		return clservice.getXc(mmsi,start,end,pageNum, pageSize);
	}

	/**
	 * 根据航次信息 , 查询航班的GPS 点 (传终端编号 或 mmsi)
	 * @param start
	 * @param end
	 * @return
	 */
	@PostMapping("/getXcGps")
	public ApiResponse<List<ClGpsLs>> getXcGpsByMMSI(String zdbh, String start, String end){
		return clservice.getXcGpsByMMSI(zdbh,start,end);
	}

	/**
	 * 船舶实时抓拍显示
	 */
	@PostMapping("/photo")
	public ApiResponse<String> photo(String mmsi, String chn){
		return clservice.photo(mmsi,chn);
	}

	/**
	 * 获取会话
	 */
	@PostMapping("/getSession")
	public ApiResponse<String> getSession(){
		return  ApiResponse.success(WebcamUtil.login(redis));
	}

	/**
	 * 通过api获取轮船的 航次信息
	 * @return
	 */
	public ApiResponse<String> getHcByApi(String mmsi, String start, String end){
		return clservice.getHcByApi(mmsi, start, end);
	}

	/**
	 * 实时Gps 点
	 */
	@GetMapping("/shipInfo")
	public ApiResponse<String> shipInfo(String mmsi){
		return clservice.shipInfo(mmsi);
	}


}