package com.example.vo;

/**
 * 具体操作
 */
public class OperationalVo {

	private String title;		//操作的标题
	private String personType;	//操作的人员类型，有领导和员工
	private String timeStatus;	//是否需要时间
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPersonType() {
		return personType;
	}
	public void setPersonType(String personType) {
		this.personType = personType;
	}
	public String getTimeStatus() {
		return timeStatus;
	}
	public void setTimeStatus(String timeStatus) {
		this.timeStatus = timeStatus;
	}
	
	
	
}
