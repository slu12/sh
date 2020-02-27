package com.ldz.dao.biz.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Table(name = "CB_GPS_BD_SB")
public class GpsBdSb {

    @Id
    private String id;

    private Date cjsj;

    @Column(name = "START_GPS")
    private String startGps;

    @Column(name = "END_GPS")
    private String endGps;

    @Column(name = "DEVICE_ID")
    private String deviceId;

    @Column(name = "TIME_BALA")
    private String timeBala;

    @Column(name = "GPS_LS_ID")
    private String gpsLsId;

    @Column(name = "GPS_TIME")
    private String gpsTime;

    public enum InnerColumn{

        id("ID"),
        cjsj("CJSJ"),
        startGps("START_GPS"),
        endGps("END_GPS"),
        deviceId("DEVICE_ID"),
        timeBala("TIME_BALA"),
        gpsLsId("GPS_LS_ID"),
        gpsTime("GPS_TIME");

        private final String column;

        InnerColumn(String column) {
            this.column = column;
        }

        public String value(){
            return this.column;
        }

        public String getValue(){
            return this.column;
        }

        public String asc(){
            return this.column + " asc";
        }

        public String desc(){
            return this.column + " desc";
        }

    }

}
