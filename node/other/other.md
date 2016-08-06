### jackpot包修改了源码
更新时注意了。

```
// index.js
// bdtgzj: comment this, because all error listeners have been removed.
// if (err) self.emit('error', err);
```

### jsonapi-serializer包修改了源码
更新时注意了。

```
// lib/deserializer.js
// bdtgzj: add the promise's configuration
Promise.config({cancellation: true});
```

### redux-json-api包修改了源码
【问题】Basic认证头部关键字，原为非标Bearer，改为标准Basic，因为服务端统一是标准的Basic
```
// lib/utils.js
//bdtgzj modify: original > Authorization: 'Bearer ' + accessToken,
Authorization: 'Basic ' + accessToken,
```

【问题】发送媒体类型Content-Type，接受媒体类型Accept，均为application/vnd.api+json，更改为application/json

```
// bdtgzj add: if (index===0) return false;
// file: lib/utils.js
// func : apiRequest
// line start: 24
//bdtgzj modify: original > 'Content-Type': 'application/vnd.api+json',
'Content-Type': 'application/json',
//bdtgzj modify: original >  Accept: 'application/vnd.api+json'
Accept: 'application/json'
```

【问题】API查询获取网络数据：`readEndpoint(endpoint)`，获取数据后，redux-json-api使用ImmutableJS来合并原数据和最新数据，策略是「最新数据中不存在的原老数据全部保留，然后再append所有新数据」，此策略由于保留了部分老数据，无法满足显示按条件查询后的最新记录集。所以，根据List.reduce()传递的index，首次数据线清空所有原数据，然后再push最新数据。
```
// file: lib/state-mutation.js
// bdtgzj modify: original > var updateOrInsertEntity = function updateOrInsertEntity(state, entity) {
var updateOrInsertEntity = function updateOrInsertEntity(state, entity, index) {

// bdtgzj add: if (index===0) return false;
// file: lib/state-mutation.js
// func : updateOrInsertEntity
// line start: 74
if (index===0) return false;
```

【问题】API查询获取网络数据：`readEndpoint(endpoint)`，如果返回空数据，readEndpoint不会更新原数据。所以在reducer处，判断返回空数据，来清空原数据。
```
  // bdtgzj add: start
  // file: lib/jsonapi.js
  // func: reducer > _constants.API_READ
  // line start: 360
  if (payload.data.length===0) {
    let type = payload.endpoint.split('?')[0];
    return state
    .updateIn(
      [type, 'data'],
      function(v) {return [];}
    )
    .update(
      'isReading',
      function (v) { return v - 1;}
    )
    .toJS();
  }
  // bdtgzj add: end
  ```

【问题】更新API使用了HTTP PATCH方法，而PATCH方法在HTTP2中不存在了，所以改为PUT。
```
// file: lib/jsonapi.js
// func : updateEntity
// line start: 230
// bdtgzj modify: original > method: 'PATCH',
method: 'PUT',
```


