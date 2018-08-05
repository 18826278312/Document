package com.example.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.service.DocumentService;

@Controller
@RequestMapping("/DocumentController")
public class DocumentController {

	@Resource
	private DocumentService documentService;
	
	@RequestMapping(value="/document")
	public String document(){
		System.out.println("document");
		return "document";
	}
	
	@RequestMapping(value="/listPersonnel")
	@ResponseBody
	public Map<String, Object> listPersonnel(int type){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			//如果type为0,则表示要获取领导名单;如果type为1则表示获取部门列表
			if (type==0) {
				resultMap.put("list", documentService.listleader());
				resultMap.put("type", 0);
			}
			else if (type==1) {
				resultMap.put("list", documentService.listPersonnel());
				resultMap.put("type", 1);
			}
			resultMap.put("status", "success");
		} catch (Exception e) {
			// TODO: handle exception
			resultMap.put("status", "error");
			resultMap.put("info", e.toString());
		}
		return resultMap;
	}
}
