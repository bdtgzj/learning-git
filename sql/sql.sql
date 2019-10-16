CREATE DATABASE IF NOT EXISTS `db_gzgl2` DEFAULT CHARACTER SET=utf8;

/*
CREATE TABLE IF NOT EXISTS `g_zgb` (
  `zid` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `lxid` INT(11) DEFAULT NULL COMMENT '类型ID（1编内，2编外，3编外城区所，4退休，5离休）',
  `bmid` INT(11) DEFAULT NULL COMMENT '部门ID',
  `name` VARCHAR(32) NOT NULL COMMENT '姓名',
  `sex` TINYINT(1) DEFAULT NULL COMMENT '性别',
  `sfz` VARCHAR(20) DEFAULT NULL COMMENT '身份证号码',
  `csny` DATE DEFAULT NULL COMMENT '出生年月',
  `rzrq` DATE DEFAULT NULL COMMENT '入职日期',
  `tel` VARCHAR(16) DEFAULT NULL COMMENT '电话',
  `phone` VARCHAR(11) DEFAULT NULL COMMENT '手机',
  `email` VARCHAR(32) DEFAULT NULL COMMENT '电子邮箱',
  `lxdz` VARCHAR(64) DEFAULT NULL COMMENT '联系地址',
  `hyzk` TINYINT(1) DEFAULT NULL  COMMENT '婚姻状况',
  `zzmm` VARCHAR(8) DEFAULT NULL  COMMENT '政治面貌',
  `mz` VARCHAR(8) DEFAULT NULL  COMMENT '名族',
  `jg` VARCHAR(8) DEFAULT NULL  COMMENT '籍贯',
  `xl` VARCHAR(8) DEFAULT NULL  COMMENT '学历',
  `zy` VARCHAR(16) DEFAULT NULL  COMMENT '专业',
  `byyx` VARCHAR(64) DEFAULT NULL  COMMENT '毕业院校',
  `zwid` INT(11) DEFAULT NULL  COMMENT '职位ID',
  `zc` VARCHAR(8) DEFAULT NULL  COMMENT '职称',
  `grjl` MEDIUMTEXT DEFAULT NULL  COMMENT '个人简历',
  `jbgz` VARCHAR(16) DEFAULT NULL  COMMENT '基本工资',
  `gzzt` VARCHAR(8) DEFAULT NULL  COMMENT '工作状态',
  `pic` VARCHAR(128) DEFAULT NULL  COMMENT '照片',
  `bz` VARCHAR(128) DEFAULT NULL  COMMENT '备注',
  `listid` INT(11) UNSIGNED DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`zid`) COMMENT '主键',
  FOREIGN KEY(`lxid`) REFERENCES yglx(`id`),
  FOREIGN KEY(`bmid`) REFERENCES department(`did`),
  FOREIGN KEY(`zwid`) REFERENCES duty(`id`)
) ENGINE=MyISAM AUTO_INCREMENT=183 DEFAULT CHARSET=utf8 COMMENT='职工信息表';

SELECT a.zid,a.lxid,b.name AS lxname,a.bmid,d.dname AS bmname,a.name,a.sex,a.sfz,a.csny,a.rzrq,a.tel,a.phone,a.email,a.lxdz,a.hyzk,a.zzmm,a.mz,a.jg,a.xl,a.zy,a.byyx,a.zwid,c.name AS zwname,a.zc,a.grjl,a.jbgz,a.gzzt,a.pic,a.bz,a.listid FROM g_zgb AS a LEFT JOIN (yglx AS b, duty AS c, department AS d)
    ON (a.lxid=b.id AND a.bmid=d.did AND a.zwid=c.id);

INSERT INTO `department` (dname, topid) VALUES ('江阴市水利农机局', 0);

CREATE TABLE IF NOT EXISTS `rs_zw` (
  `id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` VARCHAR(16) NOT NULL COMMENT '职务名称',
  `listid` SMALLINT(5) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='职务信息表';
*/

CREATE TABLE `member` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `bmid` smallint(5) DEFAULT NULL COMMENT '部门编号',
  `loginname` varchar(32) NOT NULL COMMENT '登录名',
  `password` varchar(64) DEFAULT NULL COMMENT '登录密码',
  `status` ENUM('停用', '启用') DEFAULT NULL COMMENT '账号状态',
  `isadmin` ENUM('是', '否') DEFAULT NULL COMMENT '是否超级管理员',
  `roleid` smallint(5) DEFAULT NULL COMMENT '权限id',
  `nickname` varchar(32) DEFAULT NULL COMMENT '用户昵称',
  `sex` ENUM('男', '女') DEFAULT NULL COMMENT '性别',
  `sfz` char(18) DEFAULT NULL COMMENT '身份证',
  `jtzz` varchar(100) DEFAULT NULL COMMENT '家庭住址',
  `homephone` varchar(18) DEFAULT NULL COMMENT '电话',
  `mobilephone` varchar(18) DEFAULT NULL COMMENT '手机',
  `email` varchar(64) DEFAULT NULL COMMENT '邮件',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录增加时间',
  `modofytime` datetime DEFAULT NULL COMMENT '记录修改时间',
  `lastlogintime` datetime DEFAULT NULL COMMENT '最后登录时间',
  `logintimes` int(11) DEFAULT 0 COMMENT '登录次数',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `listid` smallint(5) DEFAULT NULL COMMENT '排序ID',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='业务操作人员信息表';

INSERT INTO `member` (`bmid`, `loginname`, `password`, `isadmin`, `status`) VALUES ('1', 'admin', 'dc483e80a7a0bd9ef71d8cf973673924', '是', '启用');

CREATE TABLE IF NOT EXISTS `online` (
  `sessionid` varchar(64) NOT NULL COMMENT '客户端session ID',
  `userid` smallint(5) DEFAULT NULL COMMENT '业务操作人员ID',
  `loginname` varchar(32) DEFAULT NULL COMMENT '业务操作人员登录名',
  `nickname` varchar(32) DEFAULT NULL COMMENT '业务操作人员昵称',
  `logintime` datetime DEFAULT NULL COMMENT '登录时间',
  `lasttime` datetime DEFAULT NULL COMMENT '最后登录时间',
  `remoteip` varchar(16) DEFAULT NULL COMMENT '客户端IP',
  PRIMARY KEY (`sessionId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='在线业务操作人员信息表';

CREATE TABLE IF NOT EXISTS `loginlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `userid` varchar(16) DEFAULT NULL COMMENT '业务操作人员编号',
  `loginname` varchar(32) DEFAULT NULL COMMENT '业务操作人员登录名',
  `nickname` varchar(32) DEFAULT NULL COMMENT '业务操作人员昵称',
  `logintime` datetime DEFAULT NULL COMMENT '登录时间',
  `ipaddress` varchar(16) DEFAULT NULL COMMENT '登录IP地址',
  `flag` tinyint DEFAULT NULL COMMENT '登录是否成功',
  `remark` varchar(20) DEFAULT NULL COMMENT '备注登录成功失败的原因',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='业务操作人员登录信息表';

CREATE TABLE IF NOT EXISTS `operationlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `bmid` smallint(5) NOT NULL  COMMENT '部门编号',
  `bmname` VARCHAR(16) NOT NULL  COMMENT '部门名称',
  `userid` smallint(5) NOT NULL COMMENT '业务操作人员编号',
  `loginname` varchar(32) DEFAULT NULL COMMENT '业务操作人员登录名',
  `operationtime` datetime DEFAULT NULL COMMENT '操作时间',
  `ipaddress` varchar(16) DEFAULT NULL COMMENT '登录IP地址',
  `operation` text DEFAULT NULL COMMENT '操作信息',
  `remark` varchar(20) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='业务操作人员操作信息表';

CREATE TABLE IF NOT EXISTS `role` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` VARCHAR(16) NOT NULL COMMENT '角色名称',
  `role` text NOT NULL COMMENT '角色',
  `listid` smallint(5) DEFAULT NULL COMMENT '排序ID',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='角色表';
/*工资表*/
CREATE TABLE IF NOT EXISTS `template_desc` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `bmid` smallint(5) DEFAULT NULL COMMENT '部门编号',
  `bzid` smallint(5) DEFAULT NULL COMMENT '人员编制类型编号',
  `template_desc` BLOB DEFAULT NULL COMMENT '模板描述',
  PRIMARY KEY (`id`),
  KEY `idx_bmid` (`bmid`),
  KEY `idx_bzid` (`bzid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='模板描述表';
/* 工资模板表 */
CREATE TABLE IF NOT EXISTS `template_部门编号` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `uid` int(10) default NULL COMMENT '人员编号',
  `name` VARCHAR(16) NOT NULL COMMENT '姓名',
  `bzid` smallint(5) DEFAULT NULL COMMENT '人员编制类型编号',
  `ny` char(6) default NULL COMMENT '年月',
  /*应发工资条款*/
      /*工资*/
  `jcgz` decimal(10,2) default NULL COMMENT '基础工资',
  `gwgz` decimal(10,2) default NULL COMMENT '岗位工资',
  `zwgz` decimal(10,2) default NULL COMMENT '职务工资',
  `xjgz` decimal(10,2) default NULL COMMENT '薪级工资',
      /*补贴*/
  `ylbt` decimal(10,2) default NULL COMMENT '医疗补贴',
  `tzbt` decimal(10,2) default NULL COMMENT '提租补贴',
  `jtbt` decimal(10,2) default NULL COMMENT '交通补贴',
  `dhbt` decimal(10,2) default NULL COMMENT '电话补贴',
  `shbt` decimal(10,2) default NULL COMMENT '生活补贴',
  `glbt` decimal(10,2) default NULL COMMENT '工龄补贴',
  `gwjt` decimal(10,2) default NULL COMMENT '岗位津贴',
  `tsgwjt` decimal(10,2) default NULL COMMENT '特殊岗位津贴',
  `qtgz` decimal(10,2) default NULL COMMENT '其他工资',
  `bfgz` decimal(10,2) default NULL COMMENT '补发工资',
  `yfgz` decimal(10,2) default NULL COMMENT '应发工资',
  /*应扣工资条款*/
  `kzfgjj` decimal(10,2) default NULL COMMENT '扣住房公积金',
  `kylbx` decimal(10,2) default NULL COMMENT '扣养老保险',
  `kgrsds` decimal(10,2) default NULL COMMENT '扣个人所得税',
  `kghf` decimal(10,2) default NULL COMMENT '扣工会费',
  `kqt` decimal(10,2) default NULL COMMENT '其他扣款',
  `kxj` decimal(10,2) default NULL COMMENT '扣款小计',
  /*实发工资*/
  `sfje` decimal(10,2) default NULL COMMENT '实发金额',
  /*预留字段*/
  `field_text1` varchar(32) default null COMMENT '预留文本字段',
  `field_text2` varchar(32) default null COMMENT '预留文本字段',
  `field_decimal1` decimal(10,2) default null COMMENT '预留数字字段',
  `field_decimal2` decimal(10,2) default null COMMENT '预留数字字段',
  `listid` INT(11) DEFAULT NULL COMMENT '排序ID',
  PRIMARY KEY (`id`),
  FOREIGN KEY(`uid`) REFERENCES rs_zzry_outline(`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY(`bzid`) REFERENCES rs_rybz(`id`) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='工资模板表1';

/*奖金福利*/
CREATE TABLE IF NOT EXISTS `welfare_部门编号` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `uid` INT(10) DEFAULT NULL COMMENT '人员编号',
  `name` VARCHAR(16) NOT NULL COMMENT '姓名',
  `bzid` SMALLINT(5) DEFAULT NULL COMMENT '人员编制类型编号',
  `ny` CHAR(6) DEFAULT NULL COMMENT '年月',
  `type` ENUM('奖金', '福利') DEFAULT NULL COMMENT '发放类型',
  `money` DECIMAL(10,2) DEFAULT NULL COMMENT '发放金额',
  `remark` VARCHAR(64) DEFAULT NULL COMMENT '发放说明',
  `listid` INT(11) DEFAULT NULL COMMENT '排序ID',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='奖金福利表1';

/*报表*/

/*人事管理表*/
CREATE TABLE IF NOT EXISTS `rs_bm` (
  `id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` VARCHAR(16) NOT NULL COMMENT '部门名称',
  `topid` SMALLINT(5) NOT NULL COMMENT '上级部门编号',
  `address` VARCHAR(50) DEFAULT NULL COMMENT '部门地址',
  `phone` VARCHAR(18) DEFAULT NULL COMMENT '部门电话 ',
  `fax` VARCHAR(18) DEFAULT NULL COMMENT '部门传真 ',
  `zipcode` CHAR(6) DEFAULT NULL COMMENT '邮政编码',
  `website` VARCHAR(50) DEFAULT NULL COMMENT '部门网址',
  `remark` VARCHAR(30) DEFAULT NULL COMMENT '备注',
  `listid` SMALLINT(5) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='部门表';
INSERT INTO `rs_bm`(name, topid) VALUES ('江阴市水利农机局', 0);

CREATE TABLE IF NOT EXISTS `rs_rybz` (
  `id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` VARCHAR(16) NOT NULL COMMENT '人员编制名称',
  `listid` SMALLINT(5) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='人员编制表';

CREATE TABLE IF NOT EXISTS `rs_gwgz` (
  `id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` VARCHAR(16) NOT NULL COMMENT '岗位工种名称',
  `listid` SMALLINT(5) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='岗位工种表';

CREATE TABLE IF NOT EXISTS `rs_ryzj` (
  `id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` VARCHAR(16) NOT NULL COMMENT '人员职级名称',
  `listid` SMALLINT(5) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='人员职级信息表';

CREATE TABLE IF NOT EXISTS `rs_ryxz` (
  `id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` VARCHAR(16) NOT NULL COMMENT '本人性质名称',
  `listid` SMALLINT(5) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='人员性质信息表';

CREATE TABLE IF NOT EXISTS `rs_jsdj` (
  `id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` VARCHAR(16) NOT NULL COMMENT '技术等级名称',
  `listid` SMALLINT(5) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='技术等级信息表';

CREATE TABLE IF NOT EXISTS `rs_jszc` (
  `id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` VARCHAR(16) NOT NULL COMMENT '技术职称名称',
  `listid` SMALLINT(5) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='技术职称信息表';

CREATE TABLE IF NOT EXISTS `rs_gzbz` (
  `id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` VARCHAR(16) NOT NULL COMMENT '工资标准名称',
  `listid` SMALLINT(5) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='工资标准信息表';

CREATE TABLE IF NOT EXISTS `rs_zzry_outline` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `bmid` SMALLINT(5) NOT NULL COMMENT '工作部门ID',
  `bmdetail` VARCHAR(200) NOT NULL COMMENT '工作部门路径',
  `name` VARCHAR(16) NOT NULL COMMENT '姓名',
  `sfz` CHAR(18) NOT NULL COMMENT '身份证号码',
  `sex` ENUM('男', '女') DEFAULT NULL COMMENT '性别',
  `csny` DATE DEFAULT NULL COMMENT '出生年月',
  `jg` VARCHAR(16) DEFAULT NULL  COMMENT '籍贯',
  `rdny` DATE DEFAULT NULL COMMENT '入党年月',
  `bzid` SMALLINT(5) DEFAULT NULL  COMMENT '编制ID',
  `gzsj` DATE DEFAULT NULL COMMENT '工作时间',
  `pysj` DATE DEFAULT NULL COMMENT '聘用时间',
  `gwgzid` SMALLINT(5) DEFAULT NULL COMMENT '岗位（工种）ID',
  `ryzjid` SMALLINT(5) DEFAULT NULL COMMENT '人员职级ID',
  `bysj` DATE DEFAULT NULL COMMENT '毕业时间',
  `whcd` ENUM('博士后','博士研究生','硕士研究生','本科','专科','高中','中专','初中','小学') DEFAULT NULL COMMENT '文化程度/学历',
  `ryxzid` SMALLINT(5) DEFAULT NULL COMMENT '本人性质ID',
  `rzsj` DATE DEFAULT NULL COMMENT '任职时间',
  `jsdjid` SMALLINT(5) DEFAULT NULL COMMENT '技术等级ID',
  `jszcid` VARCHAR(16) DEFAULT NULL COMMENT '技术职称ID',
  `gzbzid` SMALLINT(5) DEFAULT NULL COMMENT '工资标准ID',
  `xjgzj` VARCHAR(16) DEFAULT NULL COMMENT '薪级工资级',
  `xjgzd` VARCHAR(16) DEFAULT NULL COMMENT '薪级工资档',
  `xjgzje` DECIMAL(10,2) DEFAULT NULL COMMENT '薪级工资级额',
  `gwgz` DECIMAL(10,2) DEFAULT NULL COMMENT '岗位工资',
  `zgjt` DECIMAL(10,2) DEFAULT NULL COMMENT '职岗津贴',
  `jtzz` VARCHAR(100) DEFAULT NULL COMMENT '家庭住址',
  `formername` VARCHAR(16) DEFAULT NULL COMMENT '曾用名',
  `race` VARCHAR(16) DEFAULT NULL COMMENT '民族',
  `degrees` ENUM('学士','硕士','博士') DEFAULT NULL COMMENT '学位',
  `homeplace` VARCHAR(100) DEFAULT NULL COMMENT '出生地 ',
  `homephone` VARCHAR(18) DEFAULT NULL COMMENT '宅电 ',
  `health` VARCHAR(50) DEFAULT NULL COMMENT '健康状况 ',
  `photo` VARCHAR(50) DEFAULT NULL COMMENT '照片 ',
  `listid` INT(10) DEFAULT NULL COMMENT '排序ID',
  PRIMARY KEY (`id`),
  FOREIGN KEY(`bmid`) REFERENCES rs_bm(`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY(`bzid`) REFERENCES rs_rybz(`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY(`ryzjid`) REFERENCES rs_ryzj(`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY(`ryxzid`) REFERENCES rs_ryxz(`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY(`jsdjid`) REFERENCES rs_jsdj(`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY(`gwgzid`) REFERENCES rs_gwgz(`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY(`jszcid`) REFERENCES rs_jszc(`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY(`gzbzid`) REFERENCES rs_gzbz(`id`) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='在职人员概要表';

CREATE TABLE IF NOT EXISTS `rs_zzry_extension` (
  `id` INT(10) UNSIGNED NOT NULL COMMENT '在职人员编号',
  `joinwork` VARCHAR(200) DEFAULT NULL COMMENT '参加工作信息',
  `joinparty` VARCHAR(200) DEFAULT NULL COMMENT '入党信息',
  `joinleague` VARCHAR(200) DEFAULT NULL COMMENT '入团信息',
  `joindemocratic` VARCHAR(200) DEFAULT NULL COMMENT '入民主党派信息',
  `takeoffice` VARCHAR(200) DEFAULT NULL COMMENT '任职信息',
  `rank` VARCHAR(200) DEFAULT NULL COMMENT '军警衔信息',
  `training` VARCHAR(500) DEFAULT NULL COMMENT '培训信息',
  `speciality` VARCHAR(200) DEFAULT NULL COMMENT '专长信息',
  `joingroup` VARCHAR(200) DEFAULT NULL COMMENT '入社会团体信息',
  `religion` VARCHAR(200) DEFAULT NULL COMMENT '宗教信仰信息',
  `i18nactivity` VARCHAR(500) DEFAULT NULL COMMENT '参加国际活动信息',
  `linguistic` VARCHAR(200) DEFAULT NULL COMMENT '语言及其他技能信息',
  `award` VARCHAR(200) DEFAULT NULL COMMENT '奖励信息',
  `punish` VARCHAR(200) DEFAULT NULL COMMENT '处分信息',
  `joinrebel` VARCHAR(500) DEFAULT NULL COMMENT '参加反动组织信息',
  `culturalrevolution` VARCHAR(500) DEFAULT NULL COMMENT '文革信息',
  `remark` VARCHAR(500) DEFAULT NULL COMMENT '其他需要说明的问题',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='在职人员扩展表';

CREATE TABLE IF NOT EXISTS `rs_zzry_learningresume` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `uid` INT(10) UNSIGNED NOT NULL COMMENT '在职人员编号',
  `startdate` DATE DEFAULT NULL COMMENT '起年月',
  `enddate` DATE DEFAULT NULL COMMENT '止年月',
  `collegespeciality` VARCHAR(50) NOT NULL COMMENT '院校及专业',
  `result` VARCHAR(16) NOT NULL COMMENT '毕、结、肄业',
  `authenticator` VARCHAR(16) DEFAULT NULL COMMENT '证明人',
  `listid` INT(11) DEFAULT NULL COMMENT '排序ID',
  KEY `idx_uid` (`uid`),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='学习简历表';

CREATE TABLE IF NOT EXISTS `rs_zzry_workexperience` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `uid` INT(10) UNSIGNED NOT NULL COMMENT '在职人员编号',
  `startdate` DATE DEFAULT NULL COMMENT '起年月',
  `enddate` DATE DEFAULT NULL COMMENT '止年月',
  `companyduty` VARCHAR(50) DEFAULT NULL COMMENT '单位及职务',
  `authenticator` VARCHAR(16) DEFAULT NULL COMMENT '证明人',
  `listid` INT(11) DEFAULT NULL COMMENT '排序ID',
  KEY `idx_uid` (`uid`),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='工作经历表';

CREATE TABLE IF NOT EXISTS `rs_zzry_joinofficial` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `uid` INT(10) UNSIGNED NOT NULL COMMENT '在职人员编号',
  `atdate` DATE NOT NULL COMMENT '年月日',
  `meetingname` VARCHAR(50) DEFAULT NULL COMMENT '会议名称',
  `duty` VARCHAR(50) NOT NULL COMMENT '身份及职务',
  `listid` INT(11) DEFAULT NULL COMMENT '排序ID',
  KEY `idx_uid` (`uid`),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='当官（人大、政协等）情况表';

CREATE TABLE IF NOT EXISTS `rs_zzry_family` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `uid` INT(10) UNSIGNED NOT NULL COMMENT '在职人员编号',
  `relationtype` ENUM('配偶','其他成员','国内外主要社会关系') NOT NULL COMMENT '关系类型(配偶、其他成员、国内外主要社会关系)',
  `relationname` VARCHAR(16) NOT NULL COMMENT '关系名称',
  `name` VARCHAR(16) NOT NULL COMMENT '姓名',
  `birthday` DATE DEFAULT NULL COMMENT '出生日期',
  `race` VARCHAR(16) DEFAULT NULL COMMENT '民族',
  `homeplace` VARCHAR(16) DEFAULT NULL COMMENT '籍贯',
  `joinworkday` DATE DEFAULT NULL COMMENT '参加工作时间',
  `politicalstatus` VARCHAR(10) DEFAULT NULL COMMENT '政治面貌',
  `education` ENUM('博士后','博士研究生','硕士研究生','本科','专科','高中','中专','初中','小学') DEFAULT NULL COMMENT '学历',
  `salary` VARCHAR(30) DEFAULT NULL COMMENT '工资情况',
  `technicaltitle` VARCHAR(30) DEFAULT NULL COMMENT '专业技术职称',
  `collegespeciality` VARCHAR(50) DEFAULT NULL COMMENT '毕业院校及专业',
  `companyduty` VARCHAR(50) DEFAULT NULL COMMENT '工作单位及职务',
  `listid` INT(11) DEFAULT NULL COMMENT '排序ID',
  KEY `idx_uid` (`uid`),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='家庭主要成员情况及国内外主要社会关系情况信息表';

CREATE TABLE IF NOT EXISTS `rs_txry` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `bmid` SMALLINT(5) NOT NULL COMMENT '部门ID',
  `bmdetail` VARCHAR(200) NOT NULL COMMENT '工作部门路径',
  `name` VARCHAR(16) NOT NULL COMMENT '姓名',
  `sfz` CHAR(18) NOT NULL COMMENT '身份证号码',
  `sex` ENUM('男', '女') DEFAULT NULL COMMENT '性别',
  `csny` DATE DEFAULT NULL COMMENT '出生年月',
  `gzsj` DATE DEFAULT NULL COMMENT '参加工作时间',
  `tlxbsj` DATE DEFAULT NULL COMMENT '退离休保时间',
  `gzbzid` SMALLINT(5) DEFAULT NULL COMMENT '工资标准ID',
  `yzwgz` DECIMAL(10,2) DEFAULT NULL COMMENT '原职务工资',
  `yjtgz` DECIMAL(10,2) DEFAULT NULL COMMENT '原津贴工资',
  `yjcgz` DECIMAL(10,2) DEFAULT NULL COMMENT '原基础工资',
  `yglgz` DECIMAL(10,2) DEFAULT NULL COMMENT '原工龄工资',
  `ygwjt` DECIMAL(10,2) DEFAULT NULL COMMENT '原岗位津贴',
  `jcgz` DECIMAL(10,2) DEFAULT NULL COMMENT '基础工资',
  `glgz` DECIMAL(10,2) DEFAULT NULL COMMENT '工龄工资',
  `zwgz` DECIMAL(10,2) DEFAULT NULL COMMENT '职务工资',
  `jtgz` DECIMAL(10,2) DEFAULT NULL COMMENT '津贴工资',
  `gwjt` DECIMAL(10,2) DEFAULT NULL COMMENT '岗位津贴',
  `gzbt` DECIMAL(10,2) DEFAULT NULL COMMENT '各种补贴',
  `slbt` DECIMAL(10,2) DEFAULT NULL COMMENT '水利补贴',
  `lnzz` DECIMAL(10,2) DEFAULT NULL COMMENT '历年增资',
  `tyb` DECIMAL(10,2) DEFAULT NULL COMMENT '贴月补',
  `hj` DECIMAL(10,2) DEFAULT NULL COMMENT '合计',
  `jtzz` VARCHAR(100) DEFAULT NULL COMMENT '家庭住址',
  `listid` INT(10) DEFAULT NULL COMMENT '排序ID',
  PRIMARY KEY (`id`),
  FOREIGN KEY(`bmid`) REFERENCES rs_bm(`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY(`gzbzid`) REFERENCES rs_gzbz(`id`) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='退休人员信息表';

CREATE TABLE IF NOT EXISTS `rs_gbrmspb` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` VARCHAR(16) NOT NULL COMMENT '姓名',
  `sex` ENUM('男', '女') DEFAULT NULL COMMENT '性别',
  `csny` DATE DEFAULT NULL COMMENT '出生年月',
  `yearsold` SMALLINT(5) DEFAULT NULL COMMENT '岁数',
  `race` VARCHAR(16) DEFAULT NULL COMMENT '民族',
  `jg` VARCHAR(16) DEFAULT NULL  COMMENT '籍贯',
  `homeplace` VARCHAR(50) DEFAULT NULL COMMENT '出生地 ',
  `rdny` DATE DEFAULT NULL COMMENT '入党时间',
  `gzsj` DATE DEFAULT NULL COMMENT '参加工作时间',
  `health` VARCHAR(50) DEFAULT NULL COMMENT '健康状况 ',
  `zyjszw` VARCHAR(16) DEFAULT NULL COMMENT '专业技术职务',
  `speciality` VARCHAR(50) DEFAULT NULL COMMENT '熟悉专业有何专长',
  `qrzjyxl` VARCHAR(16) DEFAULT NULL COMMENT '全日制教育学历',
  `qrzjyxw` VARCHAR(16) DEFAULT NULL COMMENT '全日制教育学位',
  `zzjyxl` VARCHAR(16) DEFAULT NULL COMMENT '在职教育学历',
  `zzjyxw` VARCHAR(16) DEFAULT NULL COMMENT '在职教育学位',
  `qrzjycollege` VARCHAR(50) DEFAULT NULL COMMENT '全日制教育毕业院校系',
  `qrzjyspeciality` VARCHAR(50) DEFAULT NULL COMMENT '全日制教育毕业院校系专业',
  `zzjycollege` VARCHAR(50) DEFAULT NULL COMMENT '在职教育毕业院校系',
  `zzjyspeciality` VARCHAR(50) DEFAULT NULL COMMENT '在职教育毕业院校系专业',
  `sfz` CHAR(18) NOT NULL COMMENT '身份证号码',
  `bmid` SMALLINT(5) NOT NULL COMMENT '工作部门ID',
  `bmdetail` VARCHAR(200) NOT NULL COMMENT '工作部门路径',
  `xrzw` VARCHAR(30) DEFAULT NULL COMMENT '现任职务',
  `nrzw` VARCHAR(30) DEFAULT NULL COMMENT '拟任职务',
  `nmzw` VARCHAR(30) DEFAULT NULL COMMENT '拟免职务',
  `resume` VARCHAR(500) DEFAULT NULL COMMENT '简历',
  `punish` VARCHAR(200) DEFAULT NULL COMMENT '惩罚情况',
  `evaluationresult` VARCHAR(200) DEFAULT NULL COMMENT '年度考核结果',
  `appointdismissreason` VARCHAR(200) DEFAULT NULL COMMENT '任免理由',
  `submitunit` VARCHAR(200) DEFAULT NULL COMMENT '呈报单位',
  `approvalsuggestion` VARCHAR(80) DEFAULT NULL COMMENT '审批机关意见',
  `appointdismisssuggestion` VARCHAR(80) DEFAULT NULL COMMENT '行政机关任免意见',
  `approvaldate` DATE DEFAULT NULL COMMENT '审批时间',
  `appointdismissdate` DATE DEFAULT NULL COMMENT '任免时间',
  `photo` VARCHAR(50) DEFAULT NULL COMMENT '照片 ',
  `listid` INT(10) DEFAULT NULL COMMENT '排序ID',
  PRIMARY KEY (`id`),
  FOREIGN KEY(`bmid`) REFERENCES rs_bm(`id`) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='干部任免审批表';

CREATE TABLE IF NOT EXISTS `rs_gbrmspb_family` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编号',
  `uid` INT(10) UNSIGNED NOT NULL COMMENT '被审批人员编号',
  `relationname` VARCHAR(16) NOT NULL COMMENT '关系名称',
  `name` VARCHAR(16) NOT NULL COMMENT '姓名',
  `birthday` DATE DEFAULT NULL COMMENT '出生日期',
  `politicalstatus` VARCHAR(10) DEFAULT NULL COMMENT '政治面貌',
  `companyduty` VARCHAR(50) DEFAULT NULL COMMENT '工作单位及职务',
  `listid` INT(11) DEFAULT NULL COMMENT '排序ID',
  KEY `idx_uid` (`uid`),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='干部任免审批表之家庭主要成员情况信息表';


插入工资信息
INSERT INTO `template_11` VALUES (NULL,6,'顾建华',1,'201505',NULL,930.00,NULL,673.00,6.00,504.00,300.00,NULL,1750.00,NULL,1932.00,NULL,NULL,0.00,6095.00,1234.00,449.00,27.39,2.00,0.00,1712.39,0.00,NULL,NULL,NULL,NULL,4382),(NULL,7,'殷建方',1,'201505',NULL,1180.00,NULL,735.00,6.00,580.00,300.00,NULL,1750.00,NULL,2096.00,NULL,NULL,0.00,6647.00,1422.00,489.00,37.11,2.00,0.00,1950.11,4696.89,NULL,NULL,NULL,NULL,NULL),(NULL,8,'耿华芳',1,'201505',NULL,930.00,NULL,703.00,6.00,505.00,300.00,NULL,1750.00,NULL,2014.00,NULL,NULL,0.00,6208.00,1238.00,458.00,30.36,2.00,0.00,1728.36,4479.64,NULL,NULL,NULL,NULL,NULL),(NULL,9,'徐　虎',3,'201505',NULL,747.00,NULL,0.00,0.00,0.00,0.00,NULL,1200.00,NULL,980.00,0.00,NULL,0.00,2927.00,178.00,212.00,NULL,2.00,0.00,392.00,2535.00,NULL,NULL,NULL,NULL,NULL),(NULL,10,'卢伊娜',3,'201505',NULL,747.00,NULL,0.00,0.00,0.00,0.00,NULL,1200.00,NULL,1175.00,0.00,NULL,0.00,3122.00,178.00,212.00,NULL,2.00,0.00,392.00,2730.00,NULL,NULL,NULL,NULL,NULL),(NULL,11,'李兹红',3,'201505',NULL,823.00,NULL,0.00,0.00,0.00,0.00,NULL,1200.00,NULL,1397.00,0.00,NULL,0.00,3420.00,178.00,212.00,NULL,2.00,0.00,392.00,3028.00,NULL,NULL,NULL,NULL,NULL),(NULL,12,'徐玉惠',4,'201505',0.00,NULL,0.00,NULL,NULL,109.00,150.00,0.00,0.00,0.00,0.00,0.00,NULL,0.00,259.00,NULL,NULL,NULL,NULL,0.00,0.00,259.00,NULL,NULL,NULL,0.00,NULL),(NULL,13,'宋坤良',4,'201505',0.00,NULL,0.00,NULL,NULL,102.00,150.00,0.00,0.00,0.00,0.00,0.00,NULL,0.00,252.00,NULL,NULL,NULL,NULL,0.00,0.00,252.00,NULL,NULL,NULL,0.00,NULL),(NULL,14,'潘祖康',4,'201505',0.00,NULL,0.00,NULL,NULL,469.00,300.00,0.00,0.00,0.00,0.00,1484.00,NULL,0.00,5398.00,NULL,NULL,NULL,NULL,0.00,1554.62,3843.38,NULL,NULL,NULL,0.00,NULL),(NULL,15,'吴德贵',5,'201505',0.00,NULL,0.00,0.00,NULL,642.00,150.00,50.00,0.00,1548.00,40.00,8190.00,NULL,0.00,10620.00,NULL,NULL,NULL,NULL,0.00,0.00,10620.00,NULL,NULL,NULL,NULL,NULL);
