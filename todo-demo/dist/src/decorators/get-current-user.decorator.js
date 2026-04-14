"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUser = exports.GetCurrentUserFactory = void 0;
const common_1 = require("@nestjs/common");
const GetCurrentUserFactory = (data, context) => {
    const request = context.switchToHttp().getRequest();
    if (!data)
        return request.user;
    return request.user[data];
};
exports.GetCurrentUserFactory = GetCurrentUserFactory;
exports.GetCurrentUser = (0, common_1.createParamDecorator)(exports.GetCurrentUserFactory);
//# sourceMappingURL=get-current-user.decorator.js.map