export class StringUtils {
    public static isStringContains(check, value) {
        return check ? check.toLowerCase().includes(value.toLowerCase()) : false;
    }
}
