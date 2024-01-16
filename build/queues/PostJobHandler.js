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
Object.defineProperty(exports, "__esModule", { value: true });
class PostAnalysisJobHandler {
    handleJob(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, description } = data;
            //Do the computation
            const { totalWords, averageWords } = yield this.findMetadata(description);
            console.log(`For the POST total number of words: ${totalWords} and averagewords per line: ${averageWords}`);
        });
    }
    findMetadata(postDescription) {
        return __awaiter(this, void 0, void 0, function* () {
            const trimmedInput = postDescription.trim();
            const words = trimmedInput.split(/\s+/);
            const wordCount = words.length;
            const totalWords = words.reduce((total, word) => total + word.length, 0);
            const averageWords = wordCount > 0 ? totalWords / wordCount : 0;
            return { totalWords, averageWords };
        });
    }
}
exports.default = PostAnalysisJobHandler;
