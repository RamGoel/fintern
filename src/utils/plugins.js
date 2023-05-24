export const appName = 'orgarch'
export const appUrl='http://localhost:3000'
export const checkValidObj = (obj) => {
    var invalidObj = 0;
    Object.keys(obj).map(key => {
        if (obj[key] === '') {
            invalidObj = 1;
            return 1;
        }
        return 1;
    })


    if (invalidObj === 1) {
        return false;
    } else {
        return true;
    }
}


export const generateKey = () => {
    let key = "";
    const digits = "0123456789";

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        key += digits[randomIndex];
    }

    return key;
}



export const getErrMessage=(err)=>{
    var msg = err.message.split('/')
    return msg[msg.length - 1]
}