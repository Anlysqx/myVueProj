import { createStore } from 'vuex'

export default createStore({
  state: {
    selfWriteCase:{
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
    defaultCase:{
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
