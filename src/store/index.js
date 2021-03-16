import { createStore } from 'vuex'

export default createStore({
  state: {
    mainSubject:'',
    knowledge_tree:'',
    step_result:'',
    selfWriteCase:{
        "title": {
            "func_desc": "",
            "input_param": "",
            "adjudge_param": ""
        },
        "step_list": [
            {
                "step": "程序运行在正常模式下",
                "ex_res": "遥测程序运行在正常在轨模式下",
                "code": {
                    "instr_type": "SETP",
                    "instr_param": {
                        "equip_name": "PROGRAM",
                        "param_list": [
                            {
                                "param_name": "MODE",
                                "param_value": "normal"
                            }
                        ]
                    }
                }
            },
        ]
      },
    defaultCase:{
        "title": {
            "func_desc": "",
            "input_param": "",
            "adjudge_param": ""
        },
        "step_list": [
             {
                "step": "程序运行在正常模式下",
                "ex_res": "遥测程序运行在正常在轨模式下",
                "code": {
                    "instr_type": "SETP",
                    "instr_param": {
                        "equip_name": "PROGRAM",
                        "param_list": [
                            {
                                "param_name": "MODE",
                                "param_value": "normal"
                            }
                        ]
                    }
                }
            },
        ]
      },
    toAnalysisCase:{
        "title": {
            "func_desc": "",
            "input_param": "",
            "adjudge_param": ""
        },
        "step_list": [
            {
                "step": "",
                "ex_res": "",
                "code": {
                    "instr_type": "",
                    "instr_param": {
                        "equip_name": "",
                        "param_list": [
                            {
                                "param_name": "",
                                "param_value": ""
                            }
                        ]
                    }
                }
            },
        ]
      },
    isShowUseInstruction:true
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
