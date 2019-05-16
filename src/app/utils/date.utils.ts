export class DateUtils {
    public static checkDateRange(year, index, operation) {
        const parsedDate = operation.date.split('-');
        if (+parsedDate[0] !== +year) {
            return false;
        }

        return +index === +parsedDate[1];
    }
}
