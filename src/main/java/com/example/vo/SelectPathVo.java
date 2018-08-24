package com.example.vo;

import java.util.List;

/**
 * 选择路径对
 */
public class SelectPathVo {

	private String name;	//选择路径名称
	private Integer number;	//选择路径对应操作数量
	private List<OperationalVo> list;	//操作的具体信息
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getNumber() {
		return number;
	}
	public void setNumber(Integer number) {
		this.number = number;
	}
	public List<OperationalVo> getList() {
		return list;
	}
	public void setList(List<OperationalVo> list) {
		this.list = list;
	}
	
	
}
