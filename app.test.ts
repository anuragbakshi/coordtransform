import { test, expect } from "@jest/globals";

import * as coordtransform from "./index";

test("bd09ToGcj02", () => {
    expect(coordtransform.bd09ToGcj02(116.404, 39.915)).toEqual([
        116.39762729119315, 39.90865673957631,
    ]);
});

test("gcj02ToBd09", () => {
    expect(coordtransform.gcj02ToBd09(116.404, 39.915)).toEqual([
        116.41036949371029, 39.92133699351021,
    ]);
});

test("wgs84ToGcj02", () => {
    expect(coordtransform.wgs84ToGcj02(116.404, 39.915)).toEqual([
        116.41024449916938, 39.91640428150164,
    ]);
});

test("gcj02ToWgs84", () => {
    expect(coordtransform.gcj02ToWgs84(116.404, 39.915)).toEqual([
        116.39775550083061, 39.91359571849836,
    ]);
});
