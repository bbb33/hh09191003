<?php


namespace Home\Controller;

use Home\Model\WeixinModel;
use Home\Service\WeixinService;
use Think\Controller;
use Weixin\Xiaochengxu\WXLoginHelper;

class WeixinController extends Controller {
	    /*
     * 处理小程序上传微信个人信息
     */
	public function login_v2() 
	{
        $nickname = I('nickname');
        $gender = intval(I('gender'));
        $city = I('city');
        $province = I('province');
        $country = I('country');
        $avater = I('avatarUrl');
        $openid = get_openid();

        $data = [
            'nickname' => $nickname,
            'gender' => $gender,
            'country' => $country,
            'province' => $province,
            'city' => $city,
            'avatar' => $avater,
        ];

        D('Weixin')->updateInfo($openid, $data);
        $this->ajaxReturn(['user_info' => $data]);
    }

 

     public function code_to_openid() {
        $openid = I('openid');
        $TEST = M('weixinuserinfo');
        // $data['select_result1'] = $TEST ->select();//把所有数据查出来
        $data = $TEST ->where(['openid'=> $openid])->select();//按条件查询
        if(!empty($data)) {
            echo "false";
        }else{
            echo "true";
        }
        
        // $code = I('code');
        // // $from = I('from');

        // if (!$code) {
        //     $this->ajaxReturn(['data' => '缺少登陆code参数，请删除小程序，重新进入', 'is_login' => 1, 'status' => 1]);
        // }
        // $wxHelper = NEW WXLoginHelper($code);
        // $data_result = $wxHelper->checkLoginV2();


        // if ($data_result['success'] === FALSE) {
        //     $this->ajaxReturn(['data' => $data_result['message'], 'is_login' => 0, 'status' => 1,]);
        // }

        // $openid = $data_result['openid'];

        // $weixinService = new WeixinService();
        // $is_passer = $weixinService->is_passer($openid);
        // if ($is_passer['code'] == 1) {
        //     $this->ajaxReturn($is_passer);
        // }

        // if (FALSE === $is_passer) {
        //     D('Weixin')->addAsPasser($openid);
        // }
        // if (FALSE === $weixinService->is_register($openid)) {
            // $this->ajaxReturn(['is_register' => $weixinService->is_register($openid)]);
        // }

        // $WEIXIN = D('Weixin');
        // $weixin_user = $WEIXIN->getByOpenid($openid);

        // // 处理原理check_3rd_接口数据
        // $user_info_result = $this->get_user_info($openid);


    //     $this->ajaxReturn(['openid' => $data_result['openid'], 'is_login' => 1, 'is_register' => true, 'user_info' => $user_info_result['data'], 'status' => 0]);

    }


}