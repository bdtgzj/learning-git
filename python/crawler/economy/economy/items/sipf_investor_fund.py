# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy

class SipfInvestorFundItem(scrapy.Item):
    category = scrapy.Field() # 1=证券交易结算资金 2=融资融券担保资金 3=股票期权保证金
    date = scrapy.Field()
    fund_balance_ending = scrapy.Field()
    fund_balance_daily_mean = scrapy.Field()
    bank_security_in = scrapy.Field()
    bank_security_out = scrapy.Field()
