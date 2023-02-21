export const checkPassword = password => {
    let char_type = 0;
    if(/[a-z]/.test(password)) char_type = char_type+1;
    if(/[A-Z]/.test(password)) char_type = char_type+1;
    if(/\d/.test(password)) char_type = char_type+1;
    if (/[~!@#$%\^&*()_+`\-={}|[\]\\:";'<>?,./]/gi.test(password)) char_type = char_type + 1;
    return char_type > 2 && password.length > 9;
};

export const checkName = name => {
    const regId = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
    return regId.test(name);
};
