<?php
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::get('/forecast', function () {
  $data = array(
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=404453623&idx=1&sn=612b256d49d36aa830c93654daeb35a7&scene=1&srcid=0401feOdsF3YGPN0QM1ru0JC&key=710a5d99946419d996a1f79bd5339de1b0c5cc17a9c021c1f4505c86712c2ff87bec5b736afd61c64970dcf3660051c0&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.4+build(15E65)&version=11020201&pass_ticket=eoUuzz6o4n%2BWNi7xFx0yaoHeQFwJmFCMxAP08lkfyJRz1vbA%2FcPiIcgJuvxw1Ygr', 'title'=>'2016年4月4号清明节放生通知'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=404075302&idx=2&sn=95bee80ad36fce9847d8f8e3ac37c94e&scene=1&srcid=03228CA4uhQIkp708aaId9kQ&key=710a5d99946419d99a688419a2e16aa9a6b278132750a3e2f94b244a054d77e0a2656e82ab36b518356d404ae77205cd&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=jgAotb4XXM0PAfZaqkLDTptSQ1KF35zH1gaGClPsQCydPFPuPeM9hLMh5MGTDSCQ', 'title'=>'2016年3月19日梅花鹿归来'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=404075302&idx=1&sn=dfe21b9b739269efa35261f233eb15b1&scene=0&previewkey=5VsNEkCOfnYrNJlgY6mb0cwqSljwj2bfCUaCyDofEow%3D&key=710a5d99946419d96f1202e537f97faa065c293aba06baf143b79b860fc205be542ecabbabe75273467acc0427062c07&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=jgAotb4XXM0PAfZaqkLDTptSQ1KF35zH1gaGClPsQCydPFPuPeM9hLMh5MGTDSCQ', 'title'=>'2016年3月16日（周三）释迦牟尼佛出家日放生通知'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=404015813&idx=1&sn=3d217a53c36d5d5b17075ce019ee5ba7&scene=0&previewkey=5VsNEkCOfnYrNJlgY6mb0cwqSljwj2bfCUaCyDofEow%3D&key=710a5d99946419d9260100815db1403e9e19efe8df9cc9a3a6f2a30e33b01d46ec80d9e86edb963a0bdb4acc608edee2&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=jgAotb4XXM0PAfZaqkLDTptSQ1KF35zH1gaGClPsQCydPFPuPeM9hLMh5MGTDSCQ', 'title'=>'2016年3月13日（周日）放生通知'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=403490983&idx=1&sn=70872c9b45a7ae9719c18fd96853603f&scene=0&previewkey=5VsNEkCOfnYrNJlgY6mb0cwqSljwj2bfCUaCyDofEow%3D&key=710a5d99946419d94b9db94d88b3a6a1bb896f423f980566889deb80db3a3a61a62cdba2817005bc0cf83c36756fef34&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=jgAotb4XXM0PAfZaqkLDTptSQ1KF35zH1gaGClPsQCydPFPuPeM9hLMh5MGTDSCQ', 'title'=>'2016年2月22日（元宵节）放生通知'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=403397146&idx=1&sn=ab24a4de2c778e42d0fd6f9efd27101a&scene=0&previewkey=5VsNEkCOfnYrNJlgY6mb0cwqSljwj2bfCUaCyDofEow%3D&key=710a5d99946419d99311ba0b2cdbae5e759466616b077e484526e74a6a0791c6b69bcba3c223d9f7a515adc7ab4e1590&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=jgAotb4XXM0PAfZaqkLDTptSQ1KF35zH1gaGClPsQCydPFPuPeM9hLMh5MGTDSCQ', 'title'=>'2016年2月16日（年初九）放生通知'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=403305833&idx=1&sn=d8822a199612cbbe450d7bfe46465acd&scene=0&previewkey=5VsNEkCOfnYrNJlgY6mb0cwqSljwj2bfCUaCyDofEow%3D&key=710a5d99946419d9a450df48ca02c1946f0a873a8c12cea69c0802c547f4d4eaa25e0fee5a1f034202943b79e2a38eef&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=jgAotb4XXM0PAfZaqkLDTptSQ1KF35zH1gaGClPsQCydPFPuPeM9hLMh5MGTDSCQ', 'title'=>'2016年2月8日（大年初一）江阴观心护生协会放生通知')
  );
  //
  try {
    $http_origin = $_SERVER['HTTP_ORIGIN'];
  } catch(Exception $e) {
    $http_origin = null;
  }
  
  if ($http_origin == "http://cmsmobile.jyfs.org" || $http_origin == "http://m.jyfs.org") {  
    header("Access-Control-Allow-Origin: $http_origin");
  }
  //header('Access-Control-Allow-Origin: *');
  return json_encode($data);
});

Route::get('/record', function () {
  $data = array(
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=504500014&idx=1&sn=5cf1c649c9ae84f3e998626d0dee210e&scene=1&srcid=04065j080YnQFWPrZu7gpEWF&key=710a5d99946419d9851bf947217ea1695a556a816136b034e49e4162417caede39421bfbdbdfcf09d35c333f03114422&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.4+build(15E65)&version=11020201&pass_ticket=qKiXqIT2%2B7aGvnh%2F1uxm%2FMFkQeqb%2F%2FtBAVqJ3Uj6%2B5w5cZ0SLxpa%2FxeEMiZTPfID', 'title'=>'2016年4月4日清明节放生纪实(附明细清单)'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=404459113&idx=1&sn=910a72cf315eec457fa65cc36695bcfb&scene=1&srcid=0401GE2p078QSD5ASl5JmjVT&key=710a5d99946419d9a1b456cb6ed7fd4943a141412e8d25efb4978c2933ccf59143c20468d699aed24fa4b1249c2fcaad&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.4+build(15E65)&version=11020201&pass_ticket=eoUuzz6o4n%2BWNi7xFx0yaoHeQFwJmFCMxAP08lkfyJRz1vbA%2FcPiIcgJuvxw1Ygr', 'title'=>'2016观世音菩萨圣诞飞锡古寺朝圣团朝圣君山寺'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=404242234&idx=1&sn=ac6fcd37cbedaf19f0d7f1ea857e2bcb&scene=0&previewkey=5VsNEkCOfnYrNJlgY6mb0cwqSljwj2bfCUaCyDofEow%3D&key=710a5d99946419d953045b7f5156c6d480dcbabcea8ffa2c7ed11f5e3142d74144b0f12783fd278b680a7ba21c979629&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=jgAotb4XXM0PAfZaqkLDTptSQ1KF35zH1gaGClPsQCydPFPuPeM9hLMh5MGTDSCQ', 'title'=>'江阴护生园之鹿儿归来【2013.10-2016.3】'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=404121955&idx=1&sn=e6fb42f7b14d2e944e7de89c3a34c68d&scene=0&previewkey=5VsNEkCOfnYrNJlgY6mb0cwqSljwj2bfCUaCyDofEow%3D&key=710a5d99946419d915def50e7ef8b91427367b1c0791b62c53940695af86dee2a1c3acff3f803df9f89936439d23f320&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=jgAotb4XXM0PAfZaqkLDTptSQ1KF35zH1gaGClPsQCydPFPuPeM9hLMh5MGTDSCQ', 'title'=>'2016年3月16日（释迦牟尼佛出家日）弘化社于江阴长江举行大型放生活动'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=404152603&idx=1&sn=81c0c7a1c05d90ce8165b969d08d911b&scene=0&previewkey=5VsNEkCOfnYrNJlgY6mb0cwqSljwj2bfCUaCyDofEow%3D&key=710a5d99946419d9497547df321bb9a222e88ec852a3b26ceb11cb5f134969a10f2927f7edc0e32aab73fb0ad083ca55&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=jgAotb4XXM0PAfZaqkLDTptSQ1KF35zH1gaGClPsQCydPFPuPeM9hLMh5MGTDSCQ', 'title'=>'江阴观心护生协会2016年3月13日放生微记录（附善款明细）'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=403551634&idx=1&sn=4a3810e1bbf2b54407db7a4df1642a50&scene=0&previewkey=5VsNEkCOfnYrNJlgY6mb0cwqSljwj2bfCUaCyDofEow%3D&key=710a5d99946419d9d2a54c0d15ec6552114f1cafd9dbe490270b7e93e445cd9d47da7f3ae2c153784a7acf17e10537cd&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=jgAotb4XXM0PAfZaqkLDTptSQ1KF35zH1gaGClPsQCydPFPuPeM9hLMh5MGTDSCQ', 'title'=>'2016年2月22日（元宵节）弘化社于江阴长江举行大型放生活动'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=403459597&idx=1&sn=b3995f5314b360df87350d59a0eebfab&scene=0&previewkey=5VsNEkCOfnYrNJlgY6mb0cwqSljwj2bfCUaCyDofEow%3D&key=710a5d99946419d9eac665572f30d99e5c90d377a2c32e693d42a33117ad6ce5233d5986d70805355f0f685da6f56fe4&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=jgAotb4XXM0PAfZaqkLDTptSQ1KF35zH1gaGClPsQCydPFPuPeM9hLMh5MGTDSCQ', 'title'=>'2016年2月16日（年初九）弘化社于江阴长江举行大型放生活动'),
    array('url'=>'https://mp.weixin.qq.com/s?__biz=MzA5NjQxNzMyNQ==&mid=403357786&idx=1&sn=ec45234fbbb5c3bede50f1967aa3e6c1&scene=0&previewkey=5VsNEkCOfnYrNJlgY6mb0cwqSljwj2bfCUaCyDofEow%3D&key=710a5d99946419d9581818155f262c42cfaf8e36b51d4161565140ce22d86d6ca8a35b81546bf51b501984b56195862f&ascene=0&uin=NTM4MzEyNTAw&devicetype=iMac+MacBookAir6%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=jgAotb4XXM0PAfZaqkLDTptSQ1KF35zH1gaGClPsQCydPFPuPeM9hLMh5MGTDSCQ', 'title'=>'2016年2月8日（大年初一）弘化社于江阴长江举行大型放生活动')
  );
  //
  try {
    $http_origin = $_SERVER['HTTP_ORIGIN'];
  } catch(Exception $e) {
    $http_origin = null;
  }
  
  if ($http_origin == "http://cmsmobile.jyfs.org" || $http_origin == "http://m.jyfs.org") {  
    header("Access-Control-Allow-Origin: $http_origin");
  }
  //header('Access-Control-Allow-Origin: *');
  return json_encode($data);
});

Route::get('/haitao', 'HaiTaoController@getList');

Route::get('/haitao/{id}', 'HaiTaoController@getDetailById');

Route::get('/welcome', function () {
  return view('welcome');
});

Route::get('/foo', function () {
    return 'Hello World';
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});
