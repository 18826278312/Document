package com.example.service;

import java.util.List;

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
	List<String> listleader() throws Exception;
	
	
}
