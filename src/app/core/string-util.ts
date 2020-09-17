export class StringUtil {

    public static isBlank(valor: any): boolean {
        if (!valor) {
            return true;
        }
        if ((typeof valor) != 'string') {
            return false;
        }
        const text: string = (valor as string);
        return text.trim() == '';
    }

}
