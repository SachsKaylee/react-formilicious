/**
 * Finds a property in an object. Property can be nested by using ".".
 * @param {string | string[]} path The path of the property.
 * @param {any} obj The object to get the property in.
 */
const at = (path, obj) => {
    if (path === "" || Array.isArray(path) && path.length === 0) {
        return obj;
    }
    path = Array.isArray(path) ? path : path.split(".");
    for (let i = 0; i < path.length; i++) {
        obj = obj && obj[path[i]];
    }
    return obj;
}

/**
 * Puts an object into an object. MUTATES THE OBJECT.
 * @param {string | string[]} path The path of the property.
 * @param {any} obj The object to put the property in.
 */
export const putAt = (path, obj, value) => {
    if (path === "" || Array.isArray(path) && path.length === 0) {
        return value;
    }
    const root = obj;
    path = Array.isArray(path) ? path : path.split(".");
    for (let i = 0; i < path.length - 1; i++) {
        const newObj = obj[path[i]];
        if (newObj === null || typeof newObj !== "object") {
            newObj = {};
            obj[path[i]] = newObj;
        }
        obj = newObj;
    }
    obj[path[path.length - 1]] = value;
    return root;
};

export default at;
