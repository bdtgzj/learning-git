FROM eosio/eos-dev

# add software
RUN \
apk add --update curl && \
rm -rf /var/cache/apk/*

# create account
ADD pass /root/
RUN geth --password /root/pass account new; \
    rm -f /root/pass;

# init genesis block
ADD genesis.json /root/.ethereum/
RUN geth init /root/.ethereum/genesis.json; \
    rm -f /root/.ethereum/genesis.json;

# add static nodes file
ADD static-nodes.json /root/.ethereum/

# add custom js
ADD utils.js /root/.ethereum/

# add bash profile
ADD .profile /root/

# create volume
VOLUME /root/.ethereum/

#
# ENTRYPOINT ["geth"]
# CMD [""]
