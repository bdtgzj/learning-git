var JSONAPIDeserializer = require('../lib/deserializer');

var dataSet = {
    data: [{
        type: 'users',
        id: '54735750e16638ba1eee59cb',
        attributes: { 'first-name': 'Sandro', 'last-name': 'Munda' }
    }, {
        type: 'users',
        id: '5490143e69e49d0c8f9fc6bc',
        attributes: { 'first-name': 'Lawrence', 'last-name': 'Bennett' }
    }]
};

var dataSet1 = {
    data: [{
        type: 'users',
        id: '54735750e16638ba1eee59cb',
        attributes: {
        'first-name': 'Sandro',
        'last-name': 'Munda'
        },
        relationships: {
        address: {
            data: { type: 'addresses', id: '54735722e16620ba1eee36af' }
        }
        }
    }, {
        type: 'users',
        id: '5490143e69e49d0c8f9fc6bc',
        attributes: {
        'first-name': 'Lawrence',
        'last-name': 'Bennett'
        },
        relationships: {
        address: {
            data: { type: 'addresses', id: '54735697e16624ba1eee36bf' }
        }
        }
    }],
    included: [{
        type: 'addresses',
        id: '54735722e16620ba1eee36af',
        attributes: {
        'address-line1': '406 Madison Court',
        'zip-code': '49426',
        country: 'USA'
        }
    }, {
        type: 'addresses',
        id: '54735697e16624ba1eee36bf',
        attributes: {
        'address-line1': '361 Shady Lane',
        'zip-code': '23185',
        country: 'USA'
        }
    }]
};

var d = new JSONAPIDeserializer().deserialize(dataSet);

var d1 = new JSONAPIDeserializer().deserialize(dataSet1);

console.log(d);