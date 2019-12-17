package com.ldz.dao.biz.model;

import lombok.Data;

import javax.persistence.Table;

/**
 * 摄像头设备
 */
@Data
@Table(name = "CB_SXT")
public class Sxt {

    private String id;

    private String mmsi;

    private String sbh;

    private String chn;

    private String cjsj;

    private String cjr;


    public enum InnerColumn{
        id("ID"),
        mmsi("MMSI"),
        sbh("SBH"),
        chn("CHN"),
        cjsj("CJSJ"),
        cjr("CJR");

        private final String column;

        InnerColumn(String column) {
            this.column = column;
        }

        public String value(){
            return this.column;
        }

        public  String getValue(){
            return this.column;
        }

        public String asc(){
            return this.column + "  asc";
        }

        public String desc(){
            return this.column + " desc";
        }


    }
}
