package com.example.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.service.DocumentService;
import com.example.vo.ParamVo;
import com.example.vo.ProxyVo;
import com.example.vo.SelectPathVo;

@Controller
@RequestMapping("/DocumentController")
public class DocumentController {

	@Resource
	private DocumentService documentService;
	
	@RequestMapping(value="/document")
	public String document(){
		return "document";
	}
	
	/**
	 * 根据文种类型和办理环节获取选择路径及对应操作
	 * @param languageType	文种类型
	 * @param processLink	办理环节
	 * @return
	 */
	@RequestMapping(value="/listSelectPath")
	@ResponseBody
	public Map<String, Object> listSelectPath(String languageType,String processLink){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<SelectPathVo> list = null;
		try {
			list = documentService.listSelectPath(languageType, processLink);
			resultMap.put("list", list);
			resultMap.put("status", "success");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			resultMap.put("status", "error");
			resultMap.put("info", e.toString());
		}
		return resultMap;
	}
	
	/**
	 * 获取领导或者员工的信息
	 * @param type
	 * @return
	 */
	@RequestMapping(value="/listPersonnel")
	@ResponseBody
	public Map<String, Object> listPersonnel(){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			resultMap.put("leaderList", documentService.listleader());
			resultMap.put("personList", documentService.listPersonnel());
			resultMap.put("status", "success");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			resultMap.put("status", "error");
			resultMap.put("info", e.toString());
		}
		return resultMap;
	}
	
	@RequestMapping(value="/submit")
	@ResponseBody
	public Map<String, Object> submit(ParamVo paramVo){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			System.out.println(JSONObject.toJSONString(paramVo));
			System.out.println(paramVo.getOpinions());
			System.out.println(paramVo.getUseOpinions());
			System.out.println(paramVo.getSelectAction());
			System.out.println(paramVo.getSelectPath());
			System.out.println(paramVo.getLeftTitle());
			System.out.println(paramVo.getRightTitle());
			System.out.println(paramVo.getLeftArray());
			System.out.println(paramVo.getRightArray());
			System.out.println(paramVo.getRightDay());
			System.out.println(paramVo.getRightTime());
			System.out.println(paramVo.getLeftTime());
			System.out.println(paramVo.getLeftDay());
			System.out.println(paramVo.getNumber());
			resultMap.put("status", "success");
			resultMap.put("info", "提交成功");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			resultMap.put("status", "error");
			resultMap.put("info", e.toString());
		}
		return resultMap;
	}
}
