云端
----------------------------------------------------------------------------------------------------------------------------------
### CentOS7
- root/Ehomeguru
- 【时间更新】ntpdate -u 0.cn.pool.ntp.org 1.asia.pool.ntp.org 3.asia.pool.ntp.org

### SELinux
- 【管理工具semanager安装】`yum -y install policycoreutils-python`
- 【查看SELinux是否生效】`getenforce` 返回 Enforcing 表示生效中。
- 【查看SELinux在Enforcing状态下允许监听的http端口】`semanage port -l | grep http_port_t`
- 【修改http_port_t对应的端口】`semanage port -m -t http_port_t -p tcp 8080` `semanage port -m -t http_port_t -p tcp 9090`
- 【查看httpd规则】`getsebool -a | grep httpd`
- 【开启httpd_can_network_connect权限，做反向代理】`setsebool httpd_can_network_connect on -P`

### PM2
- 【安装】`npm install pm2 -g`

### nginx
- 【安装】

server {
    listen       9090 default_server;
    listen       [::]:9090 default_server;
    server_name  151070wv41.iok.la;
    root         /opt/ehomeguru/manager;
    index        index.html;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location / {
    }

    # error_page 404 /404.html;
    error_page 404 /index.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
                location = /50x.html {
    }
}

server {
    listen       9000 default_server;
    listen       [::]:9000 default_server;
    server_name  151070wv41.iok.la;
    root         /usr/share/nginx/html;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location / {
        proxy_pass http://127.0.0.1:3000/;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    error_page 404 /404.html;
                location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}

### node
- 【yum库设置】`curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -`
- 【查看版本】`yum info nodejs`版本为4.5.0
- 【安装】`yum -y install nodejs`
- 【查看安装内容】`rpm -qa node & rpm -ql nodejs`
- 【模块编译工具安装】`yum install -y gcc-c++ make`

### mongodb
- 【yum库设置】`vi /etc/yum.repos.d/mongodb-org-3.2.repo` 并输入信息https://docs.mongodb.com/master/tutorial/install-mongodb-on-red-hat/
- 【查看版本】`yum info mongodb-org`
- 【安装】`yum install mongodb-org`
- 【查看安装内容】`rpm -qa | grep mongodb-org` `rpm -ql mongodb-org-server`
- 【开关】`systemctl start mongod` `systemctl stop mongod`

### apiserver
- 【开启】`pm2 start /opt/ehomeguru/apiserver/app.js`
- 【重启】`pm2 restart app`
- 【日志】`pm2 logs app`

### familyscreen
- 【开启】`pm2 start /opt/ehomeguru/familyscreen/familyscreen`
- 【重启】`pm2 restart familyscreen`
- 【日志】`pm2 logs familyscreen`

### manager
- 【开启】`systemctl start nginx`
- 【重启】`systemctl restart nginx`
- 【日志】`/var/log/nginx`

### mongodb数据库导入
```
mongoexport -d db_ehomeguru -c admins -o admins.json
mongoexport -d db_ehomeguru -c colors -o colors.json
mongoexport -d db_ehomeguru -c icons -o icons.json
mongoexport -d db_ehomeguru -c inscats -o inscats.json

mongoimport -d db_ehomeguru -c admins --file admins.json
mongoimport -d db_ehomeguru -c colors --file colors.json
mongoimport -d db_ehomeguru -c icons --file icons.json
mongoimport -d db_ehomeguru -c inscats --file inscats.json
```

### mongodb表初始化
```
use db_ehomeguru;
db.counters.insert({_id: "userid", seq: 1});
```

### 域名
- 【花生壳域名】151070wv41.iok.la
- 【APIServer端口】9000；屏端、管理端访问；80/443/8080需要备案；
- 【FamilyScreen端口】外：502，内：11502
- 【管理端口】9090
- 【移动宽带】
    - 【外网IP】222.x.x.x
    - 【拨号IP】100.81.x.x为保留私网IP。
    - 【问题】花生壳获得的IP为外网IP，无法直接银蛇到拨号路由器上，所以免费花生壳服务被废了。
- 【内网穿透】
    - 【What】无需公网IP，无需路由器设置，通过软件即可把本地内网服务（甚至是被运营商禁用的80/443）映射到外网上。原理：通过供应商公网服务器做转发。
    - 【花生壳（内网版）】收费。免费的需要实名认证付费，且仅支持电信。
    - 【[ngrok](https://ngrok.com)】国外服务；好用；绑定域名、IP、端口需要收费，不绑定的话是临时随机的域名、IP、端口。
        - 【注册】bdtgzj@gmail.com
        - 【下载加压】即一个ngrok命令行程序
        - 【安装认证】`./ngrok authtoken 22dAf6T3KArokihsSRcTh_12Y5NfTde7EEHCoHtbMev`
        - 【把本机80端口暴露到公网】`./ngrok http 80` 会提示随机生成的供公网访问的域名、端口信息。如：Forwarding http://92832de0.ngrok.io -> localhost:80，外网访问http://92832de0.ngrok.io即可。
        - 【吧本地22端口暴露到公网】`./ngrok tcp 22` 会提示随机生成的供公网访问的域名、端口信息。如：Forwarding tcp://0.tcp.ngrok.io:14436 -> localhost:22， 外网访问：ssh root@0.tcp.ngrok.io -p 14436

管理端
----------------------------------------------------------------------------------------------------------------------------------
### color
电视机 蓝色
空调 绿色
电灯 棕色
电源插座 深海洋绿
窗帘 珊瑚色 
冰箱 菊花黄
衣架 深灰色

移动墙 暗金黄色
音响 巧克力色
视频切换 红色
加湿器
天然气阀
地暖开关
窗户
水龙头

### instruction
- 【读】01读线圈（X/M/Y）、03读寄存器内容
- 【写】05写单个线圈、06写单个寄存器、0F写多个线圈、10写多个寄存器
- 【控制点位】PLC编程会有输入M点，输出M点。
    - 【控制输入M点】置1后需要还原为0状态。置1后，需要再置0，否则每次都置1没效果。
    - 【控制输出M点】置1即开，置0即关。

00 00 00 00 00 06 01 01 48 00 00 01@00 00 00 00 00 06 01 05 48 00 [FF 00]
00 00 00 00 00 06 01 01 48 00 00 03@00 00 00 00 00 06 01 05 48 02 [FF 00]
00 00 00 00 00 06 02 01 48 00 00 02@00 00 00 00 00 06 02 05 48 01 [FF 00]

00 00 00 00 00 06 01 01 48 05 00 01@00 00 00 00 00 06 01 05 48 05 [FF 00]

【请求：读地址48 01开始的9个线圈状态】00 00 00 00 00 06 01 01 48 01 00 09
【回应：2个字节2 0(线圈48 01开始：0100 0000 0：线圈48 09结束)】0 1 0 0 0 5 1 1 2 2 0 响应说明线圈48 02（即第2个线圈状态是ON）
【原则】一般不读取多个线圈状态；一般从线圈地址读取1个线圈状态，即仅仅读取当前线圈地址的状态，返回0或1；

【空调开关M17】00 00 00 00 00 06 01 01 00 11 00 01@00 00 00 00 00 06 01 05 00 11 [FF 00]
【空调温度D25、D4035、28度】00 00 00 00 00 06 01 03 00 19 00 01@00 00 00 00 00 06 01 06 0F C3 [1D 00]
【空调风速D35、D5035、第1档】00 00 00 00 00 06 01 03 00 23 00 01@00 00 00 00 00 06 01 06 13 AB [01 00]
【空调模式D45、D6035、制冷】00 00 00 00 00 06 01 03 00 2D 00 01@00 00 00 00 00 06 01 06 17 93 [01 00]

【电视开关M17】00 00 00 00 00 06 01 01 00 11 00 01@00 00 00 00 00 06 01 05 00 11 [FF 00]
【电视音量D25、D4035、28度】00 00 00 00 00 06 01 03 00 19 00 01@00 00 00 00 00 06 01 06 0F C3 [1D 00]
【电视频道D35、D5035、第1档】00 00 00 00 00 06 01 03 00 23 00 01@00 00 00 00 00 06 01 06 13 AB [01 00]
【电视模式D45、D6035、制冷】00 00 00 00 00 06 01 03 00 2D 00 01@00 00 00 00 00 06 01 06 17 93 [01 00]

【正反停M135、M137、M139】
上升00 00 00 00 00 06 01 01 00 87 00 01@00 00 00 00 00 06 01 05 00 87 [FF 00]
下降00 00 00 00 00 06 01 01 00 89 00 01@00 00 00 00 00 06 01 05 00 89 [FF 00]
停止00 00 00 00 00 06 01 01 00 8B 00 01@00 00 00 00 00 06 01 05 00 8B [FF 00]

【一档@二档@三档 M210】00 00 00 00 00 06 01 01 00 D2 00 01@00 00 00 00 00 06 01 05 00 D2 [FF 00]

【天然气检测值 D42】00 00 00 00 00 06 01 03 00 2A 00 01@00 00 00 00 00 06 01 06 00 2A [FF 00]
【天然气设置值 D4170】00 00 00 00 00 06 01 03 10 4A 00 01@00 00 00 00 00 06 01 06 10 4A [FF 00]
【天然气报警灯 Y136】00 00 00 00 00 06 01 01 00 5E 00 01@00 00 00 00 00 06 01 05 00 5E [FF 00]

【读线圈返回】读1个线圈数据，返回1个字节数据；读2个线圈数据，返回1个字节数据；读9个线圈数据，返回2个字节数据；
【读寄存器返回】读1个寄存器数据，返回2个字节数据；读2个寄存器数据，返回4个字节数据；

【开关量】单个线圈写时（05X/M/Y），ON为0x00FF，OFF为0x0000
【数字量】

做一个指令类型需要考虑：根据指令生成的组件外观、读取状态、设置值。

### 指令类型说明
- 【档位】
    - 【名称】调光#一档@二档@三档
    - 【指令】00 00 00 00 00 06 32 01 00 D2 00 01@00 00 00 00 00 06 32 05 00 D2 [FF 00]

### homecard
【区域名】设备名，最多8个中文字符。

家端
----------------------------------------------------------------------------------------------------------------------------------
### ZLAN
- 【管理】软件方式（ZLVirComm.exe）、网页方式。
- 【网络设置】
    - 【IP模式(IP mode)】Static
    - 【IP地址(Device IP)】x.x.x.44
    - 【子网掩码(Subnet Mask)】255.255.255.0
    - 【网关(Gateway)】x.x.x.1
    - 【端口(Device Port)】0，随机使用源端口。
    - 【工作模式(Work Mode)】TCP Client
    - 【目的IP或域名(Destination IP/DSN)】151070wv41.iok.la，目的IP或域名。
    - 【目的端口(Destination Port)】502
- 【串口设置】波特率 115200；数据位 8；停止位 1；检验位 无；流控 无；
- 【高级设置】
    - 【DNS服务器IP】设为网关IP，跟随运营商的DNS，否则会出现解析问题。
    - 【无数据重启(No-Data-Restart)】开启；
        - 【无数据重启时间(No-Data-Restart-Time)】默认300s，改为180s；无数据情况下，每个300s会重启设备，以保证家端设备在线。
    - 【断线重连时间(Reconnect-time)】默认12s，改为8s；socket收到FIN包后，断开连接，重新连接时间为8S。
    - 【保活定时时间】默认60s，自动被改为36s，是无数据重启时间的1/5；socket没有收到FIN包，socket没有没活动or超时时间为60s（比如：云端重启后）；
    - 【目的模式】动态
    - 【转化协议】Modbus_TCP 协议
- 【多主机设置(Multi-host Settings)】
    - 【指令超时时间(Instruction Time out)】192ms
    - 【冲突时间(RS485 Conflict Time Gap)】5ms
    - 【协议(Protocol)】Modbus TCP to RTU
    - 【开启多主机(Enable Multi-host)】开启
- 【Link灯】
    - 【蓝色】连接成功
    - 【绿色】连接失败，Reconnect-time：12second，没12秒会重新连接。

### XINJIE
- 【电源】L火线、N零线；
- 【RS485】A、B；串口设置115200/8/1/none；
- 【Modbus主机号】默认设为50，可以有多个主机（PLC）（云端轮询查找多个站号，看回应，广播包只接受，不回应的），在Insruction指令中指定主机号，可控制不同的主机。
- 【编号FID/SN】`DMOV K1 D5000` 通过指令写入PLC的数据寄存器中。
- 【Modbus RTU协议】
    1. Modbus站号(1B)
    2. 功能代码(1B)
    3. 数据(0-252B)

屏端
----------------------------------------------------------------------------------------------------------------------------------





部署
----------------------------------------------------------------------------------------------------------------------------------
- 【服务端】FamilyScreen、ApiServer无需修改配置，即可替换更新。
- 【管理端】需要更改config中的host
- 【屏端】需要更改host
- 【家端】需要更改Destination IP/DSN








