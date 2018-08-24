package com.example.service;

import java.util.List;

import com.example.vo.ProxyVo;
import com.example.vo.SelectPathVo;

public interface DocumentService {
	
	/**
	 * 递归处理子菜单
	 * @param parentMenu
	 * @param sonMent
	 * @param list
	 * @param length
	 * @return
	 */
	List<Object> recursiveMenu(String parentMenu,String[] sonMent,List<String> list,int length);
	
	/**
	 * 返回人员名单列表
	 * @return
	 * @throws Exception 
	 */
	List<Object> listPersonnel() throws Exception;
	
	/**
	 * 获取领导列表
	 * @return
	 * @throws Exception
	 */
	List<ProxyVo> listleader() throws Exception;
	
	/**
	 * 根据文种类型和办理环节获取选择路径及对应操作
	 * @param languageType	文种类型
	 * @param processLink	办理环节
	 * @return
	 */
	List<SelectPathVo> listSelectPath(String languageType,String processLink) throws Exception;
}
