import { test, expect } from "@jest/globals";

import * as coordtransform from "./index";

test("bd09togcj02", () => {
    expect(coordtransform.bd09togcj02(116.404, 39.915)).toEqual([
        116.39762729119315, 39.90865673957631,
    ]);
});

test("gcj02tobd09", () => {
    expect(coordtransform.gcj02tobd09(116.404, 39.915)).toEqual([
        116.41036949371029, 39.92133699351021,
    ]);
});

test("wgs84togcj02", () => {
    expect(coordtransform.wgs84togcj02(116.404, 39.915)).toEqual([
        116.41024449916938, 39.91640428150164,
    ]);
});

test("gcj02towgs84", () => {
    expect(coordtransform.gcj02towgs84(116.404, 39.915)).toEqual([
        116.39775550083061, 39.91359571849836,
    ]);
});
