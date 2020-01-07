export default {
    menuTree: [
        {
            "id": "system",
            "pid": "",
            "icon": "md-menu",
            "name": "system",
            "path": "/system",
            "title": "系统管理",
            "children": [
                {
                    "id": "system-user",
                    "pid": "system",
                    "icon": "md-person",
                    "name": "system-user",
                    "path": "/system-user",
                    "title": "用户管理",
                    "children": ""
                }, 
                {
                    "id": "system-role",
                    "pid": "system",
                    "icon": "ios-people",
                    "name": "system-role",
                    "path": "/system-role",
                    "title": "角色管理",
                    "children": ""
                },
                {
                    "id": "system-framework",
                    "pid": "system",
                    "icon": "md-git-network",
                    "name": "system-framework",
                    "path": "/system-framework",
                    "title": "厂商管理",
                    "children": ""
                },
                {
                    "id": "system-dictionary",
                    "pid": "system",
                    "icon": "ios-keypad",
                    "name": "system-dictionary",
                    "path": "/system-dictionary",
                    "title": "字典管理",
                    "children": ""
                },
                {
                    "id": "system-ITSM",
                    "pid": "system",
                    "icon": "ios-briefcase",
                    "name": "system-ITSM",
                    "path": "/system-ITSM",
                    "title": "服务管理",
                    "children": ""
                },
                {
                    "id": "system-function",
                    "pid": "system",
                    "icon": "ios-cog",
                    "name": "system-function",
                    "path": "/system-function",
                    "title": "功能管理",
                    "children": ""
                },
                {
                    "id": "system-daily",
                    "pid": "system",
                    "icon": "ios-create",
                    "name": "system-daily",
                    "path": "/system-daily",
                    "title": "日志管理",
                    "children": ""
                },
                {
                    "id": "system-suggestions",
                    "pid": "system",
                    "icon": "ios-create",
                    "name": "system-suggestions",
                    "path": "/system-suggestions",
                    "title": "意见反馈",
                    "children": ""
                },
                {
                    "id": "system-advertising",
                    "pid": "system",
                    "icon": "ios-aperture",
                    "name": "system-advertising",
                    "path": "/system-advertising",
                    "title": "活动管理",
                    "children": ""
                }
            ]
        }, {
            "id": "VehicleScheduling",
            "pid": "",
            "icon": "ios-cog",
            "name": "VehicleScheduling",
            "path": "/VehicleScheduling",
            "title": "船舶",
            "children": [{
                "id": "vehicle-management",
                "pid": "VehicleScheduling",
                "icon": "ios-car",
                "name": "vehicle-management",
                "path": "/vehicle-management",
                "title": "船舶管理",
                "children": ""
            }, {
                "id": "TemporaryCarManagement",
                "pid": "VehicleScheduling",
                "icon": "ios-stopwatch-outline",
                "name": "TemporaryCarManagement",
                "path": "/TemporaryCarManagement",
                "title": "临时船管理",
                "children": [{
                    "id": "UnitManagement",
                    "pid": "TemporaryCarManagement",
                    "icon": "md-flag",
                    "name": "UnitManagement",
                    "path": "/UnitManagement",
                    "title": "单位管理",
                    "children": ""
                }, {
                    "id": "VehicleManagement",
                    "pid": "TemporaryCarManagement",
                    "icon": "ios-car",
                    "name": "VehicleManagement",
                    "path": "/VehicleManagement",
                    "title": "船舶管理",
                    "children": ""
                }]
            }, {
                "id": "DriverManagement",
                "pid": "VehicleScheduling",
                "icon": "md-person",
                "name": "DriverManagement",
                "path": "/DriverManagement",
                "title": "驾驶员管理",
                "children": ""
            }, {
                "id": "FleetManagement",
                "pid": "VehicleScheduling",
                "icon": "ios-car",
                "name": "FleetManagement",
                "path": "/FleetManagement",
                "title": "船队管理",
                "children": ""
            }, {
                "id": "ElectronicFence",
                "pid": "VehicleScheduling",
                "icon": "ios-globe-outline",
                "name": "ElectronicFence",
                "path": "/ElectronicFence",
                "title": "电子围栏",
                "children": ""
            }, {
                "id": "OverspeedLimit",
                "pid": "VehicleScheduling",
                "icon": "ios-compass",
                "name": "OverspeedLimit",
                "path": "/OverspeedLimit",
                "title": "超速设定",
                "children": ""
            }, {
                "id": "OrderManagement",
                "pid": "VehicleScheduling",
                "icon": "ios-pulse",
                "name": "OrderManagement",
                "path": "/OrderManagement",
                "title": "订单管理",
                "children": [{
                    "id": "Establish",
                    "pid": "OrderManagement",
                    "icon": "ios-clipboard",
                    "name": "Establish",
                    "path": "/Establish",
                    "title": "创建订单",
                    "children": ""
                }, {
                    "id": "ToExamine",
                    "pid": "OrderManagement",
                    "icon": "md-document",
                    "name": "ToExamine",
                    "path": "/ToExamine",
                    "title": "订单审核",
                    "children": ""
                // }, {
                //     "id": "Assignment",
                //     "pid": "OrderManagement",
                //     "icon": "ios-car",
                //     "name": "Assignment",
                //     "path": "/Assignment",
                //     "title": "小车派单",
                //     "children": ""
                }, {
                    "id": "Assignment_max",
                    "pid": "OrderManagement",
                    "icon": "md-bus",
                    "name": "Assignment_max",
                    "path": "/Assignment_max",
                    "title": "船舶调度",
                    "children": ""
                }, {
                    "id": "Confirm",
                    "pid": "OrderManagement",
                    "icon": "md-person",
                    "name": "Confirm",
                    "path": "/Confirm",
                    "title": "船员确认",
                    "children": ""
                }, {
                    "id": "dz_Confirm",
                    "pid": "OrderManagement",
                    "icon": "md-person",
                    "name": "dz_Confirm",
                    "path": "/dz_Confirm",
                    "title": "队长确认",
                    "children": ""
                }, {
                    "id": "Consult",
                    "pid": "OrderManagement",
                    "icon": "md-eye",
                    "name": "Consult",
                    "path": "/Consult",
                    "title": "订单查阅",
                    "children": ""
                }]
            },
            // {
            //     "id": "ShuttleBus",
            //     "pid": "VehicleScheduling",
            //     "icon": "md-bus",
            //     "name": "ShuttleBus",
            //     "path": "/ShuttleBus",
            //     "title": "班车管理",
            //     "children": [{
            //         "id": "LineMaintenance",
            //         "pid": "ShuttleBus",
            //         "icon": "md-analytics",
            //         "name": "LineMaintenance",
            //         "path": "/LineMaintenance",
            //         "title": "线路维护",
            //         "children": ""
            //     }, {
            //         "id": "Scheduling",
            //         "pid": "ShuttleBus",
            //         "icon": "ios-car",
            //         "name": "Scheduling",
            //         "path": "/Scheduling",
            //         "title": "船舶排班",
            //         "children": ""
            //     }, {
            //         "id": "SiteMaintenance",
            //         "pid": "ShuttleBus",
            //         "icon": "logo-chrome",
            //         "name": "SiteMaintenance",
            //         "path": "/SiteMaintenance",
            //         "title": "站点维护",
            //         "children": ""
            //     }]
            // },
            // {
            //     "id": "ScManage",
            //     "pid": "VehicleScheduling",
            //     "icon": "md-bus",
            //     "name": "ScManage",
            //     "path": "/ScManage",
            //     "title": "校巴管理",
            //     "children": [
            //         {
            //             "id": "Sc_SiteMaintenance",
            //             "pid": "ScManage",
            //             "icon": "logo-chrome",
            //             "name": "Sc_SiteMaintenance",
            //             "path": "/Sc_SiteMaintenance",
            //             "title": "站点维护",
            //             "children": ""
            //         },
            //         {
            //             "id": "Sc_LineMaintenance",
            //             "pid": "ScManage",
            //             "icon": "md-analytics",
            //             "name": "Sc_LineMaintenance",
            //             "path": "/Sc_LineMaintenance",
            //             "title": "线路维护",
            //             "children": ""
            //         },
            //         {
            //             "id": "Sc_Scheduling",
            //             "pid": "ScManage",
            //             "icon": "md-bus",
            //             "name": "Sc_Scheduling",
            //             "path": "/Sc_Scheduling",
            //             "title": "校巴排班",
            //             "children": ""
            //         }
            //     ]
            //     },
                {
                    "id": "mergeVideo",
                    "pid": "VehicleScheduling",
                    "icon": "md-git-branch",
                    "name": "mergeVideo",
                    "path": "/mergeVideo",
                    "title": "合并视频",
                    "children": ""
                }, {
                    "id": "CloudPhoto",
                    "pid": "VehicleScheduling",
                    "icon": "ios-cloudy",
                    "name": "CloudPhoto",
                    "path": "/CloudPhoto",
                    "title": "云图片库",
                    "children": ""
                }, {
                    "id": "CloudVideo",
                    "pid": "VehicleScheduling",
                    "icon": "ios-cloudy",
                    "name": "CloudVideo",
                    "path": "/CloudVideo",
                    "title": "云视频库",
                    "children": ""
                }, {
                    "id": "abnormal",
                    "pid": "VehicleScheduling",
                    "icon": "ios-create",
                    "name": "abnormal",
                    "path": "/abnormal",
                    "title": "事件记录",
                    "children": ""
                }, {
                    "id": "AccidentManagement",
                    "pid": "VehicleScheduling",
                    "icon": "ios-home",
                    "name": "AccidentManagement",
                    "path": "/AccidentManagement",
                    "title": "事故管理",
                    "children": ""
                }]
        }, {
            "id": "FinancialSettlement",
            "pid": "",
            "icon": "logo-usd",
            "name": "FinancialSettlement",
            "path": "/FinancialSettlement",
            "title": "财务结算",
            "children": [{
                "id": "ReceivablesManagement",
                "pid": "FinancialSettlement",
                "icon": "logo-usd",
                "name": "ReceivablesManagement",
                "path": "/ReceivablesManagement",
                "title": "收款管理",
                "children": ""
            }, {
                "id": "PaymentManagement",
                "pid": "FinancialSettlement",
                "icon": "logo-usd",
                "name": "PaymentManagement",
                "path": "/PaymentManagement",
                "title": "付款管理",
                "children": ""
            }, {
                "id": "AccountingFormula",
                "pid": "FinancialSettlement",
                "icon": "logo-usd",
                "name": "AccountingFormula",
                "path": "/AccountingFormula",
                "title": "核算公式",
                "children": ""
            }, {
                "id": "Reimbursement",
                "pid": "FinancialSettlement",
                "icon": "logo-usd",
                "name": "Reimbursement",
                "path": "/Reimbursement",
                "title": "报销记账",
                "children": ""
            }]
        }, {
            "id": "terminal",
            "pid": "",
            "icon": "ios-home",
            "name": "terminal",
            "path": "/terminal",
            "title": "终端管理",
            "children": [{
                "id": "terminal-car",
                "pid": "terminal",
                "icon": "logo-android",
                "name": "terminal-car",
                "path": "/terminal-car",
                "title": "后视镜管理",
                "children": ""
            }, {
                "id": "terminal_GPS",
                "pid": "terminal",
                "icon": "logo-android",
                "name": "terminal_GPS",
                "path": "/terminal_GPS",
                "title": "定位器管理",
                "children": ""
            }, {
                "id": "terminal_OBD",
                "pid": "terminal",
                "icon": "logo-android",
                "name": "terminal_OBD",
                "path": "/terminal_OBD",
                "title": "OBD管理",
                "children": ""
            }]
        }, {
            "id": "Echarts",
            "pid": "",
            "icon": "ios-barcode",
            "name": "Echarts",
            "path": "/Echarts",
            "title": "数据报表",
            "children": [{
                "id": "SafeDriving",
                "pid": "Echarts",
                "icon": "ios-car",
                "name": "SafeDriving",
                "path": "/SafeDriving",
                "title": "安全驾驶",
                "children": ""
            }, {
                "id": "OrderStatistics",
                "pid": "Echarts",
                "icon": "ios-podium",
                "name": "OrderStatistics",
                "path": "/OrderStatistics",
                "title": "订单统计",
                "children": ""
            }, {
            //     "id": "BusStatistics",
            //     "pid": "Echarts",
            //     "icon": "ios-podium",
            //     "name": "BusStatistics",
            //     "path": "/BusStatistics",
            //     "title": "班车统计",
            //     "children": ""
            // }, {
                "id": "TrafficStatistics",
                "pid": "Echarts",
                "icon": "ios-podium",
                "name": "TrafficStatistics",
                "path": "/TrafficStatistics",
                "title": "出船统计",
                "children": ""
            }, {
                "id": "TerminalAnomaly",
                "pid": "Echarts",
                "icon": "ios-construct",
                "name": "TerminalAnomaly",
                "path": "/TerminalAnomaly",
                "title": "终端异常",
                "children": ""
            }, {
                "id": "OverspeedStatistics",
                "pid": "Echarts",
                "icon": "ios-timer-outline",
                "name": "OverspeedStatistics",
                "path": "/OverspeedStatistics",
                "title": "超速统计",
                "children": ""
            }, {
                "id": "CollectionStatistics",
                "pid": "Echarts",
                "icon": "ios-pie-outline",
                "name": "CollectionStatistics",
                "path": "/CollectionStatistics",
                "title": "收款统计",
                "children": ""
            }, {
                "id": "PaymentStatistics",
                "pid": "Echarts",
                "icon": "ios-podium",
                "name": "PaymentStatistics",
                "path": "/PaymentStatistics",
                "title": "付款统计",
                "children": ""
            }, {
                "id": "ReimbursementStatistics",
                "pid": "Echarts",
                "icon": "logo-usd",
                "name": "ReimbursementStatistics",
                "path": "/ReimbursementStatistics",
                "title": "报销统计",
                "children": ""
            }]
        }, {
            "id": "OperationMonitoring",
            "pid": "",
            "icon": "ios-leaf",
            "name": "OperationMonitoring",
            "path": "/OperationMonitoring",
            "title": "终端监控",
            "children": [{
                "id": "VehicleMonitoring",
                "pid": "OperationMonitoring",
                "icon": "ios-car",
                "name": "VehicleMonitoring",
                "path": "/VehicleMonitoring",
                "title": "运营监控",
                "children": ""
            }, {
            //     "id": "OBD_Monitor",
            //     "pid": "OperationMonitoring",
            //     "icon": "ios-car",
            //     "name": "OBD_Monitor",
            //     "path": "/OBD_Monitor",
            //     "title": "OBD监控",
            //     "children": ""
            // }, {
            //     "id": "GPS_Monitor",
            //     "pid": "OperationMonitoring",
            //     "icon": "ios-car",
            //     "name": "GPS_Monitor",
            //     "path": "/GPS_Monitor",
            //     "title": "定位器监控",
            //     "children": ""
            // }, {
            //     "id": "allcode",
            //     "pid": "OperationMonitoring",
            //     "icon": "md-bus",
            //     "name": "allcode",
            //     "path": "/allcode",
            //     "title": "聚合监控",
            //     "children": ""
            // }, {
                "id": "BusMonitor",
                "pid": "OperationMonitoring",
                "icon": "md-bus",
                "name": "BusMonitor",
                "path": "/BusMonitor",
                "title": "船舶监控",
                "children": ""
            }]
        }],
    menuList: []
}
