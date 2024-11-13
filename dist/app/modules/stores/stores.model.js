"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModel = void 0;
const mongoose_1 = require("mongoose");
const storeSchema = new mongoose_1.Schema({
    storeName: {
        type: String
    },
    imgUrl: {
        type: String
    },
    pointLocation: {
        storeAddress: {
            type: String
        },
        type: {
            type: String,
            enum: ["Point"],
            // required: true,
            default: "Point",
        },
        coordinates: {
            type: [
                Number
            ]
        }
    },
    status: {
        type: String,
        enum: ["active", "inactive", "pending", "deleted"]
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'users'
    }
});
storeSchema.index({ pointLocation: "2dsphere" });
exports.StoreModel = (0, mongoose_1.model)('Store', storeSchema);
