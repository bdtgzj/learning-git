<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <div>{{ helper.getDate() }}</div>
    <div class="news-view view">
      {% for item in users %}
        <div class="item">
          <span>{{ item.username }}</span>
          <span>{{ item.age }}</span>
        </div>
      {% endfor %}
    </div>
  </body>
</html>