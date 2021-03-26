<?php

namespace Home\Controller;

use Think\Controller;

/**
 * 用户控制器
 * 包括用户中心，用户登录
 */
class UserController extends Controller {

	public function test()
	{
		// $data = [];
		// $data['I()'] = I();
		// $data["I('testA')"] = I('testA');
		// $this->ajaxReturn($data);
        // $TEST = M('maintainance');
        
        
  $t   =   time();   
  $t1   =   mktime(0,0,0,date("m",$t),date("d",$t),date("Y",$t));  
  $t5   =   mktime(23,59,59,date("m",$t),date("d",$t),date("Y",$t)); 
  $t2   =   mktime(0,0,0,date("m",$t),1,date("Y",$t));   
  $t3   =   mktime(0,0,0,date("m",$t)-1,1,date("Y",$t));   
  $t4   =   mktime(0,0,0,1,1,date("Y",$t));  
  $end_year = mktime(23, 59, 59, 12, 31, date("Y",$t)); 
    // $t0 = date('t');
  $end_month = mktime(23, 59, 59, date("m",$t), date("d",'t'), date("Y",$t));
  // $map['openid'] = I('openid');
  //     $map['addtime'] = array(array('EGT', $t2), array('ELT', $end_month));
  //    $data = $TEST ->where($map)->count();
     // echo $t2;
     // echo $end_month;
      
     // $datacount = $data->count();
     // $this->ajaxReturn($data); 
  //测试   
    
  echo   date("当前   Y-m-d   H:i:s",$t)."   $t<br>";   
  echo   date("今天0点   Y-m-d   H:i:s",$t1)."   $t1<br>"; 
  echo   date("今日结束   Y-m-d   H:i:s",$t5)."   $t5<br>";
  echo   date("今月起点   Y-m-d   H:i:s",$t2)."   $t2<br>"; 
  echo   date("今月结束   Y-m-d   H:i:s",$end_month)."   $end_month<br>";  
  echo   date("上月起点   Y-m-d   H:i:s",$t3)."   $t3<br>";   
  echo   date("今年起点   Y-m-d   H:i:s",$t4)."   $t4<br>";   
  echo   date("今年起点   Y-m-d   H:i:s",$end_year)."   $end_year<br>";
	}

    public function maintainCompare()
    {
        # code...
        $maintainance = M('maintainance');
        $t   =   time();   
        $start_today   =   mktime(0,0,0,date("m",$t),date("d",$t),date("Y",$t));  
        $end_today   =   mktime(23,59,59,date("m",$t),date("d",$t),date("Y",$t)); 
        $start_month   =   mktime(0,0,0,date("m",$t),1,date("Y",$t)); 
        $end_month = mktime(23, 59, 59, date("m",$t), date('t'), date("Y",$t));
        $month['openid'] = I('openid');
        $month['addtime'] = array(array('EGT', $start_month), array('ELT', $end_month));
        $today['openid'] = I('openid');
        $today['addtime'] = array(array('EGT', $start_today), array('ELT', $end_today));
        $TEST = M('maintainance');
        $data['sum'] = $maintainance ->count();
        $data['monthnum'] = $maintainance ->where($month)->count();
        $data['todaynum'] = $maintainance ->where($today)->count();
        $this->ajaxReturn($data); 
    }

    public function userinfoselect()
	{
		$data = [];
		$TEST = M('weixinuserinfo');
		// $data['select_result1'] = $TEST ->select();//把所有数据查出来
		$data = $TEST ->where(['openid'=> I('openid')])->select();//按条件查询
		$this->ajaxReturn($data[0]);

	}

        public function userinfodetail()
    {
        $data = [];
        $TEST = M('userinfo');
        // $data['select_result1'] = $TEST ->select();//把所有数据查出来
        $data = $TEST ->where(['openid'=> I('openid')])->select();//按条件查询
        $this->ajaxReturn($data[0]);

    }

    public function equipmentdetail()
    {
        $data = [];
        $TEST = M('equipment');
        // $data['select_result1'] = $TEST ->select();//把所有数据查出来
        $data = $TEST ->where(['openid'=> I('openid'),'no'=>I('no')])->select();//按条件查询
        $this->ajaxReturn($data[0]);

    }

    public function sparepartdetail()
    {
        $data = [];
        $TEST = M('sparepart');
        // $data['select_result1'] = $TEST ->select();//把所有数据查出来
        $data = $TEST ->where(['openid'=> I('openid'),'no'=>I('no')])->select();//按条件查询
        $this->ajaxReturn($data[0]);

    }

	    public function equipmentselect()
	{
		$data = [];
		$TEST = M('equipment');
		// $data['select_result1'] = $TEST ->select();//把所有数据查出来
		$data = $TEST ->where(['openid'=> I('openid')])->select();//按条件查询
		$this->ajaxReturn($data);

	}

            public function sparepartselect()
    {
        $data = [];
        $TEST = M('sparepart');
        // $data['select_result1'] = $TEST ->select();//把所有数据查出来
        $data = $TEST ->where(['openid'=> I('openid')])->select();//按条件查询
        $this->ajaxReturn($data);

    }





    //////实现删除数据库功能
	public function equipmentdel()
	{
		$data = [];
		$EQUIPMENT = M('equipment');
		$where = [
			'openid' => I('openid'),
			'no'=>I('no')
		];//$where是用来选择删除的数据的
		$openid = I('openid');
		$data['del_result'] = $EQUIPMENT -> where($where)->delete();
		$ADDNUMBER = M('weixinuserinfo');
        $datadel = $ADDNUMBER ->select();
        // $this->ajaxReturn($data[0]['equipmentnum'] + 1);
        $save_data =[
					'equipmentnum' => $datadel[0]['equipmentnum'] - 1
		];
		$ADDNUMBER -> where(array('openid'=>$openid))->save($save_data);
		$this->ajaxReturn($data);
	}

        public function sparepartdel()
    {
        $data = [];
        $SPAREPART = M('sparepart');
        $where = [
            'openid' => I('openid'),
            'no'=>I('no')
        ];//$where是用来选择删除的数据的
        $openid = I('openid');
        $data['del_result'] = $SPAREPART -> where($where)->delete();
        $EQUIPMENT = M('equipment');
        $datadel = $EQUIPMENT ->select();
        // $this->ajaxReturn($data[0]['equipmentnum'] + 1);
        $save_data =[
                    'sparepart_no' => ''
        ];
        $EQUIPMENT -> where(array('openid'=>$openid,'sparepart_no'=>I('no')))->save($save_data);
        // $this->ajaxReturn($data[0]['equipmentnum'] + 1);
        $this->ajaxReturn($data);
    }

	    //////实现修改数据库功能

    public function modify()
    {
        $wxInfo = I('equipmentdetail');
        $wxInfo = $this->object_to_array(json_decode(htmlspecialchars_decode($wxInfo)));
        $TEST = M('equipment');
        $TEST -> where(['id'=> $wxInfo['id']])->save($wxInfo);//这里的data是改了几个的意思
        $this->ajaxReturn(['success' => true, 'add' => true, 'data' => '修改成功']);

    }

    public function modifysparepart()
    {
        $wxInfo = I('sparepartdetail');
        $wxInfo = $this->object_to_array(json_decode(htmlspecialchars_decode($wxInfo)));
        $TEST = M('sparepart');
        $TEST -> where(['id'=> $wxInfo['id']])->save($wxInfo);//这里的data是改了几个的意思
        $this->ajaxReturn(['success' => true, 'add' => true, 'data' => '修改成功']);

    }


            ////实现增加数据库功能
        public function weixinadd()
    {
        $data = [];
        $TEST = M('weixinuserinfo');
        $add_data = [
            'openid'=> I('openid'),
            'nickname' => I('nickname'),
            'avatarUrl' => I('avatarUrl'),
            'equipmentnum'=> 0,
            'repair_validating' => 0,
            'repair_repairing' => 0,
            'maintainance_validating' => 0,
            'maintainance_ing' => 0,
        ];
        if (!I('openid') || I('openid') == 'undefined' ){
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '没有授权']);
        }else if (!I('nickname') || I('nickname') == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '没有名字']);
        }else if (!I('avatarUrl') || I('avatarUrl') == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '没有头像']);
        }
        $data['add_result'] = $TEST -> add($add_data);
        $this->ajaxReturn($data);

    }

    public function userinfodetailadd()
    {
        $data = [];
        $TEST = M('userinfo');
        $add_data = [
            'openid'=> I('openid'),
            'tel'=> I('tel'),
            'mycompany'=> I('mycompany'),
            'mydepartment'=> I('mydepartment')
        ];
        $data['add_result'] = $TEST -> add($add_data);
        $this->ajaxReturn($data);

    }

	public function addequipment ()
    {
        $wxInfo = I('equipmentinfo');
        $wxInfo = $this->object_to_array(json_decode(htmlspecialchars_decode($wxInfo)));
        $image = I('image');
        if (!$wxInfo['no'] || $wxInfo['no'] == 'undefined' ){
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '没有编号']);
        }else if (!$wxInfo['name'] || $wxInfo['name'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '没有设备名字']);
        }else if (!$wxInfo['model'] || $wxInfo['model'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填型号']);
        }else if (!$wxInfo['place'] || $wxInfo['place'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填安放位置']);
        }else if (!$wxInfo['worker'] || $wxInfo['worker'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填操作人员']);
        }else if (!$wxInfo['category'] || $wxInfo['category'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填种类']);
        }else if (!$wxInfo['department'] || $wxInfo['department'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填部门']);
        }else if (!$wxInfo['conditions'] || $wxInfo['conditions'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填状态']);
        }else if (!$wxInfo['manufacturer'] || $wxInfo['manufacturer'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填厂商']);
        }else if (!$wxInfo['vendor'] || $wxInfo['vendor'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填供应商']);
        }else if (!$wxInfo['sparepart_no'] || $wxInfo['sparepart_no'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填备件id']);
        }
        $TIME = time();
        $EQUIPMENT = M('equipment');
        $ADDNUMBER = M('weixinuserinfo');
        $data = $ADDNUMBER ->select();
        $save_data =[
					'equipmentnum' => $data[0]['equipmentnum'] + 1
		];
		 
        $exist	 = $EQUIPMENT->where(array('no'=>$wxInfo['no'],'openid'=>$wxInfo['openid']))->find();
        if (empty($exist)) {
				$EQUIPMENT->add(array('no'=>$wxInfo['no'],'openid'=>$wxInfo['openid'],'name'=>$wxInfo['name'],  'model'=>$wxInfo['model'], 'place'=>$wxInfo['place'], 'worker'=>$wxInfo['worker'], 'category'=>$wxInfo['category'], 'department'=>$wxInfo['department'], 'conditions'=>$wxInfo['conditions'], 'manufacturer'=>$wxInfo['manufacturer'], 'vendor'=>$wxInfo['vendor'], 'usage_date'=>$wxInfo['usage_date'],'eg'=>$wxInfo['eg'],'sparepart_no'=>$wxInfo['sparepart_no'],'addtime'=> $TIME,'image'=>$image));//'image'=>$image
				
				$ADDNUMBER -> where(array('openid'=>$wxInfo['openid']))->save($save_data);
		        $this->ajaxReturn(['success' => true, 'add' => true, 'data' => '添加成功']);
	    } else {
	        $this->ajaxReturn(['success' => false, 'add' => true, 'data' => '设备已添加']);
	    }
        
    }

/////添加备件
    public function addsparepart ()
    {
        $wxInfo = I('sparepartinfo');
        $wxInfo = $this->object_to_array(json_decode(htmlspecialchars_decode($wxInfo)));
        $img = I('img');
        if (!$wxInfo['no'] || $wxInfo['no'] == 'undefined' ){
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '没有编号']);
        }else if (!$wxInfo['name'] || $wxInfo['name'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '没有设备名字']);
        }else if (!$wxInfo['place_number'] || $wxInfo['place_number'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填仓库号']);
        }else if (!$wxInfo['number'] || $wxInfo['number'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填数量']);
        }else if (!$wxInfo['category'] || $wxInfo['category'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填种类']);
        }else if (!$wxInfo['manufacturer'] || $wxInfo['manufacturer'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填厂商']);
        }else if (!$wxInfo['vendor'] || $wxInfo['vendor'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填供应商']);
        }
        $TIME = time();
        $EQUIPMENT = M('sparepart');
        $exist   = $EQUIPMENT->where(array('no'=>$wxInfo['no'],'openid'=>$wxInfo['openid']))->find();
        if (empty($exist)) {
                $EQUIPMENT->add(array('no'=>$wxInfo['no'],'openid'=>$wxInfo['openid'],'number'=>$wxInfo['number'],'name'=>$wxInfo['name'],  'place_number'=>$wxInfo['place_number'],'category'=>$wxInfo['category'], 'manufacturer'=>$wxInfo['manufacturer'], 'vendor'=>$wxInfo['vendor'], 'eg'=>$wxInfo['eg'],'addtime'=> $TIME,'img'=>$img));//'image'=>$image
                
                $this->ajaxReturn(['success' => true, 'add' => true, 'data' => '添加成功']);
        } else {
            $this->ajaxReturn(['success' => false, 'add' => true, 'data' => '设备已添加']);
        }
        
    }


	public function addmaintainance ()
    {
        $wxInfo = I('maintainanceinfo');
        $wxInfo = $this->object_to_array(json_decode(htmlspecialchars_decode($wxInfo)));
         // $this->ajaxReturn($wxInfo);
        if (!$wxInfo['no'] || $wxInfo['no'] == 'undefined' ){
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填写编号编号']);
        }else if (!$wxInfo['openid'] || $wxInfo['openid'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '没有openid']);
        }
        $TIME = time();
        $EQUIPMENT = M('maintainance');
        $ADDNUMBER = M('weixinuserinfo');
        $data = $ADDNUMBER ->select();
        // $this->ajaxReturn($data[0]['equipmentnum'] + 1);
        $save_data =[
					'maintainance_validating' => $data[0]['maintainance_validating'] + 1
		];
		 
        $exist	 = $EQUIPMENT->where(array('no'=>$wxInfo['no'],'openid'=>$wxInfo['openid']))->find();
        if (empty($exist)) {
				$EQUIPMENT->add(array('no'=>$wxInfo['no'],'openid'=>$wxInfo['openid'],'charge'=>$wxInfo['charge'],'status'=>$wxInfo['status'],'maintainance_place'=>$wxInfo['maintainance_place'],'eg'=>$wxInfo['eg'],'addtime'=> $TIME,'validated_date'=> $TIME));
				
				$ADDNUMBER -> where(array('openid'=>$wxInfo['openid']))->save($save_data);
		        $this->ajaxReturn(['success' => true, 'add' => true, 'data' => '添加成功']);
	    } else {
	        $this->ajaxReturn(['success' => false, 'add' => true, 'data' => '设备正在保养']);
	    }
        
    }


    public function addrepair ()
    {
         $wxInfo = I('repairinfo');
        $wxInfo = $this->object_to_array(json_decode(htmlspecialchars_decode($wxInfo)));
         // $this->ajaxReturn($wxInfo);
        if (!$wxInfo['no'] || $wxInfo['no'] == 'undefined' ){
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '请填写编号编号']);
        }else if (!$wxInfo['openid'] || $wxInfo['openid'] == 'undefined') {
            $this->ajaxReturn(['success' => false, 'add' => false, 'data' => '没有openid']);
        }
        $TIME = time();
        $EQUIPMENT = M('repair');
        $ADDNUMBER = M('weixinuserinfo');
        $data = $ADDNUMBER ->select();
        // $this->ajaxReturn($data[0]['equipmentnum'] + 1);
        $save_data =[
                    'repair_validating' => $data[0]['repair_validating'] + 1
        ];
         
        $exist   = $EQUIPMENT->where(array('no'=>$wxInfo['no'],'openid'=>$wxInfo['openid']))->find();
        if (empty($exist)) {
                $EQUIPMENT->add(array('no'=>$wxInfo['no'],'openid'=>$wxInfo['openid'],'program'=>$wxInfo['program'],'program'=>$wxInfo['program'],'charge'=>$wxInfo['charge'],'eg'=>$wxInfo['eg'],'addtime'=> $TIME,'validated_date'=> $TIME));
                
                $ADDNUMBER -> where(array('openid'=>$wxInfo['openid']))->save($save_data);
                $this->ajaxReturn(['success' => true, 'add' => true, 'data' => '添加成功']);
        } else {
            $this->ajaxReturn(['success' => false, 'add' => true, 'data' => '设备正在报修']);
        }
        
    }

    public function repairing(){

        $current_data = [];
        // $current_data['equipment'] = [];
        $repairing = M('repair');
        $EQUIPMENT = M('equipment');
        $data = $repairing ->where(['openid'=> I('openid')])->select();
        // $this->ajaxReturn($data[0]['validated_date']);
        $j = 0;
        for ($i=0; $i < count($data); $i++) { 
            # code...
            // echo $i;
            if($data[$i]['addtime'] != $data[$i]['validated_date']){
                $current_equipment = $EQUIPMENT ->where(['no'=> $data[$i]['no']])->select();
                // $this->ajaxReturn($current_equipment);
                $current_data[$j]['repair'] = $data[$i];
                $current_data[$j]['equipment'] = $current_equipment[0];
                $j++;
                // $this->ajaxReturn($data[$i]);
                // echo $current_data[i];
            }
        }
        
        $this->ajaxReturn($current_data);


    }

    public function repair_validating(){
        $current_data = [];
        // $current_data['equipment'] = [];
        $repairing = M('repair');
        $EQUIPMENT = M('equipment');
        $data = $repairing ->where(['openid'=> I('openid')])->select();
        $j=0;
        for ($i=0; $i < count($data); $i++) { 
            # code...
            if($data[$i]['addtime'] == $data[$i]['validated_date']){
                $current_equipment = $EQUIPMENT ->where(['no'=> $data[$i]['no']])->select();
                $current_data[$j]['repair'] = $data[$i];
                $current_data[$j]['equipment'] = $current_equipment[0];
                $j++;
                // echo $current_data[i];
            }
        }
        
        $this->ajaxReturn($current_data);

        
    }


    private function object_to_array($obj) {
        $obj = (array)$obj;
        foreach ($obj as $k => $v) {
            if (gettype($v) == 'resource') {
                return;
            }
            if (gettype($v) == 'object' || gettype($v) == 'array') {
                $obj[$k] = (array)object_to_array($v);
            }
        }
     
        return $obj;
    }

}