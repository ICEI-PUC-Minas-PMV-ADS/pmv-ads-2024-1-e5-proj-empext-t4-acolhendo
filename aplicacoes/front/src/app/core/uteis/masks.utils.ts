export const Masks = {
    cpfMask: [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/],
    cnpjMask: [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/],
    cpfcnpjMask: (value) => {
        value = (value || "").replace(/[^0-9]/g, '');
        if (value.length < 12) {
            return Masks.cpfMask
        } else {
            return Masks.cnpjMask
        }
    },
    foneMask: ['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
    celularMask: ['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
    fone9Mask: (value) => {
        value = (value || "").replace(/[^0-9]/g, '');
        if (value.length == 11) {
            return Masks.celularMask
        } else {
            return Masks.foneMask
        }
    },
}