FROM eosio/eos-dev

# add software
RUN \
apt-get update; \
apt-get install -y inetutils-ping;

# add wallet & account
RUN mkdir -p /root/eosio-wallet/
ADD default.wallet /root/eosio-wallet/