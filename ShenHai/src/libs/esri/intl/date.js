// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/assignHelper @dojo/framework/shim/WeakMap ../core/jsonMap ./locale".split(" "),function(d,b,a,n,r,l){function p(a){a=a||q;if(!k.has(a)){var b=l.getLocale(),b=t[l.getLocale()]||b;k.set(a,new Intl.DateTimeFormat(b,a))}return k.get(a)}Object.defineProperty(b,"__esModule",{value:!0});d={year:"numeric",month:"numeric",day:"numeric"};var f={year:"numeric",month:"long",day:"numeric"},g={year:"numeric",month:"short",day:"numeric"},h={year:"numeric",month:"long",weekday:"long",
day:"numeric"},c={hour:"numeric",minute:"numeric"},e=a({},c,{second:"numeric"}),m={"short-date":d,"short-date-short-time":a({},d,c),"short-date-short-time-24":a({},d,c,{hour12:!1}),"short-date-long-time":a({},d,e),"short-date-long-time-24":a({},d,e,{hour12:!1}),"short-date-le":d,"short-date-le-short-time":a({},d,c),"short-date-le-short-time-24":a({},d,c,{hour12:!1}),"short-date-le-long-time":a({},d,e),"short-date-le-long-time-24":a({},d,e,{hour12:!1}),"long-month-day-year":f,"long-month-day-year-short-time":a({},
f,c),"long-month-day-year-short-time-24":a({},f,c,{hour12:!1}),"long-month-day-year-long-time":a({},f,e),"long-month-day-year-long-time-24":a({},f,e,{hour12:!1}),"day-short-month-year":g,"day-short-month-year-short-time":a({},g,c),"day-short-month-year-short-time-24":a({},g,c,{hour12:!1}),"day-short-month-year-long-time":a({},g,e),"day-short-month-year-long-time-24":a({},g,e,{hour12:!1}),"long-date":h,"long-date-short-time":a({},h,c),"long-date-short-time-24":a({},h,c,{hour12:!1}),"long-date-long-time":a({},
h,e),"long-date-long-time-24":a({},h,e,{hour12:!1}),"long-month-year":{month:"long",year:"numeric"},"short-month-year":{month:"short",year:"numeric"},year:{year:"numeric"},"short-time":c,"long-time":e};b.dictionary=r.strict()({shortDate:"short-date",shortDateShortTime:"short-date-short-time",shortDateShortTime24:"short-date-short-time-24",shortDateLongTime:"short-date-long-time",shortDateLongTime24:"short-date-long-time-24",shortDateLE:"short-date-le",shortDateLEShortTime:"short-date-le-short-time",
shortDateLEShortTime24:"short-date-le-short-time-24",shortDateLELongTime:"short-date-le-long-time",shortDateLELongTime24:"short-date-le-long-time-24",longMonthDayYear:"long-month-day-year",longMonthDayYearShortTime:"long-month-day-year-short-time",longMonthDayYearShortTime24:"long-month-day-year-short-time-24",longMonthDayYearLongTime:"long-month-day-year-long-time",longMonthDayYearLongTime24:"long-month-day-year-long-time-24",dayShortMonthYear:"day-short-month-year",dayShortMonthYearShortTime:"day-short-month-year-short-time",
dayShortMonthYearShortTime24:"day-short-month-year-short-time-24",dayShortMonthYearLongTime:"day-short-month-year-long-time",dayShortMonthYearLongTime24:"day-short-month-year-long-time-24",longDate:"long-date",longDateShortTime:"long-date-short-time",longDateShortTime24:"long-date-short-time-24",longDateLongTime:"long-date-long-time",longDateLongTime24:"long-date-long-time-24",longMonthYear:"long-month-year",shortMonthYear:"short-month-year",year:"year"});b.dateFormats=b.dictionary.apiValues;b.toJSON=
b.dictionary.toJSON.bind(b.dictionary);b.fromJSON=b.dictionary.fromJSON.bind(b.dictionary);var t={ar:"ar-u-nu-latn-ca-gregory"},k=new n.default,q=m["short-date-short-time"];l.onLocaleChange(function(){k=new n.default;q=m["short-date-short-time"]});b.getDateTimeFormatter=p;b.convertDateFormatToIntlOptions=function(a){return m[a]||null};b.formatDate=function(a,b){return p(b).format(a)}});