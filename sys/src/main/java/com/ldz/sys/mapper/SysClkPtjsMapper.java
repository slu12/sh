package com.ldz.sys.mapper;

import com.ldz.sys.model.SysJs;
import com.ldz.util.cache.MybatisRedisCache;
import org.apache.ibatis.annotations.CacheNamespace;
import org.apache.ibatis.cache.decorators.FifoCache;
import tk.mybatis.mapper.common.Mapper;

//@CacheNamespace(implementation=MybatisRedisCache.class, eviction=FifoCache.class)
public interface SysClkPtjsMapper extends Mapper<SysJs> {
}