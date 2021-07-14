const attrData = require('../../data/attractionsData');

module.exports = {
    getAttractions
};

async function getAttractions(req) {
    try {
        const {latitude, longitude} = req.query;
        if(latitude && longitude){
            const result = attrData.records.map(obj => ({
                ...obj,
                Distance: distanceBetween(latitude, longitude, obj.Y, obj.X)
            }));
            return result.sort((a, b) => a.Distance - b.Distance);
        } 
        else
        {
            throw new Error('bad request');
        }
    } catch (e) {
        throw e;
    }
}

function distanceBetween(lat1, lon1, lat2, lon2) {
    const rlat1 = Math.PI * lat1 / 180;
    const rlat2 = Math.PI * lat2 / 180;
    const rlon1 = Math.PI * lon1 / 180;
    const rlon2 = Math.PI * lon2 / 180;
    const theta = lon1 - lon2;
    const rtheta = Math.PI * theta / 180;
    let dist = Math.sin(rlat1) * Math.sin(rlat2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return Math.round(dist);
}
