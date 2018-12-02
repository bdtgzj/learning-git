const Service = require('egg').Service;

class StocksService extends Service {
  async list() {
    // read config
    const { serverUrl } = this.config.stocks;
    // curl
    const options = {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      data: {
        api_name: 'stock_basic',
        token: 'b85254a8d942276a15c01626314b5a0efe4348fd88bdc19186560228',
        params: {
          list_stauts: 'L'
        },
        fields: 'ts_code,name,area,industry,list_date'
      }
    };
    const ret = await this.ctx.curl(serverUrl, options);
    const { data: { data: { items: stocks } } } = ret;
    //
    return stocks;
  }
}

module.exports = StocksService;