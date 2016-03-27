<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;

class HaiTaoController extends Controller
{

  public function getList()
  {
    /*
    $data = array(
      array('id'=>'1', 'title'=>'title1'),
      array('id'=>'2', 'title'=>'title2')
    );
    */
    $haitaos = DB::select("SELECT id,title,created,hits FROM `w6gb7_content` WHERE catid=52 AND state=1 AND publish_up<=NOW() ORDER BY created DESC LIMIT 10");
    
    header('Access-Control-Allow-Origin: *');
    return json_encode($haitaos);
  }

  public function getDetailById($id)
  {
    //$data = array('content'=>'1', 'title'=>'title1');
    $haitao = DB::select("SELECT id,title,introtext,created,hits FROM `w6gb7_content` WHERE id=$id AND catid=52 AND state=1 AND publish_up<=NOW() ORDER BY modified DESC LIMIT 10");
    header('Access-Control-Allow-Origin: *');
    return json_encode($haitao[0]);
  }

}