export function Safe(option, fun) {
    return function(...props) {
        for(let i = 0; i < props.length || i < option.length; i++) {
            if(!IsType(props[i], option[i].type)) {
                console.error(`prop[${option[i].name ? option[i].name : i}] is not type [${option[i].type}]`)
                return;
            }
        }
        return fun(...props);
    }
}

function IsType(target, type) {
    switch(type) {
        case "string": return IsString(target);
        case "number": return IsNumber(target);
        case "boolean": return IsBoolean(target);
        case "object": return IsObject(target);
        case "function": return IsFunction(target);
        case "array": return IsArray(target);
        default: return null;
    }
}

const IsString = IsTypeBuilder("string")

const IsNumber = IsTypeBuilder("number")

const IsBoolean = IsTypeBuilder("boolean")

const IsFunction = IsTypeBuilder("function")

const IsArray = IsInstanceBuilder(Array)

const IsCommonObject = IsInstanceBuilder(Object)

function IsInstanceBuilder(instance) {
    return function (target) {
        return target instanceof instance;
    }
}

function IsTypeBuilder(type) {
    return function (target) {
        return typeof target === type;
    }
}

function IsObject(target) {
    if(IsCommonObject(target)) {
        return !IsFunction(target) && !IsArray(target);
    }
    return false;
}