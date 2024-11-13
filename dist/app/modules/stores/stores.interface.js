"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IStoreModel = exports.StoreStatus = void 0;
const mongoose_1 = require("mongoose");
var StoreStatus;
(function (StoreStatus) {
    StoreStatus["Active"] = "active";
    StoreStatus["Inactive"] = "inactive";
    StoreStatus["Pending"] = "pending";
    StoreStatus["Deleted"] = "deleted";
})(StoreStatus || (exports.StoreStatus = StoreStatus = {}));
exports.IStoreModel = (mongoose_1.Model);
