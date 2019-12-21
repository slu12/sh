package com.ldz.dao.biz.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 船舶信息表
 * @author Lee
 *
 */
@ToString
@Getter
@Setter
@Table(name = "CL_CL")
public class Cb implements Serializable {
    /**
     * 车辆id
     */
    @Id
    @Column(name = "CL_ID")
    private String clId;

    /**
     * 车牌号
     */
    @Column(name = "CPH")
    private String cph;

    /**
     * 机构代码
     */
    @Column(name = "JGDM")
    private String jgdm;
    /**
     * 发动机号
     */
    @Column(name = "FDJH")
    private String fdjh;
    /**
     * 车架号
     */
    @Column(name = "CJH")
    private String cjh;

    /**
     * 机构名称
     */
    @Column(name = "JGMC")
    private String jgmc;

    /**
     * 车型
     */
    @Column(name = "CX")
    private String cx;

    /**
     * 载客量
     */
    @Column(name = "ZKL")
    private Short zkl;

    /**
     * 等级
     */
    @Column(name = "DL")
    private String dl;

    /**
     * 创建时间
     */
    @Column(name = "CJSJ")
    private Date cjsj;

    /**
     * 创建人
     */
    @Column(name = "CJR")
    private String cjr;

    /**
     * 修改时间
     */
    @Column(name = "XGSJ")
    private Date xgsj;

    /**
     * 修改人
     */
    @Column(name = "XGR")
    private String xgr;

    /**
     * 司机id
     */
    @Column(name = "SJ_ID")
    private String sjId;

    /**
     * 司机姓名
     */
    @Column(name = "SJXM")
    private String sjxm;

    /**
     * 状态
     */
    @Column(name = "ZT")
    private String zt;

    /**
     * 图片
     */
    @Column(name = "TP")
    private String tp;

    /**
     * 生产商
     */
    @Column(name = "SCS")
    private String scs;

    /**
     * 型号
     */
    @Column(name = "XH")
    private String xh;

    /**
     * 终端编号
     */
    @Column(name = "ZDBH")
    private String zdbh;
    /**
     * 终端型号
     */
    @Column(name = "ZDXH")
    private String zdxh;
    /**
     * 终端状态
     */
    @Column(name = "ZDZT")
    private String zdzt;

    /**
     * 初次登记日期（注册日期）
     */
    @Column(name = "CCDJRQ")
    private Date ccdjrq;

    /**
     * 车队编号
     */
    @Column(name = "CDBH")
    private String cdbh;

    /**
     * 保险公司名称
     */
    @Column(name = "BXGSMC")
    private String bxgsmc;

    /**
     * 保险时间
     */
    @Column(name = "BXSJ")
    private Date bxsj;

    /**
     * 年审时间
     */
    @Column(name = "NSSJ")
    private Date nssj;
    /**
     * OBD编号
     */
    @Column(name = "OBD_CODE")
    private String obdCode;

    /**
     * MMSI
     */
    @NotNull(message = "MMSI不能为空")
    private String mmsi;

    /**
     * 船名
     */
    @NotNull(message = "船舶名称不能为空")
    private String shipname;

    /**
     * 呼号
     */
    private String callsign;

    /**
     * IMO
     */
    private String imo;

    /**
     * 船类型
     */
    @NotNull(message = "船类型不能为空")
    private String shiptype;

    /**
     * 船类型名称
     */
    @NotNull(message = "船类型名称不能为空")
    private String shiptypename;

    /**
     * 长度
     */
    @NotNull(message = "长度不能为空")
    private String length;

    /**
     * 宽度
     */
    @NotNull(message = "宽度不能为空")
    private String breadth;

    /**
     * 预到时间
     */
    private String eta;

    /**
     * 目的地
     */
    private String dest_port;

    /**
     * 吃水
     */
    private String draught;

    /**
     * 船籍
     */
    @NotNull(message = "船籍不能为空")
    private String nationality;

    /**
     * 型深
     */
    private String xs;

    /**
     * 船舶识别号
     */
    private String cbsbh;

    /**
     * 登记号码
     */
    private String djhm;

    /**
     * 总吨位
     */
    private String zdw;

    /**
     * 净吨
     */
    private String jd;

    /**
     * 主机种类
     */
    private String zjzl;

    /**
     * 主机数量
     */
    private String zjsl;

    /**
     * 主机总功率
     */
    private  String zjgl;

    /**
     * 造船厂
     */
    private String zcc;

    /**
     * 建成日期
     */
    private String jcrq;

    /**
     * 设备号
     */
    private String sbh;

    /**
     * 航向
     */
    private String hx;

    /**
     * 航速
     */
    private String hs;

    /**
     * 定位坐标
     */
    private String dwzb;

    /**
     * 定位时间
     */
    private String dwsj;

    /**
     * 在线状态
     */
    @Transient
    private String zxzt;


    /*
      * 车辆电子围栏中间关联表
     */
     @Transient
    private List<ClDzwlCl> clDzwlCl;
    /*
     *电子围栏表
     */
    @Transient
    private List<ClDzwl> clDzwl;

	private static final long serialVersionUID = 1L;

    public enum InnerColumn {
        clId("CL_ID"),
        cph("CPH"),
        jgdm("JGDM"),
        jgmc("JGMC"),
        cx("CX"),
        zkl("ZKL"),
        dl("DL"),
        cjsj("CJSJ"),
        cjr("CJR"),
        xgsj("XGSJ"),
        xgr("XGR"),
        sjId("SJ_ID"),
        sjxm("SJXM"),
        zt("ZT"),
        tp("TP"),
        scs("SCS"),
        xh("XH"),
        zdbh("ZDBH"),
        ccdjrq("CCDJRQ"),
        cdbh("CDBH"),
        bxgsmc("BXGSMC"),
        bxsj("BXSJ"),
        nssj("NSSJ"),
        mmsi("MMSI"),
        shipname("SHIPNAME"),
        callsign("CALLSIGN"),
        imo("IMO"),
        shiptype("SHIPTYPE"),
        shiptypename("SHIPTYPENAME"),
        length("LENGTH"),
        breadth("BREADTH"),
        eta("ETA"),
        dest_port("DEST_PORT"),
        draught("DRAUGHT"),
        nationality("NATIONALITY"),
        sbh("SBH");

        private final String column;

        public String value() {
            return this.column;
        }

        public String getValue() {
            return this.column;
        }

        InnerColumn(String column) {
            this.column = column;
        }

        public String desc() {
            return this.column + " DESC";
        }

        public String asc() {
            return this.column + " ASC";
        }
    }
}
