module.exports = [
  {
    method: 'post',
    route: '/iot/:clientId/:id',
    service: async (req, res) => {
      const { clientId, id } = req.params;
      const { message } = req.body;

      if (!clientId || !id) {
        return res.status(500).send('client id and iot id are required');
      }

      // if (err) {
      //   return res.status(500).send(err);
      // }

      res.send({
        data: 'OK',
      });
    },
  },
];
