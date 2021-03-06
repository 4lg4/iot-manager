const {get, set} = require('./db');

const db = get();

module.exports = [
  {
    method: 'post',
    route: '/iot/:clientId/:id',
    service: async (req, res) => {
      const { clientId, id } = req.params;

      if (!clientId || !id) {
        return res.status(500).send('client id and iot id are required');
      }

      db.push({
        clientId,
        iotId: id,
        data: req.body,
      });

      set(db, ()=> console.log('#### DEBUG ####, saved'));

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
