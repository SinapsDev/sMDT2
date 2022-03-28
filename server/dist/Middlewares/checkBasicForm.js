"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBasicForm = void 0;
const checkBasicForm = (args) => {
    const { username, password, first_name, last_name } = args;
    if (username.length < 3) {
        return { error: 'Username too short.' };
    }
    else if (password.length < 3) {
        return { error: 'Password too short.' };
    }
    else if (first_name && first_name.length < 3) {
        return { error: 'First name too short.' };
    }
    else if (last_name && last_name.length < 3) {
        return { error: 'Last name too short.' };
    }
    return null;
};
exports.checkBasicForm = checkBasicForm;
//# sourceMappingURL=checkBasicForm.js.map