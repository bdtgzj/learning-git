<html>
  <head>
    <title>Stocks</title>
    <link rel="stylesheet" href="/public/css/stocks.css" />
  </head>
  <body>
    <div>{{ helper.getDate() }}</div>
    <table class="stocks-view view">
      {% for ts_code,name,area,industry,list_date in stocks %}
        <tr class="item">
          <td>{{ ts_code }}</td>
          <td>{{ name }}</td>
          <td>{{ area }}</td>
          <td>{{ industry }}</td>
          <td>{{ list_date }}</td>
        </tr>
      {% endfor %}
    </table>
  </body>
</html>