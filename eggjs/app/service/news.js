module.exports = app => {

  class NewsService extends app.Controller {
    async list(page = 1) {
      // read config
      const { serverUrl, pageSize } = this.app.config.news;
      // use build-in http client to GET hacker-news api
      const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`,
        },
        dataType: 'json',
      });
      // parallel GET detail, see `yield {}` from co
      /*
      const newsList = await Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      });
      */
      const promises = Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      });
      const newsList = await Promise.all(promises);
      //
      return newsList.map(res => res.data);
    }
  }

  return NewsService;

}