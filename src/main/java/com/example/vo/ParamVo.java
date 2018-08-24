package com.example.vo;

import java.util.List;

import net.bytebuddy.implementation.bytecode.assign.primitive.PrimitiveTypeAwareAssigner;

public class ParamVo {

	private String languageType;	//文种类型
	private String processLink;		//办理环节
	private String opinions;		//处理意见
	private String useOpinions;		//常用意见
	private String selectPath;		//选择路径
	private String selectAction;	//常用动作
	private String leftTitle;		//左标题
	private String rightTitle;		//右标题
	private Integer leftDay;		//左日期
	private Integer leftTime;		//左时间
	private Integer rightDay;		//右日期
	private Integer rightTime;		//右时间
	private String leftArray;		//左人员
	private String rightArray;		//右人员
	private Integer number;			//该数量为0，1，2。0代表left和right都没值；1代表left有值right没值；2代表两个都有值
	
	public String getLanguageType() {
		return languageType;
	}
	public void setLanguageType(String languageType) {
		this.languageType = languageType;
	}
	public String getProcessLink() {
		return processLink;
	}
	public void setProcessLink(String processLink) {
		this.processLink = processLink;
	}
	public String getOpinions() {
		return opinions;
	}
	public void setOpinions(String opinions) {
		this.opinions = opinions;
	}
	public String getUseOpinions() {
		return useOpinions;
	}
	public void setUseOpinions(String useOpinions) {
		this.useOpinions = useOpinions;
	}
	public String getSelectPath() {
		return selectPath;
	}
	public void setSelectPath(String selectPath) {
		this.selectPath = selectPath;
	}
	public String getSelectAction() {
		return selectAction;
	}
	public void setSelectAction(String selectAction) {
		this.selectAction = selectAction;
	}
	public String getLeftTitle() {
		return leftTitle;
	}
	public void setLeftTitle(String leftTitle) {
		this.leftTitle = leftTitle;
	}
	public String getRightTitle() {
		return rightTitle;
	}
	public void setRightTitle(String rightTitle) {
		this.rightTitle = rightTitle;
	}
	public Integer getLeftDay() {
		return leftDay;
	}
	public void setLeftDay(Integer leftDay) {
		this.leftDay = leftDay;
	}
	public Integer getLeftTime() {
		return leftTime;
	}
	public void setLeftTime(Integer leftTime) {
		this.leftTime = leftTime;
	}
	public Integer getRightDay() {
		return rightDay;
	}
	public void setRightDay(Integer rightDay) {
		this.rightDay = rightDay;
	}
	public Integer getRightTime() {
		return rightTime;
	}
	public void setRightTime(Integer rightTime) {
		this.rightTime = rightTime;
	}
	public String getLeftArray() {
		return leftArray;
	}
	public void setLeftArray(String leftArray) {
		this.leftArray = leftArray;
	}
	public String getRightArray() {
		return rightArray;
	}
	public void setRightArray(String rightArray) {
		this.rightArray = rightArray;
	}
	public Integer getNumber() {
		return number;
	}
	public void setNumber(Integer number) {
		this.number = number;
	}
	
}
