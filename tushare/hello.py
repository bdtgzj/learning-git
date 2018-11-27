import tushare as ts
print(ts.__version__)

# set token
# ts.set_token('xx')
# init pro interface
pro = ts.pro_api()
# 日线行情
# df = pro.query('daily', ts_code='000001.sz', start_date='20180921', end_date='20180921')
df = pro.query('daily', trade_date='20180925')
rows = df.shape[0]
print(df.sort_values(by='pct_change', ascending=False).iloc[int(rows/2)])