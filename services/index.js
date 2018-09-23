const db = require('./db.json');

module.exports = [
  {
    method: 'post',
    route: '/iot/:clientId/:id',
    service: async (req, res) => {
      const { clientId, id } = req.params;

      if (!clientId || !id) {
        return res.status(500).send('client id and iot id are required');
      }

      if (typeof req.body === 'string') {
        db.push({
          clientId,
          iotId: id,
          message: req.body,
        });
      } else {
        db.push(Object.assign({}, req.body, {clientId, iotId: id}));
      }
      // const { message } = req.body;

      // if (err) {
      //   return res.status(500).send(err);
      // }

      res.send({
        data: 'OK',
      });
    },
  },
  {
    method: 'get',
    route: '/dashboard',
    service: (req, res)=> {
      res.send({
        data: db,
      });
    },
  },
];
