package com.example.vo;

/**
 * 代理信息
 */
public class ProxyVo {

	private String name;	//用户名称
	private Boolean status;	//是否使用代理：默认为true
	private String proxy;	//代理名称
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	public String getProxy() {
		return proxy;
	}
	public void setProxy(String proxy) {
		this.proxy = proxy;
	}
	
	
}
