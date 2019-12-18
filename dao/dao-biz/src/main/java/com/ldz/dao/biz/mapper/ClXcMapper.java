package com.ldz.dao.biz.mapper;

import com.ldz.dao.biz.model.ClGpsLs;
import com.ldz.dao.biz.model.ClXc;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

public interface ClXcMapper extends Mapper<ClXc> {

    // 删除 某个终端编号某段时间的行程
    @Delete(" delete from CL_XC where CL_ZDBH = #{zdbh} and XC_KSSJ >= #{startTime} and XC_KSSJ <= #{endTime}")
    void delXc(@Param("zdbh")String zdbh, @Param("startTime") String startTime, @Param("endTime") String endTime);

    @Select(" select * from cl_gpsls where zdbh = #{zdbh} and cjsj >= str_to_date(#{time}, '%Y-%m-%d %H:%i:%s') order by cjsj asc,id asc limit 1")
    ClGpsLs getStart(@Param("zdbh") String zdbh,@Param("time") String time);


    @Select(" select * from cl_gpsls where zdbh = #{zdbh} and cjsj <= str_to_date(#{time}, '%Y-%m-%d %H:%i:%s') order by cjsj desc,id desc limit 1")
    ClGpsLs getEnd(@Param("zdbh") String zdbh,@Param("time") String time);

}