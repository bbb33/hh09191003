<?php


namespace Home\Controller;

use Think\Controller;
use Think\Upload;

/*
 * 处理图片服务
 */

class ImgController extends Controller {

    /*
     * upload 图片上传接口
     * 返回图片的url
     */
    public function uploadOneSparepart ($file)
    {
        $upload = new Upload();// 实例化上传类
        $upload->maxSize = 3145728;// 设置附件上传大小
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath = C('UPLOAD_DIR'); // 设置附件上传根目录
        $upload->savePath = 'sparepart'; // 设置附件上传（子）目录
        // 上传文件
        $info = $upload->uploadOne($file);
        if (!$info) {
            $data["message"] = $upload->getError();
            $data['success'] = FALSE;
        } else {
            $img_path = $info['savepath'] . $info['savename'];
            $data=  $img_path;
            // $this->ajaxReturn($img_path);
            $this->ajaxReturn($data);
        }

        // $this->ajaxReturn($info['savepath']);
    }

    public function addsparepartImage(){        
        $res = $_FILES['file'];        
        $res = $this -> uploadOneSparepart($res);
         echo $res;
        // $this->ajaxReturn($res);
    }  
        // var_dump($res);exit;        
        // return $this->success($res);        
    public function uploadOneEquipment ($file)
    {
        $upload = new Upload();// 实例化上传类
        $upload->maxSize = 3145728;// 设置附件上传大小
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath = C('UPLOAD_DIR'); // 设置附件上传根目录
        $upload->savePath = 'equipment'; // 设置附件上传（子）目录
        // 上传文件
        $info = $upload->uploadOne($file);
        if (!$info) {
            $data["message"] = $upload->getError();
            $data['success'] = FALSE;
        } else {
            $img_path = $info['savepath'] . $info['savename'];
            $data=  $img_path;
            // $this->ajaxReturn($img_path);
            $this->ajaxReturn($data);
        }

        // $this->ajaxReturn($info['savepath']);
    }

    public function addequipmentImage(){        
        $res = $_FILES['file'];        
        $res = $this -> uploadOneEquipment($res);
         echo $res;
        // $this->ajaxReturn($res);
    }    

}