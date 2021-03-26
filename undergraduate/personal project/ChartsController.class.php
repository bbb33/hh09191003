<?php


namespace Home\Controller;

use Think\Controller;

/*
 * 处理图表服务
 */

class ChartsController extends Controller {

	public function analysis_chartnum(){
		$openid = I('openid');
		$name = I('chart');
		$chart = M($name);
		$tmin = $chart->where(['openid'=>$openid])->min('addtime');
		$tmax = $chart->where(['openid'=>$openid])->max('addtime');
		$LineA['series'][0]['data'] = [];
		if($name == 'equipment'){
			$LineA['series'][0]['color'] = '#1890ff';
		}else if($name == 'repair'){
			$LineA['series'][0]['color'] = '#2fc25b';
		}else{
			$LineA['series'][0]['color'] = '#facc14';
		}
		$LineA['series'][0]['index'] = 0;
		$LineA['series'][0]['legendShape'] = 'line';
		if($name == 'equipment'){
			$LineA['series'][0]['name'] = '设备数量';
		}else if($name == 'repair'){
			$LineA['series'][0]['name'] = '报修数量';
		}else{
			$LineA['series'][0]['name'] = '保养数量';
		}
		$LineA['series'][0]['pointShape'] = 'circle';
		$LineA['series'][0]['show'] = true;
		$LineA['series'][0]['type'] = 'line';
		$t  =  [];
		$time = time();
		for ($i=0; $i < date("Y",$tmax)-date("Y",$tmin)+1; $i++) { 
			# code...
			$t[$i] = date("Y",$tmin) + $i;
			$t4   =   mktime(0,0,0,1,1,$t[$i]);
			$t5   =   mktime(0,0,0,1,1,$t[$i]+1);
			// $this->ajaxReturn($t4);
			$today['openid'] = I('openid');
			$today['addtime'] = array(array('EGT', $t4), array('ELT', $t5));
			$LineA['series'][0]['data'][$i] = $chart->where($today)->count();
		}
		$LineA['categories'] = $t;
		for($i = 0; $i < count($LineA['series'][0]['data']); $i+=2 ){
			if($i == 0){
				$LineA['max'] =  $LineA['series'][0]['data'][0];
		    }else{
		    	if($LineA['series'][0]['data'][$i] < $LineA['series'][0]['data'][$i-1]){
		    		$LineA['max'] = $LineA['series'][0]['data'][$i-1];
		    	}else{
		    		$LineA['max'] = $LineA['series'][0]['data'][$i];
		    	}
		    }
		}

		// $this->ajaxReturn($t);
		// $t4   =   mktime(0,0,0,1,1,date("Y",$tmax));
		
		$this->ajaxReturn($LineA);

	}

	
	


}