package com.ldz.dao.biz.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 车队管理 , 存储用户查询条件
 */
@Table(name = "CB_CD")
@Data
public class CbCd {

    @Id
    private String id;

    @Column(name = "YH_ID")
    private String yhId;

    private String cjsj;

    private String cjr;

    private String json;

    private String type;

    public enum InnerColumn{
        id("ID"),
        yhId("YH_ID"),
        cjsj("CJSJ"),
        cjr("CJR"),
        json("JSON"),
        type("TYPE");

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
