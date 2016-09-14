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

# 域名
【花生壳域名】151070wv41.iok.la
【APIServer端口】9000；屏端、管理端访问；80/443/8080需要备案；
【FamilyScreen端口】外：502，内：11502
【管理端口】9090

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

# color
电视机 蓝色
空调 绿色
电灯 棕色
电源插座 深海洋绿
窗帘 珊瑚色 
冰箱 菊花黄
衣架 深灰色

# instruction
01读线圈、05写单个线圈、03读寄存器内容、06写单个寄存器、10写多个寄存器
00 00 00 00 00 06 01 01 48 00 00 01@00 00 00 00 00 06 01 05 48 00 [FF 00]
00 00 00 00 00 06 01 01 48 00 00 03@00 00 00 00 00 06 01 05 48 02 [FF 00]
00 00 00 00 00 06 02 01 48 00 00 02@00 00 00 00 00 06 02 05 48 01 [FF 00]

【请求：读地址48 01开始的9个线圈状态】00 00 00 00 00 06 01 01 48 01 00 09
【回应：2个字节2 0(线圈48 01开始：0100 0000 0：线圈48 09结束)】0 1 0 0 0 5 1 1 2 2 0 响应说明线圈48 02（即第2个线圈状态是ON）
【原则】一般不读取多个线圈状态；一般从线圈地址读取1个线圈状态，即仅仅读取当前线圈地址的状态，返回0或1；


### homecard
【区域名】设备名，最多8个中文字符。

家端
----------------------------------------------------------------------------------------------------------------------------------
### ZLAN
- 【Link灯】
    - 【蓝色】连接成功
    - 【绿色】连接失败，Reconnect-time：12second，没12秒会重新连接。

### XINJIE
- 【Modbus主机号】默认设为1，可以有多个主机（PLC），在Insruction指令中指定主机号，可控制不同的主机。
- 【编号FID/SN】`DMOV K1 D0` 通过指令写入PLC的数据寄存器中。

屏端
----------------------------------------------------------------------------------------------------------------------------------














