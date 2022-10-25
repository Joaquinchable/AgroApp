const { response } = require('express');
const Info = require ('../model/Info');


const getInfo = async ( req, res = response ) => {
    
    const info = await Info.find()
                            .populate('user', 'name');
    res.json({
        ok: true,
        info
    });
}

const crearInfo = async ( req, res = response ) => {

    const info = new Info( req.body );

        try {

            info.user = req.uid;

            const infoGuardadada =  await info.save()
                res.json({
                    ok: true,
                    info: infoGuardadada
                })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el Administrador'
            });
            
        }
    
    
}



const actualizarInfo = async ( req, res = response )  => {

    const infoId = req.params.id;
        
        try {
            const info = await Info.findById( infoId );
            
            if( !info ) {
                res.status(404).json({
                    ok: false,
                    msg: 'El gasto no existe'
                });
            }
            if ( info.user.toString !== uid ) {
                return res.status(401).json({
                    ok: false,
                    msg: 'No tiene privilegio de modificar el gasto'
                });
            }
            const nuevaInfo = {
                ...req.body,
                user: uid

            }
            const infoActualizada = await Info.findByIdAndUpdate( infoId, nuevaInfo, { new: true } );

            req.json({
                ok: true,
                info: infoActualizada
            });


        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el Administrador'
            });        
}


    
}

const eliminarInfo = async ( req, res = response ) => {
    
    const infoId = req.params.id;
    const uid = req.uid;
        
    try {
        const info = await Info.findById( infoId );
        
        if( !info ) {
            res.status(404).json({
                ok: false,
                msg: 'El gasto no existe'
            });
        }
        if ( info.user.toString !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de modificar el gasto'
            });
        }
        
        await Info.findByIdAndDelete( infoId );
        res.json({ ok: true });

        }catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el Administrador'
            });
        }
}

module.exports = {
    crearInfo,
    getInfo,
    actualizarInfo,
    eliminarInfo
}
