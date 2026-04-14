"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const todos_repository_1 = require("../repositories/todos.repository");
let TodosService = class TodosService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(userId, title, description) {
        return this.repository.create({
            title,
            description,
            user: { connect: { id: userId } },
        });
    }
    async findAll(userId) {
        return this.repository.findAll({ userId });
    }
    async findOne(userId, id) {
        const todo = await this.repository.findUnique({ id });
        if (!todo)
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        if (todo.userId !== userId)
            throw new common_1.ForbiddenException('Access Denied');
        return todo;
    }
    async update(userId, id, data) {
        await this.findOne(userId, id);
        return this.repository.update({
            where: { id },
            data,
        });
    }
    async delete(userId, id) {
        await this.findOne(userId, id);
        return this.repository.delete({ id });
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [todos_repository_1.TodosRepository])
], TodosService);
//# sourceMappingURL=todos.service.js.map