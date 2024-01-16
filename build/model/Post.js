"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Post = class Post extends sequelize_typescript_1.Model {
};
exports.Post = Post;
Post.POST_TABLE_NAME = "post";
Post.POST_ID = "id";
Post.POST_NAME = "name";
Post.POST_DESCRIPTION = "description";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        field: Post.POST_ID,
    })
], Post.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        field: Post.POST_NAME,
    })
], Post.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        field: Post.POST_DESCRIPTION,
    })
], Post.prototype, "description", void 0);
exports.Post = Post = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Post.POST_TABLE_NAME,
    })
], Post);
