// isso é um programa js funcional, ele é separa pois ela linha de comando se repete varias vezes, então a deixamos aqui para melhor organização

module.exports = {
    send: (err, req, res, code = 400)=>{

        console.log(`error: ${err}`);
        res.status(code).json({
            error: err
        });

    } 
};