def get_node_text(selector):
    # .//text() | .//p/text() | .//p/font/text() | .//font/p/font/text()
    text_list = selector.xpath('.//text()').extract()
    text = ''.join(str(t).strip() for t in text_list)
    return text