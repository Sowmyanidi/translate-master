"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var transferable_1 = require("./transferable");
describe('transferableImage', function () {
    var canvas;
    var img;
    // let video: HTMLVideoElement;
    beforeAll(function () {
        canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        img = document.createElement('img');
        img.src = canvas.toDataURL();
        //
        // video = document.createElement('video');
        // video.src = img.src;
    });
    it('All latest browsers should get an image bitmap', function () { return __awaiter(void 0, void 0, void 0, function () {
        var bitmap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, transferable_1.transferableImage)(canvas)];
                case 1:
                    bitmap = _a.sent();
                    expect(bitmap instanceof ImageBitmap).toBeTrue();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create the same size objects for images, videos, and canvas', function () { return __awaiter(void 0, void 0, void 0, function () {
        var canvasObj, imgObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, transferable_1.transferableImage)(canvas)];
                case 1:
                    canvasObj = _a.sent();
                    return [4 /*yield*/, (0, transferable_1.transferableImage)(img)];
                case 2:
                    imgObj = _a.sent();
                    // const videoObj = await transferableImage(video);
                    expect(canvasObj.width).toEqual(imgObj.width);
                    expect(canvasObj.height).toEqual(imgObj.height);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create the same data for images and canvas', function () { return __awaiter(void 0, void 0, void 0, function () {
        var canvasObj, imgObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, transferable_1.transferableImageData)(canvas)];
                case 1:
                    canvasObj = _a.sent();
                    return [4 /*yield*/, (0, transferable_1.transferableImageData)(img)];
                case 2:
                    imgObj = _a.sent();
                    expect(canvasObj.data).toEqual(imgObj.data);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create the same data for canvas and for context', function () { return __awaiter(void 0, void 0, void 0, function () {
        var ctx, fakeCanvas, canvasObj, ctxObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ctx = canvas.getContext('2d', { willReadFrequently: true });
                    fakeCanvas = { width: canvas.width, height: canvas.height };
                    return [4 /*yield*/, (0, transferable_1.transferableImageData)(canvas)];
                case 1:
                    canvasObj = _a.sent();
                    return [4 /*yield*/, (0, transferable_1.transferableImageData)(fakeCanvas, ctx)];
                case 2:
                    ctxObj = _a.sent();
                    expect(canvasObj.data).toEqual(ctxObj.data);
                    return [2 /*return*/];
            }
        });
    }); });
});
