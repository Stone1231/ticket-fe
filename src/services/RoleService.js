

export default class RoleService {
    static IsAdmin(roleId) {
        return roleId == 1;
    }

    static IsPM(roleId) {
        return roleId == 1 || roleId == 2;
    }

    static IsRD(roleId) {
        return roleId == 1 || roleId == 3;
    }

    static IsQA(roleId) {
        return roleId == 1 || roleId == 4;
    }

    static IsQAorPM(roleId) {
        return roleId == 1 || roleId == 2 || roleId == 4;
    }

    static IsQAorRD(roleId) {
        return roleId == 1 || roleId == 3 || roleId == 4;
    }

    static IsPMorRD(roleId) {
        return roleId == 1 || roleId == 2 || roleId == 3;
    }
}