# -*- coding: utf-8 -*-
import re
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from economy.items.sipf_investor_fund import SipfInvestorFundItem
from economy.utils.utils import get_node_text

class SipfInvestorFundSpider(CrawlSpider):
    name = 'sipf_investor_fund'
    # 中国证券投资者保护基金有限责任公司(stock investor protect foudation)
    allowed_domains = ['sipf.com.cn']
    # 投资者资金监控数据
    start_urls = ['http://www.sipf.com.cn/zjjk/tjsj/zsj/index.shtml']

    rules = (
        # get the page number links from [index.shtml > div.page a href], and send http request
        Rule(LinkExtractor(allow=r".*index.*\.shtml", restrict_css='div.page', unique=True),
            callback='parse_link',
            follow=True
        ),
    )

    def parse_link(self, response):
        # log
        self.logger.info('Hi, this is an item page! %s', response.url)
        # parse link
        linkExtractor = LinkExtractor(allow=r".+\.shtml", restrict_css='div.list > ul', unique=True)
        links = linkExtractor.extract_links(response)
        for link in links:
            yield scrapy.Request(link.url, callback=self.parse_content)
        # i = {}
        #i['domain_id'] = response.xpath('//input[@id="sid"]/@value').extract()
        #i['name'] = response.xpath('//div[@id="name"]').extract()
        #i['description'] = response.xpath('//div[@id="description"]').extract()
        # return i

    def parse_content(self, response):
        trs = response.css('div.content').xpath('//tr')
        currentDate = None
        for tr in trs:
            tds = tr.xpath('.//td')
            # filter table's header
            if len(tds) < 6 or \
               not get_node_text(tds[4]).replace('-', '').replace(',', '').replace('.', '').isdigit():
                continue
            # td0
            td0 = get_node_text(tds[0])
            # 日期
            # re.match(r"\d{2,4}\.\d{1,2}\.\d{1,2}\-\d{1,2}\.\d{1,2}", td0) or \
            if re.match(r"\d{2,4}\.\d{1,2}", td0):
                # category
                td1 = get_node_text(tds[1])
                if re.match(r".*证券交易结算资金.*" ,td1):
                    category = 1
                elif re.match(r".*融资融券担保资金.*" ,td1):
                    category = 2
                elif re.match(r".*股票期权保证金.*" ,td1):
                    category = 3
                else:
                    category = None
                # date
                currentDate = td0
                # 资金余额 期末数
                fund_balance_ending = get_node_text(tds[2]).replace(',', '') if category else get_node_text(tds[1]).replace(',', '')
                # 资金余额 日平均数
                fund_balance_daily_mean = get_node_text(tds[3]).replace(',', '') if category else get_node_text(tds[2]).replace(',', '')
                # 银证转账 转入额
                bank_security_in = get_node_text(tds[4]).replace(',', '') if category else get_node_text(tds[3]).replace(',', '')
                # 银证转账 转出额
                bank_security_out = get_node_text(tds[5]).replace(',', '') if category else get_node_text(tds[4]).replace(',', '')
                # set default to 证券交易结算资金
                if not category: category = 1
            # 非日期
            else:
                # category
                if re.match(r".*证券交易结算资金.*" ,td0):
                    category = 1
                # 融资融券担保资金
                elif re.match(r".*融资融券担保资金.*" ,td0):
                    category = 2
                # 股票期权保证金
                elif re.match(r".*股票期权保证金.*" ,td0):
                    category = 3
                # 资金余额 期末数
                fund_balance_ending = get_node_text(tds[1]).replace(',', '')
                # 资金余额 日平均数
                fund_balance_daily_mean = get_node_text(tds[2]).replace(',', '')
                # 银证转账 转入额
                bank_security_in = get_node_text(tds[3]).replace(',', '')
                # 银证转账 转出额
                bank_security_out = get_node_text(tds[4]).replace(',', '')
            # 
            item = SipfInvestorFundItem()
            item['date'] = currentDate
            item['category'] = category
            item['fund_balance_ending'] = fund_balance_ending
            item['fund_balance_daily_mean'] = fund_balance_daily_mean
            item['bank_security_in'] = bank_security_in
            item['bank_security_out'] = bank_security_out
            yield item