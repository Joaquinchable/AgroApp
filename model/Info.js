const { Schema, model } = require('mongoose');

const InfoSchema = Schema({
   
   
    Postura: {
        type: Number,
        
    },
    Semana: {
        type: Number,
        
    },
    SemanaDelAño: {
        type: String,
        
    },
    Fecha: {
        type: String,
        
    },
    Gasto:{
        type: String,
        
    },
    
    Tabla:{
        type: Number,
        
    },
    Cantidad:{
        type: Number,
        
    },
    imageUrl:{
        type: String,
    },
    Actions:{

    },


    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

InfoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Info', InfoSchema );

