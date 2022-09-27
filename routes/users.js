//Criando um banco de dados DB
let NeDB = require('nedb');
let db = new NeDB({
    filename:'users.db',
    autoload:true
});

module.exports = app => {

    let route = app.route('/users');

    route.get((req, res) => {
//tras todos os usuarios do DB
        db.find({}).sort({name:1}).exec((err, users)=>{

            if (err) {
                app.utils.error.send(err, req, res);
            } else {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                });

            }

        });

    });
//invia novos dados ao DB
    route.post((req, res) => {
        
        if (!app.utils.validator.user(app, req, res)) return false;
        
        db.insert(req.body, (err, user)=>{

            if (err) {
                app.utils.error.send(err, req, res);
            } else {

                res.status(200).json(user);

            }

        });

    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {
//trás um usuario especifico do DB
        db.findOne({_id:req.params.id}).exec((err, user)=>{

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }

        });

    });
//pu serve como post, só que ivés de salvar, ele atualiza alteraçoes
    routeId.put((req, res) => {
        
        if (!app.utils.validator.user(app, req, res)) return false;

        db.update({ _id: req.params.id }, req.body, err => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body));
            }

        });

    });
    
    routeId.delete((req, res)=>{

        db.remove({ _id: req.params.id }, {}, err=>{

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(req.params);
            }

        });

    });

};
