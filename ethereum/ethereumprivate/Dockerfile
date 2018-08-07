FROM ethereum/client-go

# create account
ADD pass /root
RUN geth --password /root/pass account new; \
    rm -f /root/pass

# init genesis block
ADD genesis.json /root
RUN account_id="$(geth account list | sed -E 's/.+\{|\}.+//g')"; \
    account_id_stake='account_id'; \
    sed -i "s/$account_id_stake/$account_id/g" /root/genesis.json; \
    geth init /root/genesis.json;
