const x_PI = (Math.PI * 3000.0) / 180.0;
const a = 6378245.0;
const ee = 0.00669342162296594323;

type Position = [number, number];

export function bd09ToGcj02([bd_lng, bd_lat]: Position) {
    const x = bd_lng - 0.0065;
    const y = bd_lat - 0.006;
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
    const gg_lng = z * Math.cos(theta);
    const gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat];
}

export function gcj02ToBd09([lng, lat]: Position) {
    const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    const bd_lng = z * Math.cos(theta) + 0.0065;
    const bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat];
}

export function wgs84ToGcj02([lng, lat]: Position) {
    if (outOfChina([lng, lat])) {
        return [lng, lat];
    } else {
        let dlat = transformLat([lng - 105.0, lat - 35.0]);
        let dlng = transformLng([lng - 105.0, lat - 35.0]);
        const radlat = (lat / 180.0) * Math.PI;
        let magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        const sqrtmagic = Math.sqrt(magic);
        dlat =
            (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * Math.PI);
        dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * Math.PI);
        const mglat = lat + dlat;
        const mglng = lng + dlng;
        return [mglng, mglat];
    }
}

export function gcj02ToWgs84([lng, lat]: Position) {
    if (outOfChina([lng, lat])) {
        return [lng, lat];
    } else {
        let dlat = transformLat([lng - 105.0, lat - 35.0]);
        let dlng = transformLng([lng - 105.0, lat - 35.0]);
        const radlat = (lat / 180.0) * Math.PI;
        let magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        const sqrtmagic = Math.sqrt(magic);
        dlat =
            (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * Math.PI);
        dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * Math.PI);
        const mglat = lat + dlat;
        const mglng = lng + dlng;
        return [lng * 2 - mglng, lat * 2 - mglat];
    }
}

function transformLat([lng, lat]: Position) {
    let ret =
        -100.0 +
        2.0 * lng +
        3.0 * lat +
        0.2 * lat * lat +
        0.1 * lng * lat +
        0.2 * Math.sqrt(Math.abs(lng));
    ret +=
        ((20.0 * Math.sin(6.0 * lng * Math.PI) +
            20.0 * Math.sin(2.0 * lng * Math.PI)) *
            2.0) /
        3.0;
    ret +=
        ((20.0 * Math.sin(lat * Math.PI) +
            40.0 * Math.sin((lat / 3.0) * Math.PI)) *
            2.0) /
        3.0;
    ret +=
        ((160.0 * Math.sin((lat / 12.0) * Math.PI) +
            320 * Math.sin((lat * Math.PI) / 30.0)) *
            2.0) /
        3.0;
    return ret;
}

function transformLng([lng, lat]: Position) {
    let ret =
        300.0 +
        lng +
        2.0 * lat +
        0.1 * lng * lng +
        0.1 * lng * lat +
        0.1 * Math.sqrt(Math.abs(lng));
    ret +=
        ((20.0 * Math.sin(6.0 * lng * Math.PI) +
            20.0 * Math.sin(2.0 * lng * Math.PI)) *
            2.0) /
        3.0;
    ret +=
        ((20.0 * Math.sin(lng * Math.PI) +
            40.0 * Math.sin((lng / 3.0) * Math.PI)) *
            2.0) /
        3.0;
    ret +=
        ((150.0 * Math.sin((lng / 12.0) * Math.PI) +
            300.0 * Math.sin((lng / 30.0) * Math.PI)) *
            2.0) /
        3.0;
    return ret;
}

function outOfChina([lng, lat]: Position) {
    // 纬度 3.86~53.55, 经度 73.66~135.05
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
}
