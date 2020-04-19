function isValidForm(fields) {
    var i = 0;
    for (i = 0; i < fields.length; i++) {
        if (fields[i].toString() === "") {
            return false;
        }
    }
    return true;
}