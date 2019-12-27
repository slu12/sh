package com.ldz.dao.biz.mapper;

import com.ldz.dao.biz.bean.ClClModel;
import com.ldz.dao.biz.model.Cb;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;
import java.util.Map;

//@CacheNamespace(implementation=MybatisRedisCache.class, eviction=FifoCache.class)
public interface ClClMapper extends Mapper<Cb> {
	/*
	 * 通过车辆终端id找到对应的电子围栏
	 */
	Cb seleByZdbh(String deviceId);

	/*
	 * 通过车辆id集合获取车俩信息
	 *
	 */
	List<Cb> getAllClInfo(List<String> list);

	@Select("SELECT GPS.BDJD,GPS.BDWD,CL.*,CL.CL_ID AS CLID,CL.SJ_ID AS SJID ,CL.OBD_CODE AS OBDCODE " +
			"  , IFNULL((SELECT XM.ZDMC FROM SYS_ZDXM XM WHERE XM.ZDLMDM='ZDCLK0019' AND  XM.ZDDM=CL.CX limit 1),'') AS CXZTMC " +
			"FROM CL_CL CL,CL_GPS GPS " +
			"WHERE CL.ZDBH=GPS.ZDBH " +
			" AND CL.JGDM LIKE '${jgdm}%' " +
			"ORDER BY CL.CX ASC,CL.CPH ASC ")
	List<ClClModel> getVehicleTypeStatistics(@Param("jgdm") String jgdm);

	@Select("SELECT GPS.BDJD,GPS.BDWD,CL.*,CL.CL_ID AS CLID,CL.SJ_ID AS SJID ,CL.OBD_CODE AS OBDCODE " +
			"  , IFNULL((SELECT XM.ZDMC FROM SYS_ZDXM XM WHERE XM.ZDLMDM='ZDCLK0019' AND  XM.ZDDM=CL.CX  limit 1),'') AS CXZTMC " +
			"FROM CL_CL CL,CL_GPS GPS,CL_ZDGL ZDGL " +
			"WHERE CL.ZDBH=GPS.ZDBH " +
			"  AND CL.ZDBH=ZDGL.ZDBH" +
			" AND CL.JGDM LIKE '${jgdm}%' " +
			" AND ZDGL.ZXZT= ${zxzt} " +
			"ORDER BY CL.CX ASC,CL.CPH ASC ")
	List<ClClModel> getVehicleTypeZxztStatistics(@Param("jgdm") String jgdm,@Param("zxzt") String zxzt);

	@Select(" SELECT CL.*,CL.CL_ID AS CLID FROM CL_CL CL " +
			" WHERE CL.ZT='00' AND CL.SJ_ID IS NOT NULL " +
			" AND CL.CX=#{cx} " +
			" AND CL.CL_ID NOT IN (SELECT PB.CL_ID FROM CL_PB PB WHERE PB.XL_ID=#{xlId} AND PB.PBSJ=STR_TO_DATE(#{date},'%Y-%m-%d'))" +
			" ORDER BY CL.CJSJ DESC ,CL.CPH DESC" +
			"")
	List<ClClModel> getAllNotPbClList(@Param("xlId")String xlId, @Param("date") String date,@Param("cx")String cx);

	@Update("update cl_cl  set sbh = null where mmsi = #{mmsi}")
    void unbindWebcam(@Param("mmsi") String mmsi);

	@Select(" select shipname,mmsi from cl_cl")
    List<Map<String,String>> getCbs();
}
