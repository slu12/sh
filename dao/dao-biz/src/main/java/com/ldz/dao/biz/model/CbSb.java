package com.ldz.dao.biz.model;


import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "CB_SB")
@Data
public class CbSb {

    @Id
    private String sbh;

    private String chns;

    private String cjsj;

    private String cjr;

    public enum InnerColumn{
        sbh("SBH"),
        chns("CHNS"),
        cjsj("CJSJ"),
        cjr("CJR");

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

        public String desc(){
            return this.column + " desc";
        }

        public String asc(){
            return this.column + " asc";
        }

    }
}
