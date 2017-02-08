gen-key:
	openssl genrsa -aes128 -out ehomeguru.com.cn.key 2048

gen-csr:
#	openssl req -new -key ehomeguru.com.cn.key -out ehomeguru.com.cn.csr
	openssl req -new -config ehomeguru.com.cn.cnf -key ehomeguru.com.cn.key -out ehomeguru.com.cn.csr

info-csr:
	openssl req -text -in ehomeguru.com.cn.csr

# ssc = self-signed-certificate
gen-ssc:
	openssl x509 -req -days 365 -in ehomeguru.com.cn.csr -signkey ehomeguru.com.cn.key -out ehomeguru.com.cn.crt

info-ssc:
	openssl x509 -text -in ehomeguru.com.cn.crt

copy-key-crt:
	cp ~/Learning/learning-git/openssl/ehomeguru.com.cn.key /usr/local/etc/nginx/
	cp ~/Learning/learning-git/openssl/ehomeguru.com.cn.crt /usr/local/etc/nginx/

copy-crt:
	cp /usr/local/etc/nginx/ehomeguru.com.cn.crt ~/Learning/learning-git/eHomeGuru/app/src/main/res/raw/ehomeguru.crt

test-9000:
	openssl s_client -connect localhost:9000 -CAfile /usr/local/etc/nginx/ehomeguru.com.cn.crt

test-9090:
	openssl s_client -connect localhost:9090 -CAfile /usr/local/etc/nginx/ehomeguru.com.cn.crt
