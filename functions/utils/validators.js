const isEmpty = (string) => {
    if (string === '') {
        return true;
    } else {
        return false;
    }
}

exports.validateLoginData = (data) => {
    let errors = {};
    if (isEmpty(data.email)) {
        errors = 'Must not be empty';
    }

    if (isEmpty(data.password)) {
        errors = 'Must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) {
        return true;
    }else{
        return false;
    }
};

exports.validateSignUpData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = "Must not be empty";
    } else if(!isEmail(data.email)) {
        errors.email = "Must be valid email address";
    }

    if (isEmpty(data.fullName)) {
        errors.fullName = "Must not be empty";
    }

    if (isEmpty(data.dateOfBirth)) {
        errors.dateOfBirth = "Must not be empty";
    }

    if (isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "Must not be empty";
    }


    if(isEmpty(data.addressLine1)) {
        errors.addressLine1 = "Must not be empty";
    }

    if(isEmpty(data.cityId)) {
        errors.city = "Must not be empty";
    }

    if (isEmpty(data.password)) {
        errors.password = "Must not be empty";
    }

    if (isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm password";
    }else if (data.password != data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match"
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}

exports.updateProfileData = (data) => {
    let errors = {};

    if (isEmpty(data.fullName)) {
        errors.fullName = "Must not be empty";
    }

    if (isEmpty(data.dateOfBirth)) {
        errors.dateOfBirth = "Must not be empty";
    }

    if (isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "Must not be empty";
    }

    if(isEmpty(data.addressLine1)) {
        errors.addressLine1 = "Must not be empty";
    }

    if(isEmpty(data.cityId)) {
        errors.city = "Must not be empty";
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}