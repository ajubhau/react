export function validInput(control) {
    if(control.trim() === "") {
        return true;
    }
}

export function validEmail(control) {
    if(!control.includes('@')) {
        return true;
    }
}